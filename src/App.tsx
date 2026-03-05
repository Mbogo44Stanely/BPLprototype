import { useState } from 'react';
import { useAuthStore } from './store/authStore';
import Auth from './components/Auth';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import UserManagement from './components/UserManagement';
import Tournaments from './components/Tournaments';
import LandingPage from './components/LandingPage';
import AuditLog from './audit/AuditLog';
import SystemSettings from './components/SystemSettings';
import FinancialOverview from './components/FinancialOverview';
import CategoriesDraws from './components/CategoriesDraws';
import RegisteredPlayers from './components/RegisteredPlayers';
import RefereeAssignment from './components/RefereeAssignment';
import MatchControl from './components/MatchControl';
import LiveResults from './components/LiveResults';
import DisciplinaryOversight from './components/DisciplinaryOversight';
import SystemReports from './components/SystemReports';
import PlayerProfile from './components/PlayerProfile';
import ClubProfile from './components/ClubProfile';
import ClubPlayers from './components/ClubPlayers';
import ClubCoaches from './components/ClubCoaches';
import TournamentRegistrations from './components/TournamentRegistrations';
import ClubFinancialOverview from './components/ClubFinancialOverview';
import ClubSanctionsCompliance from './components/ClubSanctionsCompliance';
import ClubMatchReports from './components/ClubMatchReports';
import ClubAnalytics from './components/ClubAnalytics';
import PlayerMyClub from './components/PlayerMyClub';
import PlayerMyTournaments from './components/PlayerMyTournaments';
import PlayerMyMatches from './components/PlayerMyMatches';
import PlayerRankings from './components/PlayerRankings';
import PlayerMatchHistory from './components/PlayerMatchHistory';
import PlayerNotifications from './components/PlayerNotifications';
import PlayerAppealsReports from './components/PlayerAppealsReports';
import ClubMatches from './components/ClubMatches';
import ClubCommunications from './components/ClubCommunications';
import ClubDisputes from './components/ClubDisputes';
import ClubReports from './components/ClubReports';

export default function App() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAuth, setShowAuth] = useState(false);

  if (!user) {
    if (showAuth) {
      return <Auth />;
    }
    return (
      <LandingPage 
        onGetStarted={() => setShowAuth(true)} 
        onLogin={() => setShowAuth(true)} 
      />
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <UserManagement />;
      case 'manage-tournaments':
      case 'tournament-details':
        return <Tournaments />;
      case 'categories-draws':
        return <CategoriesDraws />;
      case 'registered-players':
        return <RegisteredPlayers />;
      case 'referee-assignment':
        return <RefereeAssignment />;
      case 'match-control':
        return <MatchControl />;
      case 'live-results':
        return <LiveResults />;
      case 'audit':
      case 'audit-log':
      case 'logs':
        return <AuditLog />;
      case 'roles-permissions':
      case 'governance-structure':
      case 'disciplinary-oversight':
      case 'disciplinary-actions':
        return <DisciplinaryOversight />;
      case 'system-config':
      case 'settings':
        return <SystemSettings />;
      case 'financial-overview':
      case 'financials':
        return <FinancialOverview />;
      case 'reports':
        return <SystemReports />;
      case 'profile':
        return <PlayerProfile />;
      case 'club-profile':
        return <ClubProfile />;
      case 'club-players':
        return <ClubPlayers />;
      case 'club-coaches':
        return <ClubCoaches />;
      case 'tournament-registrations':
        return <TournamentRegistrations />;
      case 'sanctions-compliance':
        return <ClubSanctionsCompliance />;
      case 'match-reports':
        return <ClubMatchReports />;
      case 'analytics':
        return <ClubAnalytics />;
      case 'my-club':
        return <PlayerMyClub />;
      case 'my-tournaments':
        return <PlayerMyTournaments />;
      case 'matches':
        return <PlayerMyMatches />;
      case 'rankings':
        return <PlayerRankings />;
      case 'match-history':
        return <PlayerMatchHistory />;
      case 'notifications':
        return <PlayerNotifications />;
      case 'appeals':
        return <PlayerAppealsReports />;
      case 'club-matches':
        return <ClubMatches />;
      case 'club-communications':
        return <ClubCommunications />;
      case 'club-disputes':
        return <ClubDisputes />;
      case 'club-reports':
        return <ClubReports />;
      case 'backups':
      case 'feature-flags':
      case 'notifications-engine':
      case 'maintenance':
      case 'settings':
      case 'certification':
      case 'assigned-matches':
      case 'match-scoring':
      case 'tournament-assignments':
      case 'performance-reviews':
      case 'compliance-status':
      case 'ta-reports':
      case 'tournament-details':
      case 'categories-draws':
      case 'registered-players':
      case 'referee-assignment':
      case 'match-control':
      case 'live-results':
      case 'disciplinary-actions':
      case 'governance':
      case 'national-rankings':
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <h2 className="text-2xl font-bold text-slate-900 capitalize">{activeTab.replace(/-/g, ' ')} Module</h2>
            <p className="text-slate-500 mt-2">This module is under development.</p>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <h2 className="text-2xl font-bold text-slate-900">Module Coming Soon</h2>
            <p className="text-slate-500 mt-2">We're working hard to bring this feature to you.</p>
          </div>
        );
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
}
