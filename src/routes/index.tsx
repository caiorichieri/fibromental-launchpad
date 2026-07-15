import { Link, createFileRoute } from "@tanstack/react-router";
import { ArticleCard } from "../components/fibromental/ArticleCard";
import { CONTACT_EMAIL, SiteLayout } from "../components/fibromental/Layout";
import { CtaThread, YarnFree, YarnHand, YarnHero, YarnOpen, YarnRecognition, YarnResearch } from "../components/fibromental/YarnVisuals";
import type { Article } from "../lib/articles";
import { articles as fallbackArticles } from "../lib/articles";
import { getPublishedArticles } from "../lib/blog.functions";

export const Route = createFileRoute("/")({
  loader: async () => {
    try {
      return await getPublishedArticles();
    } catch {
      return fallbackArticles;
    }
  },
  staleTime: 0,
  shouldReload: true,
  head: () => ({
    meta: [
      { title: "FibroMental — percorso psicologico per fibromialgia" },
      { name: "description", content: "FibroMental è il percorso MetaCare per lavorare su dolore cronico, sistema nervoso e fibromialgia con psicoterapia evidence-based." },
      { property: "og:title", content: "FibroMental — Percorso psicologico per la fibromialgia" },
      { property: "og:description", content: "Il percorso MetaCare per lavorare su dolore cronico, sistema nervoso e fibromialgia con psicoterapia evidence-based." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://fibromental.app/" },
    ],
    links: [
      { rel: "canonical", href: "https://fibromental.app/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Perché uno psicologo se ho un problema nel corpo?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "La fibromialgia non è un problema psicologico — il dolore è reale e documentato. Ma mente e corpo sono lo stesso sistema nervoso: lavorare sulla regolazione del sistema nervoso, sullo stress e sui pattern appresi può modificare l'amplificazione del dolore. Per questo la psicoterapia evidence-based (CBT, ACT, mindfulness) è inclusa nelle linee guida internazionali per la fibromialgia.",
              },
            },
            {
              "@type": "Question",
              name: "Cos'è la sensibilizzazione centrale?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "È il meccanismo neurobiologico alla base della fibromialgia: il sistema nervoso centrale, dopo stress prolungato o esperienze difficili, amplifica i segnali di dolore. Non è una questione di forza di volontà — è documentato in risonanza magnetica funzionale e nelle linee guida IASP.",
              },
            },
            {
              "@type": "Question",
              name: "FibroMental sostituisce il medico o i farmaci?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. FibroMental è un percorso psicologico complementare al lavoro del medico curante, del reumatologo e dell'algologo. Non sostituisce diagnosi né farmaci, ma lavora sulla regolazione del sistema nervoso, sulla qualità di vita e sulla gestione dei sintomi.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const articles = Route.useLoaderData() as Article[];
  return (
    <SiteLayout>
      <main>
        <section className="hero">
          <div className="hero-text fade-in">
            <div className="hero-tag">Per la fibromialgia</div>
            <h1 className="display text-slate-700">FibroMental — percorso psicologico per la fibromialgia</h1>
            <p className="display text-slate-700" style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", margin: ".5rem 0 0" }}>Il tuo corpo sa quello che<br /><em>gli altri non vedono.</em></p>
            <p className="hero-sub">FibroMental è un percorso psicologico che lavora dove il dolore ha le sue radici — nel sistema nervoso, tra mente e corpo.</p>
            <div className="hero-cta-group" style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "1.5rem" }}>
              <a href="#cta" className="hero-cta" style={{ background: "transparent", border: "2px solid var(--orange)", color: "var(--orange)" }}>Scopri come funziona <span className="arrow">→</span></a>
            </div>
          </div>
          <div className="hero-visual fade-in delay-2" style={{ position: "relative" }}>
            <a
              href="https://wa.me/393313904736?text=Ciao%2C%20scrivo%20dal%20sito%20FibroMental%20e%20vorrei%20parlare%20con%20uno%20psicologo."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Parla subito con uno psicologo su WhatsApp"
              className="hero-circle-cta"
            >
              <span className="hero-circle-cta-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.02 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.002-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0012.02 0C5.495 0 .184 5.31.18 11.836c0 2.086.546 4.122 1.582 5.918L.057 24l6.404-1.68a11.87 11.87 0 005.559 1.413h.005c6.522 0 11.833-5.31 11.836-11.836a11.77 11.77 0 00-3.428-8.41z"/>
                </svg>
              </span>
              <span className="hero-circle-cta-text">
                <span className="hero-circle-cta-eyebrow">Parla ora su WhatsApp</span>
                <span className="hero-circle-cta-title">Parla con uno psicologo</span>
              </span>
              <span className="hero-circle-cta-arrow" aria-hidden="true">→</span>
            </a>
            <YarnHero />
          </div>
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
          <div className="section-inner">
            <div className="fade-in">
              <div className="pill-label">Formazione · Riservato a psicologi e psicoterapeuti</div>
              <h2 className="section-title">Formazione FibroMental per psicologi e psicoterapeuti.</h2>
              <p className="body-text">Un corso clinico riservato a professionisti della salute mentale per comprendere la fibromialgia, leggere l'esperienza della persona e acquisire strumenti concreti per la psicoterapia — CBT, ACT, mindfulness clinica e realtà virtuale immersiva.</p>
              <p className="body-text">Il corso è erogato tramite una piattaforma esterna dedicata.</p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "1.25rem" }}>
                <Link to="/corsi" className="hero-cta">Scopri il corso <span className="arrow">→</span></Link>
              </div>
            </div>
            <div className="fade-in delay-1">
              <Link to="/corsi" className="area-card" style={{ display: "block", textDecoration: "none" }}>
                <div className="pill-label" style={{ marginBottom: ".5rem" }}>Corso clinico · Riservato a professionisti</div>
                <h3 style={{ margin: 0 }}>Formazione FibroMental per psicologi e psicoterapeuti</h3>
                <p style={{ marginTop: ".5rem" }}>CBT · ACT · Mindfulness clinica · Realtà virtuale immersiva. Materiali clinici, casi applicativi e attestato di partecipazione.</p>
                <p style={{ marginTop: ".75rem", fontWeight: 600 }}>Scopri il corso →</p>
              </Link>
            </div>
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
            <h2 className="display text-slate-700" style={{ maxWidth: 700, margin: "0 auto" }}>Chi arriva fin qui<br />sa già <em>qualcosa.</em></h2>
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
          <div className="blog-grid">{articles.map((article: Article, index: number) => <ArticleCard key={article.slug} article={article} className={`delay-${Math.min(index % 4, 4)}`} />)}</div>
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
              <Link to="/lavora-con-noi" className="lavora-cta">Scopri come collaborare →</Link>
            </div>
            <div className="fade-in delay-1"><div className="lavora-quote"><p>“Il vantaggio degli ambienti immersivi è che permettono di fare con i pazienti cose che la sola parola non riesce a raggiungere.”</p><cite>Team clinico MetaCare</cite></div></div>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}

function AppFeature({ icon, title, text }: { icon: string; title: string; text: string }) {
  return <div className="app-feature"><div className="app-feature-icon">{icon}</div><div><h3>{title}</h3><p>{text}</p></div></div>;
}

function Stat({ number, label, source }: { number: string; label: string; source: string }) {
  return <div className="stat"><span className="stat-num">{number}</span><span className="stat-label">{label}</span><span className="stat-source">{source}</span></div>;
}
