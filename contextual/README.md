**ASSURANCE DEL SOFTWARE ASSISTITO DA LLM**
# DIZIONARIO CONTESTUALE & META TAG

## Meta tag aggiuntivi:
```html
<!-- SEO & Social -->
<meta name="description" content="Manuale didattico per costruire catene di Software Assurance, verificare codice generato da LLM e governare il rischio con evidenze e oracoli indipendenti.">
<link rel="canonical" href="https://kamaludu.github.io/LLM_assurance/">
<meta name="robots" content="index, follow">
<meta property="og:title" content="Assurance del Software Assistito da LLM — Principi e Governance">
<meta property="og:description" content="Una guida epistemica e pratica per valutare criticamente, verificare e governare l'affidabilità del software sviluppato con Large Language Models.">
<meta property="og:type" content="article">
<meta property="og:url" content="https://kamaludu.github.io/LLM_assurance/">
<meta property="og:image" content="https://kamaludu.github.io/LLM_assurance/assets/preview.png">
<meta name="twitter:card" content="summary_large_image">
<!-- End -->
```

---

## Menù contestuale opzionale per la versione HTML del manuale 

### Nel file `index.html` l'unica riga da inserire è:
```html
<script src="contextual/contextual.js" defer></script>
```

---

### Struttura delle directory raccomandata
```text
progetto/
├── index.html
└── contextual/
    ├── contextual.js          (Motore Trie, DOM walker, UI tooltip)
    ├── contextual_content.js  (Dizionario globale)
    └── contextual.css         (Stili e animazioni popover)
```

---

1. **Bypass dei vincoli CORS su `file://` (desktop)**: L'iniezione dinamica di tag `<link>` e `<script>` è il modo nativo per caricare risorse correlate aprendo un file con doppio clic locale su Chrome, Edge e Safari, dove `fetch()`, `XMLHttpRequest` e `type="module"` verrebbero bloccati per motivi di sicurezza.
2. **Algoritmo a Trie (Prefix Tree)**: Risolve alla radice i problemi di lentezza e memoria delle Regular Expression chilometriche ($O(L)$ rispetto alla lunghezza del testo anziché $O(2^N)$ con rischio di catastrophic backtracking).
3. **TreeWalker selettivo + DocumentFragment**: La sostituzione atomica solo sui nodi che contengono effettivamente occorrenze azzera il *layout thrashing* e i reflow non necessari su documenti con decine di migliaia di parole.
4. **Tooltip Singleton con `position: fixed`**: Iniettare un unico elemento a livello di `<body>` evita overhead di memoria ed esclude problemi di clipping (`overflow: hidden` o `z-index` su container antenati).

**Soluzioni adottate nel codice per i casi limite:**
- **Confini di parola per simboli tecnici**: Per termini come `C++`, `.NET`, `TCP/IP` o `I/O`, la classica asserzione `\b` delle regex fallisce. Nel motore Trie è stato implementato un validatore di adiacenza che distingue caratteri alfanumerici Unicode (inclusi gli accenti italiani `\p{L}`) dai simboli di punteggiatura e delimitatori.
- **Risoluzione percorso dinamica**: Tutti i file risiedono in una sottocartella dedicata (ad es. `contextual/`). Lo script ricava autonomamente `BASE_PATH` per agganciare CSS e dizionario senza configurazioni manuali.

---

### Esempio di header:
```html
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="it">
<head>
  <meta charset="utf-8" />
  <meta name="generator" content="pandoc 3.11" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes" />
  <title>Assurance del Software Assistito da LLM | Manuale Didattico</title>

<!-- SEO & Social -->
<meta name="description" content="Manuale didattico per costruire catene di Software Assurance, verificare codice generato da LLM e governare il rischio con evidenze e oracoli indipendenti.">
<link rel="canonical" href="https://kamaludu.github.io/assurance-llm/">
<meta name="robots" content="index, follow">
<meta property="og:title" content="Assurance del Software Assistito da LLM — Principi e Governance">
<meta property="og:description" content="Una guida epistemica e pratica per valutare criticamente, verificare e governare l'affidabilità del software sviluppato con Large Language Models.">
<meta property="og:type" content="article">
<meta property="og:url" content="https://kamaludu.github.io/assurance-llm/">
<meta property="og:image" content="https://kamaludu.github.io/assurance-llm/assets/preview.png">
<meta name="twitter:card" content="summary_large_image">
<!-- End -->

<script src="contextual/contextual.js" defer></script>

  <style>
...
```
