#!/usr/bin/env bash
# ========================================
# PIPELINE DI PUBBLICAZIONE MULTI-FORMATO
# Autore:       Cristian Evangelisti
# File:         build-pandoc.sh
# Descrizione:  Compilatore e validatore documentale da Markdown verso 4 target:
#               - PDF   (impaginato tramite Typst e motore A5)
#               - DOCX  (OpenXML nativo con ancore puntuali compatibili WPS Office)
#               - HTML5 (Standalone con risorse e CSS embedded)
#               - EPUB3 (Validato, con normalizzazione TOC a 2 livelli)
# Prerequisiti: pandoc, typst, zip, unzip
# Licenza:      GNU General Public License v3.0 o successiva (GPLv3-or-later)
# SPDX-License-Identifier: GPL-3.0-or-later
# Copyright (C) 2026 Cristian Evangelisti
# Modalità d'uso:
#   1. Aprire il terminale e posizionarsi nella cartella con i file Markdown:
#        cd /percorso/dei/tuoi/file_md
#   2. Lanciare lo script (anche da un percorso assoluto o relativo):
#        /percorso/dello/script.sh
#   3. Selezionare interattivamente il file dal menu a video.
# ========================================

set -Eeuo pipefail

echo "========================================"
echo " Avvio Pipeline di Pubblicazione Multi-Formato (High-Assurance)"
echo " Target: PDF (Typst), DOCX (OpenXML), HTML5, EPUB3"
echo "========================================"
echo ""

# 0. Verifica prerequisiti minimi di sistema
require_cmd() {
  command -v "$1" >/dev/null 2>&1 || {
    echo "ERRORE CRITICO: Il comando '$1' non è installato o non è nel PATH."
    exit 1
  }
}

require_cmd pandoc
require_cmd typst
require_cmd unzip
require_cmd zip

# ================================================
# Avviso Directory & Selezione Interattiva del File Markdown
# ================================================
echo "----------------------------------------"
echo "  AVVISO IMPORTANTE"
echo "Assicurati di aver aperto il terminale ed eseguito lo script"
echo "nella STESSA directory in cui risiedono i file Markdown (.md)."
echo ""
echo "  Cartella di lavoro attuale:"
echo "$(pwd)"
echo "----------------------------------------"
echo ""

# Rileva tutti i file .md o .MD nella cartella corrente (gestione sicura di spazi)
shopt -s nullglob nocaseglob
md_files=(*.md)
shopt -u nullglob nocaseglob

if [ ${#md_files[@]} -eq 0 ]; then
  echo "ERRORE CRITICO: Nessun file Markdown (.md / .MD) trovato in $(pwd)!"
  echo "Spostati con il comando 'cd' nella cartella contenente i documenti e riavvia."
  exit 1
fi

echo "File Markdown rilevati nella cartella corrente:"
PS3="Seleziona il numero del file da convertire: "
select chosen in "${md_files[@]}" "Esci"; do
  if [ "$chosen" = "Esci" ]; then
    echo "Operazione annullata dall'utente."
    exit 0
  elif [ -n "$chosen" ]; then
    SOURCE_FILE="$chosen"
    break
  else
    echo "Opzione non valida. Inserisci un numero tra quelli elencati."
  fi
done

BASENAME="${SOURCE_FILE%.*}"
echo ""
echo "[✓] File sorgente selezionato : $SOURCE_FILE"
echo "[✓] Prefisso file generati    : $BASENAME.*"
echo ""

# Titolo predefinito: mantiene quello originale se si compila LLM_assurance.md,
# altrimenti usa il nome del file ripulito da underscore
DOC_TITLE="Assurance del Software Assistito da LLM"
if [ "$SOURCE_FILE" != "LLM_assurance.md" ]; then
  DOC_TITLE="${BASENAME//_/ }"
fi

# Pulizia preventiva degli artefatti per azzerare falsi positivi
rm -f "${BASENAME}.pdf" "${BASENAME}.docx" "${BASENAME}.html" "${BASENAME}.epub" \
      html_style.css epub.css typst-style.typ manual_filters.lua custom-reference.docx

# Gestione portabile del percorso dei font per Typst
FONT_OPT=()
if [ -n "${FONT_PATH:-}" ]; then
  FONT_OPT=( "--pdf-engine-opt=--font-path=${FONT_PATH}" )
elif [ -d "/system/fonts" ]; then
  FONT_OPT=( "--pdf-engine-opt=--font-path=/system/fonts" )
fi

# ================================================
# 1. Creazione Fogli di Stile e Configurazioni
# ================================================

# 1.1 Foglio di stile per HTML5 Standalone
cat << 'EOF' > html_style.css
/* 1. BASE & RESET */
html {
  color: #1a1a1a;
  background-color: #fdfdfd;
  -webkit-text-size-adjust: 100%;
}

body {
  margin: 0 auto;
  max-width: 52em;
  padding: 50px;
  hyphens: auto;
  overflow-wrap: break-word;
  text-rendering: optimizeLegibility;
  font-kerning: normal;
  font-family: system-ui, -apple-system, sans-serif;
}

/* 2. TIPOGRAFIA & CONTENUTI GENERALI */
header {
  margin-bottom: 4em;
  text-align: center;
}

h1, h2, h3, h4, h5, h6 {
  margin-top: 1.4em;
}

h1, h2 { color: #3b8503; }

h5, h6 {
  font-size: 1em;
  font-style: italic;
}

h6 {
  font-weight: normal;
}

p {
  margin: 1em 0;
}

a, a:visited {
  color: #1a1a1a;
}

blockquote {
  margin: 1em 0 1em 1.7em;
  padding-left: 1em;
  border-left: 2px solid #e6e6e6;
  color: #606060;
}

hr {
  border: none;
  border-top: 1px solid #1a1a1a;
  height: 1px;
  margin: 1em 0;
}

ol, ul {
  padding-left: 1.7em;
  margin-top: 1em;
}

li > ol, li > ul {
  margin-top: 0;
}

/* 3. MEDIA, TABELLE & TOC */
img {
  max-width: 100%;
  height: auto;
}

svg {
  height: auto;
  max-width: 100%;
}

table {
  margin: 1em 0;
  border-collapse: collapse;
  width: 100%;
  overflow-x: auto;
  display: block;
  font-variant-numeric: lining-nums tabular-nums;
}

table caption {
  margin-bottom: 0.75em;
}

th, td {
  border: 1px solid #1a1a1a;
}

th {
  padding: 0.25em 0.5em;
  background-color: #f2f2f2;
}

td {
  padding: 0.125em 0.5em;
}

#TOC li {
  list-style: none;
}

#TOC ul {
  padding-left: 1.3em;
}

#TOC > ul {
  padding-left: 0;
}

#TOC a:not(:hover) {
  text-decoration: none;
}

/* 4. LAYOUT DI SUPPORTO & UTILITY */
span.smallcaps {
  font-variant: small-caps;
}

div.columns {
  display: flex;
  gap: 1.5em;
}

div.column {
  flex: auto;
}

div.hanging-indent {
  margin-left: 1.5em;
  text-indent: -1.5em;
}

ul.task-list[class] {
  list-style: none;
}

ul.task-list li input[type="checkbox"] {
  font-size: inherit;
  width: 0.8em;
  margin: 0 0.8em 0.2em -1.6em;
  vertical-align: middle;
}

/* 5. BLOCCHI CODICE, NUMERAZIONE & EVIDENZIAZIONE SINTASSI */
code {
  white-space: pre-wrap;
  font-family: Menlo, Monaco, Consolas, 'Lucida Console', monospace;
  font-size: 85%;
  margin: 0;
  hyphens: manual;
  background-color: #f2f2f2;
  padding: 0.15em 0.35em;
  border-radius: 3px;
}

pre, div.sourceCode {
  background-color: #f7f7f7;
  border: 1px solid #e1e4e8;
  border-radius: 4px;
  padding: 0.75em 1em;
}

pre {
  margin: 1em 0;
  overflow: auto;
}

div.sourceCode {
  margin: 1em 0;
}

div.sourceCode pre {
  background-color: transparent;
  border: none;
  border-radius: 0;
  padding: 0;
  margin: 0;
}

pre code {
  background-color: transparent;
  padding: 0;
  border-radius: 0;
  overflow: visible;
  overflow-wrap: normal;
  white-space: pre;
}

.sourceCode {
  background-color: transparent;
  overflow: visible;
}

pre.sourceCode {
  margin: 0;
}

pre > code.sourceCode {
  white-space: pre;
  position: relative;
}

pre > code.sourceCode > span {
  display: inline-block;
  line-height: 1.25;
}

pre > code.sourceCode > span:empty {
  height: 1.2em;
}

code.sourceCode > span {
  color: inherit;
  text-decoration: inherit;
}

pre.numberSource {
  margin-left: 3em;
  border-left: 1px solid #aaaaaa;
  padding-left: 4px;
}

pre.numberSource code {
  counter-reset: source-line 0;
}

pre.numberSource code > span {
  position: relative;
  left: -4em;
  counter-increment: source-line;
}

pre.numberSource code > span > a:first-child::before {
  content: counter(source-line);
  position: relative;
  left: -1em;
  text-align: right;
  vertical-align: baseline;
  border: none;
  display: inline-block;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  padding: 0 4px;
  width: 4em;
  color: #aaaaaa;
}

/* Token di sintassi del codice */
code span.al { color: #ff0000; font-weight: bold; }
code span.an { color: #60a0b0; font-weight: bold; font-style: italic; }
code span.at { color: #7d9029; }
code span.bn { color: #40a070; }
code span.bu { color: #008000; }
code span.cf { color: #007020; font-weight: bold; }
code span.ch { color: #4070a0; }
code span.cn { color: #880000; }
code span.co { color: #60a0b0; font-style: italic; }
code span.cv { color: #60a0b0; font-weight: bold; font-style: italic; }
code span.do { color: #ba2121; font-style: italic; }
code span.dt { color: #902000; }
code span.dv { color: #40a070; }
code span.er { color: #ff0000; font-weight: bold; }
code span.fl { color: #40a070; }
code span.fu { color: #06287e; }
code span.im { color: #008000; font-weight: bold; }
code span.in { color: #60a0b0; font-weight: bold; font-style: italic; }
code span.kw { color: #007020; font-weight: bold; }
code span.op { color: #666666; }
code span.ot { color: #007020; }
code span.pp { color: #bc7a00; }
code span.sc { color: #4070a0; }
code span.ss { color: #bb6688; }
code span.st { color: #4070a0; }
code span.va { color: #19177c; }
code span.vs { color: #4070a0; }
code span.wa { color: #60a0b0; font-weight: bold; font-style: italic; }

/* 6. MEDIA QUERIES CONSOLIDATE */
@media screen {
  div.columns {
    gap: min(4vw, 1.5em);
  }
  div.column {
    overflow-x: auto;
  }
  div.sourceCode {
    overflow: auto;
  }
  pre > code.sourceCode > span > a:first-child::before {
    text-decoration: underline;
  }
}

@media (max-width: 600px) {
  body {
    padding: 12px;
  }
  header {
    margin-bottom: 2em;
  }
  h1 {
    font-size: 1.8em;
  }
}

@media print {
  html {
    background-color: white;
  }
  body {
    background-color: transparent;
    color: black;
  }
  p, h2, h3 {
    orphans: 3;
    widows: 3;
  }
  h2, h3, h4 {
    page-break-after: avoid;
  }
  code {
    background-color: transparent;
    padding: 0;
  }
  pre, div.sourceCode {
    background-color: transparent;
    border: 1px solid #cccccc;
  }
  thead {
    display: table-header-group;
  }
  tr {
    page-break-inside: avoid;
  }
  th {
    background-color: transparent;
    border-bottom: 2px solid black;
  }
  pre > code.sourceCode {
    white-space: pre-wrap;
  }
  pre > code.sourceCode > span {
    text-indent: -5em;
    padding-left: 5em;
  }
}
EOF
echo "[✓] Creato html_style.css"

# 1.2 Foglio di stile per EPUB3
cat << 'EOF' > epub.css
/* 5. BLOCCHI CODICE, DIAGRAMMI & TESTO MONOSPACE */
code {
  font-family: "Roboto Mono", "Noto Sans Mono", "DejaVu Sans Mono", "Courier New", Courier, monospace;
  font-size: 0.82em; /* Dimensione calibrata: leggibile, compatta, non microscopica */
  text-align: left;
  letter-spacing: 0;
  word-spacing: 0;
  hyphens: none;
  -webkit-hyphens: none;
}

pre {
  font-family: "Roboto Mono", "Noto Sans Mono", "DejaVu Sans Mono", "Courier New", Courier, monospace;
  font-size: 0.82em; /* Permette a circa 60-70 colonne di respirare senza sfasarsi */
  line-height: 1.3;
  margin: 1em 0;
  padding: 0.6em 0.8em;
  border: 1px solid #888888;
  border-radius: 4px;
  
  /* Allineamento rigido e divieto assoluto di ritorni a capo automatici */
  text-align: left;
  letter-spacing: 0;
  word-spacing: 0;
  white-space: pre !important;
  word-break: keep-all !important;
  overflow-wrap: normal !important;
  hyphens: none;
  -webkit-hyphens: none;

  /* Disattivazione legature (impedisce che '->' si fonda o alteri il conteggio spazi) */
  font-variant-ligatures: none;
  font-feature-settings: "liga" 0;
  tab-size: 4;

  /* Modello di contenimento sicuro per ReadEra */
  display: block;
  box-sizing: border-box;
  max-width: 100%;
  overflow-x: auto;
}

pre code {
  font-size: 1em; /* Eredita lo 0.82em di pre senza rimpicciolimenti a cascata */
  padding: 0;
  border: none;
  white-space: pre !important;
  word-break: keep-all !important;
  overflow-wrap: normal !important;
  letter-spacing: 0;
  word-spacing: 0;
}

/* Specifico per il tag generato da Pandoc per il testo puro */
pre.text, pre.text code {
  white-space: pre !important;
  word-break: keep-all !important;
  overflow-wrap: normal !important;
}
EOF
echo "[✓] Creato epub.css"

# 1.3 File di stile Typst per PDF
cat << 'EOF' > typst-style.typ
// Impostazioni generali di pagina e testo
#set page(paper: "a5", margin: 1.5cm)
#set par(justify: true, leading: 0.65em)
#set text(fill: rgb("#1a1a1a"))

// Titoli: disattivata sillabazione e verde distintivo per H1 e H2
#show heading: set text(hyphenate: false)
#show heading.where(level: 1): set text(size: 24pt, fill: rgb("#3b8503"))
#show heading.where(level: 2): set text(size: 18pt, fill: rgb("#3b8503"))
#show heading.where(level: 3): set text(size: 16pt, fill: rgb("#1a1a1a"))
#show heading.where(level: 4): set text(size: 14pt, fill: rgb("#1a1a1a"))

// Citazioni: barra laterale grigia e rientro (formattazione testo naturale)
#show quote: it => block(
  stroke: (left: 2.5pt + rgb("#888888")),
  inset: (left: 10pt, y: 4pt),
  it.body
)

// Blocchi di codice: scheda con sfondo, bordo sottile e angoli arrotondati
#show raw.where(block: true): it => block(
  fill: rgb("#f7f7f7"),
  stroke: 0.75pt + rgb("#e1e4e8"),
  radius: 4pt,
  inset: (x: 10pt, y: 8pt),
  width: 100%,
  it
)

// Codice in linea: micro-sfondo evidenziatore coordinato
#show raw.where(block: false): box.with(
  fill: rgb("#f2f2f2"),
  inset: (x: 3pt, y: 0pt),
  outset: (y: 2pt),
  radius: 2.5pt
)

// Tabelle: bordo pulito e testata con sfondo coordinato
#set table(
  stroke: 0.5pt + rgb("#a0a0a0"),
  fill: (col, row) => if row == 0 { rgb("#f2f2f2") } else { none },
  inset: (x: 6pt, y: 5pt)
)
EOF
echo "[✓] Creato typst-style.typ"

# 1.4 Filtro Lua ottimizzato (Gestione callout, ancore WPS Office e pagebreak)
cat << 'EOF' > manual_filters.lua
local callout_styles = {
  TIP       = { fill = "#e6f4ea", stroke = "#137333", title = "SUGGERIMENTO" },
  WARNING   = { fill = "#fef7e0", stroke = "#b06000", title = "ATTENZIONE" },
  NOTE      = { fill = "#e8f0fe", stroke = "#1a73e8", title = "NOTA" },
  IMPORTANT = { fill = "#f3e8fd", stroke = "#a142f4", title = "IMPORTANTE" },
  CAUTION   = { fill = "#fce8e6", stroke = "#c5221f", title = "CAUTELA" }
}

local function is_format(target)
  if target == "html" then
    return FORMAT == "html" or FORMAT == "html5"
  elseif target == "epub" then
    return FORMAT == "epub" or FORMAT == "epub3"
  else
    return FORMAT == target
  end
end

local function has_class(el, target_class)
  if not el or not el.classes then return false end
  for _, c in ipairs(el.classes) do
    if c == target_class then return true end
  end
  return false
end

local function get_callout_info(el)
  if not el or not el.classes then return nil end
  for _, class in ipairs(el.classes) do
    local clean = class:upper():gsub("^CALLOUT%-", ""):gsub("^ALERT%-", "")
    if callout_styles[clean] then
      return callout_styles[clean], clean
    end
  end
  return nil
end

local function extract_anchor_name(text)
  if not text or type(text) ~= "string" then return nil end
  local name = text:match('[nN][aA][mM][eE]%s*=%s*["\']([^"\']+)["\']')
            or text:match('[iI][dD]%s*=%s*["\']([^"\']+)["\']')
            or text:match('[nN][aA][mM][eE]%s*=%s*([^%s>]+)')
            or text:match('[iI][dD]%s*=%s*([^%s>]+)')
  return name
end

local function is_pagebreak_block(el)
  if el.t == "Div" and (has_class(el, "pagebreak") or has_class(el, "page-break")) then
    return true
  end
  if el.t == "RawBlock" and el.format == "html" then
    local t = el.text:lower()
    if t:find("pagebreak") or t:find("page%-break") then
      return true
    end
  end
  return false
end

local function make_pagebreak()
  if is_format("typst") then
    return pandoc.RawBlock("typst", "#pagebreak()")
  elseif is_format("docx") then
    return pandoc.RawBlock("openxml", '<w:p><w:r><w:br w:type="page"/></w:r></w:p>')
  else
    return pandoc.RawBlock("html", '<div style="page-break-after: always; break-after: page;"></div>')
  end
end

local function parse_style_attr(text)
  if not text or type(text) ~= "string" then return nil end
  if not text:find("@style") then return nil end

  local inner = text:match("<!--%s*@style:?%s*(.-)%s*-->") or text
  local attrs = {}

  for item in inner:gmatch("([^;]+)") do
    local k, v = item:match("([%w%-]+)%s*[:=]%s*(.+)")
    if k and v then
      k = k:gsub("^%s+", ""):gsub("%s+$", ""):lower()
      v = v:gsub("^%s+", ""):gsub("%s+$", ""):gsub("%s*%-%->%s*$", ""):gsub('^["\']', ""):gsub('["\']$', ""):gsub("%s+$", "")
      attrs[k] = v
    end
  end

  return attrs
end

local function transform_inline_list(inlines, is_header)
  if not inlines then return inlines end
  local new_inlines = pandoc.Inlines({})

  for i = 1, #inlines do
    local el = inlines[i]

    if el.t == "RawInline" and el.format == "html" then
      local attrs = parse_style_attr(el.text)
      local anchor = extract_anchor_name(el.text)

      if attrs then
        if #new_inlines > 0 then
          local color  = attrs.color
          local bg     = attrs.background or attrs.bg
          local size   = attrs.size
          local weight = attrs.weight

          local targets = {}
          if is_header then
            for _, item in ipairs(new_inlines) do
              table.insert(targets, item)
            end
            new_inlines = pandoc.Inlines({})
          else
            local prev_el = new_inlines[#new_inlines]
            table.remove(new_inlines, #new_inlines)
            table.insert(targets, prev_el)
          end

          if is_format("typst") then
            local typst_size = size and size:gsub("px$", "pt")
            local text_opts = {}
            if color then table.insert(text_opts, 'fill: rgb("' .. color .. '")') end
            if typst_size then table.insert(text_opts, 'size: ' .. typst_size) end
            if weight then table.insert(text_opts, 'weight: "' .. weight .. '"') end

            local open_t = ""
            local close_t = ""
            if #text_opts > 0 then
              open_t = open_t .. '#text(' .. table.concat(text_opts, ", ") .. ')[ '
              open_t = open_t:gsub("%[ $", "[")
              close_t = ']' .. close_t
            end
            if bg then
              open_t = '#box(fill: rgb("' .. bg .. '"), inset: (x: 4pt, y: 2pt), radius: 3pt)[' .. open_t
              close_t = close_t .. ']'
            end

            table.insert(new_inlines, pandoc.RawInline("typst", open_t))
            for _, t_el in ipairs(targets) do table.insert(new_inlines, t_el) end
            table.insert(new_inlines, pandoc.RawInline("typst", close_t))

          elseif is_format("html") then
            local css = {}
            if color then table.insert(css, "color: " .. color) end
            if size then table.insert(css, "font-size: " .. size) end
            if weight then table.insert(css, "font-weight: " .. weight) end
            if bg then
              table.insert(css, "background-color: " .. bg)
              table.insert(css, "padding: 2px 4px; border-radius: 3px")
            end

            local span = pandoc.Span(targets, pandoc.Attr("", {}, { style = table.concat(css, "; ") }))
            table.insert(new_inlines, span)
          else
            for _, t_el in ipairs(targets) do table.insert(new_inlines, t_el) end
          end
        end

      elseif anchor and anchor ~= "" then
        table.insert(new_inlines, pandoc.Span({}, pandoc.Attr(anchor, {}, {})))
      else
        table.insert(new_inlines, el)
      end
    else
      table.insert(new_inlines, el)
    end
  end

  return new_inlines
end

function Pandoc(doc)
  local blocks = doc.blocks
  local new_blocks = {}
  local i = 1

  while i <= #blocks do
    local b = blocks[i]

    if is_pagebreak_block(b) then
      table.insert(new_blocks, make_pagebreak())
      i = i + 1

    elseif b.t == "Div" and get_callout_info(b) then
      local style, kind = get_callout_info(b)
      local content = {}

      for _, child in ipairs(b.content) do
        if not (child.t == "Div" and has_class(child, "title")) then
          table.insert(content, child)
        end
      end

      if is_format("typst") then
        local open_t = string.format(
          '#v(0.8em); #rect(fill: rgb("%s"), stroke: (paint: rgb("%s"), thickness: 1.5pt), inset: 14pt, radius: 6pt, width: 100%%)[\n',
          style.fill, style.stroke
        )
        local close_t = '\n]; #v(0.8em);'
        table.insert(new_blocks, pandoc.RawBlock("typst", open_t))
        for _, cb in ipairs(content) do table.insert(new_blocks, cb) end
        table.insert(new_blocks, pandoc.RawBlock("typst", close_t))

      elseif is_format("epub") then
        table.insert(new_blocks, pandoc.Div(content, pandoc.Attr("", { "callout", kind:lower() }, {})))

      elseif is_format("html") then
        local css = string.format(
          "background-color: %s; border-left: 5px solid %s; padding: 12px 16px; margin: 16px 0; border-radius: 4px;",
          style.fill, style.stroke
        )
        table.insert(new_blocks, pandoc.Div(content, pandoc.Attr("", { "callout", kind:lower() }, { style = css })))

      elseif is_format("docx") then
        table.insert(new_blocks, pandoc.BlockQuote(content))
      else
        table.insert(new_blocks, b)
      end

      i = i + 1

    else
      local anchor_name = nil

      if b.t == "RawBlock" and b.format == "html" then
        anchor_name = extract_anchor_name(b.text)
      elseif b.t == "Para" then
        for _, inline in ipairs(b.content) do
          if inline.t == "RawInline" and inline.format == "html" then
            anchor_name = extract_anchor_name(inline.text)
            if anchor_name then break end
          end
        end
      end

      if anchor_name then
        local next_b = blocks[i + 1]

        if next_b and next_b.t == "Header" then
          if is_format("docx") then
            -- PER DOCX: Segnalibro puntuale a estensione zero (evita salto a fine capitolo in WPS Office)
            table.insert(next_b.content, 1, pandoc.Span({}, pandoc.Attr(anchor_name, {}, {})))
          else
            next_b.identifier = anchor_name
          end
          i = i + 1

        elseif next_b and next_b.t == "Para" then
          table.insert(next_b.content, 1, pandoc.Span({}, pandoc.Attr(anchor_name, {}, {})))
          i = i + 1

        else
          table.insert(new_blocks, pandoc.Para({ pandoc.Span({}, pandoc.Attr(anchor_name, {}, {})) }))
          i = i + 1
        end

      else
        if b.t == "Header" then
          local title_text = pandoc.utils.stringify(b):lower()

          if title_text:find("indice completo") and (not b.identifier or b.identifier == "") then
            if is_format("docx") then
              table.insert(b.content, 1, pandoc.Span({}, pandoc.Attr("indice-completo", {}, {})))
            else
              b.identifier = "indice-completo"
            end
          end

          if is_format("epub") then
            if title_text:find("indice completo")
               or title_text:find("assurance del software assistito da llm")
               or title_text:find("principi, verifica, evidenze e governance") then
              table.insert(b.classes, "unnumbered")
              table.insert(b.classes, "unlisted")
            end
          else
            b.content = transform_inline_list(b.content, true)
          end

          table.insert(new_blocks, b)

        elseif b.t == "Para" or b.t == "Plain" then
          b.content = transform_inline_list(b.content, false)
          table.insert(new_blocks, b)

        else
          table.insert(new_blocks, b)
        end

        i = i + 1
      end
    end
  end

  return pandoc.Pandoc(new_blocks, doc.meta)
end
EOF
echo "[✓] Creato manual_filters.lua"

# 1.5 Generazione al volo del modello DOCX con numerazione pagina
cat << 'EOF' | base64 -d > custom-reference.docx
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
cmVsc1BLBQYAAAAADwAPALwDAACZLAAAAAA=

EOF
echo "[✓] Creato custom-reference.docx"

# ================================================
# 2. Compilazione dei Documenti con Pandoc
# ================================================

# 2.1 Compilazione PDF (Typst con foglio di stile dedicato)
echo "==> [1/4] Compilazione PDF (Typst)..."
pandoc -f gfm+raw_html "$SOURCE_FILE" -o "${BASENAME}.pdf" \
  --pdf-engine=typst \
  "${FONT_OPT[@]}" \
  --lua-filter=manual_filters.lua \
  -V mainfont="Roboto" \
  -V fontsize=11pt \
  -H typst-style.typ

# 2.2 Compilazione DOCX (Opzione 1: Nativa e Sicura, zero corruzione su WPS Office)
echo "==> [2/4] Compilazione DOCX..."
pandoc -f gfm+raw_html "$SOURCE_FILE" -o "${BASENAME}.docx" \
  --reference-doc=custom-reference.docx \
  --lua-filter=manual_filters.lua

# 2.3 Compilazione HTML5 (Standalone con CSS incorporato ed embed-resources)
echo "==> [3/4] Compilazione HTML5..."
pandoc -f gfm+raw_html "$SOURCE_FILE" -o "${BASENAME}.html" \
  --standalone \
  --embed-resources \
  --css=html_style.css \
  --lua-filter=manual_filters.lua \
  -V pagetitle="$DOC_TITLE"

# 2.4 Compilazione EPUB3 (Split livello 2 con foglio di stile ripulito)
echo "==> [4/4] Compilazione EPUB3..."
pandoc -f gfm+raw_html "$SOURCE_FILE" -o "${BASENAME}.epub" \
  --lua-filter=manual_filters.lua \
  --split-level=2 \
  --toc-depth=2 \
  --epub-title-page=false \
  --css=epub.css \
  -M title="$DOC_TITLE" \
  -M author="Cristian Evangelisti" \
  -M lang="it"

# ================================================
# 3. Normalizzazione e Controllo di Coerenza per EPUB3
# ================================================
normalize_epub_nav() {
  local epub_file="$1"
  local work_dir
  work_dir="$(mktemp -d)"

  local extracted_dir="$work_dir/root"
  local rebuilt_epub="$work_dir/rebuilt.epub"

  mkdir -p "$extracted_dir"
  if ! unzip -q "$epub_file" -d "$extracted_dir"; then
    rm -rf "$work_dir"
    return 0
  fi

  local nav_rel
  nav_rel="$(unzip -Z1 "$epub_file" | awk '$0 ~ /(^|\/)nav\.xhtml$/ { print; exit }')"

  if [ -n "$nav_rel" ] && [ -f "$extracted_dir/$nav_rel" ]; then
    local nav_file="$extracted_dir/$nav_rel"
    local nav_pretty="$work_dir/nav.pretty.xhtml"
    local nav_fixed="$work_dir/nav.fixed.xhtml"

    sed 's/></>\n</g' "$nav_file" > "$nav_pretty"

    local toc_nav
    toc_nav="$(sed -n '/<nav[^>]*epub:type="toc"/,/<\/nav>/p' "$nav_pretty")"

    local duplicate_href
    duplicate_href="$(printf '%s\n' "$toc_nav" | grep -o 'href="[^"]*"' | sort | uniq -d | head -n 1 | sed 's/^href="//; s/"$//')"

    if [ -n "$duplicate_href" ]; then
      echo "  [!] EPUB: duplicazione residua rilevata su $duplicate_href, rimozione..."
      awk -v target="$duplicate_href" '
        BEGIN { in_toc = 0; li_depth = 0; removed = 0; buf = "" }
        {
          line = $0
          if (!in_toc) {
            print line
            if (line ~ /<nav[^>]*epub:type="toc"/) in_toc = 1
            next
          }
          if (line ~ /^<\/nav>/) { print line; in_toc = 0; next }
          if (li_depth == 0) {
            if (line ~ /^<li([ >])/ && !removed) {
              li_depth = 1; buf = line ORS; has_target = 0; has_nested_list = 0; next
            }
            print line; next
          }
          buf = buf line ORS
          if (line ~ ("href=\"" target "\"")) has_target = 1
          if (line ~ /^<ol([ >]|\/>|$)/ || line ~ /^<ul([ >]|\/>|$)/) has_nested_list = 1
          if (line ~ /^<li([ >])/) li_depth++
          if (line ~ /^<\/li>/) {
            li_depth--
            if (li_depth == 0) {
              if (has_target && !has_nested_list && !removed) { removed = 1 } else { printf "%s", buf }
              buf = ""; has_target = 0; has_nested_list = 0
            }
          }
        }
        END { if (li_depth != 0 || !removed) exit 2 }
      ' "$nav_pretty" > "$nav_fixed" 2>/dev/null && cp "$nav_fixed" "$nav_file" || true

      (
        cd "$extracted_dir"
        zip -X0 "$rebuilt_epub" mimetype >/dev/null
        zip -Xr9D "$rebuilt_epub" META-INF EPUB >/dev/null
      ) 2>/dev/null && mv "$rebuilt_epub" "$epub_file" || true
    fi
  fi

  rm -rf "$work_dir"
  echo "  [✓] EPUB: controllo di coerenza navigazione completato"
}

normalize_epub_nav "${BASENAME}.epub"

# ================================================
# 4. Validazione Strutturale e Oracoli di Conformità (High-Assurance)
# ================================================
echo "========================================"
echo "==> [Fase di Assurance e Verifica degli Artefatti]"
echo "========================================"

check_file() {
  local f="$1"
  if [ ! -s "$f" ]; then
    echo "  [✗] ERRORE: $f non esiste o è vuoto!"
    exit 1
  fi
  local sz
  sz=$(wc -c < "$f")
  echo "  [✓] $f presente ($sz bytes)"
}

check_zip() {
  local f="$1"
  check_file "$f"
  if unzip -tq "$f" >/dev/null 2>&1; then
    echo "  [✓] $f: integrità archivio container ZIP/XML verificata"
  else
    echo "  [✗] ERRORE CRITICO: $f è corrotto o non è un archivio valido!"
    exit 1
  fi
}

check_file "${BASENAME}.pdf"
check_file "${BASENAME}.html"
check_zip  "${BASENAME}.docx"
check_zip  "${BASENAME}.epub"

echo "==> [Verifica Oracolo TOC su EPUB3]"
NAV_CONTENT=$(unzip -p "${BASENAME}.epub" "*nav.xhtml" 2>/dev/null || true)

if [ -z "$NAV_CONTENT" ]; then
  echo "  [✗] ERRORE: nav.xhtml non trovato all'interno dell'EPUB!"
  exit 1
fi

if echo "$NAV_CONTENT" | grep -q 'style='; then
  echo "  [✗] ALLERTA: nav.xhtml contiene attributi di stile inline 'style=' non ammessi!"
  exit 1
else
  echo "  [✓] nav.xhtml: nessun attributo di stile inline rilevato"
fi

if echo "$NAV_CONTENT" | grep -qi 'indice-completo'; then
  echo "  [✗] ERRORE: la voce 'indice-completo' è ancora referenziata nella TOC di nav.xhtml"
  exit 1
else
  echo "  [✓] nav.xhtml: indice testuale manuale escluso correttamente dalla navigazione nativa"
fi

TOC_NAV=$(printf '%s\n' "$NAV_CONTENT" | sed -n '/<nav epub:type="toc"/,/<\/nav>/p')
DUPLICATE_TOC_HREFS=$(printf '%s\n' "$TOC_NAV" | grep -o 'href="[^"]*"' | sort | uniq -d || true)

if [ -n "$DUPLICATE_TOC_HREFS" ]; then
  echo "  [✗] ERRORE: la TOC EPUB contiene link duplicati:"
  printf '%s\n' "$DUPLICATE_TOC_HREFS" | sed 's/^/      /'
  exit 1
else
  echo "  [✓] nav.xhtml: nessun link duplicato nella TOC nativa"
fi

echo "========================================"
echo " [SUCCESSO] Pipeline completata con evidenze oggettive:"
echo "   - File sorgente: $SOURCE_FILE"
echo "   - PDF (Typst): ${BASENAME}.pdf"
echo "   - DOCX:        ${BASENAME}.docx"
echo "   - HTML5:       ${BASENAME}.html"
echo "   - EPUB3:       ${BASENAME}.epub"
echo "========================================"
