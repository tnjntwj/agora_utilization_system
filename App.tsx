
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  CalendarDays, 
  Users, 
  Bell, 
  UserCircle, 
  Menu, 
  X,
  Settings,
  ShieldAlert
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import RoomReservation from './components/RoomReservation';
import StudyMatching from './components/StudyMatching';
import EventBoard from './components/EventBoard';
import { UserRole } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [role, setRole] = useState<UserRole>('student');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Close sidebar on mobile when tab changes
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard role={role} setActiveTab={setActiveTab} />;
      case 'reservation':
        return <RoomReservation role={role} />;
      case 'matching':
        return <StudyMatching role={role} />;
      case 'events':
        return <EventBoard role={role} />;
      default:
        return <Dashboard role={role} setActiveTab={setActiveTab} />;
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'ダッシュボード', icon: LayoutDashboard },
    { id: 'reservation', label: '部屋予約', icon: CalendarDays },
    { id: 'matching', label: '勉強会マッチング', icon: Users },
    { id: 'events', label: 'お知らせ・イベント', icon: Bell },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      {/* Mobile Header */}
      <div className="md:hidden bg-blue-700 text-white p-4 flex justify-between items-center sticky top-0 z-50 shadow-md">
        <h1 className="text-lg font-bold flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <span className="text-blue-700 font-black text-xl">A</span>
          </div>
          Agora
        </h1>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Sidebar / Navigation */}
      <aside className={`
        fixed inset-0 z-40 md:relative md:flex md:w-64 flex-col bg-white border-r border-slate-200 transition-transform duration-300 transform
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="hidden md:flex p-6 items-center gap-3">
          <div className="w-10 h-10 bg-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
            <span className="text-white font-black text-2xl">A</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-800 leading-tight">Agora</h1>
            <p className="text-xs text-slate-500">Utilization System</p>
          </div>
        </div>

        <nav className="flex-1 mt-4 px-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${activeTab === item.id 
                    ? 'bg-blue-50 text-blue-700 font-semibold shadow-sm border border-blue-100' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                `}
              >
                <Icon size={20} className={activeTab === item.id ? 'text-blue-600' : 'text-slate-400'} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 mt-auto border-t border-slate-100">
          <div className="bg-slate-50 rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-slate-200 p-2 rounded-full">
                <UserCircle size={24} className="text-slate-500" />
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-semibold truncate text-slate-800">
                  {role === 'staff' ? '図書館職員 (Admin)' : 'UEC 学生'}
                </p>
                <p className="text-xs text-slate-500">2024-52319</p>
              </div>
            </div>
            <button 
              onClick={() => setRole(role === 'student' ? 'staff' : 'student')}
              className="w-full py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 flex items-center justify-center gap-2"
            >
              <ShieldAlert size={14} />
              {role === 'student' ? '職員モードへ' : '学生モードへ'}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
