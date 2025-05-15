import { Award, GraduationCap, Percent, BookOpen } from 'lucide-react';
import StatCard from '../../components/student/StatCard';
import TodoList from '../../components/student/TodoList';

const StudentDashboard = () => {
  // Mock data - in a real app, this would come from an API
  const studentStats = {
    cgpa: '8.6',
    attendance: '92%',
    certifications: 5,
    skills: 12,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="page-title">Student Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Current CGPA"
          value={studentStats.cgpa}
          icon={<Award size={24} />}
          bgColor="bg-indigo-50"
          textColor="text-indigo-700"
        />
        <StatCard
          title="Attendance"
          value={studentStats.attendance}
          icon={<Percent size={24} />}
          bgColor="bg-green-50"
          textColor="text-green-700"
        />
        <StatCard
          title="Certifications"
          value={studentStats.certifications}
          icon={<GraduationCap size={24} />}
          bgColor="bg-blue-50"
          textColor="text-blue-700"
        />
        <StatCard
          title="Skills Learned"
          value={studentStats.skills}
          icon={<BookOpen size={24} />}
          bgColor="bg-orange-50"
          textColor="text-orange-700"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Links</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a href="#" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <BookOpen size={20} className="text-blue-700" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Course Materials</h3>
                <p className="text-sm text-gray-500">Access study resources</p>
              </div>
            </a>
            <a href="#" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <GraduationCap size={20} className="text-purple-700" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Academic Calendar</h3>
                <p className="text-sm text-gray-500">View important dates</p>
              </div>
            </a>
            <a href="#" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
              <div className="bg-indigo-100 p-3 rounded-full mr-4">
                <Award size={20} className="text-indigo-700" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Results</h3>
                <p className="text-sm text-gray-500">Check examination results</p>
              </div>
            </a>
            <a href="#" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <Percent size={20} className="text-green-700" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Attendance Report</h3>
                <p className="text-sm text-gray-500">View detailed attendance</p>
              </div>
            </a>
          </div>
        </div>
        
        <TodoList />
      </div>
    </div>
  );
};

export default StudentDashboard;