import React, { createContext, useContext, useState, useEffect } from 'react';

const PreferencesContext = createContext(null);

const DEFAULT_PREFERENCES = {
    // User Profile
    name: '',
    travelStyle: 'balanced', // 'budget', 'balanced', 'luxury'
    interests: [], // ['culture', 'food', 'adventure', 'relaxation', 'shopping', 'nature']
    language: 'fr', // 'fr', 'en', 'ar'

    // Appearance
    theme: 'light', // 'light', 'dark', 'auto'
    fontSize: 'medium', // 'small', 'medium', 'large'

    // Notifications
    notifications: {
        security: true,
        weather: true,
        tips: true,
        offers: false,
    },

    // Travel Preferences
    accessibility: false,
    familyMode: false,
    budgetRange: 'medium', // 'low', 'medium', 'high'
    preferredTransport: 'any', // 'walking', 'taxi', 'bus', 'any'

    // Privacy
    saveHistory: true,
    analytics: true,

    // Cached Data
    favoriteLocations: [],
    savedItineraries: [],
    recentSearches: [],
};

export const PreferencesProvider = ({ children }) => {
    const [preferences, setPreferences] = useState(() => {
        try {
            const saved = localStorage.getItem('userPreferences');
            return saved ? { ...DEFAULT_PREFERENCES, ...JSON.parse(saved) } : DEFAULT_PREFERENCES;
        } catch {
            return DEFAULT_PREFERENCES;
        }
    });

    const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);

    // Persist to localStorage
    useEffect(() => {
        try {
            localStorage.setItem('userPreferences', JSON.stringify(preferences));
        } catch (error) {
            console.error('Failed to save preferences:', error);
        }
    }, [preferences]);

    // Apply theme
    useEffect(() => {
        const root = document.documentElement;
        if (preferences.theme === 'dark') {
            root.classList.add('dark');
        } else if (preferences.theme === 'light') {
            root.classList.remove('dark');
        } else {
            // Auto theme based on system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            root.classList.toggle('dark', prefersDark);
        }
    }, [preferences.theme]);

    // Apply font size
    useEffect(() => {
        const root = document.documentElement;
        const sizes = { small: '14px', medium: '16px', large: '18px' };
        root.style.fontSize = sizes[preferences.fontSize] || '16px';
    }, [preferences.fontSize]);

    const updatePreference = (key, value) => {
        setPreferences(prev => ({
            ...prev,
            [key]: value,
        }));
    };

    const updateNestedPreference = (parent, key, value) => {
        setPreferences(prev => ({
            ...prev,
            [parent]: {
                ...prev[parent],
                [key]: value,
            },
        }));
    };

    const toggleInterest = (interest) => {
        setPreferences(prev => ({
            ...prev,
            interests: prev.interests.includes(interest)
                ? prev.interests.filter(i => i !== interest)
                : [...prev.interests, interest],
        }));
    };

    const addFavoriteLocation = (location) => {
        setPreferences(prev => ({
            ...prev,
            favoriteLocations: [...prev.favoriteLocations.filter(l => l.id !== location.id), location],
        }));
    };

    const removeFavoriteLocation = (locationId) => {
        setPreferences(prev => ({
            ...prev,
            favoriteLocations: prev.favoriteLocations.filter(l => l.id !== locationId),
        }));
    };

    const saveItinerary = (itinerary) => {
        setPreferences(prev => ({
            ...prev,
            savedItineraries: [...prev.savedItineraries.filter(i => i.id !== itinerary.id), itinerary],
        }));
    };

    const addRecentSearch = (search) => {
        setPreferences(prev => ({
            ...prev,
            recentSearches: [search, ...prev.recentSearches.filter(s => s !== search)].slice(0, 10),
        }));
    };

    const clearHistory = () => {
        setPreferences(prev => ({
            ...prev,
            recentSearches: [],
            savedItineraries: [],
        }));
    };

    const resetPreferences = () => {
        setPreferences(DEFAULT_PREFERENCES);
        localStorage.removeItem('userPreferences');
    };

    const value = {
        preferences,
        isPreferencesOpen,
        setIsPreferencesOpen,
        updatePreference,
        updateNestedPreference,
        toggleInterest,
        addFavoriteLocation,
        removeFavoriteLocation,
        saveItinerary,
        addRecentSearch,
        clearHistory,
        resetPreferences,
    };

    return (
        <PreferencesContext.Provider value={value}>
            {children}
        </PreferencesContext.Provider>
    );
};

export const usePreferences = () => {
    const context = useContext(PreferencesContext);
    if (!context) {
        throw new Error('usePreferences must be used within a PreferencesProvider');
    }
    return context;
};

// Interest options
export const INTEREST_OPTIONS = [
    { id: 'culture', label: 'Culture & Histoire', icon: '🏛️' },
    { id: 'food', label: 'Gastronomie', icon: '🍽️' },
    { id: 'adventure', label: 'Aventure', icon: '🏔️' },
    { id: 'relaxation', label: 'Détente & Spa', icon: '🧘' },
    { id: 'shopping', label: 'Shopping', icon: '🛍️' },
    { id: 'nature', label: 'Nature', icon: '🌿' },
    { id: 'photography', label: 'Photographie', icon: '📷' },
    { id: 'nightlife', label: 'Vie Nocturne', icon: '🌙' },
];

// Travel style options
export const TRAVEL_STYLE_OPTIONS = [
    { id: 'budget', label: 'Économique', description: 'Voyager malin sans se ruiner', icon: '💰' },
    { id: 'balanced', label: 'Équilibré', description: 'Le meilleur rapport qualité-prix', icon: '⚖️' },
    { id: 'luxury', label: 'Luxe', description: 'Expériences premium et confort', icon: '✨' },
];

export default PreferencesContext;
