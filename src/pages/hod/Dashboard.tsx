import { useState } from 'react';
import SearchBar from '../../components/teacher/SearchBar';

interface User {
  id: string;
  name: string;
  usn?: string;
  email: string;
  role: 'student' | 'teacher';
  department: string;
  batch?: string;
  subjects?: string[];
  skills?: string[];
  experience?: string;
  cgpa?: number;
}

// Mock data
const mockUsers: User[] = [
  // Teachers
  { id: 't1', name: 'Dr. Jane Teacher', email: 'teacher@example.com', role: 'teacher', department: 'AIML', experience: '8 years', subjects: ['Machine Learning', 'Data Structures'] },
  { id: 't2', name: 'Prof. Robert Johnson', email: 'rjohnson@example.com', role: 'teacher', department: 'AIML', experience: '12 years', subjects: ['Artificial Intelligence', 'Neural Networks'] },
  
  // Students
  { id: 's1', name: 'John Smith', usn: 'AIML2022001', email: 'jsmith@example.com', role: 'student', department: 'AIML', batch: '2022-2026', skills: ['Python', 'Machine Learning'], cgpa: 9.2 },
  { id: 's2', name: 'Emma Johnson', usn: 'AIML2022002', email: 'ejohnson@example.com', role: 'student', department: 'AIML', batch: '2022-2026', skills: ['Data Analysis', 'TensorFlow'], cgpa: 9.5 },
];

const HodDashboard = () => {
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleSearch = (query: string, type: 'name' | 'usn' | 'skill') => {
    let results: User[] = [];
    
    if (type === 'name') {
      results = mockUsers.filter(user => 
        user.name.toLowerCase().includes(query.toLowerCase())
      );
    } else if (type === 'usn') {
      results = mockUsers.filter(user => 
        user.usn?.toLowerCase().includes(query.toLowerCase())
      );
    } else if (type === 'skill') {
      results = mockUsers.filter(user => 
        user.role === 'student' && 
        user.skills?.some(skill => 
          skill.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
    
    setSearchResults(results);
    setShowSearchResults(true);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="page-title">Department Dashboard</h1>
      
      <div className="card">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Search Staff or Students</h2>
        <SearchBar 
          onSearch={handleSearch} 
          placeholder="Search by name, USN, or skill..."
        />
      </div>
      
      {showSearchResults && (
        <div className="card">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Search Results</h2>
          
          {searchResults.length > 0 ? (
            <div className="space-y-4">
              {searchResults.map(user => (
                <div 
                  key={user.id} 
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{user.name}</h3>
                      <p className="text-sm text-gray-500">
                        {user.role === 'student' 
                          ? `${user.usn} • ${user.batch} • ${user.department}` 
                          : `${user.department} • ${user.experience}`}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user.role === 'teacher' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {user.role === 'teacher' ? 'Staff' : 'Student'}
                    </span>
                  </div>
                  
                  <div className="mt-3">
                    {user.role === 'teacher' && user.subjects && (
                      <div>
                        <p className="text-sm font-medium">Subjects:</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {user.subjects.map((subject, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 text-xs rounded">
                              {subject}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {user.role === 'student' && user.skills && (
                      <div>
                        <p className="text-sm font-medium">Skills:</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {user.skills.map((skill, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 text-xs rounded">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {user.role === 'student' && user.cgpa !== undefined && (
                      <div className="mt-2">
                        <p className="text-sm font-medium">
                          CGPA: <span className="text-indigo-600">{user.cgpa}</span>
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <button className="btn btn-outline text-sm">
                      View Full Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No results found matching your search.</p>
          )}
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Department Overview</h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-4 bg-indigo-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Total Students</h3>
              <p className="text-2xl font-bold text-indigo-600">235</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Teaching Staff</h3>
              <p className="text-2xl font-bold text-purple-600">18</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Avg. Department CGPA</h3>
              <p className="text-2xl font-bold text-blue-600">7.9</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Placement Rate</h3>
              <p className="text-2xl font-bold text-green-600">92%</p>
            </div>
          </div>
          
          <h3 className="font-semibold text-gray-700 mb-2">Recent Department Activities</h3>
          <div className="space-y-3">
            <div className="p-3 border border-gray-100 rounded bg-gray-50">
              <p className="text-sm">Workshop on "Deep Learning Applications" scheduled for next week</p>
              <p className="text-xs text-gray-500 mt-1">Jun 15, 2025</p>
            </div>
            <div className="p-3 border border-gray-100 rounded bg-gray-50">
              <p className="text-sm">Department meeting to review curriculum updates</p>
              <p className="text-xs text-gray-500 mt-1">Jun 10, 2025</p>
            </div>
            <div className="p-3 border border-gray-100 rounded bg-gray-50">
              <p className="text-sm">Student project showcase day preparations underway</p>
              <p className="text-xs text-gray-500 mt-1">Jun 5, 2025</p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Access</h2>
          <div className="grid grid-cols-1 gap-3">
            <a href="#" className="p-4 border border-indigo-100 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition flex items-center">
              <div className="bg-indigo-200 rounded-full p-3 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 text-indigo-700">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Department Reports</h3>
                <p className="text-sm text-gray-600">Access performance reports and analytics</p>
              </div>
            </a>
            
            <a href="#" className="p-4 border border-purple-100 bg-purple-50 rounded-lg hover:bg-purple-100 transition flex items-center">
              <div className="bg-purple-200 rounded-full p-3 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 text-purple-700">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Faculty Management</h3>
                <p className="text-sm text-gray-600">Review and assign faculty workload</p>
              </div>
            </a>
            
            <a href="#" className="p-4 border border-blue-100 bg-blue-50 rounded-lg hover:bg-blue-100 transition flex items-center">
              <div className="bg-blue-200 rounded-full p-3 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 text-blue-700">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Student Records</h3>
                <p className="text-sm text-gray-600">Access comprehensive student information</p>
              </div>
            </a>
            
            <a href="#" className="p-4 border border-green-100 bg-green-50 rounded-lg hover:bg-green-100 transition flex items-center">
              <div className="bg-green-200 rounded-full p-3 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 text-green-700">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Curriculum Review</h3>
                <p className="text-sm text-gray-600">Manage course structures and syllabi</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HodDashboard;