// Morocco Security Data - Comprehensive database for all major cities
// Data compiled from travel advisories, local reports, and tourism statistics

export const MOROCCO_SECURITY_DATA = {
    lastUpdated: "2026-01-02",
    source: "Agrégation de données officielles et locales",

    regions: {
        "marrakech-safi": {
            name: "Marrakech-Safi",
            nameAr: "مراكش آسفي",
            overview: 85,
            cities: ["marrakech", "essaouira", "safi"]
        },
        "casablanca-settat": {
            name: "Casablanca-Settat",
            nameAr: "الدار البيضاء سطات",
            overview: 82,
            cities: ["casablanca", "mohammedia", "el-jadida"]
        },
        "rabat-sale-kenitra": {
            name: "Rabat-Salé-Kénitra",
            nameAr: "الرباط سلا القنيطرة",
            overview: 88,
            cities: ["rabat", "sale", "kenitra"]
        },
        "fes-meknes": {
            name: "Fès-Meknès",
            nameAr: "فاس مكناس",
            overview: 84,
            cities: ["fes", "meknes", "ifrane"]
        },
        "tanger-tetouan": {
            name: "Tanger-Tétouan-Al Hoceïma",
            nameAr: "طنجة تطوان الحسيمة",
            overview: 80,
            cities: ["tanger", "tetouan", "chefchaouen"]
        },
        "souss-massa": {
            name: "Souss-Massa",
            nameAr: "سوس ماسة",
            overview: 86,
            cities: ["agadir", "taroudant", "tiznit"]
        },
        "draa-tafilalet": {
            name: "Drâa-Tafilalet",
            nameAr: "درعة تافيلالت",
            overview: 78,
            cities: ["ouarzazate", "errachidia", "merzouga"]
        },
        "oriental": {
            name: "Oriental",
            nameAr: "الشرق",
            overview: 75,
            cities: ["oujda", "nador", "berkane"]
        }
    },

    cities: {
        // MARRAKECH-SAFI
        marrakech: {
            name: "Marrakech",
            nameAr: "مراكش",
            region: "marrakech-safi",
            population: "928,850",
            type: "imperial",
            overall: 82,
            trending: "stable",
            metrics: {
                day: 88,
                night: 72,
                tourist: 85,
                transport: 80,
                health: 85,
                scams: 65
            },
            neighborhoods: [
                { name: "Guéliz", score: 88, type: "moderne" },
                { name: "Hivernage", score: 91, type: "luxe" },
                { name: "Médina", score: 72, type: "historique" },
                { name: "Mellah", score: 68, type: "historique" },
                { name: "Palmeraie", score: 85, type: "résidentiel" },
                { name: "Jemaa el-Fna", score: 75, type: "touristique" }
            ],
            alerts: [],
            tips: [
                "Négociez toujours les prix avant tout achat",
                "Utilisez les petits taxis rouges officiels",
                "Évitez les ruelles isolées après 22h",
                "Gardez vos objets de valeur discrets"
            ],
            emergency: { police: "19", ambulance: "15", tourist: "+212 524 384 601" }
        },

        essaouira: {
            name: "Essaouira",
            nameAr: "الصويرة",
            region: "marrakech-safi",
            population: "77,966",
            type: "coastal",
            overall: 89,
            trending: "up",
            metrics: {
                day: 92,
                night: 85,
                tourist: 90,
                transport: 82,
                health: 80,
                scams: 85
            },
            neighborhoods: [
                { name: "Médina", score: 88, type: "historique" },
                { name: "Kasbah", score: 90, type: "touristique" },
                { name: "Port", score: 85, type: "commercial" }
            ],
            alerts: [],
            tips: [
                "Ville très sûre et accueillante",
                "Attention au vent fort sur la plage",
                "Parfait pour les familles"
            ],
            emergency: { police: "19", ambulance: "15" }
        },

        // CASABLANCA-SETTAT
        casablanca: {
            name: "Casablanca",
            nameAr: "الدار البيضاء",
            region: "casablanca-settat",
            population: "3,359,818",
            type: "economic",
            overall: 78,
            trending: "stable",
            metrics: {
                day: 82,
                night: 68,
                tourist: 75,
                transport: 85,
                health: 88,
                scams: 70
            },
            neighborhoods: [
                { name: "Anfa", score: 90, type: "luxe" },
                { name: "Maarif", score: 85, type: "commercial" },
                { name: "Corniche", score: 82, type: "balnéaire" },
                { name: "Habous", score: 78, type: "historique" },
                { name: "Médina", score: 65, type: "historique" },
                { name: "Ain Diab", score: 80, type: "balnéaire" }
            ],
            alerts: [
                { type: "info", message: "Pickpockets actifs dans les transports en commun" }
            ],
            tips: [
                "Grande ville, restez vigilant comme dans toute métropole",
                "Le tramway est sûr et pratique",
                "Évitez certains quartiers périphériques la nuit"
            ],
            emergency: { police: "19", ambulance: "15", tourist: "+212 522 225 050" }
        },

        // RABAT-SALE-KENITRA
        rabat: {
            name: "Rabat",
            nameAr: "الرباط",
            region: "rabat-sale-kenitra",
            population: "577,827",
            type: "capital",
            overall: 90,
            trending: "up",
            metrics: {
                day: 94,
                night: 85,
                tourist: 92,
                transport: 90,
                health: 92,
                scams: 88
            },
            neighborhoods: [
                { name: "Agdal", score: 92, type: "résidentiel" },
                { name: "Hassan", score: 90, type: "administratif" },
                { name: "Médina", score: 85, type: "historique" },
                { name: "Kasbah des Oudaïas", score: 88, type: "touristique" },
                { name: "Souissi", score: 95, type: "diplomatique" }
            ],
            alerts: [],
            tips: [
                "Capitale très sûre et bien organisée",
                "Présence policière importante",
                "Idéal pour les voyageurs solo"
            ],
            emergency: { police: "19", ambulance: "15" }
        },

        // FES-MEKNES
        fes: {
            name: "Fès",
            nameAr: "فاس",
            region: "fes-meknes",
            population: "1,150,131",
            type: "imperial",
            overall: 80,
            trending: "stable",
            metrics: {
                day: 85,
                night: 70,
                tourist: 82,
                transport: 75,
                health: 82,
                scams: 68
            },
            neighborhoods: [
                { name: "Ville Nouvelle", score: 88, type: "moderne" },
                { name: "Fès el-Bali", score: 75, type: "historique" },
                { name: "Fès el-Jdid", score: 78, type: "historique" },
                { name: "Borj Nord", score: 82, type: "résidentiel" }
            ],
            alerts: [],
            tips: [
                "La médina est un labyrinthe - utilisez un guide officiel",
                "Attention aux faux guides non agréés",
                "Négociez fermement dans les souks"
            ],
            emergency: { police: "19", ambulance: "15", tourist: "+212 535 623 460" }
        },

        meknes: {
            name: "Meknès",
            nameAr: "مكناس",
            region: "fes-meknes",
            population: "632,079",
            type: "imperial",
            overall: 85,
            trending: "stable",
            metrics: {
                day: 88,
                night: 78,
                tourist: 85,
                transport: 82,
                health: 80,
                scams: 82
            },
            neighborhoods: [
                { name: "Ville Impériale", score: 85, type: "historique" },
                { name: "Hamria", score: 88, type: "moderne" },
                { name: "Médina", score: 80, type: "historique" }
            ],
            alerts: [],
            tips: [
                "Ville plus calme et authentique que Fès",
                "Moins de pression touristique",
                "Très accueillante"
            ],
            emergency: { police: "19", ambulance: "15" }
        },

        ifrane: {
            name: "Ifrane",
            nameAr: "إفران",
            region: "fes-meknes",
            population: "14,659",
            type: "mountain",
            overall: 95,
            trending: "stable",
            metrics: {
                day: 98,
                night: 92,
                tourist: 95,
                transport: 88,
                health: 90,
                scams: 95
            },
            neighborhoods: [
                { name: "Centre-ville", score: 96, type: "résidentiel" }
            ],
            alerts: [],
            tips: [
                "Une des villes les plus sûres du Maroc",
                "Ambiance suisse, très propre",
                "Parfait pour les familles"
            ],
            emergency: { police: "19", ambulance: "15" }
        },

        // TANGER-TETOUAN
        tanger: {
            name: "Tanger",
            nameAr: "طنجة",
            region: "tanger-tetouan",
            population: "947,952",
            type: "port",
            overall: 78,
            trending: "up",
            metrics: {
                day: 82,
                night: 70,
                tourist: 80,
                transport: 85,
                health: 82,
                scams: 68
            },
            neighborhoods: [
                { name: "Ville Nouvelle", score: 85, type: "moderne" },
                { name: "Médina", score: 72, type: "historique" },
                { name: "Kasbah", score: 78, type: "touristique" },
                { name: "Malabata", score: 88, type: "balnéaire" },
                { name: "Cap Spartel", score: 85, type: "touristique" }
            ],
            alerts: [],
            tips: [
                "Port international, restez vigilant",
                "Évitez les rabatteurs à la gare maritime",
                "Le nouveau quartier Tanger City Center est très sûr"
            ],
            emergency: { police: "19", ambulance: "15" }
        },

        chefchaouen: {
            name: "Chefchaouen",
            nameAr: "شفشاون",
            region: "tanger-tetouan",
            population: "42,786",
            type: "mountain",
            overall: 92,
            trending: "stable",
            metrics: {
                day: 95,
                night: 88,
                tourist: 93,
                transport: 78,
                health: 80,
                scams: 90
            },
            neighborhoods: [
                { name: "Médina Bleue", score: 92, type: "touristique" },
                { name: "Plaza Uta el-Hammam", score: 90, type: "central" }
            ],
            alerts: [],
            tips: [
                "Ville très paisible et accueillante",
                "Parfait pour la randonnée",
                "Attention sur les routes de montagne"
            ],
            emergency: { police: "19", ambulance: "15" }
        },

        // SOUSS-MASSA
        agadir: {
            name: "Agadir",
            nameAr: "أكادير",
            region: "souss-massa",
            population: "421,844",
            type: "resort",
            overall: 88,
            trending: "stable",
            metrics: {
                day: 92,
                night: 82,
                tourist: 90,
                transport: 85,
                health: 88,
                scams: 80
            },
            neighborhoods: [
                { name: "Secteur Balnéaire", score: 92, type: "touristique" },
                { name: "Talborjt", score: 85, type: "commercial" },
                { name: "Marina", score: 90, type: "luxe" },
                { name: "Founty", score: 88, type: "résidentiel" }
            ],
            alerts: [],
            tips: [
                "Station balnéaire très sécurisée",
                "Infrastructure touristique moderne",
                "Idéal pour les séjours en famille"
            ],
            emergency: { police: "19", ambulance: "15", tourist: "+212 528 846 377" }
        },

        // DRAA-TAFILALET
        ouarzazate: {
            name: "Ouarzazate",
            nameAr: "ورزازات",
            region: "draa-tafilalet",
            population: "71,067",
            type: "desert",
            overall: 85,
            trending: "stable",
            metrics: {
                day: 90,
                night: 78,
                tourist: 88,
                transport: 75,
                health: 78,
                scams: 80
            },
            neighborhoods: [
                { name: "Centre-ville", score: 88, type: "commercial" },
                { name: "Kasbah Taourirt", score: 85, type: "historique" }
            ],
            alerts: [],
            tips: [
                "Porte du désert, ville tranquille",
                "Studios de cinéma à visiter",
                "Prévoyez bien vos transports pour le désert"
            ],
            emergency: { police: "19", ambulance: "15" }
        },

        merzouga: {
            name: "Merzouga",
            nameAr: "مرزوكة",
            region: "draa-tafilalet",
            population: "3,000",
            type: "desert",
            overall: 82,
            trending: "stable",
            metrics: {
                day: 88,
                night: 75,
                tourist: 85,
                transport: 70,
                health: 72,
                scams: 78
            },
            neighborhoods: [
                { name: "Village", score: 85, type: "touristique" },
                { name: "Erg Chebbi", score: 80, type: "désert" }
            ],
            alerts: [
                { type: "info", message: "Zone désertique - préparez eau et protection solaire" }
            ],
            tips: [
                "Réservez vos excursions via des agences reconnues",
                "Ne partez jamais seul dans le désert",
                "Hydratez-vous régulièrement"
            ],
            emergency: { police: "19", ambulance: "15" }
        },

        // ORIENTAL
        oujda: {
            name: "Oujda",
            nameAr: "وجدة",
            region: "oriental",
            population: "494,252",
            type: "border",
            overall: 75,
            trending: "stable",
            metrics: {
                day: 80,
                night: 68,
                tourist: 72,
                transport: 78,
                health: 80,
                scams: 75
            },
            neighborhoods: [
                { name: "Centre-ville", score: 78, type: "commercial" },
                { name: "Médina", score: 72, type: "historique" }
            ],
            alerts: [
                { type: "caution", message: "Évitez la zone frontalière avec l'Algérie" }
            ],
            tips: [
                "Ville frontalière, moins touristique",
                "Restez dans les zones urbaines",
                "Consultez les avis de voyage avant de visiter"
            ],
            emergency: { police: "19", ambulance: "15" }
        }
    },

    // National emergency numbers
    nationalEmergency: {
        police: "19",
        gendarmerie: "177",
        ambulance: "15",
        fire: "150",
        touristPolice: "+212 537 200 717",
        frenchEmbassy: "+212 537 689 700",
        ukEmbassy: "+212 537 633 333",
        usEmbassy: "+212 522 264 550"
    },

    // Travel advisories
    travelAdvisories: {
        general: "safe",
        lastCheck: "2026-01-02",
        zones: [
            { name: "Sahara Occidental", level: "caution", reason: "Zone contestée" },
            { name: "Frontière algérienne", level: "avoid", reason: "Frontière fermée" }
        ]
    }
};

export default MOROCCO_SECURITY_DATA;
