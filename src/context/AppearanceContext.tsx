import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";

export type ThemeMode = "light" | "dark" | "auto";
export type BgStyle = "solid" | "gradient" | "glass" | "mesh" | "aurora" | "animated" | "minimal";
export type ShadowLevel = "none" | "soft" | "medium" | "strong" | "floating";
export type ReadingWidth = "narrow" | "medium" | "wide" | "full";
export type CursorStyle = "default" | "glow" | "ai-dot" | "neon";
export type FontWeight = "100" | "300" | "400" | "500" | "600" | "700" | "800";

export const FONT_OPTIONS: string[] = [
  "Poppins","Inter","Outfit","Space Grotesk","Plus Jakarta Sans","Sora","Manrope","DM Sans","Urbanist","Lexend",
  "Montserrat","Rubik","Nunito","Work Sans","Lato","Raleway","Roboto","Open Sans","Roboto Condensed","Roboto Mono",
  "Roboto Slab","Merriweather","Playfair Display","Oswald","Source Sans 3","Source Serif 4","Source Code Pro","Ubuntu","Ubuntu Mono","Ubuntu Condensed",
  "PT Sans","PT Serif","PT Mono","Noto Sans","Noto Serif","Noto Sans Mono","Fira Sans","Fira Code","Fira Mono","IBM Plex Sans",
  "IBM Plex Serif","IBM Plex Mono","JetBrains Mono","Cabin","Karla","Titillium Web","Muli","Mulish","Barlow","Barlow Condensed",
  "Barlow Semi Condensed","Bebas Neue","Anton","Archivo","Archivo Narrow","Archivo Black","Arimo","Assistant","Baloo 2","Bitter",
  "Cairo","Catamaran","Cormorant","Cormorant Garamond","Crimson Text","Crimson Pro","Dosis","EB Garamond","Exo","Exo 2",
  "Fjalla One","Francois One","Gothic A1","Great Vibes","Heebo","Hind","Hind Madurai","Hind Siliguri","Josefin Sans","Josefin Slab",
  "Kalam","Kanit","Kumbh Sans","Libre Baskerville","Libre Franklin","Libre Caslon Text","Lobster","Lobster Two","Marcellus","Maven Pro",
  "Merienda","Monda","Monoton","Mukta","Old Standard TT","Overpass","Overpass Mono","Oxygen","Oxygen Mono","Pacifico",
  "Padauk","Paytone One","Permanent Marker","Philosopher","Piazzolla","Playball","Playfair","Prompt","Public Sans","Quattrocento",
  "Quicksand","Rajdhani","Recursive","Righteous","Roboto Flex","Rowdies","Russo One","Sacramento","Saira","Saira Condensed",
  "Sanchez","Satisfy","Secular One","Signika","Signika Negative","Slabo 27px","Space Mono","Spectral","Staatliches","Stint Ultra Expanded",
  "Syne","Tajawal","Teko","Tenor Sans","Tinos","Ultra","Varela Round","Vidaloka","Viga","Volkhov",
  "Vollkorn","Yanone Kaffeesatz","Yellowtail","Yeseva One","Zilla Slab","Abel","Abhaya Libre","Aclonica","Acme","Actor",
  "Adamina","Advent Pro","Aguafina Script","Akaya Kanadaka","Akaya Telivigala","Akronim","Alata","Alatsi","Aldrich","Alegreya",
  "Alegreya SC","Alegreya Sans","Alegreya Sans SC","Aleo","Alex Brush","Alfa Slab One","Alice","Alike","Alike Angular","Allan",
  "Allerta","Allerta Stencil","Allison","Allura","Almarai","Almendra","Amaranth","Amatic SC","Amethysta","Amiko",
  "Amiri","Amita","Anaheim","Andada Pro","Andika","Anek Bangla","Anek Devanagari","Anek Gujarati","Anek Latin","Anek Malayalam",
  "Anek Odia","Anek Tamil","Anek Telugu","Angkor","Annie Use Your Telescope","Anonymous Pro","Antic","Antic Didone","Antic Slab","Anybody",
  "Arapey","Arbutus","Arbutus Slab","Architects Daughter","Aref Ruqaa","Arizonia","Armata","Arsenal","Artifika","Arya",
  "Asap","Asap Condensed","Asar","Asset","Astloch","Asul","Athiti","Atkinson Hyperlegible","Atma","Atomic Age",
  "Aubrey","Audiowide","Autour One","Average","Average Sans","Averia Gruesa Libre","Averia Libre","Averia Sans Libre","Averia Serif Libre","Azeret Mono",
  "B612","B612 Mono","BIZ UDGothic","BIZ UDMincho","Bad Script","Bahiana","Bahianita","Bai Jamjuree","Bakbak One","Ballet",
  "Baloo Bhai 2","Baloo Bhaijaan 2","Baloo Bhaina 2","Baloo Chettan 2","Baloo Da 2","Baloo Paaji 2","Baloo Tamma 2","Baloo Tammudu 2","Baloo Thambi 2","Balthazar",
  "Bangers","Basic","Baumans","Beau Rivage","Bellefair","Belleza","Bellota","Bellota Text","BenchNine","Benne",
  "Berkshire Swash","Besley","Beth Ellen","Bevan","Big Shoulders Display","Big Shoulders Inline Display","Big Shoulders Stencil Display","Big Shoulders Text","BhuTuka Expanded One","Bigelow Rules",
  "Bigshot One","Bilbo","Bilbo Swash Caps","BioRhyme","BioRhyme Expanded","Biryani","Black And White Picture","Black Han Sans","Black Ops One","Blaka",
  "Blaka Hollow","Blinker","Bodoni Moda","Bokor","Bona Nova","Bonbon","Bonheur Royale","Boogaloo","Bowlby One","Bowlby One SC",
  "Braah One","Brawler","Bree Serif","Brygada 1918","Bubblegum Sans","Bubbler One","Buda","Buenard","Bungee","Bungee Hairline",
  "Bungee Inline","Bungee Outline","Bungee Shade","Bungee Spice","Butcherman","Butterfly Kids","Caesar Dressing","Cagliostro","Cairo Play","Caladea",
  "Calistoga","Calligraffitti","Cambay","Cambo","Candal","Cantarell","Cantata One","Cantora One","Capriola","Caramel",
  "Carattere","Cardo","Carme","Carrois Gothic","Carrois Gothic SC","Carter One","Castoro","Caudex","Caveat","Caveat Brush",
  "Cedarville Cursive","Ceviche One","Chakra Petch","Changa","Changa One","Chango","Charm","Charmonman","Chathura","Chau Philomene One",
  "Chela One","Chelsea Market","Chenla","Cherish","Cherry Cream Soda","Cherry Swash","Chewy","Chicle","Chilanka","Chivo",
  "Chivo Mono","Chonburi","Cinzel","Cinzel Decorative","Clicker Script","Coda","Coda Caption","Codystar","Coiny","Combo",
  "Comfortaa","Comforter","Comforter Brush","Comic Neue","Coming Soon","Commissioner","Concert One","Condiment","Content","Contrail One",
  "Convergence","Cookie","Copse","Corben","Corinthia","Courgette","Courier Prime","Cousine","Coustard","Covered By Your Grace",
  "Crafty Girls","Creepster","Crete Round","Croissant One","Crushed","Cuprum","Cute Font","Cutive","Cutive Mono","DM Mono",
  "DM Serif Display","DM Serif Text","Damion","Dancing Script","Dangrek","Darker Grotesque","David Libre","Dawning of a New Day","Days One","Dekko",
  "Dela Gothic One","Delius","Delius Swash Caps","Delius Unicase","Della Respira","Denk One","Devonshire","Dhurjati","Didact Gothic","Diplomata",
  "Diplomata SC","Do Hyeon","Dokdo","Domine","Donegal One","Dongle","Doppio One","Dorsa","Dr Sugiyama","Duru Sans",
  "DynaPuff","Dynalight","Eater","Economica","Eczar","Edu NSW ACT Foundation","Edu QLD Beginner","Edu SA Beginner","Edu TAS Beginner","Edu VIC WA NT Beginner",
  "Ek Mukta","El Messiri","Electrolize","Elsie","Elsie Swash Caps","Emblema One","Emilys Candy","Encode Sans","Encode Sans Condensed","Encode Sans Expanded",
  "Encode Sans SC","Encode Sans Semi Condensed","Encode Sans Semi Expanded","Engagement","Englebert","Enriqueta","Ephesis","Epilogue","Erica One","Esteban",
  "Estonia","Euphoria Script","Ewert","Expletus Sans","Explora","Fahkwang","Familjen Grotesk","Fanwood Text","Farro","Farsan",
  "Fascinate","Fascinate Inline","Faster One","Fasthand","Fauna One","Faustina","Federant","Federo","Felipa","Fenix",
  "Festive","Figtree","Finger Paint","Fjord One","Flamenco","Flavors","Fleur De Leah","Flow Block","Flow Circular","Flow Rounded",
  "Foldit","Fondamento","Fontdiner Swanky","Forum","Fragment Mono","Fraunces","Freckle Face","Fredericka the Great","Fredoka","Freehand",
  "Fresca","Frijole","Fruktur","Fugaz One","Fuggles","GFS Didot","GFS Neohellenic","Gabriela","Gaegu","Gafata",
  "Galada","Galdeano","Galindo","Gamja Flower","Gantari","Gayathri","Gelasio","Gemunu Libre","Genos","Gentium Book Basic",
  "Gentium Book Plus","Gentium Plus","Geo","Georama","Geostar","Geostar Fill","Germania One","Gideon Roman","Gidugu","Gilda Display",
  "Girassol","Give You Glory","Glass Antiqua","Glegoo","Gloock","Gloria Hallelujah","Glory","Gluten","Goblin One","Gochi Hand",
  "Goldman","Gorditas","Gothic A1","Gotu","Goudy Bookletter 1911","Gowun Batang","Gowun Dodum","Graduate","Grand Hotel","Grandstander",
  "Grape Nuts","Gravitas One","Grechen Fuemen","Grenze","Grenze Gotisch","Grey Qo","Griffy","Gruppo","Gudea","Gugi",
  "Gulzar","Gupter","Gurajada","Habibi","Hachi Maru Pop","Hahmlet","Halant","Hammersmith One","Hanalei","Hanalei Fill",
  "Handlee","Hanken Grotesk","Hanuman","Happy Monkey","Harmattan","Headland One","Hepta Slab","Herr Von Muellerhoff","Hi Melody","Hina Mincho",
  "Hind Guntur","Hind Vadodara","Holtwood One SC","Homemade Apple","Homenaje","Hubballi","Hurricane","IBM Plex Sans Arabic","IBM Plex Sans Condensed","IBM Plex Sans Devanagari",
  "IBM Plex Sans Hebrew","IBM Plex Sans KR","IBM Plex Sans Thai","IM Fell DW Pica","IM Fell DW Pica SC","IM Fell Double Pica","IM Fell English","IM Fell French Canon","IM Fell Great Primer","Ibarra Real Nova",
  "Iceberg","Iceland","Imbue","Imperial Script","Imprima","Inconsolata","Inder","Indie Flower","Ingrid Darling","Inika",
  "Inknut Antiqua","Inria Sans","Inria Serif","Inspiration","Instrument Serif","Inter Tight","Irish Grover","Island Moments","Istok Web","Italiana",
  "Italianno","Itim","Jaldi","JetBrains Mono","Jim Nightshade","Joan","Jockey One","Jolly Lodger","Jomhuria","Jomolhari",
  "Jost","Joti One","Jua","Judson","Julee","Julius Sans One","Junge","Jura","Just Another Hand","Just Me Again Down Here",
  "K2D","Kadwa","Kaisei Decol","Kaisei HarunoUmi","Kaisei Opti","Kaisei Tokumin","Kalnia","Kameron","Kanit","Kantumruy",
  "Kantumruy Pro","Karantina","Karla Tamil Inclined","Karla Tamil Upright","Karma","Katibeh","Kaushan Script","Kavivanar","Kavoon","Kdam Thmor Pro",
  "Keania One","Kelly Slab","Kenia","Khand","Khmer","Khula","Kings","Kirang Haerang","Kite One","Kiwi Maru",
  "Klee One","Knewave","KoHo","Kodchasan","Koh Santepheap","Kolker Brush","Konkhmer Sleokchher","Kosugi","Kosugi Maru","Kotta One",
  "Koulen","Kranky","Kreon","Kristi","Krona One","Krub","Kufam","Kulim Park","Kumar One","Kumar One Outline",
  "Kurale","La Belle Aurore","Labrada","Lacquer","Lalezar","Lancelot","Langar","Laila","Lakki Reddy","Lateef",
  "League Gothic","League Script","League Spartan","Leckerli One","Ledger","Lekton","Lemon","Lemonada","Lexend Deca","Lexend Exa",
  "Lexend Giga","Lexend Mega","Lexend Peta","Lexend Tera","Lexend Zetta","Libre Barcode 128","Libre Bodoni","Life Savers","Lilita One","Lily Script One",
  "Limelight","Linden Hill","Literata","Liu Jian Mao Cao","Livvic","Londrina Outline","Londrina Shadow","Londrina Sketch","Londrina Solid","Long Cang",
  "Lora","Love Light","Love Ya Like A Sister","Loved by the King","Lovers Quarrel","Luckiest Guy","Lusitana","Lustria","Luxurious Roman","Luxurious Script",
  "M PLUS 1","M PLUS 1 Code","M PLUS 1p","M PLUS 2","M PLUS Code Latin","M PLUS Rounded 1c","Ma Shan Zheng","Macondo","Macondo Swash Caps","Mada",
  "Magra","Maiden Orange","Maitree","Major Mono Display","Mako","Mali","Mallanna","Mandali","Manjari","Manrope",
  "Mansalva","Manuale","Marck Script","Margarine","Markazi Text","Marko One","Marmelad","Martel","Martel Sans","Marvel",
  "Mate","Mate SC","Maven Pro","McLaren","Mea Culpa","Meddon","MedievalSharp","Medula One","Meera Inimai","Megrim",
  "Meie Script","Meow Script","Merienda One","Merriweather Sans","Metal","Metal Mania","Metamorphous","Metrophobic","Michroma","Milonga",
  "Miltonian","Mina","Mingzat","Miniver","Miriam Libre","Mirza","Miss Fajardose","Mitr","Mochiy Pop One","Mochiy Pop P One",
  "Modak","Moderustic","Modern Antiqua","Mogra","Mohave","Molengo","Molle","Monofett","Monomaniac One","Monoton",
  "Monsieur La Doulaise","Montaga","Montagu Slab","Montecarlo","Montez","Montserrat Alternates","Montserrat Subrayada","Moo Lah Lah","Moon Dance","Moul",
  "Moulpali","Mountains of Christmas","Mouse Memoirs","Mr Bedfort","Mr Dafoe","Mr De Haviland","Mrs Saint Delafield","Mrs Sheppards","Ms Madi","Mystery Quest",
  "NTR","Nabla","Nanum Brush Script","Nanum Gothic","Nanum Gothic Coding","Nanum Myeongjo","Nanum Pen Script","Narnoor","Neonderthaw","Nerko One",
  "Neucha","Neuton","New Rocker","New Tegomin","News Cycle","Newsreader","Niconne","Niramit","Nixie One","Nobile",
  "Nokora","Norican","Nosifer","Notable","Nothing You Could Do","Noticia Text","Noto Kufi Arabic","Noto Music","Noto Nastaliq Urdu","Noto Naskh Arabic",
  "Noto Rashi Hebrew","Noto Sans Arabic","Noto Sans Armenian","Noto Sans Bengali","Noto Sans Devanagari","Noto Sans Display","Noto Sans Georgian","Noto Sans Gujarati","Noto Sans Hebrew","Noto Sans JP",
  "Noto Sans KR","Noto Sans Khmer","Noto Sans Lao","Noto Sans Malayalam","Noto Sans Myanmar","Noto Sans SC","Noto Sans Sinhala","Noto Sans TC","Noto Sans Tamil","Noto Sans Telugu",
  "Noto Sans Thai","Noto Serif Display","Noto Serif JP","Noto Serif KR","Noto Serif SC","Noto Serif TC","Nova Cut","Nova Flat","Nova Mono","Nova Oval",
  "Nova Round","Nova Script","Nova Slim","Nova Square","Numans","Nunito Sans","Odibee Sans","Odor Mean Chey","Offside","Oi",
  "Ojuju","Old Standard TT","Oldenburg","Ole","Oleo Script","Oleo Script Swash Caps","Onest","Oooh Baby","Open Sans Condensed","Oranienbaum",
  "Orbit","Orbitron","Oregano","Orelega One","Orienta","Original Surfer","Ovo","Oxanium","PT Sans Caption","PT Sans Narrow",
  "Padyakke Expanded One","Palanquin","Palanquin Dark","Palette Mosaic","Pangolin","Paprika","Parisienne","Passero One","Passion One","Passions Conflict",
  "Pathway Extreme","Pathway Gothic One","Patrick Hand","Patrick Hand SC","Pattaya","Patua One","Pavanam","Pavane","Peddana","Peralta",
  "Petemoss","Petit Formal Script","Petrona","Philosopher","Phudu","Piedra","Pinyon Script","Pirata One","Plaster","Play",
  "Playfair Display SC","Plus Jakarta Display","Podkova","Poetsen One","Poiret One","Poller One","Poly","Pompiere","Pontano Sans","Poor Story",
  "Poppins","Port Lligat Sans","Port Lligat Slab","Potta One","Pragati Narrow","Praise","Prata","Preahvihear","Press Start 2P","Pridi",
  "Princess Sofia","Prociono","Prompt","Prosto One","Proza Libre","Puritan","Purple Purse","Qahiri","Quando","Quantico",
  "Quintessential","Qwigley","Qwitcher Grypen","Racing Sans One","Radio Canada","Radley","Ranchers","Rancho","Ranga","Rasa",
  "Rationale","Ravi Prakash","Readex Pro","Red Hat Display","Red Hat Mono","Red Hat Text","Red Rose","Redacted","Redacted Script","Redressed",
  "Reem Kufi","Reem Kufi Fun","Reem Kufi Ink","Reenie Beanie","Reggae One","Rethink Sans","Revalia","Rhodium Libre","Ribeye","Ribeye Marrow",
  "Risque","Road Rage","Roboto Serif","Rochester","Rock Salt","RocknRoll One","Rokkitt","Romanesco","Ropa Sans","Rosario",
  "Rosarivo","Rouge Script","Rozha One","Ruda","Rufina","Ruge Boogie","Ruluko","Rum Raisin","Ruslan Display","Russo One",
  "Ruthie","Ruwudu","Rye","STIX Two Text","Sail","Salsa","Sarabun","Sarala","Sarina","Sarpanch",
  "Sassy Frass","Sawarabi Gothic","Sawarabi Mincho","Scada","Scheherazade New","Schibsted Grotesk","Schoolbell","Scope One","Seaweed Script","Secular One",
  "Sedgwick Ave","Sedgwick Ave Display","Sen","Send Flowers","Sevillana","Seymour One","Shadows Into Light","Shadows Into Light Two","Shalimar","Shantell Sans",
  "Shanti","Share","Share Tech","Share Tech Mono","Shippori Antique","Shippori Antique B1","Shippori Mincho","Shippori Mincho B1","Shizuru","Shojumaru",
  "Short Stack","Shrikhand","Siemreap","Sigmar","Sigmar One","Signika","Silkscreen","Simonetta","Single Day","Sintony",
  "Sirin Stencil","Six Caps","Skranji","Slackey","Smokum","Smooch","Smooch Sans","Smythe","Sniglet","Snippet",
  "Snowburst One","Sofadi One","Sofia","Solitreo","Solway","Sometype Mono","Song Myung","Sonsie One","Sora","Sorts Mill Goudy",
  "Special Elite","Spectral SC","Spicy Rice","Spinnaker","Spirax","Splash","Spline Sans","Spline Sans Mono","Squada One","Square Peg",
  "Sree Krushnadevaraya","Sriracha","Srisakdi","Staatliches","Stalemate","Stalinist One","Stardos Stencil","Stick","Stick No Bills","Stoke",
  "Strait","Style Script","Stylish","Sue Ellen Francisco","Suez One","Sulphur Point","Sumana","Sunflower","Sunshiney","Supermercado One",
  "Sura","Suranna","Suravaram","Suwannaphum","Swanky and Moo Moo","Syncopate","Syne Mono","Syne Tactile","Tapestry","Taprom",
  "Tauri","Taviraj","Text Me One","Texturina","Thasadith","The Girl Next Door","The Nautigal","Tienne","Tillana","Timmana",
  "Tiro Bangla","Tiro Devanagari Hindi","Tiro Devanagari Marathi","Tiro Devanagari Sanskrit","Tiro Gurmukhi","Tiro Kannada","Tiro Tamil","Tiro Telugu","Titan One","Tomorrow",
  "Trade Winds","Train One","Trirong","Trispace","Trocchi","Trochut","Truculenta","Trykker","Turret Road","Twinkle Star",
  "Ubuntu Sans","Ubuntu Sans Mono","Unbounded","Uncial Antiqua","Underdog","Unica One","UnifrakturCook","UnifrakturMaguntia","Unkempt","Unlock",
  "Unna","VT323","Vampiro One","Varela","Varela Round","Varta","Vast Shadow","Vazirmatn","Vesper Libre","Viaoda Libre",
  "Vibes","Vibur","Vina Sans","Voces","Vujahday Script","Waiting for the Sunrise","Wallpoet","Walter Turncoat","Warnes","Water Brush",
  "Waterfall","Wellfleet","Wendy One","Whisper","WindSong","Wire One","Wix Madefor Display","Wix Madefor Text","Work Sans","Yaldevi",
  "Yatra One","Yellowtail","Yeon Sung","Yesteryear","Yomogi","Young Serif","Yrsa","Yuji Boku","Yuji Hentaigana Akari","Yuji Hentaigana Akebono",
  "Yuji Mai","Yuji Syuku","Yusei Magic","ZCOOL KuaiLe","ZCOOL QingKe HuangYou","ZCOOL XiaoWei","Zen Antique","Zen Antique Soft","Zen Dots","Zen Kaku Gothic Antique",
  "Zen Kaku Gothic New","Zen Kurenaido","Zen Loop","Zen Maru Gothic","Zen Old Mincho","Zen Tokyo Zoo","Zeyada","Zhi Mang Xing","Zilla Slab Highlight"
];

export const ACCENT_PRESETS: { name: string; hsl: string; glow: string }[] = [
  { name: "Emerald", hsl: "152 76% 48%", glow: "152 76% 60%" },
  { name: "Blue",    hsl: "217 91% 60%", glow: "217 91% 70%" },
  { name: "Purple",  hsl: "262 83% 65%", glow: "262 83% 75%" },
  { name: "Cyan",    hsl: "189 94% 55%", glow: "189 94% 70%" },
  { name: "Orange",  hsl: "24 95% 60%",  glow: "24 95% 70%"  },
  { name: "Pink",    hsl: "330 81% 65%", glow: "330 81% 75%" },
  { name: "Red",     hsl: "0 84% 60%",   glow: "0 84% 70%"   },
  { name: "Indigo",  hsl: "239 84% 67%", glow: "239 84% 77%" },
  { name: "Violet",  hsl: "271 91% 65%", glow: "271 91% 75%" },
  { name: "Gold",    hsl: "45 93% 55%",  glow: "45 93% 65%"  },
];

export const GRADIENT_PRESETS: { name: string; from: string; to: string }[] = [
  { name: "AI Ocean",    from: "199 89% 48%", to: "189 94% 43%" },
  { name: "Aurora",      from: "152 76% 48%", to: "189 94% 55%" },
  { name: "Galaxy",      from: "262 83% 58%", to: "330 81% 60%" },
  { name: "Cyber Purple",from: "271 91% 65%", to: "217 91% 60%" },
  { name: "Royal",       from: "239 84% 67%", to: "262 83% 58%" },
  { name: "Neon",        from: "152 76% 48%", to: "189 94% 55%" },
  { name: "Matrix",      from: "142 71% 45%", to: "152 76% 48%" },
  { name: "Midnight",    from: "224 71% 25%", to: "262 83% 35%" },
  { name: "Sunset",      from: "24 95% 60%",  to: "330 81% 65%" },
];

export interface AppearanceState {
  fontFamily: string;
  fontSize: number;        // 12-24
  fontWeight: FontWeight;
  themeMode: ThemeMode;
  accent: string;          // preset name
  gradient: string;        // preset name
  bgStyle: BgStyle;
  shadow: ShadowLevel;
  hoverFx: boolean;
  glowFx: boolean;
  floatFx: boolean;
  transitionsFx: boolean;
  cursorFx: boolean;
  compact: boolean;
  readingWidth: ReadingWidth;
  cursor: CursorStyle;
}

const DEFAULT_STATE: AppearanceState = {
  fontFamily: "Space Grotesk",
  fontSize: 16,
  fontWeight: "400",
  themeMode: "dark",
  accent: "Emerald",
  gradient: "Aurora",
  bgStyle: "gradient",
  shadow: "medium",
  hoverFx: true,
  glowFx: true,
  floatFx: true,
  transitionsFx: true,
  cursorFx: false,
  compact: false,
  readingWidth: "wide",
  cursor: "default",
};

const STORAGE_KEY = "neuron-guide-appearance";

interface AppearanceCtx {
  state: AppearanceState;
  set: <K extends keyof AppearanceState>(key: K, value: AppearanceState[K]) => void;
  reset: () => void;
}

const Ctx = createContext<AppearanceCtx | null>(null);

function loadedFonts() {
  const set = new Set<string>();
  document.head.querySelectorAll<HTMLLinkElement>("link[data-appearance-font]").forEach((l) => {
    const f = l.getAttribute("data-appearance-font");
    if (f) set.add(f);
  });
  return set;
}

function loadFont(family: string) {
  if (loadedFonts().has(family)) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}:wght@100;300;400;500;600;700;800&display=swap`;
  link.setAttribute("data-appearance-font", family);
  document.head.appendChild(link);
}

function applyTheme(state: AppearanceState) {
  const root = document.documentElement;
  const body = document.body;

  // Theme mode
  const useDark =
    state.themeMode === "dark" ||
    (state.themeMode === "auto" && window.matchMedia?.("(prefers-color-scheme: dark)").matches);
  root.classList.toggle("dark", useDark);

  // Font
  loadFont(state.fontFamily);
  root.style.setProperty("--app-font-family", `"${state.fontFamily}"`);
  body.style.fontFamily = `"${state.fontFamily}", sans-serif`;
  root.style.fontSize = `${state.fontSize}px`;
  body.style.fontWeight = state.fontWeight;

  // Accent
  const accent = ACCENT_PRESETS.find((a) => a.name === state.accent) || ACCENT_PRESETS[0];
  root.style.setProperty("--primary", accent.hsl);
  root.style.setProperty("--ring", accent.hsl);
  root.style.setProperty("--accent", accent.hsl);
  root.style.setProperty("--sidebar-primary", accent.hsl);
  root.style.setProperty("--neon-purple", accent.glow);

  // Gradient
  const grad = GRADIENT_PRESETS.find((g) => g.name === state.gradient) || GRADIENT_PRESETS[0];
  root.style.setProperty("--gradient-from", grad.from);
  root.style.setProperty("--gradient-to", grad.to);

  // Shadow scale
  const shadows: Record<ShadowLevel, string> = {
    none: "0 0 0 0 transparent",
    soft: "0 4px 16px -8px hsl(var(--primary) / 0.18)",
    medium: "0 10px 30px -10px hsl(var(--primary) / 0.3)",
    strong: "0 20px 50px -10px hsl(var(--primary) / 0.45)",
    floating: "0 30px 70px -10px hsl(var(--primary) / 0.55), 0 0 40px hsl(var(--primary) / 0.2)",
  };
  root.style.setProperty("--shadow-elegant", shadows[state.shadow]);

  // Reading width
  const widths: Record<ReadingWidth, string> = {
    narrow: "640px",
    medium: "768px",
    wide: "1024px",
    full: "100%",
  };
  root.style.setProperty("--reading-max", widths[state.readingWidth]);

  // Body classes
  const classes: string[] = [];
  classes.push(`bg-style-${state.bgStyle}`);
  classes.push(`cursor-style-${state.cursor}`);
  if (state.compact) classes.push("ui-compact");
  if (!state.hoverFx) classes.push("no-hover-fx");
  if (!state.glowFx) classes.push("no-glow-fx");
  if (!state.floatFx) classes.push("no-float-fx");
  if (!state.transitionsFx) classes.push("no-transitions-fx");

  // remove previous appearance classes
  body.className = body.className
    .split(" ")
    .filter((c) => !/^(bg-style-|cursor-style-|ui-compact|no-(hover|glow|float|transitions)-fx)/.test(c))
    .concat(classes)
    .join(" ");
}

export function AppearanceProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppearanceState>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return { ...DEFAULT_STATE, ...JSON.parse(raw) };
    } catch {}
    return DEFAULT_STATE;
  });

  useEffect(() => {
    applyTheme(state);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
  }, [state]);

  useEffect(() => {
    if (state.themeMode !== "auto") return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => applyTheme(state);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [state]);

  const value = useMemo<AppearanceCtx>(() => ({
    state,
    set: (key, value) => setState((s) => ({ ...s, [key]: value })),
    reset: () => setState(DEFAULT_STATE),
  }), [state]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAppearance() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAppearance must be used inside <AppearanceProvider>");
  return v;
}
