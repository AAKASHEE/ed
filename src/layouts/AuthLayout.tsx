import { Outlet } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="bg-indigo-600 p-6 text-center">
          <div className="flex justify-center mb-2">
            <GraduationCap size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">EduTrack</h1>
          <p className="text-indigo-200 mt-1">Educational Management System</p>
        </div>
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;