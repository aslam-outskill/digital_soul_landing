import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import FAQPage from './pages/FAQPage';
import PersonaSetupPage from './pages/PersonaSetupPage';
import DashboardPage from './pages/DashboardPage';
import ChatPage from './pages/ChatPage';
import InviteFamilyPage from './pages/InviteFamilyPage';
import SettingsPage from './pages/SettingsPage';
import ContributorPage from './pages/ContributorPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/persona-setup" element={<PersonaSetupPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/invite-family" element={<InviteFamilyPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/contributor" element={<ContributorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;