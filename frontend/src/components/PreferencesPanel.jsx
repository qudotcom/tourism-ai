import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X, User, Palette, Bell, Heart, Shield,
    ChevronRight, Check, RotateCcw, Save,
    Sun, Moon, Monitor, Languages
} from 'lucide-react';
import { usePreferences, INTEREST_OPTIONS, TRAVEL_STYLE_OPTIONS } from '../context/PreferencesContext';

const PreferencesPanel = () => {
    const {
        preferences,
        isPreferencesOpen,
        setIsPreferencesOpen,
        updatePreference,
        updateNestedPreference,
        toggleInterest,
        resetPreferences,
    } = usePreferences();

    const [activeTab, setActiveTab] = useState('profile');
    const [showResetConfirm, setShowResetConfirm] = useState(false);

    const tabs = [
        { id: 'profile', label: 'Profil', icon: User },
        { id: 'appearance', label: 'Apparence', icon: Palette },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'travel', label: 'Voyage', icon: Heart },
        { id: 'privacy', label: 'Confidentialité', icon: Shield },
    ];

    const handleReset = () => {
        resetPreferences();
        setShowResetConfirm(false);
    };

    if (!isPreferencesOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={() => setIsPreferencesOpen(false)}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden"
                    onClick={e => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-kech-primary to-kech-secondary p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold">Préférences</h2>
                                <p className="text-white/80 text-sm mt-1">Personnalisez votre expérience</p>
                            </div>
                            <button
                                onClick={() => setIsPreferencesOpen(false)}
                                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="flex gap-1 mt-6 overflow-x-auto pb-2 -mb-6">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-t-lg transition-all whitespace-nowrap ${activeTab === tab.id
                                            ? 'bg-white text-kech-primary font-medium'
                                            : 'text-white/80 hover:bg-white/10'
                                        }`}
                                >
                                    <tab.icon size={18} />
                                    <span className="hidden sm:inline">{tab.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 overflow-y-auto max-h-[50vh]">
                        {activeTab === 'profile' && (
                            <ProfileTab
                                preferences={preferences}
                                updatePreference={updatePreference}
                                toggleInterest={toggleInterest}
                            />
                        )}
                        {activeTab === 'appearance' && (
                            <AppearanceTab
                                preferences={preferences}
                                updatePreference={updatePreference}
                            />
                        )}
                        {activeTab === 'notifications' && (
                            <NotificationsTab
                                preferences={preferences}
                                updateNestedPreference={updateNestedPreference}
                            />
                        )}
                        {activeTab === 'travel' && (
                            <TravelTab
                                preferences={preferences}
                                updatePreference={updatePreference}
                            />
                        )}
                        {activeTab === 'privacy' && (
                            <PrivacyTab
                                preferences={preferences}
                                updatePreference={updatePreference}
                                onResetClick={() => setShowResetConfirm(true)}
                            />
                        )}
                    </div>

                    {/* Footer */}
                    <div className="border-t p-4 bg-gray-50 flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                            Les modifications sont sauvegardées automatiquement
                        </span>
                        <button
                            onClick={() => setIsPreferencesOpen(false)}
                            className="px-6 py-2 bg-kech-primary text-white rounded-lg hover:bg-kech-primary/90 transition-colors flex items-center gap-2"
                        >
                            <Save size={18} />
                            Fermer
                        </button>
                    </div>
                </motion.div>

                {/* Reset Confirmation Modal */}
                <AnimatePresence>
                    {showResetConfirm && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 z-60 flex items-center justify-center"
                            onClick={() => setShowResetConfirm(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0.9 }}
                                className="bg-white p-6 rounded-xl max-w-sm mx-4"
                                onClick={e => e.stopPropagation()}
                            >
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Réinitialiser les préférences ?</h3>
                                <p className="text-gray-600 text-sm mb-4">
                                    Toutes vos préférences seront remises à zéro. Cette action est irréversible.
                                </p>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setShowResetConfirm(false)}
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        onClick={handleReset}
                                        className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                    >
                                        Réinitialiser
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </AnimatePresence>
    );
};

// Profile Tab
const ProfileTab = ({ preferences, updatePreference, toggleInterest }) => (
    <div className="space-y-6">
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Votre nom (optionnel)
            </label>
            <input
                type="text"
                value={preferences.name}
                onChange={(e) => updatePreference('name', e.target.value)}
                placeholder="Comment vous appeler ?"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-kech-primary focus:border-transparent"
            />
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
                Style de voyage
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {TRAVEL_STYLE_OPTIONS.map((style) => (
                    <button
                        key={style.id}
                        onClick={() => updatePreference('travelStyle', style.id)}
                        className={`p-4 rounded-xl border-2 transition-all text-left ${preferences.travelStyle === style.id
                                ? 'border-kech-primary bg-kech-primary/5'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                    >
                        <span className="text-2xl">{style.icon}</span>
                        <div className="mt-2 font-medium">{style.label}</div>
                        <div className="text-xs text-gray-500 mt-1">{style.description}</div>
                    </button>
                ))}
            </div>
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
                Centres d'intérêt
            </label>
            <div className="flex flex-wrap gap-2">
                {INTEREST_OPTIONS.map((interest) => (
                    <button
                        key={interest.id}
                        onClick={() => toggleInterest(interest.id)}
                        className={`px-4 py-2 rounded-full border-2 transition-all flex items-center gap-2 ${preferences.interests.includes(interest.id)
                                ? 'border-kech-secondary bg-kech-secondary/10 text-kech-secondary'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                    >
                        <span>{interest.icon}</span>
                        <span className="text-sm">{interest.label}</span>
                        {preferences.interests.includes(interest.id) && <Check size={16} />}
                    </button>
                ))}
            </div>
        </div>
    </div>
);

// Appearance Tab
const AppearanceTab = ({ preferences, updatePreference }) => {
    const themes = [
        { id: 'light', label: 'Clair', icon: Sun },
        { id: 'dark', label: 'Sombre', icon: Moon },
        { id: 'auto', label: 'Système', icon: Monitor },
    ];

    const fontSizes = [
        { id: 'small', label: 'Petit', sample: 'Aa' },
        { id: 'medium', label: 'Moyen', sample: 'Aa' },
        { id: 'large', label: 'Grand', sample: 'Aa' },
    ];

    const languages = [
        { id: 'fr', label: 'Français', flag: '🇫🇷' },
        { id: 'en', label: 'English', flag: '🇬🇧' },
        { id: 'ar', label: 'العربية', flag: '🇲🇦' },
    ];

    return (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                    Thème
                </label>
                <div className="grid grid-cols-3 gap-3">
                    {themes.map((theme) => (
                        <button
                            key={theme.id}
                            onClick={() => updatePreference('theme', theme.id)}
                            className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${preferences.theme === theme.id
                                    ? 'border-kech-primary bg-kech-primary/5'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                        >
                            <theme.icon size={24} />
                            <span className="text-sm font-medium">{theme.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                    Taille du texte
                </label>
                <div className="grid grid-cols-3 gap-3">
                    {fontSizes.map((size) => (
                        <button
                            key={size.id}
                            onClick={() => updatePreference('fontSize', size.id)}
                            className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${preferences.fontSize === size.id
                                    ? 'border-kech-primary bg-kech-primary/5'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                        >
                            <span className={`font-bold ${size.id === 'small' ? 'text-sm' : size.id === 'large' ? 'text-2xl' : 'text-lg'
                                }`}>
                                {size.sample}
                            </span>
                            <span className="text-sm">{size.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                    <Languages size={18} className="inline mr-2" />
                    Langue
                </label>
                <div className="grid grid-cols-3 gap-3">
                    {languages.map((lang) => (
                        <button
                            key={lang.id}
                            onClick={() => updatePreference('language', lang.id)}
                            className={`p-4 rounded-xl border-2 transition-all flex items-center justify-center gap-2 ${preferences.language === lang.id
                                    ? 'border-kech-primary bg-kech-primary/5'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                        >
                            <span className="text-2xl">{lang.flag}</span>
                            <span className="text-sm font-medium">{lang.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Notifications Tab
const NotificationsTab = ({ preferences, updateNestedPreference }) => {
    const notificationTypes = [
        { id: 'security', label: 'Alertes Sécurité', description: 'Soyez informé des changements de sécurité', icon: '🛡️' },
        { id: 'weather', label: 'Météo', description: 'Prévisions et alertes météorologiques', icon: '🌤️' },
        { id: 'tips', label: 'Conseils Voyage', description: 'Astuces et recommandations personnalisées', icon: '💡' },
        { id: 'offers', label: 'Offres Spéciales', description: 'Promotions et bons plans', icon: '🎁' },
    ];

    return (
        <div className="space-y-4">
            <p className="text-sm text-gray-600 mb-4">
                Gérez les types de notifications que vous souhaitez recevoir.
            </p>
            {notificationTypes.map((notif) => (
                <div
                    key={notif.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                >
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">{notif.icon}</span>
                        <div>
                            <div className="font-medium">{notif.label}</div>
                            <div className="text-sm text-gray-500">{notif.description}</div>
                        </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={preferences.notifications[notif.id]}
                            onChange={(e) => updateNestedPreference('notifications', notif.id, e.target.checked)}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:ring-4 peer-focus:ring-kech-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-kech-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                    </label>
                </div>
            ))}
        </div>
    );
};

// Travel Tab
const TravelTab = ({ preferences, updatePreference }) => {
    const transportOptions = [
        { id: 'walking', label: 'À pied', icon: '🚶' },
        { id: 'taxi', label: 'Taxi', icon: '🚕' },
        { id: 'bus', label: 'Bus', icon: '🚌' },
        { id: 'any', label: 'Tous', icon: '🔄' },
    ];

    const budgetOptions = [
        { id: 'low', label: 'Économique', range: '< 500 MAD/jour' },
        { id: 'medium', label: 'Modéré', range: '500-1500 MAD/jour' },
        { id: 'high', label: 'Confort', range: '> 1500 MAD/jour' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                    <div className="font-medium">Mode Accessibilité</div>
                    <div className="text-sm text-gray-500">Privilégier les lieux accessibles PMR</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        checked={preferences.accessibility}
                        onChange={(e) => updatePreference('accessibility', e.target.checked)}
                        className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:ring-4 peer-focus:ring-kech-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-kech-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                    <div className="font-medium">Mode Famille</div>
                    <div className="text-sm text-gray-500">Recommandations adaptées aux enfants</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        checked={preferences.familyMode}
                        onChange={(e) => updatePreference('familyMode', e.target.checked)}
                        className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:ring-4 peer-focus:ring-kech-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-kech-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                    Budget quotidien
                </label>
                <div className="grid grid-cols-3 gap-3">
                    {budgetOptions.map((budget) => (
                        <button
                            key={budget.id}
                            onClick={() => updatePreference('budgetRange', budget.id)}
                            className={`p-3 rounded-xl border-2 transition-all text-center ${preferences.budgetRange === budget.id
                                    ? 'border-kech-primary bg-kech-primary/5'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                        >
                            <div className="font-medium text-sm">{budget.label}</div>
                            <div className="text-xs text-gray-500 mt-1">{budget.range}</div>
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                    Transport préféré
                </label>
                <div className="grid grid-cols-4 gap-3">
                    {transportOptions.map((transport) => (
                        <button
                            key={transport.id}
                            onClick={() => updatePreference('preferredTransport', transport.id)}
                            className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-1 ${preferences.preferredTransport === transport.id
                                    ? 'border-kech-primary bg-kech-primary/5'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                        >
                            <span className="text-2xl">{transport.icon}</span>
                            <span className="text-xs">{transport.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Privacy Tab
const PrivacyTab = ({ preferences, updatePreference, onResetClick }) => (
    <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
                <div className="font-medium">Sauvegarder l'historique</div>
                <div className="text-sm text-gray-500">Conserver vos conversations et recherches</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    checked={preferences.saveHistory}
                    onChange={(e) => updatePreference('saveHistory', e.target.checked)}
                    className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:ring-4 peer-focus:ring-kech-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-kech-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
                <div className="font-medium">Analytiques anonymes</div>
                <div className="text-sm text-gray-500">Aidez-nous à améliorer l'application</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) => updatePreference('analytics', e.target.checked)}
                    className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:ring-4 peer-focus:ring-kech-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-kech-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
        </div>

        <div className="pt-6 border-t mt-6">
            <h4 className="font-medium text-gray-900 mb-3">Zone de danger</h4>
            <button
                onClick={onResetClick}
                className="w-full px-4 py-3 border-2 border-red-300 text-red-600 rounded-xl hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
            >
                <RotateCcw size={18} />
                Réinitialiser toutes les préférences
            </button>
        </div>
    </div>
);

export default PreferencesPanel;
