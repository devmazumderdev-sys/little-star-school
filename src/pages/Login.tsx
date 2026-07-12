import React, { useState } from 'react';

interface LoginProps {
  onLoginSuccess: (role: 'student' | 'teacher', userData: { name: string; class?: string; rollNo?: string; phone?: string }) => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const [name, setName] = useState('');
  const [extraField, setExtraField] = useState(''); // Class for student, Phone for teacher
  const [rollNo, setRollNo] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !extraField) return alert('Please fill required fields');

    if (role === 'student') {
      onLoginSuccess('student', { name, class: extraField, rollNo });
    } else {
      onLoginSuccess('teacher', { name, phone: extraField });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800">Little Star School</h2>
          <p className="text-xs text-slate-500 mt-1">Select your portal to continue</p>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button type="button" onClick={() => { setRole('student'); setExtraField(''); }} className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${role === 'student' ? 'bg-blue-600 text-white shadow' : 'text-slate-500'}`}>Student</button>
          <button type="button" onClick={() => { setRole('teacher'); setExtraField(''); }} className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${role === 'teacher' ? 'bg-emerald-600 text-white shadow' : 'text-slate-500'}`}>Teacher</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Full Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Name" className="w-full px-3 py-2 border rounded-lg text-xs outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">{role === 'student' ? 'Class / Standard' : 'Mobile Number'}</label>
            <input type="text" value={extraField} onChange={(e) => setExtraField(e.target.value)} placeholder={role === 'student' ? 'e.g. Class 5' : 'Enter phone number'} className="w-full px-3 py-2 border rounded-lg text-xs outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          {role === 'student' && (
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Roll Number (Optional)</label>
              <input type="text" value={rollNo} onChange={(e) => setRollNo(e.target.value)} placeholder="e.g. A-12" className="w-full px-3 py-2 border rounded-lg text-xs outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          )}

          <button type="submit" className={`w-full text-white font-semibold py-2.5 rounded-xl text-xs shadow transition-colors ${role === 'student' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-emerald-600 hover:bg-emerald-700'}`}>
            Login to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}