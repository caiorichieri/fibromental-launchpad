import sleepCover from "../assets/blog-sonno-fibromialgia.jpg";
import centralSensitizationCover from "../assets/blog-sensibilizzazione-centrale.jpg";
import boomBustCover from "../assets/blog-boom-bust.jpg";
import catastrophizingCover from "../assets/blog-catastrofizzazione.jpg";
import virtualRealityCover from "../assets/blog-vr-dolore-cronico.jpg";
import acceptanceCover from "../assets/blog-act-accettazione.jpg";
import integratedTherapiesCover from "../assets/blog-cbt-act-mindfulness.jpg";
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
