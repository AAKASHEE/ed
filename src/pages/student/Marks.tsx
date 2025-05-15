import { useState } from 'react';
import { ToggleLeft, ToggleRight } from 'lucide-react';
import LineChart from '../../components/charts/LineChart';

const StudentMarks = () => {
  const [activeTab, setActiveTab] = useState<'cie' | 'semester'>('cie');
  
  // Mock CIE data
  const cieData = {
    subject1: { name: 'Machine Learning', cie1: 42, cie2: 38, cie3: 45 },
    subject2: { name: 'Data Structures', cie1: 38, cie2: 41, cie3: 40 },
    subject3: { name: 'Computer Networks', cie1: 35, cie2: 32, cie3: 40 },
    subject4: { name: 'Database Systems', cie1: 44, cie2: 40, cie3: 43 },
  };
  
  // Mock Semester CGPA data
  const semesterData = {
    sem1: 8.2,
    sem2: 8.4,
    sem3: 8.0,
    sem4: 8.6,
    sem5: 8.8,
    sem6: 0, // Not completed yet
    sem7: 0, // Not completed yet
    sem8: 0, // Not completed yet
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="page-title">Academic Records</h1>

      {/* Toggle between CIE and Semester marks */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex bg-gray-200 rounded-lg p-1">
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === 'cie'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            } transition-all duration-200 flex items-center`}
            onClick={() => setActiveTab('cie')}
          >
            <ToggleLeft className={`mr-1 ${activeTab === 'cie' ? 'text-indigo-600' : 'text-gray-500'}`} size={18} />
            CIE Marks
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === 'semester'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            } transition-all duration-200 flex items-center`}
            onClick={() => setActiveTab('semester')}
          >
            <ToggleRight className={`mr-1 ${activeTab === 'semester' ? 'text-indigo-600' : 'text-gray-500'}`} size={18} />
            Semester CGPA
          </button>
        </div>
      </div>

      {/* CIE Marks Content */}
      {activeTab === 'cie' && (
        <div className="space-y-6">
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
                  {Object.values(cieData).map((subject, index) => {
                    const avg = ((subject.cie1 + subject.cie2 + subject.cie3) / 3).toFixed(1);
                    return (
                      <tr key={index}>
                        <td className="font-medium">{subject.name}</td>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Individual Subject Performance */}
            {Object.values(cieData).map((subject, index) => (
              <div key={index} className="card">
                <LineChart
                  title={`${subject.name} Performance`}
                  labels={['CIE 1', 'CIE 2', 'CIE 3']}
                  datasets={[
                    {
                      label: 'Marks',
                      data: [subject.cie1, subject.cie2, subject.cie3],
                      borderColor: 'rgb(79, 70, 229)',
                      backgroundColor: 'rgba(79, 70, 229, 0.5)',
                    },
                  ]}
                  maxY={50}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Semester CGPA Content */}
      {activeTab === 'semester' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {Object.entries(semesterData).map(([sem, cgpa], index) => (
              <div key={index} className="card text-center">
                <h3 className="text-lg font-semibold mb-2">Semester {index + 1}</h3>
                {cgpa > 0 ? (
                  <p className="text-2xl font-bold text-indigo-600">{cgpa.toFixed(1)}</p>
                ) : (
                  <p className="text-sm text-gray-500">Pending</p>
                )}
              </div>
            ))}
          </div>

          <div className="card">
            <LineChart
              title="CGPA Progression"
              labels={Object.keys(semesterData).map((sem, index) => `Semester ${index + 1}`)}
              datasets={[
                {
                  label: 'CGPA',
                  data: Object.values(semesterData),
                  borderColor: 'rgb(79, 70, 229)',
                  backgroundColor: 'rgba(79, 70, 229, 0.5)',
                },
              ]}
              maxY={10}
            />
          </div>

          <div className="card">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Performance Analysis</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-700 mb-2">Current Standing</h3>
                <p>You are maintaining a strong CGPA above 8.0, which puts you in the top 20% of your class.</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-700 mb-2">Improvement Areas</h3>
                <p>Computer Networks performance shows potential for improvement. Consider additional practice in this area.</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-semibold text-purple-700 mb-2">Recommendation</h3>
                <p>Maintaining your current academic trajectory will keep you eligible for merit scholarships and internship opportunities.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentMarks;