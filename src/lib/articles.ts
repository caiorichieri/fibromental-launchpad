import sleepCover from "../assets/blog-sonno-fibromialgia.jpg";
import centralSensitizationCover from "../assets/blog-sensibilizzazione-centrale.jpg";
import boomBustCover from "../assets/blog-boom-bust.jpg";
import catastrophizingCover from "../assets/blog-catastrofizzazione.jpg";
import virtualRealityCover from "../assets/blog-vr-dolore-cronico.jpg";
import acceptanceCover from "../assets/blog-act-accettazione.jpg";
import integratedTherapiesCover from "../assets/blog-cbt-act-mindfulness.jpg";
import invaliditaCover from "../assets/blog-invalidita-fibromialgia.jpg";
import type { Tables } from "../integrations/supabase/types";

export type Article = {
  slug: string;
  tag: string;
  title: string;
  excerpt: string;
  source: string;
  readTime: string;
  coverImage: string;
  coverAlt: string;
  paragraphs: string[];
};

export type BlogArticleRow = Tables<"blog_articles">;

export const articles: Article[] = [
  {
    slug: "sonno-fibromialgia",
    tag: "Sonno · Sistema nervoso",
    title: "Perché dormo male anche quando sono esausta?",
    excerpt: "La fibromialgia e il sonno non riparatore: cosa succede durante la notte, perché dormire non basta.",
    source: "Moldofsky (1975) · HRV e FM",
    readTime: "5 min",
    coverImage: sleepCover,
    coverAlt: "Persona che riposa su sfondo crema con sole arancione e forme blu, simbolo del sonno non riparatore nella fibromialgia",
    paragraphs: [
      "Nella fibromialgia il sonno può diventare un territorio contraddittorio: si arriva a letto esausti, ma il corpo non riesce davvero a recuperare.",
      "La letteratura descrive da decenni il sonno non riparatore come uno degli elementi centrali della condizione. Non è semplice insonnia: è una difficoltà del sistema nervoso a scendere di tono e a mantenere fasi di riposo profonde e continue.",
      "Per questo dormire molte ore non sempre significa svegliarsi riposati. Il punto non è solo quanto si dorme, ma in quale stato resta il sistema mentre si dorme.",
      "Nel percorso FibroMental il lavoro psicologico non sostituisce la valutazione medica, ma aiuta a creare condizioni di regolazione: meno allerta, più prevedibilità, una relazione più gentile con i segnali del corpo."
    ]
  },
  {
    slug: "sensibilizzazione-centrale",
    tag: "Neurobiologia",
    title: "Sensibilizzazione centrale: cos’è davvero e perché cambia tutto",
    excerpt: "Non è “tutto nella testa” — è nel sistema nervoso, ed è documentato.",
    source: "Yunus (2007) IASP · Clauw (2014) JAMA",
    readTime: "6 min",
    coverImage: centralSensitizationCover,
    coverAlt: "Illustrazione di percorsi nervosi luminosi su fondo navy per rappresentare la sensibilizzazione centrale",
    paragraphs: [
      "La sensibilizzazione centrale descrive un sistema nervoso che amplifica segnali che normalmente resterebbero più bassi o più circoscritti.",
      "Questo non rende il dolore meno reale. Al contrario: aiuta a spiegare perché il dolore può essere intenso anche quando gli esami tradizionali non mostrano una lesione proporzionata.",
      "Capire questo meccanismo cambia lo sguardo: non si tratta di convincersi che il dolore non esista, ma di lavorare con un sistema che ha imparato a proteggersi troppo.",
      "Quando il sistema nervoso apprende, può anche apprendere diversamente. È qui che tecniche psicologiche evidence-based e lavoro corporeo indiretto possono diventare rilevanti."
    ]
  },
  {
    slug: "ciclo-boom-bust",
    tag: "Comportamento · Pacing",
    title: "Il ciclo boom-bust: perché i giorni buoni peggiorano quelli cattivi",
    excerpt: "Un meccanismo che quasi tutti riconoscono — ma pochi capiscono davvero.",
    source: "Vlaeyen & Linton (2000) · pacing e FM",
    readTime: "5 min",
    coverImage: boomBustCover,
    coverAlt: "Onde colorate che salgono e scendono su fondo navy, metafora del ciclo boom-bust",
    paragraphs: [
      "Molte persone alternano giorni in cui provano a recuperare tutto e giorni in cui il corpo presenta il conto. È il ciclo boom-bust.",
      "Nei giorni migliori si tende a fare troppo, spesso per senso di colpa o per desiderio di normalità. Nei giorni successivi aumentano dolore, fatica e frustrazione.",
      "Il pacing non significa fare meno per sempre. Significa imparare a distribuire l’energia in modo più prevedibile, così che il sistema nervoso non debba continuamente oscillare tra spinta e collasso.",
      "Il lavoro clinico aiuta a riconoscere i segnali precoci e a costruire scelte sostenibili, senza trasformare la vita in una lista di rinunce."
    ]
  },
  {
    slug: "catastrofizzazione-dolore",
    tag: "Cognizione · Dolore",
    title: "Catastrofizzare il dolore non è una scelta. È neurobiologia.",
    excerpt: "Un meccanismo neurologico misurabile — e su cui si può lavorare.",
    source: "Sullivan et al. (1995) · Desdentado et al., PMC 2024",
    readTime: "6 min",
    coverImage: catastrophizingCover,
    coverAlt: "Cervello stilizzato con segnali luminosi, immagine editoriale sulla catastrofizzazione del dolore",
    paragraphs: [
      "Quando il dolore dura a lungo, la mente prova ad anticiparlo. Cerca pattern, pericoli, conseguenze. A volte lo fa in modo insistente.",
      "La catastrofizzazione non è debolezza né pessimismo volontario. È una strategia di allerta che nasce per proteggere, ma può finire per amplificare l’esperienza dolorosa.",
      "Lavorarci non significa pensare positivo. Significa imparare a riconoscere il circuito, dare un nome ai pensieri, ridurre la fusione con le previsioni più minacciose.",
      "In questo spazio CBT e ACT offrono strumenti concreti: non per negare il dolore, ma per ridurre il potere che il dolore ha sull’intero campo mentale."
    ]
  },
  {
    slug: "realta-virtuale-dolore-cronico",
    tag: "Realtà virtuale · Ricerca",
    title: "Cosa fa la realtà virtuale al dolore cronico — e perché funziona",
    excerpt: "Cosa dicono le meta-analisi più recenti specificamente sulla fibromialgia.",
    source: "Brea-Gómez et al. (2025) · Seong JMIR (2025) · Cortés-Pérez (2025)",
    readTime: "7 min",
    coverImage: virtualRealityCover,
    coverAlt: "Visore di realtà virtuale in ambiente immersivo con luci rosa e arancio",
    paragraphs: [
      "La realtà virtuale immersiva non è un effetto speciale applicato alla terapia. È un modo per offrire al sistema nervoso un ambiente credibile in cui sperimentare uno stato diverso.",
      "Nel dolore cronico, l’attenzione, il senso di presenza e la risposta fisiologica all’ambiente possono modificare temporaneamente il volume dell’esperienza dolorosa.",
      "Le ricerche più recenti mostrano risultati promettenti, soprattutto quando la VR è integrata in percorsi clinici e non usata come strumento isolato.",
      "In FibroMental l’ambiente immersivo resta dentro una relazione terapeutica: non sostituisce il terapeuta, ma amplia ciò che può essere vissuto durante il percorso."
    ]
  },
  {
    slug: "accettazione-dolore-act",
    tag: "Psicologia · ACT",
    title: "Accettare il dolore non significa arrendersi",
    excerpt: "La differenza tra rassegnazione e accettazione che per molte persone cambia tutto.",
    source: "Eastwood & Godfrey (2024) · Heagney & Adams (2024)",
    readTime: "5 min",
    coverImage: acceptanceCover,
    coverAlt: "Mani aperte su sfondo crema con forme astratte nei colori FibroMental, simbolo di accettazione ACT",
    paragraphs: [
      "La parola accettazione può suonare dura. Per molte persone sembra voler dire: smetti di cercare aiuto, rassegnati, sopporta.",
      "Nell’ACT significa qualcosa di diverso: smettere di consumare tutte le energie nella lotta contro ciò che in quel momento non può essere eliminato del tutto, per tornare a muoversi verso ciò che conta.",
      "Accettare non vuol dire approvare il dolore. Vuol dire ridurre la quantità di vita che il dolore riesce a sequestrare.",
      "Questo passaggio è delicato e personale. Per questo ha senso affrontarlo dentro una relazione clinica, con rispetto dei tempi e della storia di ciascuno."
    ]
  },
  {
    slug: "cbt-act-mindfulness-fibromialgia",
    tag: "CBT · ACT · Mindfulness",
    title: "CBT, ACT o mindfulness? Cosa funziona davvero per la fibromialgia",
    excerpt: "Tre approcci a confronto — e perché integrarli funziona meglio che sceglierne uno solo.",
    source: "Heagney & Adams (2024) · Eastwood & Godfrey (2024) · PMC 2024",
    readTime: "7 min",
    coverImage: integratedTherapiesCover,
    coverAlt: "Percorsi astratti che convergono su fondo navy per rappresentare CBT, ACT e mindfulness integrate",
    paragraphs: [
      "CBT, ACT e mindfulness clinica intervengono su aspetti diversi della stessa esperienza: pensieri, comportamenti, attenzione, relazione con il corpo.",
      "La CBT aiuta a riconoscere cicli che mantengono sofferenza e limitazione. L’ACT lavora sulla flessibilità psicologica. La mindfulness clinica allena una presenza meno reattiva verso le sensazioni.",
      "Nella fibromialgia raramente basta un solo strumento. Il quadro cambia da persona a persona, e anche nella stessa persona può cambiare nel tempo.",
      "Integrare significa scegliere con criterio: partire da ciò che serve ora, adattare il percorso, mantenere rigore clinico senza trasformare la terapia in un protocollo rigido."
    ]
  },
  {
    slug: "invalidita-fibromialgia-italia",
    tag: "Diritti · Invalidità civile",
    title: "Invalidità civile e fibromialgia in Italia: guida aggiornata",
    excerpt: "Cosa prevede oggi l'INPS, cosa dicono i LEA e come muoversi tra certificati, commissioni e riconoscimento della malattia.",
    source: "INPS · Ministero della Salute (LEA) · AISF",
    readTime: "9 min",
    coverImage: invaliditaCover,
    coverAlt: "Illustrazione editoriale con silhouette di una donna che regge documenti medici e una bilancia della giustizia, simbolo del percorso di riconoscimento dell'invalidità per fibromialgia",
    paragraphs: [
      "La fibromialgia in Italia vive ancora in una zona grigia dal punto di vista del riconoscimento istituzionale. Non è inserita nei Livelli Essenziali di Assistenza (LEA) come malattia cronica invalidante e non compare nelle tabelle ministeriali usate dalle commissioni INPS per calcolare direttamente una percentuale di invalidità civile.",
      "Questo non significa che una persona con fibromialgia non possa ottenere l'invalidità civile. Significa che il riconoscimento passa per una valutazione funzionale complessiva, spesso costruita a partire dalle comorbidità e dall'impatto reale della malattia sulla vita quotidiana, lavorativa e relazionale.",
      "In pratica la commissione medica valuta la riduzione della capacità lavorativa e dell'autonomia personale. La diagnosi di fibromialgia da sola raramente basta: pesano molto la documentazione clinica dettagliata, le patologie associate (disturbi del sonno, sindrome del colon irritabile, cefalea, disturbi dell'umore) e una relazione specialistica che descriva con precisione limitazioni e frequenza dei sintomi.",
      "Il primo passo formale è il certificato medico introduttivo (SS3), compilato online da un medico certificatore accreditato INPS — spesso il medico di famiglia. Con il numero di protocollo di quel certificato si presenta la domanda di invalidità civile all'INPS entro 90 giorni, direttamente dal portale o tramite patronato.",
      "Dopo la domanda l'INPS convoca alla visita presso la Commissione Medica ASL, integrata da un medico INPS. Alla visita conviene portare: relazione del reumatologo o del centro di riferimento, esami strumentali, diario del dolore, certificazioni relative a comorbidità e terapie in corso. Più la documentazione è ordinata e coerente, più è semplice per la commissione ricostruire il quadro reale.",
      "Le percentuali che vengono riconosciute variano molto. In assenza di una voce specifica per la fibromialgia, i medici usano per analogia le tabelle di altre patologie reumatologiche o del dolore cronico. Molti verbali si collocano tra il 46% e il 74%, soglie che aprono a benefici come esenzione dal ticket per patologia (in alcune Regioni), collocamento mirato al lavoro (dal 46%) e assegno mensile di assistenza (dal 74%, con requisiti di reddito). L'invalidità totale (100%) e l'indennità di accompagnamento restano riservate a quadri gravissimi, spesso con comorbidità importanti.",
      "Sul fronte regionale la situazione è disomogenea. Alcune Regioni — tra cui Valle d'Aosta, Friuli Venezia Giulia, Toscana ed Emilia-Romagna in momenti diversi — hanno introdotto delibere che riconoscono la fibromialgia come malattia cronica ai fini di percorsi diagnostico-terapeutici dedicati o esenzioni parziali. A livello nazionale, invece, il riconoscimento nei LEA è oggetto di proposte di legge discusse ormai da anni ma non ancora approvate.",
      "In caso di verbale insoddisfacente esistono due strade: chiedere l'aggravamento se il quadro clinico peggiora nel tempo, oppure impugnare il verbale con l'Accertamento Tecnico Preventivo (ATP) entro sei mesi. In entrambi i casi il supporto di un patronato o di un legale esperto in previdenza aiuta a evitare errori formali che costano mesi di attesa.",
      "Da un punto di vista psicologico questo percorso è faticoso: implica raccontare più volte il proprio dolore a persone che non lo vedono, con il rischio di sentirsi messi in dubbio. È una parte del carico invisibile della malattia. Prendersene cura non significa solo compilare moduli, ma anche proteggere il proprio equilibrio mentre si attraversa la burocrazia.",
      "In FibroMental non offriamo consulenza legale né compiliamo domande INPS: quel lavoro spetta a medici certificatori, patronati e avvocati. Il nostro percorso psicologico può però affiancare le persone che vivono il peso emotivo del riconoscimento, aiutandole a mantenere risorse, chiarezza e una relazione più sostenibile con la propria condizione, qualunque sia l'esito della valutazione."
    ]
  }
];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function articleFromBlogRow(row: BlogArticleRow): Article {
  const seedArticle = articles.find((article) => article.slug === row.slug);
  const savedCover = row.cover_image_url || "";
  const isValidUrl = /^https?:\/\//i.test(savedCover);
  const coverImage = isValidUrl ? savedCover : seedArticle?.coverImage || integratedTherapiesCover;
  return {
    slug: row.slug,
    tag: row.tag,
    title: row.title,
    excerpt: row.excerpt,
    source: row.source || "FibroMental",
    readTime: row.read_time,
    coverImage,
    coverAlt: row.cover_alt || row.title,
    paragraphs: row.paragraphs,
  };
}

export function mergeArticles(databaseArticles: Article[]) {
  const databaseSlugs = new Set(databaseArticles.map((article) => article.slug));
  return [...databaseArticles, ...articles.filter((article) => !databaseSlugs.has(article.slug))];
}
