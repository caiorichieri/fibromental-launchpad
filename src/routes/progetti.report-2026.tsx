import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "../components/fibromental/Layout";
import cfuLogo from "../assets/cfu-italia-logo.png";
import swirlLogo from "../assets/progetti-swirl-logo.png";


export const Route = createFileRoute("/progetti/report-2026")({
  head: () => ({
    meta: [
      { title: "Progetti — FibroMental" },
      { name: "robots", content: "noindex,nofollow" },
      { name: "description", content: "Report conclusivo del percorso psicologico FibroMental: otto partecipanti, 32 sedute completate, zero abbandoni. Fattibilità, tollerabilità ed esperienza delle persone." },
      { property: "og:title", content: "Progetti — FibroMental" },
      { property: "og:description", content: "Report conclusivo del percorso psicologico FibroMental: otto partecipanti, 32 sedute completate, zero abbandoni." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProgettiPage,
});

function SectionText({ paragraphs }: { paragraphs: string[] }) {
  return (
    <>
      {paragraphs.map((p, i) => (
        <p key={i} className="body-text" style={{ maxWidth: 760 }}>{p}</p>
      ))}
    </>
  );
}

function ProgettiPage() {
  return (
    <SiteLayout>
      <section className="page-hero">
        <div className="page-hero-inner fade-in">
          <img src={swirlLogo} alt="Simbolo FibroMental" style={{ width: 200, height: "auto", margin: "0 auto 1.5rem", display: "block" }} />
          <span className="pill-label">Progetti · FibroMental</span>
          <h1 className="display">Il percorso, le persone, <em>i risultati</em></h1>
          <p className="hero-sub" style={{ margin: "1.5rem auto 0", textAlign: "center" }}>
            Report conclusivo del percorso psicologico — otto partecipanti, maggio–agosto 2026
          </p>
          <p style={{ textAlign: "center", marginTop: "1.25rem" }}>
            <Link to="/progetti" className="progetto-card-cta">← Tutti i progetti</Link>
          </p>
        </div>

      </section>

      {/* Statistiche */}
      <section className="page-section white">
        <div className="section-inner centered fade-in" style={{ textAlign: "center" }}>
          <div className="ricerca-stats" style={{ justifyContent: "center", margin: "0 auto" }}>
            {[
              ["8", "Partecipanti"],
              ["32/32", "Sedute completate"],
              ["5", "Sedute di recupero aggiuntive"],
              ["0", "Abbandoni ed eventi avversi"],
            ].map(([num, label]) => (
              <div key={label}>
                <div className="stat-num">{num}</div>
                <div className="stat-label">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premessa */}
      <section className="page-section cream">
        <div className="section-inner centered fade-in" style={{ textAlign: "left" }}>
          <h2 className="section-title">Premessa</h2>
          <SectionText paragraphs={[
            "Questo report racconta cosa è successo durante FibroMental. Non lo fa con il linguaggio dei protocolli, ma con quello delle persone che lo hanno attraversato.",
            "Il documento descrive le attività realizzate e l'esperienza riferita dai partecipanti. I risultati riguardano la fattibilità, la tollerabilità e l'utilità percepita del percorso — non un'analisi di efficacia clinica. È un report di progetto, scritto per chi vuole capire cosa ha funzionato, cosa si può migliorare e cosa le persone hanno portato a casa.",
          ]} />
        </div>
      </section>

      {/* Collaborazione CFU-Italia ODV */}
      <section className="page-section white">
        <div className="section-inner centered fade-in" style={{ textAlign: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "2rem",
              padding: "2.5rem",
              borderTop: "1px solid var(--border)",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <img
              src={cfuLogo}
              alt="Logo CFU-Italia ODV"
              style={{ height: 80, width: "auto", flex: "0 0 auto" }}
            />
            <div style={{ flex: "1 1 280px", textAlign: "center" }}>
              <p className="body-text" style={{ maxWidth: 760, margin: "0 auto 0.75rem" }}>
                Il progetto è stato realizzato grazie alla collaborazione del{" "}
                <strong>CFU-Italia ODV</strong> — Comitato Fibromialgici Uniti, che ha individuato
                e coordinato la partecipazione di otto persone con fibromialgia residenti in
                Friuli Venezia Giulia. Il coordinamento sul territorio è stato curato dalla
                referente regionale <strong>Elisa Lombardi</strong>.
              </p>
              <a
                href="https://www.cfuitalia.it"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: ".85rem", color: "var(--orange)", textDecoration: "none" }}
              >
                cfuitalia.it
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Da dove siamo partiti */}
      <section className="page-section white">
        <div className="section-inner centered fade-in" style={{ textAlign: "left" }}>
          <h2 className="section-title">Da dove siamo partiti</h2>
          <SectionText paragraphs={[
            "FibroMental è un percorso psicologico di MetaCare, cui il CFU FVG ha aderito, realizzato con il sostegno di un contributo regionale. Il progetto prevedeva quattro sedute psicologiche individuali — della durata di circa 45–50 minuti ciascuna — rivolte a otto persone con fibromialgia individuate dal CFU FVG.",
            "Il percorso è stato costruito a partire dal primo blocco del protocollo FibroMental, dedicato all'ascolto di sé, alla regolazione psicofisiologica e all'acquisizione di strumenti utilizzabili nella gestione quotidiana dei sintomi. Le quattro sedute hanno costituito l'intervento completo previsto e finanziato.",
            "L'obiettivo non era dimostrare che qualcosa funzionasse in senso sperimentale. Era offrire uno spazio psicologico strutturato e accessibile, in cui le persone potessero sperimentare esercizi, immagini e strategie trasferibili nella vita di tutti i giorni — e verificare che fosse un percorso fattibile, tollerabile e accettato da chi ci partecipava.",
          ]} />
        </div>
      </section>

      {/* Cosa è stato fatto */}
      <section className="page-section cream">
        <div className="section-inner centered fade-in" style={{ textAlign: "left" }}>
          <h2 className="section-title">Cosa è stato fatto</h2>
          <SectionText paragraphs={[
            "Tutte le attività previste sono state completate. Tutti gli otto partecipanti hanno svolto le quattro sedute programmate, senza abbandoni e senza interruzioni.",
            "Complessivamente sono state realizzate 53 prestazioni individuali: le 32 sedute previste dal progetto, 8 incontri di consegna del visore e accompagnamento tecnico, 5 sedute di recupero aggiuntive e 8 colloqui finali di valutazione. Le attività organizzative sono iniziate a maggio 2026; nel mese di giugno si sono svolte le consegne, gli incontri tecnici e la valutazione di ingresso. Le sedute con i partecipanti si sono concentrate nei mesi di luglio e agosto.",
            "Quando una difficoltà tecnica o di collegamento ha compromesso il regolare svolgimento dell'incontro, è stata proposta una seduta di recupero. Le cinque sedute aggiuntive hanno permesso a tutti di completare integralmente il ciclo previsto.",
          ]} />
        </div>
      </section>

      {/* Come ha funzionato */}
      <section className="page-section white">
        <div className="section-inner centered fade-in" style={{ textAlign: "left" }}>
          <h2 className="section-title">Come ha funzionato</h2>
          <SectionText paragraphs={[
            "Le sedute sono state condotte prevalentemente con l'impiego di ambienti immersivi — prato, mare, montagna — e integrate con esercizi di respirazione, regolazione e focalizzazione da utilizzare anche fuori dagli incontri. La modalità è stata adattata alle condizioni dei partecipanti: gli incontri si sono svolti in studio, a domicilio o in videochiamata.",
            "La componente immersiva non è stata un obbligo da applicare in ogni seduta, ma uno strumento clinico modulabile — attivato quando aveva senso e regolato sulla persona.",
            "All'avvio e al termine del percorso ogni partecipante ha compilato il questionario di caratterizzazione FibroType, sviluppato internamente dal progetto: le sedute sono state calibrate sulla base del profilo emerso. Al termine del percorso tutti hanno svolto un colloquio strutturato di valutazione — condotto da un professionista diverso da chi aveva tenuto le sedute — per facilitare l'espressione sia degli aspetti positivi sia delle eventuali criticità.",
          ]} />
        </div>
      </section>

      {/* Sicurezza e tollerabilità */}
      <section className="page-section cream">
        <div className="section-inner centered fade-in" style={{ textAlign: "left" }}>
          <h2 className="section-title">Sicurezza e tollerabilità</h2>
          <SectionText paragraphs={[
            "Nessun partecipante ha riferito nausea, vertigini, disorientamento, affaticamento visivo o mal di testa legati agli ambienti immersivi. Non sono stati riferiti eventi avversi di alcun tipo. Tutti hanno dichiarato di essersi sentiti liberi di interrompere l'esperienza in qualsiasi momento.",
            "La maggior parte non ha incontrato difficoltà nell'uso del dispositivo. Due persone hanno segnalato qualche impaccio tecnico, risolto con il supporto disponibile durante le sedute o adattando la modalità di erogazione.",
          ]} />
        </div>
      </section>

      {/* Esperienza delle persone */}
      <section className="page-section navy experience">
        <div className="section-inner centered fade-in" style={{ textAlign: "left" }}>
          <span className="pill-label">Le voci</span>
          <h2 className="section-title">L'esperienza delle persone</h2>
          <p className="body-text" style={{ maxWidth: 760 }}>
            Nei colloqui finali la relazione con la terapeuta è emersa come uno degli elementi ricordati più frequentemente, insieme ad alcune immagini degli ambienti — il mare, i laghi in montagna, l'albero nel prato.
          </p>
          <blockquote className="esperienza-quote">
            «Avevo davanti una persona con cui potevo parlare in libertà. Di solito evito di parlare di cose mie.»
          </blockquote>
          <blockquote className="esperienza-quote">
            «Mi sono sentita felice e serena. Mi sono sentita coccolata.»
          </blockquote>
          <p className="body-text" style={{ maxWidth: 760, marginTop: "2.5rem" }}>
            Una persona ha descritto il percorso come l'essersi concessa uno spazio per fare pace con se stessa. Gli ambienti sono stati generalmente valutati come piacevoli, con preferenze individuali differenti.
          </p>
        </div>
      </section>

      {/* Cosa hanno portato a casa */}
      <section className="page-section white">
        <div className="section-inner centered fade-in" style={{ textAlign: "left" }}>
          <h2 className="section-title">Cosa hanno portato a casa</h2>
          <SectionText paragraphs={[
            "Sei partecipanti su otto hanno riferito un miglioramento percepito in almeno un'area. Tre ambiti tornano nei loro racconti con maggiore frequenza: una maggiore capacità di calmarsi quando i sintomi aumentano, una riduzione della paura legata al dolore e una maggiore fiducia nella possibilità di trovare qualcosa che possa aiutare.",
          ]} />
          {[
            "«Ho capito che posso ritrovare sensazioni dentro di me.»",
            "«Riuscivo a visualizzare le cose che mi pesavano e riuscivo a mandarle via.»",
            "«Riesco a fermarmi quando sento che qualcosa non va e a fare il punto.»",
          ].map((q) => (
            <blockquote key={q} className="esperienza-quote" style={{ color: "var(--pink)", borderLeftColor: "var(--orange)", margin: "2rem 0 0" }}>
              {q}
            </blockquote>
          ))}
          <SectionText paragraphs={[
            "Una persona ha definito l'esperienza «un cammino di riavvicinamento fra corpo e mente»; un'altra l'ha sintetizzata con l'espressione «si può fare». Tutti hanno descritto l'esperienza come piacevole.",
            "Sette persone su otto hanno descritto strumenti specifici che stavano continuando a utilizzare: esercizi di respiro, immagini a cui tornare, un gesto o un luogo interno. In alcuni casi si trattava di risorse nuove; in altri il percorso ha riattivato strumenti appresi in esperienze precedenti e poi accantonati.",
          ]} />
          <div className="area-card fade-in" style={{ marginTop: "2.5rem", borderLeft: "4px solid var(--orange)" }}>
            <p style={{ color: "var(--body-text)" }}>
              Per due persone, più facilitate a concentrarsi sugli aspetti interocettivi a occhi chiusi, gli ambienti immersivi non hanno favorito l'ascolto di sé. Una partecipante ha inoltre espresso la preferenza per proseguire in modalità tradizionale. È un dato clinicamente utile: dice che l'immersione va modulata sulla persona, non applicata a prescindere.
            </p>
          </div>
        </div>
      </section>

      {/* Cosa hanno chiesto i partecipanti */}
      <section className="page-section cream">
        <div className="section-inner centered fade-in" style={{ textAlign: "left" }}>
          <h2 className="section-title">Cosa hanno chiesto i partecipanti</h2>
          <SectionText paragraphs={[
            "Tutti gli otto partecipanti hanno dichiarato che consiglierebbero l'esperienza ad altre persone con fibromialgia. Sette su otto hanno espresso interesse a proseguire. Una di queste preferirebbe continuare senza la componente immersiva.",
            "Sette partecipanti hanno ritenuto che quattro sedute non fossero sufficienti per un lavoro psicologico più approfondito. Sei persone hanno chiesto più spazio per il dialogo.",
          ]} />
        </div>
        <div className="aree-grid fade-in" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", maxWidth: 1100 }}>
          {[
            ["Più spazio di dialogo", "Prevedere un incontro iniziale e calibrare il tempo tra dialogo ed esercizi."],
            ["Oltre quattro sedute", "Proporre la continuità psicologica dopo il percorso finanziato."],
            ["Risposte diverse all'immersione", "Mantenere flessibilità e ampliare realismo degli scenari."],
          ].map(([title, text]) => (
            <div key={title} className="area-card">
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Conclusione */}
      <section className="page-section white">
        <div className="section-inner centered fade-in" style={{ textAlign: "left" }}>
          <h2 className="section-title">Dove porta tutto questo</h2>
          <SectionText paragraphs={[
            "Il percorso ha raggiunto integralmente gli obiettivi previsti: otto partecipanti coinvolti, 32 sedute completate, nessun abbandono, nessun evento avverso. Le cinque sedute di recupero e gli otto colloqui conclusivi hanno garantito continuità e una valutazione sistematica dell'esperienza.",
            "I risultati offrono indicazioni preliminari favorevoli sulla fattibilità, sull'accettabilità e sull'utilità percepita del percorso. Il dato più significativo è forse la qualità della relazione terapeutica — emerge come l'elemento centrale dell'esperienza — insieme alla possibilità concreta di adattare la modalità di erogazione alle condizioni della persona.",
            "La rilevazione svolta in ingresso e in uscita mette a disposizione, per ciascuna delle persone che desiderano proseguire, un quadro individuale su ciò che è stato appreso, ciò che è stato trasferito nella quotidianità e ciò che resta da consolidare. Su questa base un secondo blocco di sedute può essere programmato su obiettivi personalizzati.",
          ]} />
          <div className="area-card fade-in" style={{ marginTop: "2.5rem", background: "var(--navy)", border: "none" }}>
            <h3 style={{ color: "var(--white)" }}>Per l'evoluzione di FibroMental</h3>
            <p style={{ color: "rgba(255,255,255,.75)" }}>
              Ampliare lo spazio iniziale dedicato alla conoscenza dei bisogni; mantenere la flessibilità tra modalità immersiva, non immersiva e a distanza; personalizzare scenari, durata dell'immersione e alternanza tra dialogo ed esercizi; integrare strumenti clinici standardizzati nelle successive valutazioni.
            </p>
          </div>
        </div>
      </section>

      {/* Nota dati */}
      <section className="page-section cream" style={{ padding: "3rem 6vw" }}>
        <div className="section-inner centered fade-in" style={{ textAlign: "center" }}>
          <p style={{ fontSize: ".8rem", color: "var(--gray)", lineHeight: 1.7, maxWidth: 720, margin: "0 auto", fontWeight: 300 }}>
            Tutte le informazioni in questo report sono presentate in forma aggregata e anonima. Non compaiono nomi, iniziali, età, date individuali o altri elementi identificativi. Le citazioni sono state selezionate tra quelle utilizzabili in forma anonima. I dati clinici individuali sono conservati separatamente dal personale sanitario, ai sensi del Regolamento (UE) 2016/679.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
