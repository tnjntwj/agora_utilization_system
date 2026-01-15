
import React, { useState, useEffect } from 'react';
import { AreaStatus, CongestionLevel } from '../types';
import { AREAS } from '../constants';
// Added ShieldAlert to imports
import { TrendingUp, Users, Calendar, MapPin, RefreshCw, ShieldAlert } from 'lucide-react';

interface DashboardProps {
  role: string;
  setActiveTab: (tab: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ role, setActiveTab }) => {
  const [statuses, setStatuses] = useState<AreaStatus[]>(AREAS);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getLevelColor = (level: CongestionLevel) => {
    switch (level) {
      case '空き': return 'bg-emerald-500 text-white';
      case 'やや混雑': return 'bg-amber-500 text-white';
      case '混雑': return 'bg-orange-600 text-white';
      case '満席': return 'bg-red-600 text-white';
      default: return 'bg-slate-400 text-white';
    }
  };

  const getLevelTextColor = (level: CongestionLevel) => {
    switch (level) {
      case '空き': return 'text-emerald-700';
      case 'やや混雑': return 'text-amber-700';
      case '混雑': return 'text-orange-700';
      case '満席': return 'text-red-700';
      default: return 'text-slate-700';
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setStatuses(prev => prev.map(area => ({
        ...area,
        occupancy: Math.min(100, Math.max(0, area.occupancy + (Math.random() * 20 - 10)))
      })).map(area => {
        let level: CongestionLevel = '空き';
        if (area.occupancy > 90) level = '満席';
        else if (area.occupancy > 70) level = '混雑';
        else if (area.occupancy > 40) level = 'やや混雑';
        return { ...area, level };
      }));
      setIsRefreshing(false);
    }, 800);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">こんにちは</h2>
          <p className="text-slate-500 mt-1">アゴラの現在の状況を確認しましょう。</p>
        </div>
        <button 
          onClick={handleRefresh}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium hover:bg-slate-50 transition-all text-slate-600 shadow-sm"
        >
          <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
          情報を更新
        </button>
      </header>

      {/* Congestion Overview */}
      <section className="bg-white p-6 md:p-8 rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
              <TrendingUp size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-800">混雑状況（エリア別）</h3>
          </div>
          <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            リアルタイム
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statuses.map((area) => (
            <div key={area.id} className="relative p-5 bg-slate-50 rounded-2xl border border-slate-100 group transition-all hover:shadow-md">
              <div className="flex justify-between items-start mb-4">
                <span className="text-slate-500 font-medium text-sm flex items-center gap-1">
                  <MapPin size={14} />
                  {area.name}
                </span>
                <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wider ${getLevelColor(area.level)} shadow-sm`}>
                  {area.level}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className={getLevelTextColor(area.level)}>利用率</span>
                  <span className="text-slate-700">{Math.round(area.occupancy)}%</span>
                </div>
                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${
                      area.occupancy > 80 ? 'bg-red-500' : area.occupancy > 50 ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${area.occupancy}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          onClick={() => setActiveTab('reservation')}
          className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-3xl text-white shadow-xl shadow-blue-200/50 cursor-pointer hover:scale-[1.02] transition-transform group"
        >
          <div className="bg-white/20 p-3 rounded-2xl w-fit mb-6">
            <Calendar size={32} />
          </div>
          <h4 className="text-2xl font-bold mb-2">部屋を予約する</h4>
          <p className="text-blue-100 text-sm mb-6">グループ学習室やプレゼンエリアの空き状況を確認し、即座に確保できます。</p>
          <div className="flex items-center gap-2 text-sm font-semibold bg-white/10 w-fit px-4 py-2 rounded-full group-hover:bg-white/20 transition-colors">
            予約画面へ
            <span className="text-lg">→</span>
          </div>
        </div>

        <div 
          onClick={() => setActiveTab('matching')}
          className="bg-white p-8 rounded-3xl border border-slate-200 shadow-lg cursor-pointer hover:scale-[1.02] transition-transform group"
        >
          <div className="bg-orange-100 text-orange-600 p-3 rounded-2xl w-fit mb-6">
            <Users size={32} />
          </div>
          <h4 className="text-2xl font-bold text-slate-800 mb-2">勉強会に参加・募集</h4>
          <p className="text-slate-500 text-sm mb-6">志を同じくする仲間を見つけましょう。専門科目の課題から資格試験まで幅広くマッチング。</p>
          <div className="flex items-center gap-2 text-sm font-semibold text-orange-600 bg-orange-50 w-fit px-4 py-2 rounded-full group-hover:bg-orange-100 transition-colors">
            マッチング掲示板へ
            <span className="text-lg">→</span>
          </div>
        </div>
      </div>

      {role === 'staff' && (
        <section className="bg-slate-900 text-white p-6 rounded-3xl">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <ShieldAlert className="text-amber-400" />
            管理者用クイックビュー
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
              <p className="text-slate-400 text-xs">本日の総予約数</p>
              <p className="text-2xl font-bold">24 <span className="text-sm font-normal text-slate-500">件</span></p>
            </div>
            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
              <p className="text-slate-400 text-xs">現在のアゴラ内人数</p>
              <p className="text-2xl font-bold">142 <span className="text-sm font-normal text-slate-500">人</span></p>
            </div>
            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
              <p className="text-slate-400 text-xs">未読報告/要望</p>
              <p className="text-2xl font-bold text-amber-400">3 <span className="text-sm font-normal text-slate-500 text-white">件</span></p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Dashboard;
