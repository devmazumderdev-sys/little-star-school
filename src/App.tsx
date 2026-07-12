import React, { useState } from 'react';
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';

interface UserState {
  role: 'student' | 'teacher';
  data: {
    name: string;
    class?: string;
    rollNo?: string;
    phone?: string;
  };
}

export default function App() {
  const [user, setUser] = useState<UserState | null>(null);

  const handleLoginSuccess = (role: 'student' | 'teacher', userData: UserState['data']) => {
    setUser({ role, data: userData });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {!user ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : user.role === 'student' ? (
        <StudentDashboard 
          studentData={{
            name: user.data.name,
            class: user.data.class || 'N/A',
            rollNo: user.data.rollNo || 'N/A'
          }} 
          onLogout={handleLogout} 
        />
      ) : (
        <TeacherDashboard 
          teacherData={{
            name: user.data.name,
            phone: user.data.phone || 'N/A'
          }} 
          onLogout={handleLogout} 
        />
      )}
    </div>
  );
}