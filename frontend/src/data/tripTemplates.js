// Morocco Trip Templates - Used for personalized trip generation
// Each template matches different travel styles and interests

export const TRIP_TEMPLATES = {
    // Experience types mapped to interests
    experiences: {
        culture: [
            { name: "Visite des médinas historiques", duration: "3h", cities: ["fes", "marrakech", "meknes"] },
            { name: "Musées et palais royaux", duration: "4h", cities: ["rabat", "marrakech", "meknes"] },
            { name: "Artisanat traditionnel", duration: "2h", cities: ["fes", "marrakech", "essaouira"] },
            { name: "Cours de calligraphie arabe", duration: "2h", cities: ["fes", "rabat"] },
            { name: "Festival de musique Gnaoua", duration: "1 jour", cities: ["essaouira"] }
        ],
        food: [
            { name: "Cours de cuisine marocaine", duration: "4h", cities: ["marrakech", "fes", "casablanca"] },
            { name: "Street food tour", duration: "3h", cities: ["marrakech", "casablanca", "fes"] },
            { name: "Dégustation de thé à la menthe", duration: "1h", cities: ["all"] },
            { name: "Dîner dans un riad", duration: "3h", cities: ["marrakech", "fes"] },
            { name: "Marché aux épices", duration: "2h", cities: ["marrakech", "fes", "casablanca"] }
        ],
        adventure: [
            { name: "Trek dans l'Atlas", duration: "1-3 jours", cities: ["imlil", "ouarzazate"] },
            { name: "Nuit dans le désert", duration: "1-2 jours", cities: ["merzouga", "zagora"] },
            { name: "Quad dans les dunes", duration: "3h", cities: ["merzouga", "agadir"] },
            { name: "Surf à Taghazout", duration: "1 jour", cities: ["agadir"] },
            { name: "Escalade à Todra", duration: "1 jour", cities: ["tinghir"] }
        ],
        relaxation: [
            { name: "Hammam traditionnel", duration: "2h", cities: ["all"] },
            { name: "Spa dans un riad", duration: "3h", cities: ["marrakech", "fes"] },
            { name: "Jardins Majorelle", duration: "2h", cities: ["marrakech"] },
            { name: "Plage d'Essaouira", duration: "1 jour", cities: ["essaouira"] },
            { name: "Thermes naturels", duration: "3h", cities: ["moulay-yacoub"] }
        ],
        shopping: [
            { name: "Souks de Marrakech", duration: "4h", cities: ["marrakech"] },
            { name: "Tapis berbères", duration: "2h", cities: ["marrakech", "ouarzazate"] },
            { name: "Céramiques de Fès", duration: "2h", cities: ["fes"] },
            { name: "Huile d'argan", duration: "1h", cities: ["essaouira", "agadir"] },
            { name: "Babouches artisanales", duration: "1h", cities: ["fes", "marrakech"] }
        ],
        nature: [
            { name: "Cascades d'Ouzoud", duration: "1 jour", cities: ["azilal"] },
            { name: "Vallée de l'Ourika", duration: "1 jour", cities: ["marrakech"] },
            { name: "Forêt de cèdres d'Azrou", duration: "3h", cities: ["ifrane"] },
            { name: "Paradise Valley", duration: "1 jour", cities: ["agadir"] },
            { name: "Parc national de Toubkal", duration: "1-2 jours", cities: ["imlil"] }
        ],
        photography: [
            { name: "Lever de soleil sur l'Erg Chebbi", duration: "3h", cities: ["merzouga"] },
            { name: "Blue Pearl Chefchaouen", duration: "1 jour", cities: ["chefchaouen"] },
            { name: "Architecture de Casablanca", duration: "3h", cities: ["casablanca"] },
            { name: "Kasbah Aït Ben Haddou", duration: "3h", cities: ["ouarzazate"] },
            { name: "Coucher de soleil à Essaouira", duration: "2h", cities: ["essaouira"] }
        ],
        nightlife: [
            { name: "Rooftop bars Marrakech", duration: "soirée", cities: ["marrakech"] },
            { name: "Jazz clubs Casablanca", duration: "soirée", cities: ["casablanca"] },
            { name: "Clubbing à Agadir", duration: "soirée", cities: ["agadir"] },
            { name: "Spectacle de Fantasia", duration: "3h", cities: ["marrakech"] }
        ]
    },

    // Pre-built itineraries for quick suggestions
    itineraries: [
        {
            id: "imperial-classic",
            name: "Les Villes Impériales",
            duration: 7,
            style: ["balanced", "luxury"],
            interests: ["culture", "photography"],
            difficulty: "facile",
            cities: ["marrakech", "rabat", "meknes", "fes"],
            highlights: ["Médinas UNESCO", "Palais royaux", "Artisanat millénaire"],
            budget: { low: 500, medium: 900, high: 1500 },
            image: "/images/trips/imperial.jpg"
        },
        {
            id: "desert-adventure",
            name: "Aventure Saharienne",
            duration: 5,
            style: ["balanced", "budget"],
            interests: ["adventure", "nature", "photography"],
            difficulty: "modéré",
            cities: ["marrakech", "ouarzazate", "merzouga"],
            highlights: ["Nuit sous les étoiles", "Dunes de l'Erg Chebbi", "Kasbahs"],
            budget: { low: 350, medium: 600, high: 1200 },
            image: "/images/trips/desert.jpg"
        },
        {
            id: "coastal-escape",
            name: "Évasion Côtière",
            duration: 6,
            style: ["relaxation", "balanced"],
            interests: ["relaxation", "food", "nature"],
            difficulty: "facile",
            cities: ["casablanca", "el-jadida", "essaouira", "agadir"],
            highlights: ["Plages atlantiques", "Fruits de mer", "Médina d'Essaouira"],
            budget: { low: 400, medium: 750, high: 1400 },
            image: "/images/trips/coastal.jpg"
        },
        {
            id: "northern-charm",
            name: "Charme du Nord",
            duration: 5,
            style: ["balanced", "budget"],
            interests: ["photography", "nature", "culture"],
            difficulty: "facile",
            cities: ["tanger", "chefchaouen", "tetouan"],
            highlights: ["Ville bleue", "Montagnes du Rif", "Héritage andalou"],
            budget: { low: 300, medium: 550, high: 1000 },
            image: "/images/trips/north.jpg"
        },
        {
            id: "luxury-retreat",
            name: "Retraite de Luxe",
            duration: 4,
            style: ["luxury"],
            interests: ["relaxation", "food"],
            difficulty: "facile",
            cities: ["marrakech"],
            highlights: ["Riads 5 étoiles", "Spas", "Gastronomie raffinée"],
            budget: { low: 800, medium: 1500, high: 3000 },
            image: "/images/trips/luxury.jpg"
        },
        {
            id: "family-discovery",
            name: "Découverte en Famille",
            duration: 8,
            style: ["balanced"],
            interests: ["culture", "nature", "adventure"],
            difficulty: "facile",
            family: true,
            cities: ["marrakech", "essaouira", "agadir"],
            highlights: ["Plages sécurisées", "Activités enfants", "Parcs aquatiques"],
            budget: { low: 600, medium: 1100, high: 2000 },
            image: "/images/trips/family.jpg"
        },
        {
            id: "foodie-tour",
            name: "Tour Gastronomique",
            duration: 6,
            style: ["balanced", "luxury"],
            interests: ["food", "culture"],
            difficulty: "facile",
            cities: ["marrakech", "fes", "casablanca"],
            highlights: ["Cours de cuisine", "Street food", "Restaurants étoilés"],
            budget: { low: 450, medium: 850, high: 1600 },
            image: "/images/trips/food.jpg"
        },
        {
            id: "backpacker-morocco",
            name: "Maroc Routard",
            duration: 14,
            style: ["budget"],
            interests: ["adventure", "culture", "nature"],
            difficulty: "modéré",
            cities: ["marrakech", "fes", "chefchaouen", "merzouga", "essaouira"],
            highlights: ["Auberges locales", "Transport partagé", "Expériences authentiques"],
            budget: { low: 250, medium: 450, high: 700 },
            image: "/images/trips/backpack.jpg"
        },
        {
            id: "photo-expedition",
            name: "Expédition Photo",
            duration: 10,
            style: ["balanced"],
            interests: ["photography", "culture", "nature"],
            difficulty: "modéré",
            cities: ["marrakech", "chefchaouen", "fes", "merzouga", "ouarzazate"],
            highlights: ["Golden hours", "Paysages variés", "Portraits locaux"],
            budget: { low: 500, medium: 900, high: 1600 },
            image: "/images/trips/photo.jpg"
        },
        {
            id: "wellness-journey",
            name: "Voyage Bien-être",
            duration: 5,
            style: ["luxury"],
            interests: ["relaxation"],
            difficulty: "facile",
            cities: ["marrakech", "agadir"],
            highlights: ["Yoga", "Hammams royaux", "Cuisine healthy"],
            budget: { low: 700, medium: 1300, high: 2500 },
            image: "/images/trips/wellness.jpg"
        }
    ],

    // City descriptions for trip generation
    cityInfo: {
        marrakech: {
            name: "Marrakech",
            tagline: "La ville rouge",
            bestFor: ["culture", "shopping", "food", "nightlife"],
            duration: "2-4 jours",
            mustSee: ["Jemaa el-Fna", "Jardins Majorelle", "Palais Bahia", "Souks"]
        },
        fes: {
            name: "Fès",
            tagline: "La capitale spirituelle",
            bestFor: ["culture", "food", "photography"],
            duration: "2-3 jours",
            mustSee: ["Médina Fès el-Bali", "Tanneries", "Médersa Bou Inania"]
        },
        chefchaouen: {
            name: "Chefchaouen",
            tagline: "La perle bleue",
            bestFor: ["photography", "relaxation", "nature"],
            duration: "1-2 jours",
            mustSee: ["Médina bleue", "Cascades d'Akchour", "Place Uta el-Hammam"]
        },
        essaouira: {
            name: "Essaouira",
            tagline: "La cité des alizés",
            bestFor: ["relaxation", "food", "culture"],
            duration: "2-3 jours",
            mustSee: ["Port", "Médina", "Plage", "Remparts"]
        },
        merzouga: {
            name: "Merzouga",
            tagline: "Les portes du Sahara",
            bestFor: ["adventure", "photography", "nature"],
            duration: "1-2 nuits",
            mustSee: ["Erg Chebbi", "Lever de soleil", "Nuit en bivouac"]
        },
        agadir: {
            name: "Agadir",
            tagline: "La station balnéaire",
            bestFor: ["relaxation", "adventure"],
            duration: "3-5 jours",
            mustSee: ["Plage", "Souk El Had", "Paradise Valley"]
        },
        casablanca: {
            name: "Casablanca",
            tagline: "La métropole moderne",
            bestFor: ["culture", "nightlife", "food"],
            duration: "1-2 jours",
            mustSee: ["Mosquée Hassan II", "Quartier Habous", "Corniche"]
        },
        rabat: {
            name: "Rabat",
            tagline: "La capitale impériale",
            bestFor: ["culture", "photography"],
            duration: "1-2 jours",
            mustSee: ["Kasbah des Oudaïas", "Tour Hassan", "Chellah"]
        },
        ouarzazate: {
            name: "Ouarzazate",
            tagline: "Hollywood africain",
            bestFor: ["culture", "photography", "adventure"],
            duration: "1-2 jours",
            mustSee: ["Aït Ben Haddou", "Studios Atlas", "Kasbah Taourirt"]
        },
        tanger: {
            name: "Tanger",
            tagline: "Porte de l'Afrique",
            bestFor: ["culture", "nightlife", "photography"],
            duration: "2-3 jours",
            mustSee: ["Kasbah", "Cap Spartel", "Grottes d'Hercule"]
        }
    }
};

export default TRIP_TEMPLATES;
