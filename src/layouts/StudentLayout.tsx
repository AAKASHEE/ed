import { ReactNode } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  GraduationCap, Home, User, BarChart, Briefcase, 
  LogOut, Menu, X 
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';

const StudentLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const navLinks = [
    { name: 'Dashboard', path: '/student/dashboard', icon: <Home size={20} /> },
    { name: 'Profile', path: '/student/profile', icon: <User size={20} /> },
    { name: 'Academic Records', path: '/student/marks', icon: <BarChart size={20} /> },
    { name: 'Career Planning', path: '/student/career', icon: <Briefcase size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md bg-white shadow-md text-gray-700"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside 
        className={`bg-white fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:relative lg:w-64 shadow-md flex flex-col`}
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-center mb-2">
            <GraduationCap size={32} className="text-indigo-600" />
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-800">EduTrack</h1>
          <p className="text-sm text-center text-gray-500">Student Portal</p>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3">
          <nav className="space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? 'active' : ''}`
                }
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    setSidebarOpen(false);
                  }
                }}
              >
                {link.icon}
                <span>{link.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-200">
          {user && (
            <div className="flex items-center mb-4">
              <div className="bg-indigo-100 rounded-full w-10 h-10 flex items-center justify-center text-indigo-600 font-bold">
                {user.name.charAt(0)}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-800">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>
          )}
          <button
            onClick={logout}
            className="w-full flex items-center text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md px-3 py-2 text-sm font-medium"
          >
            <LogOut size={18} className="mr-2" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <main className="flex-1 relative overflow-y-auto py-6 px-4 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;