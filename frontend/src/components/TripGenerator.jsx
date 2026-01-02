import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Compass, Calendar, Users, Wallet, Heart, Sparkles,
    MapPin, Clock, ChevronRight, Star, RefreshCw,
    Check, ArrowRight, Plane, Camera, Utensils,
    Mountain, ShoppingBag, Palmtree, Sun, Moon,
    MessageCircle, Map, ArrowLeft
} from 'lucide-react';
import { usePreferences } from '../context/PreferencesContext';
import { TRIP_TEMPLATES } from '../data/tripTemplates';
import TourMap from './TourMap';

// City coordinates for the map
const CITY_COORDINATES = {
    marrakech: [31.6295, -7.9811],
    fes: [34.0531, -5.0003],
    chefchaouen: [35.1688, -5.2636],
    essaouira: [31.5125, -9.7700],
    merzouga: [31.0801, -4.0132],
    agadir: [30.4278, -9.5981],
    casablanca: [33.5731, -7.5898],
    rabat: [34.0209, -6.8416],
    ouarzazate: [30.9335, -6.9370],
    tanger: [35.7595, -5.8340],
    meknes: [33.8935, -5.5473],
    ifrane: [33.5228, -5.1106],
    tetouan: [35.5889, -5.3626],
    "el-jadida": [33.2316, -8.5007],
    imlil: [31.1371, -7.9197],
    zagora: [30.3286, -5.8381],
    tinghir: [31.5147, -5.5322],
    azilal: [31.9636, -6.5714],
    taroudant: [30.4727, -8.8748],
    tiznit: [29.6974, -9.7316]
};

const TripGenerator = ({ onNavigateToGuide }) => {
    const { preferences, setIsPreferencesOpen } = usePreferences();
    const [selectedTrip, setSelectedTrip] = useState(null);

    // Check if user has set preferences
    const hasPreferences = preferences.interests.length > 0;

    // Generate personalized recommendations based on preferences
    const recommendations = useMemo(() => {
        const { interests, travelStyle, familyMode, budgetRange } = preferences;

        return TRIP_TEMPLATES.itineraries
            .map(trip => {
                let score = 0;

                // Match interests
                const interestMatches = trip.interests.filter(i => interests.includes(i)).length;
                score += interestMatches * 25;

                // Match travel style
                if (trip.style.includes(travelStyle)) score += 30;

                // Match family mode
                if (familyMode && trip.family) score += 40;

                // Match budget
                if (budgetRange === 'low' && trip.style.includes('budget')) score += 20;
                if (budgetRange === 'high' && trip.style.includes('luxury')) score += 20;

                return { ...trip, matchScore: Math.min(score, 100) };
            })
            .sort((a, b) => b.matchScore - a.matchScore)
            .slice(0, 6);
    }, [preferences]);

    // Icons for interests
    const interestIcons = {
        culture: '🏛️',
        food: '🍽️',
        adventure: '🏔️',
        relaxation: '🧘',
        shopping: '🛍️',
        nature: '🌿',
        photography: '📷',
        nightlife: '🌙'
    };

    if (!hasPreferences) {
        return (
            <div className="h-full flex items-center justify-center p-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-lg text-center"
                >
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                        <Compass size={48} className="text-amber-600" />
                    </div>
                    <h2 className="text-3xl font-serif text-slate-800 mb-4">
                        Créez votre voyage sur mesure
                    </h2>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                        Dites-nous ce que vous aimez et nous créerons l'itinéraire parfait pour vous.
                        Culture, aventure, gastronomie... le Maroc s'adapte à vos envies.
                    </p>
                    <button
                        onClick={() => setIsPreferencesOpen(true)}
                        className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex items-center gap-3 mx-auto"
                    >
                        <Heart size={20} />
                        Définir mes préférences
                        <ArrowRight size={20} />
                    </button>

                    <div className="mt-12 grid grid-cols-4 gap-4">
                        {['culture', 'adventure', 'food', 'nature'].map(interest => (
                            <div key={interest} className="text-center opacity-50">
                                <div className="text-3xl mb-2">{interestIcons[interest]}</div>
                                <div className="text-xs text-gray-500 capitalize">{interest}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        );
    }

    if (selectedTrip) {
        return (
            <TripDetail
                trip={selectedTrip}
                onBack={() => setSelectedTrip(null)}
                preferences={preferences}
                onNavigateToGuide={onNavigateToGuide}
            />
        );
    }

    return (
        <div className="h-full overflow-y-auto">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 p-8 pb-12">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start justify-between"
                    >
                        <div>
                            <h1 className="text-4xl font-serif text-slate-800 mb-2">
                                {preferences.name ? `${preferences.name}, votre` : 'Votre'} voyage idéal
                            </h1>
                            <p className="text-gray-600 text-lg">
                                Basé sur vos préférences et centres d'intérêt
                            </p>
                        </div>
                        <button
                            onClick={() => setIsPreferencesOpen(true)}
                            className="p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition flex items-center gap-2 text-gray-600"
                        >
                            <RefreshCw size={18} />
                            <span className="hidden sm:inline text-sm">Modifier</span>
                        </button>
                    </motion.div>

                    {/* User Profile Summary */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mt-6 flex flex-wrap gap-2"
                    >
                        <span className="px-4 py-2 bg-white rounded-full shadow-sm flex items-center gap-2">
                            <Wallet size={16} className="text-amber-600" />
                            {preferences.travelStyle === 'luxury' ? 'Luxe' :
                                preferences.travelStyle === 'budget' ? 'Économique' : 'Équilibré'}
                        </span>
                        {preferences.interests.slice(0, 4).map(interest => (
                            <span key={interest} className="px-4 py-2 bg-white rounded-full shadow-sm flex items-center gap-2">
                                <span>{interestIcons[interest]}</span>
                                <span className="capitalize">{interest}</span>
                            </span>
                        ))}
                        {preferences.familyMode && (
                            <span className="px-4 py-2 bg-white rounded-full shadow-sm flex items-center gap-2">
                                <Users size={16} className="text-blue-600" />
                                Famille
                            </span>
                        )}
                    </motion.div>
                </div>
            </div>

            {/* Recommendations Grid */}
            <div className="p-8 -mt-6">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
                        <Sparkles size={20} className="text-amber-500" />
                        Voyages recommandés pour vous
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recommendations.map((trip, index) => (
                            <motion.div
                                key={trip.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all overflow-hidden border border-gray-100 cursor-pointer"
                                onClick={() => setSelectedTrip(trip)}
                            >
                                {/* Image placeholder with gradient */}
                                <div className="h-40 bg-gradient-to-br from-amber-100 via-orange-50 to-rose-100 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                                    {/* Match score badge */}
                                    {trip.matchScore >= 70 && (
                                        <div className="absolute top-3 left-3 px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                                            <Star size={12} fill="currentColor" />
                                            {trip.matchScore}% match
                                        </div>
                                    )}

                                    {/* Duration badge */}
                                    <div className="absolute top-3 right-3 px-3 py-1 bg-white/90 backdrop-blur text-slate-700 text-xs font-medium rounded-full flex items-center gap-1">
                                        <Calendar size={12} />
                                        {trip.duration} jours
                                    </div>

                                    {/* Decorative icons */}
                                    <div className="absolute bottom-4 left-4 flex gap-2">
                                        {trip.interests.slice(0, 3).map(interest => (
                                            <span key={interest} className="text-2xl drop-shadow-lg">
                                                {interestIcons[interest]}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-5">
                                    <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-amber-600 transition">
                                        {trip.name}
                                    </h3>

                                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                                        <MapPin size={14} />
                                        {trip.cities.slice(0, 3).map(c =>
                                            TRIP_TEMPLATES.cityInfo[c]?.name || c
                                        ).join(' → ')}
                                        {trip.cities.length > 3 && ` +${trip.cities.length - 3}`}
                                    </div>

                                    <div className="flex flex-wrap gap-1 mb-4">
                                        {trip.highlights.map((h, i) => (
                                            <span key={i} className="px-2 py-1 bg-amber-50 text-amber-700 text-xs rounded-full">
                                                {h}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-between pt-3 border-t">
                                        <div className="text-sm">
                                            <span className="text-gray-500">À partir de </span>
                                            <span className="font-bold text-slate-800">
                                                {trip.budget[preferences.budgetRange || 'medium']}€
                                            </span>
                                        </div>
                                        <button className="p-2 bg-amber-100 text-amber-600 rounded-full group-hover:bg-amber-500 group-hover:text-white transition">
                                            <ChevronRight size={18} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Quick Wizard CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-12 text-center"
                    >
                        <p className="text-gray-600 mb-4">Vous ne trouvez pas votre bonheur ?</p>
                        <button
                            onClick={() => setIsPreferencesOpen(true)}
                            className="px-6 py-3 border-2 border-amber-500 text-amber-600 rounded-xl font-medium hover:bg-amber-50 transition flex items-center gap-2 mx-auto"
                        >
                            <Compass size={20} />
                            Modifier mes préférences
                        </button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

// Trip Detail Component
const TripDetail = ({ trip, onBack, preferences, onNavigateToGuide }) => {
    const [activeDay, setActiveDay] = useState(0);

    // Generate day-by-day itinerary with coordinates
    const generateDays = () => {
        const days = [];
        const citiesInfo = TRIP_TEMPLATES.cityInfo;

        trip.cities.forEach((city, index) => {
            const info = citiesInfo[city] || { name: city, mustSee: [] };
            const coords = CITY_COORDINATES[city] || [31.6295, -7.9811];
            days.push({
                day: index + 1,
                city: info.name,
                title: info.name,
                desc: info.mustSee.slice(0, 2).join(', ') || 'Exploration de la ville',
                coordinates: coords,
                activities: info.mustSee.slice(0, 3),
                meals: ['Petit-déjeuner à l\'hôtel', 'Déjeuner découverte locale', 'Dîner spécialités'],
                transport: index < trip.cities.length - 1 ? 'Transfert vers ' + (citiesInfo[trip.cities[index + 1]]?.name || trip.cities[index + 1]) : null
            });
        });
        return days;
    };

    const days = generateDays();

    // Handle asking for more details in Guide Royal
    const handleAskGuide = (question) => {
        if (onNavigateToGuide) {
            onNavigateToGuide(question);
        }
    };

    return (
        <div className="h-full overflow-y-auto">
            {/* Hero */}
            <div className="relative h-64 bg-gradient-to-br from-amber-200 via-orange-100 to-rose-200">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <button
                    onClick={onBack}
                    className="absolute top-4 left-4 p-2 bg-white/90 backdrop-blur rounded-full shadow-lg hover:bg-white transition z-10 flex items-center gap-2"
                >
                    <ArrowLeft size={20} />
                    <span className="text-sm font-medium pr-2">Retour</span>
                </button>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h1 className="text-4xl font-serif font-bold mb-2 drop-shadow-lg">{trip.name}</h1>
                    <div className="flex items-center gap-4 text-white/90">
                        <span className="flex items-center gap-1">
                            <Calendar size={16} />
                            {trip.duration} jours
                        </span>
                        <span className="flex items-center gap-1">
                            <MapPin size={16} />
                            {trip.cities.length} étapes
                        </span>
                        <span className="flex items-center gap-1">
                            <Wallet size={16} />
                            À partir de {trip.budget[preferences.budgetRange || 'medium']}€
                        </span>
                    </div>
                </div>
            </div>

            <div className="p-8 max-w-5xl mx-auto">
                {/* Quick Info Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 -mt-12 relative z-10 mb-8">
                    {[
                        { icon: Clock, label: 'Durée', value: `${trip.duration} jours` },
                        { icon: Mountain, label: 'Difficulté', value: trip.difficulty },
                        { icon: Users, label: 'Type', value: trip.family ? 'Famille' : 'Tous' },
                        { icon: Star, label: 'Match', value: `${trip.matchScore || 80}%` }
                    ].map((item, i) => (
                        <div key={i} className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
                            <item.icon size={20} className="text-amber-500 mb-2" />
                            <div className="text-xs text-gray-500">{item.label}</div>
                            <div className="font-bold text-slate-800">{item.value}</div>
                        </div>
                    ))}
                </div>

                {/* Highlights */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-slate-800 mb-4">Points forts</h2>
                    <div className="flex flex-wrap gap-3">
                        {trip.highlights.map((h, i) => (
                            <span key={i} className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full font-medium flex items-center gap-2">
                                <Check size={16} />
                                {h}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Interactive Map */}
                <div className="mb-8">
                    <h2 className="text-xl font-serif font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Map size={22} className="text-amber-600" /> Carte de l'itinéraire
                    </h2>
                    <TourMap itinerary={days} />
                </div>

                {/* Route Overview */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-slate-800 mb-4">Parcours</h2>
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 flex items-center gap-4 overflow-x-auto">
                        {trip.cities.map((city, i) => (
                            <React.Fragment key={city}>
                                <div className="flex flex-col items-center min-w-max">
                                    <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-amber-600 font-bold mb-2">
                                        {i + 1}
                                    </div>
                                    <span className="text-sm font-medium text-slate-700">
                                        {TRIP_TEMPLATES.cityInfo[city]?.name || city}
                                    </span>
                                </div>
                                {i < trip.cities.length - 1 && (
                                    <div className="flex-1 min-w-[40px] h-0.5 bg-amber-300" />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* Day by Day */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-slate-800 mb-4">Programme jour par jour</h2>
                    <div className="space-y-4">
                        {days.map((day, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className={`bg-white rounded-xl border-2 overflow-hidden transition cursor-pointer ${activeDay === i ? 'border-amber-500 shadow-lg' : 'border-gray-100 hover:border-amber-200'
                                    }`}
                                onClick={() => setActiveDay(activeDay === i ? -1 : i)}
                            >
                                <div className="flex items-center gap-4 p-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold">
                                        J{day.day}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-slate-800">{day.city}</h3>
                                        <p className="text-sm text-gray-500">
                                            {day.activities.join(' • ')}
                                        </p>
                                    </div>
                                    <ChevronRight
                                        size={20}
                                        className={`text-gray-400 transition-transform ${activeDay === i ? 'rotate-90' : ''}`}
                                    />
                                </div>

                                <AnimatePresence>
                                    {activeDay === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="border-t bg-gray-50"
                                        >
                                            <div className="p-4 grid md:grid-cols-2 gap-4">
                                                <div>
                                                    <h4 className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                                        <Camera size={14} className="text-amber-600" />
                                                        Activités
                                                    </h4>
                                                    <ul className="space-y-1 text-sm text-gray-600">
                                                        {day.activities.map((a, j) => (
                                                            <li key={j} className="flex items-center gap-2">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                                                {a}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                                        <Utensils size={14} className="text-amber-600" />
                                                        Repas
                                                    </h4>
                                                    <ul className="space-y-1 text-sm text-gray-600">
                                                        {day.meals.map((m, j) => (
                                                            <li key={j} className="flex items-center gap-2">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                                                                {m}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>

                                            {/* Ask Guide Button */}
                                            <div className="px-4 pb-4 flex flex-wrap gap-2">
                                                {day.transport && (
                                                    <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                                                        🚗 {day.transport}
                                                    </span>
                                                )}
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleAskGuide(`Parle-moi de ${day.city} au Maroc. Quels sont les incontournables à visiter, la culture locale, et les conseils pratiques pour un touriste ?`);
                                                    }}
                                                    className="text-xs bg-amber-100 text-amber-700 px-3 py-1.5 rounded-full flex items-center gap-1 hover:bg-amber-200 transition"
                                                >
                                                    <MessageCircle size={12} />
                                                    En savoir plus sur {day.city}
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Ask Guide Section */}
                <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                    <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                        <MessageCircle size={20} className="text-blue-600" />
                        Besoin de plus de détails ?
                    </h3>
                    <p className="text-gray-600 mb-4">
                        Posez vos questions au Guide Royal sur ce voyage, la culture des régions visitées, ou des conseils pratiques.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => handleAskGuide(`Quels sont les meilleurs conseils pour faire le voyage "${trip.name}" au Maroc ? Parle-moi de chaque étape : ${trip.cities.map(c => TRIP_TEMPLATES.cityInfo[c]?.name || c).join(', ')}`)}
                            className="px-4 py-2 bg-white text-blue-700 rounded-xl font-medium hover:shadow-md transition flex items-center gap-2"
                        >
                            <Sparkles size={16} />
                            Conseils pour ce voyage
                        </button>
                        <button
                            onClick={() => handleAskGuide(`Quelle est la meilleure période pour faire ce voyage au Maroc ? Le circuit passe par ${trip.cities.map(c => TRIP_TEMPLATES.cityInfo[c]?.name || c).join(', ')}`)}
                            className="px-4 py-2 bg-white text-blue-700 rounded-xl font-medium hover:shadow-md transition flex items-center gap-2"
                        >
                            <Calendar size={16} />
                            Meilleure période
                        </button>
                        <button
                            onClick={() => handleAskGuide(`Parle-moi de la gastronomie et des plats typiques des régions que je visiterai : ${trip.cities.map(c => TRIP_TEMPLATES.cityInfo[c]?.name || c).join(', ')}`)}
                            className="px-4 py-2 bg-white text-blue-700 rounded-xl font-medium hover:shadow-md transition flex items-center gap-2"
                        >
                            <Utensils size={16} />
                            Gastronomie locale
                        </button>
                    </div>
                </div>

                {/* CTA */}
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-8 text-center text-white">
                    <h3 className="text-2xl font-bold mb-2">Ce voyage vous plaît ?</h3>
                    <p className="opacity-90 mb-6">Contactez-nous pour réserver ou personnaliser cet itinéraire</p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <button className="px-6 py-3 bg-white text-amber-600 rounded-xl font-bold hover:shadow-lg transition">
                            Demander un devis
                        </button>
                        <button
                            onClick={() => handleAskGuide(`Je suis intéressé par le voyage "${trip.name}". Peux-tu me donner plus d'informations sur comment organiser ce voyage et les options de personnalisation ?`)}
                            className="px-6 py-3 bg-white/20 border-2 border-white rounded-xl font-bold hover:bg-white/30 transition flex items-center gap-2"
                        >
                            <MessageCircle size={18} />
                            Discuter avec le Guide
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TripGenerator;
