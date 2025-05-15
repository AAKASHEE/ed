import { useState } from 'react';
import { User, Mail, Phone, Book, Award, FileText } from 'lucide-react';
import TodoList from '../../components/student/TodoList';

interface TeacherProfile {
  fullName: string;
  email: string;
  phoneNumber: string;
  experience: string;
  department: string;
  subjects: string[];
  achievements: string[];
  qualifications: string;
}

const TeacherDashboard = () => {
  const [profile, setProfile] = useState<TeacherProfile>({
    fullName: 'Dr. Jane Teacher',
    email: 'teacher@example.com',
    phoneNumber: '9876543210',
    experience: '8 years',
    department: 'AIML',
    subjects: ['Machine Learning', 'Data Structures', 'Artificial Intelligence'],
    achievements: ['Best Teacher Award 2022', 'Published 5 research papers'],
    qualifications: 'Ph.D. in Computer Science, M.Tech in AI',
  });

  const [editMode, setEditMode] = useState(false);
  const [tempProfile, setTempProfile] = useState<TeacherProfile>(profile);
  const [newSubject, setNewSubject] = useState('');
  const [newAchievement, setNewAchievement] = useState('');

  const handleSave = () => {
    setProfile(tempProfile);
    setEditMode(false);
  };

  const handleCancel = () => {
    setTempProfile(profile);
    setEditMode(false);
  };

  const addSubject = () => {
    if (newSubject.trim() && !tempProfile.subjects.includes(newSubject.trim())) {
      setTempProfile({
        ...tempProfile,
        subjects: [...tempProfile.subjects, newSubject.trim()],
      });
      setNewSubject('');
    }
  };

  const removeSubject = (subjectToRemove: string) => {
    setTempProfile({
      ...tempProfile,
      subjects: tempProfile.subjects.filter(subject => subject !== subjectToRemove),
    });
  };

  const addAchievement = () => {
    if (newAchievement.trim() && !tempProfile.achievements.includes(newAchievement.trim())) {
      setTempProfile({
        ...tempProfile,
        achievements: [...tempProfile.achievements, newAchievement.trim()],
      });
      setNewAchievement('');
    }
  };

  const removeAchievement = (achievementToRemove: string) => {
    setTempProfile({
      ...tempProfile,
      achievements: tempProfile.achievements.filter(achievement => achievement !== achievementToRemove),
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="page-title">Teacher Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Profile Information</h2>
              {!editMode ? (
                <button
                  onClick={() => setEditMode(true)}
                  className="btn btn-outline text-sm"
                >
                  Edit Profile
                </button>
              ) : (
                <div className="space-x-2">
                  <button
                    onClick={handleCancel}
                    className="btn btn-outline text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="btn btn-primary text-sm"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center mb-1">
                    <User size={18} className="text-gray-500 mr-2" />
                    <label className="label mb-0">Full Name</label>
                  </div>
                  {editMode ? (
                    <input
                      type="text"
                      value={tempProfile.fullName}
                      onChange={(e) => setTempProfile({ ...tempProfile, fullName: e.target.value })}
                      className="input"
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">{profile.fullName}</p>
                  )}
                </div>

                <div>
                  <div className="flex items-center mb-1">
                    <Mail size={18} className="text-gray-500 mr-2" />
                    <label className="label mb-0">Email</label>
                  </div>
                  {editMode ? (
                    <input
                      type="email"
                      value={tempProfile.email}
                      onChange={(e) => setTempProfile({ ...tempProfile, email: e.target.value })}
                      className="input"
                    />
                  ) : (
                    <p className="text-gray-800">{profile.email}</p>
                  )}
                </div>

                <div>
                  <div className="flex items-center mb-1">
                    <Phone size={18} className="text-gray-500 mr-2" />
                    <label className="label mb-0">Phone Number</label>
                  </div>
                  {editMode ? (
                    <input
                      type="tel"
                      value={tempProfile.phoneNumber}
                      onChange={(e) => setTempProfile({ ...tempProfile, phoneNumber: e.target.value })}
                      className="input"
                    />
                  ) : (
                    <p className="text-gray-800">{profile.phoneNumber}</p>
                  )}
                </div>

                <div>
                  <div className="flex items-center mb-1">
                    <FileText size={18} className="text-gray-500 mr-2" />
                    <label className="label mb-0">Years of Experience</label>
                  </div>
                  {editMode ? (
                    <input
                      type="text"
                      value={tempProfile.experience}
                      onChange={(e) => setTempProfile({ ...tempProfile, experience: e.target.value })}
                      className="input"
                    />
                  ) : (
                    <p className="text-gray-800">{profile.experience}</p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center mb-1">
                    <Book size={18} className="text-gray-500 mr-2" />
                    <label className="label mb-0">Department</label>
                  </div>
                  {editMode ? (
                    <select
                      value={tempProfile.department}
                      onChange={(e) => setTempProfile({ ...tempProfile, department: e.target.value })}
                      className="input"
                    >
                      <option value="AIML">AIML</option>
                      <option value="CSE">CSE</option>
                      <option value="ISE">ISE</option>
                    </select>
                  ) : (
                    <p className="text-gray-800">{profile.department}</p>
                  )}
                </div>

                <div>
                  <div className="flex items-center mb-1">
                    <Award size={18} className="text-gray-500 mr-2" />
                    <label className="label mb-0">Qualifications</label>
                  </div>
                  {editMode ? (
                    <textarea
                      value={tempProfile.qualifications}
                      onChange={(e) => setTempProfile({ ...tempProfile, qualifications: e.target.value })}
                      className="input"
                      rows={2}
                    />
                  ) : (
                    <p className="text-gray-800">{profile.qualifications}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Subjects Teaching</h3>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {(editMode ? tempProfile.subjects : profile.subjects).map((subject) => (
                  <div 
                    key={subject} 
                    className={`px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 flex items-center ${
                      editMode ? 'pr-1' : ''
                    }`}
                  >
                    {subject}
                    {editMode && (
                      <button 
                        onClick={() => removeSubject(subject)}
                        className="ml-1 text-blue-800 hover:text-blue-900 p-1"
                      >
                        &times;
                      </button>
                    )}
                  </div>
                ))}

                {profile.subjects.length === 0 && !editMode && (
                  <p className="text-gray-500">No subjects added yet.</p>
                )}
              </div>

              {editMode && (
                <div className="flex items-center mt-2">
                  <input
                    type="text"
                    placeholder="Add a subject"
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    className="input flex-1"
                    onKeyPress={(e) => e.key === 'Enter' && addSubject()}
                  />
                  <button
                    onClick={addSubject}
                    className="btn btn-outline ml-2"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Achievements</h3>
              
              <div className="space-y-2 mb-4">
                {(editMode ? tempProfile.achievements : profile.achievements).map((achievement, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-2 rounded bg-gray-50"
                  >
                    <span className="text-sm">{achievement}</span>
                    {editMode && (
                      <button 
                        onClick={() => removeAchievement(achievement)}
                        className="text-red-500 hover:text-red-700"
                      >
                        &times;
                      </button>
                    )}
                  </div>
                ))}

                {profile.achievements.length === 0 && !editMode && (
                  <p className="text-gray-500">No achievements added yet.</p>
                )}
              </div>

              {editMode && (
                <div className="flex items-center mt-2">
                  <input
                    type="text"
                    placeholder="Add an achievement"
                    value={newAchievement}
                    onChange={(e) => setNewAchievement(e.target.value)}
                    className="input flex-1"
                    onKeyPress={(e) => e.key === 'Enter' && addAchievement()}
                  />
                  <button
                    onClick={addAchievement}
                    className="btn btn-outline ml-2"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-span-1">
          <TodoList />
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;