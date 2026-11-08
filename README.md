# ⛓ Assurance del Software Assistito da LLM

> [!TIP]
> 🌐 **VERSIONE WEB NAVIGABILE**
> 
> Puoi leggere il manuale direttamente online, formattato e interattivo, tramite GitHub Pages:
> - **[➜ Clicca qui per aprire il Manuale Web](https://kamaludu.github.io/LLM_assurance/)**  
>

> [!IMPORTANT]
> 📥 **DOWNLOAD DEL MANUALE (Ultima versione disponibile)**
> 
> Puoi scaricare il manuale nei vari formati già compilati e pronti all'uso:
> - 📄 **[PDF, EPUB, DOCX, HTML, TXT — Clicca qui per scaricare](https://github.com/kamaludu/LLM_assurance/releases/latest)**
>
> *(I file sono disponibili nella sezione **Assets** dell'ultima release pubblicata)*
> 

---

<details>
<summary>📑 <b>Indice Completo del Manuale: <br> (Clicca per espandere)</b></summary>

> *Nota: Questo indice riflette fedelmente la struttura del file sorgente master (`LLM_assurance.md`). Le versioni esportate (PDF, EPUB, DOCX) nelle Release potrebbero presentare discrepanze temporali rispetto all'ultimo commit.*

---

**⛓ Assurance del Software Assistito da LLM**  
## **Indice completo**<!-- @style: size=20px; color=#3b8503 -->

- [⌘ Informazioni sul documento](#assurance-intro)
- [➠ Nota terminologica](#nota-terminologica)
- [◉ Quadro  Didattico: l'ecosistema dell'AI e la specificità degli LLM](#quadro-didattico)
- [⛶ Guida di Lettura per Ruoli](#guida-per-ruoli)

###  [PARTE I — Fondamenti epistemici e decisionali](#parte-1)

- [✰ Guida ai 5 concetti fondamentali dell'Assurance](#guida-ai-5-concetti)

1. [Problem Definition — definizione rigorosa del problema e dell'obiettivo](#step-1-problem-definition)
2. [Risk Classification — classificazione e analisi del rischio](#step-2-risk-classification)
3. [Authority & Responsibility — autorità, responsabilità e competenza decisionale](#step-3-authority-responsibility)
4. [Specification — costruzione e analisi della specifica](#step-4-specification-costruzione)
5. [Assumptions & Unknowns — assunzioni, fatti e conoscenze mancanti](#step-5-assumptions-unknowns)
6. [Critical Properties & Invariants — proprietà critiche e invarianti](#step-6-critical-properties)
7. [Traceability — tracciabilità dalla finalità all'evidenza](#step-7-traceability-evidence)
8. [Competence Gaps — gap di comprensione, verifica e autorità](#step-8-competence-gaps)
9. [Specification Validity — verifica della validità della specifica](#step-9-specification-validity)
10. [Assurance Level — determinazione del livello di assurance necessario](#step-10-assurance-level)
11. [Independent Evidence & Oracles — evidenze indipendenti e oracle](#step-11-independent-evidence)
12. [Assumption Verification — verifica delle assunzioni critiche](#step-12-assumption-verification)
- [ⓘ Punto di Controllo I — Dalla comprensione del problema all'atto costruttivo](#punto-controllo-1)

### [PARTE II — Implementazione e verifica](#parte-2)  

13. [Implementation Design — progettazione dell'implementazione](#step-13-implementation-design)
14. [Containment & Least Authority — contenimento e minima autorità](#step-14-containment-least)
15. [LLM-Assisted Implementation — sviluppo assistito da LLM](#step-15-llm-assisted)
16. [Automated Testing — testing automatico](#step-16-automated-testing)
17. [Static Analysis, SAST, SCA & Secret Scanning — analisi statica e controlli sulle dipendenze e sui segreti](#step-17-static-analysis)
18. [Property-Based Testing, Fuzzing & Adversarial Testing — testing basato su proprietà, fuzzing e test avversariali](#step-18-property-based)
19. [Threat Modeling & Red Teaming — modellazione delle minacce e red teaming](#step-19-threat-modeling)
20. [Multi-Model Audit — audit tramite più LLM e limiti dell'accordo tra modelli](#step-20-multi-model)
21. [Independent Verification — verifica indipendente](#step-21-independent-verification)
22. [Discrepancy Analysis — analisi e classificazione delle discrepanze](#step-22-discrepancy-analysis)
23. [Evidence-Based Decision Gates — gate decisionali basati sull'evidenza](#step-23-evidence-decision)
24. [Human Review & Formal Approval — revisione umana e approvazione formale](#step-24-human-review)
- [ⓘ Punto di Controllo II — Dal laboratorio di verifica all'esercizio reale](#punto-controllo-2)

### [PARTE III — Esercizio controllato](#parte-3)

25. [Staging, Canary & Feature Flags — ambienti di staging, canary release e feature flag](#step-25-staging-canary)
26. [Observability — osservabilità](#step-26-observability)
27. [Alerting & Runbooks — allarmi e procedure operative](#step-27-alerting-runbooks)
28. [Rollback, Fallback & Circuit Breakers — ripristino, percorsi alternativi e interruttori di circuito](#step-28-rollback-fallback)
- [ⓘ Punto di Controllo III — Dalla risposta all'incidente alla memoria istituzionale](#punto-controllo-3)

### [PARTE IV — Evoluzione e mantenimento dell'assurance](#parte-4)

29. [Post-Deployment Analysis — analisi post-deployment e incidenti](#step-29-post-deployment)
30. [Risk Register & Knowledge Base — registro dei rischi e knowledge base](#step-30-risk-register)
31. [Change Impact Analysis — analisi dell'impatto delle modifiche](#step-31-change-impact)
32. [Periodic Review — revisione periodica e audit](#step-32-periodic-review)
33. [Closure & Lessons Learned — chiusura, archiviazione e lezioni apprese](#step-33-closure-lessons)
- [ⓘ Punto di Controllo IV — Dal ciclo di vita alla custodia dell'assurance](#punto-controllo-4)

### [APPENDICI](#appendici-man)

- [※ Concetti di Psicologia Cognitiva e Fattori Umani](#appendice-psico)
- [✦ Valutazione della Diversità tra Modelli Linguistici e Protocolli di Audit](#appendice-diversita-llm)
- [⌨ Prompt Engineering Contrattuale e Difensivo](#appendice-prompt-eng)
- [⬡ Strumenti per la verifica e l’assurance del software assistito da LLM](#appendice-sw)
- [⊞ Architettura di un Ecosistema AI Locale: Il Moltiplicatore Personale](#appendice-moltiplicatore-personale)
- [▣ Progettazione di Sandbox ed Esecuzione Isolata](#appendice-sandbox)
- [♖ Modelli di Sicurezza dell'Host OS e Autorizzazione dei Runtime](#appendice-os)
- [⊹ Elementi di Teoria dei Grafi](#appendice-grafi)
- [⊙ Elementi di Logica e Specifica Formale](#appendice-logica)
- [◈ Alloy e SAT per il Controllo delle Specifiche nel Software Assistito da LLM](#appendice-alloy)
- [✧ Prompt Master per lo studio dei singoli step](#prompt-master)
- [❖&nbsp;GLOSSARIO](#glossario-manuale)
- [▤ Bibliografia essenziale](#bibliografia-essenziale-man)
- [✍ Nota di trasparenza e genesi del testo](#nota-utilizzo-ia)
- [🄯 GNU Free Documentation License](#gnu-fdl-license)

</details>

---

> [!NOTE]
> ℹ️ **Nota di lettura**: Il file sorgente del manuale (`LLM_assurance.md`) è un'opera 
> integrale di grandi dimensioni e supera i limiti di anteprima web di GitHub. 
> Per leggere il manuale:
> - Scarica la versione che preferisci dalla sezione **[Releases](https://github.com/kamaludu/LLM_assurance/releases/latest)**.
> - Oppure visualizza il testo grezzo cliccando su **"View raw"** nella pagina del file.
> 

---

<details>
<summary> 🌍 <b>Translations & International Readers: 🇮🇹 🇬🇧 🇫🇷 🇩🇪 🇪🇸 🇵🇹 🇨🇳 <br> (Click to expand / Clicca per espandere)</b></summary>

---

**🇮🇹 Italiano:**  
**Manuale di Assurance del Software Assistito da LLM**  
- **Lettura immediata con traduttore automatico:** Si consiglia di scaricare il file **`.html`** dalla sezione [Releases](../../releases/latest) e aprirlo nel browser (Chrome, Edge, Safari) utilizzando la funzione nativa di traduzione automatica della pagina.
- **Traduzioni formali:** Chi desidera realizzare una versione tradotta del manuale deve operare sul file sorgente `.md`. Le traduzioni sono considerate opere derivate e devono rispettare i termini della **GNU FDL v1.3** (Sez. 8).

**🇬🇧 English:**  
**Handbook of LLM-Assisted Software Assurance**  
- **Reading with Machine Translation:** We strongly recommend downloading the standalone **`.html`** file from the [Releases](../../releases/latest) section and opening it in a web browser (Chrome, Edge, Safari) using the built-in "Translate page" feature. Translating the PDF version directly is discouraged as it breaks formatting and code blocks.
- **Translating the Manual:** If you wish to translate this manual into another language, please work directly on the source Markdown file (`.md`). In accordance with **GNU FDL v1.3** (Section 8), translations are regarded as modified versions and must be distributed under the same license terms, preserving original authorship and notices.

**🇫🇷 Français :**  
**Manuel de l’assurance qualité des logiciels assistée par les LLM**  
- **Lecture avec traduction automatique :** Il est fortement recommandé de télécharger le fichier indépendant **`.html`** depuis la section [Releases](../../releases/latest) et de l'ouvrir dans un navigateur web (Chrome, Edge, Safari) à l'aide de la fonction native de traduction de page. Il est déconseillé de traduire directement la version PDF car cela altère la mise en page et les blocs de code.
- **Traduire le manuel :** Si vous souhaitez traduire ce manuel dans une autre langue, veuillez travailler directement sur le fichier source Markdown (`.md`). Conformément à la **GNU FDL v1.3** (Section 8), les traductions sont considérées comme des versions modifiées et doivent être distribuées sous les mêmes termes de licence, en préservant la mention de paternité et les avis d'origine.

**🇩🇪 Deutsch:**  
**Handbuch zur Qualitätssicherung von LLM-gestützter Software**  
- **Lesen mit automatischer Übersetzung:** Es wird dringend empfohlen, die eigenständige **`.html`**-Datei aus dem Bereich [Releases](../../releases/latest) herunterzuladen und in einem Webbrowser (Chrome, Edge, Safari) mit der integrierten Funktion „Seite übersetzen“ zu öffnen. Von einer direkten Übersetzung der PDF-Version wird abgeraten, da dies das Layout und Codeblöcke beschädigt.
- **Handbuch übersetzen:** Wenn Sie dieses Handbuch in eine andere Sprache übersetzen möchten, arbeiten Sie bitte direkt mit der Markdown-Quelldatei (`.md`). Gemäß der **GNU FDL v1.3** (Abschnitt 8) gelten Übersetzungen als modifizierte Versionen und müssen unter denselben Lizenzbedingungen veröffentlicht werden, wobei die ursprüngliche Urheberschaft und alle Hinweise erhalten bleiben müssen.

**🇪🇸 Español:**  
**Manual de aseguramiento del software asistido por LLM**  
- **Lectura con traducción automática:** Se recomienda descargar el archivo independiente **`.html`** desde la sección [Releases](../../releases/latest) y abrirlo en un navegador web (Chrome, Edge, Safari) utilizando la función nativa de traducción de páginas. Se desaconseja traducir directamente la versión en PDF, ya que altera el diseño y los bloques de código.
- **Traducir el manual:** Si deseas traducir este manual a otro idioma, trabaja directamente sobre el archivo fuente en Markdown (`.md`). De acuerdo con la **GNU FDL v1.3** (Sección 8), las traducciones se consideran versiones modificadas y deben distribuirse bajo los mismos términos de licencia, preservando la autoría y los avisos originales.

**🇵🇹 Português:**  
**Manual de garantia da qualidade de software assistida por LLM**  
- **Leitura com tradução automática:** Recomenda-se descarregar o ficheiro autónomo **`.html`** na secção [Releases](../../releases/latest) e abri-lo num navegador web (Chrome, Edge, Safari) usando a função nativa de tradução de páginas. Não se recomenda traduzir diretamente a versão em PDF, pois isso quebra a formatação e os blocos de código.
- **Traduzir o manual:** Se deseja traduzir este manual para outro idioma, trabalhe diretamente no ficheiro fonte em Markdown (`.md`). De acordo com a **GNU FDL v1.3** (Secção 8), as traduções são consideradas versões modificadas e devem ser distribuídas sob os mesmos termos de licença, preservando a autoria e os avisos originais.

**🇨🇳 简体中文：**  
**大语言模型辅助软件保障手册**  
- **使用机器翻译即时阅读：** 建议从 [Releases](https://github.com/kamaludu/LLM_assurance/releases/latest) 页面下载 **`.html`** 文件，并在浏览器（Chrome、Edge、Safari）中打开，使用浏览器内置的网页自动翻译功能。
- **正式翻译：** 如果希望制作本手册的翻译版本，应直接使用 Markdown 源文件 `.md`。翻译版本被视为衍生作品，必须遵守 **GNU FDL v1.3**（第 8 节）的许可条款。

</details>

---

## Politica di Contribuzione e Segnalazioni

Le segnalazioni di errori, refusi o suggerimenti sono benvenute! 
Puoi inviarle aprendo una **[Issue](https://github.com/kamaludu/LLM_assurance/issues)** su questo repository.

> **Nota:** Questo repository non accetta contributi esterni tramite Pull Request 
> per garantire l'integrità del testo originale e della catena di licenze. 
> Eventuali correzioni verranno valutate e integrate direttamente dall'autore.

---

## Genesi del testo e nota di trasparenza

Questo manuale è nato per un motivo molto semplice: avevo bisogno di capire e studiare la software assurance, soprattutto ora che uso spesso gli LLM per scrivere codice.

Non trovando una guida organica che mettesse insieme tutti i pezzi in modo rigoroso, ho iniziato a usare vari modelli linguistici per aiutarmi a strutturare gli argomenti, chiarire i concetti ed esplorare le metodologie.
Facendolo con un'impostazione metodologica molto stretta, mi sono accorto che quello che doveva essere un insieme di appunti personali stava prendendo la forma di un vero e proprio manuale, molto esteso e dettagliato.

Voglio essere del tutto trasparente: non sono un esperto di certificazione software che si mette in cattedra per spiegare la materia agli altri.

Questo testo è il percorso di studio e approfondimento che ho costruito per me stesso, in modo del tutto indipendente: un'architettura che considero un cantiere aperto, da verificare sul campo, confrontare con la pratica e assimilare continuamente.

Ho deciso di completarlo e di metterlo a disposizione di tutti perché il lavoro necessario per metterlo in piedi è stato tanto, e credo che una struttura del genere possa essere utile a chiunque si trovi nella mia stessa situazione e voglia affrontare il problema seriamente.

Prendetelo quindi per quello che è: una mappa di studio molto approfondita, una bozza aperta e uno strumento di lavoro. Non prendete per oro colato né le conclusioni né il codice degli esempi: verificate sempre le fonti primarie, provate le cose sul campo e, se trovate errori o ingenuità, **[segnalateli aprendo una Issue](https://github.com/kamaludu/LLM_assurance/releases/latest)**.

---

## Licenza e Contatti

- **Manuale e Contenuti** (`LLM_assurance.md` e formati derivati): 
  Rilasciati sotto licenza **[GNU Free Documentation License (GFDL) v1.3](COPYING-DOC)**.
- **Pipeline e Strumenti di Compilazione**:
  Rilasciati come software libero sotto licenza **[GNU General Public License (GPL) v3](COPYING)**.
- **Autore:** Cristian Evangelisti  
- **Email:** `opensource@cevangel.anonaddy.me`  
- **Repository:** [GitHub kamaludu/LLM_assurance](https://github.com/kamaludu/LLM_assurance)

---

### 📖 Come citare questo manuale

Se citi quest'opera in un articolo, una tesi o una ricerca:
- **Da computer desktop:** puoi usare il pulsante **"Cite this repository"** nella barra laterale destra.
- **Da smartphone:** puoi copiare direttamente il riferimento qui sotto:

**APA:**
> Evangelisti, C. (2026). *Assurance del Software Assistito da LLM*. GitHub. https://github.com/kamaludu/LLM_assurance

<details>
<summary>📋 <b>Mostra formato BibTeX (per LaTeX / Overleaf)</b></summary>

```bibtex
@misc{evangelisti2026assurance,
  author = {Evangelisti, Cristian},
  title = {{Assurance del Software Assistito da LLM}},
  year = {2026},
  publisher = {GitHub},
  howpublished = {\url{https://github.com/kamaludu/LLM_assurance}}
}
```

</details>
