/**
 * contextual.js - Motore per dizionario contestuale in-page
 * Architettura: Trie (Prefix Tree) + TreeWalker + Singleton Tooltip
 * Compatibile con file:// e GitHub Pages senza dipendenze né CORS.
 */
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

  // 3. STRUTTURA DATI: TRIE (Prefix Tree)
  class TrieNode {
    constructor() {
      this.children = new Map();
      this.isEndOfWord = false;
      this.termKey = null;
      this.originalTerm = '';
    }
  }

  class Trie {
    constructor() {
      this.root = new TrieNode();
    }

    insert(termKey, originalTerm) {
      let node = this.root;
      const normalized = originalTerm.toLowerCase();
      for (const char of normalized) {
        if (!node.children.has(char)) {
          node.children.set(char, new TrieNode());
        }
        node = node.children.get(char);
      }
      node.isEndOfWord = true;
      node.termKey = termKey;
      node.originalTerm = originalTerm;
    }
  }

  // 4. LOGICA DI DELIMITAZIONE (Word Boundaries per simboli tecnici e lettere accentate)
  const UNICODE_WORD_CHAR = /[\p{L}\p{N}]/u;

  function isBoundaryBefore(text, index, term) {
    if (index === 0) return true;
    const prevChar = text[index - 1];
    const firstChar = term[0];
    const isFirstAlpha = UNICODE_WORD_CHAR.test(firstChar);

    if (isFirstAlpha) {
      return !UNICODE_WORD_CHAR.test(prevChar);
    }
    // Se il termine inizia con un simbolo (.NET), il precedente non deve essere identico né alfanumerico
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
    // Se il termine finisce con un simbolo (C++), il successivo non deve essere '+' né alfanumerico
    return nextChar !== lastChar && !UNICODE_WORD_CHAR.test(nextChar);
  }

  // Algoritmo di scansione lineare O(L) con logica Longest-Match
  function findMatches(text, trie) {
    const matches = [];
    const len = text.length;
    let i = 0;

    while (i < len) {
      const charLower = text[i].toLowerCase();
      if (!trie.root.children.has(charLower)) {
        i++;
        continue;
      }

      let node = trie.root;
      let longestValidMatch = null;
      let j = i;

      while (j < len) {
        const c = text[j].toLowerCase();
        if (!node.children.has(c)) {
          break;
        }
        node = node.children.get(c);
        j++;

        if (node.isEndOfWord) {
          // Verifica sia il confine iniziale che finale
          if (isBoundaryBefore(text, i, node.originalTerm) && isBoundaryAfter(text, j, node.originalTerm)) {
            longestValidMatch = {
              start: i,
              end: j,
              termKey: node.termKey,
              originalTerm: node.originalTerm
            };
          }
        }
      }

      if (longestValidMatch) {
        matches.push(longestValidMatch);
        i = longestValidMatch.end; // Salta alla fine del termine più lungo
      } else {
        i++;
      }
    }
    return matches;
  }

  // 5. PARSER DEL DOM (TreeWalker ad alte prestazioni)
  const IGNORED_TAGS = new Set([
    'SCRIPT', 'STYLE', 'NOSCRIPT', 'PRE', 'CODE', 'KBD', 'SAMP',
    'TEXTAREA', 'INPUT', 'SELECT', 'BUTTON', 'A', 'SVG', 'CANVAS'
  ]);

  function scanAndMarkDOM(dictionary) {
    // Costruzione del Trie
    const trie = new Trie();
    for (const key of Object.keys(dictionary)) {
      trie.insert(key, key);
      // Se il dato espone alias secondari, possono essere registrati qui
      if (dictionary[key].aliases && Array.isArray(dictionary[key].aliases)) {
        for (const alias of dictionary[key].aliases) {
          trie.insert(key, alias);
        }
      }
    }

    // Filtro per TreeWalker
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function (node) {
          if (!node.nodeValue || !node.nodeValue.trim()) {
            return NodeFilter.FILTER_REJECT;
          }
          let parent = node.parentElement;
          while (parent && parent !== document.body) {
            if (IGNORED_TAGS.has(parent.tagName)) return NodeFilter.FILTER_REJECT;
            if (parent.classList && (parent.classList.contains('ctx-term') || parent.classList.contains('ctx-tooltip'))) {
              return NodeFilter.FILTER_REJECT;
            }
            parent = parent.parentElement;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    // Raccoglie i nodi di testo per evitare mutazioni concorrenti al TreeWalker
    const textNodes = [];
    let currentNode = walker.nextNode();
    while (currentNode) {
      textNodes.push(currentNode);
      currentNode = walker.nextNode();
    }

    // Sostituzione non distruttiva con DocumentFragment
    for (const textNode of textNodes) {
      const rawText = textNode.nodeValue;
      const matches = findMatches(rawText, trie);

      if (matches.length === 0) continue; // Nessun reflow, zero modifiche

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

  // 6. UI TOOLTIP SINGLETON E GESTIONE EVENTI
  let tooltipEl = null;
  let currentActiveTerm = null;
  let hideTimeout = null;

  function createTooltipSingleton() {
    tooltipEl = document.createElement('div');
    tooltipEl.id = 'ctx-tooltip';
    tooltipEl.className = 'ctx-tooltip';
    tooltipEl.setAttribute('role', 'tooltip');
    tooltipEl.setAttribute('aria-hidden', 'true');

    tooltipEl.innerHTML = `
      <div class="ctx-tooltip-header">
        <span class="ctx-tooltip-badge" id="ctx-tooltip-category"></span>
      </div>
      <div class="ctx-tooltip-title" id="ctx-tooltip-title"></div>
      <div class="ctx-tooltip-body" id="ctx-tooltip-body"></div>
      <div class="ctx-tooltip-arrow" id="ctx-tooltip-arrow"></div>
    `;

    document.body.appendChild(tooltipEl);

    // Mantiene visibile il tooltip se il mouse si sposta all'interno del box
    tooltipEl.addEventListener('pointerenter', () => clearTimeout(hideTimeout));
    tooltipEl.addEventListener('pointerleave', () => hideTooltip());
  }

  function showTooltip(termEl, dictData) {
    clearTimeout(hideTimeout);
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

    // Rende visibile in modalità "misurazione" trasparente
    tooltipEl.classList.add('ctx-measuring');
    tooltipEl.classList.remove('ctx-active');
    tooltipEl.setAttribute('aria-hidden', 'false');

    positionTooltip(termEl);

    tooltipEl.classList.remove('ctx-measuring');
    tooltipEl.classList.add('ctx-active');
    termEl.classList.add('ctx-term-active');
  }

  function hideTooltip() {
    hideTimeout = setTimeout(() => {
      if (!tooltipEl) return;
      tooltipEl.classList.remove('ctx-active');
      tooltipEl.setAttribute('aria-hidden', 'true');
      if (currentActiveTerm) {
        currentActiveTerm.classList.remove('ctx-term-active');
        currentActiveTerm = null;
      }
    }, 120);
  }

  function positionTooltip(termEl) {
    const termRect = termEl.getBoundingClientRect();
    const tipRect = tooltipEl.getBoundingClientRect();
    const margin = 12;
    const spacing = 8;

    // Controllo collisione verticale: preferenza TOP
    let placeAbove = true;
    if (termRect.top - tipRect.height - spacing < margin) {
      placeAbove = false;
    }

    let top = placeAbove
      ? termRect.top - tipRect.height - spacing
      : termRect.bottom + spacing;

    tooltipEl.setAttribute('data-placement', placeAbove ? 'top' : 'bottom');

    // Calcolo posizione orizzontale centrata rispetto al termine
    const termCenterX = termRect.left + termRect.width / 2;
    let left = termCenterX - tipRect.width / 2;

    // Prevenzione fuoriuscita viewport
    const maxLeft = window.innerWidth - tipRect.width - margin;
    left = Math.max(margin, Math.min(left, maxLeft));

    tooltipEl.style.top = `${Math.round(top)}px`;
    tooltipEl.style.left = `${Math.round(left)}px`;

    // Posizionamento orizzontale della freccia (ancorata al centro del termine)
    const arrowEl = document.getElementById('ctx-tooltip-arrow');
    if (arrowEl) {
      const arrowX = termCenterX - left;
      const clampedArrowX = Math.max(16, Math.min(arrowX, tipRect.width - 16));
      arrowEl.style.left = `${Math.round(clampedArrowX)}px`;
    }
  }

  // 7. INIZIALIZZAZIONE DELEGATA DEGLI EVENTI
  function setupEventDelegation(dictionary) {
    createTooltipSingleton();

    // Mouse / Puntatore (Hover)
    document.body.addEventListener('pointerenter', (e) => {
      const term = e.target.closest('.ctx-term');
      if (term) showTooltip(term, dictionary);
    }, true);

    document.body.addEventListener('pointerleave', (e) => {
      const term = e.target.closest('.ctx-term');
      if (term) hideTooltip();
    }, true);

    // Accessibilità Tastiera (Focus in / Focus out)
    document.body.addEventListener('focusin', (e) => {
      const term = e.target.closest('.ctx-term');
      if (term) showTooltip(term, dictionary);
    });

    document.body.addEventListener('focusout', (e) => {
      const term = e.target.closest('.ctx-term');
      if (term) hideTooltip();
    });

    // Touch / Mobile / Click toggle
    document.body.addEventListener('click', (e) => {
      const term = e.target.closest('.ctx-term');
      if (term) {
        e.preventDefault();
        if (currentActiveTerm === term && tooltipEl.classList.contains('ctx-active')) {
          hideTooltip();
        } else {
          showTooltip(term, dictionary);
        }
      } else if (!e.target.closest('#ctx-tooltip')) {
        hideTooltip();
      }
    });

    // Chiusura con tasto Escape
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') hideTooltip();
    });

    // Chiusura allo scroll o ridimensionamento della finestra
    window.addEventListener('scroll', () => {
      if (tooltipEl && tooltipEl.classList.contains('ctx-active')) {
        hideTooltip();
      }
    }, { passive: true });

    window.addEventListener('resize', () => {
      if (tooltipEl && tooltipEl.classList.contains('ctx-active')) {
        hideTooltip();
      }
    }, { passive: true });
  }

  // 8. BOOTSTRAP DEL SISTEMA
  loadScript(BASE_PATH + 'contextual_content.js', () => {
    const dictionary = window.__CONTEXTUAL_DICT__;
    if (!dictionary || typeof dictionary !== 'object') {
      console.warn('[Contextual] Nessun dizionario valido in window.__CONTEXTUAL_DICT__');
      return;
    }

    const init = () => {
      scanAndMarkDOM(dictionary);
      setupEventDelegation(dictionary);
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  });
})();
