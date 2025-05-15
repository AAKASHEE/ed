import { useState } from 'react';
import BatchSelector from '../../components/teacher/BatchSelector';

interface UploadField {
  usn: string;
  name: string;
  marks?: number;
  attendance?: number;
  maxMarks?: number;
}

interface UploadForm {
  batch: string;
  subject: string;
  cieNumber?: number;
  maxMarks: number;
  students: UploadField[];
}

// Mock student data
const mockStudentsBatch = {
  '2022-2026': [
    { usn: 'AIML2022001', name: 'John Smith' },
    { usn: 'AIML2022002', name: 'Emma Johnson' },
    { usn: 'AIML2022003', name: 'Michael Brown' },
    { usn: 'AIML2022004', name: 'Olivia Davis' },
    { usn: 'AIML2022005', name: 'William Wilson' },
  ],
  '2023-2027': [
    { usn: 'AIML2023001', name: 'Jacob Baker' },
    { usn: 'AIML2023002', name: 'Luna Carter' },
    { usn: 'AIML2023003', name: 'Thomas Evans' },
    { usn: 'AIML2023004', name: 'Grace Nelson' },
    { usn: 'AIML2023005', name: 'Oscar Phillips' },
  ],
};

const subjects = [
  'Machine Learning',
  'Data Structures',
  'Computer Networks',
  'Database Systems',
  'Artificial Intelligence',
];

const TeacherMarks = () => {
  const [uploadType, setUploadType] = useState<'cie' | 'attendance'>('cie');
  const [form, setForm] = useState<UploadForm>({
    batch: '',
    subject: '',
    cieNumber: 1,
    maxMarks: 50,
    students: [],
  });

  const handleBatchSelect = (batch: string) => {
    if (batch && mockStudentsBatch[batch as keyof typeof mockStudentsBatch]) {
      setForm({
        ...form,
        batch,
        students: mockStudentsBatch[batch as keyof typeof mockStudentsBatch].map(student => ({
          ...student,
          marks: undefined,
          attendance: undefined,
        })),
      });
    } else {
      setForm({
        ...form,
        batch: '',
        students: [],
      });
    }
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({
      ...form,
      subject: e.target.value,
    });
  };

  const handleCieNumberChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({
      ...form,
      cieNumber: parseInt(e.target.value),
    });
  };

  const handleMaxMarksChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      maxMarks: parseInt(e.target.value),
    });
  };

  const handleStudentFieldChange = (usn: string, field: 'marks' | 'attendance', value: string) => {
    setForm({
      ...form,
      students: form.students.map(student => 
        student.usn === usn 
          ? { ...student, [field]: value === '' ? undefined : parseFloat(value) } 
          : student
      ),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    alert('Data submitted successfully!');
    console.log(form);
  };

  const handleBulkUpload = () => {
    // Simulate a file upload and processing
    if (uploadType === 'cie') {
      // Simulate populating marks randomly
      setForm({
        ...form,
        students: form.students.map(student => ({
          ...student,
          marks: Math.floor(Math.random() * form.maxMarks),
        })),
      });
    } else {
      // Simulate populating attendance randomly
      setForm({
        ...form,
        students: form.students.map(student => ({
          ...student,
          attendance: Math.floor(Math.random() * 100),
        })),
      });
    }
    alert('Bulk data processed!');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="page-title">Upload Marks & Attendance</h1>
      
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Upload {uploadType === 'cie' ? 'CIE Marks' : 'Attendance'}</h2>
          
          <div className="inline-flex bg-gray-200 rounded-lg p-1">
            <button
              className={`px-4 py-2 rounded-md ${
                uploadType === 'cie'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              } transition-all duration-200`}
              onClick={() => setUploadType('cie')}
            >
              CIE Marks
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                uploadType === 'attendance'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              } transition-all duration-200`}
              onClick={() => setUploadType('attendance')}
            >
              Attendance
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <div>
              <label className="label">Batch</label>
              <BatchSelector onSelect={handleBatchSelect} />
            </div>
            
            <div>
              <label className="label">Subject</label>
              <select
                value={form.subject}
                onChange={handleSubjectChange}
                className="input"
                required
              >
                <option value="">Select Subject</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
            
            {uploadType === 'cie' && (
              <>
                <div>
                  <label className="label">CIE Number</label>
                  <select
                    value={form.cieNumber}
                    onChange={handleCieNumberChange}
                    className="input"
                    required
                  >
                    <option value={1}>CIE 1</option>
                    <option value={2}>CIE 2</option>
                    <option value={3}>CIE 3</option>
                  </select>
                </div>
                
                <div>
                  <label className="label">Maximum Marks</label>
                  <input
                    type="number"
                    value={form.maxMarks}
                    onChange={handleMaxMarksChange}
                    className="input"
                    min={1}
                    required
                  />
                </div>
              </>
            )}
          </div>
          
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Student Data</h3>
            <button
              type="button"
              onClick={handleBulkUpload}
              className="btn btn-outline text-sm"
            >
              Bulk Upload
            </button>
          </div>
          
          {form.students.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th>USN</th>
                    <th>Name</th>
                    <th>
                      {uploadType === 'cie' 
                        ? `Marks (out of ${form.maxMarks})` 
                        : 'Attendance (%)'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {form.students.map((student) => (
                    <tr key={student.usn}>
                      <td>{student.usn}</td>
                      <td>{student.name}</td>
                      <td>
                        <input
                          type="number"
                          value={uploadType === 'cie' 
                            ? student.marks === undefined ? '' : student.marks 
                            : student.attendance === undefined ? '' : student.attendance
                          }
                          onChange={(e) => handleStudentFieldChange(
                            student.usn, 
                            uploadType === 'cie' ? 'marks' : 'attendance', 
                            e.target.value
                          )}
                          className="input py-1"
                          min={0}
                          max={uploadType === 'cie' ? form.maxMarks : 100}
                          required
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-gray-50 p-8 rounded-lg text-center border border-gray-200">
              <p className="text-gray-500">Please select a batch to display students.</p>
            </div>
          )}
          
          {form.students.length > 0 && (
            <div className="flex justify-end">
              <button type="submit" className="btn btn-primary">
                Save {uploadType === 'cie' ? 'Marks' : 'Attendance'}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default TeacherMarks;