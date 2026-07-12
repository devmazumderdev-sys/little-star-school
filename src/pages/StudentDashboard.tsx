import React, { useState } from 'react';
import { BookOpen, Calendar, ClipboardCheck, CreditCard, Bell, FileText, LogOut } from 'lucide-react';

interface StudentDashboardProps {
  studentData: { name: string; class: string; rollNo: string };
  onLogout: () => void;
}

export default function StudentDashboard({ studentData, onLogout }: StudentDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [feesPaid, setFeesPaid] = useState(false);

  const homeworks = [
    { id: 1, subject: 'Mathematics', task: 'Solve Exercise 4.2 questions 1 to 5', due: 'Tomorrow' },
    { id: 2, subject: 'Science', task: 'Draw diagram of human digestive system', due: '15th July' }
  ];

  const notices = [
    { id: 1, title: 'Independence Day Celebration', date: '12th July', desc: 'Dress code is ethnic white.' },
    { id: 2, title: 'Weekly Test Schedule', date: '10th July', desc: 'Tests start from next Monday.' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col max-w-md mx-auto shadow-2xl border-x border-slate-200">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-b-3xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-xs text-blue-100 uppercase tracking-wider block">Welcome back,</span>
            <h2 className="text-xl font-bold">{studentData.name}</h2>
          </div>
          <button onClick={onLogout} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
            <LogOut size={18} />
          </button>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 flex justify-between text-xs font-medium border border-white/10">
          <span>Standard: {studentData.class}</span>
          <span>Roll No: {studentData.rollNo}</span>
          <span className="text-emerald-300">● Active</span>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-4 pb-24">
        {activeTab === 'overview' && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center space-x-3">
                <div className="p-2.5 bg-green-50 rounded-lg text-green-600"><ClipboardCheck size={20} /></div>
                <div><p className="text-xs text-slate-400">Attendance</p><p className="text-sm font-bold text-slate-700">88%</p></div>
              </div>
              <div onClick={() => setActiveTab('fees')} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center space-x-3 cursor-pointer hover:bg-slate-50">
                <div className="p-2.5 bg-amber-50 rounded-lg text-amber-600"><CreditCard size={20} /></div>
                <div><p className="text-xs text-slate-400">Fees Status</p><p className={`text-sm font-bold ${feesPaid ? 'text-green-600' : 'text-rose-500'}`}>{feesPaid ? 'Paid' : 'Pending'}</p></div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
              <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center"><Bell size={16} className="mr-1.5 text-blue-600" /> School Notice Board</h3>
              <div className="space-y-3">
                {notices.map(notice => (
                  <div key={notice.id} className="p-3 bg-slate-50 rounded-lg border-l-4 border-blue-500">
                    <div className="flex justify-between items-center mb-1"><h4 className="text-xs font-bold text-slate-700">{notice.title}</h4><span className="text-[10px] text-slate-400">{notice.date}</span></div>
                    <p className="text-xs text-slate-500">{notice.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'homework' && (
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-800">Daily Homework</h3>
            {homeworks.map(hw => (
              <div key={hw.id} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-1">
                <div className="flex justify-between items-center"><span className="px-2 py-0.5 bg-blue-50 text-blue-600 font-bold text-[10px] rounded">{hw.subject}</span><span className="text-[10px] text-rose-500 font-medium">Due: {hw.due}</span></div>
                <p className="text-xs font-medium text-slate-700 mt-1">{hw.task}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'fees' && (
          <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-800">Term 1 School Fees</h3>
            <div className="p-4 bg-slate-50 rounded-xl space-y-2">
              <div className="flex justify-between text-xs text-slate-500"><span>Tuition Fee</span><span>₹12,500</span></div>
              <div className="border-t pt-2 mt-2 flex justify-between text-sm font-bold text-slate-800"><span>Total</span><span>₹14,000</span></div>
            </div>
            {feesPaid ? (
              <div className="bg-emerald-50 text-emerald-700 p-3 rounded-lg text-center font-semibold text-xs border border-emerald-200">
                🎉 Payment Successful!
              </div>
            ) : (
              <button onClick={() => setFeesPaid(true)} className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-xl text-sm shadow-md">
                Pay Now Online
              </button>
            )}
          </div>
        )}

        {activeTab === 'report' && (
          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-800">Academic Reports</h3>
            <div className="p-3 border rounded-lg flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-indigo-50 rounded text-indigo-600"><FileText size={20} /></div>
                <div><p className="text-xs font-bold text-slate-700">First Term Report Card</p></div>
              </div>
              <span className="text-xs font-bold text-emerald-600">Grade: A+</span>
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t px-4 py-2.5 flex justify-between items-center rounded-t-2xl shadow-xl z-50">
        <button onClick={() => setActiveTab('overview')} className={`flex flex-col items-center ${activeTab === 'overview' ? 'text-blue-600 font-semibold' : 'text-slate-400'}`}><BookOpen size={20} /><span className="text-[10px]">Overview</span></button>
        <button onClick={() => setActiveTab('homework')} className={`flex flex-col items-center ${activeTab === 'homework' ? 'text-blue-600 font-semibold' : 'text-slate-400'}`}><Calendar size={20} /><span className="text-[10px]">Homework</span></button>
        <button onClick={() => setActiveTab('fees')} className={`flex flex-col items-center ${activeTab === 'fees' ? 'text-blue-600 font-semibold' : 'text-slate-400'}`}><CreditCard size={20} /><span className="text-[10px]">Fees</span></button>
        <button onClick={() => setActiveTab('report')} className={`flex flex-col items-center ${activeTab === 'report' ? 'text-blue-600 font-semibold' : 'text-slate-400'}`}><FileText size={20} /><span className="text-[10px]">Reports</span></button>
      </div>
    </div>
  );
}