/**
 * contextual_content.js - PARTE 1 DI 3 (Lettere A - D)
 * Glossario di Assurance del Software Assistito da LLM
 * Namespace globale: window.__CONTEXTUAL_DICT__
 */

window.__CONTEXTUAL_DICT__ = {
  // =========================================================================
  // LETTERA A
  // =========================================================================
  "Absence of Expected Signal": {
    title: "Absence of Expected Signal (Assenza di Segnale Atteso)",
    category: "Analisi Post-Deployment",
    definition: "Condizione operativa silente in cui un flusso telemetrico, un tasso di log, una frequenza di allarmi o un volume di eventi fisiologicamente previsti scompare o scende a livelli anomali senza sollevare eccezioni esplicite a runtime. Dimostra empiricamente che 'NO ALERT != NO FAILURE'.",
    aliases: ["Assenza di segnale atteso", "Absence of Signal"]
  },
  "Accountability": {
    title: "Accountability (Rendicontabilità / Imputabilità)",
    category: "Governance & Responsabilità",
    definition: "L'obbligo formale, istituzionale e non delegabile di rispondere delle decisioni, delle conseguenze operative e dell'accettazione del rischio residuo generate dal software, riservato esclusivamente a una persona fisica o organo preposto. L'uso di un LLM non trasferisce né attenua l'accountability umana.",
    aliases: ["Rendicontabilità", "Imputabilità", "Epistemic Accountability"]
  },
  "Achieved Assurance": {
    title: "Achieved Assurance (Assurance Conseguita / Raggiunta)",
    category: "Modello Decisionale",
    definition: "La misura qualitativa della solidità, completezza e indipendenza delle evidenze empiriche e logiche concretamente raccolte ed esaminate a valle di una campagna di verifica. Se l'assurance raggiunta è inferiore a quella richiesta dal rischio (A_ach < A_req), il gate impone il NO-GO.",
    aliases: ["Assurance Conseguita", "Assurance Raggiunta", "A_ach"]
  },
  "Actionability": {
    title: "Actionability (Azionabilità)",
    category: "Ingegneria Operativa",
    definition: "La caratteristica fondamentale di una notifica di allarme che fornisce al destinatario un quadro informativo non ambiguo, corredato da procedure e manovre concrete, verificabili e consentite dai permessi di sistema per mitigare o risolvere il disservizio.",
    aliases: ["Azionabilità", "Azionabilità operativa"]
  },
  "Adaptive Concurrency Limiters": {
    title: "Adaptive Concurrency Limiters",
    category: "Resilienza & Concorrenza",
    definition: "Variante avanzata di circuit breaker che modula dinamicamente il limite di richieste concorrenti ammesse misurando il gradiente di latenza o l'andamento dell'RTT, prevenendo il collasso per saturazione prima che si manifestino errori espliciti.",
    aliases: ["Limitatori di Concorrenza Adattivi"]
  },
  "Adeguatezza": {
    title: "Adeguatezza (Adequacy)",
    category: "Ingegneria dei Requisiti",
    definition: "Proprietà esterna per cui la combinazione delle assunzioni sul mondo (W) e della specifica della macchina (S) soddisfa logicamente i requisiti desiderati nell'ambiente reale (W AND S |= R). Differisce dalla correttezza, che misura solo la conformità del codice alla specifica.",
    aliases: ["Adequacy", "Adeguatezza semantica"]
  },
  "Adversarial Input": {
    title: "Adversarial Input (Input Avversariale)",
    category: "Testing & Fuzzing",
    definition: "Vettore di ingresso strutturato deliberatamente per sfruttare debolezze algoritmiche (es. ReDoS), saturare risorse di calcolo o forzare violazioni logiche attraverso manipolazioni sintattiche o semantiche estreme.",
    aliases: ["Input Avversariale", "Adversarial Testing"]
  },
  "Agent": {
    title: "Agent (Agente software / LLM-based Agent)",
    category: "Architetture AI",
    definition: "Sistema software in cui un Large Language Model opera come componente computazionale attivo per pianificare azioni, interpretare istruzioni in linguaggio naturale e invocare tool esterni (tool-calling). Esige confinamento deterministico dei privilegi a valle.",
    aliases: ["Agente software", "Agente LLM", "LLM-based Agent", "Agenti autonomi"]
  },
  "Air-Gap Architetturale": {
    title: "Air-Gap Architetturale",
    category: "Sicurezza & Isolamento",
    definition: "Separazione logica o infrastrutturale invalicabile che impedisce a un modello o agente probabilistico di invocare direttamente comandi o mutazioni sul mondo reale senza l'intermediazione obbligatoria di una pipeline deterministica controllata.",
    aliases: ["Air-Gap", "Isolamento Air-Gap"]
  },
  "Alert": {
    title: "Alert (Allarme)",
    category: "Ingegneria Operativa",
    definition: "Segnale asincrono emesso automaticamente quando un aggregato telemetrico soddisfa una condizione logica di violazione per una durata specificata. Non costituisce l'incidente né la causa radice: è una notifica informativa che attiva una procedura.",
    aliases: ["Allarme", "Allarmi"]
  },
  "Alert Carpet Bombing": {
    title: "Alert Carpet Bombing",
    category: "Anti-Pattern Operativo",
    definition: "Pratica controproducente consistente nel generare massicciamente allarmi su qualsiasi metrica infrastrutturale grezza o risorsa esposta, producendo un volume di notifiche privo di azionabilità che distrugge la reattività del team operativo.",
    aliases: ["Bombardamento a tappeto di allarmi"]
  },
  "Alert Fatigue": {
    title: "Alert Fatigue (Affaticamento da Allarmi)",
    category: "Fattori Umani & Operations",
    definition: "Fenomeno psicologico e organizzativo per cui un volume eccessivo di notifiche irrilevanti, transitorie o false induce gli operatori a ignorare sistematicamente gli allarmi, ritardando la risposta durante incidenti reali.",
    aliases: ["Affaticamento da allarmi"]
  },
  "Alert Inhibition": {
    title: "Alert Inhibition (Inibizione Gerarchica degli Allarmi)",
    category: "Ingegneria Operativa",
    definition: "Meccanismo di soppressione automatica degli allarmi a valle quando un allarme infrastrutturale di radice è attivo (es. cluster database down), evitando tempeste di notifiche derivate e indirizzando l'operatore sulla causa primaria.",
    aliases: ["Inibizione degli Allarmi", "Alert Silencing Gerarchico"]
  },
  "Alert Starvation": {
    title: "Alert Starvation (Sotto-rilevazione / Mancanza di Allarmi)",
    category: "Ingegneria Operativa",
    definition: "Condizione patologica in cui un sistema subisce violazioni o disservizi reali senza che alcuna notifica venga generata, a causa di omissioni progettuali, soglie errate o mascheramento arbitrario delle eccezioni nel codice generato.",
    aliases: ["Under-alerting", "Sotto-allarme", "Cecità da allarmi"]
  },
  "Alloy": {
    title: "Alloy (Alloy Analyzer)",
    category: "Metodi Formali",
    definition: "Linguaggio di specifica formale dichiarativo basato sulla logica del primo ordine e sul calcolo relazionale, supportato da un analizzatore automatico che sfrutta risolutori SAT per ricercare controesempi entro un ambito finito (Bounded Model Checking).",
    aliases: ["Alloy Analyzer"]
  },
  "Allucinazione Causale": {
    title: "Allucinazione Causale (Causal Hallucination)",
    category: "Diagnosi & LLM",
    definition: "Patologia investigativa in cui l'LLM elabora una spiegazione tecnica plausibile dal punto di vista linguistico ma priva di riscontro nell'esecuzione effettiva del software, inducendo il team ad applicare correzioni su cause inesistenti.",
    aliases: ["Causal Hallucination"]
  },
  "Ambient Authority": {
    title: "Ambient Authority (Autorità Ambientale)",
    category: "Sicurezza Architetturale",
    definition: "Modello di controllo accessi in cui l'autorità per compiere un'operazione non è passata esplicitamente tramite una capacità o token, ma è implicitamente associata all'ambiente di esecuzione del processo (es. utente root). Causa primaria di vulnerabilità nel codice assistito.",
    aliases: ["Autorità Ambientale", "Autorità implicita"]
  },
  "Amnesia Epistemica": {
    title: "Amnesia Epistemica (Epistemic Amnesia)",
    category: "Governance dell'Assurance",
    definition: "La dispersione irreversibile delle giustificazioni logiche, delle assunzioni, della provenienza dei prompt e delle lezioni di guasto che accompagna sessioni con LLM non formalizzate in archivi persistenti, inducendo la riproposizione ciclica degli stessi difetti.",
    aliases: ["Epistemic Amnesia"]
  },
  "Amplificazione dell'Ambiguità": {
    title: "Amplificazione dell'Ambiguità",
    category: "Ingegneria dei Requisiti & LLM",
    definition: "Meccanismo sistemico per cui, di fronte a una formulazione ambigua o incompleta del problema, l'LLM non segnala la lacuna ma inietta assunzioni arbitrarie non dichiarate, generando codice coerente con premesse errate e test falsamente positivi.",
    aliases: ["Ambiguità Amplificata"]
  },
  "Analisi di Raggiungibilità": {
    title: "Analisi di Raggiungibilità (Reachability Analysis)",
    category: "Metodi Formali",
    definition: "Tecnica formale di verifica che esplora esaustivamente lo spazio degli stati raggiungibili a partire dallo stato iniziale, volta a dimostrare matematicamente l'impossibilità di raggiungere stati di guasto o pericolo vietati.",
    aliases: ["Reachability Analysis"]
  },
  "Anomaly": {
    title: "Anomaly (Anomalia)",
    category: "Fenomenologia Operativa",
    definition: "Qualsiasi deviazione, evento inatteso o comportamento osservato nel sistema che differisce dalle aspettative o dal modello nominale, prima che ne sia accertata la causa o verificata la conformità rispetto alla specifica.",
    aliases: ["Anomalia", "Anomalie"]
  },
  "Anti-Pattern": {
    title: "Anti-Pattern",
    category: "Ingegneria del Software",
    definition: "Soluzione architetturale, procedurale o implementativa ricorrente che appare apparentemente vantaggiosa o intuitiva, ma che si rivela sistematicamente inefficace, dannosa o generatrice di debito tecnico ed epistemico.",
    aliases: ["Anti-pattern"]
  },
  "API": {
    title: "API (Application Programming Interface)",
    category: "Standard & Architetture",
    definition: "Insieme formalizzato di regole, firme di funzione, contratti e protocolli che consentono a componenti software distinti di comunicare ed effettuare scambi informativi in modo disaccoppiato.",
    aliases: ["Application Programming Interface"]
  },
  "Approval": {
    title: "Approval (Approvazione Formale)",
    category: "Governance & Decisione",
    definition: "L'atto formale, esplicito, tracciabile e non ripudiabile con cui un'autorità umana dotata di competenza specifica attesta che il software possiede evidenze sufficienti rispetto al rischio, accettando il rischio residuo. L'approvazione non è delegabile a un LLM.",
    aliases: ["Approvazione Formale", "Formal Approval"]
  },
  "Approvazione Congiunta a Doppia Chiave": {
    title: "Approvazione Congiunta a Doppia Chiave",
    category: "Governance & Decisione",
    definition: "Protocollo per domini complessi in cui l'autorizzazione al rilascio richiede la firma congiunta di due figure specialistiche disgiunte: l'esperto di dominio (sulla correttezza delle regole di business) e il programmatore di sistema (sull'infrastruttura e memoria).",
    aliases: ["Doppia Chiave", "Approvazione a Doppia Chiave"]
  },
  "Arbitrato dei Modelli": {
    title: "Arbitrato dei Modelli (Model Arbitration)",
    category: "Audit & Verifica",
    definition: "Il processo mediante il quale si analizzano e risolvono le divergenze di giudizio tra più LLM; non può basarsi su maggioranze statistiche o ulteriori LLM, ma richiede oracoli deterministici o perizia umana.",
    aliases: ["Model Arbitration"]
  },
  "ARCI-V": {
    title: "ARCI-V (Matrice di Responsabilità di Assurance)",
    category: "Governance & Organizzazione",
    definition: "Estensione metodologica della matrice RACI introdotta dal manuale: Accountable (singolo responsabile), Responsible (esecutore), Consulted (consulente), Informed (notificato) e Verified (verificatore indipendente). Un LLM non può assumere i ruoli A o V.",
    aliases: ["Matrice ARCI-V"]
  },
  "Argument": {
    title: "Argument (Argomentazione)",
    category: "Fondamenti Epistemici",
    definition: "Il ragionamento logico strutturato che spiega perché specifiche evidenze empiriche supportano una determinata asserzione (claim), tenendo conto delle condizioni operative e delle assunzioni applicabili.",
    aliases: ["Argomentazione", "Argomentazioni"]
  },
  "Asimmetria Generazione-Verifica": {
    title: "Asimmetria Generazione-Verifica (Generation-Verification Asymmetry)",
    category: "Fondamenti Cognitivi",
    definition: "Fenomeno per cui il costo temporale e cognitivo per generare codice tramite LLM tende a zero, mentre il costo e la complessità per verificarne la correttezza semantica rimangono costanti o aumentano.",
    aliases: ["Generation-Verification Asymmetry"]
  },
  "Assertion": {
    title: "Assertion (Asserzione)",
    category: "Metodologia di Verifica",
    definition: "Istruzione logica inserita nel codice sorgente o nei test che postula che un predicato debba valere come vero a runtime; se falso, arresta l'esecuzione (fail-fast). L'asserzione è un comando, non la prova che la condizione sia vera a priori.",
    aliases: ["Asserzione", "Asserzioni"]
  },
  "Assiomi Operativi di Piattaforma": {
    title: "Assiomi Operativi di Piattaforma (Axiomatic Assumptions)",
    category: "Gestione delle Assunzioni",
    definition: "Assunzioni di base la cui dimostrazione diretta è preclusa per limiti fisici, economici o computazionali (es. P != NP, integrità fisica della CPU da raggi cosmici), formalmente censite e approvate nel registro dei rischi come condizioni limite.",
    aliases: ["Axiomatic Assumptions", "Assiomi di Sistema"]
  },
  "Assume Breach": {
    title: "Assume Breach",
    category: "Cybersecurity",
    definition: "Paradigma di sicurezza in cui si assume a priori che l'avversario riesca a superare il perimetro iniziale o che un modulo LLM sia compromesso/allucinato, focalizzando l'architettura sul confinamento del danno e sulla limitazione del raggio d'impatto.",
    aliases: ["Assunzione di compromissione"]
  },
  "Assumption": {
    title: "Assumption (Assunzione)",
    category: "Tassonomia Epistemica",
    definition: "Condizione o presupposto operativo riguardante l'ambiente, i dati o il runtime postulata come vera per progettare o verificare il sistema, non controllata direttamente e soggetta a monitoraggio, verifica o confutazione.",
    aliases: ["Assunzione", "Assunzioni", "ASSUMPTION"]
  },
  "Assumption Drift": {
    title: "Assumption Drift (Deriva delle Assunzioni)",
    category: "Manutenzione & Rischio",
    definition: "Il fenomeno per cui un'assunzione di contesto verificata al rilascio degrada e diventa falsa nel tempo a causa dell'evoluzione dell'ambiente, dei volumi di carico, delle dipendenze terze o dei protocolli.",
    aliases: ["Deriva delle Assunzioni"]
  },
  "Assumption Mocking": {
    title: "Assumption Mocking",
    category: "Anti-Pattern di Testing",
    definition: "Pratica fallace consistente nel testare il software sostituendo l'ambiente esterno con mock programmati per restituire esattamente le risposte ipotizzate dal modello, trasformando il test in una tautologia circolare.",
    aliases: ["Simulazione tautologica dell'assunzione"]
  },
  "Assumption Verification": {
    title: "Assumption Verification (Verifica delle Assunzioni)",
    category: "Metodologia di Verifica",
    definition: "Processo analitico ed empirico mediante il quale le condizioni postulate vengono sottoposte a prova oggettiva, convertite in invarianti architetturali garantite (Eliminate) o confinate tramite guardrail operativi (Contain/Accept).",
    aliases: ["Verifica delle Assunzioni"]
  },
  "Assurance": {
    title: "Assurance (Software Assurance)",
    category: "Fondamenti Epistemici",
    definition: "Insieme strutturato di attività, argomentazioni, evidenze, assunzioni e verifiche attraverso cui si acquisiscono le basi razionalmente giustificate (justified confidence) per confidare nelle proprietà critiche del software. Distinta da Warranty e Insurance.",
    aliases: ["Software Assurance", "Garanzia del Software"]
  },
  "Assurance Adequacy": {
    title: "Assurance Adequacy (Adeguatezza dell'Assurance)",
    category: "Fondamenti Epistemici",
    definition: "La condizione per cui l'argomentazione e le evidenze raccolte sono qualitativamente e metodologicamente idonee a giustificare che il software operi conformemente agli obiettivi richiesti dal mondo reale.",
    aliases: ["Adeguatezza dell'Assurance"]
  },
  "Assurance Boundary": {
    title: "Assurance Boundary (Confine di Assurance)",
    category: "Architettura dell'Assurance",
    definition: "Linea di demarcazione formale che separa ciò che il processo controlla ed evidenzia direttamente (sistema sotto test) da ciò che accetta come assunzione operativa esterna (hardware, OS, API terze).",
    aliases: ["Confine di Assurance", "Epistemic Boundary"]
  },
  "Assurance Case": {
    title: "Assurance Case (Fascicolo / Argomentazione di Assurance)",
    category: "Standard & Governance",
    definition: "L'artefatto argomentativo formale (ISO/IEC/IEEE 15026-2) attraverso cui asserzioni (claim), argomentazioni (argument), evidenze (evidence) e assunzioni (assumptions) vengono collegate in modo strutturato e verificabile.",
    aliases: ["Fascicolo di Assurance", "Argomentazione di Assurance"]
  },
  "Assurance Closure": {
    title: "Assurance Closure (Chiusura dell'Assurance)",
    category: "Ciclo di Vita & Governance",
    definition: "L'atto formale e documentato con cui si consolida lo stato finale di garanzia del sistema, sigillando le evidenze e registrando la memoria negativa prima del disarmo o della manutenzione.",
    aliases: ["Chiusura dell'Assurance"]
  },
  "Assurance Closure Package": {
    title: "Assurance Closure Package (ACP)",
    category: "Artefatto di Chiusura",
    definition: "Il fascicolo strutturato e autocontenuto dei 15 elementi canonici di assurance (specifiche, invarianti, tracciabilità, oracoli, log, rischi residui) vincolato da digest crittografici non manomettibili.",
    aliases: ["ACP", "Fascicolo di Chiusura"]
  },
  "Assurance Integrity Level": {
    title: "Assurance Integrity Level (AIL)",
    category: "Modello di Rischio",
    definition: "Denominazione alternativa per Assurance Level (AL) impiegata nello Step 2 per analogia con i framework industriali di sicurezza funzionale (SIL, ASIL, DAL). Scala unificata AL-0 .. AL-3.",
    aliases: ["AIL"]
  },
  "Assurance Level": {
    title: "Assurance Level (AL)",
    category: "Modello di Rischio",
    definition: "Indice categorico discreto (da AL-0 ad AL-3) che prescrive a priori la profondità metodologica, la qualità e l'indipendenza delle evidenze richieste per ritenere accettabile una proprietà critica, proporzionato al rischio.",
    aliases: ["AL", "Livello di Assurance"]
  },
  "Assurance State": {
    title: "Assurance State (Stato di Assurance)",
    category: "Governance & Decisione",
    definition: "La qualifica formale attribuita a un claim o all'intero sistema nel Decision Gate (PASS, PARTIAL, UNKNOWN, FAIL, NOT APPLICABLE, NO-GO) in base al soddisfacimento dei criteri probatori di policy.",
    aliases: ["Stato di Assurance", "Stati di Assurance"]
  },
  "Assunzione Sospesa": {
    title: "Assunzione Sospesa (Dangling Assumption)",
    category: "Tracciabilità & Rischio",
    definition: "Anomalia topologica nel grafo di tracciabilità in cui una premessa operativa critica (Assumption) risulta priva di collegamenti verso proprietà di salvaguardia, oracoli di verifica o difese a runtime.",
    aliases: ["Dangling Assumption"]
  },
  "AST": {
    title: "AST (Abstract Syntax Tree)",
    category: "Analisi del Codice",
    definition: "Albero di Sintassi Astratta: struttura gerarchica che rappresenta la sintassi logica del codice sorgente, priva dei dettagli puramente tipografici (spazi, commenti), su cui operano linter e type checker.",
    aliases: ["Abstract Syntax Tree", "Albero Sintattico"]
  },
  "Attack": {
    title: "Attack (Attacco)",
    category: "Cybersecurity",
    definition: "Sequenza coordinata di azioni ostili mediante la quale un agente malevolo sfrutta una o più vulnerabilità per violare una politica di sicurezza o arrecare danno a un asset del sistema.",
    aliases: ["Attacco", "Attacchi"]
  },
  "Attack Surface": {
    title: "Attack Surface (Superficie d'Attacco)",
    category: "Cybersecurity",
    definition: "La totalità dei punti d'ingresso, canali di rete, API, formati dati e interfacce attraverso cui un'entità esterna può interagire con il sistema o tentare di alterarne lo stato.",
    aliases: ["Superficie d'Attacco"]
  },
  "Audit": {
    title: "Audit (Audit di Assurance)",
    category: "Governance & Verifica",
    definition: "Valutazione formale, documentata e indipendente condotta rispetto a criteri e standard prefissati, volta ad accertare la conformità dei processi o la qualità tecnica e probatoria del software.",
    aliases: ["Audit di Assurance", "Assurance Audit"]
  },
  "Audit Cerimoniale": {
    title: "Audit Cerimoniale",
    category: "Anti-Pattern di Governance",
    definition: "Procedura di revisione che simula i riti esteriori del controllo (moduli compilati, checklist formali) senza compiere alcun tentativo effettivo di falsificazione delle assunzioni o verifica degli invarianti reali.",
    aliases: ["Ceremonial Audit"]
  },
  "Audit Independence": {
    title: "Audit Independence (Indipendenza dell'Audit)",
    category: "Metodologia di Verifica",
    definition: "Condizione per cui l'attività di audit è immune da conflitti di interesse, articolata lungo quattro dimensioni: organizzativa, procedurale, tecnica ed epistemica.",
    aliases: ["Indipendenza dell'Audit"]
  },
  "Audit Log Placation": {
    title: "Audit Log Placation (Placidazione da Registro di Audit)",
    category: "Anti-Pattern di Sicurezza",
    definition: "L'illusione di sicurezza consistente nel ritenere che la mera registrazione passiva di eventi e log nel database costituisca di per sé una misura di mitigazione del rischio o un meccanismo di controllo preventivo.",
    aliases: ["Placidazione da Log"]
  },
  "Audit Trail": {
    title: "Audit Trail (Traccia di Audit)",
    category: "Sicurezza & Tracciabilità",
    definition: "Registrazione cronologica, immutabile e verificabile di tutti gli eventi significativi, comandi eseguiti, transizioni di stato e modifiche di configurazione all'interno del sistema.",
    aliases: ["Traccia di Audit"]
  },
  "Authority": {
    title: "Authority (Autorità Decisionale)",
    category: "Governance & Responsabilità",
    definition: "Il mandato formale e legittimo riconosciuto a un soggetto di assumere decisioni vincolanti, autorizzare transizioni di gate, accettare rischi residui o imporre blocchi operativi (veto).",
    aliases: ["Autorità Decisionale", "Autorità"]
  },
  "Authority Inversion": {
    title: "Authority Inversion (Inversione dell'Autorità)",
    category: "Anti-Pattern di Governance",
    definition: "Situazione disfunzionale in cui l'operatore umano si adegua acriticamente alle raccomandazioni del modello AI, subordinando il proprio giudizio alla predizione algoritmica.",
    aliases: ["Inversione dell'Autorità"]
  },
  "Authority Mismatch": {
    title: "Authority Mismatch (Asimmetria di Autorità)",
    category: "Governance & Fattori Umani",
    definition: "Assegnazione del ruolo di revisore a una figura che, pur possedendo la competenza tecnica per rilevare difetti, si trova in una posizione gerarchica o contrattuale subordinata tale da rendere difficile esprimere un verdetto di REJECTED.",
    aliases: ["Asimmetria di Autorità"]
  },
  "Automa a Stati Finiti del Rischio": {
    title: "Automa a Stati Finiti del Rischio (Risk Lifecycle)",
    category: "Gestione del Rischio",
    definition: "Modello formale del manuale che governa il ciclo di vita dei pericoli attraverso 9 stati sequenziali vincolati: NEW, OPEN, MITIGATED, ACCEPTED, TRANSFERRED, AVOIDED, MONITORED, REOPENED, CLOSED.",
    aliases: ["Ciclo di Vita del Rischio", "Risk Lifecycle"]
  },
  "Automation Bias": {
    title: "Automation Bias (Distorsione da Automazione)",
    category: "Fattori Umani",
    definition: "La propensione psicologica umana a favorire acriticamente i suggerimenti e l'output forniti da sistemi automatizzati o LLM, riducendo l'attenzione e la vigilanza critica sui difetti.",
    aliases: ["Distorsione da Automazione"]
  },
  "Automation Complacency": {
    title: "Automation Complacency (Autocompiacimento da Automazione)",
    category: "Fattori Umani",
    definition: "Decadimento della capacità critica e di sorveglianza dell'operatore umano indotto da un sistema automatizzato che produce output abitualmente plausibili e fluidi.",
    aliases: ["Autocompiacimento da Automazione"]
  },

  // =========================================================================
  // LETTERA B
  // =========================================================================
  "Backward Traceability": {
    title: "Backward Traceability (Tracciabilità all'Indietro)",
    category: "Tracciabilità & Qualità",
    definition: "Capacità di risalire a ritroso da un qualsiasi elemento esecutivo (codice, test, configurazione) alla specifica proprietà e al requisito originario che ne hanno giustificato l'esistenza, individuando codice orfano.",
    aliases: ["Tracciabilità all'Indietro"]
  },
  "Baseline": {
    title: "Baseline (Linea Base di Riferimento)",
    category: "Esercizio Controllato",
    definition: "L'istanza stabile, consolidata e verificata del software attiva in produzione, impiegata come termine di paragone per misurare scostamenti telemetrici della versione Canary.",
    aliases: ["Linea Base"]
  },
  "Blameless Post-Mortem": {
    title: "Blameless Post-Mortem",
    category: "Cultura Operativa & Incidenti",
    definition: "Pratica investigativa retrospettiva orientata all'analisi sistematica delle cause e dei fattori contribuenti di un guasto, escludendo la colpa punitiva individuale per massimizzare la trasparenza investigativa.",
    aliases: ["Post-Mortem Blameless", "Post-Mortem non colpevolizzante"]
  },
  "Blast Radius": {
    title: "Blast Radius (Raggio d'Impatto)",
    category: "Rischio & Architettura",
    definition: "L'estensione massima potenziale di risorse, utenti, dati e sottosistemi compromettibili o alterabili in caso di fallimento, vulnerabilità o deviazione logica di un componente software.",
    aliases: ["Raggio d'Impatto", "Raggio di Danno"]
  },
  "Blind Blame to Dependencies": {
    title: "Blind Blame to Dependencies",
    category: "Anti-Pattern Diagnostico",
    definition: "Attribuire acriticamente il disservizio a un fornitore esterno (cloud provider, API LLM) per archiviare l'incidente, trascurando l'indagine sulla fragilità interna o sull'assenza di circuit breaker e fallback.",
    aliases: ["Scaricabarile sulle Dipendenze"]
  },
  "Blind Exception Absorption": {
    title: "Blind Exception Absorption",
    category: "Anti-Pattern Architetturale",
    definition: "Blocchi di gestione errori generati da LLM che intercettano indiscriminatamente qualsiasi eccezione, sopprimendo l'allarme e restituendo oggetti vuoti o fittizi per evitare il crash immediato del processo.",
    aliases: ["Assorbimento Cieco delle Eccezioni"]
  },
  "Blind Requirement": {
    title: "Blind Requirement (Requisito Cieco)",
    category: "Tracciabilità & Requisiti",
    definition: "Nodo del grafo di tracciabilità che esprime un requisito formale ma non genera alcuna proprietà critica misurabile né alcuna procedura di test automatizzato, rimanendo privo di verifica.",
    aliases: ["Requisito Cieco"]
  },
  "Blind Review": {
    title: "Blind Review (Revisione Cieca)",
    category: "Metodologia di Audit",
    definition: "Protocollo operativo in cui un valutatore (umano o modello) esamina un artefatto in completo isolamento, senza accedere a pareri pregressi, prompt d'autore o verdetti concorrenti, azzerando il condizionamento da priming.",
    aliases: ["Revisione Cieca"]
  },
  "Bounding": {
    title: "Bounding (Principio di Bounding)",
    category: "Ingegneria dei Requisiti",
    definition: "L'atto formale di tracciare i confini quantitativi su asse operativo (volumi), ambientale (risorse) e temporale (scadenze deterministiche) al di fuori dei quali il software non offre alcuna garanzia di funzionamento.",
    aliases: ["Principio di Bounding", "Perimetrazione del Sistema"]
  },
  "Burn Rate": {
    title: "Burn Rate (Tasso di Consumo del Budget di Errore)",
    category: "Site Reliability Engineering",
    definition: "Rapporto adimensionale che misura la velocità con cui un sistema consuma il proprio budget di errore (1 - SLO) rispetto alla velocità nominale di consumo costante. Base dell'alerting sintomatico.",
    aliases: ["Tasso di Consumo del Budget"]
  },

  // =========================================================================
  // LETTERA C
  // =========================================================================
  "Canary Deployment": {
    title: "Canary Deployment / Canary Release",
    category: "Rilascio Controllato",
    definition: "Tecnica di rilascio controllato in cui una nuova versione software viene esposta a una quota minima e controllata di traffico reale (es. 1%-5%) per raccogliere telemetria in-vivo prima della promozione globale.",
    aliases: ["Canary Release", "Rilascio Canary", "Canary"]
  },
  "Candidate Implementation": {
    title: "Candidate Implementation (Implementazione Candidata)",
    category: "Metodologia di Sviluppo & LLM",
    definition: "L'artefatto di codice prodotto da un modello linguistico, trattato metodologicamente come un'ipotesi di soluzione non verificata priva di presunzione di correttezza fino a collaudo indipendente.",
    aliases: ["Implementazione Candidata", "I_candidate"]
  },
  "Capability": {
    title: "Capability (Capacità)",
    category: "Sicurezza Architetturale",
    definition: "Riferimento infalsificabile a una risorsa di sistema che incorpora in modo inscindibile il diritto di compiere specifiche azioni su di essa, opponendosi all'autorità ambientale (Capability-Based Security).",
    aliases: ["Capacità", "Capability-Based Security"]
  },
  "Cardinality Blindness": {
    title: "Cardinality Blindness (Cecità da Cardinalità)",
    category: "Anti-Pattern Telemetrico",
    definition: "L'errore di aggregare la telemetria solo su medie grossolane a bassa cardinalità, cancellando le dimensioni identificative (user_id, tenant_id) e rendendo invisibili anomalie su transazioni rare.",
    aliases: ["Cecità da Cardinalità"]
  },
  "Catena Canonica di Tracciabilità": {
    title: "Catena Canonica di Tracciabilità",
    category: "Tracciabilità dell'Assurance",
    definition: "La sequenza inferenziale a dieci nodi che connette l'intento strategico alla conformità verificata: Objective -> Requirement -> Assumption -> Property -> Oracle -> Test -> Implementation -> Result -> Review -> Approval.",
    aliases: ["Catena di Tracciabilità a 10 Nodi"]
  },
  "Catena della Trasformazione Telemetrica": {
    title: "Catena della Trasformazione Telemetrica",
    category: "Osservabilità & Telemetria",
    definition: "Flusso epistemico dello Step 26 che distingue il segnale dalla decisione: SYSTEM -> INSTRUMENTATION -> TELEMETRY -> OBSERVATION -> INTERPRETATION -> EVIDENCE -> ASSURANCE DECISION.",
    aliases: ["Catena Telemetrica"]
  },
  "Catena di Contenimento e Recupero": {
    title: "Catena di Contenimento e Recupero",
    category: "Resilienza Operativa",
    definition: "Sequenza formale dello Step 28 che subordina il ripristino all'isolamento del danno: FAILURE -> DETECTION -> CONTAINMENT -> RECOVERY STRATEGY -> EXECUTION -> OBSERVATION -> VERIFY RECOVERY -> UPDATED ASSURANCE STATE.",
    aliases: ["Catena di Recupero"]
  },
  "Catena di Processo dell'Alerting": {
    title: "Catena di Processo dell'Alerting",
    category: "Ingegneria Operativa",
    definition: "Sequenza strutturata che disaccoppia la misura dall'azione: OBSERVATION -> DETECTION RULE -> ALERT -> CLASSIFICATION -> NOTIFICATION/ESCALATION -> RUNBOOK -> AUTHORIZED ACTION -> OBSERVATION OF EFFECT -> DECISION.",
    aliases: ["Catena dell'Alerting"]
  },
  "Catch-All Exception Swallowing": {
    title: "Catch-All Exception Swallowing",
    category: "Anti-Pattern di Codifica",
    definition: "Pattern difettoso in cui clausole di cattura generiche (es. catch (Exception e)) catturano qualsiasi errore convertendolo in valori nulli o falsi, impedendo la propagazione degli stati di allarme.",
    aliases: ["Soppressione delle Eccezioni"]
  },
  "Causal Narrative Bias": {
    title: "Causal Narrative Bias (Bias della Narrazione Causale)",
    category: "Fattori Umani & Diagnosi",
    definition: "La tendenza a costruire o accettare spiegazioni lineari post-evento semplificate e rassicuranti (specialmente se generate da LLM), trascurando i fattori contribuenti sistemici reali.",
    aliases: ["Bias della Narrazione Causale"]
  },
  "CFG": {
    title: "CFG (Control Flow Graph)",
    category: "Analisi di Programma",
    definition: "Grafo del Flusso di Controllo: grafo orientato in cui i nodi rappresentano blocchi base di istruzioni e gli archi rappresentano i possibili trasferimenti di controllo (salti, cicli, chiamate, eccezioni).",
    aliases: ["Control Flow Graph", "Grafo del Flusso di Controllo"]
  },
  "Change Impact Analysis": {
    title: "Change Impact Analysis (CIA)",
    category: "Gestione delle Modifiche",
    definition: "Processo sistematico e tracciabile volto a determinare le conseguenze sistemiche potenziali ed effettive di una modifica proposta su codice, contratti, assunzioni e validità delle evidenze pregresse.",
    aliases: ["CIA", "Analisi dell'Impatto delle Modifiche"]
  },
  "Circuit Breaker": {
    title: "Circuit Breaker (Interruttore Automatico di Circuito)",
    category: "Resilienza Architetturale",
    definition: "Automa a stati finiti (Closed, Open, Half-Open) che intercetta le comunicazioni verso una risorsa instabile; al superamento di soglie di errore, interrompe preventivamente le chiamate (fail-fast) proteggendo il sistema.",
    aliases: ["Interruttore di Circuito"]
  },
  "Circuit Breaker States": {
    title: "Circuit Breaker States (Closed, Open, Half-Open)",
    category: "Resilienza Architetturale",
    definition: "Gli stati operativi del circuit breaker: Closed (nominale), Open (blocco e fail-fast preventivo), Half-Open (invio controllato di richieste sentinella con jitter per testare il ripristino).",
    aliases: ["Closed State", "Open State", "Half-Open State"]
  },
  "Circular Runbook Dependency": {
    title: "Circular Runbook Dependency",
    category: "Anti-Pattern Operativo",
    definition: "Condizione disfunzionale in cui la procedura operativa di emergenza è archiviata su un'infrastruttura la cui disponibilità dipende direttamente dal sistema andato in avaria, rendendola inaccessibile durante la crisi.",
    aliases: ["Dipendenza Circolare del Runbook"]
  },
  "Claim": {
    title: "Claim (Asserzione di Proprietà)",
    category: "Fondamenti Epistemici",
    definition: "Proposizione tecnica precisa, esplicita, non ambigua e falsificabile riguardante una proprietà, un comportamento o un limite del sistema software, su cui poggia l'intera argomentazione di assurance.",
    aliases: ["Asserzione", "Asserzione Tecnica"]
  },
  "Clean-Room Protocol for LLM": {
    title: "Clean-Room Protocol for LLM",
    category: "Metodologia di Verifica",
    definition: "Protocollo didattico in cui il verificatore riceve esclusivamente la specifica formale dei requisiti e i contratti, costruendo oracoli e test a stanza cieca senza visionare il codice generato dall'LLM né i suoi prompt.",
    aliases: ["Clean-Room Protocol", "Protocollo Clean-Room"]
  },
  "Closure & Archival": {
    title: "Closure & Archival (Chiusura e Archiviazione)",
    category: "Governance del Ciclo di Vita",
    definition: "L'atto formale, documentato e definitivo con cui un progetto o ciclo di rilascio viene dichiarato concluso, sigillando il fascicolo probatorio (ACP) e consolidando la conoscenza acquisita.",
    aliases: ["Chiusura e Archiviazione"]
  },
  "Code Coverage": {
    title: "Code Coverage (Copertura del Codice)",
    category: "Metriche di Testing",
    definition: "Metrica quantitativa che misura la percentuale di righe o rami del codice sorgente eseguiti da una suite di test; attesta cosa non è stato eseguito, ma non dimostra la correttezza del codice eseguito.",
    aliases: ["Copertura del Codice", "Statement Coverage", "Branch Coverage"]
  },
  "Cognitive Debt": {
    title: "Cognitive Debt (Debito Cognitivo)",
    category: "Qualità del Software & Governance",
    definition: "L'accumulo progressivo di codice generato automaticamente da LLM la cui semantica interna, gestione delle eccezioni e limiti operativi non sono pienamente compresi da alcun membro del team umano.",
    aliases: ["Debito Cognitivo"]
  },
  "Color-by-Numbers Compliance": {
    title: "Color-by-Numbers Compliance (Matrice di Rischio Decorativa)",
    category: "Anti-Pattern di Rischio",
    definition: "L'uso di matrici di rischio 5x5 in cui probabilità e impatti vengono negoziati soggettivamente per far apparire le celle verdi, degradando la sicurezza a puro rituale cosmetico.",
    aliases: ["Matrice di Rischio Decorativa"]
  },
  "Common Cause Failure": {
    title: "Common Cause Failure (Guasto per Causa Comune)",
    category: "Affidabilità Sistemica",
    definition: "Fallimento simultaneo di due o più componenti (anche apparentemente ridondanti o sviluppati da fornitori diversi) originato da una medesima vulnerabilità, dipendenza o assunzione sottostante condivisa.",
    aliases: ["Guasto per Causa Comune"]
  },
  "Commutatività": {
    title: "Commutatività (Commutativity)",
    category: "Proprietà Relazionali",
    definition: "Proprietà algebrica e relazionale per cui l'ordine temporale di elaborazione di due eventi o messaggi indipendenti non altera lo stato finale del sistema, essenziale per architetture concorrenti e CRDT.",
    aliases: ["Commutativity"]
  },
  "Competence": {
    title: "Competence (Competenza)",
    category: "Governance & Epistemologia",
    definition: "La capacità effettiva di comprendere, analizzare criticamente e falsificare il comportamento del software e le evidenze prodotte; distinta sia dall'autorità formale sia dalla mera abilità d'uso degli strumenti.",
    aliases: ["Competenza", "Competenza Epistemica"]
  },
  "Competence Debt": {
    title: "Competence Debt (Debito di Competenza)",
    category: "Fattori Umani & Organizzazione",
    definition: "L'accumulo sistemico nel ciclo di vita del software di componenti il cui funzionamento, limiti operativi e modalità di guasto non sono padroneggiati da alcun membro attivo dell'organizzazione.",
    aliases: ["Debito di Competenza"]
  },
  "Competence Gap": {
    title: "Competence Gap (Divario di Competenza)",
    category: "Governance & Fattori Umani",
    definition: "La discrepanza tra la competenza necessaria per valutare le proprietà critiche di un componente e la competenza realmente posseduta dal team o dal revisore, distinta nella triade: comprensione, verifica e autorità.",
    aliases: ["Divario di Competenza", "Competence Gaps"]
  },
  "Competence Mismatch": {
    title: "Competence Mismatch (Disallineamento di Dominio)",
    category: "Governance & Verifica",
    definition: "Assegnare la revisione o l'audit di un componente critico a figure qualificate in un dominio tecnologico differente rispetto alla proprietà specifica in gioco (es. web developer su crittografia o concorrenza).",
    aliases: ["Disallineamento di Dominio"]
  },
  "Competenza di Dominio": {
    title: "Competenza di Dominio (Domain Competence)",
    category: "Governance & Competenze",
    definition: "La conoscenza specialistica delle regole operative, dei vincoli fisici e dei requisiti normativi propri del contesto applicativo reale in cui il software agisce.",
    aliases: ["Domain Competence", "Competenza Tecnico-Settoriale"]
  },
  "Competenza Epistemica": {
    title: "Competenza Epistemica (Epistemic Competence)",
    category: "Governance & Competenze",
    definition: "La capacità verificabile di comprendere, valutare criticamente e confutare le evidenze, le assunzioni e gli oracoli di un sistema software, distinta dall'autorità formale e dalla mera abilità d'uso degli strumenti.",
    aliases: ["Epistemic Competence"]
  },
  "Completezza di Dominio": {
    title: "Completezza di Dominio (della Specifica)",
    category: "Ingegneria dei Requisiti",
    definition: "Proprietà per cui la specifica prescrive il comportamento atteso per ogni combinazione possibile di ingressi e stati, inclusi valori malformati, fuori range, timeout e guasti ambientali.",
    aliases: ["Domain Completeness"]
  },
  "Component Boundary": {
    title: "Component Boundary (Confine di Componente)",
    category: "Architettura del Software",
    definition: "Linea di demarcazione logica o fisica che isola le responsabilità interne di un modulo e ne regola l'accesso esclusivamente tramite un'interfaccia esplicita e tipizzata.",
    aliases: ["Confine di Componente"]
  },
  "Component-Level Risk Myopia": {
    title: "Component-Level Risk Myopia (Miopia del Componente)",
    category: "Anti-Pattern di Rischio",
    definition: "Valutare la pericolosità di un componente in isolamento (es. 'è solo un formattatore di stringhe'), ignorando come il suo output si propaghi e possa innescare vulnerabilità sistemiche a valle.",
    aliases: ["Miopia del Componente"]
  },
  "Conditional Correctness": {
    title: "Conditional Correctness (Correttezza Condizionale)",
    category: "Logica dell'Assurance",
    definition: "La relazione per cui un software garantisce il rispetto della specifica se e solo se le assunzioni sul contesto (A) risultano vere nell'ambiente operativo reale (A => P).",
    aliases: ["Correttezza Condizionale"]
  },
  "Confidence": {
    title: "Confidence (Confidenza / Fiducia Soggettiva)",
    category: "Distinzioni Epistemiche",
    definition: "Lo stato psicologico soggettivo di fiducia nella correttezza di un sistema; distinta dall'evidenza (Evidence), che costituisce invece una prova oggettiva, riproducibile e auditabile.",
    aliases: ["Confidenza", "Fiducia Soggettiva"]
  },
  "Confine di Sistema": {
    title: "Confine di Sistema (System Boundary)",
    category: "Ingegneria dei Sistemi",
    definition: "La linea concettuale e operativa che separa i componenti sotto il nostro diretto controllo ingegneristico (hardware e software) dall'ambiente esterno non controllato (utenti, reti terze, sensori fisici).",
    aliases: ["System Boundary"]
  },
  "Confirmation Bias Post-Incidente": {
    title: "Confirmation Bias Post-Incidente",
    category: "Distorsioni Cognitive & Diagnosi",
    definition: "Tendenza degli investigatori a filtrare i log telemetrici per cercare solo conferme alla teoria causale iniziale suggerita dall'LLM, ignorando le prove contrarie presenti nei dati.",
    aliases: ["Bias di Conferma Post-Incidente"]
  },
  "Consenso Fragile vs Consenso Robusto": {
    title: "Consenso Fragile vs Consenso Robusto",
    category: "Metodologia di Audit",
    definition: "Distinzione tra accordo statistico superficiale (modelli concordano sul verdetto ma con ragionamenti incompatibili o instabili a minime variazioni sintattiche) e accordo solido confermato da evidenze indipendenti.",
    aliases: ["Consenso Fragile", "Consenso Robusto", "Fragile Consensus"]
  },
  "Consistenza Logica": {
    title: "Consistenza Logica (della Specifica)",
    category: "Ingegneria dei Requisiti",
    definition: "Proprietà fondamentale per cui la specifica non ammette contraddizioni interne (T_spec |/- False), escludendo che possano valere simultaneamente predicati reciprocamente incompatibili.",
    aliases: ["Consistenza della Specifica", "Non-Contraddizione"]
  },
  "Containment": {
    title: "Containment (Contenimento Architetturale)",
    category: "Sicurezza & Architettura",
    definition: "Insieme di meccanismi strutturali che impongono barriere invalicabili attorno a un'unità di esecuzione non fidata, limitandone a priori l'autorità ed evitando la propagazione del danno (riduzione del blast radius).",
    aliases: ["Contenimento Architetturale", "Contenimento"]
  },
  "Contenimento dell'Incertezza": {
    title: "Contenimento dell'Incertezza (Damage Containment Architecture)",
    category: "Architettura di Sicurezza",
    definition: "Progettazione a compartimenti stagni (zero-trust, isolamento cgroups, circuit breaker) volta a limitare deterministicamente il raggio di danno a fronte dell'esplosione di incognite non identificabili a priori.",
    aliases: ["Damage Containment Architecture"]
  },
  "Contesto Operativo": {
    title: "Contesto Operativo (Operational Context)",
    category: "Ingegneria dei Requisiti",
    definition: "L'insieme delle condizioni fisiche, organizzative, ambientali, hardware e di rete all'interno delle quali la Macchina è vincolata a operare nel Mondo reale.",
    aliases: ["Operational Context"]
  },
  "Control": {
    title: "Control (Controllo)",
    category: "Gestione del Rischio",
    definition: "Misura tecnica, architetturale o procedurale implementata per modificare il rischio mitigando un pericolo (ISO 31000).",
    aliases: ["Controllo", "Presidio Tecnico"]
  },
  "Control Effectiveness": {
    title: "Control Effectiveness (Efficacia del Controllo)",
    category: "Gestione del Rischio",
    definition: "Quantificazione dell'abbattimento effettivo del rischio garantito da un controllo, vincolata alla presenza di evidenze empiriche verificabili (Validity = 1).",
    aliases: ["Efficacia del Controllo", "E_mitig"]
  },
  "Controllability": {
    title: "Controllability (Controllabilità Architetturale)",
    category: "Teoria dei Sistemi & Design",
    definition: "Proprietà strutturale che garantisce che lo stato interno critico di un componente possa essere pilotato ed esplorato interamente mediante le sue sole interfacce pubbliche contrattuali.",
    aliases: ["Controllabilità Architetturale", "Controllabilità"]
  },
  "Correctness": {
    title: "Correctness (Correttezza)",
    category: "Distinzioni Epistemiche",
    definition: "La conformità logica, semantica e matematica del comportamento del software rispetto a una specifica formale prefissata; distinta dalla plausibilità superficiale e dall'adeguatezza.",
    aliases: ["Correttezza"]
  },
  "Correlated Error": {
    title: "Correlated Error (Errore Correlato)",
    category: "Affidabilità Sistemica",
    definition: "Fallimento coincidente di valutatori o componenti diversi causato dalla condivisione di medesime assunzioni, dataset di pre-training, architetture o fallacie di allineamento (studio Knight-Leveson).",
    aliases: ["Errore Correlato", "Correlated Errors"]
  },
  "Correlated Fallback Illusion": {
    title: "Correlated Fallback Illusion",
    category: "Anti-Pattern di Resilienza",
    definition: "Configurare un percorso di emergenza che invoca un secondo modello linguistico o un'API nella medesima infrastruttura cloud, ereditando gli stessi punti di guasto e la stessa latenza della dipendenza primaria.",
    aliases: ["Illusione del Fallback Correlato"]
  },
  "Coverage Gaming": {
    title: "Coverage Gaming (Manipolazione della Copertura)",
    category: "Anti-Pattern di Testing",
    definition: "Scrivere asserzioni minime o vacue al solo scopo di incrementare artificiosamente la percentuale numerica di righe eseguite (code coverage), celando l'assenza di verifica semantica.",
    aliases: ["Manipolazione della Copertura"]
  },
  "Crash Oracle": {
    title: "Crash Oracle (Oracolo Implicito di Terminazione)",
    category: "Testing & Oracoli",
    definition: "Oracolo minimale che valuta come conformi tutte le esecuzioni che terminano senza sollevare eccezioni non gestite, crash di memoria (SIGSEGV) o deadlock, ignorando la correttezza del valore calcolato.",
    aliases: ["Implicit Oracle", "Oracolo di Terminazione"]
  },
  "Criterio di Fallimento": {
    title: "Criterio di Fallimento (Failure Criterion)",
    category: "Ingegneria dei Requisiti",
    definition: "La formulazione rigorosa, dimensionale e verificabile degli stati dell'ambiente che costituiscono una violazione inaccettabile dell'obiettivo di sistema.",
    aliases: ["Failure Criterion"]
  },
  "Critical Property": {
    title: "Critical Property (Proprietà Critica)",
    category: "Ingegneria dei Requisiti",
    definition: "Predicato logico vincolante la cui violazione comporterebbe pericoli per la vita umana, perdite economiche catastrofiche, violazioni normative o corruzione permanente dello stato.",
    aliases: ["Proprietà Critica", "Proprietà Critiche"]
  },
  "Cryptographic Provenance Manifest": {
    title: "Cryptographic Provenance Manifest",
    category: "Integrità & Supply Chain",
    definition: "Manifesto tecnico strutturato basato su digest SHA-256 e marcature temporali che vincola univocamente e rende non manomettibili i 15 componenti canonici del fascicolo di chiusura (ACP).",
    aliases: ["Manifesto di Provenienza"]
  },
  "CVE / CVSS / EPSS": {
    title: "CVE / CVSS / EPSS",
    category: "Cybersecurity & Vulnerability Management",
    definition: "Standard internazionali per la gestione delle vulnerabilità: CVE (identificatore del difetto pubblico), CVSS (punteggio di severità intrinseca 0-10), EPSS (probabilità di sfruttamento attivo reale 0-1).",
    aliases: ["CVE", "CVSS", "EPSS"]
  },
  "CWE": {
    title: "CWE (Common Weakness Enumeration)",
    category: "Cybersecurity",
    definition: "Dizionario e tassonomia standardizzata delle tipologie di debolezze e difetti architetturali/implementativi nel software (es. CWE-89 per SQL Injection, CWE-798 per Hardcoded Secrets).",
    aliases: ["Common Weakness Enumeration"]
  },

  // =========================================================================
  // LETTERA D
  // =========================================================================
  "Dashboard Myopia": {
    title: "Dashboard Myopia (Miopia da Dashboard)",
    category: "Anti-Pattern Telemetrico",
    definition: "L'errore di giudicare la salute del sistema guardando solo grafici infrastrutturali aggregati (CPU, mem, HTTP 200), ignorando che la logica LLM può generare corruzioni semantiche silenziose.",
    aliases: ["Miopia da Dashboard"]
  },
  "Data Drift": {
    title: "Data Drift (Deriva dei Dati)",
    category: "Machine Learning & Monitoraggio",
    definition: "Variazione statistica delle caratteristiche distributive dei dati reali di produzione rispetto ai dataset utilizzati per calibrare, validare o testare il sistema software.",
    aliases: ["Deriva dei Dati", "Concept Drift"]
  },
  "Dead Man's Switch": {
    title: "Dead Man's Switch / Heartbeat Monitoring",
    category: "Resilienza Operativa",
    definition: "Meccanismo di sicurezza a rilascio continuo in cui il sistema monitorato emette periodicamente un segnale vitale; l'interruzione del segnale innesca allarmi critici anche in caso di blocco totale dei logger.",
    aliases: ["Dead Man's Snitch", "Heartbeat Monitoring"]
  },
  "Deadlock Transazionale": {
    title: "Deadlock Transazionale (Inversione di Lock)",
    category: "Concorrenza & Basi di Dati",
    definition: "Condizione di blocco circolare in cui due o più transazioni asincrone attendono reciprocamente il rilascio di lock su righe di database a causa dell'assenza di un ordinamento globale deterministico nell'acquisizione delle risorse.",
    aliases: ["Deadlock Concorrente"]
  },
  "Debito Epistemico": {
    title: "Debito Epistemico (Epistemic Debt)",
    category: "Fondamenti Epistemici",
    definition: "L'accumulo sistemico nel ciclo di vita del software di proposizioni critiche non verificate, assunzioni implicite introdotte da LLM e incognite ignorate che ampliano il divario tra comportamento presunto ed effettivo.",
    aliases: ["Epistemic Debt"]
  },
  "Decision Gate": {
    title: "Decision Gate (Gate Decisionale Basato sull'Evidenza)",
    category: "Governance & Pipeline",
    definition: "Barriera logica, architetturale e deterministica che subordina l'avanzamento del software al soddisfacimento di criteri probatori espliciti, applicando la regola non-compensativa: A_ach(E, I(E)) < A_req(R) => NO-GO.",
    aliases: ["Gate Decisionale", "Evidence-Based Decision Gate", "Decision Gates"]
  },
  "Decision Responsibility": {
    title: "Decision Responsibility (Responsabilità Decisionale)",
    category: "Governance & Responsabilità",
    definition: "Il principio inderogabile per cui la titolarità delle decisioni di rilascio e accettazione del rischio appartiene esclusivamente a persone fisiche nominate, non delegabile a modelli o pipeline.",
    aliases: ["Responsabilità Decisionale"]
  },
  "Declarative Specification": {
    title: "Declarative Specification (Specifica Dichiarativa)",
    category: "Metodologia di Specifica",
    definition: "Formulazione contrattuale che descrive le proprietà logiche e le relazioni matematiche che l'output deve soddisfare (il 'cosa'), senza imporre l'algoritmo sequenziale interno (il 'come').",
    aliases: ["Specifica Dichiarativa"]
  },
  "Default Deny": {
    title: "Default Deny (Rifiuto Predefinito)",
    category: "Sicurezza Architetturale",
    definition: "Principio in cui qualsiasi azione, accesso al filesystem, chiamata di sistema o connessione di rete è esplicitamente negata per impostazione predefinita, a meno che non sia formalmente e preventivamente autorizzata da una regola specifica.",
    aliases: ["Rifiuto Predefinito", "Default-Deny"]
  },
  "Defensive Invariant Embedding": {
    title: "Defensive Invariant Embedding",
    category: "Metodologia di Sviluppo",
    definition: "Pratica consistente nel forzare l'inclusione di asserzioni e guardie difensive a runtime direttamente nel codice generato dall'LLM per provocare un arresto controllato al primo scostamento della postcondizione.",
    aliases: ["Invariant Embedding"]
  },
  "Degradation": {
    title: "Degradation (Degrado Operativo)",
    category: "Fenomenologia Operativa",
    definition: "Erosione misurabile dei margini di sicurezza o di prestazione del sistema (es. tempo di risposta p99 raddoppiato o aumento dei retry) prima che si manifesti un'interruzione di servizio o un guasto conclamato.",
    aliases: ["Degrado Operativo", "Degrado"]
  },
  "Delega dell'Esecuzione vs Delega del Giudizio": {
    title: "Delega dell'Esecuzione vs Delega del Giudizio",
    category: "Governance & Responsabilità",
    definition: "La delega dell'esecuzione demanda a un LLM compiti operativi o sintattici sotto supervisione; la delega del giudizio demanda all'LLM decisioni sull'accettabilità o sicurezza, violando i principi di governance.",
    aliases: ["Delega del Giudizio", "Delega dell'Esecuzione"]
  },
  "Deriva Epistemica": {
    title: "Deriva Epistemica (Epistemic Drift)",
    category: "Distorsioni Epistemiche",
    definition: "Il progressivo degrado informativo per cui un'ipotesi provvisoria o un'assunzione non verificata viene trattata nei passi successivi di sviluppo come un fatto certo e consolidato.",
    aliases: ["Epistemic Drift"]
  },
  "Design by Contract": {
    title: "Design by Contract (DbC - Progettazione per Contratto)",
    category: "Architettura & Design",
    definition: "Metodologia di specifica e progettazione fondata sulla logica di Hoare che formalizza precondizioni, postcondizioni e invarianti a livello di modulo, imponendo vincoli espliciti tra componente chiamante e fornitore.",
    aliases: ["DbC", "Progettazione per Contratto"]
  },
  "Design for Assurance": {
    title: "Design for Assurance (DfA)",
    category: "Architettura del Software",
    definition: "Disciplina ingegneristica volta a strutturare l'architettura per minimizzare l'incertezza e abilitare oracoli indipendenti, separando il nucleo puro dagli effetti collaterali (Functional Core, Imperative Shell).",
    aliases: ["DfA", "Progettazione per l'Assurance"]
  },
  "Detection vs Prevention": {
    title: "Detection vs Prevention (Rilevamento vs Prevenzione)",
    category: "Distinzioni Epistemiche",
    definition: "La rilevazione identifica l'insorgenza di un pericolo dopo che si è manifestato nel sistema; la prevenzione rende impossibile l'insorgenza del pericolo mediante vincoli logici o barriere architetturali a monte.",
    aliases: ["Rilevamento vs Prevenzione"]
  },
  "Diff Drowning": {
    title: "Diff Drowning (Annegamento nel Diff)",
    category: "Anti-Pattern di Revisione",
    definition: "Condizione in cui una modifica massiva di codice generata in blocco dall'LLM satura la capacità cognitiva del revisore umano, inducendo l'abbandono dell'analisi analitica e favorendo l'approvazione cieca.",
    aliases: ["Annegamento nel Diff"]
  },
  "Diff Tunnel Vision": {
    title: "Diff Tunnel Vision (Miopia del Diff)",
    category: "Anti-Pattern di Revisione",
    definition: "Limitare l'attenzione di revisione alle sole righe modificate mostrate dal controllo versione, ignorando che una modifica a funzioni condivise propaga impatti semantici sull'intero grafo di sistema.",
    aliases: ["Miopia del Diff"]
  },
  "Differential Oracle": {
    title: "Differential Oracle (Oracolo Differenziale)",
    category: "Testing & Oracoli",
    definition: "Procedura di test che confronta l'output del nuovo componente con quello prodotto da un'implementazione di riferimento indipendente (es. algoritmo legacy consolidato o modello formalmente verificato).",
    aliases: ["Oracolo Differenziale"]
  },
  "Dimensionamento Multidimensionale del Canary": {
    title: "Dimensionamento Multidimensionale del Canary",
    category: "Rilascio Controllato",
    definition: "Modellazione del rilascio progressivo fondata non su percentuali fisse di traffico, ma sul vettore: [Popolazione esposta, Rappresentatività dei casi, Durata temporale, Proprietà sollecitate, Frequenza eventi].",
    aliases: ["Vettore di Dimensionamento Canary"]
  },
  "Disaggregated Assurance": {
    title: "Disaggregated Assurance (Revisione Epistemica Collegiale)",
    category: "Governance & Competenze",
    definition: "Protocollo di audit per domini iper-specializzati in cui nessun singolo essere umano domina l'intero stack, imponendo la congiunzione logica di nulla osta emessi da specialisti disgiunti per ciascuna proprietà.",
    aliases: ["Revisione Epistemica Collegiale"]
  },
  "Disclaimer Illusion": {
    title: "Disclaimer Illusion (Illusione del Prompt di Esonero)",
    category: "Anti-Pattern di Governance",
    definition: "Inserire clausole di declinazione di responsabilità nel system prompt dell'LLM sperando che eliminino la responsabilità per difetti di progettazione del sistema software.",
    aliases: ["Illusione del Disclaimer"]
  },
  "Discrepancy": {
    title: "Discrepancy (Discrepanza)",
    category: "Analisi delle Anomalie",
    definition: "Divergenza formale e documentata osservata tra il comportamento effettivo del software e un riferimento giustificato di specifica, invariante o oracolo di test.",
    aliases: ["Discrepanza", "Discrepanze"]
  },
  "Discrepancy Analysis": {
    title: "Discrepancy Analysis (Analisi delle Discrepanze)",
    category: "Metodologia di Diagnosi",
    definition: "Processo strutturato volto a isolare la causa sistemica di un fallimento ed emettere una disposizione formale approvata (Correct Code, Correct Spec, Correct Oracle, Accept Risk).",
    aliases: ["Analisi delle Discrepanze"]
  },
  "Discrepancy Budget": {
    title: "Discrepancy Budget (Budget di Discrepanza)",
    category: "Modello Decisionale",
    definition: "Numero massimo di anomalie residue non bloccanti tollerate da una policy di gate decisionale prima di autorizzare la transizione del componente alla fase successiva.",
    aliases: ["Budget di Discrepanza"]
  },
  "Discrepancy Record Strutturato": {
    title: "Discrepancy Record Strutturato",
    category: "Struttura Dati & Triage",
    definition: "Artefatto standardizzato (JSON) dello Step 22 che formalizza l'anomalia rilevata: input scatenante, comportamento osservato, riferimento giustificato, analisi causale, disposition e test di regressione associato.",
    aliases: ["Discrepancy Record"]
  },
  "Dispersione della Responsabilità": {
    title: "Dispersione della Responsabilità (Problem of Many Hands)",
    category: "Governance & Organizzazione",
    definition: "Patologia organizzativa in cui la suddivisione dei compiti tra sviluppatori, tester, manager e modelli AI fa sì che nessun individuo si riconosca formalmente responsabile dell'accettazione del rischio residuo.",
    aliases: ["Responsibility Dilution", "Problem of Many Hands"]
  },
  "Disposition": {
    title: "Disposition (Disposizione della Discrepanza)",
    category: "Governance & Triage",
    definition: "Delibera formale che stabilisce l'azione prescritta per gestire un'anomalia accertata (Correct Implementation, Correct Specification, Correct Oracle, Accept Risk, Reject).",
    aliases: ["Disposizione della Discrepanza", "Disposizioni"]
  },
  "Divergenza Telemetrica Baseline/Canary": {
    title: "Divergenza Telemetrica Baseline/Canary",
    category: "Osservabilità & Statistica",
    definition: "Quantificazione formale dello scostamento a runtime tra la versione stabile e la versione sperimentale mediante delta di errore, delta p99 e test di divergenza statistica (Kolmogorov-Smirnov o Wasserstein).",
    aliases: ["Divergenza Telemetrica"]
  },
  "Documented & Traceable Assurance Memory": {
    title: "Documented & Traceable Assurance Memory",
    category: "Memoria Organizzativa",
    definition: "La registrazione strutturata, verificabile e storicamente consultabile delle motivazioni progettuali, dei limiti noti e delle prove probatorie, priva di pretese di verità immutabile.",
    aliases: ["Memoria dell'Assurance"]
  },
  "Domesticated Generators": {
    title: "Domesticated Generators (Generatori Addomesticati)",
    category: "Anti-Pattern di Testing",
    definition: "Scrivere generatori PBT che producono solo input conformi e ben educati, escludendo deliberatamente valori limite o byte anomali per evitare di far fallire il codice generato dall'LLM.",
    aliases: ["Generatori Addomesticati"]
  },
  "Downstream Blindness": {
    title: "Downstream Blindness",
    category: "Anti-Pattern Architetturale",
    definition: "Progettare i componenti software a valle dell'LLM assumendo ingiustificatamente che i dati restituiti dal modello siano validi, omettendo la validazione deterministica e i controlli di tipo.",
    aliases: ["Cecità a Valle"]
  },
  "Drowned Dashboard": {
    title: "The Drowned Dashboard (Il Cruscotto Annegato nel Rumore)",
    category: "Anti-Pattern Telemetrico",
    definition: "Situazione in cui una miriade di grafici aggregati a bassa densità informativa cela la violazione sistematica di proprietà critiche su casi limite.",
    aliases: ["The Drowned Dashboard", "Cruscotto Annegato nel Rumore"]
  },
  // =========================================================================
  // LETTERA E
  // =========================================================================
  "Echo Chamber Gate": {
    title: "The Echo Chamber Gate (Gate della Camera dell'Eco)",
    category: "Anti-Pattern di Pipeline",
    definition: "Gate decisionale ingannevole che autorizza il passaggio alla produzione basandosi unicamente sul consenso circolare e unanime di modelli linguistici privi di oracoli deterministici indipendenti.",
    aliases: ["The Echo Chamber Gate", "Gate della Camera dell'Eco"]
  },
  "Effetto Valanga": {
    title: "Effetto Valanga (del Difetto)",
    category: "Ingegneria del Software",
    definition: "Amplificazione esponenziale del costo di correzione e della gravità di un difetto non rilevato nelle fasi iniziali di definizione del problema o della specifica lungo la catena di rilascio.",
    aliases: ["Amplificazione del Difetto"]
  },
  "Emergency Permit": {
    title: "Emergency Permit (Approvazione Provvisoria Condizionata)",
    category: "Governance & Decisione",
    definition: "Autorizzazione eccezionale per hotfix notturni o di emergenza, vincolata a un perentorio Time-To-Live (TTL) oltre il quale l'approvazione decade automaticamente se non riverificata a freddo.",
    aliases: ["Approvazione Provvisoria Condizionata"]
  },
  "Entailment": {
    title: "Entailment (|= / Conseguenza Logica)",
    category: "Logica Formale",
    definition: "Relazione di conseguenza semantica stringente (simbolo |=) che stabilisce che non esiste alcuno scenario concepibile in cui le premesse sul mondo (W) e la specifica (S) siano vere e il requisito (R) risulti falso.",
    aliases: ["Soddisfacimento Semantico", "Conseguenza Logica"]
  },
  "Ephemeral Worker": {
    title: "The Ephemeral Worker (Lavoratore Effimero)",
    category: "Pattern Architetturali & Confinamento",
    definition: "Pattern di isolamento temporale e di stato in cui l'ambiente di computazione viene istanziato all'interno di una sandbox per eseguire un singolo task, scrive l'output verificato e viene distrutto irreversibilmente con tutte le sue risorse.",
    aliases: ["The Ephemeral Worker", "Lavoratore Effimero", "Worker Effimero"]
  },
  "Epistemic Capture": {
    title: "Epistemic Capture (Cattura Epistemica)",
    category: "Anti-Pattern di Revisione",
    definition: "Condizione in cui il verificatore indipendente si fa spiegare il funzionamento dall'autore del codice prima dell'analisi, assorbendone acriticamente le giustificazioni e perdendo imparzialità.",
    aliases: ["Cattura Epistemica"]
  },
  "Epistemic Laundering": {
    title: "Epistemic Laundering (Riciclaggio Epistemico)",
    category: "Distorsioni Epistemiche",
    definition: "Processo mediante il quale un'ipotesi o un'assunzione probabilistica generata da un LLM viene copiata in documenti o commenti fino ad acquisire ingiustificatamente lo status di fatto accertato senza alcuna verifica empirica.",
    aliases: ["Riciclaggio Epistemico"]
  },
  "Epistemic Proxy": {
    title: "Epistemic Proxy (Sostituto Epistemico)",
    category: "Anti-Pattern Cognitivi",
    definition: "Entità umana o artificiale a cui viene delegata l'acquisizione di una certezza conoscitiva senza che essa possieda l'indipendenza o i requisiti formali per produrre evidenza valida.",
    aliases: ["Sostituto Epistemico"]
  },
  "Epistemic Responsibility": {
    title: "Epistemic Responsibility (Responsabilità Epistemica)",
    category: "Governance & Etica",
    definition: "Il dovere di rispondere razionalmente delle basi probatorie su cui si fonda una decisione, dimostrando che la fiducia riposta nel software poggia su evidenze adeguate e proporzionate al rischio.",
    aliases: ["Responsabilità Epistemica"]
  },
  "Epistemic Risk": {
    title: "Epistemic Risk (Rischio Epistemico)",
    category: "Modello di Rischio",
    definition: "L'esposizione al danno derivante da ignoranza, assunzioni non verificate o modelli teorici inadeguati del software, contrapposta all'incertezza puramente aleatoria o stocastica.",
    aliases: ["Rischio Epistemico"]
  },
  "Epistemic Sufficiency": {
    title: "Epistemic Sufficiency (Sufficienza Epistemica)",
    category: "Modello Decisionale",
    definition: "Condizione per cui l'insieme di evidenze indipendenti e qualificate è congruo e proporzionato a giustificare l'ammissione dell'artefatto attraverso il Decision Gate rispetto al livello di rischio stabilito.",
    aliases: ["Sufficienza Epistemica"]
  },
  "Error Budget": {
    title: "Error Budget (Budget di Errore)",
    category: "Site Reliability Engineering",
    definition: "Quota massima di inaffidabilità, guasti o scostamenti consentiti rispetto all'obiettivo di servizio (1.0 - SLO) accumulabile in un determinato orizzonte temporale.",
    aliases: ["Budget di Errore"]
  },
  "Error Domain Modeling": {
    title: "Error Domain Modeling (Modellazione del Dominio degli Errori)",
    category: "Architettura del Software",
    definition: "Pratica architetturale consistente nel trattare gli errori non come eccezioni generiche non controllate, ma come tipi di dato espliciti facenti parte del dominio di ritorno della funzione.",
    aliases: ["Modellazione degli Errori"]
  },
  "Evidence": {
    title: "Evidence (Evidenza di Assurance)",
    category: "Fondamenti Epistemici",
    definition: "Artefatto oggettivo, tracciabile, riproducibile e auditabile (log, prova formale, trace) che supporta razionalmente una claim; distinta dalla confidenza soggettiva e dall'asserzione.",
    aliases: ["Evidenza", "Evidenze"]
  },
  "Evidence Applicability": {
    title: "Evidence Applicability (Applicabilità dell'Evidenza)",
    category: "Governance & Audit",
    definition: "La condizione logica per cui un'evidenza raccolta in passato conserva la propria efficacia probatoria rispetto allo stato attuale del sistema, delle dipendenze e del contesto operativo reale.",
    aliases: ["Applicabilità dell'Evidenza"]
  },
  "Evidence Dossier": {
    title: "Evidence Dossier (Dossier delle Evidenze)",
    category: "Artefatto di Decision Gate",
    definition: "Pacchetto immutabile e verificabile contenente tutte le prove sperimentali (log di test, SAST, PBT) associate univocamente all'hash del commit sottoposto a gate decisionale.",
    aliases: ["Dossier delle Evidenze"]
  },
  "Evidence Independence": {
    title: "Evidence Independence (Indipendenza delle Evidenze)",
    category: "Metodologia di Verifica",
    definition: "Condizione in cui le prove probatorie derivano da fonti non correlate all'autore o all'LLM che ha generato il codice, escludendo dipendenze concettuali e bias comuni.",
    aliases: ["Indipendenza delle Evidenze"]
  },
  "Evidence Invalidation vs Evidence Inapplicability": {
    title: "Evidence Invalidation vs Evidence Inapplicability",
    category: "Distinzioni Epistemiche",
    definition: "L'invalidazione avviene quando un test fallisce dimostrando una regressione; l'inapplicabilità avviene quando il contesto o le assunzioni sono mutati rendendo la vecchia prova priva di legame con la realtà.",
    aliases: ["Invalidazione vs Inapplicabilità dell'Evidenza"]
  },
  "Evidence Strength": {
    title: "Evidence Strength (Forza dell'Evidenza)",
    category: "Fondamenti Epistemici",
    definition: "Misura del potere epistemico di un elemento probatorio nel falsificare un'ipotesi di non conformità, scalabile da asserzione soggettiva a prova matematica formale convalidata.",
    aliases: ["Forza dell'Evidenza"]
  },
  "Evidence Sufficiency": {
    title: "Evidence Sufficiency (Sufficienza dell'Evidenza)",
    category: "Modello Decisionale",
    definition: "Condizione per cui l'insieme delle prove raccolte è qualitativamente e quantitativamente adeguato a giustificare l'ammissione dell'artefatto per il livello di rischio target.",
    aliases: ["Sufficienza dell'Evidenza"]
  },
  "Excessive Agency": {
    title: "Excessive Agency (Eccesso di Delega Agenziale)",
    category: "Cybersecurity & LLM",
    definition: "Vulnerabilità architetturale (OWASP LLM08) in cui a un agente basato su LLM vengono attribuiti permessi, tool o funzionalità di esecuzione sproporzionati rispetto al minimo necessario.",
    aliases: ["Eccesso di Delega Agenziale"]
  },
  "Expand/Contract Pattern": {
    title: "Expand/Contract Pattern (Pattern a Espansione e Contrazione)",
    category: "Architettura & Database",
    definition: "Tecnica architetturale di transizione per database e interfacce: le modifiche vengono introdotte in modo puramente additivo (espansione), garantendo compatibilità a ritroso con la versione precedente prima della dismissione (contrazione).",
    aliases: ["Pattern Expand/Contract", "Parallel Change", "Expand and Contract"]
  },
  "Explanation Satiation": {
    title: "Explanation Satiation (Sazietà da Spiegazione)",
    category: "Anti-Pattern Cognitivo",
    definition: "L'errore cognitivo di ritenere che la capacità dell'LLM di spiegare esaustivamente il codice prodotto coincida con l'assenza di difetti, inducendo il revisore a interrompere l'analisi delle omissioni.",
    aliases: ["Sazietà da Spiegazione"]
  },
  "Exploit": {
    title: "Exploit",
    category: "Cybersecurity",
    definition: "Tecnica, sequenza di comandi o payload software sviluppato per sfruttare una specifica vulnerabilità e ottenere comportamenti non previsti dal sistema.",
    aliases: ["Exploits"]
  },

  // =========================================================================
  // LETTERA F
  // =========================================================================
  "FACT": {
    title: "FACT (Fatto Accertato)",
    category: "Tassonomia Epistemica",
    definition: "Proposizione descrittiva corroborata da evidenza empirica diretta, tracciabile, verificabile e indipendente, non soggetta a interpretazione probabilistica contingente.",
    aliases: ["Fatto", "Fatti"]
  },
  "FAIL": {
    title: "FAIL",
    category: "Stati Decisionali",
    definition: "Stato decisionale formale in cui un'evidenza valida dimostra esplicitamente la violazione di una specifica o di un invariante, bloccando la transizione di gate.",
    aliases: ["Stato FAIL"]
  },
  "Fail-Closed vs Fail-Open": {
    title: "Fail-Closed vs Fail-Open",
    category: "Sicurezza Architetturale",
    definition: "Fail-Closed privilegia l'integrità bloccando le operazioni in caso di anomalia; Fail-Open privilegia la disponibilità consentendo l'accesso e accettando un degrado di sicurezza.",
    aliases: ["Fail-Closed", "Fail-Open"]
  },
  "Fail-Safe": {
    title: "Fail-Safe",
    category: "Ingegneria della Resilienza",
    definition: "Proprietà di un sistema che, in caso di guasto o errore imprevisto, transita automaticamente e deterministicamente in uno stato controllato che previene danni fisici o corruzione dati.",
    aliases: ["Sicurezza Intrinseca"]
  },
  "Fail-Safe Default": {
    title: "Fail-Safe Default (nei Feature Flag)",
    category: "Resilienza & Architettura",
    definition: "Principio architetturale per cui se il provider dei feature flag o la configurazione remota fallisce, il sistema ripiega istantaneamente e categoricamente sulla logica consolidata preesistente (OFF).",
    aliases: ["Default Sicuro"]
  },
  "Failure Mode": {
    title: "Failure Mode (Modalità di Guasto)",
    category: "Ingegneria dell'Affidabilità",
    definition: "Il meccanismo logico, fisico o architetturale specifico tramite cui un'invariante o una proprietà critica di sistema viene violata a runtime.",
    aliases: ["Modalità di Guasto", "Failure Modes"]
  },
  "Fallback": {
    title: "Fallback",
    category: "Resilienza Operativa",
    definition: "Ramo esecutivo alternativo attivato in caso di fallimento o timeout del percorso primario, preposto a generare una risposta deterministica o parziale con fedeltà semantica dichiarata.",
    aliases: ["Percorso Alternativo"]
  },
  "False Assurance": {
    title: "False Assurance (Falsa Garanzia di Fiducia)",
    category: "Fondamenti Epistemici",
    definition: "Stato patologico in cui si ripone una fiducia razionalmente ingiustificata nella correttezza o sicurezza del software, indotta da verifiche tautologiche, metriche non pertinenti o compiacenza algoritmica.",
    aliases: ["Falsa Assurance", "Falsa Sicurezza Epistemica"]
  },
  "Falsification Oracle": {
    title: "Falsification Oracle (Oracolo di Falsificazione)",
    category: "Testing & Oracoli",
    definition: "Procedura o banco di prova progettato specificamente non per confermare un'ipotesi favorevole, ma per sottoporre un'assunzione a condizioni limite estreme in grado di smentirla empiricamente.",
    aliases: ["Oracolo di Falsificazione"]
  },
  "Feasible Breach Path": {
    title: "Feasible Breach Path (Percorso di Compromissione Ammissibile)",
    category: "Threat Modeling",
    definition: "Cammino orientato nel grafo architetturale che consente a un dato ostile proveniente dall'esterno di raggiungere ed eseguire comandi su un asset critico senza incontrare validazioni deterministiche.",
    aliases: ["Percorso di Compromissione Ammissibile"]
  },
  "Feature Flag": {
    title: "Feature Flag (Feature Toggle)",
    category: "Rilascio Controllato",
    definition: "Costrutto decisionale a runtime che consente di attivare o deviare il flusso del codice senza ridistribuire il binario, separando il deployment dall'effettivo rilascio agli utenti.",
    aliases: ["Feature Flags", "Feature Toggle"]
  },
  "Finding": {
    title: "Finding (Riscontro / Risultato di Verifica)",
    category: "Audit & Verifica",
    definition: "Evidenza oggettiva e verificabile emersa durante un audit, analisi statica o test che attesta una non-conformità o evidenzia una vulnerabilità/discrepanza accertata.",
    aliases: ["Riscontro", "Rilievo"]
  },
  "Flag Debt Explosion": {
    title: "Flag Debt Explosion (Esplosione del Debito da Flag)",
    category: "Anti-Pattern di Rilascio",
    definition: "Accumulo incontrollato di feature flag non rimossi che moltiplica esponenzialmente (2^N) i percorsi logici del sistema, rendendo impossibile qualsiasi verifica deterministica dello stato globale.",
    aliases: ["Esplosione del Debito da Flag"]
  },
  "Flaky Test": {
    title: "Flaky Test (Test Instabile / Intermittente)",
    category: "Qualità del Testing",
    definition: "Caso di prova che fallisce o passa in modo non deterministico a parità di codice sorgente, indicando la presenza di race conditions, dipendenze temporali o assenza di isolamento dello stato.",
    aliases: ["Test Instabile", "Test Intermittente"]
  },
  "Flaky Test Silencing": {
    title: "Flaky Test Silencing",
    category: "Anti-Pattern di Pipeline",
    definition: "Pratica scorretta consistente nel riprovare automaticamente un test intermittente fino a ottenere un esito positivo casuale (es. flag --reruns), cancellando l'evidenza empirica di un difetto reale.",
    aliases: ["Silenziamento dei Test Intermittenti"]
  },
  "Flat Assurance": {
    title: "Flat Assurance (Trappola dell'Assurance Piatta)",
    category: "Anti-Pattern Metodologico",
    definition: "Applicare indistintamente il medesimo livello di verifica a qualsiasi componente software, provocando iper-ingegneria paralizzante su parti banali o sotto-ingegneria catastrofica su moduli critici.",
    aliases: ["Assurance Piatta"]
  },
  "Freshness Check": {
    title: "Freshness Check (Guardia di Freschezza del Dato)",
    category: "Resilienza & Dati",
    definition: "Controllo a runtime che accerta che una tabella o informazione esterna non abbia superato l'orizzonte temporale massimo di validità prima di consentirne l'elaborazione decisionale.",
    aliases: ["Guardia di Freschezza"]
  },
  "Friday Afternoon Rubber-Stamp": {
    title: "The Friday Afternoon Rubber-Stamp",
    category: "Anti-Pattern di Revisione",
    definition: "Collasso della vigilanza analitica umana sotto la pressione dell'orario di rilascio, che porta ad approvare codice complesso sulla base della bacheca verde.",
    aliases: ["The Friday Afternoon Rubber-Stamp", "Approvazione da Stanchezza"]
  },
  "Functional Core, Imperative Shell": {
    title: "Functional Core, Imperative Shell",
    category: "Architettura del Software",
    definition: "Pattern architetturale che separa nettamente un nucleo funzionale puro deterministico (Functional Core) da un guscio perimetrale che gestisce gli effetti collaterali e l'I/O (Imperative Shell).",
    aliases: ["Nucleo Funzionale e Guscio Imperativo"]
  },
  "Fuzzing": {
    title: "Fuzzing (Fuzz Testing)",
    category: "Testing Dinamico",
    definition: "Tecnica di verifica dinamica consistente nell'iniettare flussi massicci di dati anomali, casuali o mutati (spesso guidati dalla copertura dei rami) per stanare crash e violazioni di memoria.",
    aliases: ["Fuzz Testing", "Fuzz"]
  },

  // =========================================================================
  // LETTERA G
  // =========================================================================
  "GameDay": {
    title: "GameDay (Esercitazione Operativa di Guasto)",
    category: "Ingegneria della Resilienza",
    definition: "Sessione controllata in cui si inietta deliberatamente un guasto in ambiente clone per misurare empiricamente l'efficacia degli allarmi e l'eseguibilità dei runbook da parte degli operatori.",
    aliases: ["Operational Drill"]
  },
  "Garanzia Condizionale": {
    title: "Garanzia Condizionale",
    category: "Fondamenti Epistemici",
    definition: "Il principio logico per cui il software garantisce il raggiungimento del requisito reale se e solo se le assunzioni formulate sul mondo esterno circostante risultano valide.",
    aliases: ["Garanzia Condizionale del Software"]
  },
  "Gate Policy": {
    title: "Gate Policy (Politica di Gate)",
    category: "Governance & Decisione",
    definition: "Specifica dichiarativa formale che stabilisce quali evidenze siano obbligatorie per ciascun claim, quali soglie quantitative debbano essere rispettate e quali tolleranze ammesse.",
    aliases: ["Politica di Gate", "Politiche di Gate"]
  },
  "Gate Theater": {
    title: "Gate Theater (La Finzione del Gate)",
    category: "Anti-Pattern di Pipeline",
    definition: "Allestimento di un'infrastruttura di controllo visivamente complessa i cui controlli sono privi di effettivo potere bloccante (es. flag continue-on-error o test non vincolanti).",
    aliases: ["Finzione del Gate"]
  },
  "Ghost Code": {
    title: "Ghost Code (Codice Fantasma)",
    category: "Qualità del Codice & LLM",
    definition: "Comportamenti, costrutti, parametri o rami decisionali presenti nel codice generato che non derivano da alcun requisito di specifica né da vincoli architetturali approvati.",
    aliases: ["Codice Fantasma", "Ungrounded Logic"]
  },
  "Ghost Code Audit": {
    title: "Ghost Code Audit",
    category: "Qualità del Codice & LLM",
    definition: "Ispezione sistematica volta a individuare ed eliminare qualsiasi blocco di codice generato da LLM che non sia giustificato da un requisito o vincolo architetturale approvato.",
    aliases: ["Audit del Codice Fantasma"]
  },
  "Ghost Decommissioning": {
    title: "Ghost Decommissioning (Dismissione Fantasma)",
    category: "Anti-Pattern di Chiusura",
    definition: "Dichiarare un software dismesso spegnendo l'interfaccia utente ma lasciando attive chiavi API, webhook e permessi di storage cloud, esponendo l'organizzazione a rischi e costi incontrollati.",
    aliases: ["Dismissione Fantasma"]
  },
  "God-Container": {
    title: "The God-Container (Il Container Onnipotente)",
    category: "Anti-Pattern di Confinamento",
    definition: "Eseguire processi assistiti da LLM come utente root con flag privilegiati e visibilità su tutto l'host, annullando il principio di minima autorità.",
    aliases: ["The God-Container", "Container Onnipotente"]
  },
  "Golden Calibration Set": {
    title: "Golden Calibration Set",
    category: "Verifica di Modelli",
    definition: "Dataset di riferimento congelato e certificato da esperti indipendenti, utilizzato durante la Periodic Review per misurare l'eventuale deriva semantica (drift) del modello linguistico.",
    aliases: ["Golden Set", "Dataset di Calibrazione"]
  },
  "Gradual Half-Open Traffic Shifting con Jitter": {
    title: "Gradual Half-Open Traffic Shifting con Jitter",
    category: "Resilienza Operativa",
    definition: "Tecnica avanzata di circuit breaking in cui la transizione da Open a Closed avviene incrementando gradualmente la percentuale di traffico inviata alla dipendenza con dispersione temporale casuale.",
    aliases: ["Rientro a Scalino con Jitter"]
  },
  "Grafo di Giustificazione Epistemica": {
    title: "Grafo di Giustificazione Epistemica (Epistemic Justification Graph)",
    category: "Tracciabilità dell'Assurance",
    definition: "Rappresentazione a Grafo Aciclico Diretto (DAG) delle dipendenze causali, logiche e probatorie a supporto della correttezza del software, esteso dall'obiettivo all'approvazione formale.",
    aliases: ["Epistemic Justification Graph", "Grafo di Giustificazione"]
  },
  "Green Board Fallacy": {
    title: "Green Board Fallacy (La Fallacia della Bacheca Verde)",
    category: "Anti-Pattern Decisionale",
    definition: "L'assunzione automatica che una dashboard interamente verde (successo di esecuzione dei job CI) dimostri la correttezza del software, ignorando oracoli deboli o asserzioni vacue.",
    aliases: ["Fallacia della Bacheca Verde"]
  },
  "Ground Truth": {
    title: "Ground Truth (Verità di Riferimento / Verità sul Campo)",
    category: "Fondamenti Epistemici",
    definition: "Lo stato reale e oggettivo del dominio fisico o matematico, indipendente da qualsiasi rappresentazione simbolica prodotta da programmatori o modelli linguistici.",
    aliases: ["Verità sul Campo"]
  },
  "Guardrail Specification": {
    title: "Guardrail Specification (Specifica a Barriera Invariante)",
    category: "Ingegneria dei Requisiti & AI",
    definition: "Specifica tecnica per agenti basati su LLM che formalizza l'insieme delle azioni vietate e i perimetri di autorizzazione dei tool anziché pretendere di vincolare il testo conversazionale.",
    aliases: ["Specifica a Barriera Invariante"]
  },

  // =========================================================================
  // LETTERA H
  // =========================================================================
  "Hallucinated CLI": {
    title: "The Hallucinated CLI",
    category: "Anti-Pattern Operativo",
    definition: "Runbook generato da LLM contenente comandi di shell con parametri, flag o opzioni inesistenti che falliscono durante la risposta all'incidente.",
    aliases: ["The Hallucinated CLI", "CLI Allucinata"]
  },
  "Hand-Waving Requirements": {
    title: "Hand-Waving Requirements (Requisiti Evagativi)",
    category: "Anti-Pattern di Specifica",
    definition: "Formulazione di requisiti basata su aggettivi qualitativi non quantificati ('veloce', 'sicuro', 'intuitivo') che impediscono la costruzione di oracoli di verifica deterministici falsificabili.",
    aliases: ["Requisiti Evagativi"]
  },
  "Happy-Path Monoculture": {
    title: "Happy-Path Monoculture",
    category: "Anti-Pattern di Testing",
    definition: "Generare esclusivamente test su input nominali e ben formati, omettendo casi negativi, limiti dimensionali, nulli e condizioni di errore, inducendo una falsa percezione di robustezza.",
    aliases: ["Monocultura del Caso Ideale"]
  },
  "Harm": {
    title: "Harm (Mishap / Danno)",
    category: "Ingegneria della Sicurezza",
    definition: "L'evento terminale non desiderato nel Mondo reale che comporta una perdita: morte o lesioni a persone, distruzione materiale, collasso finanziario o disastro ambientale; distinto dal pericolo (Hazard).",
    aliases: ["Danno", "Mishap"]
  },
  "Hazard": {
    title: "Hazard (Pericolo di Sistema)",
    category: "Ingegneria della Sicurezza",
    definition: "Condizione o stato interno del sistema che, combinato con specifiche condizioni ambientali esterne, conduce a un danno (Harm) nel Mondo reale (W).",
    aliases: ["Pericolo", "Pericoli"]
  },
  "Hidden Coupling": {
    title: "Hidden Coupling (Accoppiamento Nascosto)",
    category: "Architettura del Software",
    definition: "Relazione di dipendenza non espressa da import o firme di interfaccia, ma radicata su assunzioni temporali, formati dati impliciti o condivisione invisibile di risorse esterne.",
    aliases: ["Accoppiamento Nascosto"]
  },
  "Hidden Precondition Assumption": {
    title: "Hidden Precondition Assumption",
    category: "Anti-Pattern di Specifica",
    definition: "Scaricare la responsabilità del controllo degli input malformati sull'ambiente chiamante mediante precondizioni eccessivamente restrittive, esponendo il sistema a crash su ingressi non sanitizzati.",
    aliases: ["Assunzione Nascosta nella Precondizione"]
  },
  "High Cardinality": {
    title: "High Cardinality (Alta Cardinalità)",
    category: "Osservabilità & Dati",
    definition: "Proprietà di dataset o metriche telemetriche che contengono attributi con milioni di valori unici (es. user_id, transaction_id), indispensabile per isolare anomalie rare senza disperderle nella media.",
    aliases: ["Alta Cardinalità"]
  },
  "Hindsight Bias": {
    title: "Hindsight Bias (Senno di Poi)",
    category: "Distorsioni Cognitive & Diagnosi",
    definition: "La convinzione retrospettiva fallace che un incidente fosse perfettamente ovvio e prevedibile fin dall'inizio, inducendo il team ad accontentarsi di toppe sintomatiche superficiali.",
    aliases: ["Senno di Poi"]
  },
  "Hollow Link": {
    title: "Hollow Link (Collegamento Burocratico Cavo)",
    category: "Anti-Pattern di Tracciabilità",
    definition: "Collegamento ipertestuale superficiale tra documenti privo di reale giustificazione logica o associato a test cavi che non verificano la proprietà di riferimento.",
    aliases: ["Collegamento Burocratico Cavo"]
  },
  "Hollow Test": {
    title: "Hollow Test (Test Cavo)",
    category: "Anti-Pattern di Testing",
    definition: "Caso di prova collegato formalmente a un requisito la cui asserzione è debole o priva di oracolo discriminante (es. assert True), incapace di rilevare violazioni logiche della proprietà.",
    aliases: ["Test Cavo"]
  },
  "HSM": {
    title: "HSM (Hardware Security Module)",
    category: "Sicurezza Hardware",
    definition: "Dispositivo hardware blindato dedicato progettato per custodire chiavi crittografiche ed eseguire operazioni di firma senza che la chiave privata possa mai essere estratta in chiaro.",
    aliases: ["Hardware Security Module"]
  },
  "Human Review": {
    title: "Human Review (Revisione Umana di Assurance)",
    category: "Governance & Verifica",
    definition: "Ispezione critica condotta da un essere umano qualificato sulle proprietà critiche del software, orientata alla ricerca di assunzioni non dichiarate e omissioni semantiche.",
    aliases: ["Revisione Umana"]
  },
  "Human-in-Command": {
    title: "Human-in-Command (HIC)",
    category: "Governance & Controllo",
    definition: "Paradigma di controllo in cui l'essere umano definisce obiettivi, stabilisce i confini invalicabili di operatività del software e conserva l'autorità formale di revocarne l'autonomia.",
    aliases: ["HIC", "Human-in-Command"]
  },
  "Human-in-the-Loop": {
    title: "Human-in-the-Loop (HITL)",
    category: "Governance & Controllo",
    definition: "Paradigma in cui il software propone un'azione e l'azione non può essere eseguita nel mondo reale senza un comando o autorizzazione esplicita dell'operatore umano.",
    aliases: ["HITL", "Human-in-the-Loop"]
  },
  "Human-on-the-Loop": {
    title: "Human-on-the-Loop (HOTL)",
    category: "Governance & Controllo",
    definition: "Paradigma operativo in cui il software esegue l'azione autonomamente e l'operatore umano monitora il processo disponendo di strumenti e tempo per intervenire con un arresto di emergenza.",
    aliases: ["HOTL", "Human-on-the-Loop"]
  },
  "HYPOTHESIS": {
    title: "HYPOTHESIS (Ipotesi di Lavoro)",
    category: "Tassonomia Epistemica",
    definition: "Enunciato o congettura avanzata per spiegare un fenomeno osservato o prevedere un comportamento, formulata in termini falsificabili in attesa di corroborazione empirica.",
    aliases: ["Ipotesi", "Ipotesi di Lavoro"]
  },

  // =========================================================================
  // LETTERA I
  // =========================================================================
  "Idempotenza": {
    title: "Idempotenza (Idempotence)",
    category: "Proprietà Relazionali",
    definition: "Proprietà per cui l'applicazione ripetuta di una medesima operazione produce il medesimo effetto di una singola esecuzione: f(f(x)) == f(x). Fondamentale per la sicurezza di reti e pagamenti.",
    aliases: ["Idempotence"]
  },
  "Impatient Canary": {
    title: "The Impatient Canary (Il Canary Impaziente)",
    category: "Anti-Pattern di Rilascio",
    definition: "Comprimere arbitrariamente la finestra temporale di osservazione del canary release, impedendo l'intercettazione di memory leak o deadlock asincroni.",
    aliases: ["The Impatient Canary", "Canary Impaziente"]
  },
  "Implementation Design": {
    title: "Implementation Design (Progettazione dell'Implementazione)",
    category: "Architettura del Software",
    definition: "La strutturazione del sistema software in unità verificabili, osservabili e isolate (Functional Core vs Imperative Shell), propedeutica alla scrittura del codice.",
    aliases: ["Progettazione dell'Implementazione", "Design"]
  },
  "Implementation Mirroring": {
    title: "Implementation Mirroring",
    category: "Anti-Pattern di Testing",
    definition: "Scrivere test o proprietà che duplicano esattamente la logica procedurale del codice implementato anziché verificare invarianti indipendenti di dominio, annullando il potere diagnostico.",
    aliases: ["Specchiatura dell'Implementazione"]
  },
  "Inadequate Control Actions": {
    title: "Inadequate Control Actions (Azioni di Controllo Inadeguate)",
    category: "Ingegneria della Sicurezza Sistemica",
    definition: "Azioni di controllo errate o intempestive (nella teoria STAMP di Leveson) scaturite da una discrepanza tra il modello interno che il software ha del processo e lo stato reale del processo stesso.",
    aliases: ["Azioni di Controllo Inadeguate"]
  },
  "Incertezza Aleatoria": {
    title: "Incertezza Aleatoria",
    category: "Modello di Rischio",
    definition: "La variabilità intrinsecamente stocastica dei fenomeni fisici o ambientali (rumore termico, fluttuazioni casuali), gestibile tramite margini statistici e ridondanza.",
    aliases: ["Incertezza Stocastica"]
  },
  "Incertezza Epistemica": {
    title: "Incertezza Epistemica",
    category: "Fondamenti Epistemici",
    definition: "L'incertezza derivante dalla nostra ignoranza o mancanza di conoscenza del dominio, delle proprietà del modello o dei contesti operativi; non riducibile a semplice probabilità aleatoria.",
    aliases: ["Ignoranza Epistemica"]
  },
  "Incident": {
    title: "Incident (Incidente)",
    category: "Fenomenologia Operativa",
    definition: "Evento non pianificato che ha interrotto o degradato gravemente una funzione critica o violato un invariante formale in ambiente di produzione.",
    aliases: ["Incidente", "Incidenti"]
  },
  "Independent Verification": {
    title: "Independent Verification (Verifica Indipendente / IV&V)",
    category: "Metodologia di Verifica",
    definition: "Attività di verifica condotta con separazione procedurale, manageriale, finanziaria, tecnica ed epistemica rispetto a chi ha sviluppato il software.",
    aliases: ["Verifica Indipendente", "IV&V"]
  },
  "Independent Verification Report": {
    title: "Independent Verification Report (IVR)",
    category: "Artefatto di Assurance",
    definition: "Relazione tecnica formale emessa dal verificatore indipendente che documenta il profilo di indipendenza applicato, le prove Clean-Room eseguite e il registro delle discrepanze.",
    aliases: ["IVR", "Rapporto di Verifica Indipendente"]
  },
  "Indipendenza Epistemica": {
    title: "Indipendenza Epistemica (Epistemic Independence)",
    category: "Fondamenti Epistemici",
    definition: "Condizione in cui due o più evidenze a supporto di una proprietà derivano da fonti prive di correlazione concettuale, assunzioni comuni, dataset di pre-training o bias condivisi.",
    aliases: ["Epistemic Independence"]
  },
  "Indirect Prompt Injection": {
    title: "Indirect Prompt Injection (Iniezione Indiretta di Prompt)",
    category: "Cybersecurity & LLM",
    definition: "Attacco in cui un modello elabora dati provenienti da fonti terze non attendibili (PDF, pagine web) contenenti istruzioni avversariali che sovrascrivono il system prompt primario.",
    aliases: ["Iniezione Indiretta di Prompt"]
  },
  "Inductive Invariant": {
    title: "Inductive Invariant (Invariante Induttivo)",
    category: "Metodi Formali",
    definition: "Invariante logico che è vero nello stato iniziale e la cui validità nello stato corrente implica la validità nello stato successivo per qualsiasi transizione lecita, abilitando prove per induzione.",
    aliases: ["Invariante Induttivo"]
  },
  "Inherent Risk": {
    title: "Inherent Risk (Rischio Inerente)",
    category: "Gestione del Rischio",
    definition: "Il livello di rischio intrinseco associato a un'architettura o componente valutato in assenza totale di controlli, test o mitigazioni dedicate.",
    aliases: ["Rischio Inerente"]
  },
  "Inquinamento Implementativo": {
    title: "Inquinamento Implementativo (Implementation Leaks)",
    category: "Ingegneria dei Requisiti",
    definition: "Incorporare strutture dati interne, algoritmi privati o scelte tecnologiche contingenti all'interno della specifica di interfaccia, distruggendo l'indipendenza dell'oracolo di verifica.",
    aliases: ["Implementation Leaks"]
  },
  "Inspection Bandwidth": {
    title: "Inspection Bandwidth (Capacità di Ispezione Cognitiva)",
    category: "Fattori Umani & Revisione",
    definition: "La quantità limitata di concentrazione analitica che un essere umano può dedicare all'analisi di codice prima che la fatica mentale ne comprometta la capacità di individuare difetti semantici.",
    aliases: ["Capacità di Ispezione Cognitiva"]
  },
  "Insoddisfacibilità Formale": {
    title: "Insoddisfacibilità Formale (della Specifica)",
    category: "Ingegneria dei Requisiti & Logica",
    definition: "Condizione in cui l'insieme delle clausole della specifica si esclude a vicenda, rendendo matematicamente impossibile l'esistenza di qualsiasi implementazione corretta (UNSAT).",
    aliases: ["Specifica Insoddisfacibile", "UNSAT"]
  },
  "Insurance": {
    title: "Insurance (Copertura Assicurativa)",
    category: "Distinzioni Giuridiche",
    definition: "Contratto finanziario mediante il quale determinate conseguenze economiche del rischio vengono trasferite a un assicuratore; distinta sia dall'Assurance sia dalla Warranty.",
    aliases: ["Assicurazione Finanziaria"]
  },
  "Integrity Level Target": {
    title: "Integrity Level Target (Bersaglio del Livello di Integrità)",
    category: "Modello di Rischio",
    definition: "Obiettivo formale assegnato a una specifica proprietà critica che deve essere garantita con un livello prefissato di rigore probatorio e confidenza.",
    aliases: ["Bersaglio del Livello di Integrità"]
  },
  "Invalidation Propagation": {
    title: "Invalidation Propagation (Propagazione dell'Invalidazione)",
    category: "Tracciabilità dell'Assurance",
    definition: "Algoritmo deterministico su grafo topologico per cui la modifica di un nodo a monte revoca immediatamente lo stato PASS di tutti i nodi e verifiche dipendenti a valle.",
    aliases: ["Propagazione dell'Invalidazione"]
  },
  "Invariant": {
    title: "Invariant (Invariante di Sistema / Invariante Critico)",
    category: "Logica Formale",
    definition: "Proprietà logica del sistema che deve essere preservata attraverso tutte le transizioni ammesse dello stato, assumendo valore vero all'avvio e in ogni stato raggiungibile.",
    aliases: ["Invariante", "Invarianti", "Invariante Critico"]
  },
  "Invariante di Sistema o Globale": {
    title: "Invariante di Sistema o Globale (System Invariant)",
    category: "Logica Formale",
    definition: "Legge di conservazione o relazione logica che vincola la totalità dei componenti distribuiti o delle entità del dominio (es. conservazione della massa monetaria complessiva).",
    aliases: ["System Invariant", "Invariante Globale"]
  },
  "Invariante di Stato": {
    title: "Invariante di Stato (State Invariant)",
    category: "Logica Formale",
    definition: "Condizione logica che deve risultare vera in ogni singolo stato raggiungibile del sistema software: forall s in Reach(S): Phi(s) == TRUE.",
    aliases: ["State Invariant"]
  },
  "Invariante di Transizione": {
    title: "Invariante di Transizione (Transition Invariant)",
    category: "Logica Formale",
    definition: "Relazione logica che vincola il passaggio tra lo stato immediatamente precedente a un'operazione e lo stato risultante (es. l'orologio di sistema può solo avanzare monotonicamente).",
    aliases: ["Transition Invariant"]
  },
  "Inventory Fallacy": {
    title: "The Inventory Fallacy (La Fallacia dell'Inventario)",
    category: "Anti-Pattern di Governance",
    definition: "L'errore cognitivo di confondere la catalogazione di un pericolo nel registro con l'averlo effettivamente mitigato mediante controlli verificati.",
    aliases: ["The Inventory Fallacy", "Fallacia dell'Inventario"]
  },
  "Irreversible Migration Trap": {
    title: "The Irreversible Migration Trap",
    category: "Anti-Pattern di Rilascio",
    definition: "Applicare migrazioni di database distruttive contestuali al rilascio del codice, rendendo impossibile il rollback della versione precedente.",
    aliases: ["The Irreversible Migration Trap", "Trappola della Migrazione Irreversibile"]
  },
  "Ispezione Inversa": {
    title: "Ispezione Inversa (Protocollo di Ispezione Inversa)",
    category: "Metodologia di Revisione",
    definition: "Metodo di revisione del codice generato da LLM che parte dagli invarianti di specifica, interroga le evidenze dei test e va a caccia attiva delle omissioni architetturali prima di leggere il codice.",
    aliases: ["Protocollo di Ispezione Inversa", "Reverse Inspection"]
  },

  // =========================================================================
  // LETTERA K
  // =========================================================================
  "Knowledge Base as Wiki": {
    title: "Knowledge Base as Wiki",
    category: "Anti-Pattern Organizzativo",
    definition: "Conservare le lezioni apprese e i requisiti di sicurezza in pagine di testo prolisso non indicizzato e non integrato nei linter CI/CD, rendendole invisibili allo sviluppo corrente.",
    aliases: ["Base di Conoscenza Dispersa"]
  },
  "Knowledge Base di Assurance": {
    title: "Knowledge Base di Assurance",
    category: "Memoria Organizzativa",
    definition: "Repository istituzionale persistente che conserva fatti accertati, failure mode dimostrati, assunzioni confutate, pattern vietati e oracoli per impedire l'amnesia tecnica dei progetti.",
    aliases: ["Knowledge Base", "Base di Conoscenza"]
  },
  "Knowledge Entry": {
    title: "Knowledge Entry",
    category: "Struttura Dati",
    definition: "Elemento strutturato e formalizzato archiviato nella Knowledge Base contenente descrizione del difetto, contesto, pattern vietato, pattern conforme e guardrail automatizzati.",
    aliases: ["Knowledge Entries"]
  },
  "Known Knowns": {
    title: "Known Knowns (Fatti Verificati)",
    category: "Tassonomia Epistemica",
    definition: "Informazioni, requisiti e proprietà del dominio di cui si possiede piena consapevolezza ed evidenza empirica o formale accertata.",
    aliases: ["Fatti Verificati"]
  },
  "Known Unknowns": {
    title: "Known Unknowns (Incognite Mappate)",
    category: "Tassonomia Epistemica",
    definition: "Parametri, condizioni o eventi di cui l'organizzazione è consapevole di non possedere la misura o la certezza, che generano requisiti di indagine o test dedicati.",
    aliases: ["Incognite Note", "Incognite Mappate"]
  },

  // =========================================================================
  // LETTERA L
  // =========================================================================
  "Least Authority": {
    title: "Least Authority (POLA - Principio della Minima Autorità)",
    category: "Sicurezza Architetturale",
    definition: "Principio architetturale secondo cui a ogni componente o agente deve essere concessa esclusivamente l'autorità minima indispensabile (risorse, socket, syscall) per svolgere il compito assegnato.",
    aliases: ["POLA", "Minima Autorità"]
  },
  "Least Privilege": {
    title: "Least Privilege (PoLP - Principio del Minimo Privilegio)",
    category: "Sicurezza & Permessi",
    definition: "Principio classico (Saltzer & Schroeder) che impone di concedere a ogni utente o processo solo i privilegi e ruoli formali minimi necessari per operare.",
    aliases: ["PoLP", "Minimo Privilegio"]
  },
  "Lessons Learned": {
    title: "Lessons Learned (Lezioni Apprese)",
    category: "Gestione della Conoscenza",
    definition: "Ipotesi empiriche corroborate derivate dall'analisi dei guasti e post-mortem, formalizzate come vincoli architetturali nel Registro dei Rischi.",
    aliases: ["Lezioni Apprese"]
  },
  "Lethal Schema Drift": {
    title: "Lethal Schema Drift (Deriva Fatale dello Schema)",
    category: "Anti-Pattern di Rilascio",
    definition: "Esecuzione di migrazioni di database irreversibili o non retrocompatibili in contemporanea con un canary, che abbatte all'istante la versione baseline ancora attiva per la maggioranza degli utenti.",
    aliases: ["Deriva Fatale dello Schema"]
  },
  "LGTM Syndrome": {
    title: "LGTM Syndrome (Looks Good To Me)",
    category: "Anti-Pattern di Revisione",
    definition: "Pratica superficiale consistente nell'approvare formalmente una Pull Request basandosi unicamente sulla buona impressione visiva del codice e sul successo dei test di CI.",
    aliases: ["Sindrome LGTM"]
  },
  "Lightweight Formal Methods": {
    title: "Lightweight Formal Methods (Metodi Formali Leggeri)",
    category: "Metodi Formali",
    definition: "Metodologia di specifica e verifica che modella i contratti tramite linguaggi logico-relazionali (es. Alloy) per ricercare esaustivamente controesempi entro ambiti finiti tramite SAT-solver.",
    aliases: ["Metodi Formali Leggeri"]
  },
  "Linguistic Pacification": {
    title: "Linguistic Pacification (Placazione Linguistica)",
    category: "Distorsioni Epistemiche & LLM",
    definition: "Meccanismo di falsa sicurezza per cui commenti rassicuranti inseriti dall'LLM nei test inducono nel revisore la convinzione che la proprietà sia verificata anche se l'asserzione è debole o vuota.",
    aliases: ["Placazione Linguistica"]
  },
  "Liveness Property": {
    title: "Liveness Property (Proprietà di Vivacità)",
    category: "Logica Formale",
    definition: "Prescrizione logica che garantisce che uno stato desiderato o un evento favorevole si verificherà entro un tempo determinato ('qualcosa di buono prima o poi accadrà').",
    aliases: ["Proprietà di Vivacità", "Liveness"]
  },
  "LLM": {
    title: "LLM (Large Language Model)",
    category: "Tecnologie Fondazionali",
    definition: "Modello linguistico probabilistico basato su architettura Transformer, addestrato su vasti corpora testuali per produrre continuazioni di token massimamente plausibili.",
    aliases: ["Large Language Model", "Modelli Linguistici"]
  },
  "LLM-Assisted Implementation": {
    title: "LLM-Assisted Implementation (Sviluppo Assistito da LLM)",
    category: "Metodologia di Sviluppo",
    definition: "Processo di costruzione del software in cui il codice viene sintetizzato da un modello statistico sotto vincoli rigidi di contratti, tipi e invarianti controllati da un umano.",
    aliases: ["Sviluppo Assistito da LLM"]
  },
  "Locus of Enforcement": {
    title: "Locus of Enforcement (Punto Esclusivo di Presidio)",
    category: "Architettura del Software",
    definition: "Il singolo punto architetturale a cui è delegata in via esclusiva la responsabilità di far rispettare un invariante critico, impedendone la frammentazione nel codice.",
    aliases: ["Punto di Presidio"]
  },

  // =========================================================================
  // LETTERA M
  // =========================================================================
  "Machine": {
    title: "Machine / Macchina (M)",
    category: "Modello Mondo-Macchina",
    definition: "Il software, l'hardware e le configurazioni esecutive che sviluppiamo o controlliamo direttamente, operanti alla frontiera di contatto con l'ambiente esterno secondo il modello W AND S |= R.",
    aliases: ["Macchina", "M"]
  },
  "Macro-Circuito Operativo di Assurance": {
    title: "Macro-Circuito Operativo di Assurance",
    category: "Governance & Ciclo di Vita",
    definition: "Ciclo continuo di retroazione che connette l'estrazione dell'evidenza empirica reale (Step 29), l'aggiornamento del Registro dei Rischi e della Knowledge Base (Step 30) e l'analisi preventiva dell'impatto (Step 31).",
    aliases: ["Macro-Circuito Operativo"]
  },
  "Majority Voting Decision Gate": {
    title: "Majority Voting Decision Gate (Regola della Maggioranza)",
    category: "Anti-Pattern Decisionale",
    definition: "Anti-pattern consistente nell'approvare un componente perché la maggioranza dei modelli LLM consultati ha votato PASS, scartando i modelli dissenzienti che segnalavano vulnerabilità reali.",
    aliases: ["Regola della Maggioranza", "Majority Voting"]
  },
  "Managerial Independence": {
    title: "Managerial Independence (Indipendenza Manageriale)",
    category: "Metodologia di Verifica",
    definition: "Dimensione dell'indipendenza in cui chi verifica il software non risponde gerarchicamente alle figure responsabili del rispetto delle scadenze di consegna o del budget di sviluppo.",
    aliases: ["Indipendenza Manageriale"]
  },
  "Masking": {
    title: "Masking (Mascheramento)",
    category: "Anti-Pattern di Diagnosi",
    definition: "Pratica scorretta consistente nel silenziare o attenuare il sintomo esteriore di un'anomalia (es. soppressione di eccezioni o rilassamento di asserzioni) lasciando intatta la causa del difetto.",
    aliases: ["Mascheramento"]
  },
  "Matrice delle Competenze di Assurance": {
    title: "Matrice delle Competenze di Assurance (ACM)",
    category: "Governance & Competenze",
    definition: "Tabella operativa che prescrive per ciascun modulo critico i requisiti minimi inderogabili di competenza specialistica, tooling e indipendenza richiesti al revisore prima dell'approvazione.",
    aliases: ["ACM", "Assurance Competence Matrix"]
  },
  "Matrice di Fedeltà del Fallback": {
    title: "Matrice di Fedeltà del Fallback",
    category: "Resilienza & Contratti",
    definition: "Mappatura esplicita delle proprietà contrattuali nominali che vengono preservate o rilassate durante l'attivazione di un percorso di ripiego degradato.",
    aliases: ["Matrice di Fedeltà"]
  },
  "Matrice di Rischio Epistemico": {
    title: "Matrice di Rischio Epistemico",
    category: "Modello di Rischio",
    definition: "Matrice bidimensionale (Impatto vs Grado di Incertezza dell'Assunzione) utilizzata per allocare razionalmente lo sforzo probatorio e identificare le assunzioni che impongono lo stato di NO-GO.",
    aliases: ["Matrice Rischio Epistemico"]
  },
  "Meaningful Human Control": {
    title: "Meaningful Human Control (Controllo Umano Significativo)",
    category: "Governance & Fattori Umani",
    definition: "Condizione in cui l'operatore umano dispone di tempo decisionale congruo, carico cognitivo sostenibile, trasparenza delle evidenze e potere reale di veto per bloccare il sistema.",
    aliases: ["Controllo Umano Significativo", "MHC"]
  },
  "Metamorphic Testing": {
    title: "Metamorphic Testing (Testing Metamorfico)",
    category: "Testing & Oracoli",
    definition: "Metodologia di prova che valuta le relazioni necessarie (Relazioni Metamorfiche) tra gli output di esecuzioni multiple a fronte di specifiche trasformazioni degli input, risolvendo l'assenza di un oracolo diretto.",
    aliases: ["Testing Metamorfico", "Oracolo Metamorfico"]
  },
  "Missing Read-Only Boundary": {
    title: "Missing Read-Only Boundary",
    category: "Anti-Pattern Operativo",
    definition: "Difetto di progettazione del runbook in cui le istruzioni di triage diagnostico in sola lettura sono mescolate a comandi che mutano lo stato del sistema senza barriere o conferme.",
    aliases: ["Assenza di Barriera Read-Only"]
  },
  "Mission Creep": {
    title: "Mission Creep (Effetto Mission Creep)",
    category: "Modello di Rischio",
    definition: "Condizione di degrado in cui un componente software sviluppato per contesti a basso rischio (AL-0/AL-1) viene promosso tacitamente a compiti critici senza ricalibrare i requisiti probatori.",
    aliases: ["Effetto Mission Creep"]
  },
  "MITRE ATLAS": {
    title: "MITRE ATLAS",
    category: "Cybersecurity & Standard",
    definition: "Knowledge base globale di tattiche, tecniche e procedure (TTP) avversariali documentate empiricamente contro sistemi basati su intelligenza artificiale e machine learning.",
    aliases: ["ATLAS"]
  },
  "Mock Freeze Forever": {
    title: "Mock Freeze Forever",
    category: "Anti-Pattern di Testing",
    definition: "Mantenere inalterati nel tempo i mock e gli stub dei servizi esterni, inducendo test verdi su modelli dell'ambiente che non corrispondono più alla realtà operativa corrente.",
    aliases: ["Congelamento dei Mock"]
  },
  "Mock-Heavy Design": {
    title: "Mock-Heavy Design (L'Illusione del Disaccoppiamento)",
    category: "Anti-Pattern Architetturale",
    definition: "Architettura iper-frammentata in cui l'eccesso di interfacce astratte costringe i test a verificare unicamente l'interazione simulata con i mock anziché la tenuta degli invarianti reali.",
    aliases: ["Illusione del Disaccoppiamento"]
  },
  "Model Drift": {
    title: "Model Drift (Deriva del Modello)",
    category: "Machine Learning & Assurance",
    definition: "Variazione statistica misurabile nelle distribuzioni di output, accuratezza o allineamento di un LLM a parità di prompt, causata da aggiornamenti opachi o variazioni del motore.",
    aliases: ["Deriva del Modello"]
  },
  "Model-based Oracle": {
    title: "Model-based Oracle (Oracolo Basato su Modello)",
    category: "Testing & Oracoli",
    definition: "Oracolo di test che confronta l'evoluzione dello stato del software con un automa a stati finiti (FSM) o una specifica formale astratta (es. modello TLA+).",
    aliases: ["Oracolo Basato su Modello"]
  },
  "Modular Assurance": {
    title: "Modular Assurance (Decomposizione per l'Assurance)",
    category: "Architettura del Software",
    definition: "Principio architetturale secondo cui la confidenza nelle proprietà globali del sistema può essere dedotta analizzando le proprietà locali dei singoli moduli e le regole della loro composizione.",
    aliases: ["Decomposizione per l'Assurance"]
  },
  "Module Contract": {
    title: "Module Contract (Contratto di Modulo)",
    category: "Architettura del Software",
    definition: "Insieme formalizzato di precondizioni, postcondizioni e invarianti che regolano lo scambio informativo tra modulo chiamante e modulo fornitore all'interfaccia.",
    aliases: ["Contratto di Modulo"]
  },
  "Monolithic Prompt Trap": {
    title: "The Monolithic Prompt Trap",
    category: "Anti-Pattern di Sviluppo",
    definition: "Fornire all'LLM un'intera specifica complessa chiedendo di generare tutto il codice in blocco, producendo monoliti non verificabili e accoppiati.",
    aliases: ["The Monolithic Prompt Trap", "Trappola del Prompt Monolitico"]
  },
  "Monotonicità": {
    title: "Monotonicità (Monotonicity)",
    category: "Proprietà Relazionali",
    definition: "Proprietà relazionale per cui l'ordinamento relativo degli input si preserva sull'ordinamento degli output corrispondenti: x <= y -> f(x) <= f(y).",
    aliases: ["Monotonicity", "Monotonia"]
  },
  "Multi-Agent Echo Chamber": {
    title: "Multi-Agent Echo Chamber",
    category: "Anti-Pattern Metodologico",
    definition: "Spirale di compiacenza in cui più agenti LLM (es. coder, reviewer, tester) si approvano a vicenda in modo circolare, privi di ancoraggio causale al mondo fisico o oracoli deterministici.",
    aliases: ["Camera dell'Eco Multi-Agente"]
  },
  "Multi-Model Audit": {
    title: "Multi-Model Audit",
    category: "Metodologia di Verifica",
    definition: "Pratica in cui uno stesso artefatto viene esaminato in modalità cieca da modelli linguistici eterogenei per far emergere discrepanze e disaccordi da sottoporre ad arbitrato indipendente.",
    aliases: ["Audit Multi-Modello"]
  },
  "Multi-Window Multi-Burn-Rate": {
    title: "Multi-Window Multi-Burn-Rate",
    category: "Ingegneria Operativa",
    definition: "Modello di allarme avanzato (SRE) che valuta la congiunzione logica tra una finestra temporale breve (es. 5 min) e una lunga (es. 1 ora) a parità di consumo del budget di errore, eliminando il flapping.",
    aliases: ["Multi-Burn-Rate", "Multi-Window Alerting"]
  },
  "Mutation Score": {
    title: "Mutation Score (Punteggio di Mutazione)",
    category: "Metriche di Testing",
    definition: "Rapporto percentuale tra i mutanti sintetici uccisi da una test suite e il totale dei mutanti non equivalenti generati, quantificandone il potere discriminante.",
    aliases: ["Punteggio di Mutazione"]
  },
  "Mutation Testing": {
    title: "Mutation Testing (Analisi di Mutazione)",
    category: "Testing Dinamico",
    definition: "Tecnica volta a misurare l'efficacia di una suite di test iniettando alterazioni sintattiche deliberate nel codice per accertare che i test falliscano tempestivamente.",
    aliases: ["Analisi di Mutazione", "Test di Mutazione"]
  },
  // =========================================================================
  // LETTERA N
  // =========================================================================
  "N-Version Programming": {
    title: "N-Version Programming (NVP)",
    category: "Tolleranza ai Guasti",
    definition: "Tecnica classica di ridondanza software basata sullo sviluppo indipendente di N versioni con voto a maggioranza; il suo fallimento empirico (Knight-Leveson) dimostra l'errore correlato.",
    aliases: ["NVP", "Programmazione a N Versioni"]
  },
  "Near Miss": {
    title: "Near Miss (Quasi-incidente)",
    category: "Fenomenologia Operativa",
    definition: "Condizione critica in cui un incidente grave è stato evitato solo per una contingenza fortuita o per margini minimi, fornendo evidenza empirica della presenza di un difetto latente.",
    aliases: ["Quasi-incidente", "Quasi-incidenti"]
  },
  "Negative Memory": {
    title: "Negative Memory (Memoria Negativa di Assurance)",
    category: "Memoria Organizzativa",
    definition: "La documentazione formale e tracciabile di ciò che non è stato verificato, degli stati UNKNOWN residui e dei compromessi tecnici assunti, impedendo l'erosione della consapevolezza del rischio.",
    aliases: ["Memoria Negativa"]
  },
  "Negative Testing": {
    title: "Negative Testing",
    category: "Testing Dinamico",
    definition: "Verifiche progettate per stimolare il sistema con input non validi, formati corrotti o violazioni di confini, accertando che l'applicazione risponda con rigetto sicuro (fail-safe).",
    aliases: ["Test Negativi"]
  },
  "Network Egress Blackholing": {
    title: "Network Egress Blackholing",
    category: "Sicurezza Architetturale",
    definition: "Pattern di contenimento che impone il default-deny su tutto il traffico di rete uscente dal container o processo, neutralizzando sul nascere esfiltrazioni di dati o download di payload malevoli.",
    aliases: ["Egress Blackholing", "Isolamento Egress"]
  },
  "NO-GO": {
    title: "NO-GO",
    category: "Stati Decisionali",
    definition: "Stato decisionale bloccante categorico che vieta formalmente la transizione del software verso ambienti di deployment a causa di violazioni di sicurezza primarie o superamento dei budget di rischio.",
    aliases: ["Stato NO-GO"]
  },
  "Non-Idempotent Recovery Retry": {
    title: "Non-Idempotent Recovery Retry",
    category: "Anti-Pattern di Resilienza",
    definition: "Meccanismo di ripristino che ritenta mutazioni finanziarie o modifiche di stato senza associare chiavi di idempotenza univoche, provocando duplicazioni di transazioni.",
    aliases: ["Retry Non Idempotente"]
  },
  "NOT APPLICABLE": {
    title: "NOT APPLICABLE",
    category: "Stati Decisionali",
    definition: "Stato formale assegnato a controlli o claim non pertinenti rispetto all'architettura o all'ambiente del componente.",
    aliases: ["Non Applicabile"]
  },
  "NP-Hard Oracle Problem": {
    title: "NP-Hard Oracle Problem",
    category: "Testing & Oracoli",
    definition: "Scenario in cui calcolare l'output esatto per un oracolo è computazionalmente intrattabile, imponendo la verifica di proprietà polinomiali necessarie o oracoli metamorfici di rilassamento.",
    aliases: ["Problema dell'Oracolo NP-Hard"]
  },

  // =========================================================================
  // LETTERA O
  // =========================================================================
  "Objective": {
    title: "Objective (Obiettivo di Sistema)",
    category: "Ingegneria dei Requisiti",
    definition: "Il fine ultimo di business, sicurezza o conformità desiderato nel Mondo reale (W) che giustifica l'esistenza del software; distinto dal requisito, che è il mezzo tecnico per ottenerlo.",
    aliases: ["Obiettivo", "Obiettivo di Sistema"]
  },
  "Observability": {
    title: "Observability (Osservabilità)",
    category: "Ingegneria dei Sistemi & Telemetria",
    definition: "La proprietà che consente di dedurre lo stato interno del software e il rispetto degli invarianti basandosi unicamente sui dati telemetrici emessi verso l'esterno.",
    aliases: ["Osservabilità"]
  },
  "Operational Specification": {
    title: "Operational Specification (Specifica Operativa)",
    category: "Metodologia di Specifica",
    definition: "Formulazione di specifica che descrive una sequenza procedurale di passi o una macchina a stati per calcolare il risultato (il 'come'), esponendosi al rischio di sovra-specificazione.",
    aliases: ["Specifica Operativa"]
  },
  "Oracle": {
    title: "Oracle (Oracolo di Test)",
    category: "Testing & Oracoli",
    definition: "Il principio decisionale o la fonte di verità indipendente che determina se l'output o il comportamento osservato per un dato input sia corretto rispetto alla specifica.",
    aliases: ["Oracolo", "Oracoli", "Test Oracle"]
  },
  "Oracle Correctness": {
    title: "Oracle Correctness (Correttezza dell'Oracolo)",
    category: "Distinzioni Epistemiche",
    definition: "La validità concettuale del criterio di giudizio rispetto alla specifica, distinta dall'assenza di bug nello script di test che implementa tale oracolo.",
    aliases: ["Correttezza dell'Oracolo"]
  },
  "Oracle Dilution": {
    title: "Oracle Dilution (Indebolimento dell'Oracolo)",
    category: "Anti-Pattern di Testing",
    definition: "Pratica scorretta consistente nell'allentare le tolleranze o rimuovere asserzioni da un test per farlo passare a fronte di un difetto del codice, mascherando il fallimento.",
    aliases: ["Indebolimento dell'Oracolo"]
  },
  "Oracle Independence": {
    title: "Oracle Independence (Indipendenza dell'Oracolo)",
    category: "Metodologia di Verifica",
    definition: "La condizione per cui la logica decisionale dell'oracolo non è derivata dal codice o dalle assunzioni dell'LLM che ha generato il componente sotto collaudo.",
    aliases: ["Indipendenza dell'Oracolo"]
  },
  "Orphan Code": {
    title: "Orphan Code (Codice Orfano)",
    category: "Qualità del Codice & Tracciabilità",
    definition: "Linee di codice o moduli presenti nella base di codice privi di qualsiasi legame di tracciabilità verso un requisito o un'invariante approvata, spesso generati per allucinazione statistica.",
    aliases: ["Codice Orfano"]
  },
  "Orphan Risk Item": {
    title: "Orphan Risk Item (Voce di Rischio Orfana)",
    category: "Anti-Pattern di Rischio",
    definition: "Scheda di pericolo presente nel Risk Register priva di collegamenti verso requisiti architetturali, oracoli di verifica o commit di implementazione, impossibile da auditare.",
    aliases: ["Voce di Rischio Orfana"]
  },
  "Over-Scoped Token": {
    title: "The Over-Scoped Token (Il Token Universale)",
    category: "Anti-Pattern di Sicurezza",
    definition: "Concedere un unico token o credenziale di accesso cloud con permessi globali a microservizi che necessitano solo di operazioni minime circoscritte.",
    aliases: ["The Over-Scoped Token", "Token Universale"]
  },
  "Overspecification": {
    title: "Overspecification (Sovra-specificazione)",
    category: "Ingegneria dei Requisiti",
    definition: "Errore consistente nell'incorporare dettagli implementativi, strutture dati interne o pattern privati all'interno della specifica contrattuale di interfaccia.",
    aliases: ["Sovra-specificazione"]
  },
  "Overwriting the Oracle": {
    title: "Overwriting the Oracle",
    category: "Anti-Pattern di Manutenzione",
    definition: "Riscrivere le asserzioni di un test di regressione preesistente per farlo passare a fronte di una modifica difettosa generata da LLM, distruggendo la prova di conformità originaria.",
    aliases: ["Riscrivere l'Oracolo"]
  },
  "OWASP Top 10 for LLM": {
    title: "OWASP Top 10 for LLM",
    category: "Cybersecurity & Standard",
    definition: "Classificazione aperta delle dieci vulnerabilità più critiche specifiche per le applicazioni che integrano modelli linguistici (Prompt Injection, Insecure Output Handling, Excessive Agency).",
    aliases: ["OWASP LLM Top 10"]
  },

  // =========================================================================
  // LETTERA P
  // =========================================================================
  "Package Hallucination": {
    title: "Package Hallucination (Allucinazione di Pacchetto)",
    category: "Supply Chain Security",
    definition: "Fenomeno in cui un LLM genera importazioni riferite a librerie inesistenti nei registri pubblici, esponendo il sistema ad attacchi di slopsquatting.",
    aliases: ["Allucinazione di Pacchetto"]
  },
  "Parse, Don't Validate": {
    title: "Parse, Don't Validate",
    category: "Architettura del Software",
    definition: "Principio architetturale in cui i dati grezzi in ingresso vengono decodificati alla frontiera in tipi chiusi che rendono gli stati invalidi irrappresentabili nel dominio interno.",
    aliases: ["Parse Don't Validate"]
  },
  "PARTIAL": {
    title: "PARTIAL",
    category: "Stati Decisionali",
    definition: "Stato decisionale in cui una proprietà è parzialmente dimostrata ma permangono incertezze non critiche, ammissibile solo in presenza di barriere di confinamento operativo.",
    aliases: ["Stato PARTIAL"]
  },
  "PASS": {
    title: "PASS",
    category: "Stati Decisionali",
    definition: "Stato decisionale in cui una proprietà critica risulta pienamente verificata a fronte di evidenze valide, fresche e con oracoli indipendenti, rispettando il principio di non-compensazione.",
    aliases: ["Stato PASS"]
  },
  "Patch-and-Pray": {
    title: "Patch-and-Pray (Toppa alla Cieca)",
    category: "Anti-Pattern di Diagnosi",
    definition: "Pratica controproducente consistente nell'incollare gli stacktrace di errore nell'LLM per applicare toppe sintattiche veloci finché i test non smettono di fallire, senza isolare la causa sistemica.",
    aliases: ["Toppa alla Cieca"]
  },
  "Periodic Review": {
    title: "Periodic Review (Revisione Periodica)",
    category: "Governance & Ciclo di Vita",
    definition: "Processo di riesame retrospettivo e sistematico volto a verificare se l'impianto di assurance rimanga adeguato al contesto operativo a fronte dell'evoluzione di minacce, normative e modelli.",
    aliases: ["Revisione Periodica"]
  },
  "Periodo di Validità Epistemica": {
    title: "Periodo di Validità Epistemica (Epistemic Validity Horizon)",
    category: "Gestione delle Assunzioni",
    definition: "Finestra temporale prefissata oltre la quale un'assunzione empirica deve essere ricalibrata o monitorata a fronte del rischio di deriva temporale del contesto operativo.",
    aliases: ["Epistemic Validity Horizon"]
  },
  "Phantom Assumption": {
    title: "Phantom Assumption (Assunzione Fantasma)",
    category: "Tracciabilità & Assunzioni",
    definition: "Premessa operativa o vincolo enunciato astrattamente nei documenti ma privo di collegamenti operativi verso proprietà critiche o oracoli di verifica.",
    aliases: ["Assunzione Fantasma"]
  },
  "Phantom Flag": {
    title: "Phantom Flag",
    category: "Anti-Pattern di Rilascio",
    definition: "Feature Flag che disattiva la diramazione logica principale ma non impedisce l'esecuzione di effetti collaterali persistenti avvenuti all'avvio del modulo (es. lock a database).",
    aliases: ["Flag Fantasma"]
  },
  "Plausibilità": {
    title: "Plausibilità (Linguistica)",
    category: "Fondamenti Epistemici",
    definition: "La proprietà di un testo o codice di apparire coerente, elegante, ben strutturato e privo di errori sintattici; non costituisce in alcun modo garanzia di correttezza semantica.",
    aliases: ["Plausibilità Linguistica", "Plausibility"]
  },
  "Plausibility Trap": {
    title: "Plausibility Trap (Trappola della Plausibilità)",
    category: "Fattori Umani & Revisione",
    definition: "L'inganno cognitivo per cui la scorrevolezza sintattica, l'eleganza tipografica e la spiegazione persuasiva fornite da un LLM inducono il revisore ad abbassare la vigilanza critica sui difetti.",
    aliases: ["Trappola della Plausibilità", "Fluency Bias"]
  },
  "Pointwise Generalization": {
    title: "Pointwise Generalization",
    category: "Anti-Pattern Epistemico",
    definition: "Scambiare il superamento di test su un singolo intervallo discreto di dati per una dimostrazione di validità della proprietà su tutto lo spazio di stato del sistema.",
    aliases: ["Generalizzazione Puntuale"]
  },
  "Poison Fallback": {
    title: "Poison Fallback (Fallback Velenoso)",
    category: "Anti-Pattern di Resilienza",
    definition: "Ramo di emergenza che, pur di non sollevare errori all'utente, restituisce dati inventati, inconsistenti o approvazioni fittizie, introducendo corruzione semantica nel dominio.",
    aliases: ["Fallback Velenoso"]
  },
  "Post-Deployment Analysis": {
    title: "Post-Deployment Analysis",
    category: "Ingegneria Operativa",
    definition: "Processo analitico che acquisisce ed esamina le evidenze empiriche derivanti dall'esercizio reale in produzione (incidenti, degradi, near miss) per aggiornare la catena di assurance.",
    aliases: ["Analisi Post-Deployment"]
  },
  "Post-Deployment Evidence": {
    title: "Post-Deployment Evidence (Evidenza Post-Deployment)",
    category: "Evidenze & Telemetria",
    definition: "L'insieme dei dati forensi, tracce e parametri telemetrici raccolti durante l'esercizio reale, verificati e tracciati rispetto alle proprietà critiche.",
    aliases: ["Evidenza Post-Deployment"]
  },
  "Post-Hoc Metric Invention": {
    title: "Post-Hoc Metric Invention",
    category: "Anti-Pattern Telemetrico",
    definition: "Tentativo disperato di ricostruire il comportamento del software analizzando log disorganizzati solo dopo il disservizio, anziché aver progettato a priori sonde semantiche su invarianti.",
    aliases: ["Invenzione di Metriche a Posteriori"]
  },
  "Post-Hoc Traceability Fabrication": {
    title: "Post-Hoc Traceability Fabrication (Tracciabilità Retroattiva)",
    category: "Anti-Pattern di Tracciabilità",
    definition: "Generare requisiti o legami di tracciabilità a posteriori per giustificare formalmente codice generato da LLM già scritto, producendo conformità burocratica fittizia.",
    aliases: ["Tracciabilità Retroattiva"]
  },
  "Post-Mortem as Bureaucracy": {
    title: "Post-Mortem as Bureaucracy",
    category: "Anti-Pattern di Governance",
    definition: "Redigere relazioni post-incidente formali e prolisse che non producono azioni correttive verificabili né aggiornano i vincoli delle pipeline pre-deployment.",
    aliases: ["Post-Mortem Burocratico"]
  },
  "Postcondizione": {
    title: "Postcondizione (Postcondition / Post)",
    category: "Design by Contract",
    definition: "Proprietà logica sullo stato finale e sulle uscite che la macchina garantisce essere vera al termine dell'operazione, a condizione che la precondizione fosse soddisfatta all'inizio.",
    aliases: ["Postcondition", "Post"]
  },
  "Postura Epistemica di Base": {
    title: "Postura Epistemica di Base",
    category: "Fondamenti Epistemici",
    definition: "Attitudine metodologica dell'assurance: rifiuto del principio di autorità, gestione formale dell'ignoranza (UNKNOWN) e rispetto del principio di falsificabilità di Popper.",
    aliases: ["Postura Epistemica"]
  },
  "Precondizione": {
    title: "Precondizione (Precondition / Pre)",
    category: "Design by Contract",
    definition: "Predicato logico sullo stato e sugli ingressi che l'ambiente chiamante deve garantire come vero prima di invocare il componente; se violata, la macchina non offre garanzie.",
    aliases: ["Precondition", "Pre"]
  },
  "Premature Pattern Inflation": {
    title: "Premature Pattern Inflation",
    category: "Anti-Pattern Architetturale",
    definition: "Sovraingegnerizzazione da pattern proposta dall'LLM per apparire autorevole (es. CQRS/Event Sourcing per task banali), introducendo livelli di astrazione non verificabili.",
    aliases: ["Inflazione Prematura di Pattern"]
  },
  "Principio dei Sei Filtri di Validazione": {
    title: "Principio dei Sei Filtri di Validazione",
    category: "Ingegneria dei Requisiti",
    definition: "Protocollo sequenziale dello Step 9 per convalidare una specifica: soddisfacibilità logica, realizzabilità/causalità, assenza di verità vacua, completezza degli errori, falsificabilità, ancoraggio al dominio.",
    aliases: ["Sei Filtri di Validazione"]
  },
  "Principio del Reassessment Continuo": {
    title: "Principio del Reassessment Continuo (delle Assunzioni)",
    category: "Gestione delle Assunzioni",
    definition: "Regola di assurance secondo cui ogni mutamento di contesto operativo altera la base probatoria e impone la rivalutazione dell'Assurance Level e dei decision gate.",
    aliases: ["Reassessment Continuo"]
  },
  "Principio delle Sonde di Invariante": {
    title: "Principio delle Sonde di Invariante",
    category: "Osservabilità Semantica",
    definition: "Regola metodologica dello Step 26: un'invariante critica contribuisce all'assurance operativa solo nella misura in cui il suo comportamento a runtime è osservabile tramite sonde affidabili.",
    aliases: ["Principio delle Sonde"]
  },
  "Principio di Conservazione della Responsabilità Decisionale": {
    title: "Principio di Conservazione della Responsabilità Decisionale",
    category: "Governance & Responsabilità",
    definition: "Regola assiomatica del manuale: l'introduzione di sistemi automatici o LLM non elimina la necessità di individuare soggetti umani dotati di autorità e competenza per assumere decisioni.",
    aliases: ["Conservazione della Responsabilità"]
  },
  "Principio di Non-Compensazione dei Criteri Obbligatori": {
    title: "Principio di Non-Compensazione dei Criteri Obbligatori",
    category: "Modello Decisionale",
    definition: "Regola di gate per cui l'assurance non è una media sommabile: cento verifiche perfette su funzioni secondarie non compensano l'incertezza (UNKNOWN) o il fallimento (FAIL) su un'invariante critica.",
    aliases: ["Non-Compensazione"]
  },
  "Principio di Non-Delega della Responsabilità Decisionale": {
    title: "Principio di Non-Delega della Responsabilità Decisionale",
    category: "Governance & Decisione",
    definition: "Divieto etico e metodologico vincolante: nessun modello linguistico, algoritmo o pipeline può essere investito dell'autorità di approvazione formale sul rilascio del software.",
    aliases: ["Non-Delega della Responsabilità"]
  },
  "Principio di Non-Diluizione del Rischio": {
    title: "Principio di Non-Diluizione del Rischio",
    category: "Modello di Rischio",
    definition: "Regola vincolante che vieta medie ponderate tra probabilità e gravità: se un pericolo comporta conseguenze catastrofiche e irreversibili, il sistema deve essere classificato AL-3.",
    aliases: ["Non-Diluizione del Rischio"]
  },
  "Principio di Non-Inquinamento Implementativo": {
    title: "Principio di Non-Inquinamento Implementativo",
    category: "Ingegneria dei Requisiti",
    definition: "Regola di specifica che impone di trattare la macchina come una scatola nera all'interfaccia, escludendo strutture dati interne o dettagli algoritmici dal contratto.",
    aliases: ["Non-Inquinamento Implementativo"]
  },
  "Principio di Proporzionalità": {
    title: "Principio di Proporzionalità (dell'Assurance)",
    category: "Modello di Rischio",
    definition: "Regola di allocazione razionale del rigore: la quantità, qualità e indipendenza delle prove richieste deve crescere proporzionalmente al profilo di rischio e al blast radius.",
    aliases: ["Proporzionalità dell'Assurance"]
  },
  "Principio di Sopravvivenza del Sistema": {
    title: "Principio di Sopravvivenza del Sistema",
    category: "Resilienza Architetturale",
    definition: "Scelta architetturale esplicita che subordina la disponibilità del servizio alla preservazione dello stato e dell'integrità dei dati (Fail-Closed).",
    aliases: ["Sopravvivenza del Sistema"]
  },
  "Priors Statistici del Modello": {
    title: "Priors Statistici del Modello",
    category: "Allineamento AI & Bias",
    definition: "Pattern, convenzioni e assunzioni statisticamente dominanti nel corpus di addestramento dell'LLM (es. float IEEE 754, connessione HTTP affidabile) iniettate tacitamente in assenza di vincoli nel prompt.",
    aliases: ["Priors del Modello"]
  },
  "Probe Effect": {
    title: "Probe Effect (Effetto Sonda)",
    category: "Osservabilità & Concorrenza",
    definition: "L'alterazione delle proprietà temporali, di memoria o di contesa introdotta nel software dall'atto stesso di misurarlo ed emettere telemetria (Heisenbug).",
    aliases: ["Effetto Sonda"]
  },
  "Problem Space vs Solution Space": {
    title: "Problem Space vs Solution Space (Spazio del Problema vs della Soluzione)",
    category: "Distinzioni Epistemiche",
    definition: "Lo spazio del problema descrive la discrepanza del Mondo reale (W) e i vincoli di dominio; lo spazio della soluzione definisce le strutture della macchina (M) ideate per risolverlo.",
    aliases: ["Spazio del Problema vs Spazio della Soluzione"]
  },
  "Procedural Independence": {
    title: "Procedural Independence (Indipendenza Procedurale)",
    category: "Metodologia di Verifica",
    definition: "Dimensione dell'indipendenza in cui le procedure operative, i piani di prova e i flussi di lavoro di verifica sono formalmente disgiunti da quelli di sviluppo.",
    aliases: ["Indipendenza Procedurale"]
  },
  "Prompt CIA Amnesia": {
    title: "Prompt CIA Amnesia",
    category: "Anti-Pattern di Modifica",
    definition: "Trattare la modifica di un prompt come una variazione cosmetica a impatto zero, ignorando che altera la distribuzione statistica dell'output e può rompere i contratti a valle.",
    aliases: ["Amnesia da Modifica Prompt"]
  },
  "Prompt Engineering as Security": {
    title: "Prompt Engineering as Security",
    category: "Anti-Pattern di Cybersecurity",
    definition: "Considerare le istruzioni fornite nel system prompt ('Non rivelare dati') come una barriera di sicurezza primaria anziché come un controllo parziale non robusto.",
    aliases: ["Prompt come Sicurezza"]
  },
  "Prompt Mirroring": {
    title: "Prompt Mirroring",
    category: "Anti-Pattern di Verifica",
    definition: "Condurre la verifica adottando i medesimi prompt, contesti e formulazioni impiegati dal team di sviluppo, duplicando specularmente i medesimi punti ciechi.",
    aliases: ["Specchiatura del Prompt"]
  },
  "Prompt-Generated Register": {
    title: "Prompt-Generated Register",
    category: "Anti-Pattern di Rischio",
    definition: "Chiedere a un LLM di compilare l'intero catalogo dei rischi senza alcuna verifica empirica sul campo o riscontro sulle reali assunzioni di dominio.",
    aliases: ["Registro Generato da Prompt"]
  },
  "Prompt-Only Debugging": {
    title: "Prompt-Only Debugging",
    category: "Anti-Pattern Diagnostico",
    definition: "Incollare stack trace complessi direttamente in chat LLM senza contesto infrastrutturale o metriche di memoria, accettando toppe sintattiche che mascherano il guasto.",
    aliases: ["Debug da Sola Chat"]
  },
  "Proof": {
    title: "Proof (Dimostrazione Matematica / Prova Formale)",
    category: "Distinzioni Epistemiche",
    definition: "Deduzione assiomatica rigorosa che stabilisce universalmente che una data proprietà vale per ogni stato possibile del modello matematico; distinta dall'evidenza empirica finita.",
    aliases: ["Dimostrazione Matematica", "Prova Formale"]
  },
  "Property": {
    title: "Property (Proprietà)",
    category: "Logica Formale",
    definition: "Predicato logico formale valutabile su stati o tracce di esecuzione del sistema, derivato dai requisiti per renderli falsificabili ed eseguibili da oracoli.",
    aliases: ["Proprietà"]
  },
  "Property Coverage": {
    title: "Property Coverage (Copertura delle Proprietà)",
    category: "Metriche di Verifica",
    definition: "La misura di quante proprietà critiche, invarianti di sicurezza e scenari di rischio sono coperti da evidenze indipendenti, distinta dalla mera esecuzione delle righe di codice.",
    aliases: ["Copertura delle Proprietà"]
  },
  "Property-Based Testing": {
    title: "Property-Based Testing (PBT)",
    category: "Testing Dinamico",
    definition: "Metodologia di prova in cui i test verificano la tenuta di invarianti universali su ampie distribuzioni di dati sintetizzati proceduralmente, supportata da algoritmi di shrinking.",
    aliases: ["PBT", "Test Basato su Proprietà"]
  },
  "Provenance": {
    title: "Provenance (Provenienza)",
    category: "Supply Chain & Governance",
    definition: "L'attestazione tracciabile e verificabile crittograficamente dell'origine, dei commit, dei modelli linguistici, dei prompt e dei metadati che hanno generato ciascun artefatto software.",
    aliases: ["Provenienza"]
  },

  // =========================================================================
  // LETTERA Q
  // =========================================================================
  "Quadripartizione dell'Indipendenza di Audit": {
    title: "Quadripartizione dell'Indipendenza di Audit",
    category: "Governance & Audit",
    definition: "Modello dello Step 32 che estende la separazione dell'audit su quattro dimensioni ortogonali: Organizzativa, Procedurale, Tecnica ed Epistemica.",
    aliases: ["Quattro Dimensioni di Audit"]
  },

  // =========================================================================
  // LETTERA R
  // =========================================================================
  "RCA": {
    title: "RCA (Root Cause Analysis - Analisi della Causa Radice)",
    category: "Diagnosi & Incidenti",
    definition: "Processo strutturato volto a identificare i fattori sistemici la cui rimozione impedisce stabilmente il ripetersi di un'anomalia, superando il mito della causa singola.",
    aliases: ["Root Cause Analysis", "Analisi della Causa Radice"]
  },
  "Re-baselining": {
    title: "Re-baselining (Ricalibrazione della Linea Base)",
    category: "Governance & Manutenzione",
    definition: "L'atto formale di ridefinire e convalidare lo stato di riferimento accettato per configurazioni, metriche, prompt e assunzioni operative, dichiarando superata la linea precedente.",
    aliases: ["Ricalibrazione della Linea Base"]
  },
  "Reboot and Forget": {
    title: "Reboot and Forget",
    category: "Anti-Pattern Operativo",
    definition: "Riavviare immediatamente container o processi al primo allarme per ripristinare il servizio, distruggendo l'evidenza volatile di memoria necessaria alla diagnosi causale.",
    aliases: ["Riavvia e Dimentica"]
  },
  "RECOMMENDATION": {
    title: "RECOMMENDATION (Raccomandazione)",
    category: "Tassonomia Epistemica",
    definition: "Linea guida o buona pratica suggerita che indica un modo preferibile di procedere ma che non costituisce un obbligo formale o vincolo assoluto a meno di specifica esplicita.",
    aliases: ["Raccomandazione"]
  },
  "Red Teaming": {
    title: "Red Teaming",
    category: "Cybersecurity & Verifica",
    definition: "Attività empirica orientata all'obiettivo condotta assumendo la prospettiva dell'avversario per verificare la tenuta dei trust boundaries e dei controlli architetturali.",
    aliases: ["Red Team"]
  },
  "ReDoS": {
    title: "ReDoS (Regular Expression Denial of Service / CWE-1333)",
    category: "Cybersecurity & Algoritmi",
    definition: "Vulnerabilità algoritmica provocata da espressioni regolari con backtracking catastrofico esponenziale (es. (a+)+$) che saturano la CPU a fronte di stringhe avversariali.",
    aliases: ["Regular Expression Denial of Service", "CWE-1333"]
  },
  "Reference Implementation Oracle": {
    title: "Reference Implementation Oracle (Oracolo di Riferimento)",
    category: "Testing & Oracoli",
    definition: "Oracolo che confronta l'output del nuovo codice con quello prodotto da un'implementazione di riferimento preesistente, fidata e non ottimizzata (es. algoritmo O(N^2)).",
    aliases: ["Oracolo di Riferimento"]
  },
  "Regression Test Selection": {
    title: "Regression Test Selection (RTS)",
    category: "Metodologia di Testing",
    definition: "Tecnica analitica volta a identificare il sottoinsieme minimo e sufficiente di casi di prova da rieseguire a fronte di una modifica, basandosi sull'analisi delle dipendenze del codice.",
    aliases: ["RTS", "Selezione dei Test di Regressione"]
  },
  "Regression Testing": {
    title: "Regression Testing (Test di Regressione)",
    category: "Testing Dinamico",
    definition: "Riesecuzione sistematica di verifiche a seguito di modifiche al software o all'ambiente per accertare che i comportamenti preesistenti non siano stati degradati o corrotti.",
    aliases: ["Test di Regressione"]
  },
  "Regressive Fix": {
    title: "Regressive Fix (Riparazione Regressiva)",
    category: "Qualità del Software",
    definition: "Modifica introdotta per sanare un difetto locale che provoca, direttamente o indirettamente, la violazione di proprietà precedentemente verificate e funzionanti.",
    aliases: ["Riparazione Regressiva", "Toppa Regressiva"]
  },
  "Report Compiacente": {
    title: "Report Compiacente",
    category: "Anti-Pattern di Governance",
    definition: "Documento tecnico generato tramite LLM che adotta una struttura formale rassicurante confermando le tesi dell'autore per sycophancy, privo di prove empiriche.",
    aliases: ["Sycophantic Report"]
  },
  "Required Assurance": {
    title: "Required Assurance (Assurance Richiesta)",
    category: "Modello Decisionale",
    definition: "Il livello normativo di giustificazione probatoria imposto a priori dal profilo di rischio della proprietà (A_req), non negoziabile a ribasso per ragioni di costo.",
    aliases: ["Assurance Richiesta", "A_req"]
  },
  "Requirement": {
    title: "Requirement (Requisito)",
    category: "Ingegneria dei Requisiti",
    definition: "Prescrizione specifica sul comportamento atteso alla frontiera della macchina per soddisfare l'obiettivo nel mondo reale (R nel modello W AND S |= R).",
    aliases: ["Requisito", "Requisiti"]
  },
  "Residual Risk": {
    title: "Residual Risk (Rischio Residuo)",
    category: "Gestione del Rischio",
    definition: "La quota di rischio che permane nel sistema dopo l'applicazione verificata di tutti i controlli tecnici, la cui accettazione richiede delibera formale dell'autorità.",
    aliases: ["Rischio Residuo"]
  },
  "Residual Uncertainty": {
    title: "Residual Uncertainty (Incertezza Residua)",
    category: "Fondamenti Epistemici",
    definition: "La quota non azzerabile di indeterminatezza che permane nel software derivante dalla non-stazionarietà del mondo reale e dalla natura probabilistica dei modelli linguistici.",
    aliases: ["Incertezza Residua"]
  },
  "Resource-driven Downgrading": {
    title: "Resource-driven Downgrading (Declassamento per Economia)",
    category: "Anti-Pattern Decisionale",
    definition: "Ridurre il livello di assurance (AL) di un componente perché il team non dispone del tempo o delle competenze per produrre l'evidenza richiesta dal rischio reale.",
    aliases: ["Declassamento per Economia"]
  },
  "Retaliatory Governance": {
    title: "Retaliatory Governance (Pressione Anti-Segnalazione)",
    category: "Anti-Pattern Organizzativo",
    definition: "Struttura aziendale disfunzionale in cui l'ingegnere che impone un blocco formale di NO-GO subisce penalizzazioni per rallentamento della roadmap di rilascio.",
    aliases: ["Pressione Anti-Segnalazione"]
  },
  "Reversibility": {
    title: "Reversibility (Reversibilità)",
    category: "Modello di Rischio",
    definition: "Capacità del sistema di ripristinare integralmente lo stato nominale precedente a un'operazione errata senza perdite permanenti (Fully Reversible, Compensable, Irreversible).",
    aliases: ["Reversibilità"]
  },
  "Review Dossier": {
    title: "Review Dossier (Fascicolo di Revisione)",
    category: "Artefatto di Revisione",
    definition: "Insieme documentale strutturato (specifica, codice, verdetto del gate dello Step 23, registro discrepanze, assunzioni) fornito al revisore umano prima dell'approvazione.",
    aliases: ["Fascicolo di Revisione"]
  },
  "Ripple Effect": {
    title: "Ripple Effect (Effetto a Catena)",
    category: "Gestione delle Modifiche",
    definition: "Il fenomeno per cui una modifica applicata a un singolo modulo richiede mutazioni secondarie a cascata in componenti correlati lungo il grafo di dipendenza.",
    aliases: ["Effetto a Catena"]
  },
  "Risk": {
    title: "Risk (Rischio)",
    category: "Modello di Rischio",
    definition: "La formalizzazione multidimensionale dell'esposizione al danno, che combina severità, incertezza o verosimiglianza, rilevabilità, raggio d'impatto e reversibilità.",
    aliases: ["Rischio", "Rischi"]
  },
  "Risk Acceptance": {
    title: "Risk Acceptance (Accettazione del Rischio)",
    category: "Governance & Decisione",
    definition: "Decisione formale ed esplicita con cui l'autorità designata delibera che il rischio residuo è conforme alla tolleranza del sistema, assumendosene la responsabilità.",
    aliases: ["Accettazione del Rischio"]
  },
  "Risk Classification": {
    title: "Risk Classification (Classificazione del Rischio)",
    category: "Modello di Rischio",
    definition: "Il processo analitico (Step 2) che assegna a ciascun pericolo una classe di rigore probatorio (Assurance Level), evitando la trappola dell'assurance piatta.",
    aliases: ["Classificazione del Rischio"]
  },
  "Risk Downgrading": {
    title: "Risk Downgrading",
    category: "Anti-Pattern di Rischio",
    definition: "Classificazione arbitraria del rischio a un livello inferiore rispetto a quello imposto dalle conseguenze reali e dall'esposizione del sistema.",
    aliases: ["Declassamento del Rischio"]
  },
  "Risk Item": {
    title: "Risk Item",
    category: "Struttura Dati",
    definition: "Elemento formale strutturato (YAML) del Risk Register che correla pericolo, scenario di guasto, invarianti violate, assunzioni sottostanti, controlli ed evidenze.",
    aliases: ["Scheda di Rischio"]
  },
  "Risk Reduction": {
    title: "Risk Reduction (Riduzione del Rischio)",
    category: "Distinzioni Epistemiche",
    definition: "L'introduzione di misure tecniche volte a diminuire la probabilità o la severità di un pericolo; lascia costantemente attivo un rischio residuo (R_res > 0).",
    aliases: ["Riduzione del Rischio", "Mitigazione del Rischio"]
  },
  "Risk Register": {
    title: "Risk Register (Registro dei Rischi)",
    category: "Governance & Rischio",
    definition: "Dispositivo dinamico di governance che cataloga i pericoli attivi, monitora l'efficacia verificata dei controlli e traccia l'accettazione formale del rischio residuo.",
    aliases: ["Registro dei Rischi"]
  },
  "Risk Smuggling": {
    title: "Risk Smuggling",
    category: "Anti-Pattern di Rischio",
    definition: "Trasferimento implicito di una quota di rischio fuori dal perimetro di analisi o verso componenti terzi senza averlo realmente eliminato o controllato.",
    aliases: ["Contrabbando del Rischio"]
  },
  "Rollback": {
    title: "Rollback",
    category: "Resilienza Operativa",
    definition: "Procedura controllata con cui si disattiva la versione corrente del software e si riattiva la versione precedente, gestendo la compatibilità con lo stato persistito nel frattempo.",
    aliases: ["Annullamento Controllato"]
  },
  "Rollbackability": {
    title: "Rollbackability (Capacità di Rollback)",
    category: "Proprietà Architetturale",
    definition: "La capacità tecnica di ridistribuire una versione precedente del software; distinta dalla reversibilità, che riguarda invece gli effetti complessivi sui dati e sul mondo esterno.",
    aliases: ["Capacità di Rollback"]
  },
  "Root Assurance Hash": {
    title: "Root Assurance Hash",
    category: "Integrità & Crittografia",
    definition: "Il digest crittografico radice calcolato concatenando i digest SHA-256 dei 15 componenti canonici dell'Assurance Closure Package, sigillando il fascicolo.",
    aliases: ["Radice di Integrità"]
  },
  "Round-Trip": {
    title: "Round-Trip (Invertibilità)",
    category: "Proprietà Relazionali",
    definition: "Proprietà algebrica per cui la codifica di un dato seguita dalla sua decodifica inversa ricostruisce esattamente l'oggetto originale bit a bit: decode(encode(x)) == x.",
    aliases: ["Invertibilità", "Round-Trip Property"]
  },
  "Rubber-Stamping": {
    title: "Rubber-Stamping",
    category: "Anti-Pattern di Governance",
    definition: "L'atto di approvare formalmente un artefatto o rilascio senza aver svolto un'effettiva ispezione analitica, indotto da fretta, affaticamento cognitivo o acritica fiducia nella pipeline verde.",
    aliases: ["Approvazione Cieca", "Timbro a Vuoto"]
  },
  "Runbook": {
    title: "Runbook (Playbook)",
    category: "Ingegneria Operativa",
    definition: "Documento operativo strutturato a sette dimensioni (trigger, precondizioni, permessi, triage in sola lettura, mitigazione, stop/escalation, chiusura) per guidare la risposta a un allarme.",
    aliases: ["Playbook", "Procedura Operativa"]
  },
  "Runbook Rot": {
    title: "Runbook Rot (Deterioramento Progressivo del Runbook)",
    category: "Ingegneria Operativa",
    definition: "La divergenza progressiva tra i comandi documentati nella procedura operativa e la configurazione reale dell'infrastruttura, causata da modifiche non riallineate.",
    aliases: ["Deterioramento del Runbook"]
  },
  "Runtime Invariant Probes": {
    title: "Runtime Invariant Probes (Sonde di Invariante a Runtime)",
    category: "Osservabilità Semantica",
    definition: "Sonde esogene e disaccoppiate che intercettano input e output a runtime valutando la tenuta degli invarianti critici di business ed emettendo telemetria ad alta cardinalità.",
    aliases: ["Sonde di Invariante", "Sonde di Invariante a Runtime"]
  },

  // =========================================================================
  // LETTERA S
  // =========================================================================
  "Safe Decommissioning": {
    title: "Safe Decommissioning (Dismissione Controllata)",
    category: "Ciclo di Vita & Sicurezza",
    definition: "Processo di ritiro ordinato del software dall'esercizio con revoca di chiavi API, sanificazione delle memorie volatili e archiviazione del fascicolo probatorio.",
    aliases: ["Dismissione Controllata"]
  },
  "Safety Property": {
    title: "Safety Property (Proprietà di Sicurezza / Safety)",
    category: "Logica Formale",
    definition: "Prescrizione logica che proibisce il raggiungimento di stati non validi ('nulla di male accade'); una sua violazione è osservabile in una traccia finita.",
    aliases: ["Proprietà di Safety", "Safety"]
  },
  "Sandbox": {
    title: "Sandbox",
    category: "Sicurezza Architetturale",
    definition: "Ambiente di esecuzione isolato a livello di sistema operativo o hypervisor (container, seccomp, network isolation) che confina il codice non fidato a minima autorità.",
    aliases: ["Ambiente di Confino"]
  },
  "Sanitizer / Neutralizer": {
    title: "Sanitizer / Neutralizer (Sanitizzatore)",
    category: "Taint Analysis & Sicurezza",
    definition: "Funzione o barriera architetturale che neutralizza la contaminazione del dato non fidato prima che raggiunga un Sink critico (es. binding parametrizzato).",
    aliases: ["Sanitizer", "Neutralizer", "Sanitizzatore"]
  },
  "SAST": {
    title: "SAST (Static Application Security Testing)",
    category: "Analisi di Sicurezza",
    definition: "Metodologia di analisi statica che modella il flusso di controllo e dei dati (Taint Analysis) per intercettare percorsi non sanitizzati tra sorgenti non fidate (Source) e operazioni critiche (Sink).",
    aliases: ["Static Application Security Testing"]
  },
  "SBOM": {
    title: "SBOM (Software Bill of Materials)",
    category: "Supply Chain Security",
    definition: "Inventario strutturato e formalizzato (CycloneDX/SPDX) che elenca componenti, metadati, relazioni di dipendenza e firme crittografiche del software integrato.",
    aliases: ["Software Bill of Materials", "Distinta Base del Software"]
  },
  "SCA": {
    title: "SCA (Software Composition Analysis)",
    category: "Supply Chain Security",
    definition: "Disciplina che esamina le dipendenze di terze parti per identificare componenti vulnerabili a CVE note, pacchetti allucinati o licenze incompatibili.",
    aliases: ["Software Composition Analysis"]
  },
  "Scoped Prompting": {
    title: "Scoped Prompting (Protocollo di Scoped Prompting)",
    category: "Metodologia di Sviluppo",
    definition: "Protocollo di condizionamento dell'LLM che vieta esplicitamente l'introduzione di dipendenze non autorizzate, impone tipi statici e vincola il modello al solo corpo del metodo.",
    aliases: ["Protocollo di Scoped Prompting"]
  },
  "Second Opinion": {
    title: "Second Opinion",
    category: "Distinzioni Epistemiche",
    definition: "Parere consultivo fornito da un secondo valutatore appartenente al medesimo paradigma; non costituisce evidenza indipendente né elimina la correlazione degli errori.",
    aliases: ["Seconda Opinione"]
  },
  "Secret Scanning": {
    title: "Secret Scanning",
    category: "Cybersecurity",
    definition: "Scansione statica dei sorgenti, delle configurazioni e dell'intera cronologia Git volta a intercettare credenziali, chiavi private o token esposti tramite regex ed entropia di Shannon.",
    aliases: ["Scansione dei Segreti"]
  },
  "Self-Approval Bias": {
    title: "Self-Approval Bias (Conflitto di Interessi nell'Assurance)",
    category: "Anti-Pattern di Governance",
    definition: "Coincidenza tra l'autore del codice (o del prompt) e il soggetto incaricato di emettere l'approvazione formale, che distrugge la funzione di controllo critico.",
    aliases: ["Pregiudizio di Auto-Approvazione"]
  },
  "Self-Masking Instrumentation": {
    title: "Self-Masking Instrumentation",
    category: "Anti-Pattern Telemetrico",
    definition: "Consentire al codice generato da LLM di definire e gestire la propria telemetria, permettendo alla logica difettosa di mascherare i propri fallimenti con log conformi.",
    aliases: ["Strumentazione Auto-Occultante"]
  },
  "Semantic Drift": {
    title: "Semantic Drift (Deriva Semantica)",
    category: "Qualità del Software",
    definition: "La graduale e inavvertita alterazione del comportamento logico del software causata da modifiche successive che violano le assunzioni originarie senza generare errori sintattici.",
    aliases: ["Deriva Semantica"]
  },
  "Semantic Smoothing": {
    title: "Semantic Smoothing",
    category: "Allineamento AI & Bias",
    definition: "Tendenza degli LLM ad appianare contraddizioni e lacune del prompt producendo un testo formalmente ineccepibile che occulta le falle logiche originarie.",
    aliases: ["Levigatura Semantica"]
  },
  "Separazione Fisica": {
    title: "Separazione Fisica",
    category: "Tassonomia dell'Indipendenza",
    definition: "Dislocazione del codice, dei test e della documentazione in file, repository o macchine virtuali separate; non garantisce di per sé alcuna indipendenza logica o epistemica.",
    aliases: ["Physical Separation"]
  },
  "Separazione Metodologica": {
    title: "Separazione Metodologica",
    category: "Tassonomia dell'Indipendenza",
    definition: "Adozione di paradigmi di verifica e linguaggi radicalmente differenti rispetto a quelli di sviluppo (es. specifica formale dichiarativa vs codice procedurale generato).",
    aliases: ["Methodological Separation"]
  },
  "Separazione Procedurale": {
    title: "Separazione Procedurale",
    category: "Tassonomia dell'Indipendenza",
    definition: "Coinvolgimento di team differenti o prompt rigorosamente separati per la generazione e per la verifica del componente software.",
    aliases: ["Procedural Separation"]
  },
  "Severity": {
    title: "Severity (Gravità del Danno)",
    category: "Modello di Rischio",
    definition: "Magnitudo dell'impatto qualitativo e quantitativo del peggior danno credibile nel Mondo reale conseguente alla violazione di una proprietà critica (Minor, Moderate, Major, Critical, Catastrophic).",
    aliases: ["Gravità del Danno", "Gravità"]
  },
  "Shannon Entropy": {
    title: "Shannon Entropy (Entropia di Shannon)",
    category: "Teoria dell'Informazione",
    definition: "Misura statistica del grado di casualità e imprevedibilità di una stringa; utilizzata nel Secret Scanning per distinguere token casuali da testo naturale.",
    aliases: ["Entropia di Shannon"]
  },
  "Shared Phenomena": {
    title: "Shared Phenomena (Fenomeni Condivisi)",
    category: "Ingegneria dei Requisiti",
    definition: "L'insieme di eventi, stati, segnali e registri osservabili e manipolabili sia dal Mondo esterno sia dalla Macchina alla frontiera di interfaccia condivisa.",
    aliases: ["Fenomeni Condivisi", "Interfaccia"]
  },
  "Shrinking": {
    title: "Shrinking (Riduzione Algoritmica del Controesempio)",
    category: "Property-Based Testing",
    definition: "Procedura euristica con cui un framework PBT riduce iterativamente la complessità di un input che ha provocato un fallimento, isolando il controesempio minimo riproducibile.",
    aliases: ["Riduzione del Controesempio"]
  },
  "Sign-Off": {
    title: "Sign-Off (Assenso Formale / Firma di Conformità)",
    category: "Governance & Responsabilità",
    definition: "L'atto documentato con cui un'autorità competente attesta che una proprietà, una fase o un insieme di evidenze soddisfa i criteri stabiliti dalla policy.",
    aliases: ["Assenso Formale", "Firma di Conformità"]
  },
  "Silent Assumption": {
    title: "Silent Assumption (Assunzione Silente)",
    category: "Tassonomia Epistemica",
    definition: "Premessa operativa non formalizzata nei requisiti né dichiarata nel codice, ma necessaria affinché l'implementazione non produca fallimenti in produzione.",
    aliases: ["Assunzione Silente"]
  },
  "Silent Canary": {
    title: "Silent Canary",
    category: "Anti-Pattern di Rilascio",
    definition: "Rollout progressivo fittizio in cui la quota di traffico instradata sul Canary non sollecita i percorsi logici critici (es. solo ping o health check), inducendo falsa sicurezza.",
    aliases: ["Canary Silente"]
  },
  "Silent Coercion": {
    title: "Silent Coercion (Troncamento Silenzioso)",
    category: "Anti-Pattern di Trattamento Dati",
    definition: "Forzare arbitrariamente dati non conformi entro l'intervallo atteso senza sollevare eccezioni, mascherando a valle un guasto logico sistemico.",
    aliases: ["Troncamento Silenzioso"]
  },
  "Silent Semantic Failure": {
    title: "Silent Semantic Failure (Fallimento Semantico Silenzioso)",
    category: "Modalità di Guasto LLM",
    definition: "Guasto tipico del codice generato da LLM: il servizio risponde HTTP 200 con bassa latenza, ma il payload contiene calcoli errati o dati allucinati non intercettati dai logger.",
    aliases: ["Fallimento Semantico Silenzioso"]
  },
  "Sistema": {
    title: "Sistema (System)",
    category: "Ingegneria dei Sistemi",
    definition: "Insieme organizzato di elementi interagenti (hardware, software, persone, processi) orientati al perseguimento di uno scopo comune entro confini delimitati.",
    aliases: ["System"]
  },
  "Slopsquatting": {
    title: "Slopsquatting",
    category: "Supply Chain Security",
    definition: "Attacco alla filiera software consistente nel registrare su repository pubblici (PyPI, npm) nomi di pacchetti inesistenti generati frequentemente per allucinazione da LLM, associandovi malware.",
    aliases: ["Package Slopsquatting"]
  },
  "Soundness": {
    title: "Soundness (Correttezza Teorica nell'Analisi Statica)",
    category: "Analisi di Programma",
    definition: "Proprietà di un analizzatore per cui ogni reale violazione presente nel codice viene segnalata (zero falsi negativi / Recall = 1.0), accettando la presenza di falsi positivi.",
    aliases: ["Sound Analysis"]
  },
  "SOUP": {
    title: "SOUP (Software of Unknown Provenance)",
    category: "Standard & Supply Chain",
    definition: "Componente software o modello con trasparenza limitata, privo di documentazione esaustiva sui dati di pre-addestramento o sui processi di sviluppo (IEC 62304).",
    aliases: ["Software of Unknown Provenance"]
  },
  "Source & Sink": {
    title: "Source & Sink (Sorgente e Punto di Arrivo)",
    category: "Taint Analysis",
    definition: "Source è l'ingresso di un dato non fidato dall'esterno; Sink è l'operazione critica (query SQL, comando shell) la cui esecuzione con dati contaminati provoca una vulnerabilità.",
    aliases: ["Source", "Sink", "Sorgente e Sink"]
  },
  "Spazio degli Stati": {
    title: "Spazio degli Stati (State Space)",
    category: "Logica Formale",
    definition: "L'insieme teorico di tutte le configurazioni possibili delle variabili di memoria, dei registri e delle code di un componente software.",
    aliases: ["State Space"]
  },
  "Spec-Code Entanglement": {
    title: "Spec-Code Entanglement (Intreccio Specifica-Codice)",
    category: "Anti-Pattern di Specifica",
    definition: "Mescolare requisiti di business con dettagli tecnologici di basso livello (tabelle database, tipi di lock), vincolando e distorcendo la verifica.",
    aliases: ["Intreccio Specifica-Codice"]
  },
  "Spec-Fitting": {
    title: "Spec-Fitting",
    category: "Anti-Pattern di Governance",
    definition: "Pratica scorretta consistente nel modificare il testo della specifica per adattarlo a posteriori al comportamento errato del codice generato da LLM, dichiarando conforme il difetto.",
    aliases: ["Piegare la Specifica"]
  },
  "Specification": {
    title: "Specification (Specifica)",
    category: "Ingegneria dei Requisiti",
    definition: "Contratto formale (tupla S) che prescrive il comportamento della macchina esclusivamente alla frontiera dei fenomeni condivisi con il mondo (S nel modello W AND S |= R).",
    aliases: ["Specifica", "Specifiche"]
  },
  "Specification Borrowing": {
    title: "Specification Borrowing",
    category: "Anti-Pattern di Verifica",
    definition: "Deducere i requisiti del sistema leggendo il codice sorgente o le docstring generate dall'autore, anziché attingere alle fonti primarie di specifica e dominio.",
    aliases: ["Prestito di Specifica"]
  },
  "Specification Validity": {
    title: "Specification Validity (Validità della Specifica)",
    category: "Ingegneria dei Requisiti",
    definition: "Condizione in cui una specifica soddisfa congiuntamente i sei pilastri: consistenza, completezza, realizzabilità, non-ambiguità, falsificabilità e ancoraggio al dominio.",
    aliases: ["Validità della Specifica"]
  },
  "Specification Verification": {
    title: "Specification Verification (Verifica della Specifica)",
    category: "Metodi Formali",
    definition: "Procedimento formale atto a dimostrare l'assenza di antinomie logiche, contraddizioni o insoddisfacibilità interne all'insieme dei requisiti della specifica (T_spec |/- False).",
    aliases: ["Verifica della Specifica"]
  },
  "Specification-based Oracle": {
    title: "Specification-based Oracle (Oracolo Basato su Specifica)",
    category: "Testing & Oracoli",
    definition: "Oracolo che confronta l'output del software direttamente con i requisiti funzionali formalizzati a monte prima dell'implementazione del codice.",
    aliases: ["Oracolo Basato su Specifica"]
  },
  "Split-Brain del Circuit Breaker": {
    title: "Split-Brain del Circuit Breaker",
    category: "Sistemi Distribuiti & Resilienza",
    definition: "Divergenza dello stato operativo dei circuit breaker su istanze diverse di un cluster a causa di partizionamento di rete asimmetrico verso la dipendenza.",
    aliases: ["Split-Brain Circuit Breaker"]
  },
  "SRS Illusion": {
    title: "The SRS Illusion (L'Illusione del Documento Ricco)",
    category: "Anti-Pattern di Requisiti",
    definition: "Ritenere che un documento di requisiti lungo, impaginato bene e ricco di tabelle generato da LLM sia garanzia di validità semantica e completezza.",
    aliases: ["The SRS Illusion", "Illusione del Documento Ricco"]
  },
  "Staging Environment": {
    title: "Staging Environment (Ambiente di Staging)",
    category: "Esercizio Controllato",
    definition: "Ambiente di pre-produzione isolato progettato per replicare l'architettura, i middleware e le configurazioni reali prima del rilascio.",
    aliases: ["Ambiente di Staging", "Staging"]
  },
  "Staging Fidelity Gap": {
    title: "Staging Fidelity Gap",
    category: "Costrutto Didattico",
    definition: "La discrepanza strutturale inevitabile tra ambiente di staging e produzione reale (dati sintetici vs dati sporchi, concorrenza reale, latenze degradate di terze parti).",
    aliases: ["Divario di Fedeltà di Staging"]
  },
  "STAMP": {
    title: "STAMP (Systems-Theoretic Accident Model and Processes)",
    category: "Ingegneria della Sicurezza Sistemica",
    definition: "Teoria della sicurezza (Nancy Leveson) in cui gli incidenti originano da azioni di controllo inadeguate generate da discrepanze tra modello mentale e realtà.",
    aliases: ["Systems-Theoretic Accident Model"]
  },
  "State Leakage": {
    title: "State Leakage (Fuga di Stato Asincrono)",
    category: "Concorrenza & Invarianti",
    definition: "Violazione transitoria di uno stato critico resa osservabile a thread paralleli durante l'esecuzione di una funzione non protetta da isolamento atomico.",
    aliases: ["Fuga di Stato Asincrono"]
  },
  "Static Severity Bias": {
    title: "Static Severity Bias",
    category: "Anti-Pattern di Rischio",
    definition: "Mantenere invariata la severità assegnata a un rischio al crescere dei volumi o del valore delle transazioni servite dal software.",
    aliases: ["Pregiudizio di Severità Statica"]
  },
  "Static Threshold Drift": {
    title: "Static Threshold Drift",
    category: "Anti-Pattern Operativo",
    definition: "Impostare soglie di allarme costanti nel tempo che non tengono conto della stagionalità naturale o della scalatura orizzontale dei carichi.",
    aliases: ["Deriva delle Soglie Statiche"]
  },
  "Statistical / Probabilistic Oracle": {
    title: "Statistical / Probabilistic Oracle",
    category: "Testing & Oracoli",
    definition: "Oracolo che valuta se una serie di output rispetta una distribuzione statistica attesa, soglia di dispersione o confidenza bootstrap; non certifica la singola esecuzione.",
    aliases: ["Oracolo Statistico"]
  },
  "Stato Raggiungibile": {
    title: "Stato Raggiungibile (Reachable State)",
    category: "Logica Formale",
    definition: "Configurazione dello spazio degli stati generabile a partire dallo stato iniziale mediante una sequenza lecita di transizioni di programma.",
    aliases: ["Reachable State"]
  },
  "STRIDE": {
    title: "STRIDE",
    category: "Threat Modeling",
    definition: "Tassonomia di modellazione delle minacce che classifica le violazioni alle proprietà di sicurezza: Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege.",
    aliases: ["Modello STRIDE"]
  },
  "Sweeping Unknowns Under the Rug": {
    title: "Sweeping Unknowns Under the Rug",
    category: "Anti-Pattern di Chiusura",
    definition: "Espungere dal fascicolo di chiusura le proprietà non verificate per ottenere l'approvazione formale, trasformando l'incertezza in vulnerabilità latente.",
    aliases: ["Occultamento degli UNKNOWN"]
  },
  "Sycophancy": {
    title: "Sycophancy (Compiacenza Algoritmica dell'LLM)",
    category: "Allineamento AI & Bias",
    definition: "Tendenza statistica dei modelli linguistici ad assecondare le premesse o le ipotesi suggerite dall'utente nel prompt, minimizzando problemi o confermando tesi errate.",
    aliases: ["Compiacenza Algoritmica", "Sicofania"]
  },
  "Sycophantic Review Assistant": {
    title: "The Sycophantic Review Assistant",
    category: "Anti-Pattern di Revisione",
    definition: "Delegare la revisione critica a un secondo LLM che produce valutazioni compiacenti e rassicuranti senza verificare matematicamente le assunzioni.",
    aliases: ["The Sycophantic Review Assistant", "Revisore Compiacente"]
  },
  "Symptom": {
    title: "Symptom (Sintomo)",
    category: "Analisi delle Anomalie",
    definition: "La manifestazione esteriore osservabile di un problema (es. crash HTTP 500), distinta dalla causa prossima e dalla causa sistemica primaria.",
    aliases: ["Sintomo", "Sintomi"]
  },

  // =========================================================================
  // LETTERA T
  // =========================================================================
  "Tail-Based Sampling": {
    title: "Tail-Based Sampling",
    category: "Osservabilità & Tracing",
    definition: "Campionamento telemetrico a valle che memorizza e trasmette le tracce ad alta cardinalità solo se la transazione manifesta un errore o viola un'invariante.",
    aliases: ["Campionamento a Valle"]
  },
  "Taint Analysis": {
    title: "Taint Analysis (Analisi di Contaminazione)",
    category: "Analisi Statica & SAST",
    definition: "Tecnica che etichetta i dati in ingresso da sorgenti esterne come contaminati, tracciandone la propagazione lungo il grafo per verificare che raggiungano i sink solo attraverso sanitizzatori.",
    aliases: ["Analisi del Taint", "Taint Tracking"]
  },
  "Tautological Logger": {
    title: "The Tautological Logger (Il Logger Tautologico)",
    category: "Anti-Pattern Telemetrico",
    definition: "Istruzioni di log che certificano l'intento dell'algoritmo anziché il fatto empirico reale, confermando successi che non si sono verificati sul database.",
    aliases: ["The Tautological Logger", "Logger Tautologico"]
  },
  "Tautological Oracle / Tautological Test": {
    title: "Tautological Oracle / Tautological Test",
    category: "Anti-Pattern di Testing",
    definition: "Oracolo o test generato ricalcando la logica interna del codice sotto collaudo, tale da verificare solo che il codice faccia ciò che fa, riproducendo gli stessi errori del generatore.",
    aliases: ["Oracolo Tautologico", "Test Tautologico", "Mirror Test"]
  },
  "Technical Independence": {
    title: "Technical Independence (Indipendenza Tecnica)",
    category: "Metodologia di Verifica",
    definition: "Dimensione dell'indipendenza in cui chi verifica utilizza strumenti, metodi di prova e ambienti di esecuzione disgiunti e non ereditati dallo sviluppatore.",
    aliases: ["Indipendenza Tecnica"]
  },
  "Telemetry": {
    title: "Telemetry (Telemetria di Sistema)",
    category: "Ingegneria dei Sistemi",
    definition: "Flusso grezzo di segnali (metriche, log, tracce) emesso da un software in esecuzione; non costituisce di per sé evidenza di correttezza funzionale.",
    aliases: ["Telemetria"]
  },
  "Telemetry Distortion": {
    title: "Telemetry Distortion (Distorsione Telemetrica)",
    category: "Osservabilità & Qualità",
    definition: "Discrepanza tra lo stato interno reale del software e lo stato rappresentato dalla telemetria a causa di ritardi di flushing, log dropped o campionamento.",
    aliases: ["Distorsione Telemetrica"]
  },
  "Teorema del Vuoto di Assurance": {
    title: "Teorema del Vuoto di Assurance",
    category: "Governance & Competenze",
    definition: "Principio formalizzato nello Step 8: se la capacità effettiva di verifica è inferiore alla complessità richiesta (C_eff < C_req), lo stato del sistema deve essere UNKNOWN.",
    aliases: ["Vuoto di Assurance"]
  },
  "Teorema di Adeguatezza della Specifica": {
    title: "Teorema di Adeguatezza della Specifica",
    category: "Ingegneria dei Requisiti",
    definition: "Dimostrazione logica deduttiva che la congiunzione delle assunzioni sul mondo (W) e della specifica (S) implica il soddisfacimento dei requisiti (R): (W AND S) |= R.",
    aliases: ["Adeguatezza della Specifica"]
  },
  "Teorema di Rice": {
    title: "Teorema di Rice",
    category: "Informatica Teorica",
    definition: "Teorema fondamentale dell'indecidibilità: qualsiasi proprietà semantica non banale del comportamento a runtime di un programma Turing-completo è formalmente indecidibile a riposo.",
    aliases: ["Rice's Theorem"]
  },
  "Terna di Hoare": {
    title: "Terna di Hoare",
    category: "Logica dei Programmi",
    definition: "Formalismo assiomatico { Pre } C { Post } che stabilisce che se il comando C viene eseguito partendo da uno stato conforme a Pre e termina, il nuovo stato soddisferà Post.",
    aliases: ["Hoare Triple"]
  },
  "Threat": {
    title: "Threat (Minaccia)",
    category: "Cybersecurity",
    definition: "Condizione, evento o capacità avversariale potenzialmente dannosa che mira a violare le proprietà di sicurezza di un asset del sistema.",
    aliases: ["Minaccia", "Minacce"]
  },
  "Threat Modeling": {
    title: "Threat Modeling (Modellazione delle Minacce)",
    category: "Ingegneria della Sicurezza",
    definition: "Attività strutturata volta a mappare componenti, flussi di dati e confini di fiducia per identificare sistematicamente minacce (STRIDE) e definire contromisure architetturali.",
    aliases: ["Modellazione delle Minacce"]
  },
  "Threshold Tampering": {
    title: "Threshold Tampering (Manipolazione delle Soglie)",
    category: "Anti-Pattern Decisionale",
    definition: "Modificare al ribasso le soglie di rigore di una policy di gate al solo scopo di sbloccare una pipeline bloccata da uno stato UNKNOWN o FAIL, annullando l'assurance.",
    aliases: ["Manipolazione delle Soglie"]
  },
  "Thundering Herd": {
    title: "Thundering Herd (Tempesta di Richieste Concorrenti)",
    category: "Sistemi Distribuiti & Resilienza",
    definition: "Ondata improvvisa e sincronizzata di richieste concorrenti che si abbatte su una dipendenza remota nel momento del riavvio, provocandone l'immediato nuovo collasso.",
    aliases: ["Tempesta di Richieste"]
  },
  "Tick-Box Auditing": {
    title: "Tick-Box Auditing (Audit come Spunta Burocratica)",
    category: "Anti-Pattern di Governance",
    definition: "Condurre la revisione periodica come una mera sequenza di caselle documentali da spuntare senza compiere alcun tentativo effettivo di falsificazione.",
    aliases: ["Audit come Spunta Burocratica"]
  },
  "Timing Attack": {
    title: "Timing Attack (Attacco di Temporizzazione / CWE-208)",
    category: "Cybersecurity",
    definition: "Attacco a canale laterale in cui la durata microscopica dell'esecuzione di una funzione (es. confronto di stringhe non in tempo costante) rivela informazioni segrete.",
    aliases: ["Attacco di Temporizzazione", "CWE-208"]
  },
  "TOCTOU": {
    title: "TOCTOU (Time-Of-Check to Time-Of-Use)",
    category: "Concorrenza & Vulnerabilità",
    definition: "Condizione di competizione (race condition) originata dalla frattura temporale tra il momento in cui una precondizione viene verificata e il momento dell'azione.",
    aliases: ["Time-Of-Check to Time-Of-Use"]
  },
  "Traceability": {
    title: "Traceability (Tracciabilità dell'Assurance)",
    category: "Qualità & Governance",
    definition: "Grafo Aciclico Diretto (DAG) che collega ogni intenzione di business fino al codice, all'evidenza e all'approvazione (Objective -> Requirement -> Assumption -> Property -> Oracle -> Test -> Implementation -> Result -> Review -> Approval).",
    aliases: ["Tracciabilità"]
  },
  "Traccia di Esecuzione": {
    title: "Traccia di Esecuzione (Execution Trace)",
    category: "Logica Formale",
    definition: "Sequenza temporale ordinata e discreta di stati (s_0, s_1, ..., s_k) prodotta dall'avanzamento del programma sotto l'applicazione delle transizioni lecite.",
    aliases: ["Execution Trace"]
  },
  "Tracciabilità Tridimensionale": {
    title: "Tracciabilità Tridimensionale",
    category: "Costrutto Didattico di Gate",
    definition: "Modello dello Step 23 che valuta la convergenza tra la dimensione dei Requisiti (Step 4), la dimensione delle Evidenze (Step 16-21) e delle Anomalie aperte (Step 22).",
    aliases: ["Tracciabilità 3D"]
  },
  "Tragedy of Distributed Ignorance": {
    title: "Tragedy of Distributed Ignorance (Responsabilità Diffusa)",
    category: "Anti-Pattern Organizzativo",
    definition: "Frammentazione dell'autorità decisionale all'interno di comitati allargati in cui ciascun membro presume che la verifica tecnica sia stata eseguita da altri.",
    aliases: ["Tragedia dell'Ignoranza Distribuita"]
  },
  "Transazioni di Compensazione": {
    title: "Transazioni di Compensazione (Saga Pattern)",
    category: "Resilienza Distribuita",
    definition: "Nuove azioni esplicite di segno contrario necessarie per neutralizzare effetti collaterali esterni irreversibili non annullabili con un semplice rollback locale.",
    aliases: ["Compensating Transactions", "Saga Pattern"]
  },
  "Trust Boundary": {
    title: "Trust Boundary (Confine di Fiducia)",
    category: "Sicurezza Architetturale",
    definition: "Linea di demarcazione logica o fisica in cui si verifica una variazione nel livello di privilegio, autorità o affidabilità dei dati; ogni dato che lo attraversa richiede validazione deterministica.",
    aliases: ["Confine di Fiducia", "Trust Boundaries"]
  },
  "Tupla PD": {
    title: "Tupla PD (Formalizzazione del Dominio del Problema)",
    category: "Ingegneria dei Requisiti",
    definition: "Formalizzazione matematica dello Step 1 che definisce il problema come quintupla: < W_facts, W_assumptions, Obj, Constraints, Invalidation_Conditions >.",
    aliases: ["Problem Domain Tupla"]
  },
  "Tupla RP": {
    title: "Tupla RP (Formalizzazione del Profilo di Rischio)",
    category: "Modello di Rischio",
    definition: "Formalizzazione matematica dello Step 2 che definisce il rischio come sestupla: < H_set, Severity_Class, Reversibility_Class, Controllability_Class, Blast_Radius, AL >.",
    aliases: ["Risk Profile Tupla"]
  },
  "Tupla S": {
    title: "Tupla S (Formalizzazione della Specifica)",
    category: "Ingegneria dei Requisiti",
    definition: "Formalizzazione matematica dello Step 4 che definisce la specifica della macchina come tupla ottupla: < I, O, Sigma, Init, Pre, Post, Inv, Delta >.",
    aliases: ["Specification Tupla"]
  },
  "Two-Person Integrity": {
    title: "Two-Person Integrity (TPI / Principio dei Quattro Occhi)",
    category: "Governance & Sicurezza",
    definition: "Vincolo organizzativo che impone che nessun artefatto a rischio significativo possa essere rilasciato senza l'ispezione indipendente e l'approvazione esplicita di almeno due soggetti qualificati distinti.",
    aliases: ["TPI", "Principio dei Quattro Occhi", "Four-Eyes Principle"]
  },
  "Type-Driven Design": {
    title: "Type-Driven Design",
    category: "Architettura del Software",
    definition: "Disciplina di modellazione in cui le regole di business e gli invarianti sono codificati all'interno del sistema di tipi statici, escludendo a tempo di compilazione gli stati invalidi.",
    aliases: ["Progettazione Guidata dai Tipi"]
  },

  // =========================================================================
  // LETTERA U
  // =========================================================================
  "Unassigned Acceptance": {
    title: "Unassigned Acceptance",
    category: "Anti-Pattern di Rischio",
    definition: "Dichiarare un rischio residuo accettato nel registro senza la firma formale della specifica autorità designata competente.",
    aliases: ["Accettazione Non Assegnata"]
  },
  "Unbounded Environment Trap": {
    title: "The Unbounded Environment Trap",
    category: "Anti-Pattern di Specifica",
    definition: "Scrivere specifiche assumendo tacitamente che l'hardware sia perfetto, la memoria infinita e la rete priva di latenza o disconnessioni.",
    aliases: ["The Unbounded Environment Trap", "Trappola dell'Ambiente Infinito"]
  },
  "Unbounded Probing Storm": {
    title: "The Unbounded Probing Storm",
    category: "Anti-Pattern di Resilienza",
    definition: "Circuit breaker che nello stato Half-Open scarica l'intero traffico accumulato sulla dipendenza anziché isolare una singola richiesta sentinella.",
    aliases: ["The Unbounded Probing Storm", "Tempesta di Sonde"]
  },
  "Underspecification": {
    title: "Underspecification (Sotto-specificazione)",
    category: "Ingegneria dei Requisiti",
    definition: "Condizione di ambiguità in cui i vincoli definiti ammettono molteplici comportamenti incompatibili, demandando all'LLM decisioni arbitrarie basate su regolarità statistiche.",
    aliases: ["Sotto-specificazione"]
  },
  "UNKNOWN": {
    title: "UNKNOWN (Stato Epistemico Non Noto / Verdetto di Incertezza)",
    category: "Tassonomia Epistemica & Stati Decisionali",
    definition: "Stato informativo che esprime esplicitamente la carenza di evidenza, l'incompetenza di giudizio o l'indecidibilità di una proprietà. Nei decision gate agisce come blocco vincolante (UNKNOWN != PASS).",
    aliases: ["Stato UNKNOWN", "Non Noto"]
  },
  "Unknown Knowns": {
    title: "Unknown Knowns (Assunzioni Tacite)",
    category: "Tassonomia Epistemica",
    definition: "Regole, consuetudini o presupposti noti a singoli esperti ma mai formalizzati, che gli sviluppatori applicano inconsciamente nel codice.",
    aliases: ["Assunzioni Tacite"]
  },
  "Unknown Unknowns": {
    title: "Unknown Unknowns (Punti Ciechi Critici)",
    category: "Tassonomia Epistemica",
    definition: "Fattori di vulnerabilità, dipendenze nascoste o interazioni emergenti la cui stessa esistenza è al di fuori della consapevolezza dei progettisti e dei modelli.",
    aliases: ["Punti Ciechi Critici"]
  },

  // =========================================================================
  // LETTERA V
  // =========================================================================
  "Vacuous Truth": {
    title: "Vacuous Truth (Verità Vacua)",
    category: "Logica Formale",
    definition: "Condizione fallace in cui un'asserzione condizionale (A => B) risulta formalmente vera solo perché la precondizione A è costantemente falsa o non si verifica mai nei test, mascherando l'assenza di verifica su B.",
    aliases: ["Verità Vacua"]
  },
  "Validation": {
    title: "Validation (Validazione)",
    category: "Distinzioni Epistemiche",
    definition: "Accertamento empirico che la specifica e il prodotto soddisfino le finalità operative reali dell'utente nel mondo esterno ('Abbiamo costruito il sistema giusto?').",
    aliases: ["Validazione"]
  },
  "Valutazione Vettoriale del Rischio": {
    title: "Valutazione Vettoriale del Rischio (V_gate)",
    category: "Modello Decisionale",
    definition: "Modello didattico dello Step 23 che valuta l'ammissibilità al gate su quattro dimensioni non riducibili a una media: [D_inv, D_ind, D_cov, D_disc].",
    aliases: ["V_gate", "Vettore di Gate"]
  },
  "Verification": {
    title: "Verification (Verifica)",
    category: "Distinzioni Epistemiche",
    definition: "Dimostrazione empirica o formale che il software sia conforme alle prescrizioni della specifica tecnica approvata ('Abbiamo costruito il sistema nel modo specificato?').",
    aliases: ["Verifica"]
  },
  "Vettore di Indipendenza Epistemica": {
    title: "Vettore di Indipendenza Epistemica (Indep_Vector)",
    category: "Metodologia di Verifica",
    definition: "Modello formale dello Step 11 che misura il disaccoppiamento tra implementazione e oracolo su 10 dimensioni: Dati, Assunzioni, Specifiche, Modelli, Pipeline, Paradigmi, Autorità, Generazione, Incentivi, Correlazione.",
    aliases: ["Indep_Vector"]
  },
  "Vibe Coding": {
    title: "Vibe Coding (Programmazione a Sensazione)",
    category: "Anti-Pattern Metodologico",
    definition: "Anti-pattern in cui si accetta e rilascia codice generato da LLM basandosi esclusivamente sul fatto che 'sembra funzionare a vista', omettendo contratti, analisi causale e oracoli formali.",
    aliases: ["Programmazione a Sensazione"]
  },
  "Vulnerability": {
    title: "Vulnerability (Vulnerabilità)",
    category: "Cybersecurity",
    definition: "Debolezza o difetto intrinseco nella progettazione, implementazione o configurazione del software che può essere sfruttato da una minaccia per violare una politica di sicurezza.",
    aliases: ["Vulnerabilità"]
  },

  // =========================================================================
  // LETTERA W
  // =========================================================================
  "Warranty": {
    title: "Warranty (Garanzia Contrattuale / Commerciale)",
    category: "Distinzioni Giuridiche",
    definition: "Impegno contrattuale o commerciale che stabilisce rimedi o risarcimenti a fronte di difetti del prodotto; distinta dall'Assurance (fiducia giustificata a priori) e dall'Insurance.",
    aliases: ["Garanzia Contrattuale", "Garanzia Commerciale"]
  },
  "Weak Invariants": {
    title: "Weak Invariants (Invarianti Deboli)",
    category: "Anti-Pattern Logico",
    definition: "Invarianti talmente generici da risultare conformi anche a implementazioni errate (es. len(output) >= 0), azzerando il valore dell'assurance.",
    aliases: ["Invarianti Deboli"]
  },
  "White-Box Fuzzing": {
    title: "White-Box Fuzzing / Concolic Testing",
    category: "Testing Dinamico",
    definition: "Tecnica che combina esecuzione concreta e raccolta di vincoli simbolici per calcolare con un solver SMT gli input esatti per percorrere rami logici nascosti.",
    aliases: ["Concolic Testing", "Fuzzing White-Box"]
  },
  "World": {
    title: "World / Mondo (W)",
    category: "Modello Mondo-Macchina",
    definition: "Il dominio della realtà esterna in cui risiede il problema; include entità fisiche, utenti umani, reti terze e leggi naturali non controllate dal software.",
    aliases: ["Mondo", "W", "Ambiente Esterno"]
  },
  "WORM": {
    title: "WORM (Write Once, Read Many)",
    category: "Sicurezza & Archiviazione",
    definition: "Modalità o supporto di memorizzazione protetto crittograficamente che consente la scrittura del dato una sola volta, impedendo qualsiasi alterazione o cancellazione fino alla scadenza del periodo di ritenzione.",
    aliases: ["Write Once Read Many", "Storage WORM"]
  },
  "Write-Only Risk Register": {
    title: "Write-Only Risk Register",
    category: "Anti-Pattern di Governance",
    definition: "Compilare un registro dei rischi per superare un audit burocratico e archiviarlo senza che le sue voci vincolino mai le pipeline o le decisioni di rilascio.",
    aliases: ["Registro di Sola Scrittura"]
  },

  // =========================================================================
  // LETTERA Z
  // =========================================================================
  "Zero-Failure Fallacy": {
    title: "Zero-Failure Fallacy (Inganno della Probabilità Zero)",
    category: "Fallacie Epistemiche",
    definition: "Dedurre che la probabilità di guasto sia zero solo perché nessun test su un campione limitato ha fallito, violando il principio di non-diluizione del rischio.",
    aliases: ["Inganno della Probabilità Zero"]
  }
};
