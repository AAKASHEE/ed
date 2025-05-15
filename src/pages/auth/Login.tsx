import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LogIn } from 'lucide-react';

const Login = () => {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'student' | 'teacher' | 'hod'>('student');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password, role);
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign In</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col space-y-1">
          <label htmlFor="email" className="label">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="input"
            required
          />
        </div>
        
        <div className="flex flex-col space-y-1">
          <label htmlFor="password" className="label">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="input"
            required
          />
        </div>
        
        <div className="flex flex-col space-y-1">
          <label htmlFor="role" className="label">Login As</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value as 'student' | 'teacher' | 'hod')}
            className="input"
            required
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="hod">HOD</option>
          </select>
        </div>
        
        <button
          type="submit"
          className="btn btn-primary w-full flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing in...
            </span>
          ) : (
            <span className="flex items-center">
              <LogIn size={18} className="mr-2" />
              Sign In
            </span>
          )}
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign up
          </Link>
        </p>
      </div>

      {/* Demo credentials */}
      <div className="mt-8 pt-4 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Demo Credentials</h3>
        <div className="text-xs text-gray-600 space-y-1">
          <p><span className="font-medium">Student:</span> student@example.com / any password</p>
          <p><span className="font-medium">Teacher:</span> teacher@example.com / any password</p>
          <p><span className="font-medium">HOD:</span> hod@example.com / any password</p>
        </div>
      </div>
    </div>
  );
};

export default Login;