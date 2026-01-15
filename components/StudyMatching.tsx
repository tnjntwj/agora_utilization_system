
import React, { useState } from 'react';
import { INITIAL_STUDY_GROUPS, AREAS } from '../constants';
import { StudyGroup } from '../types';
import { Plus, Users, Search, MapPin, Calendar, Clock, ArrowRight, Check, X, Info } from 'lucide-react';

const StudyMatching: React.FC<{ role: string }> = ({ role }) => {
  const [groups, setGroups] = useState<StudyGroup[]>(INITIAL_STUDY_GROUPS);
  const [filter, setFilter] = useState('');
  
  // Modals state
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  const [selectedGroup, setSelectedGroup] = useState<StudyGroup | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Form state for new group
  const [newGroup, setNewGroup] = useState({
    theme: '',
    date: new Date().toISOString().split('T')[0],
    startTime: '13:00',
    endTime: '15:00',
    location: AREAS[0].name,
    maxMembers: 4,
    description: ''
  });

  const filteredGroups = groups.filter(g => 
    g.theme.toLowerCase().includes(filter.toLowerCase()) || 
    g.description.toLowerCase().includes(filter.toLowerCase())
  );

  const handleJoin = (group: StudyGroup) => {
    setSelectedGroup(group);
    setIsJoinModalOpen(true);
  };

  const confirmJoin = () => {
    setIsProcessing(true);
    setTimeout(() => {
      if (selectedGroup) {
        setGroups(prev => prev.map(g => 
          g.id === selectedGroup.id 
            ? { ...g, currentMembers: g.currentMembers + 1 } 
            : g
        ));
      }
      setIsProcessing(false);
      setIsJoinModalOpen(false);
      setSelectedGroup(null);
      alert("参加申し込みが完了しました！");
    }, 1200);
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroup.theme || !newGroup.description) {
      alert("テーマと説明を入力してください。");
      return;
    }

    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      const createdGroup: StudyGroup = {
        id: `m${Date.now()}`,
        theme: newGroup.theme,
        date: newGroup.date,
        startTime: newGroup.startTime,
        endTime: newGroup.endTime,
        location: newGroup.location,
        organizer: role === 'staff' ? '図書館職員' : '自分(UEC学生)',
        currentMembers: 1,
        maxMembers: newGroup.maxMembers,
        description: newGroup.description,
        status: 'recruiting'
      };

      setGroups([createdGroup, ...groups]);
      setIsProcessing(false);
      setIsCreateModalOpen(false);
      // Reset form
      setNewGroup({
        theme: '',
        date: new Date().toISOString().split('T')[0],
        startTime: '13:00',
        endTime: '15:00',
        location: AREAS[0].name,
        maxMembers: 4,
        description: ''
      });
      alert("新しい勉強会を作成しました！");
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">勉強会マッチング</h2>
          <p className="text-slate-500">学びの仲間を見つけ、高め合いましょう。</p>
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 bg-orange-600 text-white px-6 py-4 rounded-2xl font-bold hover:bg-orange-700 shadow-xl shadow-orange-100 transition-all w-full md:w-auto justify-center"
        >
          <Plus size={20} />
          新規募集を作成
        </button>
      </div>

      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-blue-600" size={20} />
        <input 
          type="text" 
          placeholder="テーマやキーワードで検索..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredGroups.map(group => (
          <div key={group.id} className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-blue-300 transition-all hover:shadow-xl shadow-slate-100 flex flex-col group/card">
            <div className="flex justify-between items-start mb-4">
              <span className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-widest ${
                group.currentMembers >= group.maxMembers ? 'bg-slate-100 text-slate-500' : 'bg-blue-100 text-blue-700'
              }`}>
                {group.currentMembers >= group.maxMembers ? '定員到達' : '募集中'}
              </span>
              <div className="flex items-center gap-2 text-slate-400 group-hover/card:text-blue-500 transition-colors">
                <Users size={16} />
                <span className="text-sm font-bold">{group.currentMembers} / {group.maxMembers}</span>
              </div>
            </div>

            <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover/card:text-blue-700 transition-colors leading-tight">
              {group.theme}
            </h3>
            
            <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed">
              {group.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-2 text-slate-600">
                <div className="p-1.5 bg-slate-100 rounded-lg"><Calendar size={14} /></div>
                <span className="text-xs font-medium">{group.date}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <div className="p-1.5 bg-slate-100 rounded-lg"><Clock size={14} /></div>
                <span className="text-xs font-medium">{group.startTime} - {group.endTime}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 col-span-2">
                <div className="p-1.5 bg-slate-100 rounded-lg"><MapPin size={14} /></div>
                <span className="text-xs font-medium">{group.location}</span>
              </div>
            </div>

            <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 border border-blue-100">
                  <span className="text-[10px] font-bold">{group.organizer[0]}</span>
                </div>
                <span className="text-xs text-slate-500 font-medium">主催: {group.organizer}</span>
              </div>
              
              <button 
                disabled={group.currentMembers >= group.maxMembers}
                onClick={() => handleJoin(group)}
                className={`
                  flex items-center gap-1 text-sm font-bold px-4 py-2 rounded-xl transition-all
                  ${group.currentMembers >= group.maxMembers 
                    ? 'bg-slate-50 text-slate-400 cursor-not-allowed' 
                    : 'bg-white text-blue-600 hover:bg-blue-600 hover:text-white border border-blue-100'}
                `}
              >
                参加する
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl p-8 shadow-2xl relative animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setIsCreateModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
            >
              <X size={20} />
            </button>

            <form onSubmit={handleCreateSubmit} className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                  <Plus className="text-orange-600" />
                  新規募集を作成
                </h3>
                <p className="text-slate-500 text-sm">勉強会の詳細を入力してください。</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">学習テーマ</label>
                  <input 
                    type="text" 
                    required
                    value={newGroup.theme}
                    onChange={(e) => setNewGroup({...newGroup, theme: e.target.value})}
                    placeholder="例: 微分積分学I 課題協力"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">開催日</label>
                    <input 
                      type="date" 
                      required
                      value={newGroup.date}
                      onChange={(e) => setNewGroup({...newGroup, date: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">最大人数</label>
                    <input 
                      type="number" 
                      min="2"
                      max="10"
                      required
                      value={newGroup.maxMembers}
                      onChange={(e) => setNewGroup({...newGroup, maxMembers: parseInt(e.target.value)})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">開始</label>
                    <input 
                      type="time" 
                      required
                      value={newGroup.startTime}
                      onChange={(e) => setNewGroup({...newGroup, startTime: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">終了</label>
                    <input 
                      type="time" 
                      required
                      value={newGroup.endTime}
                      onChange={(e) => setNewGroup({...newGroup, endTime: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">場所</label>
                  <select 
                    value={newGroup.location}
                    onChange={(e) => setNewGroup({...newGroup, location: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 font-medium"
                  >
                    {AREAS.map(area => <option key={area.id} value={area.name}>{area.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">説明文</label>
                  <textarea 
                    required
                    rows={4}
                    value={newGroup.description}
                    onChange={(e) => setNewGroup({...newGroup, description: e.target.value})}
                    placeholder="学習内容や、どんな人に参加してほしいかなどを記入してください。"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                  ></textarea>
                </div>
              </div>

              <div className="flex gap-4 pt-2">
                <button 
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="flex-1 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-colors"
                >
                  キャンセル
                </button>
                <button 
                  type="submit"
                  disabled={isProcessing}
                  className="flex-1 py-4 bg-orange-600 text-white font-bold rounded-2xl hover:bg-orange-700 transition-colors shadow-lg shadow-orange-100 flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    '募集を開始する'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Join Confirmation Modal */}
      {isJoinModalOpen && selectedGroup && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-2xl font-bold text-slate-800 mb-2">参加申し込み</h3>
            <p className="text-slate-500 mb-6 leading-relaxed">
              「<span className="font-bold text-slate-700">{selectedGroup.theme}</span>」への参加を申し込みます。よろしいですか？
            </p>

            <div className="bg-slate-50 p-4 rounded-2xl mb-8 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">開催日時</span>
                <span className="font-medium text-slate-700">{selectedGroup.date} {selectedGroup.startTime}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">現在の参加人数</span>
                <span className="font-medium text-slate-700">{selectedGroup.currentMembers} 名</span>
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setIsJoinModalOpen(false)}
                className="flex-1 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-colors"
              >
                いいえ
              </button>
              <button 
                onClick={confirmJoin}
                disabled={isProcessing}
                className="flex-1 py-4 bg-orange-600 text-white font-bold rounded-2xl hover:bg-orange-700 transition-colors shadow-lg shadow-orange-100 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Check size={20} />
                    参加確定
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyMatching;
