import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

// Types
type UserRole = 'student' | 'teacher' | 'hod';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => void;
  register: (name: string, email: string, password: string, role: UserRole) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Mock user data for demonstration
  const mockUsers = {
    student: {
      id: 's1',
      name: 'John Student',
      email: 'student@example.com',
      role: 'student' as UserRole,
    },
    teacher: {
      id: 't1',
      name: 'Jane Teacher',
      email: 'teacher@example.com',
      role: 'teacher' as UserRole,
    },
    hod: {
      id: 'h1',
      name: 'Dr. Smith HOD',
      email: 'hod@example.com',
      role: 'hod' as UserRole,
    },
  };

  useEffect(() => {
    // Check for stored user
    const storedUser = localStorage.getItem('edutrack_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email: string, password: string, role: UserRole) => {
    setLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      const loggedInUser = mockUsers[role];
      setUser(loggedInUser);
      localStorage.setItem('edutrack_user', JSON.stringify(loggedInUser));
      
      // Redirect based on role
      navigate(`/${role}/dashboard`);
      setLoading(false);
    }, 1000);
  };

  const register = (name: string, email: string, password: string, role: UserRole) => {
    setLoading(true);
    
    // Simulate registration
    setTimeout(() => {
      const newUser = {
        id: `${role.charAt(0)}${Math.floor(Math.random() * 1000)}`,
        name,
        email,
        role,
      };
      
      setUser(newUser);
      localStorage.setItem('edutrack_user', JSON.stringify(newUser));
      
      // Redirect based on role
      navigate(`/${role}/dashboard`);
      setLoading(false);
    }, 1000);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('edutrack_user');
    navigate('/login');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};