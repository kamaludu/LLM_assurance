/* =========================================================================
 * ASSURANCE DEL SOFTWARE ASSISTITO DA LLM - GLOSSARIO CONTESTUALE
 * Autore:       Cristian Evangelisti
 * File:         contextual.js
 * Descrizione:  Motore client-side per glossario contestuale in-page.
 * Architettura: Trie case-adaptive, TreeWalker selettivo, Singleton Popup 2D.
 * Specifiche e vincoli di parsing:
 *   - Riconoscimento attivo nei testi e nelle tabelle (celle th, td)
 *   - Esclusione protetta dei blocchi di codice (pre, code, kbd, samp)
 *   - Preservazione integrale di titoli (h1-h6), indice (#TOC) e formule (.math)
 *   - Interazione unificata click/tap ottimizzata per touch (senza eventi hover)
 * Licenza:      GNU General Public License v3.0 o successiva (GPLv3-or-later)
 * SPDX-License-Identifier: GPL-3.0-or-later
 * Copyright (C) 2026 Cristian Evangelisti
 * ========================================================================= */
(function () {
  'use strict';

  // 1. RILEVAMENTO PERCORSO BASE
  const SCRIPT_URL = (document.currentScript && document.currentScript.src) ||
                     document.querySelector('script[src*="contextual.js"]')?.src || './';
  const BASE_PATH = SCRIPT_URL.substring(0, SCRIPT_URL.lastIndexOf('/') + 1);

  // 2. INIEZIONE ASSET ESTERNI (Bypass CORS per file://)
  function loadStylesheet(url) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
  }

  function loadScript(url, callback) {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.onload = callback;
    script.onerror = () => console.error(`[Contextual] Errore nel caricamento di: ${url}`);
    document.head.appendChild(script);
  }

  loadStylesheet(BASE_PATH + 'contextual.css');

  // 3. UTILITÀ UNICODE E NORMALIZZAZIONE
  const UNICODE_WORD_CHAR = /[\p{L}\p{N}]/u;

  function normalizeApostrophes(str) {
    return str.replace(/[\u2018\u2019`]/g, "'");
  }

  function normalizeChar(c) {
    if (c === '\u2019' || c === '\u2018' || c === '`') {
      return "'";
    }
    return c.toLowerCase();
  }

  // Acronimi e termini brevi sono cercati tassativamente in modalità case-sensitive
  function isCaseSensitiveTerm(term) {
    if (term.length <= 4) return true;
    const hasUpper = /[A-Z]/.test(term);
    const hasLower = /[a-z]/.test(term);
    if (hasUpper && !hasLower) return true;
    if (/^[A-Z][a-z]+[A-Z]/.test(term) && term.length <= 6) return true;
    return false;
  }

  // 4. STRUTTURA DATI: TRIE (Prefix Tree)
  class TrieNode {
    constructor() {
      this.children = new Map();
      this.matches = []; // Array di { termKey, originalTerm, caseSensitive }
    }
  }

  class Trie {
    constructor() {
      this.root = new TrieNode();
    }

    insert(termKey, originalTerm) {
      if (!originalTerm || !originalTerm.trim()) return;
      const cleanTerm = originalTerm.trim();
      const caseSensitive = isCaseSensitiveTerm(cleanTerm);

      let node = this.root;
      for (const char of cleanTerm) {
        const c = normalizeChar(char);
        if (!node.children.has(c)) {
          node.children.set(c, new TrieNode());
        }
        node = node.children.get(c);
      }

      const alreadyRegistered = node.matches.some(
        m => m.termKey === termKey && m.originalTerm === cleanTerm
      );
      if (!alreadyRegistered) {
        node.matches.push({
          termKey: termKey,
          originalTerm: cleanTerm,
          caseSensitive: caseSensitive
        });
      }
    }
  }

  // 5. DELIMITAZIONE CONFINI DI PAROLA
  function isBoundaryBefore(text, index, term) {
    if (index === 0) return true;
    const prevChar = text[index - 1];
    const firstChar = term[0];
    const isFirstAlpha = UNICODE_WORD_CHAR.test(firstChar);

    if (isFirstAlpha) {
      return !UNICODE_WORD_CHAR.test(prevChar);
    }
    return prevChar !== firstChar && !UNICODE_WORD_CHAR.test(prevChar);
  }

  function isBoundaryAfter(text, index, term) {
    if (index >= text.length) return true;
    const nextChar = text[index];
    const lastChar = term[term.length - 1];
    const isLastAlpha = UNICODE_WORD_CHAR.test(lastChar);

    if (isLastAlpha) {
      return !UNICODE_WORD_CHAR.test(nextChar);
    }
    return nextChar !== lastChar && !UNICODE_WORD_CHAR.test(nextChar);
  }

  // Ricerca lineare con selezione del match più lungo (Longest-Match)
  function findMatches(text, trie) {
    const matches = [];
    const len = text.length;
    let i = 0;

    while (i < len) {
      const c0 = normalizeChar(text[i]);
      if (!trie.root.children.has(c0)) {
        i++;
        continue;
      }

      let node = trie.root;
      let longestValidMatch = null;
      let j = i;

      while (j < len) {
        const c = normalizeChar(text[j]);
        if (!node.children.has(c)) {
          break;
        }
        node = node.children.get(c);
        j++;

        if (node.matches.length > 0) {
          const textSlice = text.slice(i, j);
          for (const candidate of node.matches) {
            if (candidate.caseSensitive) {
              if (normalizeApostrophes(textSlice) !== normalizeApostrophes(candidate.originalTerm)) {
                continue;
              }
            }
            if (isBoundaryBefore(text, i, candidate.originalTerm) &&
                isBoundaryAfter(text, j, candidate.originalTerm)) {
              longestValidMatch = {
                start: i,
                end: j,
                termKey: candidate.termKey,
                originalTerm: candidate.originalTerm
              };
              break;
            }
          }
        }
      }

      if (longestValidMatch) {
        matches.push(longestValidMatch);
        i = longestValidMatch.end; // Avanza oltre il termine più lungo
      } else {
        i++;
      }
    }
    return matches;
  }

  // 6. SCANSIONE DEL DOM CON TREEWALKER SELETTIVO
  // Nota: Codice, titoli, navigazione e formule matematiche sono ESCLUSI.
  // Le tabelle (table, th, td) vengono regolarmente analizzate.
  const IGNORED_SELECTOR = [
    'script', 'style', 'noscript',
    'pre', 'code', 'kbd', 'samp',           // Codice protetto per sicurezza
    'textarea', 'input', 'select', 'button', // Form
    'a', 'svg', 'canvas',                    // Link e grafica
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',     // Titoli protetti
    'nav', '#TOC', '.toc',                   // Indice protetto
    '.math', 'math',                         // Formule matematiche
    'figcaption', 'caption',                 // Didascalie
    '.ctx-term', '.ctx-tooltip',             // Elementi interni
    '[contenteditable="true"]'
  ].join(', ');

  function scanAndMarkDOM(dictionary) {
    const trie = new Trie();
    for (const key of Object.keys(dictionary)) {
      trie.insert(key, key);
      const item = dictionary[key];
      if (item && Array.isArray(item.aliases)) {
        for (const alias of item.aliases) {
          trie.insert(key, alias);
        }
      }
    }

    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function (node) {
          if (!node.nodeValue || !node.nodeValue.trim()) {
            return NodeFilter.FILTER_REJECT;
          }
          const parent = node.parentElement;
          if (!parent || parent.closest(IGNORED_SELECTOR)) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    const textNodes = [];
    let currentNode = walker.nextNode();
    while (currentNode) {
      textNodes.push(currentNode);
      currentNode = walker.nextNode();
    }

    for (const textNode of textNodes) {
      const rawText = textNode.nodeValue;
      const matches = findMatches(rawText, trie);

      if (matches.length === 0) continue;

      const fragment = document.createDocumentFragment();
      let lastIndex = 0;

      for (const match of matches) {
        if (match.start > lastIndex) {
          fragment.appendChild(document.createTextNode(rawText.slice(lastIndex, match.start)));
        }

        const span = document.createElement('span');
        span.className = 'ctx-term';
        span.tabIndex = 0;
        span.setAttribute('role', 'button');
        span.setAttribute('aria-haspopup', 'dialog');
        span.dataset.termKey = match.termKey;
        span.textContent = rawText.slice(match.start, match.end);

        fragment.appendChild(span);
        lastIndex = match.end;
      }

      if (lastIndex < rawText.length) {
        fragment.appendChild(document.createTextNode(rawText.slice(lastIndex)));
      }

      if (textNode.parentNode) {
        textNode.parentNode.replaceChild(fragment, textNode);
      }
    }
  }

  // 7. GESTIONE DELLA POPUP SINGLETON E POSIZIONAMENTO 2D
  let tooltipEl = null;
  let currentActiveTerm = null;

  function createTooltipSingleton() {
    if (document.getElementById('ctx-tooltip')) {
      tooltipEl = document.getElementById('ctx-tooltip');
      return;
    }

    tooltipEl = document.createElement('div');
    tooltipEl.id = 'ctx-tooltip';
    tooltipEl.className = 'ctx-tooltip';
    tooltipEl.setAttribute('role', 'dialog');
    tooltipEl.setAttribute('aria-hidden', 'true');

    tooltipEl.innerHTML = `
      <div class="ctx-tooltip-header">
        <span class="ctx-tooltip-badge" id="ctx-tooltip-category"></span>
        <button type="button" class="ctx-tooltip-close" id="ctx-tooltip-close" aria-label="Chiudi finestra">&times;</button>
      </div>
      <div class="ctx-tooltip-title" id="ctx-tooltip-title"></div>
      <div class="ctx-tooltip-body" id="ctx-tooltip-body"></div>
      <div class="ctx-tooltip-arrow" id="ctx-tooltip-arrow"></div>
    `;

    document.body.appendChild(tooltipEl);
  }

  function positionTooltip(termEl) {
    if (!termEl || !tooltipEl) return;

    const termRect = termEl.getBoundingClientRect();
    const vw = document.documentElement.clientWidth;
    const vh = document.documentElement.clientHeight;

    const margin = 14;
    const spacing = 8;

    const spaceAbove = termRect.top - margin;
    const spaceBelow = vh - termRect.bottom - margin;

    tooltipEl.style.maxHeight = '';
    const naturalTipHeight = tooltipEl.offsetHeight;

    let placeAbove = true;
    if (spaceAbove >= naturalTipHeight + spacing) {
      placeAbove = true;
    } else if (spaceBelow >= naturalTipHeight + spacing) {
      placeAbove = false;
    } else {
      placeAbove = spaceAbove >= spaceBelow;
    }

    const availableSpace = placeAbove ? spaceAbove - spacing : spaceBelow - spacing;
    const clampedMaxHeight = Math.max(120, Math.min(340, availableSpace));
    tooltipEl.style.maxHeight = `${Math.round(clampedMaxHeight)}px`;

    const tipHeight = tooltipEl.offsetHeight;
    const tipWidth = tooltipEl.offsetWidth;

    let top = placeAbove
      ? termRect.top - tipHeight - spacing
      : termRect.bottom + spacing;

    // Clamping verticale rigoroso entro i margini dello schermo
    top = Math.max(margin, Math.min(top, vh - tipHeight - margin));

    tooltipEl.setAttribute('data-placement', placeAbove ? 'top' : 'bottom');

    // Centratura orizzontale rispetto al termine
    const termCenterX = termRect.left + termRect.width / 2;
    let left = termCenterX - tipWidth / 2;

    // Clamping orizzontale rigoroso
    const maxLeft = vw - tipWidth - margin;
    left = Math.max(margin, Math.min(left, maxLeft));

    tooltipEl.style.top = `${Math.round(top)}px`;
    tooltipEl.style.left = `${Math.round(left)}px`;

    // Posizionamento della freccia
    const arrowEl = tooltipEl.querySelector('.ctx-tooltip-arrow');
    if (arrowEl) {
      const arrowX = termCenterX - left;
      const clampedArrowX = Math.max(16, Math.min(arrowX, tipWidth - 16));
      arrowEl.style.left = `${Math.round(clampedArrowX)}px`;
    }
  }

  function showTooltip(termEl, dictData) {
    currentActiveTerm = termEl;
    const termKey = termEl.dataset.termKey;
    const item = dictData[termKey];
    if (!item) return;

    const catEl = document.getElementById('ctx-tooltip-category');
    const titleEl = document.getElementById('ctx-tooltip-title');
    const bodyEl = document.getElementById('ctx-tooltip-body');

    catEl.textContent = item.category || 'Termine Tecnico';
    titleEl.textContent = item.title || termKey;
    bodyEl.textContent = item.definition || '';
    bodyEl.scrollTop = 0;

    positionTooltip(termEl);

    tooltipEl.classList.add('ctx-active');
    tooltipEl.setAttribute('aria-hidden', 'false');
    termEl.classList.add('ctx-term-active');
  }

  function hideTooltip() {
    if (!tooltipEl) return;
    tooltipEl.classList.remove('ctx-active');
    tooltipEl.setAttribute('aria-hidden', 'true');
    if (currentActiveTerm) {
      currentActiveTerm.classList.remove('ctx-term-active');
      currentActiveTerm = null;
    }
  }

  // 8. INTERAZIONI CLICK/TAP UNIFICATE
  function setupInteractions(dictionary) {
    createTooltipSingleton();

    document.addEventListener('click', (e) => {
      const termEl = e.target.closest('.ctx-term');
      const closeBtn = e.target.closest('#ctx-tooltip-close');
      const popupEl = e.target.closest('#ctx-tooltip');

      // 1. Clic sul pulsante "X"
      if (closeBtn) {
        e.preventDefault();
        hideTooltip();
        return;
      }

      // 2. Clic sul termine
      if (termEl) {
        e.preventDefault();
        if (currentActiveTerm === termEl && tooltipEl.classList.contains('ctx-active')) {
          hideTooltip();
        } else {
          showTooltip(termEl, dictionary);
        }
        return;
      }

      // 3. Clic dentro la popup (selezione testo o scroll interno)
      if (popupEl) {
        return;
      }

      // 4. Clic fuori da popup e termini
      if (tooltipEl && tooltipEl.classList.contains('ctx-active')) {
        hideTooltip();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        hideTooltip();
      }
      if ((e.key === 'Enter' || e.key === ' ') && document.activeElement && document.activeElement.classList.contains('ctx-term')) {
        e.preventDefault();
        document.activeElement.click();
      }
    });

    // La popup rimane aperta e si riallinea allo scroll o al resize della finestra
    window.addEventListener('scroll', () => {
      if (currentActiveTerm && tooltipEl && tooltipEl.classList.contains('ctx-active')) {
        positionTooltip(currentActiveTerm);
      }
    }, { passive: true });

    window.addEventListener('resize', () => {
      if (currentActiveTerm && tooltipEl && tooltipEl.classList.contains('ctx-active')) {
        positionTooltip(currentActiveTerm);
      }
    }, { passive: true });
  }

  // 9. AVVIO
  function run() {
    const dictionary = window.__CONTEXTUAL_DICT__;
    if (!dictionary || typeof dictionary !== 'object') {
      console.warn('[Contextual] Dizionario window.__CONTEXTUAL_DICT__ non trovato.');
      return;
    }
    scanAndMarkDOM(dictionary);
    setupInteractions(dictionary);
  }

  if (window.__CONTEXTUAL_DICT__) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', run);
    } else {
      run();
    }
  } else {
    loadScript(BASE_PATH + 'contextual_content.js', () => {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', run);
      } else {
        run();
      }
    });
  }
})();
