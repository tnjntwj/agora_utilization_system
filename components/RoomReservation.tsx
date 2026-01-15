
import React, { useState } from 'react';
import { ROOMS } from '../constants';
import { Reservation } from '../types';
// Added X to imports
import { Info, CheckCircle2, AlertCircle, Search, Clock, X } from 'lucide-react';

const HOURS = Array.from({ length: 13 }, (_, i) => i + 9); // 9:00 to 21:00

const RoomReservation: React.FC<{ role: string }> = ({ role }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const [form, setForm] = useState({
    room: ROOMS[0].id,
    start: '10:00',
    end: '11:00',
    purpose: '',
    count: 1
  });

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    if (!form.purpose) {
      alert("利用目的を入力してください");
      return;
    }

    const newRes: Reservation = {
      id: Math.random().toString(36).substr(2, 9),
      roomId: form.room,
      startTime: `${selectedDate} ${form.start}`,
      endTime: `${selectedDate} ${form.end}`,
      purpose: form.purpose,
      count: form.count,
      userId: 'user123'
    };

    setReservations([...reservations, newRes]);
    setBookingStatus('success');
    setTimeout(() => {
      setShowModal(false);
      setBookingStatus('idle');
      setForm({ ...form, purpose: '', count: 1 });
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">部屋予約</h2>
          <p className="text-slate-500">アゴラ内の個室を確保しましょう。</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all flex items-center gap-2"
        >
          <Search size={20} />
          新規予約
        </button>
      </div>

      {/* Date Selector & Calendar View (Simplified) */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-4 mb-8">
          <input 
            type="date" 
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <span className="text-slate-500 text-sm">の空き状況</span>
        </div>

        {/* Timeline Grid */}
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Header row with hours */}
            <div className="flex border-b border-slate-100 pb-2 mb-2">
              <div className="w-40 shrink-0 font-bold text-slate-400 text-xs">施設名 / 時間</div>
              <div className="flex-1 flex justify-between px-2">
                {HOURS.map(h => (
                  <div key={h} className="text-[10px] text-slate-400 font-medium">{h}:00</div>
                ))}
              </div>
            </div>

            {/* Room rows */}
            {ROOMS.map(room => (
              <div key={room.id} className="flex items-center group py-4 border-b border-slate-50 last:border-0">
                <div className="w-40 shrink-0">
                  <p className="font-bold text-slate-700 text-sm">{room.name}</p>
                  <p className="text-[10px] text-slate-400">定員: {room.capacity}名</p>
                </div>
                <div className="flex-1 h-10 bg-slate-100 rounded-lg relative overflow-hidden flex divide-x divide-white">
                  {HOURS.slice(0, -1).map(h => (
                    <div key={h} className="flex-1 relative group/slot hover:bg-slate-200 transition-colors cursor-pointer">
                      {/* Check if reserved */}
                      {reservations.find(r => r.roomId === room.id && r.startTime.includes(`${h.toString().padStart(2, '0')}:`)) && (
                        <div className="absolute inset-y-0 left-0 w-full bg-blue-500 border-x-2 border-white z-10 flex items-center justify-center overflow-hidden">
                          <span className="text-[8px] text-white font-bold opacity-80 whitespace-nowrap">予約済</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-8 flex items-center gap-6 text-xs text-slate-500 bg-slate-50 p-3 rounded-xl">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-slate-100 rounded shadow-inner"></div>
            <span>空き</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span>予約済</span>
          </div>
          <div className="flex items-center gap-2">
            <Info size={14} className="text-blue-500" />
            <span>予約は30分単位で可能です。</span>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl p-8 shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
            >
              <X size={20} />
            </button>

            {bookingStatus === 'success' ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">予約が完了しました</h3>
                <p className="text-slate-500">
                  予約ID: <span className="font-mono font-bold text-slate-800">RES-{Math.floor(Math.random() * 90000) + 10000}</span>
                </p>
                <p className="text-sm text-slate-400">確認メールを送信しました。</p>
              </div>
            ) : (
              <form onSubmit={handleBook} className="space-y-6">
                <div className="mb-2">
                  <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                    <Clock className="text-blue-600" />
                    新規予約の作成
                  </h3>
                  <p className="text-slate-500 text-sm">必要事項を入力してください。</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">施設を選択</label>
                    <select 
                      value={form.room}
                      onChange={(e) => setForm({...form, room: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                    >
                      {ROOMS.map(r => <option key={r.id} value={r.id}>{r.name} (定員{r.capacity}名)</option>)}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">開始時刻</label>
                      <input 
                        type="time" 
                        step="1800"
                        value={form.start}
                        onChange={(e) => setForm({...form, start: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">終了時刻</label>
                      <input 
                        type="time" 
                        step="1800"
                        value={form.end}
                        onChange={(e) => setForm({...form, end: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">利用人数</label>
                    <input 
                      type="number" 
                      min="1"
                      value={form.count}
                      onChange={(e) => setForm({...form, count: parseInt(e.target.value)})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">利用目的 (100字以内)</label>
                    <textarea 
                      maxLength={100}
                      rows={3}
                      value={form.purpose}
                      onChange={(e) => setForm({...form, purpose: e.target.value})}
                      placeholder="例: 数学I 演習のグループワーク"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    ></textarea>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-colors"
                  >
                    キャンセル
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100"
                  >
                    予約を確定する
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomReservation;
