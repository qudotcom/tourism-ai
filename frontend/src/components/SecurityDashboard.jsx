import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Shield, AlertTriangle, CheckCircle, Info,
    MapPin, Clock, Phone, ChevronDown, ChevronUp,
    Eye, Users, Car, Moon, Search, TrendingUp,
    TrendingDown, Minus, Globe, Building, Waves,
    Mountain, TreePine, AlertCircle
} from 'lucide-react';
import SecurityGauge, { SecurityBar, SecurityMeter, SecurityIndicator } from './SecurityGauge';
import { MOROCCO_SECURITY_DATA } from '../data/moroccoSecurity';

const SecurityDashboard = () => {
    const [selectedCity, setSelectedCity] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('all');
    const [showNeighborhoods, setShowNeighborhoods] = useState(false);

    const { cities, regions, nationalEmergency, travelAdvisories } = MOROCCO_SECURITY_DATA;

    // Filter cities based on search and region
    const filteredCities = useMemo(() => {
        return Object.entries(cities)
            .filter(([key, city]) => {
                const matchesSearch = city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    city.nameAr.includes(searchQuery);
                const matchesRegion = selectedRegion === 'all' || city.region === selectedRegion;
                return matchesSearch && matchesRegion;
            })
            .sort((a, b) => b[1].overall - a[1].overall);
    }, [cities, searchQuery, selectedRegion]);

    // Calculate national average
    const nationalAverage = useMemo(() => {
        const cityValues = Object.values(cities);
        return Math.round(cityValues.reduce((sum, c) => sum + c.overall, 0) / cityValues.length);
    }, [cities]);

    // City type icons
    const cityTypeIcon = (type) => {
        switch (type) {
            case 'imperial': return <Building size={14} className="text-amber-600" />;
            case 'coastal': case 'resort': return <Waves size={14} className="text-blue-500" />;
            case 'desert': return <Mountain size={14} className="text-orange-500" />;
            case 'mountain': return <TreePine size={14} className="text-green-600" />;
            case 'capital': return <Globe size={14} className="text-purple-600" />;
            default: return <MapPin size={14} className="text-gray-500" />;
        }
    };

    // Trending indicator
    const TrendingIcon = ({ trend }) => {
        if (trend === 'up') return <TrendingUp size={14} className="text-green-500" />;
        if (trend === 'down') return <TrendingDown size={14} className="text-red-500" />;
        return <Minus size={12} className="text-gray-400" />;
    };

    return (
        <div className="space-y-6">
            {/* Header with National Overview */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 rounded-2xl p-6 text-white relative overflow-hidden"
            >
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                </div>

                <div className="flex flex-col md:flex-row items-center gap-6 relative">
                    <SecurityMeter value={nationalAverage} label="" width={160} />
                    <div className="flex-1 text-center md:text-left">
                        <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                            <img src="https://flagcdn.com/24x18/ma.png" alt="Morocco" className="rounded" />
                            <h2 className="text-2xl font-bold">Sécurité au Maroc</h2>
                        </div>
                        <p className="text-white/70 mb-4">
                            Données de sécurité pour {Object.keys(cities).length} villes marocaines
                        </p>
                        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                            {travelAdvisories.general === 'safe' && (
                                <span className="px-3 py-1 bg-green-500/20 border border-green-400/30 rounded-full text-sm flex items-center gap-2">
                                    <CheckCircle size={14} />
                                    Destination recommandée
                                </span>
                            )}
                            <span className="px-3 py-1 bg-white/10 rounded-full text-sm flex items-center gap-2">
                                <Clock size={14} />
                                Mis à jour: {MOROCCO_SECURITY_DATA.lastUpdated}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Travel Advisories */}
                {travelAdvisories.zones.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                        <div className="flex items-center gap-2 text-amber-300 text-sm mb-2">
                            <AlertCircle size={16} />
                            Zones à attention
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {travelAdvisories.zones.map((zone, i) => (
                                <span
                                    key={i}
                                    className={`px-3 py-1 rounded-full text-xs ${zone.level === 'avoid'
                                            ? 'bg-red-500/20 text-red-300 border border-red-400/30'
                                            : 'bg-amber-500/20 text-amber-300 border border-amber-400/30'
                                        }`}
                                >
                                    {zone.name}: {zone.reason}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </motion.div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Rechercher une ville..."
                        className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition"
                    />
                </div>
                <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="px-4 py-3 bg-white rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 outline-none transition"
                >
                    <option value="all">Toutes les régions</option>
                    {Object.entries(regions).map(([key, region]) => (
                        <option key={key} value={key}>{region.name}</option>
                    ))}
                </select>
            </div>

            {/* Region Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries(regions).slice(0, 4).map(([key, region]) => (
                    <motion.button
                        key={key}
                        onClick={() => setSelectedRegion(selectedRegion === key ? 'all' : key)}
                        whileHover={{ scale: 1.02 }}
                        className={`p-4 rounded-xl transition text-left ${selectedRegion === key
                                ? 'bg-amber-100 border-2 border-amber-400'
                                : 'bg-white border-2 border-gray-100 hover:border-gray-200'
                            }`}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700 truncate">{region.name}</span>
                            <SecurityIndicator value={region.overview} size={10} />
                        </div>
                        <div className="text-2xl font-bold text-slate-800">{region.overview}%</div>
                    </motion.button>
                ))}
            </div>

            {/* Cities List */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                        <MapPin size={20} className="text-amber-500" />
                        Villes ({filteredCities.length})
                    </h3>
                </div>

                <div className="divide-y max-h-[500px] overflow-y-auto">
                    {filteredCities.map(([key, city], index) => (
                        <motion.div
                            key={key}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.03 }}
                        >
                            <button
                                onClick={() => setSelectedCity(selectedCity === key ? null : key)}
                                className="w-full p-4 hover:bg-gray-50 transition-colors text-left"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
                                            {cityTypeIcon(city.type)}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold text-gray-900">{city.name}</span>
                                                <span className="text-gray-400 text-sm">{city.nameAr}</span>
                                                <TrendingIcon trend={city.trending} />
                                            </div>
                                            <span className="text-xs text-gray-500">
                                                {regions[city.region]?.name} • Pop. {city.population}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <SecurityGauge value={city.overall} size="sm" showValue={true} />
                                        {selectedCity === key ? (
                                            <ChevronUp size={20} className="text-gray-400" />
                                        ) : (
                                            <ChevronDown size={20} className="text-gray-400" />
                                        )}
                                    </div>
                                </div>

                                {/* Expanded details */}
                                <AnimatePresence>
                                    {selectedCity === key && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="mt-4 pt-4 border-t"
                                            onClick={e => e.stopPropagation()}
                                        >
                                            {/* Alerts */}
                                            {city.alerts?.length > 0 && (
                                                <div className="mb-4 space-y-2">
                                                    {city.alerts.map((alert, i) => (
                                                        <div
                                                            key={i}
                                                            className={`p-3 rounded-lg flex items-start gap-2 text-sm ${alert.type === 'caution'
                                                                    ? 'bg-red-50 text-red-700'
                                                                    : 'bg-amber-50 text-amber-700'
                                                                }`}
                                                        >
                                                            <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" />
                                                            {alert.message}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Metrics */}
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                                                <MetricCard icon={<Eye size={16} />} label="Jour" value={city.metrics.day} />
                                                <MetricCard icon={<Moon size={16} />} label="Nuit" value={city.metrics.night} />
                                                <MetricCard icon={<Users size={16} />} label="Touristes" value={city.metrics.tourist} />
                                                <MetricCard icon={<Car size={16} />} label="Transport" value={city.metrics.transport} />
                                                <MetricCard icon={<Shield size={16} />} label="Santé" value={city.metrics.health} />
                                                <MetricCard icon={<AlertTriangle size={16} />} label="Arnaques" value={city.metrics.scams} />
                                            </div>

                                            {/* Neighborhoods */}
                                            {city.neighborhoods?.length > 0 && (
                                                <div className="mb-4">
                                                    <button
                                                        onClick={() => setShowNeighborhoods(!showNeighborhoods)}
                                                        className="text-sm text-amber-600 font-medium flex items-center gap-1 mb-2"
                                                    >
                                                        Quartiers ({city.neighborhoods.length})
                                                        <ChevronDown size={14} className={`transition ${showNeighborhoods ? 'rotate-180' : ''}`} />
                                                    </button>
                                                    {showNeighborhoods && (
                                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                                            {city.neighborhoods.map((n, i) => (
                                                                <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                                                                    <span className="text-sm text-gray-700">{n.name}</span>
                                                                    <span className={`text-xs font-bold ${n.score >= 85 ? 'text-green-600' :
                                                                            n.score >= 70 ? 'text-amber-600' : 'text-red-600'
                                                                        }`}>{n.score}%</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {/* Tips */}
                                            <div className="bg-blue-50 rounded-xl p-4">
                                                <h4 className="text-sm font-medium text-blue-800 flex items-center gap-2 mb-2">
                                                    <Info size={16} />
                                                    Conseils pour {city.name}
                                                </h4>
                                                <ul className="text-sm text-blue-700 space-y-1">
                                                    {city.tips.map((tip, i) => (
                                                        <li key={i} className="flex items-start gap-2">
                                                            <span className="text-blue-400">•</span>
                                                            {tip}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Emergency */}
                                            {city.emergency && (
                                                <div className="mt-4 flex flex-wrap gap-2">
                                                    <a href={`tel:${city.emergency.police}`} className="px-3 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium flex items-center gap-2">
                                                        <Phone size={14} />
                                                        Police: {city.emergency.police}
                                                    </a>
                                                    {city.emergency.tourist && (
                                                        <a href={`tel:${city.emergency.tourist}`} className="px-3 py-2 bg-amber-100 text-amber-700 rounded-lg text-sm font-medium flex items-center gap-2">
                                                            <Phone size={14} />
                                                            Brigade Touristique
                                                        </a>
                                                    )}
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* National Emergency Contacts */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 border border-red-100">
                <h3 className="font-bold text-red-800 flex items-center gap-2 mb-4">
                    <Phone size={20} />
                    Numéros d'urgence nationaux
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                        { name: 'Police', number: nationalEmergency.police, icon: Shield },
                        { name: 'SAMU', number: nationalEmergency.ambulance, icon: Phone },
                        { name: 'Pompiers', number: nationalEmergency.fire, icon: AlertTriangle },
                        { name: 'Gendarmerie', number: nationalEmergency.gendarmerie, icon: Users },
                    ].map((contact) => (
                        <a
                            key={contact.name}
                            href={`tel:${contact.number}`}
                            className="flex items-center gap-3 p-3 bg-white rounded-xl hover:shadow-md transition-shadow"
                        >
                            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                                <contact.icon size={20} className="text-red-600" />
                            </div>
                            <div>
                                <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                                <div className="text-lg text-red-600 font-bold">{contact.number}</div>
                            </div>
                        </a>
                    ))}
                </div>

                {/* Embassies */}
                <div className="mt-4 pt-4 border-t border-red-100">
                    <p className="text-sm text-gray-600 mb-2">Ambassades</p>
                    <div className="flex flex-wrap gap-2">
                        <a href={`tel:${nationalEmergency.frenchEmbassy}`} className="px-3 py-1.5 bg-white rounded-lg text-sm hover:shadow-sm transition flex items-center gap-2">
                            🇫🇷 France
                        </a>
                        <a href={`tel:${nationalEmergency.ukEmbassy}`} className="px-3 py-1.5 bg-white rounded-lg text-sm hover:shadow-sm transition flex items-center gap-2">
                            🇬🇧 UK
                        </a>
                        <a href={`tel:${nationalEmergency.usEmbassy}`} className="px-3 py-1.5 bg-white rounded-lg text-sm hover:shadow-sm transition flex items-center gap-2">
                            🇺🇸 USA
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Metric Card Component
const MetricCard = ({ icon, label, value }) => (
    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
        <span className="text-gray-500">{icon}</span>
        <div className="flex-1">
            <div className="text-xs text-gray-500">{label}</div>
            <div className="flex items-center gap-1">
                <SecurityIndicator value={value} size={8} />
                <span className="text-sm font-bold text-gray-800">{value}%</span>
            </div>
        </div>
    </div>
);

export default SecurityDashboard;
