import React, { useState, useEffect } from 'react';
import { Users, ClipboardCheck, PlusCircle, Bell, CreditCard, LogOut } from 'lucide-react';

interface Student {
  id: number;
  name: string;
  rollNo: string;
  class: string;
  status: string;
}

interface TeacherDashboardProps {
  teacherData: { name: string; phone: string };
  onLogout: () => void;
}

export default function TeacherDashboard({ teacherData, onLogout }: TeacherDashboardProps) {
  const [activeTab, setActiveTab] = useState('attendance');
  
  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('school_students');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('school_students', JSON.stringify(students));
  }, [students]);

  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentRoll, setNewStudentRoll] = useState('');
  const [newStudentClass, setNewStudentClass] = useState('');

  const toggleAttendance = (id: number, currentStatus: string) => {
    setStudents(students.map((s) => 
      s.id === id ? { ...s, status: currentStatus === 'Present' ? 'Absent' : 'Present' } : s
    ));
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName || !newStudentRoll || !newStudentClass) return alert('Please fill all fields');
    
    const newStudent: Student = {
      id: Date.now(),
      name: newStudentName,
      rollNo: newStudentRoll,
      class: newStudentClass,
      status: 'Present'
    };
    
    setStudents([...students, newStudent]);
    setNewStudentName('');
    setNewStudentRoll('');
    setNewStudentClass('');
    alert('Student added successfully!');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col max-w-md mx-auto shadow-2xl border-x border-slate-200">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-6 rounded-b-3xl shadow-md">
        <div className="flex justify-between items-center mb-2">
          <div>
            <span className="text-xs text-emerald-100 uppercase tracking-wider block">Teacher Portal</span>
            <h2 className="text-xl font-bold">{teacherData.name}</h2>
          </div>
          <button onClick={onLogout} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
            <LogOut size={18} />
          </button>
        </div>
        <p className="text-xs text-emerald-100/85">📞 {teacherData.phone}</p>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-4 pb-24">
        {activeTab === 'attendance' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-slate-800">Attendance Register</h3>
              <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-2 py-1 rounded">
                Students: {students.length}
              </span>
            </div>
            
            {students.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-8">No students registered yet.</p>
            ) : (
              <div className="space-y-2.5">
                {students.map((student) => (
                  <div key={student.id} className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex justify-between items-center">
                    <div>
                      <h4 className="text-sm font-bold text-slate-700">{student.name}</h4>
                      <p className="text-[11px] text-slate-400">{student.class} | Roll: {student.rollNo}</p>
                    </div>
                    <button 
                      onClick={() => toggleAttendance(student.id, student.status)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
                        student.status === 'Present' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                      }`}
                    >
                      {student.status}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'add-student' && (
          <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-800 flex items-center">
              <PlusCircle size={18} className="mr-1.5 text-emerald-600" /> Register Student
            </h3>
            <form onSubmit={handleAddStudent} className="space-y-3.5">
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Student Name</label>
                <input type="text" value={newStudentName} onChange={(e) => setNewStudentName(e.target.value)} placeholder="Full Name" className="w-full px-3 py-2 border rounded-lg text-xs outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">Class</label>
                  <input type="text" value={newStudentClass} onChange={(e) => setNewStudentClass(e.target.value)} placeholder="Class 5" className="w-full px-3 py-2 border rounded-lg text-xs outline-none" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">Roll No</label>
                  <input type="text" value={newStudentRoll} onChange={(e) => setNewStudentRoll(e.target.value)} placeholder="A-10" className="w-full px-3 py-2 border rounded-lg text-xs outline-none" />
                </div>
              </div>
              <button type="submit" className="w-full bg-emerald-600 text-white font-semibold py-2 rounded-lg text-xs shadow">
                Save Student Record
              </button>
            </form>
          </div>
        )}

        {activeTab === 'payments' && (
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-800">Fees Payment Log</h3>
            <p className="text-xs text-slate-400 text-center py-6">No new online transactions today.</p>
          </div>
        )}

        {activeTab === 'uploads' && (
          <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-800">Upload Board</h3>
            <div className="p-4 border-2 border-dashed rounded-xl text-center text-slate-400 text-xs">
              Click to upload report card data
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t px-3 py-2.5 flex justify-between items-center rounded-t-2xl shadow-xl z-50">
        <button onClick={() => setActiveTab('attendance')} className={`flex flex-col items-center ${activeTab === 'attendance' ? 'text-emerald-600' : 'text-slate-400'}`}><ClipboardCheck size={20} /><span className="text-[10px]">Attendance</span></button>
        <button onClick={() => setActiveTab('add-student')} className={`flex flex-col items-center ${activeTab === 'add-student' ? 'text-emerald-600' : 'text-slate-400'}`}><Users size={20} /><span className="text-[10px]">Add Student</span></button>
        <button onClick={() => setActiveTab('payments')} className={`flex flex-col items-center ${activeTab === 'payments' ? 'text-emerald-600' : 'text-slate-400'}`}><CreditCard size={20} /><span className="text-[10px]">Payments</span></button>
        <button onClick={() => setActiveTab('uploads')} className={`flex flex-col items-center ${activeTab === 'uploads' ? 'text-emerald-600' : 'text-slate-400'}`}><Bell size={20} /><span className="text-[10px]">Uploads</span></button>
      </div>
    </div>
  );
}