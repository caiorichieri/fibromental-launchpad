import { Link, createFileRoute } from "@tanstack/react-router";
import { ArticleCard } from "../components/fibromental/ArticleCard";
import { CONTACT_EMAIL, SiteLayout } from "../components/fibromental/Layout";
import { CtaThread, YarnFree, YarnHand, YarnHero, YarnOpen, YarnRecognition, YarnResearch } from "../components/fibromental/YarnVisuals";
import { articles } from "../lib/articles";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FibroMental — percorso psicologico per fibromialgia" },
      { name: "description", content: "FibroMental è il percorso MetaCare per lavorare su dolore cronico, sistema nervoso e fibromialgia con psicoterapia evidence-based." },
      { property: "og:title", content: "FibroMental — MetaCare" },
      { property: "og:description", content: "Un percorso psicologico per la fibromialgia, tra mente, corpo e sistema nervoso." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <SiteLayout>
      <main>
        <section className="hero">
          <div className="hero-text fade-in">
            <div className="hero-tag">Per la fibromialgia</div>
            <h1 className="display">Il tuo corpo sa quello che<br /><em>gli altri non vedono.</em></h1>
            <p className="hero-sub">FibroMental è un percorso psicologico che lavora dove il dolore ha le sue radici — nel sistema nervoso, tra mente e corpo.</p>
            <a href="#cta" className="hero-cta">Scopri come funziona <span className="arrow">→</span></a>
          </div>
          <div className="hero-visual fade-in delay-2"><YarnHero /></div>
        </section>

        <div className="bridge-patologia fade-in">
          <p>La fibromialgia è una delle condizioni più diffuse e <strong>meno comprese</strong>. Milioni di persone in Italia la vivono ogni giorno — eppure resta invisibile agli esami, difficile da spiegare, spesso ignorata da chi dovrebbe capirla per primo.</p>
          <p className="bridge-end">Se sei qui, probabilmente lo sai già.</p>
        </div>

        <section className="page-section white">
          <div className="section-inner reverse">
            <div className="fade-in">
              <div className="pill-label">La tua esperienza</div>
              <h2 className="section-title">Forse conosci<br />questa storia.</h2>
              <p className="body-text">Gli esami tornano nella norma. Il medico dice che non c'è nulla di visibile. Le persone intorno a te non riescono a capire.</p>
              <p className="body-text">Eppure il dolore c'è. La stanchezza c'è. Il momento in cui ti svegli già a pezzi c'è.</p>
              <p className="body-text">Quello che stai vivendo ha un nome preciso e una spiegazione neurologica documentata. È nel sistema nervoso — e il sistema nervoso può essere incontrato in modo diverso.</p>
            </div>
            <div className="fade-in delay-1"><YarnRecognition /></div>
          </div>
        </section>

        <section className="page-section cream">
          <div className="section-inner">
            <div className="fade-in"><YarnOpen /></div>
            <div className="fade-in delay-1">
              <div className="pill-label">Il meccanismo</div>
              <h2 className="section-title">Non è una questione di forza di volontà.</h2>
              <p className="body-text">La fibromialgia è una condizione da sensibilizzazione centrale. Il sistema nervoso, esposto a stress prolungato o a esperienze difficili, ha imparato ad amplificare. Ha alzato il volume — e da solo fatica a trovare il modo di abbassarlo.</p>
              <p className="body-text">Forse conosci quel senso di colpa. Verso chi ti aspetta, verso chi non riesci a spiegare, verso la versione di te che ricordavi. Quella sensazione è reale — ma racconta una storia sbagliata.</p>
              <p className="body-text">E i sistemi che hanno imparato possono — con le condizioni giuste — imparare qualcosa di diverso.</p>
            </div>
          </div>
        </section>

        <section className="page-section gray-light">
          <div className="section-inner" style={{ maxWidth: 820, gridTemplateColumns: "1fr" }}>
            <div className="fade-in">
              <p className="bridge-question">"Perché uno psicologo? Ho un problema nel corpo."</p>
              <p className="body-text">È la domanda più onesta che si possa fare. E merita una risposta altrettanto onesta.</p>
              <p className="body-text">La fibromialgia non è un problema psicologico. Il dolore è reale, la stanchezza è reale, i sintomi sono documentati e misurabili.</p>
              <p className="body-text">Ma forse hai già notato qualcosa. Che nei giorni in cui hai dormito un po' meglio, o in cui qualcosa ti ha preso davvero, il dolore sembrava occupare meno spazio. Non perché fosse sparito — perché il sistema nervoso era in uno stato diverso.</p>
              <p className="body-text">Mente e corpo non sono due cose separate che si influenzano a vicenda. Sono lo stesso sistema — che sente, elabora, amplifica, ricorda. Il sistema nervoso che processa il dolore fisico è lo stesso che risponde alle emozioni, allo stress, alle esperienze difficili.</p>
              <p className="body-text">Nella fibromialgia questo sistema è rimasto incastrato in un loop — dolore che genera allerta, allerta che amplifica dolore, fatica che alimenta entrambi.</p>
            </div>
          </div>
        </section>

        <section className="page-section white">
          <div className="section-inner reverse">
            <div className="fade-in">
              <div className="pill-label">Il protocollo</div>
              <h2 className="section-title">Un protocollo che lavora dove servono le parole — e dove le parole non bastano.</h2>
              <p className="body-text">FibroMental è un percorso psicologico strutturato, condotto da psicoterapeuti specializzati nel dolore cronico. Integra tecniche evidence-based — CBT, ACT, mindfulness clinica — con un ampio repertorio di strumenti che il terapeuta sceglie in base alla persona. Tra questi, per chi lo desidera, ambienti immersivi in realtà virtuale.</p>
              <p className="body-text">Una relazione terapeutica reale, in cui gli strumenti si adattano a te — non il contrario.</p>
            </div>
            <div className="fade-in delay-1"><YarnHand /></div>
          </div>
        </section>

        <section className="page-section cream">
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div className="fade-in" style={{ textAlign: "center", marginBottom: "1rem" }}>
              <div className="pill-label">Le aree di lavoro</div>
              <h2 className="section-title" style={{ maxWidth: 520, margin: "0 auto" }}>Il protocollo agisce su quattro aree specifiche.</h2>
            </div>
            <div className="aree-grid">
              {[
                ["La tensione che non se ne va", "Svegliarsi già contratti. La mascella stretta, le spalle alte, i muscoli che non riposano mai davvero — neanche nelle giornate in cui non hai fatto nulla."],
                ["Il dolore che occupa tutto lo spazio", "C'è il dolore, e poi c'è tutto il resto — ma il dolore tende a prendere tutto. Il percorso lavora sulla relazione con la sensazione dolorosa."],
                ["La stanchezza che nessuno vede", "Non è stanchezza da sforzo. È quella di chi ha il sistema nervoso acceso h24 — che monitora, anticipa, gestisce."],
                ["Il senso di non riconoscersi più", "Hai smesso di fare cose che amavi. Il percorso lavora su questo spazio — non con risposte, ma con un posto in cui quella domanda può essere tenuta."],
              ].map(([title, text], index) => (
                <div className={`area-card fade-in delay-${Math.min(index + 1, 4)}`} key={title}>
                  <h3>{title}</h3><p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="page-section app-section">
          <div className="app-inner">
            <div className="fade-in">
              <div className="app-tag">App FibroMental</div>
              <h2 className="section-title">Hai una diagnosi di fibromialgia?</h2>
              <p className="body-text">L’app FibroMental è disponibile gratuitamente per chi vive con la fibromialgia. Uno spazio digitale per restare in contatto con il proprio percorso — ogni giorno, anche tra una seduta e l’altra.</p>
              <p className="body-text">Scrivici — ti diciamo come accedere.</p>
              <Link to="/contatti" className="app-cta">Scrivici per accedere gratuitamente →</Link>
            </div>
            <div className="app-visual fade-in delay-1">
              <AppFeature icon="📓" title="Il tuo diario" text="Uno spazio in cui annotare come ti senti — giorno per giorno, con la frequenza che preferisci." />
              <AppFeature icon="🌿" title="Esercizi guidati" text="Il fiore di loto e gli esercizi di regolazione del percorso, disponibili quando ne hai bisogno." />
              <AppFeature icon="💬" title="Contenuti di supporto" text="Approfondimenti sulla fibromialgia, strumenti pratici e materiali pensati per affiancare il tuo percorso." />
            </div>
          </div>
        </section>

        <section className="page-section navy experience">
          <div className="section-inner">
            <div className="fade-in">
              <div className="pill-label">L'esperienza immersiva</div>
              <h2 className="section-title">Qualcosa che si vive, non solo si ascolta.</h2>
              <p className="body-text">Una parte del percorso si svolge in ambienti naturali immersivi — un prato, il mare — accessibili attraverso un visore. Il terapeuta è presente, in voce, nello stesso ambiente.</p>
              <p className="body-text">È il modo in cui il corpo risponde a un ambiente come se fosse reale — riducendo il tono del sistema nervoso in modo passivo.</p>
              <blockquote className="esperienza-quote">Molte persone descrivono questa esperienza come il primo momento, dopo tanto tempo, in cui il corpo ha smesso di fare fatica.</blockquote>
            </div>
            <div className="fade-in delay-1"><YarnFree /></div>
          </div>
        </section>

        <section className="page-section white">
          <div className="section-inner reverse">
            <div className="fade-in">
              <div className="pill-label">La ricerca</div>
              <h2 className="section-title">Cosa dice la ricerca.</h2>
              <p className="body-text">Le tecniche integrate in FibroMental sono evidence-based, sostenute da letteratura peer-reviewed internazionale.</p>
              <p className="body-text">CBT e ACT per la fibromialgia hanno il profilo di evidenza più solido tra gli interventi psicologici documentati per questa condizione. La realtà virtuale applicata al dolore cronico è un campo in rapida crescita.</p>
              <div className="ricerca-stats">
                <Stat number="122" label="Studi RCT" source="VR e dolore cronico · PAIN, 2023" />
                <Stat number="2.500+" label="Pazienti" source="CBT per FM · Bernardy et al., 2018" />
                <Stat number="−0.65" label="Effect size" source="VR immersiva · npj Digital Medicine, 2025" />
              </div>
            </div>
            <div className="fade-in delay-1"><YarnResearch /></div>
          </div>
        </section>

        <section id="cta" className="cta-section">
          <div className="fade-in">
            <CtaThread />
            <h2 className="display" style={{ maxWidth: 700, margin: "0 auto" }}>Chi arriva fin qui<br />sa già <em>qualcosa.</em></h2>
            <p>C’è uno psicologo a tua disposizione. Scrivici per avere informazioni o per fissare un primo appuntamento — il contatto è gratuito.</p>
            <p style={{ marginTop: ".75rem" }}>Un professionista ti risponderà direttamente e potrà rispondere a tutte le tue domande su FibroMental, sul percorso e su come iniziare.</p>
            <Link to="/contatti" className="cta-button">Scrivici — ti risponderemo entro 24 ore <span className="arrow">→</span></Link>
          </div>
        </section>

        <section className="page-section blog-section">
          <div className="blog-header fade-in">
            <div className="pill-label">Dal blog</div>
            <h2 className="section-title">Capire la fibromialgia.<br />Dalla ricerca, in parole semplici.</h2>
            <p className="body-text" style={{ fontSize: ".95rem" }}>Articoli scritti dal team MetaCare, fondati sulla letteratura scientifica internazionale.</p>
          </div>
          <div className="blog-grid">{articles.map((article, index) => <ArticleCard key={article.slug} article={article} className={`delay-${Math.min(index % 4, 4)}`} />)}</div>
        </section>

        <section className="page-section white">
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div className="fade-in" style={{ textAlign: "center", marginBottom: "2.5rem" }}>
              <div className="pill-label">I nostri progetti</div>
              <h2 className="section-title" style={{ maxWidth: 560, margin: "0 auto" }}>FibroMental in azione.</h2>
              <p className="body-text" style={{ margin: ".75rem auto 0", fontSize: ".95rem", maxWidth: 560 }}>Portiamo il protocollo dove serve — in collaborazione con associazioni e reti che lavorano a fianco delle persone con fibromialgia.</p>
            </div>
            <div className="progetti-grid">
              <div className="progetto-card active fade-in"><div className="progetto-badge live">● In corso — 2026</div><h3>Progetto con CFU FVG</h3><p>CFU mette a disposizione dei propri associati un ciclo di sedute del protocollo FibroMental.</p><a href="https://www.coordinamentofibromialgici.it" target="_blank" rel="noopener noreferrer" className="progetto-link">Visita CFU <span className="arrow">→</span></a></div>
              <div className="progetto-card upcoming fade-in delay-1"><div className="progetto-badge soon">Prossimamente</div><h3>Nuovi progetti in arrivo</h3><p>Stiamo sviluppando nuove collaborazioni con associazioni di pazienti e strutture sanitarie. Se rappresenti un’organizzazione interessata, scrivici.</p><Link to="/contatti" className="progetto-link">Proponi una collaborazione <span className="arrow">→</span></Link></div>
            </div>
          </div>
        </section>

        <section className="lavora">
          <div className="lavora-inner">
            <div className="fade-in">
              <div className="pill-label">Lavora con noi</div>
              <h2 className="section-title">Sei uno psicologo?</h2>
              <p className="body-text" style={{ marginTop: "1rem" }}>FibroMental è aperto a psicologi e psicoterapeuti che vogliono portare strumenti evidence-based nella propria pratica clinica.</p>
              <ul className="lavora-list">
                <li>Formazione specifica sul protocollo FibroMental — struttura delle sedute, tecniche, adattamenti clinici</li>
                <li>Accesso alla piattaforma MetaCare e alle stanze virtuali terapeutiche</li>
                <li>Supporto clinico e supervisione continua</li>
                <li>Possibilità di partecipare ai progetti pilota con le associazioni partner</li>
              </ul>
              <Link to="/contatti" className="lavora-cta">Scrivici per saperne di più →</Link>
            </div>
            <div className="fade-in delay-1"><div className="lavora-quote"><p>“Il vantaggio degli ambienti immersivi è che permettono di fare con i pazienti cose che la sola parola non riesce a raggiungere.”</p><cite>Team clinico MetaCare</cite></div></div>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}

function AppFeature({ icon, title, text }: { icon: string; title: string; text: string }) {
  return <div className="app-feature"><div className="app-feature-icon">{icon}</div><div><h4>{title}</h4><p>{text}</p></div></div>;
}

function Stat({ number, label, source }: { number: string; label: string; source: string }) {
  return <div className="stat"><span className="stat-num">{number}</span><span className="stat-label">{label}</span><span className="stat-source">{source}</span></div>;
}
