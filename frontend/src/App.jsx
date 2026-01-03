import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Send, MapPin, ShieldAlert, Menu, X, Sparkles,
  Map, BookOpen, Phone, ChevronRight, ArrowLeft,
  Plus, Trash2, Calendar, Clock, CheckCircle,
  Languages, Copy, ArrowRight, Search, Globe, Code, AlertTriangle, ArrowLeftRight,
  Settings, User, Compass, Heart
} from 'lucide-react';
import { chatWithGuide, translateText, checkCitySecurity } from './services/api';
import Button from './components/Button';
import ErrorDisplay from './components/ErrorDisplay';
import { MessageSkeleton } from './components/LoadingSkeletons';
import VoiceInput from './components/VoiceInput';
import TourMap from './components/TourMap';
import SecurityDashboard from './components/SecurityDashboard';
import PreferencesPanel from './components/PreferencesPanel';
import TripGenerator from './components/TripGenerator';
import { PreferencesProvider, usePreferences } from './context/PreferencesContext';

// --- DONNÉES STATIQUES (CIRCUITS) ---
const TOURS_DATA = [
  {
    id: 'imperiales', title: "Les Villes Impériales", duration: "7 Jours", level: "Facile", image: "/images/tours/imperial-cities.png",
    description: "Le circuit historique par excellence : Marrakech, Fès, Meknès et Rabat.",
    itinerary: [
      { day: "J1", title: "Marrakech", desc: "Arrivée et place Jemaa el-Fna.", coordinates: [31.6295, -7.9811] },
      { day: "J2", title: "Monuments", desc: "Bahia, Koutoubia, Souks.", coordinates: [31.6295, -7.9811] },
      { day: "J3", title: "Rabat", desc: "Route vers la capitale via Casablanca.", coordinates: [34.0209, -6.8416] },
      { day: "J4", title: "Meknès & Fès", desc: "Bab Mansour et arrivée à Fès.", coordinates: [34.0531, -5.0003] },
      { day: "J5", title: "Fès", desc: "Immersion dans la Médina.", coordinates: [34.0531, -5.0003] },
      { day: "J6", title: "Atlas", desc: "Retour via Ifrane.", coordinates: [33.5228, -5.1106] },
      { day: "J7", title: "Départ", desc: "Transfert aéroport.", coordinates: [31.6295, -7.9811] }
    ]
  },
  {
    id: 'desert', title: "Route des Kasbahs", duration: "5 Jours", level: "Modéré", image: "/images/tours/desert-kasbahs.png",
    description: "L'aventure du sud, de Ouarzazate aux dunes de Merzouga.",
    itinerary: [
      { day: "J1", title: "Ouarzazate", desc: "Aït Ben Haddou.", coordinates: [30.9335, -6.9370] },
      { day: "J2", title: "Dades", desc: "Vallée des Roses.", coordinates: [31.4532, -5.9772] },
      { day: "J3", title: "Merzouga", desc: "Nuit au désert.", coordinates: [31.0801, -4.0132] },
      { day: "J4", title: "Draa", desc: "Retour par Agdz.", coordinates: [30.6972, -6.4492] },
      { day: "J5", title: "Marrakech", desc: "Fin du voyage.", coordinates: [31.6295, -7.9811] }
    ]
  },
  {
    id: 'nord', title: "Le Nord Bleu", duration: "6 Jours", level: "Détente", image: "/images/tours/blue-north.png",
    description: "Tanger et la perle bleue Chefchaouen.",
    itinerary: [
      { day: "J1", title: "Tanger", desc: "Kasbah et Café Hafa.", coordinates: [35.7595, -5.8340] },
      { day: "J2", title: "Cap Spartel", desc: "Grottes d'Hercule.", coordinates: [35.7923, -5.9244] },
      { day: "J3", title: "Chefchaouen", desc: "La ville bleue.", coordinates: [35.1688, -5.2636] },
      { day: "J4", title: "Akchour", desc: "Cascades.", coordinates: [35.1421, -5.1178] },
      { day: "J5", title: "Asilah", desc: "Médina artistique.", coordinates: [35.4653, -6.0365] },
      { day: "J6", title: "Départ", desc: "Retour Tanger.", coordinates: [35.7595, -5.8340] }
    ]
  }
];

// --- COMPOSANT PRINCIPAL (APP) ---
const App = () => {
  return (
    <PreferencesProvider>
      <AppContent />
    </PreferencesProvider>
  );
};

const AppContent = () => {
  const [activeView, setActiveView] = useState('guide');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [initialChatQuery, setInitialChatQuery] = useState(null);
  const { preferences, setIsPreferencesOpen } = usePreferences();

  const navigateTo = (view) => { setActiveView(view); setMobileMenuOpen(false); };

  // Navigate to Guide Royal with a pre-filled question
  const navigateToGuideWithQuery = (query) => {
    setInitialChatQuery(query);
    setActiveView('guide');
    setMobileMenuOpen(false);
  };

  return (
    <div className="flex h-[100dvh] w-full overflow-hidden relative bg-transparent" style={{ background: 'transparent' }}>

      {/* Preferences Panel */}
      <PreferencesPanel />

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && <div onClick={() => setMobileMenuOpen(false)} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden" />}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-[#1a365d] to-[#0f2744] text-white transition-transform duration-300 shadow-2xl flex flex-col ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0`}>
        {/* Logo */}
        <div className="p-8 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-serif text-2xl font-bold tracking-wide text-[#d4a853]">Zelig</h1>
              <p className="text-[11px] text-blue-200/70 mt-0.5 tracking-widest uppercase">Voyage au Maroc</p>
            </div>
            <button onClick={() => setMobileMenuOpen(false)} className="lg:hidden p-2 hover:bg-white/10 rounded-lg">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          <p className="text-[10px] text-blue-300/50 uppercase tracking-widest px-4 mb-3">Assistant</p>
          <NavItem icon={<Sparkles size={18} />} label="Guide Royal" isActive={activeView === 'guide'} onClick={() => navigateTo('guide')} />
          <NavItem icon={<Languages size={18} />} label="Terjman" isActive={activeView === 'translate'} onClick={() => navigateTo('translate')} />

          <div className="h-px bg-white/10 my-4" />
          <p className="text-[10px] text-blue-300/50 uppercase tracking-widest px-4 mb-3">Planification</p>

          <NavItem icon={<Compass size={18} />} label="Mon Voyage" isActive={activeView === 'mytrip'} onClick={() => navigateTo('mytrip')} badge={preferences.interests.length > 0 && '✨'} />
          <NavItem icon={<Map size={18} />} label="Circuits" isActive={activeView === 'tour'} onClick={() => navigateTo('tour')} />
          <NavItem icon={<ShieldAlert size={18} />} label="Sécurité" isActive={activeView === 'safety'} onClick={() => navigateTo('safety')} />
          <NavItem icon={<BookOpen size={18} />} label="Carnet" isActive={activeView === 'carnet'} onClick={() => navigateTo('carnet')} />
        </nav>

        {/* Footer */}
        <div className="p-5 border-t border-white/10 bg-black/20">
          {/* User Profile */}
          <button
            onClick={() => setIsPreferencesOpen(true)}
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition mb-4 text-left"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d4a853] to-[#c75d3a] flex items-center justify-center text-white font-semibold text-sm">
              {preferences.name ? preferences.name.charAt(0).toUpperCase() : <User size={18} />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{preferences.name || 'Voyageur'}</p>
              <p className="text-[10px] text-blue-200/60 flex items-center gap-1">
                <Settings size={10} />
                Préférences
              </p>
            </div>
            <ChevronRight size={16} className="text-white/40" />
          </button>

          {/* Credits */}
          <div className="pt-4 border-t border-white/10">
            <p className="text-[9px] text-blue-300/40 uppercase tracking-widest mb-1">Créé par</p>
            <p className="text-xs font-medium text-white/80">Abdelouahed Tahri</p>
            <p className="text-[10px] text-blue-200/50">École Centrale Casablanca</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full relative min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden p-4 bg-gradient-to-r from-[#1a365d] to-[#234876] text-white flex justify-between items-center shadow-lg sticky top-0 z-30">
          <h1 className="font-serif text-xl font-bold text-[#d4a853]">Zelig</h1>
          <div className="flex items-center gap-2">
            <button onClick={() => setIsPreferencesOpen(true)} className="p-2.5 hover:bg-white/10 rounded-xl transition">
              <Settings size={18} />
            </button>
            <button onClick={() => setMobileMenuOpen(true)} className="p-2.5 hover:bg-white/10 rounded-xl transition">
              <Menu size={20} />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-hidden relative">
          {activeView === 'guide' && <ChatView initialQuery={initialChatQuery} onQueryConsumed={() => setInitialChatQuery(null)} />}
          {activeView === 'translate' && <TranslationView />}
          {activeView === 'mytrip' && <TripGenerator onNavigateToGuide={navigateToGuideWithQuery} />}
          {activeView === 'tour' && <TourView />}
          {activeView === 'safety' && <SafetyView />}
          {activeView === 'carnet' && <CarnetView />}
        </div>
      </main>
    </div>
  );
};

// --- VUES DÉTAILLÉES ---

const ChatView = ({ initialQuery, onQueryConsumed }) => {
  const { preferences } = usePreferences();
  const greeting = preferences.name ? `Bonjour ${preferences.name} !` : 'Bonjour !';

  const [messages, setMessages] = useState([{
    role: 'ai',
    content: `${greeting} Je suis votre guide pour découvrir le Maroc. Posez-moi vos questions sur les destinations, la culture, ou la gastronomie marocaine.`
  }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const endRef = useRef(null);

  useEffect(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), [messages]);

  // Handle initial query from navigation (e.g., from TripGenerator)
  useEffect(() => {
    if (initialQuery && !loading) {
      handleSendMessage(initialQuery);
      if (onQueryConsumed) onQueryConsumed();
    }
  }, [initialQuery]);

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;
    setError(null);
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setLoading(true);
    try {
      const response = await chatWithGuide(text);
      setMessages(prev => [...prev, { role: 'ai', content: response }]);
    } catch (err) {
      setError(err);
      setMessages(prev => prev.slice(0, -1));
    }
    setLoading(false);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userText = input;
    setInput('');
    await handleSendMessage(userText);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        <div className="max-w-3xl mx-auto space-y-5">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-4 lg:p-5 rounded-2xl ${msg.role === 'user'
                ? 'bg-[#1a365d] text-white rounded-br-sm'
                : 'bg-white text-slate-700 rounded-bl-sm shadow-natural border border-gray-100'
                }`}>
                {msg.role === 'ai' ? (
                  <ReactMarkdown
                    components={{
                      strong: ({ node, ...props }) => <span className="font-semibold text-[#1a365d]" {...props} />,
                      ul: ({ node, ...props }) => <ul className="list-disc ml-4 my-2 space-y-1" {...props} />,
                      li: ({ node, ...props }) => <li className="pl-1" {...props} />,
                      p: ({ node, ...props }) => <p className="mb-2 last:mb-0 leading-relaxed" {...props} />
                    }}
                  >
                    {String(msg.content)}
                  </ReactMarkdown>
                ) : (
                  msg.content
                )}
              </div>
            </div>
          ))}
          {loading && <MessageSkeleton />}
          {error && <ErrorDisplay error={error} onRetry={() => { setError(null); handleSend({ preventDefault: () => { } }); }} />}
          <div ref={endRef} />
        </div>
      </div>
      <div className="p-4 bg-white/80 backdrop-blur-sm border-t border-gray-200/50">
        <form onSubmit={handleSend} className="max-w-3xl mx-auto flex gap-3">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Posez votre question sur le Maroc..."
            className="flex-1 px-5 py-3.5 bg-gray-50 rounded-xl border border-gray-200 focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20 outline-none transition"
          />
          <VoiceInput onResult={(text) => setInput(text)} language="fr-FR" />
          <button
            disabled={loading}
            className="px-5 py-3.5 bg-gradient-to-r from-[#c75d3a] to-[#b54e2f] text-white rounded-xl hover:shadow-lg transition disabled:opacity-50 flex items-center gap-2"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

const TranslationView = () => {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [direction, setDirection] = useState('en_to_darija');
  const [showDetails, setShowDetails] = useState(false);

  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    setShowDetails(false);

    try {
      const data = await translateText(inputText, direction);
      setResult(data);
    } catch (e) {
      console.error(e);
      setResult({ translation: "Erreur de connexion", verification: null });
    }
    setLoading(false);
  };

  const toggleDirection = () => {
    setDirection(prev => prev === 'en_to_darija' ? 'darija_to_en' : 'en_to_darija');
    setInputText('');
    setResult(null);
  };

  return (
    <div className="h-full overflow-y-auto p-6 md:p-8 flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-serif text-[#1a365d] font-bold mb-2">Terjman</h2>
          <p className="text-gray-500">
            Traduction intelligente {direction === 'en_to_darija' ? "Anglais → Darija" : "Darija → Anglais"}
          </p>
        </div>

        {/* Direction Toggle */}
        <div className="flex justify-center">
          <button
            onClick={toggleDirection}
            className="flex items-center gap-4 px-6 py-3 bg-white rounded-full shadow-natural border border-gray-100 hover:shadow-natural-lg transition group"
          >
            <span className={`font-semibold ${direction === 'en_to_darija' ? 'text-[#1a365d]' : 'text-gray-400'}`}>
              English
            </span>
            <ArrowLeftRight size={18} className="text-[#c75d3a] group-hover:rotate-180 transition-transform duration-300" />
            <span className={`font-semibold ${direction === 'darija_to_en' ? 'text-[#1a365d]' : 'text-gray-400'}`}>
              الدارجة
            </span>
          </button>
        </div>

        {/* Translation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input */}
          <div className="bg-white p-6 rounded-2xl shadow-natural border border-gray-100 flex flex-col h-64">
            <label className="text-xs font-semibold text-gray-400 uppercase mb-3 flex items-center gap-2">
              <Languages size={14} /> {direction === 'en_to_darija' ? "Anglais" : "Darija"}
            </label>
            <textarea
              className="flex-1 w-full resize-none outline-none text-lg text-slate-800 placeholder:text-gray-300 bg-transparent leading-relaxed"
              placeholder={direction === 'en_to_darija' ? "Type your text here..." : "اكتب هنا..."}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>

          {/* Output */}
          <div className="bg-gradient-to-br from-amber-50/50 to-orange-50/50 p-6 rounded-2xl border border-amber-100/50 flex flex-col h-64 relative">
            <div className="flex justify-between items-center mb-3">
              <label className="text-xs font-semibold text-[#c75d3a] uppercase flex items-center gap-2">
                {direction === 'en_to_darija' ? "Darija" : "English"}
              </label>
              {result?.verification && (
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${result.verification.status.includes('Robuste')
                  ? 'bg-green-100 text-green-700'
                  : 'bg-amber-100 text-amber-700'
                  }`}>
                  {result.verification.status}
                </span>
              )}
            </div>

            {loading ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="w-8 h-8 border-3 border-[#c75d3a] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <div className="flex-1 text-xl text-[#1a365d] font-medium leading-relaxed overflow-y-auto">
                {result?.translation || <span className="text-gray-300 text-lg">La traduction apparaîtra ici...</span>}
              </div>
            )}

            {result?.translation && (
              <button
                onClick={() => navigator.clipboard.writeText(result.translation)}
                className="absolute bottom-4 right-4 p-2 bg-white/80 hover:bg-white rounded-full shadow-sm transition"
              >
                <Copy size={18} className="text-gray-500" />
              </button>
            )}
          </div>
        </div>

        {/* Translate Button */}
        <div className="flex justify-center">
          <button
            onClick={handleTranslate}
            disabled={loading || !inputText}
            className="px-10 py-4 bg-gradient-to-r from-[#c75d3a] to-[#b54e2f] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition disabled:opacity-50 flex items-center gap-3"
          >
            Traduire <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

const SafetyView = () => {
  return (
    <div className="h-full p-4 md:p-8 overflow-y-auto">
      <SecurityDashboard />
    </div>
  );
};

const TourView = () => {
  const [selected, setSelected] = useState(null);

  if (selected) return (
    <div className="h-full p-6 md:p-8 overflow-y-auto bg-white/50">
      <button onClick={() => setSelected(null)} className="flex items-center gap-2 text-[#1a365d] font-semibold mb-6 hover:text-[#c75d3a] transition">
        <ArrowLeft size={18} /> Retour aux circuits
      </button>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-natural-lg overflow-hidden">
        <div
          className="h-56 bg-cover bg-center flex items-center justify-center relative"
          style={{ backgroundImage: `url(${selected.image})`, backgroundColor: '#e8e0d5' }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <h2 className="text-4xl font-serif text-white font-bold relative z-10 drop-shadow-lg">{selected.title}</h2>
        </div>
        <div className="p-8">
          <p className="text-lg text-gray-600 mb-8 border-l-4 border-[#d4a853] pl-4 italic">{selected.description}</p>

          {/* Map */}
          <div className="mb-8">
            <h3 className="text-xl font-serif font-bold text-[#1a365d] mb-4 flex items-center gap-2">
              <Map size={22} className="text-[#c75d3a]" /> Itinéraire
            </h3>
            <TourMap itinerary={selected.itinerary} />
          </div>

          {/* Steps */}
          <h3 className="text-xl font-serif font-bold text-[#1a365d] mb-4">Programme détaillé</h3>
          <div className="space-y-4">
            {selected.itinerary.map((step, i) => (
              <div key={i} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c75d3a] to-[#a4442f] text-white flex items-center justify-center font-bold shrink-0">
                  {i + 1}
                </div>
                <div>
                  <h4 className="font-semibold text-[#1a365d]">{step.title}</h4>
                  <p className="text-gray-600 text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full p-6 md:p-8 overflow-y-auto">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-serif text-[#1a365d] font-bold mb-2">Circuits Classiques</h2>
        <p className="text-gray-500 mb-8">Itinéraires soigneusement élaborés pour découvrir le Maroc</p>

        <div className="grid md:grid-cols-3 gap-6">
          {TOURS_DATA.map(t => (
            <div key={t.id} className="bg-white rounded-2xl shadow-natural hover:shadow-natural-lg transition overflow-hidden group">
              <div
                className="h-44 bg-cover bg-center group-hover:scale-105 transition duration-500 relative"
                style={{ backgroundImage: `url(${t.image})`, backgroundColor: '#e8e0d5' }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-3 left-3 flex gap-2">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur rounded-full text-xs font-medium text-gray-700">
                    {t.duration}
                  </span>
                  <span className="px-3 py-1 bg-white/90 backdrop-blur rounded-full text-xs font-medium text-gray-700">
                    {t.level}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-serif font-bold text-lg text-[#1a365d] mb-2">{t.title}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{t.description}</p>
                <button
                  onClick={() => setSelected(t)}
                  className="w-full py-2.5 border-2 border-[#1a365d] text-[#1a365d] rounded-xl font-semibold hover:bg-[#1a365d] hover:text-white transition flex items-center justify-center gap-2"
                >
                  Découvrir <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CarnetView = () => {
  const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem('zelig_notes') || '[]'));
  const [input, setInput] = useState('');

  useEffect(() => localStorage.setItem('zelig_notes', JSON.stringify(notes)), [notes]);

  const add = (e) => {
    e.preventDefault();
    if (!input) return;
    setNotes([{ id: Date.now(), text: input, date: new Date().toLocaleDateString('fr-FR') }, ...notes]);
    setInput('');
  };

  return (
    <div className="h-full p-6 md:p-8 overflow-y-auto flex flex-col items-center">
      <div className="max-w-2xl w-full">
        <h2 className="text-3xl font-serif text-center text-[#1a365d] font-bold mb-2">Carnet de Voyage</h2>
        <p className="text-center text-gray-500 mb-8">Vos notes, découvertes et souvenirs</p>

        <form onSubmit={add} className="mb-8">
          <div className="flex gap-3 bg-white p-2 rounded-2xl shadow-natural">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Notez une découverte, un lieu, un souvenir..."
              className="flex-1 px-4 py-3 bg-transparent outline-none"
            />
            <button className="px-5 py-3 bg-gradient-to-r from-[#c75d3a] to-[#b54e2f] text-white rounded-xl font-semibold hover:shadow-lg transition flex items-center gap-2">
              <Plus size={18} /> Ajouter
            </button>
          </div>
        </form>

        <div className="space-y-3">
          {notes.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl shadow-natural">
              <div className="text-5xl mb-4">📔</div>
              <h3 className="text-xl font-serif text-[#1a365d] mb-2">Votre carnet est vide</h3>
              <p className="text-gray-500 mb-6">Commencez à noter vos découvertes marocaines</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['🍵 Meilleur thé', '📍 Vue secrète', '🛍️ Trouvaille'].map((hint, i) => (
                  <span key={i} className="px-4 py-2 bg-amber-50 text-amber-700 rounded-full text-sm">{hint}</span>
                ))}
              </div>
            </div>
          )}
          {notes.map(n => (
            <div key={n.id} className="bg-white p-5 rounded-xl shadow-natural hover:shadow-natural-lg transition flex justify-between items-start">
              <div>
                <p className="text-gray-800 mb-1">{n.text}</p>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Calendar size={12} /> {n.date}
                </span>
              </div>
              <button
                onClick={() => setNotes(notes.filter(x => x.id !== n.id))}
                className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Navigation Item ---
const NavItem = ({ icon, label, isActive, onClick, badge }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left relative ${isActive
      ? 'bg-white/10 text-white font-medium'
      : 'text-blue-100/70 hover:bg-white/5 hover:text-white'
      }`}
  >
    <span className={isActive ? 'text-[#d4a853]' : ''}>{icon}</span>
    <span className="text-sm">{label}</span>
    {badge && (
      <span className="ml-auto text-xs">{badge}</span>
    )}
    {isActive && (
      <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#d4a853] rounded-l-full" />
    )}
  </button>
);

export default App;