import { useState } from 'react';
import BatchSelector from '../../components/teacher/BatchSelector';
import SearchBar from '../../components/teacher/SearchBar';
import BarChart from '../../components/charts/BarChart';
import LineChart from '../../components/charts/LineChart';

// Mock data
const mockAnalytics = {
  '2022-2026': {
    classAverage: 7.8,
    highestScore: 9.5,
    lowestScore: 2.8,
    passingRate: 85,
    distribution: [2, 4, 6, 12, 18, 14, 8, 3], // Number of students in each grade range
    subjects: ['Data Structures', 'Machine Learning', 'Database Systems'],
    performanceBySubject: {
      'Data Structures': [65, 68, 72],
      'Machine Learning': [70, 75, 78],
      'Database Systems': [62, 70, 75],
    },
  },
  '2023-2027': {
    classAverage: 8.1,
    highestScore: 9.7,
    lowestScore: 3.2,
    passingRate: 90,
    distribution: [1, 3, 5, 10, 15, 16, 9, 5],
    subjects: ['Introduction to Programming', 'Discrete Mathematics', 'Computer Architecture'],
    performanceBySubject: {
      'Introduction to Programming': [72, 78, 82],
      'Discrete Mathematics': [65, 70, 75],
      'Computer Architecture': [68, 72, 74],
    },
  },
};

// Mock student details
const mockStudents = [
  {
    usn: 'AIML2022001',
    name: 'John Smith',
    batch: '2022-2026',
    cieMarks: [
      { subject: 'Data Structures', cie1: 42, cie2: 38, cie3: 45 },
      { subject: 'Machine Learning', cie1: 44, cie2: 40, cie3: 46 },
      { subject: 'Database Systems', cie1: 38, cie2: 41, cie3: 43 },
    ],
    semCgpa: [8.2, 8.4, 8.6, 8.8],
  },
  {
    usn: 'AIML2023001',
    name: 'Jacob Baker',
    batch: '2023-2027',
    cieMarks: [
      { subject: 'Introduction to Programming', cie1: 45, cie2: 43, cie3: 47 },
      { subject: 'Discrete Mathematics', cie1: 42, cie2: 40, cie3: 41 },
      { subject: 'Computer Architecture', cie1: 40, cie2: 42, cie3: 38 },
    ],
    semCgpa: [8.5, 8.7],
  },
];

const TeacherAnalytics = () => {
  const [selectedBatch, setSelectedBatch] = useState('');
  const [analysisType, setAnalysisType] = useState<'class' | 'student'>('class');
  const [selectedStudent, setSelectedStudent] = useState<(typeof mockStudents)[0] | null>(null);
  
  const handleBatchSelect = (batch: string) => {
    setSelectedBatch(batch);
    setSelectedStudent(null);
  };
  
  const handleSearch = (query: string, type: 'name' | 'usn' | 'skill') => {
    let student;
    
    if (type === 'name') {
      student = mockStudents.find(s => s.name.toLowerCase().includes(query.toLowerCase()));
    } else if (type === 'usn') {
      student = mockStudents.find(s => s.usn.toLowerCase() === query.toLowerCase());
    }
    
    if (student) {
      setSelectedStudent(student);
      setSelectedBatch(student.batch);
      setAnalysisType('student');
    } else {
      alert('Student not found.');
    }
  };

  const batchData = selectedBatch ? mockAnalytics[selectedBatch as keyof typeof mockAnalytics] : null;

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="page-title">Performance Analytics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <BatchSelector onSelect={handleBatchSelect} />
        </div>
        
        <div className="flex justify-between items-center md:justify-end">
          <div className="inline-flex bg-gray-200 rounded-lg p-1">
            <button
              className={`px-4 py-2 rounded-md ${
                analysisType === 'class'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              } transition-all duration-200`}
              onClick={() => setAnalysisType('class')}
            >
              Class Performance
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                analysisType === 'student'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              } transition-all duration-200`}
              onClick={() => setAnalysisType('student')}
            >
              Student Performance
            </button>
          </div>
        </div>
      </div>
      
      {analysisType === 'student' && (
        <div className="card mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Search Student</h2>
          <SearchBar 
            onSearch={handleSearch} 
            placeholder="Search by student name or USN..."
          />
        </div>
      )}
      
      {selectedBatch && analysisType === 'class' && batchData && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="card text-center">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Class Average</h3>
              <p className="text-2xl font-bold text-indigo-600">{batchData.classAverage}</p>
            </div>
            <div className="card text-center">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Highest Score</h3>
              <p className="text-2xl font-bold text-green-600">{batchData.highestScore}</p>
            </div>
            <div className="card text-center">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Lowest Score</h3>
              <p className="text-2xl font-bold text-red-600">{batchData.lowestScore}</p>
            </div>
            <div className="card text-center">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Passing Rate</h3>
              <p className="text-2xl font-bold text-blue-600">{batchData.passingRate}%</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card">
              <BarChart
                title="Grade Distribution"
                labels={['F', 'D', 'C-', 'C', 'B', 'B+', 'A', 'A+']}
                datasets={[
                  {
                    label: 'Number of Students',
                    data: batchData.distribution,
                    backgroundColor: 'rgba(79, 70, 229, 0.6)',
                  },
                ]}
              />
            </div>
            
            <div className="card">
              <LineChart
                title="Subject Performance Trend (CIE 1-3)"
                labels={['CIE 1', 'CIE 2', 'CIE 3']}
                datasets={batchData.subjects.map((subject, index) => {
                  const colors = [
                    { border: 'rgb(79, 70, 229)', background: 'rgba(79, 70, 229, 0.5)' },
                    { border: 'rgb(16, 185, 129)', background: 'rgba(16, 185, 129, 0.5)' },
                    { border: 'rgb(239, 68, 68)', background: 'rgba(239, 68, 68, 0.5)' },
                  ];
                  
                  return {
                    label: subject,
                    data: batchData.performanceBySubject[subject],
                    borderColor: colors[index % colors.length].border,
                    backgroundColor: colors[index % colors.length].background,
                  };
                })}
                maxY={100}
              />
            </div>
          </div>
          
          <div className="card">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Performance Analysis</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-indigo-50 rounded-lg">
                <h3 className="font-semibold text-indigo-700 mb-2">Strengths</h3>
                <p>Most students are performing well in Machine Learning, with consistent improvement across all three CIEs.</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <h3 className="font-semibold text-orange-700 mb-2">Areas for Improvement</h3>
                <p>Database Systems shows the lowest average scores. Consider providing additional resources or practice.</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-700 mb-2">Recommendations</h3>
                <p>Implement targeted intervention for students scoring below 5.0 CGPA. Schedule extra practice sessions for Database Systems.</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {analysisType === 'student' && selectedStudent && (
        <div className="space-y-6">
          <div className="card">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-800">{selectedStudent.name}</h2>
                <p className="text-gray-500">{selectedStudent.usn} • {selectedStudent.batch}</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <h2 className="text-xl font-bold text-gray-800 mb-4">CIE Performance</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th className="text-center">CIE 1 (50)</th>
                    <th className="text-center">CIE 2 (50)</th>
                    <th className="text-center">CIE 3 (50)</th>
                    <th className="text-center">Average</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedStudent.cieMarks.map((subject, index) => {
                    const avg = ((subject.cie1 + subject.cie2 + subject.cie3) / 3).toFixed(1);
                    return (
                      <tr key={index}>
                        <td className="font-medium">{subject.subject}</td>
                        <td className="text-center">{subject.cie1}</td>
                        <td className="text-center">{subject.cie2}</td>
                        <td className="text-center">{subject.cie3}</td>
                        <td className="text-center font-semibold">{avg}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card">
              <LineChart
                title="CIE Marks Trend"
                labels={['CIE 1', 'CIE 2', 'CIE 3']}
                datasets={selectedStudent.cieMarks.map((subject, index) => {
                  const colors = [
                    { border: 'rgb(79, 70, 229)', background: 'rgba(79, 70, 229, 0.5)' },
                    { border: 'rgb(16, 185, 129)', background: 'rgba(16, 185, 129, 0.5)' },
                    { border: 'rgb(239, 68, 68)', background: 'rgba(239, 68, 68, 0.5)' },
                  ];
                  
                  return {
                    label: subject.subject,
                    data: [subject.cie1, subject.cie2, subject.cie3],
                    borderColor: colors[index % colors.length].border,
                    backgroundColor: colors[index % colors.length].background,
                  };
                })}
                maxY={50}
              />
            </div>
            
            <div className="card">
              <LineChart
                title="Semester CGPA Progression"
                labels={selectedStudent.semCgpa.map((_, i) => `Sem ${i + 1}`)}
                datasets={[
                  {
                    label: 'CGPA',
                    data: selectedStudent.semCgpa,
                    borderColor: 'rgb(79, 70, 229)',
                    backgroundColor: 'rgba(79, 70, 229, 0.5)',
                  },
                ]}
                maxY={10}
              />
            </div>
          </div>
          
          <div className="card">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Student Analysis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-700 mb-2">Strengths</h3>
                <p>Consistently strong performance in Machine Learning with scores above class average. Shows good progress across semesters with improving CGPA trend.</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-semibold text-purple-700 mb-2">Recommendations</h3>
                <p>Additional support may help improve Database Systems scores. Consider recommending advanced projects in Machine Learning to leverage existing strengths.</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {(!selectedBatch || (analysisType === 'student' && !selectedStudent)) && (
        <div className="bg-gray-50 p-8 rounded-lg text-center border border-gray-200">
          <p className="text-gray-500">
            {!selectedBatch 
              ? 'Please select a batch to view analytics.' 
              : 'Please search for a student to view individual performance.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default TeacherAnalytics;