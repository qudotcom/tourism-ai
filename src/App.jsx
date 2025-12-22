import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import TranslationTool from './components/TranslationTool';
import SecurityScanner from './components/SecurityScanner';
import SocialGuestbook from './components/SocialGuestbook';

function App() {
  const [activeTab, setActiveTab] = useState('chat');

  return (
    <div className="min-h-screen flex font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 ml-64 relative min-h-screen">
        {activeTab === 'chat' && <ChatInterface />}
        
        {/* We reuse the translator for 'trip' for now, or you can build a separate Planner */}
        {activeTab === 'trip' && <TranslationTool />} 
        
        {activeTab === 'security' && <SecurityScanner />}
        
        {activeTab === 'social' && <SocialGuestbook />}
      </main>
    </div>
  );
}

export default App;
