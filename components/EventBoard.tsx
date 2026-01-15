
import React, { useState } from 'react';
import { INITIAL_EVENTS } from '../constants';
import { EventInfo } from '../types';
import { Megaphone, Heart, Share2, Plus, Trash2 } from 'lucide-react';

const EventBoard: React.FC<{ role: string }> = ({ role }) => {
  const [events, setEvents] = useState<EventInfo[]>(INITIAL_EVENTS);

  const handleDelete = (id: string) => {
    if (confirm('このイベントを削除しますか？')) {
      setEvents(prev => prev.filter(e => e.id !== id));
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">お知らせ・イベント</h2>
          <p className="text-slate-500">アゴラで開催予定のイベント情報をチェック。</p>
        </div>
        {role === 'staff' && (
          <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
            <Plus size={20} />
            新規イベント作成
          </button>
        )}
      </div>

      <div className="space-y-6">
        {events.length === 0 ? (
          <div className="bg-white p-20 rounded-3xl border border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400">
            <Megaphone size={48} className="mb-4 opacity-20" />
            <p className="font-medium">現在開催予定のイベントはありません</p>
          </div>
        ) : (
          events.map(event => (
            <article key={event.id} className="bg-white rounded-3xl border border-slate-200 p-8 hover:shadow-lg transition-all relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-2 h-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full uppercase tracking-widest border border-blue-100">
                      NEWS / EVENT
                    </span>
                    <span className="text-slate-400 text-sm font-medium">{event.date}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-800 group-hover:text-blue-700 transition-colors">
                    {event.title}
                  </h3>
                  
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {event.content}
                  </p>

                  <div className="flex flex-wrap gap-4 pt-4">
                    <div className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-500">
                      場所: {event.location}
                    </div>
                    <div className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-500">
                      対象: {event.target}
                    </div>
                  </div>
                </div>

                <div className="flex flex-row md:flex-col justify-end md:justify-start items-center gap-3 md:w-24">
                  <button className="flex-1 md:w-full flex items-center justify-center gap-2 p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all border border-transparent hover:border-red-100 group/heart">
                    <Heart size={20} className="group-hover/heart:fill-current" />
                    <span className="text-xs font-bold">{event.likes}</span>
                  </button>
                  <button className="flex-1 md:w-full flex items-center justify-center p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-blue-500 hover:bg-blue-50 transition-all border border-transparent hover:border-blue-100">
                    <Share2 size={20} />
                  </button>
                  {role === 'staff' && (
                    <button 
                      onClick={() => handleDelete(event.id)}
                      className="flex-1 md:w-full flex items-center justify-center p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all"
                    >
                      <Trash2 size={20} />
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))
        )}
      </div>

      <div className="p-8 bg-blue-700 rounded-3xl text-white relative overflow-hidden">
        <div className="absolute right-[-50px] top-[-50px] w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h4 className="text-xl font-bold mb-1">公式LINEアカウント連携</h4>
            <p className="text-blue-100 text-sm">空席通知や予約のリマインドをリアルタイムで受け取れます。</p>
          </div>
          <button className="px-8 py-3 bg-white text-blue-700 font-bold rounded-2xl hover:bg-blue-50 transition-colors shadow-xl">
            今すぐ連携する
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventBoard;
