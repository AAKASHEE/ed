import { Route, Routes } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import AuthLayout from './layouts/AuthLayout';
import StudentLayout from './layouts/StudentLayout';
import TeacherLayout from './layouts/TeacherLayout';
import HodLayout from './layouts/HodLayout';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Student Pages
import StudentDashboard from './pages/student/Dashboard';
import StudentProfile from './pages/student/Profile';
import StudentMarks from './pages/student/Marks';
import StudentCareer from './pages/student/Career';

// Teacher Pages
import TeacherDashboard from './pages/teacher/Dashboard';
import TeacherStudents from './pages/teacher/Students';
import TeacherMarks from './pages/teacher/Marks';
import TeacherAnalytics from './pages/teacher/Analytics';

// HOD Pages
import HodDashboard from './pages/hod/Dashboard';
import HodStudents from './pages/hod/Students';
import HodAnalytics from './pages/hod/Analytics';

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route element={<AuthLayout />}>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Student routes */}
      {user && user.role === 'student' && (
        <Route element={<StudentLayout />}>
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/profile" element={<StudentProfile />} />
          <Route path="/student/marks" element={<StudentMarks />} />
          <Route path="/student/career" element={<StudentCareer />} />
        </Route>
      )}

      {/* Teacher routes */}
      {user && user.role === 'teacher' && (
        <Route element={<TeacherLayout />}>
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="/teacher/students" element={<TeacherStudents />} />
          <Route path="/teacher/marks" element={<TeacherMarks />} />
          <Route path="/teacher/analytics" element={<TeacherAnalytics />} />
        </Route>
      )}

      {/* HOD routes */}
      {user && user.role === 'hod' && (
        <Route element={<HodLayout />}>
          <Route path="/hod" element={<HodDashboard />} />
          <Route path="/hod/dashboard" element={<HodDashboard />} />
          <Route path="/hod/students" element={<HodStudents />} />
          <Route path="/hod/analytics" element={<HodAnalytics />} />
        </Route>
      )}
    </Routes>
  );
}

export default App;