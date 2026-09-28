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
      html_style.css epub.css typst-style.typ manual_filters.lua

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
  max-width: 36em;
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
/* ============================================
   FOGLIO DI STILE EPUB3 PER PANDOC
   Compatibile con: Apple Books, Kobo, Kindle (KF8/KFX), ADE, ReadEra
   ============================================ */

/* 1. TIPOGRAFIA & TITOLI */
h1, h2, h3, h4, h5, h6 {
  margin-top: 1.4em;
  margin-bottom: 0.5em;
  font-weight: bold;
  break-after: avoid;
  page-break-after: avoid;
}

h1, h2 {
  color: #3b8503;
}

h5, h6 {
  font-size: 1em;
  font-style: italic;
}

h6 {
  font-weight: normal;
}

header {
  margin-bottom: 2em;
  text-align: center;
}

/* 2. PARAGRAFI, CITAZIONI & STRUTTURA */
p {
  margin: 0.8em 0;
  orphans: 2;
  widows: 2;
}

blockquote {
  margin: 1.2em 0 1.2em 1.2em;
  padding-left: 0.8em;
  border-left: 3px solid #888888;
  break-inside: avoid;
  page-break-inside: avoid;
}

hr {
  border: none;
  border-top: 1px solid #888888;
  margin: 1.5em 0;
}

ol, ul {
  padding-left: 1.5em;
  margin: 0.8em 0;
}

li > ol, li > ul {
  margin-top: 0;
}

/* Indice (TOC) */
#TOC li {
  list-style: none;
}

#TOC ul {
  padding-left: 1.2em;
}

#TOC > ul {
  padding-left: 0;
}

#TOC a {
  text-decoration: none;
}

/* 3. IMMAGINI & MEDIA */
img, svg {
  max-width: 100%;
  height: auto;
  break-inside: avoid;
  page-break-inside: avoid;
}

/* 4. TABELLE */
table {
  margin: 1.2em 0;
  border-collapse: collapse;
  width: 100%;
  break-inside: avoid;
  page-break-inside: avoid;
}

table caption {
  margin-bottom: 0.5em;
  font-weight: bold;
  text-align: left;
}

th, td {
  border: 1px solid #777777;
  padding: 0.3em 0.5em;
  vertical-align: top;
}

th {
  font-weight: bold;
  border-bottom: 2px solid #333333;
}

thead {
  display: table-header-group;
}

tr {
  break-inside: avoid;
  page-break-inside: avoid;
}

/* 5. BLOCCHI CODICE & TESTO MONOSPACE */
code {
  font-family: monospace;
  font-size: 85%;
  hyphens: manual;
}

pre {
  margin: 1em 0;
  padding: 0.7em 0.9em;
  border: 1px solid #888888;
  border-radius: 4px;
  overflow-x: auto;
  white-space: pre-wrap;
  break-inside: avoid;
  page-break-inside: avoid;
}

pre code {
  padding: 0;
  border: none;
  white-space: pre-wrap;
}

div.sourceCode {
  margin: 1em 0;
}

pre.sourceCode {
  margin: 0;
}

/* 6. BOX DI AVVISO (CALLOUT) */
div.callout {
  padding: 0.8em 1em;
  margin: 1.2em 0;
  border-left: 4px solid #777777;
  border-radius: 4px;
  break-inside: avoid;
  page-break-inside: avoid;
}

div.callout.tip { border-left-color: #137333; }
div.callout.warning { border-left-color: #b06000; }
div.callout.note { border-left-color: #1a73e8; }
div.callout.important { border-left-color: #a142f4; }
div.callout.caution { border-left-color: #c5221f; }
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
