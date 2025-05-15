import { useState } from 'react';
import { Trophy, AlertTriangle } from 'lucide-react';
import SearchBar from '../../components/teacher/SearchBar';
import BatchSelector from '../../components/teacher/BatchSelector';

// Mock student data - same as in TeacherStudents.tsx but kept here for modularity
interface Student {
  id: string;
  name: string;
  usn: string;
  cgpa: number;
  department: string;
  batch: string;
  skills: string[];
}

const mockStudents: Student[] = [
  { id: '1', name: 'John Smith', usn: 'AIML2022001', cgpa: 9.2, department: 'AIML', batch: '2022-2026', skills: ['Python', 'Machine Learning'] },
  { id: '2', name: 'Emma Johnson', usn: 'AIML2022002', cgpa: 9.5, department: 'AIML', batch: '2022-2026', skills: ['Data Analysis', 'TensorFlow'] },
  { id: '3', name: 'Michael Brown', usn: 'AIML2022003', cgpa: 8.7, department: 'AIML', batch: '2022-2026', skills: ['Python', 'NLP'] },
  { id: '4', name: 'Olivia Davis', usn: 'AIML2022004', cgpa: 9.3, department: 'AIML', batch: '2022-2026', skills: ['Computer Vision', 'PyTorch'] },
  { id: '5', name: 'William Wilson', usn: 'AIML2022005', cgpa: 8.2, department: 'AIML', batch: '2022-2026', skills: ['Java', 'Database Design'] },
  { id: '6', name: 'Sophia Garcia', usn: 'AIML2022006', cgpa: 7.8, department: 'AIML', batch: '2022-2026', skills: ['Web Development', 'JavaScript'] },
  { id: '7', name: 'James Martinez', usn: 'AIML2022007', cgpa: 7.2, department: 'AIML', batch: '2022-2026', skills: ['C++', 'Data Structures'] },
  { id: '8', name: 'Charlotte Robinson', usn: 'AIML2022008', cgpa: 6.9, department: 'AIML', batch: '2022-2026', skills: ['SQL', 'R Programming'] },
  { id: '9', name: 'Daniel Lee', usn: 'AIML2022009', cgpa: 6.5, department: 'AIML', batch: '2022-2026', skills: ['HTML/CSS', 'UI Design'] },
  { id: '10', name: 'Amelia Walker', usn: 'AIML2022010', cgpa: 6.2, department: 'AIML', batch: '2022-2026', skills: ['Docker', 'AWS'] },
  { id: '11', name: 'Henry Hall', usn: 'AIML2022011', cgpa: 5.9, department: 'AIML', batch: '2022-2026', skills: ['Networking', 'Linux'] },
  { id: '12', name: 'Ava Allen', usn: 'AIML2022012', cgpa: 5.5, department: 'AIML', batch: '2022-2026', skills: ['Android', 'Kotlin'] },
  { id: '13', name: 'Samuel Young', usn: 'AIML2022013', cgpa: 5.2, department: 'AIML', batch: '2022-2026', skills: ['iOS', 'Swift'] },
  { id: '14', name: 'Elizabeth King', usn: 'AIML2022014', cgpa: 4.8, department: 'AIML', batch: '2022-2026', skills: ['React', 'Redux'] },
  { id: '15', name: 'Joseph Wright', usn: 'AIML2022015', cgpa: 4.5, department: 'AIML', batch: '2022-2026', skills: ['Node.js', 'Express'] },
  { id: '16', name: 'Mia Lopez', usn: 'AIML2022016', cgpa: 4.2, department: 'AIML', batch: '2022-2026', skills: ['MongoDB', 'Firebase'] },
  { id: '17', name: 'David Hill', usn: 'AIML2022017', cgpa: 3.9, department: 'AIML', batch: '2022-2026', skills: ['Angular', 'TypeScript'] },
  { id: '18', name: 'Evelyn Scott', usn: 'AIML2022018', cgpa: 3.6, department: 'AIML', batch: '2022-2026', skills: ['Vue.js', 'Vuex'] },
  { id: '19', name: 'Christopher Green', usn: 'AIML2022019', cgpa: 3.2, department: 'AIML', batch: '2022-2026', skills: ['PHP', 'Laravel'] },
  { id: '20', name: 'Scarlett Adams', usn: 'AIML2022020', cgpa: 2.8, department: 'AIML', batch: '2022-2026', skills: ['WordPress', 'SEO'] },
  
  // Students from other batch
  { id: '21', name: 'Jacob Baker', usn: 'AIML2023001', cgpa: 9.1, department: 'AIML', batch: '2023-2027', skills: ['Python', 'Machine Learning'] },
  { id: '22', name: 'Luna Carter', usn: 'AIML2023002', cgpa: 9.4, department: 'AIML', batch: '2023-2027', skills: ['Data Analysis', 'TensorFlow'] },
];

const HodStudents = () => {
  const [selectedBatch, setSelectedBatch] = useState('');
  const [searchResults, setSearchResults] = useState<Student[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleBatchSelect = (batch: string) => {
    setSelectedBatch(batch);
    setShowSearchResults(false);
  };

  const handleSearch = (query: string, type: 'name' | 'usn' | 'skill') => {
    let results: Student[] = [];
    
    if (type === 'name') {
      results = mockStudents.filter(student => 
        student.name.toLowerCase().includes(query.toLowerCase())
      );
    } else if (type === 'usn') {
      results = mockStudents.filter(student => 
        student.usn.toLowerCase().includes(query.toLowerCase())
      );
    } else if (type === 'skill') {
      results = mockStudents.filter(student => 
        student.skills.some(skill => 
          skill.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
    
    setSearchResults(results);
    setShowSearchResults(true);
  };

  // Filter students by selected batch
  const filteredStudents = selectedBatch 
    ? mockStudents.filter(s => s.batch === selectedBatch)
    : mockStudents;

  // Get top and bottom performers
  const topPerformers = [...filteredStudents]
    .sort((a, b) => b.cgpa - a.cgpa)
    .slice(0, 10);
    
  const bottomPerformers = [...filteredStudents]
    .sort((a, b) => a.cgpa - b.cgpa)
    .slice(0, 10);

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="page-title">Student Oversight</h1>
      
      <div className="card">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Find Student</h2>
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <SearchBar onSearch={handleSearch} />
          </div>
          <BatchSelector onSelect={handleBatchSelect} />
        </div>
      </div>
      
      {showSearchResults && (
        <div className="card">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Search Results</h2>
          
          {searchResults.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>USN</th>
                    <th>Batch</th>
                    <th>CGPA</th>
                    <th>Skills</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map(student => (
                    <tr key={student.id}>
                      <td className="font-medium">{student.name}</td>
                      <td>{student.usn}</td>
                      <td>{student.batch}</td>
                      <td className="font-medium">{student.cgpa}</td>
                      <td>
                        <div className="flex flex-wrap gap-1">
                          {student.skills.map((skill, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 text-xs rounded">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td>
                        <button className="text-sm px-2 py-1 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200">
                          View Profile
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No students found matching your search.</p>
          )}
        </div>
      )}
      
      {selectedBatch && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card">
            <div className="flex items-center mb-4">
              <Trophy className="text-yellow-500 mr-2" size={24} />
              <h2 className="text-xl font-bold text-gray-800">Top Performers</h2>
            </div>
            
            {topPerformers.length > 0 ? (
              <div className="overflow-y-auto max-h-96">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Name</th>
                      <th>USN</th>
                      <th>CGPA</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topPerformers.map((student, index) => (
                      <tr key={student.id}>
                        <td className="text-center font-bold">{index + 1}</td>
                        <td className="font-medium">{student.name}</td>
                        <td>{student.usn}</td>
                        <td className="font-medium text-right">{student.cgpa}</td>
                        <td>
                          <button className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No student data available for this batch.</p>
            )}
          </div>
          
          <div className="card">
            <div className="flex items-center mb-4">
              <AlertTriangle className="text-orange-500 mr-2" size={24} />
              <h2 className="text-xl font-bold text-gray-800">Needs Intervention</h2>
            </div>
            
            {bottomPerformers.length > 0 ? (
              <div className="overflow-y-auto max-h-96">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>USN</th>
                      <th>CGPA</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bottomPerformers.map((student) => (
                      <tr key={student.id}>
                        <td className="font-medium">{student.name}</td>
                        <td>{student.usn}</td>
                        <td className={`font-medium ${student.cgpa < 5 ? 'text-red-500' : 'text-orange-500'}`}>
                          {student.cgpa}
                        </td>
                        <td>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            student.cgpa < 4 
                              ? 'bg-red-100 text-red-800' 
                              : student.cgpa < 5
                                ? 'bg-orange-100 text-orange-800'
                                : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {student.cgpa < 4 
                              ? 'Critical' 
                              : student.cgpa < 5
                                ? 'At Risk'
                                : 'Monitor'}
                          </span>
                        </td>
                        <td className="space-x-1">
                          <button className="text-xs px-2 py-1 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200">
                            Details
                          </button>
                          <button className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200">
                            Intervene
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No student data available for this batch.</p>
            )}
          </div>
        </div>
      )}
      
      {selectedBatch && (
        <div className="card">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Batch Overview: {selectedBatch}</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-indigo-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Total Students</h3>
              <p className="text-2xl font-bold text-indigo-600">
                {filteredStudents.length}
              </p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Average CGPA</h3>
              <p className="text-2xl font-bold text-green-600">
                {(filteredStudents.reduce((sum, student) => sum + student.cgpa, 0) / filteredStudents.length).toFixed(2)}
              </p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-1">High Performers</h3>
              <p className="text-2xl font-bold text-blue-600">
                {filteredStudents.filter(student => student.cgpa >= 8.5).length}
              </p>
              <p className="text-xs text-gray-500">(CGPA ≥ 8.5)</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-1">At Risk</h3>
              <p className="text-2xl font-bold text-red-600">
                {filteredStudents.filter(student => student.cgpa < 5).length}
              </p>
              <p className="text-xs text-gray-500">(CGPA &lt; 5.0)</p>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button className="btn btn-primary">
              Generate Comprehensive Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HodStudents;