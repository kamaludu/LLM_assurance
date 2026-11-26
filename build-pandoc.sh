#!/usr/bin/env bash
# ==========================================
# PIPELINE DI PUBBLICAZIONE MULTI-FORMATO
# Autore:       Cristian Evangelisti
# File:         build-pandoc.sh
# Descrizione:  Compilatore e validatore documentale da Markdown verso 4 target:
#               - PDF   (impaginato tramite Typst e motore A5)
#               - DOCX  (OpenXML nativo con ancore puntuali compatibili WPS Office)
#               - HTML5 (Standalone con risorse e singolo blocco CSS embedded)
#               - EPUB3 (Validato XML, con normalizzazione TOC a 2 livelli)
# Prerequisiti: pandoc, typst, zip, unzip, awk
# Licenza:      GNU General Public License v3.0 o successiva (GPLv3-or-later)
# SPDX-License-Identifier: GPL-3.0-or-later
# Copyright (C) 2026 Cristian Evangelisti
# ==========================================

set -Eeuo pipefail
trap 'rc=$?; echo "ERRORE CRITICO alla riga $LINENO (exit code: $rc)" >&2' ERR

echo "============================================"
echo " Avvio Pipeline di Pubblicazione Multi-Formato (High-Assurance)"
echo " Target: PDF (Typst), DOCX (OpenXML), HTML5, EPUB3"
echo "============================================"
echo ""

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
require_cmd awk

echo "------------------------------------------"
echo "  AVVISO IMPORTANTE"
echo "Assicurati di aver aperto il terminale ed eseguito lo script"
echo "nella STESSA directory in cui risiedono i file Markdown (.md)."
echo ""
echo "  Cartella di lavoro attuale:"
echo "$(pwd)"
echo "------------------------------------------"
echo ""

shopt -s nullglob nocaseglob
md_files=(*.md)
shopt -u nullglob nocaseglob

if [ ${#md_files[@]} -eq 0 ]; then
  echo "ERRORE CRITICO: Nessun file Markdown (.md / .MD) trovato in $(pwd)!"
  exit 1
fi

echo "File Markdown rilevati nella cartella corrente:"
PS3="Seleziona il numero del file da convertire: "
SOURCE_FILE=""
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

[ -n "$SOURCE_FILE" ] || { echo ""; echo "Operazione annullata dall'utente (EOF)."; exit 0; }

if [ -n "${DOC_AUTHOR+x}" ]; then
  AUTHOR_INPUT="$DOC_AUTHOR"
else
  echo ""
  read -r -p "Inserisci Nome e Cognome dell'autore per i metadati (Invio per omettere): " AUTHOR_INPUT || AUTHOR_INPUT=""
fi
AUTHOR_INPUT="${AUTHOR_INPUT#"${AUTHOR_INPUT%%[![:space:]]*}"}"
AUTHOR_INPUT="${AUTHOR_INPUT%"${AUTHOR_INPUT##*[![:space:]]}"}"

BASENAME="${SOURCE_FILE%.*}"
echo ""
echo "[✓] File sorgente selezionato   : $SOURCE_FILE"
echo "[✓] Prefisso file generati      : $BASENAME.*"
echo "[✓] Autore (solo metadati)      : ${AUTHOR_INPUT:-(non impostato)}"
echo ""

DOC_TITLE="Assurance del Software Assistito da LLM"
if [ "$SOURCE_FILE" != "LLM_assurance.md" ]; then
  DOC_TITLE="${BASENAME//_/ }"
fi

BUILD_DIR="$(mktemp -d)"
trap 'rm -rf "$BUILD_DIR"' EXIT

rm -f "${BASENAME}.pdf" "${BASENAME}.docx" "${BASENAME}.html" "${BASENAME}.epub"

FONT_OPT=()
if [ -n "${FONT_PATH:-}" ]; then
  FONT_OPT=( "--pdf-engine-opt=--font-path=${FONT_PATH}" )
elif [ -d "/system/fonts" ]; then
  FONT_OPT=( "--pdf-engine-opt=--font-path=/system/fonts" )
fi

# ==================================================
# 1. Configurazioni, Stili e Filtro Lua in $BUILD_DIR
# ==================================================

cat << 'EOF' > "$BUILD_DIR/default-meta.yaml"
lang: it
EOF

cat << 'EOF' > "$BUILD_DIR/typst-meta.yaml"
margin:
  x: 1.5cm
  y: 1.5cm
EOF

# 1.1 CSS HTML5 Standalone
cat << 'EOF' > "$BUILD_DIR/html_style.css"
html { color: #1a1a1a; background-color: #fdfdfd; -webkit-text-size-adjust: 100%; }
body { margin: 0 auto; max-width: 52em; padding: 50px; hyphens: auto; overflow-wrap: break-word; text-rendering: optimizeLegibility; font-kerning: normal; font-family: system-ui, -apple-system, sans-serif; }
header { margin-bottom: 4em; text-align: center; }
h1, h2, h3, h4, h5, h6 { margin-top: 1.4em; }
h1, h2 { color: #3b8503; }
h5, h6 { font-size: 1em; font-style: italic; }
h6 { font-weight: normal; }
p { margin: 1em 0; }
a, a:visited { color: #1a1a1a; }
blockquote { margin: 1em 0 1em 1.7em; padding-left: 1em; border-left: 2px solid #e6e6e6; color: #606060; }
hr { border: none; border-top: 1px solid #1a1a1a; height: 1px; margin: 1em 0; }
ol, ul { padding-left: 1.7em; margin-top: 1em; }
li > ol, li > ul { margin-top: 0; }

.callout { padding: 12px 16px; margin: 16px 0; border-radius: 4px; border-left: 5px solid #1a73e8; background-color: #e8f0fe; }
.callout > .callout-title { margin-top: 0; margin-bottom: 0.45em; font-weight: 700; letter-spacing: 0.02em; }
.callout > .callout-title p { margin: 0; }
.callout > :first-child { margin-top: 0; }
.callout > :last-child { margin-bottom: 0; }
.callout-tip       { background-color: #e6f4ea; border-left-color: #137333; }
.callout-tip       > .callout-title { color: #137333; }
.callout-warning   { background-color: #fef7e0; border-left-color: #b06000; }
.callout-warning   > .callout-title { color: #b06000; }
.callout-note      { background-color: #e8f0fe; border-left-color: #1a73e8; }
.callout-note      > .callout-title { color: #1a73e8; }
.callout-important { background-color: #f3e8fd; border-left-color: #a142f4; }
.callout-important > .callout-title { color: #a142f4; }
.callout-caution   { background-color: #fce8e6; border-left-color: #c5221f; }
.callout-caution   > .callout-title { color: #c5221f; }

img, svg { max-width: 100%; height: auto; }
table { margin: 1em 0; border-collapse: collapse; width: 100%; overflow-x: auto; display: block; font-variant-numeric: lining-nums tabular-nums; }
table caption { margin-bottom: 0.75em; }
th, td { border: 1px solid #1a1a1a; min-width: 10ch; hyphens: none; overflow-wrap: normal; }
th a, td a { overflow-wrap: anywhere; }
th { padding: 0.25em 0.5em; background-color: #f2f2f2; }
td { padding: 0.125em 0.5em; }
#TOC li { list-style: none; }
#TOC ul { padding-left: 1.3em; }
#TOC > ul { padding-left: 0; }
#TOC a:not(:hover) { text-decoration: none; }

span.smallcaps { font-variant: small-caps; }
div.columns { display: flex; gap: 1.5em; }
div.column { flex: auto; }
div.hanging-indent { margin-left: 1.5em; text-indent: -1.5em; }
ul.task-list[class] { list-style: none; }
ul.task-list li input[type="checkbox"] { font-size: inherit; width: 0.8em; margin: 0 0.8em 0.2em -1.6em; vertical-align: middle; }

code { white-space: pre-wrap; font-family: Menlo, Monaco, Consolas, 'Lucida Console', monospace; font-size: 85%; margin: 0; hyphens: manual; background-color: #f2f2f2; padding: 0.15em 0.35em; border-radius: 3px; }
pre, div.sourceCode { background-color: #f7f7f7; border: 1px solid #e1e4e8; border-radius: 4px; padding: 0.75em 1em; }
pre { margin: 1em 0; overflow: auto; }
div.sourceCode pre { background-color: transparent; border: none; border-radius: 0; padding: 0; margin: 0; }
pre code { background-color: transparent; padding: 0; border-radius: 0; overflow: visible; overflow-wrap: normal; white-space: pre; }

@media screen {
  div.columns { gap: min(4vw, 1.5em); }
  div.column { overflow-x: auto; }
}
@media (max-width: 600px) {
  body { padding: 12px; }
  header { margin-bottom: 2em; }
  h1 { font-size: 1.8em; }
}
@media print {
  html { color-scheme: light only; background-color: white; }
  body { background-color: transparent; color: black; }
  a, a:visited, blockquote { color: black; }
  p, h2, h3 { orphans: 3; widows: 3; }
  h2, h3, h4 { page-break-after: avoid; }
  .pagebreak-before { page-break-before: always; break-before: page; }
  code { background-color: transparent; padding: 0; }
  pre, div.sourceCode { background-color: transparent; border: 1px solid #cccccc; }
  pre code, pre > code.sourceCode { white-space: pre-wrap; overflow-wrap: break-word; }
  table { display: table; overflow: visible; }
  thead { display: table-header-group; }
  tr { page-break-inside: avoid; }
  th, td { min-width: 0; hyphens: auto; overflow-wrap: anywhere; }
  th { background-color: transparent; border-bottom: 2px solid black; }
  .callout { break-inside: avoid; page-break-inside: avoid; }
}
EOF

# 1.1b Template HTML5 derivato (singolo blocco <style>)
HAS_CITATIONS_TPL=0
if pandoc --print-default-data-file=templates/styles.citations.html > "$BUILD_DIR/styles.citations.html" 2>/dev/null && [ -s "$BUILD_DIR/styles.citations.html" ]; then
  HAS_CITATIONS_TPL=1
else
  rm -f "$BUILD_DIR/styles.citations.html"
fi

pandoc -D html5 | awk -v css_file="$BUILD_DIR/html_style.css" -v has_cit="$HAS_CITATIONS_TPL" '
  BEGIN {
    css = ""
    while ((getline l < css_file) > 0) { gsub(/\$/, "$$", l); css = css l "\n" }
    close(css_file); injected = 0
  }
  {
    if (!injected && $0 ~ /\$\{?[[:space:]]*styles\.html\(\)[[:space:]]*\}?/) {
      print "$if(highlighting-css)$\n$highlighting-css$\n$endif$"
      if (has_cit == 1) print "$if(csl-css)$\n$styles.citations.html()$\n$endif$"
      printf "%s", css; injected = 1; next
    }
    if (!injected && $0 ~ /^[[:space:]]*<\/style>[[:space:]]*$/) { printf "%s", css; injected = 1 }
    print
  }
  END { if (!injected) exit 2 }
' > "$BUILD_DIR/custom.html5"
echo "[✓] Creati html_style.css e custom.html5 (singolo <style>)"

# 1.2 CSS EPUB3 (calibrato per Lithium/WebView e compatibile con lettori EPUB3 conformi)
cat << 'EOF' > "$BUILD_DIR/epub.css"
body { margin: 0; padding: 0; }
p { text-indent: 0; margin: 1em 0; }
img { max-width: 100%; height: auto; }
sup { vertical-align: super; font-size: smaller; }
sub { vertical-align: sub; font-size: smaller; }

h1, h2, h3, h4, h5, h6 {
  text-indent: 0;
  text-align: left;
  font-weight: bold;
  page-break-before: auto;
  break-before: auto;
  page-break-after: avoid;
  page-break-inside: avoid;
}
h1 { margin: 1em 0 0.4em 0; font-size: 1.8em; line-height: 1.3; }
h2 { margin: 1.4em 0 0.4em 0; font-size: 1.4em; line-height: 1.3; }
h3 { margin: 1.2em 0 0.3em 0; font-size: 1.2em; }
h4 { margin: 1.1em 0 0.3em 0; font-size: 1.1em; }
h5, h6 { margin: 1em 0 0.3em 0; font-size: 1em; }

ol, ul { margin: 1em 0 0 1.7em; }
li > ol, li > ul { margin-top: 0; }
blockquote { margin: 1em 0 1em 1.7em; }
hr { border: 0; border-top: 1px solid #888888; height: 1px; margin: 1em 0; }

table { margin: 1em 0; border-collapse: collapse; width: 100%; max-width: 100%; }
table.fixed-cols { table-layout: fixed; }
table caption { margin-bottom: 0.75em; }
th, td {
  border: 1px solid #888888;
  padding: 0.25em 0.5em;
  vertical-align: top;
  overflow-wrap: anywhere;
  word-wrap: break-word;
}
th { background-color: #f2f2f2; }

nav#toc ol, nav#landmarks ol { padding: 0; margin-left: 1em; }
nav#toc ol li, nav#landmarks ol li { list-style-type: none; margin: 0; padding: 0; }
span.smallcaps { font-variant: small-caps; }
ul.task-list { list-style: none; }
a.footnote-ref { vertical-align: super; }

.callout { margin: 1em 0; padding: 0.7em 0.9em; border-left: 4px solid #1a73e8; background-color: #e8f0fe; }
.callout-title { margin-top: 0; margin-bottom: 0.4em; font-weight: bold; }
.callout-title p { margin: 0; }
.callout > :first-child { margin-top: 0; }
.callout > :last-child { margin-bottom: 0; }
.callout-tip       { border-left-color: #137333; background-color: #e6f4ea; }
.callout-tip       .callout-title { color: #137333; }
.callout-warning   { border-left-color: #b06000; background-color: #fef7e0; }
.callout-warning   .callout-title { color: #b06000; }
.callout-note      { border-left-color: #1a73e8; background-color: #e8f0fe; }
.callout-note      .callout-title { color: #1a73e8; }
.callout-important { border-left-color: #a142f4; background-color: #f3e8fd; }
.callout-important .callout-title { color: #a142f4; }
.callout-caution   { border-left-color: #c5221f; background-color: #fce8e6; }
.callout-caution   .callout-title { color: #c5221f; }

/* Codice inline (`...`) */
body code {
  display: inline;
  font-family: "Droid Sans Mono", "DejaVu Sans Mono", "Noto Sans Mono", "Roboto Mono", Menlo, Consolas, "Courier New", monospace;
  font-size: 95%;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  word-break: break-word;
  text-align: left;
}

/* Blocchi codice normali ed evidenziati (python, bash, ecc.): dimensione normale e wrapping contenuto nella pagina */
body pre,
body div.sourceCode,
body pre.sourceCode {
  font-family: "Droid Sans Mono", "DejaVu Sans Mono", "Noto Sans Mono", "Roboto Mono", Menlo, Consolas, "Courier New", monospace;
  font-size: 90%;
  line-height: 1.35;
}

body pre {
  display: block;
  box-sizing: border-box;
  max-width: 100%;
  margin: 1em 0;
  padding: 0.6em 0.8em;
  border: 1px solid #888888;
  border-radius: 4px;
  text-align: left;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  word-wrap: break-word;
  word-break: break-word;
  overflow: hidden;
}

body div.sourceCode {
  margin: 1em 0;
  max-width: 100%;
  overflow: hidden !important;
}

body div.sourceCode pre {
  margin: 0;
  font-size: 100%;
}

body pre code,
body pre > code.sourceCode,
body div.sourceCode code {
  display: inline;
  font-size: 100%;
  padding: 0;
  border: 0;
  white-space: pre-wrap !important;
  overflow-wrap: anywhere;
  word-wrap: break-word;
  word-break: break-word;
}

body pre > code.sourceCode > span {
  display: inline !important;
  white-space: pre-wrap !important;
}

/* Blocchi ```text: leggermente ridotti e a-capo controllato per evitare trabocco tra colonne paginate */
body pre.text,
body pre.sourceCode.text {
  font-size: 80%;
  line-height: 1.25;
  white-space: pre-wrap !important;
  overflow-wrap: anywhere;
  word-wrap: break-word;
  word-break: break-word;
  overflow: hidden;
}

body div.sourceCode pre.text {
  font-size: 88%;
}

body pre.text code,
body pre.text > code.sourceCode {
  font-size: 100%;
  white-space: pre-wrap !important;
  overflow-wrap: anywhere;
  word-wrap: break-word;
  word-break: break-word;
}

/* Diagrammi ASCII larghi (> 40 colonne UTF-8): riduzione al 68% con anti-trabocco */
body pre.text.ascii-wide,
body pre.sourceCode.text.ascii-wide {
  font-size: 68%;
  line-height: 1.15;
}

body div.sourceCode.ascii-wide pre.text,
body div.sourceCode pre.text.ascii-wide {
  font-size: 75.5%;
  line-height: 1.15;
}
EOF
echo "[✓] Creato epub.css (calibrato per EPUB3/Lithium)"

# 1.3 Stile Typst (A5, autore solo metadato PDF, helper @style)
: > "$BUILD_DIR/typst-style.typ"
if [ -n "$AUTHOR_INPUT" ]; then
  ESC_AUTHOR_TYPST="${AUTHOR_INPUT//\\/\\\\}"
  ESC_AUTHOR_TYPST="${ESC_AUTHOR_TYPST//\"/\\\"}"
  printf '#set document(author: "%s")\n\n' "$ESC_AUTHOR_TYPST" > "$BUILD_DIR/typst-style.typ"
fi

cat << 'EOF' >> "$BUILD_DIR/typst-style.typ"
#set par(justify: true, leading: 0.65em)
#set text(fill: rgb("#1a1a1a"))

#let _fit_styled_line(bg: none, body) = layout(avail => {
  let single = if bg != none { box(fill: bg, inset: (x: 4pt, y: 2pt), radius: 3pt, body) } else { box(body) }
  let w = measure(single).width
  if w <= avail.width or w <= 0pt { single } else {
    let target_w = w + 0.5pt
    let ratio = avail.width / target_w
    if ratio >= 0.45 {
      scale(ratio * 100%, reflow: true, block(inset: 0pt, width: target_w, single))
    } else if bg != none {
      highlight(fill: bg, extent: 2pt, radius: 3pt, body)
    } else { body }
  }
})

#show heading: set text(hyphenate: false)
#show heading.where(level: 1): set text(size: 24pt, fill: rgb("#3b8503"))
#show heading.where(level: 2): set text(size: 18pt, fill: rgb("#3b8503"))
#show heading.where(level: 3): set text(size: 16pt, fill: rgb("#1a1a1a"))
#show heading.where(level: 4): set text(size: 14pt, fill: rgb("#1a1a1a"))

#show quote: it => block(stroke: (left: 2.5pt + rgb("#888888")), inset: (left: 10pt, y: 4pt), it.body)
#show raw.where(block: true): it => block(
  fill: rgb("#f7f7f7"),
  stroke: 0.75pt + rgb("#e1e4e8"),
  radius: 4pt,
  inset: (x: 10pt, y: 8pt),
  width: 100%,
  {
    set par(justify: false)
    let lang = if it.lang == none { "" } else { lower(it.lang) }
    if lang == "ascii-diagram" {
      layout(avail => context {
        let nat_w = measure(it).width
        if nat_w <= avail.width or nat_w <= 0pt { it } else {
          let ratio = avail.width / (nat_w + 1pt)
          set text(size: calc.max(6pt, text.size * ratio))
          it
        }
      })
    } else if lang == "" or lang == "text" or lang == "txt" or lang == "plaintext" {
      it
    } else {
      context {
        set par(leading: 0.45em)
        if it.lines.len() == 0 { [] } else {
          let num_w = measure(text(size: 0.85em, str(it.lines.len()))).width + 0.1em
          grid(
            columns: (num_w, 1fr),
            column-gutter: 0.75em,
            row-gutter: 0.45em,
            align: (right, left),
            ..it.lines.map(line => (
              text(fill: rgb("#777777"), size: 0.85em)[#line.number],
              if line.text == "" { sym.zws } else { line },
            )).flatten()
          )
        }
      }
    }
  }
)
#show raw.where(block: false): it => highlight(fill: rgb("#f2f2f2"), extent: 1.5pt, radius: 2.5pt, it)
#set table(stroke: 0.5pt + rgb("#a0a0a0"), fill: (col, row) => if row == 0 { rgb("#f2f2f2") } else { none }, inset: (x: 4.5pt, y: 4pt))
#show figure.where(kind: table): set block(breakable: true)
#show table: set text(size: 8pt)
#show table: set par(justify: false)
#show table.cell.where(y: 0): set text(weight: "bold")
#show table: it => {
  show raw.where(block: false): r => {
    show regex("[_.]"): m => m + sym.zws
    r
  }
  it
}
EOF
echo "[✓] Creato typst-style.typ"

# 1.4 Filtro Lua
cat << 'EOF' > "$BUILD_DIR/manual_filters.lua"
local callout_styles = {
  TIP       = { fill = "#e6f4ea", stroke = "#137333" },
  WARNING   = { fill = "#fef7e0", stroke = "#b06000" },
  NOTE      = { fill = "#e8f0fe", stroke = "#1a73e8" },
  IMPORTANT = { fill = "#f3e8fd", stroke = "#a142f4" },
  CAUTION   = { fill = "#fce8e6", stroke = "#c5221f" }
}

local default_alert_titles = { tip = true, warning = true, note = true, important = true, caution = true }

local css_named_colors = {
  black = "#000000", white = "#ffffff", red = "#ff0000", green = "#008000",
  blue = "#0000ff", yellow = "#ffff00", orange = "#ffa500", purple = "#800080",
  gray = "#808080", grey = "#808080", darkgray = "#a9a9a9", darkgrey = "#a9a9a9",
  lightgray = "#d3d3d3", lightgrey = "#d3d3d3", navy = "#000080", teal = "#008080",
  maroon = "#800000", olive = "#808000", silver = "#c0c0c0", fuchsia = "#ff00ff",
  aqua = "#00ffff", cyan = "#00ffff", magenta = "#ff00ff"
}

local function is_format(target)
  if target == "html" then return FORMAT == "html" or FORMAT == "html5"
  elseif target == "epub" then return FORMAT == "epub" or FORMAT == "epub3"
  else return FORMAT == target end
end

local function has_class(el, target_class)
  if not el or not el.classes then return false end
  for _, c in ipairs(el.classes) do if c == target_class then return true end end
  return false
end

local function max_line_chars(text)
  if not text or text == "" then return 0 end
  local max_len = 0
  for line in (text .. "\n"):gmatch("([^\r\n]*)\r?\n") do
    local norm = line:gsub("\t", "    ")
    local len = (utf8 and utf8.len(norm)) or #norm
    if len > max_len then max_len = len end
  end
  return max_len
end

local function is_ascii_diagram(text)
  if not text or text == "" then return false end
  local box_chars = 0
  if utf8 and utf8.codes then
    for _, cp in utf8.codes(text) do
      if (cp >= 0x2500 and cp <= 0x257F)
         or cp == 0x25B2 or cp == 0x25BC or cp == 0x25C0 or cp == 0x25B6
         or cp == 0x25BA or cp == 0x25C4 or cp == 0x25B3 or cp == 0x25BD then
        box_chars = box_chars + 1
        if box_chars >= 2 then return true end
      end
    end
  end

  local diagram_lines = 0
  for line in (text .. "\n"):gmatch("([^\r\n]*)\r?\n") do
    local is_diag_line = false
    if line:find("%+%-%-+") or line:find("%+===+") or line:find("%+[%-%s]+%+") then
      is_diag_line = true
    elseif line:match("^%s*|.*|%s*$")
        or line:match("^%s*[|`]%-%-")
        or line:find("%-%-+>") or line:find("<%-%-+")
        or line:find("==+>") or line:find("<==+")
        or line:find("%[[^%]]+%]%s*[-=]+>") or line:find("<[-=]+%s*%[[^%]]+%]")
        or line:match("^%s*[|v^↓↑]+%s*$") then
      is_diag_line = true
    end
    if is_diag_line then
      diagram_lines = diagram_lines + 1
      if diagram_lines >= 2 then
        return true
      end
    end
  end
  return false
end

local function fit_decorative_code_lines(text, max_cols)
  if not text or text == "" then return text end
  local out, pos, len = {}, 1, #text
  while pos <= len do
    local nl = text:find("\n", pos, true)
    local line, has_nl
    if nl then line = text:sub(pos, nl - 1); has_nl = true; pos = nl + 1
    else line = text:sub(pos); has_nl = false; pos = len + 1 end
    local cr = ""
    if line:sub(-1) == "\r" then cr = "\r"; line = line:sub(1, -2) end

    local pfx, rep_run, rep_ch, sfx =
      line:match("^([%s]*)(([=_#*~-])%3%3%3%3%3%3%3%3%3%3%3%3%3%3+)([%s]*)$")
    if not pfx then
      pfx, rep_run, rep_ch, sfx =
        line:match("^([%s]*//[%s]*)(([=_#*~-])%3%3%3%3%3%3%3%3%3%3%3%3%3%3+)([%s]*)$")
    end
    if not pfx then
      pfx, rep_run, rep_ch, sfx =
        line:match("^([%s]*/%*[%s]*)(([=_#*~-])%3%3%3%3%3%3%3%3%3%3%3%3%3%3+)([%s]*%*/?[%s]*)$")
    end
    if not pfx then
      pfx, rep_run, rep_ch, sfx =
        line:match("^([%s]*%-%-[%s]*)(([=_#*~-])%3%3%3%3%3%3%3%3%3%3%3%3%3%3+)([%s]*)$")
    end
    if not pfx then
      pfx, rep_run, rep_ch, sfx =
        line:match("^([%s]*#[%s]*)(([=_*~-])%3%3%3%3%3%3%3%3%3%3%3%3%3%3+)([%s]*)$")
    end

    if pfx and rep_run then
      local pfx_w = (utf8 and utf8.len(pfx:gsub("\t", "    "))) or #pfx:gsub("\t", "    ")
      local sfx_w = (utf8 and utf8.len(sfx)) or #sfx
      local target = math.max(12, max_cols - pfx_w - sfx_w)
      if #rep_run > target then line = pfx .. string.rep(rep_ch, target) .. sfx end
    else
      local head, trun, tch, tsfx =
        line:match("^(.-)(([=_#*~-])%3%3%3%3%3%3%3%3%3%3%3%3%3%3+)([%s]*%*/?[%s]*)$")
      if head and head ~= "" and trun then
        local head_w = (utf8 and utf8.len(head:gsub("\t", "    "))) or #head:gsub("\t", "    ")
        local tsfx_w = (utf8 and utf8.len(tsfx)) or #tsfx
        if head_w + #trun + tsfx_w > max_cols then
          local target = math.max(6, max_cols - head_w - tsfx_w)
          if #trun > target then line = head .. string.rep(tch, target) .. tsfx end
        end
      end
    end
    table.insert(out, line .. cr .. (has_nl and "\n" or ""))
  end
  return table.concat(out)
end

local function is_normative_trace_table(tbl)
  if not tbl.colspecs or #tbl.colspecs ~= 4 then return false end
  if not tbl.head or not tbl.head.rows or #tbl.head.rows == 0 then return false end
  local cells = tbl.head.rows[1].cells
  if not cells or #cells ~= 4 then return false end
  return pandoc.utils.stringify(cells[1]):lower():find("standard", 1, true) ~= nil
     and pandoc.utils.stringify(cells[2]):lower():find("obiettivo", 1, true) ~= nil
     and pandoc.utils.stringify(cells[3]):lower():find("capitoli", 1, true) ~= nil
     and pandoc.utils.stringify(cells[4]):lower():find("evidenza", 1, true) ~= nil
end

local function bold_docx_header_rows(rows)
  if not rows then return end
  for _, row in ipairs(rows) do
    for _, cell in ipairs(row.cells) do
      for _, blk in ipairs(cell.contents) do
        if (blk.t == "Para" or blk.t == "Plain") and #blk.content > 0 then
          if not (#blk.content == 1 and blk.content[1].t == "Strong") then
            blk.content = pandoc.Inlines({ pandoc.Strong(blk.content) })
          end
        end
      end
    end
  end
end

local function get_callout_info(el)
  if not el or not el.classes then return nil end
  for _, class in ipairs(el.classes) do
    local clean = class:upper():gsub("^CALLOUT%-", ""):gsub("^ALERT%-", "")
    if callout_styles[clean] then return callout_styles[clean], clean end
  end
  return nil
end

local function sanitize_void_tag(text, tag_name)
  return (text:gsub("<([%a]+)(%s*[^>]*)>", function(tag, attrs)
    if tag:lower() ~= tag_name then return nil end
    if attrs ~= "" and not attrs:match("^%s") and attrs ~= "/" then return nil end
    if attrs:match("/%s*$") then
      return "<" .. tag_name .. attrs .. ">"
    elseif attrs:match("^%s*$") then
      return "<" .. tag_name .. " />"
    else
      return "<" .. tag_name .. attrs:gsub("%s+$", "") .. " />"
    end
  end))
end

local function sanitize_html_for_xhtml(text)
  if not text or type(text) ~= "string" then return text end
  text = sanitize_void_tag(text, "br")
  text = sanitize_void_tag(text, "hr")
  text = sanitize_void_tag(text, "img")
  return text
end

local function typst_color(c)
  if not c then return nil end
  local lc = c:lower():gsub("^%s+", ""):gsub("%s+$", "")
  if lc:match("^#%x+$") then return 'rgb("' .. lc .. '")'
  elseif css_named_colors[lc] then return 'rgb("' .. css_named_colors[lc] .. '")'
  elseif lc:match("^rgb%(") or lc:match("^luma%(") then return lc end
  return nil
end

local function typst_size(s)
  if not s then return nil end
  local ls = s:lower():gsub("^%s+", ""):gsub("%s+$", "")
  if ls:match("^%d+%.?%d*px$") then return (ls:gsub("px$", "pt"))
  elseif ls:match("^%d+%.?%d*[ptmcni][mt]?$") or ls:match("^%d+%.?%d*em$") or ls:match("^%d+%.?%d*%%$") then return ls
  elseif ls:match("^%d+%.?%d*$") then return ls .. "pt" end
  return nil
end

local function extract_anchor_info(text)
  if not text or type(text) ~= "string" then return nil, false end
  local trimmed = text:gsub("^%s+", ""):gsub("%s+$", "")
  local self_closed = false
  if trimmed:match("</[aA]%s*>$") then
    trimmed = trimmed:gsub("</[aA]%s*>$", ""):gsub("%s+$", "")
    self_closed = true
  end
  local attrs_part = trimmed:match("^<[aA](%s+[^>]+)$")
  if attrs_part then
    if attrs_part:sub(-1) == "/" then attrs_part = attrs_part:sub(1, -2); self_closed = true end
  else
    attrs_part = trimmed:match("^<[aA](%s+[^>]+)>$")
    if not attrs_part then return nil, false end
    if attrs_part:sub(-1) == "/" then attrs_part = attrs_part:sub(1, -2); self_closed = true end
  end
  if attrs_part:lower():match("%shref%s*=") then return nil, false end
  local name = attrs_part:match('%s[nN][aA][mM][eE]%s*=%s*"([^"]+)"')
            or attrs_part:match("%s[nN][aA][mM][eE]%s*=%s*'([^']+)'")
            or attrs_part:match('%s[iI][dD]%s*=%s*"([^"]+)"')
            or attrs_part:match("%s[iI][dD]%s*=%s*'([^']+)'")
            or attrs_part:match('%s[nN][aA][mM][eE]%s*=%s*([^%s/>"\']+)')
            or attrs_part:match('%s[iI][dD]%s*=%s*([^%s/>"\']+)')
  if name and name ~= "" then return name, self_closed end
  return nil, false
end

local function is_closing_a_tag(text)
  return type(text) == "string" and text:match("^%s*</[aA]%s*>%s*$") ~= nil
end

local function is_standalone_anchor_para(para)
  if not para or para.t ~= "Para" then return nil end
  local found = nil
  for _, inline in ipairs(para.content) do
    if inline.t == "Space" or inline.t == "SoftBreak" or inline.t == "LineBreak" then
    elseif inline.t == "RawInline" and inline.format == "html" then
      local name = extract_anchor_info(inline.text)
      if name then found = found or name
      elseif not is_closing_a_tag(inline.text) then return nil end
    else return nil end
  end
  return found
end

local function is_pagebreak_block(el)
  if el.t == "Div" and (has_class(el, "pagebreak") or has_class(el, "page-break")) then return true end
  if el.t == "RawBlock" and el.format == "html" then
    local t = el.text:gsub("^%s+", ""):gsub("%s+$", ""):lower()
    return t:match('^<div[^>]*class=["\'][^"\']*page%-?break[^"\']*["\'][^>]*>%s*</div>$') ~= nil
        or t:match('^<div[^>]*class=["\'][^"\']*page%-?break[^"\']*["\'][^>]*/>$') ~= nil
        or t:match('^<hr[^>]*class=["\'][^"\']*page%-?break[^"\']*["\'][^>]*/?>$') ~= nil
        or t:match('^<!%-%-%s*page%-?break%s*%-%->$') ~= nil
  end
  return false
end

local function next_real_block_is_h1(blocks, idx)
  for k = idx, #blocks do
    local nb = blocks[k]
    if (nb.t == "RawBlock" and nb.format == "html" and extract_anchor_info(nb.text))
       or (nb.t == "Para" and is_standalone_anchor_para(nb)) then
    elseif nb.t == "Header" and nb.level == 1 then return true
    else return false end
  end
  return false
end

local function parse_style_attr(text)
  if not text or type(text) ~= "string" or not text:find("@style") then return nil end
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

local function is_standalone_styled_para(inlines)
  if not inlines or #inlines < 2 then return false end
  local styles, before, after, seen = 0, 0, 0, false
  for _, el in ipairs(inlines) do
    if el.t == "Space" or el.t == "SoftBreak" or el.t == "LineBreak" then
    elseif el.t == "RawInline" and el.format == "html" and parse_style_attr(el.text) then
      styles = styles + 1; seen = true
    elseif el.t == "Span" and #el.content == 0 and el.identifier ~= "" then
    elseif el.t == "RawInline" and el.format == "html" and (extract_anchor_info(el.text) or is_closing_a_tag(el.text)) then
    else
      if seen then after = after + 1 else before = before + 1 end
    end
  end
  return styles == 1 and before == 1 and after == 0
end

local function extract_header_inline_anchors(header)
  if is_format("docx") then return end
  local cleaned, skip_close_a, promoted_id = pandoc.Inlines({}), false, nil
  for _, el in ipairs(header.content) do
    if skip_close_a and el.t == "RawInline" and el.format == "html" and is_closing_a_tag(el.text) then
      skip_close_a = false
    elseif el.t == "RawInline" and el.format == "html" then
      local aid, sc = extract_anchor_info(el.text)
      if aid then
        if not sc then skip_close_a = true end
        if not promoted_id then promoted_id = aid; header.identifier = aid
        elseif header.identifier ~= aid then
          table.insert(cleaned, is_format("typst")
            and pandoc.RawInline("typst", string.format('#box(width: 0pt, height: 0pt)[]<%s>', aid))
            or pandoc.Span({}, pandoc.Attr(aid, {}, {})))
        end
      else table.insert(cleaned, el) end
    elseif el.t == "Span" and #el.content == 0 and el.identifier ~= "" then
      if not promoted_id then promoted_id = el.identifier; header.identifier = el.identifier
      elseif header.identifier ~= el.identifier then
        table.insert(cleaned, is_format("typst")
          and pandoc.RawInline("typst", string.format('#box(width: 0pt, height: 0pt)[]<%s>', el.identifier))
          or el)
      end
    elseif promoted_id and #cleaned == 0 and (el.t == "Space" or el.t == "SoftBreak") then
    else table.insert(cleaned, el) end
  end
  if promoted_id then
    while #cleaned > 0 and (cleaned[#cleaned].t == "Space" or cleaned[#cleaned].t == "SoftBreak") do
      table.remove(cleaned, #cleaned)
    end
  end
  header.content = cleaned
end

local function transform_inline_list(inlines, mode)
  if not inlines then return inlines end
  local is_header, is_standalone = (mode == "header"), (mode == "standalone")
  local new_inlines, skip_next_close_a = pandoc.Inlines({}), false

  for _, el in ipairs(inlines) do
    if el.t == "RawInline" and el.format == "html" then
      if skip_next_close_a and is_closing_a_tag(el.text) then
        skip_next_close_a = false
      else
        local attrs = parse_style_attr(el.text)
        local anchor, self_closed = extract_anchor_info(el.text)
        if attrs and #new_inlines > 0 then
          local targets = {}
          if is_header then
            for _, item in ipairs(new_inlines) do table.insert(targets, item) end
            new_inlines = pandoc.Inlines({})
          else
            table.insert(targets, new_inlines[#new_inlines])
            table.remove(new_inlines, #new_inlines)
          end

          if is_format("typst") then
            local t_color, t_bg, t_size = typst_color(attrs.color), typst_color(attrs.background or attrs.bg), typst_size(attrs.size)
            local opts = {}
            if t_color then table.insert(opts, 'fill: ' .. t_color) end
            if t_size then table.insert(opts, 'size: ' .. t_size) end
            if attrs.weight then
              table.insert(opts, attrs.weight:match("^%d+$") and ('weight: ' .. attrs.weight) or ('weight: "' .. attrs.weight:gsub('"', '\\"') .. '"'))
            end
            local open_t, close_t = "", ""
            if #opts > 0 then open_t = '#text(' .. table.concat(opts, ", ") .. ')['; close_t = ']' end
            if is_standalone then
              open_t = (t_bg and ('#_fit_styled_line(bg: ' .. t_bg .. ')[') or '#_fit_styled_line()[') .. open_t
              close_t = close_t .. ']'
            elseif t_bg then
              open_t = '#highlight(fill: ' .. t_bg .. ', extent: 2pt, radius: 3pt)[' .. open_t
              close_t = close_t .. ']'
            end
            if open_t ~= "" then table.insert(new_inlines, pandoc.RawInline("typst", open_t)) end
            for _, t_el in ipairs(targets) do table.insert(new_inlines, t_el) end
            if close_t ~= "" then table.insert(new_inlines, pandoc.RawInline("typst", close_t)) end
          elseif is_format("html") then
            local css = {}
            if attrs.color then table.insert(css, "color: " .. attrs.color) end
            if attrs.size then table.insert(css, "font-size: " .. attrs.size) end
            if attrs.weight then table.insert(css, "font-weight: " .. attrs.weight) end
            local bg = attrs.background or attrs.bg
            if bg then table.insert(css, "background-color: " .. bg); table.insert(css, "padding: 2px 4px; border-radius: 3px") end
            table.insert(new_inlines, pandoc.Span(targets, pandoc.Attr("", {}, { style = table.concat(css, "; ") })))
          else
            for _, t_el in ipairs(targets) do table.insert(new_inlines, t_el) end
          end
        elseif anchor then
          table.insert(new_inlines, pandoc.Span({}, pandoc.Attr(anchor, {}, {})))
          if not self_closed then skip_next_close_a = true end
        elseif not attrs then
          table.insert(new_inlines, el)
        end
      end
    else
      table.insert(new_inlines, el)
    end
  end
  return new_inlines
end

local function emit_block_with_pagebreak(new_blocks, blk, pb)
  if not pb then table.insert(new_blocks, blk); return end
  if is_format("typst") then
    table.insert(new_blocks, pandoc.RawBlock("typst", "#pagebreak(weak: true)"))
    table.insert(new_blocks, blk)
  elseif is_format("docx") then
    table.insert(new_blocks, pandoc.RawBlock("openxml", '<w:p><w:r><w:t>__PANDOC_PB_NEXT__</w:t></w:r></w:p>'))
    table.insert(new_blocks, blk)
  elseif is_format("epub") then
    if not (blk.t == "Header" and blk.level == 1) then
      table.insert(new_blocks, pandoc.Div({}, pandoc.Attr("", { "epub-pb-next" }, {})))
    end
    table.insert(new_blocks, blk)
  elseif is_format("html") then
    if blk.t == "Div" or blk.t == "Header" then
      if not has_class(blk, "pagebreak-before") then table.insert(blk.classes, "pagebreak-before") end
      table.insert(new_blocks, blk)
    else
      table.insert(new_blocks, pandoc.Div({ blk }, pandoc.Attr("", { "pagebreak-before" }, {})))
    end
  else
    table.insert(new_blocks, blk)
  end
end

local process_blocks

local function process_table_rows(rows)
  if not rows then return end
  for _, row in ipairs(rows) do
    for _, cell in ipairs(row.cells) do cell.contents = process_blocks(cell.contents, false) end
  end
end

process_blocks = function(blocks, is_top_level)
  local new_blocks, pending_pb, pending_anchors = pandoc.Blocks({}), false, {}

  local function flush_anchors_as_para()
    if #pending_anchors == 0 then return end
    local spans = pandoc.Inlines({})
    for _, a in ipairs(pending_anchors) do table.insert(spans, pandoc.Span({}, pandoc.Attr(a, {}, {}))) end
    pending_anchors = {}
    emit_block_with_pagebreak(new_blocks, pandoc.Para(spans), pending_pb)
    pending_pb = false
  end

  for i = 1, #blocks do
    local b = blocks[i]
    if is_pagebreak_block(b) then
      pending_pb = true
    else
      local anchor_name = (b.t == "RawBlock" and b.format == "html" and extract_anchor_info(b.text))
                       or (b.t == "Para" and is_standalone_anchor_para(b))
      if anchor_name then
        table.insert(pending_anchors, anchor_name)
      elseif b.t == "Div" and get_callout_info(b) then
        flush_anchors_as_para()
        local style, kind = get_callout_info(b)
        local raw_content, custom_title = {}, nil
        for _, child in ipairs(b.content) do
          if child.t == "Div" and has_class(child, "title") then
            local t_str = pandoc.utils.stringify(child):gsub("^%s+", ""):gsub("%s+$", "")
            if t_str ~= "" and not default_alert_titles[t_str:lower()] then custom_title = t_str end
          else table.insert(raw_content, child) end
        end
        local content = process_blocks(raw_content, false)

        if is_format("typst") then
          local open_t = string.format('#v(0.8em); #block(breakable: true, fill: rgb("%s"), stroke: (left: 3pt + rgb("%s"), rest: 0.75pt + rgb("%s")), inset: 12pt, radius: 4pt, width: 100%%)[\n', style.fill, style.stroke, style.stroke)
          emit_block_with_pagebreak(new_blocks, pandoc.RawBlock("typst", open_t), pending_pb)
          pending_pb = false
          if custom_title then
            table.insert(new_blocks, pandoc.Para({ pandoc.RawInline("typst", string.format('#text(weight: "bold", fill: rgb("%s"))[', style.stroke)), pandoc.Str(custom_title), pandoc.RawInline("typst", "]") }))
          end
          for _, cb in ipairs(content) do table.insert(new_blocks, cb) end
          table.insert(new_blocks, pandoc.RawBlock("typst", '\n]; #v(0.8em);'))
        elseif is_format("html") or is_format("epub") then
          local full = {}
          if custom_title then
            table.insert(full, pandoc.Div({ pandoc.Para({ pandoc.Strong({ pandoc.Str(custom_title) }) }) }, pandoc.Attr("", { "callout-title" }, {})))
          end
          for _, cb in ipairs(content) do table.insert(full, cb) end
          emit_block_with_pagebreak(new_blocks, pandoc.Div(full, pandoc.Attr("", { "callout", "callout-" .. kind:lower() }, {})), pending_pb)
          pending_pb = false
        elseif is_format("docx") then
          local full = {}
          if custom_title then
            table.insert(full, pandoc.Para({ pandoc.Strong({ pandoc.Str(custom_title .. ":") }) }))
          end
          for _, cb in ipairs(content) do table.insert(full, cb) end
          emit_block_with_pagebreak(new_blocks, pandoc.BlockQuote(full), pending_pb)
          pending_pb = false
        else
          emit_block_with_pagebreak(new_blocks, b, pending_pb)
          pending_pb = false
        end
      elseif b.t == "Header" then
        extract_header_inline_anchors(b)
        if #pending_anchors > 0 then
          if is_format("docx") then
            for idx_a = #pending_anchors, 1, -1 do table.insert(b.content, 1, pandoc.Span({}, pandoc.Attr(pending_anchors[idx_a], {}, {}))) end
          else
            b.identifier = pending_anchors[1]
            for idx_a = #pending_anchors, 2, -1 do
              table.insert(b.content, is_format("typst")
                and pandoc.RawInline("typst", string.format('#box(width: 0pt, height: 0pt)[]<%s>', pending_anchors[idx_a]))
                or pandoc.Span({}, pandoc.Attr(pending_anchors[idx_a], {}, {})))
            end
          end
          pending_anchors = {}
        end
        b.content = transform_inline_list(b.content, "header")
        local title_text = pandoc.utils.stringify(b):lower()
        if title_text:find("indice completo") then
          if is_format("docx") then
            b.identifier = ""
            if not (b.content[1] and b.content[1].t == "Span" and b.content[1].identifier == "indice-completo") then
              table.insert(b.content, 1, pandoc.Span({}, pandoc.Attr("indice-completo", {}, {})))
            end
          elseif not b.identifier or b.identifier == "" then
            b.identifier = "indice-completo"
          end
        end
        if is_format("epub") and (title_text:find("indice completo") or title_text:find("assurance del software assistito da llm") or title_text:find("principi, verifica, evidenze e governance")) then
          table.insert(b.classes, "unnumbered")
          table.insert(b.classes, "unlisted")
        end
        emit_block_with_pagebreak(new_blocks, b, pending_pb)
        pending_pb = false
      elseif b.t == "Para" or b.t == "Plain" then
        if #pending_anchors > 0 then
          for idx_a = #pending_anchors, 1, -1 do table.insert(b.content, 1, pandoc.Span({}, pandoc.Attr(pending_anchors[idx_a], {}, {}))) end
          pending_anchors = {}
        end
        local mode = (b.t == "Para" and is_standalone_styled_para(b.content)) and "standalone" or "inline"
        b.content = transform_inline_list(b.content, mode)
        if is_top_level and is_format("epub") and pending_pb and next_real_block_is_h1(blocks, i + 1) then
          table.insert(new_blocks, pandoc.Div({}, pandoc.Attr("", { "epub-move-start" }, {})))
          table.insert(new_blocks, b)
          table.insert(new_blocks, pandoc.Div({}, pandoc.Attr("", { "epub-move-end" }, {})))
          pending_pb = false
        else
          emit_block_with_pagebreak(new_blocks, b, pending_pb)
          pending_pb = false
        end
      elseif b.t == "CodeBlock" then
        flush_anchors_as_para()
        local is_plain_text = has_class(b, "text") or has_class(b, "txt") or has_class(b, "plaintext")
        local is_untagged = (#b.classes == 0)
        if is_format("typst") and (is_plain_text or is_untagged) then
          if is_ascii_diagram(b.text) then
            local new_classes = {}
            for _, c in ipairs(b.classes) do
              if c ~= "text" and c ~= "txt" and c ~= "plaintext" then
                table.insert(new_classes, c)
              end
            end
            table.insert(new_classes, 1, "ascii-diagram")
            b.classes = new_classes
          end
        elseif is_format("epub") and (is_plain_text or is_untagged) then
          if is_ascii_diagram(b.text) and max_line_chars(b.text) > 40 then
            if not has_class(b, "text") then table.insert(b.classes, "text") end
            if not has_class(b, "ascii-wide") then table.insert(b.classes, "ascii-wide") end
          end
        end
        if is_format("typst") and not is_ascii_diagram(b.text) then
          b.text = fit_decorative_code_lines(b.text, 40)
        end
        emit_block_with_pagebreak(new_blocks, b, pending_pb)
        pending_pb = false
      else
        flush_anchors_as_para()
        if b.t == "Div" or b.t == "BlockQuote" then b.content = process_blocks(b.content, false)
        elseif b.t == "BulletList" or b.t == "OrderedList" then
          for idx, item in ipairs(b.content) do b.content[idx] = process_blocks(item, false) end
        elseif b.t == "DefinitionList" then
          for _, item in ipairs(b.content) do
            item[1] = transform_inline_list(item[1], "inline")
            for j, def in ipairs(item[2]) do item[2][j] = process_blocks(def, false) end
          end
        elseif b.t == "Table" then
          if is_normative_trace_table(b) then
            local cs = b.colspecs
            local w = { 0.18, 0.32, 0.23, 0.27 }
            for idx_c = 1, 4 do cs[idx_c][2] = w[idx_c] end
            b.colspecs = cs
            if is_format("epub") and not has_class(b, "fixed-cols") then
              table.insert(b.classes, "fixed-cols")
            end
          end
          if b.caption and b.caption.long then b.caption.long = process_blocks(b.caption.long, false) end
          if b.head then
            process_table_rows(b.head.rows)
            if is_format("docx") then bold_docx_header_rows(b.head.rows) end
          end
          if b.bodies then for _, body in ipairs(b.bodies) do process_table_rows(body.head); process_table_rows(body.body) end end
          if b.foot then process_table_rows(b.foot.rows) end
        elseif b.t == "Figure" then
          b.content = process_blocks(b.content, false)
          if b.caption and b.caption.long then b.caption.long = process_blocks(b.caption.long, false) end
        end
        emit_block_with_pagebreak(new_blocks, b, pending_pb)
        pending_pb = false
      end
    end
  end

  flush_anchors_as_para()
  return new_blocks
end

function Pandoc(doc)
  local default_title = (os and os.getenv and os.getenv("PANDOC_DOC_TITLE")) or ""
  local default_author = (os and os.getenv and os.getenv("PANDOC_DOC_AUTHOR")) or ""

  if is_format("typst") or is_format("docx") then
    doc = doc:walk({
      RawInline = function(el)
        if el.format == "html" and el.text:match("^%s*<[bB][rR]%s*/?>%s*$") then
          return pandoc.LineBreak()
        end
      end
    })
  end

  if is_format("html") then
    if not doc.meta.title and not doc.meta.pagetitle and default_title ~= "" then doc.meta.pagetitle = pandoc.MetaString(default_title) end
    if not doc.meta.author and not doc.meta["author-meta"] and default_author ~= "" then doc.meta["author-meta"] = pandoc.MetaString(default_author) end
  elseif is_format("epub") then
    if not doc.meta.title and default_title ~= "" then doc.meta.title = pandoc.MetaString(default_title) end
    if not doc.meta.author and default_author ~= "" then doc.meta.author = pandoc.MetaString(default_author) end
    -- Converte eventuali tag HTML void non auto-chiusi (<br>, <hr>, <img>) in XHTML valido ovunque nel documento
    doc = doc:walk({
      RawInline = function(el)
        if el.format == "html" then
          local c = sanitize_html_for_xhtml(el.text)
          if c ~= el.text then el.text = c; return el end
        end
      end,
      RawBlock = function(el)
        if el.format == "html" then
          local c = sanitize_html_for_xhtml(el.text)
          if c ~= el.text then el.text = c; return el end
        end
      end
    })
  end

  return pandoc.Pandoc(process_blocks(doc.blocks, true), doc.meta)
end
EOF
echo "[✓] Creato manual_filters.lua"

# 1.5 Modello DOCX nativo con numerazione pagina centrata e font monospace portabile
pandoc --print-default-data-file reference.docx > "$BUILD_DIR/base-reference.docx"
mkdir -p "$BUILD_DIR/ref_unpacked"
unzip -q "$BUILD_DIR/base-reference.docx" -d "$BUILD_DIR/ref_unpacked"

if [ -f "$BUILD_DIR/ref_unpacked/word/styles.xml" ]; then
  awk '
    function patch_style_block(block,    rf) {
      rf = "<w:rFonts w:ascii=\"Courier New\" w:hAnsi=\"Courier New\" w:cs=\"Courier New\"/>"
      if (block ~ /<w:rFonts[^>]*\/>/) {
        sub(/<w:rFonts[^>]*\/>/, rf, block)
      } else if (match(block, /<w:rPr([[:space:]][^>\/]*)?>/)) {
        block = substr(block, 1, RSTART + RLENGTH - 1) rf substr(block, RSTART + RLENGTH)
      } else if (match(block, /<\/w:style>/)) {
        block = substr(block, 1, RSTART - 1) "<w:rPr>" rf "</w:rPr>" substr(block, RSTART)
      }
      return block
    }
    function patch_style_id(xml, sid,    pat, head, rest, e_idx, blk) {
      pat = "<w:style[[:space:]][^>]*w:styleId=[\"'\'']" sid "[\"'\''][^>]*>"
      if (!match(xml, pat)) return xml
      head = substr(xml, 1, RSTART - 1)
      rest = substr(xml, RSTART)
      e_idx = index(rest, "</w:style>")
      if (e_idx == 0) return xml
      blk = substr(rest, 1, e_idx + 9)
      rest = substr(rest, e_idx + 10)
      return head patch_style_block(blk) rest
    }
    function patch_tbl_first_row(xml,    pat, head, rest, e_idx, blk) {
      pat = "<w:tblStylePr[[:space:]][^>]*w:type=[\"'\'']firstRow[\"'\''][^>]*>"
      if (!match(xml, pat)) return xml
      head = substr(xml, 1, RSTART + RLENGTH - 1)
      rest = substr(xml, RSTART + RLENGTH)
      e_idx = index(rest, "</w:tblStylePr>")
      if (e_idx == 0) return xml
      blk = substr(rest, 1, e_idx - 1)
      rest = substr(rest, e_idx)
      if (blk !~ /<w:rPr[[:space:]>\/]/) {
        if (blk ~ /<\/w:pPr>/) sub(/<\/w:pPr>/, "&<w:rPr><w:b/></w:rPr>", blk)
        else blk = "<w:rPr><w:b/></w:rPr>" blk
      }
      if (blk !~ /<w:shd[[:space:]>\/]/) {
        if (blk ~ /<\/w:tcBorders>/) sub(/<\/w:tcBorders>/, "&<w:shd w:val=\"clear\" w:color=\"auto\" w:fill=\"F2F2F2\"/>", blk)
        else if (blk ~ /<\/w:tcPr>/) sub(/<\/w:tcPr>/, "<w:shd w:val=\"clear\" w:color=\"auto\" w:fill=\"F2F2F2\"/>&", blk)
      }
      return head blk rest
    }
    BEGIN { xml = "" }
    { xml = xml (NR > 1 ? "\n" : "") $0 }
    END {
      gsub(/Consolas/, "Courier New", xml)
      xml = patch_style_id(xml, "VerbatimChar")
      xml = patch_tbl_first_row(xml)
      printf "%s", xml
    }
  ' "$BUILD_DIR/ref_unpacked/word/styles.xml" > "$BUILD_DIR/ref_unpacked/word/styles.xml.tmp"
  mv "$BUILD_DIR/ref_unpacked/word/styles.xml.tmp" "$BUILD_DIR/ref_unpacked/word/styles.xml"
fi

if [ -f "$BUILD_DIR/ref_unpacked/word/fontTable.xml" ]; then
  awk '
    function patch_font_block(blk,    fam, pitch) {
      fam = "<w:family w:val=\"modern\"/>"
      pitch = "<w:pitch w:val=\"fixed\"/>"
      if (blk ~ /<w:family[^>]*\/>/) sub(/<w:family[^>]*\/>/, fam, blk)
      else if (match(blk, /<\/w:font>/)) blk = substr(blk, 1, RSTART - 1) fam substr(blk, RSTART)
      if (blk ~ /<w:pitch[^>]*\/>/) sub(/<w:pitch[^>]*\/>/, pitch, blk)
      else if (match(blk, /<\/w:font>/)) blk = substr(blk, 1, RSTART - 1) pitch substr(blk, RSTART)
      return blk
    }
    BEGIN { xml = "" }
    { xml = xml (NR > 1 ? "\n" : "") $0 }
    END {
      courier_entry = "<w:font w:name=\"Courier New\"><w:panose1 w:val=\"02070309020205020404\"/><w:charset w:val=\"00\"/><w:family w:val=\"modern\"/><w:pitch w:val=\"fixed\"/></w:font>"
      pat_open = "<w:font[[:space:]][^>]*w:name=[\"'\'']Courier New[\"'\''][^>]*>"
      if (match(xml, pat_open)) {
        head = substr(xml, 1, RSTART - 1)
        rest = substr(xml, RSTART)
        e_idx = index(rest, "</w:font>")
        if (e_idx > 0) {
          blk = substr(rest, 1, e_idx + 8)
          rest = substr(rest, e_idx + 9)
          xml = head patch_font_block(blk) rest
        }
      } else if (match(xml, /<\/w:fonts>/)) {
        xml = substr(xml, 1, RSTART - 1) courier_entry substr(xml, RSTART)
      }
      printf "%s", xml
    }
  ' "$BUILD_DIR/ref_unpacked/word/fontTable.xml" > "$BUILD_DIR/ref_unpacked/word/fontTable.xml.tmp"
  mv "$BUILD_DIR/ref_unpacked/word/fontTable.xml.tmp" "$BUILD_DIR/ref_unpacked/word/fontTable.xml"
fi

FOOTER_NUM=1
while [ -f "$BUILD_DIR/ref_unpacked/word/footer${FOOTER_NUM}.xml" ]; do FOOTER_NUM=$((FOOTER_NUM + 1)); done
FOOTER_NAME="footer${FOOTER_NUM}.xml"

cat << 'EOF' > "$BUILD_DIR/ref_unpacked/word/$FOOTER_NAME"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:ftr xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:fldChar w:fldCharType="begin"/></w:r><w:r><w:instrText xml:space="preserve"> PAGE </w:instrText></w:r><w:r><w:fldChar w:fldCharType="separate"/></w:r><w:r><w:t>1</w:t></w:r><w:r><w:fldChar w:fldCharType="end"/></w:r></w:p>
</w:ftr>
EOF

MAX_RID=$(awk '{ s=$0; while (match(s, /Id="rId[0-9]+"/)) { v=substr(s, RSTART+7, RLENGTH-8)+0; if (v>m) m=v; s=substr(s, RSTART+RLENGTH) } } END { print m+1 }' "$BUILD_DIR/ref_unpacked/word/_rels/document.xml.rels")
NEW_RID="rId${MAX_RID}"

awk -v rid="$NEW_RID" -v target="$FOOTER_NAME" '{ sub(/<\/Relationships>/, "<Relationship Id=\"" rid "\" Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer\" Target=\"" target "\"/></Relationships>"); print }' "$BUILD_DIR/ref_unpacked/word/_rels/document.xml.rels" > "$BUILD_DIR/ref_unpacked/word/_rels/document.xml.rels.tmp"
mv "$BUILD_DIR/ref_unpacked/word/_rels/document.xml.rels.tmp" "$BUILD_DIR/ref_unpacked/word/_rels/document.xml.rels"

awk -v part="/word/${FOOTER_NAME}" '{ if (/<\/Types>/) sub(/<\/Types>/, "<Override PartName=\"" part "\" ContentType=\"application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml\"/></Types>"); print }' "$BUILD_DIR/ref_unpacked/[Content_Types].xml" > "$BUILD_DIR/ref_unpacked/[Content_Types].xml.tmp"
mv "$BUILD_DIR/ref_unpacked/[Content_Types].xml.tmp" "$BUILD_DIR/ref_unpacked/[Content_Types].xml"

HAS_XMLNS_R=0
if awk 'BEGIN{i=0;f=0} /<w:document([[:space:]>]|$)/{i=1} i{if($0~/xmlns:r=/){f=1;exit} if($0~/>/)exit} END{exit(f?0:1)}' "$BUILD_DIR/ref_unpacked/word/document.xml"; then
  HAS_XMLNS_R=1
fi

awk -v rid="$NEW_RID" -v has_r="$HAS_XMLNS_R" '
  BEGIN { sect_done = 0 }
  {
    if (has_r == 0 && /<w:document([[:space:]>]|$)/) { sub(/<w:document/, "<w:document xmlns:r=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships\""); has_r = 1 }
    gsub(/<w:footerReference[^>]*w:type="default"[^>]*\/>/, "")
    if (!sect_done && /<w:sectPr[^>]*\/>/) { sub(/<w:sectPr[^>]*\/>/, "<w:sectPr><w:footerReference w:type=\"default\" r:id=\"" rid "\"/></w:sectPr>"); sect_done = 1 }
    else if (!sect_done && /<w:sectPr(>|[[:space:]][^>]*>)/) { match($0, /<w:sectPr(>|[[:space:]][^>]*>)/); $0 = substr($0, 1, RSTART+RLENGTH-1) "<w:footerReference w:type=\"default\" r:id=\"" rid "\"/>" substr($0, RSTART+RLENGTH); sect_done = 1 }
    else if (!sect_done && /<\/w:body>/) { sub(/<\/w:body>/, "<w:sectPr><w:footerReference w:type=\"default\" r:id=\"" rid "\"/></w:sectPr></w:body>"); sect_done = 1 }
    print
  }
' "$BUILD_DIR/ref_unpacked/word/document.xml" > "$BUILD_DIR/ref_unpacked/word/document.xml.tmp"
mv "$BUILD_DIR/ref_unpacked/word/document.xml.tmp" "$BUILD_DIR/ref_unpacked/word/document.xml"

( cd "$BUILD_DIR/ref_unpacked"; shopt -s dotglob nullglob; zip -qr "$BUILD_DIR/custom-reference.docx" * )
unzip -tq "$BUILD_DIR/custom-reference.docx" >/dev/null
echo "[✓] Creato custom-reference.docx (nativo Pandoc + monospace Courier New + footer numerazione pagina + header tabelle)"

# ==================================================
# 2. Compilazione dei Documenti con Pandoc
# ==================================================

echo "==> [1/4] Compilazione PDF (Typst)..."
PANDOC_DOC_TITLE="$DOC_TITLE" PANDOC_DOC_AUTHOR="$AUTHOR_INPUT" \
pandoc -f gfm "$SOURCE_FILE" -o "${BASENAME}.pdf" \
  --pdf-engine=typst \
  ${FONT_OPT[@]+"${FONT_OPT[@]}"} \
  --metadata-file="$BUILD_DIR/default-meta.yaml" \
  --metadata-file="$BUILD_DIR/typst-meta.yaml" \
  --lua-filter="$BUILD_DIR/manual_filters.lua" \
  -V papersize=a5 -V mainfont="Roboto" -V fontsize=11pt \
  -H "$BUILD_DIR/typst-style.typ"

echo "==> [2/4] Compilazione DOCX..."
PANDOC_DOC_TITLE="$DOC_TITLE" PANDOC_DOC_AUTHOR="$AUTHOR_INPUT" \
pandoc -f gfm "$SOURCE_FILE" -o "${BASENAME}.docx" \
  --metadata-file="$BUILD_DIR/default-meta.yaml" \
  --reference-doc="$BUILD_DIR/custom-reference.docx" \
  --lua-filter="$BUILD_DIR/manual_filters.lua"

postprocess_docx() {
  local docx_file="$1"
  local author="$2"
  local has_pb_marker=0 has_tbl_header=0

  if unzip -p "$docx_file" word/document.xml 2>/dev/null | grep '__PANDOC_PB_NEXT__' >/dev/null; then
    has_pb_marker=1
  fi
  if unzip -p "$docx_file" word/document.xml 2>/dev/null | grep '<w:tblHeader' >/dev/null; then
    has_tbl_header=1
  fi
  [ "$has_pb_marker" -eq 0 ] && [ "$has_tbl_header" -eq 0 ] && [ -z "$author" ] && return 0

  local work_dir
  work_dir="$(mktemp -d)"
  unzip -q "$docx_file" -d "$work_dir" || { rm -rf "$work_dir"; echo "  [✗] ERRORE: impossibile estrarre $docx_file!"; exit 1; }

  local modified=0
  if [ "$has_pb_marker" -eq 1 ] && [ -f "$work_dir/word/document.xml" ]; then
    awk '
      function join_parts(arr, n,    step, i) {
        if (n == 0) return ""
        for (step = 1; step < n; step *= 2)
          for (i = 1; i + step <= n; i += 2 * step) { arr[i] = arr[i] arr[i + step]; arr[i + step] = "" }
        return arr[1]
      }
      BEGIN { marker = "<!--PANDOC_PB_NEXT-->"; mlen = length(marker); np = 0; buf = "" }
      { buf = buf (NR > 1 ? "\n" : "") $0; if (NR % 256 == 0) { parts[++np] = buf; buf = "" } }
      END {
        if (buf != "") parts[++np] = buf
        s = join_parts(parts, np)
        gsub(/<w:p([[:space:]>][^>]*)?>[[:space:]]*<w:r([[:space:]>][^>]*)?>[[:space:]]*<w:t([[:space:]>][^>]*)?>__PANDOC_PB_NEXT__<\/w:t>[[:space:]]*<\/w:r>[[:space:]]*<\/w:p>/, marker, s)
        state = 0
        while (length(s) > 0) {
          if (state == 0) {
            idx = index(s, marker)
            if (idx == 0) { printf "%s", s; s = "" }
            else { printf "%s", substr(s, 1, idx - 1); s = substr(s, idx + mlen); state = 1 }
          } else if (state == 1) {
            idx_dup = index(s, marker)
            if (match(s, /<w:p(>|[[:space:]][^>]*[^/>]>)/)) {
              if (idx_dup > 0 && idx_dup < RSTART) { printf "%s", substr(s, 1, idx_dup - 1); s = substr(s, idx_dup + mlen); continue }
              printf "%s", substr(s, 1, RSTART + RLENGTH - 1); s = substr(s, RSTART + RLENGTH); state = 2
            } else if (idx_dup > 0) { printf "%s", substr(s, 1, idx_dup - 1); s = substr(s, idx_dup + mlen) }
            else { printf "%s", s; s = "" }
          } else if (state == 2) {
            if (match(s, /^[[:space:]]+/)) { printf "%s", substr(s, 1, RLENGTH); s = substr(s, RLENGTH + 1); if (length(s) == 0) break }
            if (match(s, /^<w:pPr[[:space:]]*\/>/)) { printf "<w:pPr><w:pageBreakBefore/></w:pPr>"; s = substr(s, RLENGTH + 1); state = 0 }
            else if (match(s, /^<w:pPr(>|[[:space:]][^>]*[^/>]>)/)) { printf "%s", substr(s, 1, RLENGTH); s = substr(s, RLENGTH + 1); state = 3 }
            else { printf "<w:pPr><w:pageBreakBefore/></w:pPr>"; state = 0 }
          } else if (state == 3) {
            if (match(s, /^[[:space:]]+/)) { printf "%s", substr(s, 1, RLENGTH); s = substr(s, RLENGTH + 1); if (length(s) == 0) break }
            if (match(s, /^<\/?w:(pStyle|keepNext|keepLines)([[:space:]>\/][^>]*)?>/)) { printf "%s", substr(s, 1, RLENGTH); s = substr(s, RLENGTH + 1) }
            else if (match(s, /^<w:pageBreakBefore([[:space:]>\/][^>]*)?>/)) { state = 0 }
            else { printf "<w:pageBreakBefore/>"; state = 0 }
          }
        }
      }
    ' "$work_dir/word/document.xml" > "$work_dir/word/document.xml.tmp"
    mv "$work_dir/word/document.xml.tmp" "$work_dir/word/document.xml"
    modified=1
  fi

  if [ "$has_tbl_header" -eq 1 ] && [ -f "$work_dir/word/document.xml" ]; then
    awk '
      function join_parts(arr, n,    step, i) {
        if (n == 0) return ""
        for (step = 1; step < n; step *= 2)
          for (i = 1; i + step <= n; i += 2 * step) { arr[i] = arr[i] arr[i + step]; arr[i + step] = "" }
        return arr[1]
      }
      function shade_row_cells(row,    res, p, tc_tag, rest, tc_end, tc_body, idx_c, tcpr, tail, shd, depth) {
        shd = "<w:shd w:val=\"clear\" w:color=\"auto\" w:fill=\"F2F2F2\"/>"
        res = ""
        while (length(row) > 0) {
          if (!match(row, /<w:tc(>|[[:space:]][^>]*>)/)) { res = res row; break }
          res = res substr(row, 1, RSTART - 1)
          tc_tag = substr(row, RSTART, RLENGTH)
          row = substr(row, RSTART + RLENGTH)
          depth = 1; p = 1; tc_end = 0
          while (depth > 0) {
            rest = substr(row, p)
            if (!match(rest, /<\/?w:tc(>|[[:space:]\/>])/)) break
            if (substr(rest, RSTART, 6) == "</w:tc") {
              depth--
              if (depth == 0) { tc_end = p + RSTART - 1; break }
            } else if (match(substr(row, p + RSTART - 1), /^<w:tc([[:space:]]*>|[[:space:]][^>]*[^\/]>)/)) {
              depth++
            }
            p += RSTART + RLENGTH - 1
          }
          if (tc_end == 0) { res = res tc_tag row; break }
          tc_body = substr(row, 1, tc_end - 1)
          row = substr(row, tc_end)
          if (tc_body !~ /<w:shd[[:space:]>\/]/) {
            if (tc_body ~ /^[[:space:]]*<w:tcPr[[:space:]]*\/>/) {
              sub(/<w:tcPr[[:space:]]*\/>/, "<w:tcPr>" shd "</w:tcPr>", tc_body)
            } else if (tc_body ~ /^[[:space:]]*<w:tcPr(>|[[:space:]][^>]*>)/ && (idx_c = index(tc_body, "</w:tcPr>")) > 0) {
              tcpr = substr(tc_body, 1, idx_c + 8)
              tail = substr(tc_body, idx_c + 9)
              if (tcpr ~ /<\/w:tcBorders>/) sub(/<\/w:tcBorders>/, "&" shd, tcpr)
              else if (tcpr ~ /<w:vAlign[[:space:]>\/]/) sub(/<w:vAlign[[:space:]>\/]/, shd "&", tcpr)
              else sub(/<\/w:tcPr>/, shd "&", tcpr)
              tc_body = tcpr tail
            } else {
              tc_body = "<w:tcPr>" shd "</w:tcPr>" tc_body
            }
          }
          res = res tc_tag tc_body
          if (match(row, /^<\/w:tc[[:space:]]*>/)) { res = res substr(row, 1, RLENGTH); row = substr(row, RLENGTH + 1) }
        }
        return res
      }
      BEGIN { np = 0; buf = ""; needle = "<w:tblHeader" }
      { buf = buf (NR > 1 ? "\n" : "") $0; if (NR % 256 == 0) { parts[++np] = buf; buf = "" } }
      END {
        if (buf != "") parts[++np] = buf
        s = join_parts(parts, np)
        while ((idx = index(s, needle)) > 0) {
          printf "%s", substr(s, 1, idx - 1)
          s = substr(s, idx)
          trpr_end = index(s, "</w:trPr>")
          if (trpr_end == 0) { printf "%s", needle; s = substr(s, length(needle) + 1); continue }
          printf "%s", substr(s, 1, trpr_end + 8)
          s = substr(s, trpr_end + 9)
          depth = 1; p = 1; tr_end = 0
          while (depth > 0) {
            rest = substr(s, p)
            if (!match(rest, /<\/?w:tr(>|[[:space:]\/>])/)) break
            if (substr(rest, RSTART, 6) == "</w:tr") {
              depth--
              if (depth == 0) { tr_end = p + RSTART - 1; break }
            } else if (match(substr(s, p + RSTART - 1), /^<w:tr([[:space:]]*>|[[:space:]][^>]*[^\/]>)/)) {
              depth++
            }
            p += RSTART + RLENGTH - 1
          }
          if (tr_end == 0) { printf "%s", s; s = ""; break }
          printf "%s", shade_row_cells(substr(s, 1, tr_end - 1))
          s = substr(s, tr_end)
        }
        printf "%s", s
      }
    ' "$work_dir/word/document.xml" > "$work_dir/word/document.xml.tmp"
    mv "$work_dir/word/document.xml.tmp" "$work_dir/word/document.xml"
    modified=1
  fi

  if [ -n "$author" ] && [ -f "$work_dir/docProps/core.xml" ]; then
    local esc_author_xml rc=0
    esc_author_xml="${author//&/&amp;}"; esc_author_xml="${esc_author_xml//</&lt;}"; esc_author_xml="${esc_author_xml//>/&gt;}"
    esc_author_xml="${esc_author_xml//\"/&quot;}"; esc_author_xml="${esc_author_xml//\'/&apos;}"
    if DOC_AUTHOR_XML="$esc_author_xml" awk '
      BEGIN { xml = ""; author = ENVIRON["DOC_AUTHOR_XML"] }
      { xml = xml (NR > 1 ? "\n" : "") $0 }
      END {
        if (xml ~ /<dc:creator[^>]*>[^<[:space:]][^<]*<\/dc:creator>/) exit 10
        if (xml !~ /xmlns:dc=/) sub(/<cp:coreProperties/, "<cp:coreProperties xmlns:dc=\"http://purl.org/dc/elements/1.1/\"", xml)
        if (match(xml, /<dc:creator[[:space:]]*\/>/)) xml = substr(xml, 1, RSTART-1) "<dc:creator>" author "</dc:creator>" substr(xml, RSTART+RLENGTH)
        else if (match(xml, /<dc:creator[^>]*>[[:space:]]*<\/dc:creator>/)) xml = substr(xml, 1, RSTART-1) "<dc:creator>" author "</dc:creator>" substr(xml, RSTART+RLENGTH)
        else if (match(xml, /<\/cp:coreProperties>/)) xml = substr(xml, 1, RSTART-1) "<dc:creator>" author "</dc:creator>" substr(xml, RSTART)
        else exit 2
        printf "%s", xml
      }
    ' "$work_dir/docProps/core.xml" > "$work_dir/docProps/core.xml.tmp"; then
      mv "$work_dir/docProps/core.xml.tmp" "$work_dir/docProps/core.xml"
      modified=1
    else
      rc=$?; rm -f "$work_dir/docProps/core.xml.tmp"
      [ "$rc" -eq 10 ] || { rm -rf "$work_dir"; echo "  [✗] ERRORE: aggiornamento docProps/core.xml fallito!"; exit 1; }
    fi
  fi

  if [ "$modified" -eq 1 ]; then
    ( cd "$work_dir"; shopt -s dotglob nullglob; zip -qr "$work_dir/rebuilt.docx" * ) && mv "$work_dir/rebuilt.docx" "$docx_file" || {
      rm -rf "$work_dir"; echo "  [✗] ERRORE CRITICO: ricostruzione DOCX fallita!"; exit 1
    }
  fi
  rm -rf "$work_dir"
}

postprocess_docx "${BASENAME}.docx" "$AUTHOR_INPUT"

echo "==> [3/4] Compilazione HTML5..."
PANDOC_DOC_TITLE="$DOC_TITLE" PANDOC_DOC_AUTHOR="$AUTHOR_INPUT" \
pandoc -f gfm "$SOURCE_FILE" -o "${BASENAME}.html" \
  --standalone --embed-resources \
  --template="$BUILD_DIR/custom.html5" \
  --metadata-file="$BUILD_DIR/default-meta.yaml" \
  -M document-css=false \
  --lua-filter="$BUILD_DIR/manual_filters.lua"

echo "==> [4/4] Compilazione EPUB3..."
PANDOC_DOC_TITLE="$DOC_TITLE" PANDOC_DOC_AUTHOR="$AUTHOR_INPUT" \
pandoc -f gfm "$SOURCE_FILE" -o "${BASENAME}.epub" \
  --metadata-file="$BUILD_DIR/default-meta.yaml" \
  --lua-filter="$BUILD_DIR/manual_filters.lua" \
  --split-level=1 --toc-depth=2 --epub-title-page=false \
  --css="$BUILD_DIR/epub.css"

# ==================================================
# 3. Post-processing & Coerenza EPUB3
# ==================================================
extract_toc_nav() {
  awk '
    BEGIN { in_toc = 0; depth = 0; done = 0 }
    {
      if (done) next
      gsub(/>[[:space:]]*</, ">\n<")
      n = split($0, lines, "\n")
      for (k = 1; k <= n; k++) {
        line = lines[k]; gsub(/^[[:space:]]+/, "", line); if (line == "") continue
        if (!in_toc) {
          if (line ~ /^<nav([[:space:]>]|$)/ && line ~ /epub:type=["'\'']toc["'\'']/) { in_toc = 1; depth = 1; print line }
        } else {
          if (line ~ /^<nav([[:space:]>]|$)/) depth++
          print line
          if (line ~ /^<\/nav>/) { depth--; if (depth <= 0) { done = 1; break } }
        }
      }
    }
  '
}

replace_literal_in_file() {
  REP_OLD="$2" REP_NEW="$3" awk '
    BEGIN { old = ENVIRON["REP_OLD"]; new = ENVIRON["REP_NEW"]; olen = length(old) }
    { s = $0; out = ""; while ((idx = index(s, old)) > 0) { out = out substr(s, 1, idx-1) new; s = substr(s, idx+olen) }; print out s }
  ' "$1" > "$1.rep.tmp" && mv "$1.rep.tmp" "$1"
}

postprocess_epub() {
  local epub_file="$1"
  local work_dir
  work_dir="$(mktemp -d)"
  local extracted_dir="$work_dir/root"
  mkdir -p "$extracted_dir"
  unzip -q "$epub_file" -d "$extracted_dir" || { rm -rf "$work_dir"; echo "  [✗] ERRORE: impossibile estrarre $epub_file!"; exit 1; }

  local modified=0
  local all_xhtml=()
  while IFS= read -r xf; do [ -n "$xf" ] && all_xhtml+=("$xf"); done < <(find "$extracted_dir" -type f -name '*.xhtml' | sort)

  # 3.1 Spostamento blocchi pre-H1 nel capitolo <h1> successivo
  local opf_rel
  opf_rel="$(unzip -Z1 "$epub_file" | awk '!found && /\.opf$/ { print; found = 1 }')"
  if [ -n "$opf_rel" ] && [ -f "$extracted_dir/$opf_rel" ]; then
    local opf_dir spine_files=()
    opf_dir="$(dirname "$opf_rel")"
    while IFS= read -r sp; do [ -n "$sp" ] && spine_files+=("$sp"); done < <(awk -v opf_dir="$opf_dir" '
      BEGIN { in_spine = 0; c = "" }
      { c = c " " $0 }
      END {
        gsub(/>[[:space:]]*</, ">\n<", c); n = split(c, lines, "\n")
        for (i = 1; i <= n; i++) {
          l = lines[i]
          if (l ~ /^<item[[:space:]]/) {
            id = ""; href = ""
            if (match(l, /id=["'\''][^"'\'']*["'\'']/)) id = substr(l, RSTART+4, RLENGTH-5)
            if (match(l, /href=["'\''][^"'\'']*["'\'']/)) href = substr(l, RSTART+6, RLENGTH-7)
            if (id != "" && href != "") map[id] = href
          } else if (l ~ /^<spine([[:space:]>]|$)/) in_spine = 1
          else if (l ~ /^<\/spine>/) in_spine = 0
          else if (in_spine && l ~ /^<itemref[[:space:]]/ && match(l, /idref=["'\''][^"'\'']*["'\'']/)) {
            idref = substr(l, RSTART+7, RLENGTH-8)
            if (idref in map) print ((opf_dir == "." || opf_dir == "") ? map[idref] : opf_dir "/" map[idref])
          }
        }
      }
    ' "$extracted_dir/$opf_rel")

    local idx=0 total_spine=${#spine_files[@]}
    while [ "$idx" -lt "$total_spine" ]; do
      local src_full="$extracted_dir/${spine_files[$idx]}"
      if [ -f "$src_full" ] && grep 'epub-move-start' "$src_full" >/dev/null; then
        local dst_idx=$((idx + 1)) moved_ok=0
        if [ "$dst_idx" -lt "$total_spine" ]; then
          local dst_full="$extracted_dir/${spine_files[$dst_idx]}"
          local snippet_file="$work_dir/moved.html"
          if [ -f "$dst_full" ] && grep -i '<h1' "$dst_full" >/dev/null; then
            if awk -v out="$snippet_file" '
              BEGIN { buf = "" } { buf = buf (NR > 1 ? "\n" : "") $0 }
              END {
                s_p = "<div[^>]*class=[\"'\'']epub-move-start[\"'\''][^>]*>([[:space:]]*</div>)?"
                e_p = "<div[^>]*class=[\"'\'']epub-move-end[\"'\''][^>]*>([[:space:]]*</div>)?"
                if (match(buf, s_p)) {
                  b = substr(buf, 1, RSTART-1); r = substr(buf, RSTART+RLENGTH)
                  if (match(r, e_p)) {
                    m = substr(r, 1, RSTART-1); a = substr(r, RSTART+RLENGTH)
                    gsub(/^[[:space:]]+|[[:space:]]+$/, "", m); printf "%s\n", m > out; close(out)
                    printf "%s%s", b, a; exit 0
                  }
                }
                printf "%s", buf; exit 3
              }
            ' "$src_full" > "$src_full.tmp"; then
              if [ -s "$snippet_file" ] && awk -v sf="$snippet_file" '
                BEGIN { snip = ""; while ((getline l < sf) > 0) snip = snip (snip == "" ? "" : "\n") l; close(sf); buf = "" }
                { buf = buf (NR > 1 ? "\n" : "") $0 }
                END { if (match(buf, /<h1([[:space:]>]|$)/)) printf "%s%s\n%s", substr(buf, 1, RSTART-1), snip, substr(buf, RSTART); else { printf "%s", buf; exit 3 } }
              ' "$dst_full" > "$dst_full.tmp"; then
                mv "$src_full.tmp" "$src_full"; mv "$dst_full.tmp" "$dst_full"
                modified=1; moved_ok=1
                local src_base dst_base moved_ids
                src_base="$(basename "$src_full")"; dst_base="$(basename "$dst_full")"
                moved_ids="$(grep -oE 'id="[^"]+"' "$snippet_file" | sed 's/^id="//; s/"$//' || true)"
                if [ -n "$moved_ids" ]; then
                  while IFS= read -r mid; do
                    [ -z "$mid" ] && continue
                    replace_literal_in_file "$src_full" "href=\"#${mid}\"" "href=\"${dst_base}#${mid}\""
                    replace_literal_in_file "$src_full" "href='#${mid}'" "href='${dst_base}#${mid}'"
                    for xf in "${all_xhtml[@]}"; do
                      replace_literal_in_file "$xf" "${src_base}#${mid}\"" "${dst_base}#${mid}\""
                      replace_literal_in_file "$xf" "${src_base}#${mid}'" "${dst_base}#${mid}'"
                    done
                  done <<< "$moved_ids"
                fi
              else rm -f "$src_full.tmp" "$dst_full.tmp"; fi
            else rm -f "$src_full.tmp"; fi
          fi
        fi
        if [ "$moved_ok" -eq 0 ]; then
          awk 'BEGIN{b=""} {b=b (NR>1?"\n":"") $0} END{gsub(/<div[^>]*class=["'\'']epub-move-start["'\''][^>]*>([[:space:]]*<\/div>)?/, "<div class=\"epub-pb-next\"></div>", b); gsub(/<div[^>]*class=["'\'']epub-move-end["'\''][^>]*>([[:space:]]*<\/div>)?/, "", b); printf "%s", b}' "$src_full" > "$src_full.tmp"
          mv "$src_full.tmp" "$src_full"; modified=1
        fi
      fi
      idx=$((idx + 1))
    done
  fi

  # 3.2 Applica l'interruzione di pagina (standard + multi-column WebView/Lithium) sul blocco successivo
  for xf in "${all_xhtml[@]}"; do
    [ "$(basename "$xf")" = "nav.xhtml" ] && continue
    if grep 'epub-pb-next' "$xf" >/dev/null; then
      awk '
        BEGIN {
          buf = ""
          pb_css = "page-break-before: always; -webkit-column-break-before: always; break-before: column;"
          pb_pat = "<div[^>]*class=[\"'\'']epub-pb-next[\"'\''][^>]*>([[:space:]]*</div>)?"
          leaf_pat = "(<(p|h[1-6]|figure|blockquote|pre|table|ul|ol|hr)([[:space:]/][^>]*)?>|<div[^>]*[[:space:]]class=[\"'\'']([^\"'\'']*[[:space:]])?(callout|sourceCode)([[:space:]][^\"'\'']*)?[\"'\''][^>]*>)"
        }
        { buf = buf (NR > 1 ? "\n" : "") $0 }
        END {
          s = buf
          while (match(s, pb_pat)) {
            printf "%s", substr(s, 1, RSTART - 1)
            s = substr(s, RSTART + RLENGTH)
            while (match(s, "^[[:space:]]*" pb_pat)) s = substr(s, RSTART + RLENGTH)
            if (match(s, leaf_pat)) {
              prefix = substr(s, 1, RSTART - 1)
              if (prefix !~ /<\/body>/) {
                tag = substr(s, RSTART, RLENGTH); s = substr(s, RSTART + RLENGTH)
                if (tag ~ /[[:space:]]style="/) sub(/[[:space:]]style="/, " style=\"" pb_css " ", tag)
                else if (tag ~ /[[:space:]]style='\''/) sub(/[[:space:]]style='\''/, " style='\''" pb_css " ", tag)
                else if (tag ~ /\/>$/) sub(/\/>$/, " style=\"" pb_css "\" />", tag)
                else sub(/>$/, " style=\"" pb_css "\">", tag)
                printf "%s%s", prefix, tag
              }
            }
          }
          printf "%s", s
        }
      ' "$xf" > "$xf.pb.tmp"
      mv "$xf.pb.tmp" "$xf"
      modified=1
    fi
  done

  # 3.3 Normalizzazione duplicazioni nella TOC (nav.xhtml)
  local nav_rel
  nav_rel="$(unzip -Z1 "$epub_file" | awk '!found && $0 ~ /(^|\/)nav\.xhtml$/ { print; found = 1 }')"
  if [ -n "$nav_rel" ] && [ -f "$extracted_dir/$nav_rel" ]; then
    local nav_file="$extracted_dir/$nav_rel" nav_pretty="$work_dir/nav.pretty.xhtml" nav_fixed="$work_dir/nav.fixed.xhtml" nav_modified=0 pass=0
    awk '{ gsub(/>[[:space:]]*</, ">\n<"); n = split($0, a, "\n"); for (i = 1; i <= n; i++) { gsub(/^[[:space:]]+/, "", a[i]); if (a[i] != "") print a[i] } }' "$nav_file" > "$nav_pretty"

    while [ "$pass" -lt 20 ]; do
      pass=$((pass + 1))
      local toc_nav duplicate_hrefs removed_in_pass=0
      toc_nav="$(extract_toc_nav < "$nav_pretty")"
      duplicate_hrefs="$(printf '%s\n' "$toc_nav" | grep -o 'href="[^"]*"' | sort | uniq -d | sed 's/^href="//; s/"$//' || true)"
      [ -z "$duplicate_hrefs" ] && break

      while IFS= read -r target_href; do
        [ -z "$target_href" ] && continue
        echo "  [!] EPUB: duplicazione residua rilevata su $target_href, rimozione..."
        if TOC_TARGET="$target_href" awk '
          BEGIN { in_toc = 0; li_depth = 0; removed = 0; buf = ""; needle = "href=\"" ENVIRON["TOC_TARGET"] "\"" }
          {
            line = $0
            if (!in_toc) { print line; if (line ~ /^<nav([[:space:]>]|$)/ && line ~ /epub:type=["'\'']toc["'\'']/) in_toc = 1; next }
            if (line ~ /^<\/nav>/) { print line; in_toc = 0; next }
            if (li_depth == 0) {
              if (line ~ /^<li([[:space:]>]|$)/ && !removed) { li_depth = 1; buf = line ORS; has_target = 0; has_nested_list = 0; next }
              print line; next
            }
            buf = buf line ORS
            if (index(line, needle) > 0) has_target = 1
            if (line ~ /^<ol([[:space:]>]|$|\/>)/ || line ~ /^<ul([[:space:]>]|$|\/>)/) has_nested_list = 1
            if (line ~ /^<li([[:space:]>]|$)/) li_depth++
            if (line ~ /^<\/li>/) {
              li_depth--
              if (li_depth == 0) {
                if (has_target && !has_nested_list && !removed) removed = 1; else printf "%s", buf
                buf = ""; has_target = 0; has_nested_list = 0
              }
            }
          }
          END { if (li_depth != 0 || !removed) exit 2 }
        ' "$nav_pretty" > "$nav_fixed" 2>/dev/null; then
          cp "$nav_fixed" "$nav_pretty"; nav_modified=1; removed_in_pass=1
        fi
      done <<< "$duplicate_hrefs"
      [ "$removed_in_pass" -eq 0 ] && break
    done

    if [ "$nav_modified" -eq 1 ]; then cp "$nav_pretty" "$nav_file"; modified=1; fi
  fi

  if [ "$modified" -eq 1 ]; then
    (
      cd "$extracted_dir"
      zip -X0 "$work_dir/rebuilt.epub" mimetype >/dev/null
      shopt -s dotglob nullglob
      other_items=()
      for entry in *; do [ "$entry" = "mimetype" ] && continue; other_items+=("$entry"); done
      [ ${#other_items[@]} -gt 0 ] && zip -Xr9D "$work_dir/rebuilt.epub" "${other_items[@]}" >/dev/null
    ) && mv "$work_dir/rebuilt.epub" "$epub_file" || { rm -rf "$work_dir"; echo "  [✗] ERRORE CRITICO: ricostruzione EPUB fallita!"; exit 1; }
  fi

  rm -rf "$work_dir"
  echo "  [✓] EPUB: allineamento capitoli e coerenza navigazione completati"
}

postprocess_epub "${BASENAME}.epub"

# ==================================================
# 4. Validazione Strutturale e Oracoli di Conformità
# ==================================================
echo "============================================"
echo "==> [Fase di Assurance e Verifica degli Artefatti]"
echo "============================================"

check_file() {
  [ -s "$1" ] || { echo "  [✗] ERRORE: $1 non esiste o è vuoto!"; exit 1; }
  echo "  [✓] $1 presente ($(wc -c < "$1" | tr -d ' ') bytes)"
}

check_zip() {
  check_file "$1"
  if unzip -tq "$1" >/dev/null 2>&1; then
    echo "  [✓] $1: integrità archivio container ZIP/XML verificata"
  else
    echo "  [✗] ERRORE CRITICO: $1 è corrotto o non è un archivio valido!"; exit 1
  fi
}

check_file "${BASENAME}.pdf"
check_file "${BASENAME}.html"
check_zip  "${BASENAME}.docx"
check_zip  "${BASENAME}.epub"

if unzip -p "${BASENAME}.docx" word/document.xml 2>/dev/null | grep 'PANDOC_PB_NEXT' >/dev/null; then
  echo "  [✗] ERRORE: ${BASENAME}.docx contiene ancora marker residui pagebreak!"; exit 1
else
  echo "  [✓] ${BASENAME}.docx: nessun marker pagebreak residuo"
fi

echo "==> [Verifica Oracolo CSS su HTML5]"
HEAD_HTML=$(awk 'BEGIN{i=0} /<head([[:space:]>]|$)/{i=1} i{print} /<\/head>/{exit}' "${BASENAME}.html")
STYLE_TAG_COUNT=$(printf '%s\n' "$HEAD_HTML" | grep -oi '<style[^>]*>' | wc -l | tr -d ' ')
if [ "$STYLE_TAG_COUNT" -ne 1 ]; then
  echo "  [✗] ERRORE: <head> di ${BASENAME}.html contiene $STYLE_TAG_COUNT blocchi <style> (atteso: 1)!"; exit 1
else
  echo "  [✓] ${BASENAME}.html: singolo blocco <style> nell'<head> verificato"
fi

echo "==> [Verifica Oracolo TOC & XML su EPUB3]"
NAV_PATH=$(unzip -Z1 "${BASENAME}.epub" | awk '!found && $0 ~ /(^|\/)nav\.xhtml$/ { print; found = 1 }')
[ -n "$NAV_PATH" ] || { echo "  [✗] ERRORE: nav.xhtml non trovato nell'EPUB!"; exit 1; }
NAV_CONTENT=$(unzip -p "${BASENAME}.epub" "$NAV_PATH" 2>/dev/null || true)
[ -n "$NAV_CONTENT" ] || { echo "  [✗] ERRORE: impossibile leggere $NAV_PATH dall'EPUB!"; exit 1; }

if printf '%s\n' "$NAV_CONTENT" | grep -E '<[^>]*[[:space:]]style[[:space:]]*=' >/dev/null; then
  echo "  [✗] ALLERTA: nav.xhtml contiene attributi HTML inline 'style=' non ammessi!"; exit 1
else
  echo "  [✓] nav.xhtml: nessun attributo di stile inline rilevato"
fi

TOC_NAV=$(printf '%s\n' "$NAV_CONTENT" | extract_toc_nav)
[ -n "$TOC_NAV" ] || { echo "  [✗] ERRORE: blocco <nav epub:type=\"toc\"> non trovato in nav.xhtml!"; exit 1; }

if printf '%s\n' "$TOC_NAV" | grep -i 'indice-completo' >/dev/null; then
  echo "  [✗] ERRORE: la voce 'indice-completo' è ancora referenziata nella TOC di nav.xhtml"; exit 1
else
  echo "  [✓] nav.xhtml: indice testuale manuale escluso correttamente dalla navigazione nativa"
fi

DUPLICATE_TOC_HREFS=$(printf '%s\n' "$TOC_NAV" | grep -o 'href="[^"]*"' | sort | uniq -d || true)
if [ -n "$DUPLICATE_TOC_HREFS" ]; then
  echo "  [✗] ERRORE: la TOC EPUB contiene link duplicati:"; printf '%s\n' "$DUPLICATE_TOC_HREFS" | sed 's/^/      /'; exit 1
else
  echo "  [✓] nav.xhtml: nessun link duplicato nella TOC nativa"
fi

if command -v python3 >/dev/null 2>&1; then
  if ! python3 - "${BASENAME}.epub" << 'PYEOF'
import sys, zipfile, xml.etree.ElementTree as ET
epub_path = sys.argv[1]
errs = 0
with zipfile.ZipFile(epub_path) as z:
    for name in sorted(z.namelist()):
        if name.endswith(".xhtml"):
            try:
                ET.fromstring(z.read(name))
            except Exception as e:
                print(f"  [✗] XML non valido in {name}: {e}")
                errs += 1
if errs:
    sys.exit(1)
PYEOF
  then
    exit 1
  fi
  echo "  [✓] ${BASENAME}.epub: validazione XML rigorosa di tutti i file XHTML superata"
else
  while IFS= read -r xhtml_entry; do
    [ -z "$xhtml_entry" ] && continue
    if unzip -p "${BASENAME}.epub" "$xhtml_entry" 2>/dev/null | awk -v f="$xhtml_entry" '/<(br|hr)([[:space:]][^/>]*)?>|<img[[:space:]][^>]*[^/>]>/ { print "  [✗] Tag void non chiuso in " f " riga " NR; found=1 } END { exit (found ? 1 : 0) }'; then
      :
    else
      exit 1
    fi
  done < <(unzip -Z1 "${BASENAME}.epub" | awk '/\.xhtml$/')
  echo "  [✓] ${BASENAME}.epub: nessun tag HTML void non auto-chiuso nei file XHTML"
fi

echo "============================================"
echo " [SUCCESSO] Pipeline completata con evidenze oggettive:"
echo "   - File sorgente: $SOURCE_FILE"
echo "   - PDF (Typst): ${BASENAME}.pdf"
echo "   - DOCX:        ${BASENAME}.docx"
echo "   - HTML5:       ${BASENAME}.html"
echo "   - EPUB3:       ${BASENAME}.epub"
echo "============================================"
