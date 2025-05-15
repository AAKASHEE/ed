import { useState } from 'react';
import { User, Book, Award, Linkedin, Github, Globe } from 'lucide-react';

interface StudentProfile {
  fullName: string;
  usn: string;
  email: string;
  phone: string;
  department: string;
  batch: string;
  address: string;
  bio: string;
  profileImage: string;
  skills: string[];
  certifications: { name: string; issuer: string; date: string }[];
  githubLink: string;
  linkedinLink: string;
  portfolioLink: string;
}

const StudentProfile = () => {
  const [profile, setProfile] = useState<StudentProfile>({
    fullName: 'John Student',
    usn: 'AIML2022001',
    email: 'student@example.com',
    phone: '9876543210',
    department: 'AIML',
    batch: '2022-2026',
    address: '123 Campus Road, Bangalore',
    bio: 'Passionate student interested in AI and Machine Learning. Looking to develop solutions that make a difference.',
    profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300',
    skills: ['Python', 'Machine Learning', 'Data Analysis', 'TensorFlow'],
    certifications: [
      { name: 'Machine Learning Fundamentals', issuer: 'Coursera', date: '2023-05-15' },
      { name: 'Data Science with Python', issuer: 'DataCamp', date: '2023-02-20' },
    ],
    githubLink: 'https://github.com/johndoe',
    linkedinLink: 'https://linkedin.com/in/johndoe',
    portfolioLink: 'https://johndoe-portfolio.com',
  });

  const [newSkill, setNewSkill] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [tempProfile, setTempProfile] = useState<StudentProfile>(profile);

  const addSkill = () => {
    if (newSkill.trim() && !tempProfile.skills.includes(newSkill.trim())) {
      setTempProfile({
        ...tempProfile,
        skills: [...tempProfile.skills, newSkill.trim()],
      });
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setTempProfile({
      ...tempProfile,
      skills: tempProfile.skills.filter(skill => skill !== skillToRemove),
    });
  };

  const handleSave = () => {
    setProfile(tempProfile);
    setEditMode(false);
  };

  const handleCancel = () => {
    setTempProfile(profile);
    setEditMode(false);
  };

  const [newCertification, setNewCertification] = useState({
    name: '',
    issuer: '',
    date: '',
  });

  const addCertification = () => {
    if (newCertification.name.trim() && newCertification.issuer.trim()) {
      setTempProfile({
        ...tempProfile,
        certifications: [...tempProfile.certifications, { ...newCertification }],
      });
      setNewCertification({ name: '', issuer: '', date: '' });
    }
  };

  const removeCertification = (certName: string) => {
    setTempProfile({
      ...tempProfile,
      certifications: tempProfile.certifications.filter(cert => cert.name !== certName),
    });
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <h1 className="page-title">My Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Picture & Personal Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="card flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-indigo-100">
              <img 
                src={tempProfile.profileImage} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            {editMode && (
              <button className="btn btn-outline text-sm mb-4">
                Change Photo
              </button>
            )}
            <h2 className="text-xl font-bold">{profile.fullName}</h2>
            <p className="text-sm text-gray-500">{profile.usn}</p>
            <p className="text-sm text-gray-500">{profile.department} • {profile.batch}</p>
          </div>

          {/* Bio */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Bio</h3>
            {editMode ? (
              <textarea
                value={tempProfile.bio}
                onChange={(e) => setTempProfile({ ...tempProfile, bio: e.target.value })}
                className="input min-h-[120px]"
                placeholder="Tell us about yourself"
              />
            ) : (
              <p className="text-gray-700">{profile.bio}</p>
            )}
          </div>

          {/* Social Links */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Links</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <Github size={18} className="text-gray-500 mr-2" />
                {editMode ? (
                  <input
                    type="text"
                    value={tempProfile.githubLink}
                    onChange={(e) => setTempProfile({ ...tempProfile, githubLink: e.target.value })}
                    className="input"
                    placeholder="GitHub Profile URL"
                  />
                ) : (
                  <a 
                    href={profile.githubLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:underline"
                  >
                    GitHub Profile
                  </a>
                )}
              </div>
              <div className="flex items-center">
                <Linkedin size={18} className="text-gray-500 mr-2" />
                {editMode ? (
                  <input
                    type="text"
                    value={tempProfile.linkedinLink}
                    onChange={(e) => setTempProfile({ ...tempProfile, linkedinLink: e.target.value })}
                    className="input"
                    placeholder="LinkedIn Profile URL"
                  />
                ) : (
                  <a 
                    href={profile.linkedinLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:underline"
                  >
                    LinkedIn Profile
                  </a>
                )}
              </div>
              <div className="flex items-center">
                <Globe size={18} className="text-gray-500 mr-2" />
                {editMode ? (
                  <input
                    type="text"
                    value={tempProfile.portfolioLink}
                    onChange={(e) => setTempProfile({ ...tempProfile, portfolioLink: e.target.value })}
                    className="input"
                    placeholder="Portfolio URL"
                  />
                ) : (
                  <a 
                    href={profile.portfolioLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:underline"
                  >
                    Portfolio Website
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Personal Info, Skills & Certifications */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
              {!editMode && (
                <button 
                  onClick={() => setEditMode(true)}
                  className="btn btn-outline text-sm"
                >
                  Edit Profile
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">Full Name</label>
                {editMode ? (
                  <input
                    type="text"
                    value={tempProfile.fullName}
                    onChange={(e) => setTempProfile({ ...tempProfile, fullName: e.target.value })}
                    className="input"
                  />
                ) : (
                  <p className="text-gray-700">{profile.fullName}</p>
                )}
              </div>
              <div>
                <label className="label">USN</label>
                {editMode ? (
                  <input
                    type="text"
                    value={tempProfile.usn}
                    onChange={(e) => setTempProfile({ ...tempProfile, usn: e.target.value })}
                    className="input"
                  />
                ) : (
                  <p className="text-gray-700">{profile.usn}</p>
                )}
              </div>
              <div>
                <label className="label">Email</label>
                {editMode ? (
                  <input
                    type="email"
                    value={tempProfile.email}
                    onChange={(e) => setTempProfile({ ...tempProfile, email: e.target.value })}
                    className="input"
                  />
                ) : (
                  <p className="text-gray-700">{profile.email}</p>
                )}
              </div>
              <div>
                <label className="label">Phone</label>
                {editMode ? (
                  <input
                    type="tel"
                    value={tempProfile.phone}
                    onChange={(e) => setTempProfile({ ...tempProfile, phone: e.target.value })}
                    className="input"
                  />
                ) : (
                  <p className="text-gray-700">{profile.phone}</p>
                )}
              </div>
              <div>
                <label className="label">Department</label>
                {editMode ? (
                  <select
                    value={tempProfile.department}
                    onChange={(e) => setTempProfile({ ...tempProfile, department: e.target.value })}
                    className="input"
                  >
                    <option value="AIML">AIML</option>
                  </select>
                ) : (
                  <p className="text-gray-700">{profile.department}</p>
                )}
              </div>
              <div>
                <label className="label">Batch</label>
                {editMode ? (
                  <select
                    value={tempProfile.batch}
                    onChange={(e) => setTempProfile({ ...tempProfile, batch: e.target.value })}
                    className="input"
                  >
                    <option value="2022-2026">2022-2026</option>
                    <option value="2021-2025">2021-2025</option>
                    <option value="2023-2027">2023-2027</option>
                  </select>
                ) : (
                  <p className="text-gray-700">{profile.batch}</p>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="label">Address</label>
                {editMode ? (
                  <textarea
                    value={tempProfile.address}
                    onChange={(e) => setTempProfile({ ...tempProfile, address: e.target.value })}
                    className="input"
                  />
                ) : (
                  <p className="text-gray-700">{profile.address}</p>
                )}
              </div>
            </div>

            {editMode && (
              <div className="mt-6 flex justify-end space-x-2">
                <button 
                  onClick={handleCancel}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="btn btn-primary"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>

          {/* Skills */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {(editMode ? tempProfile.skills : profile.skills).map((skill) => (
                <div 
                  key={skill} 
                  className={`px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 flex items-center ${
                    editMode ? 'pr-1' : ''
                  }`}
                >
                  {skill}
                  {editMode && (
                    <button 
                      onClick={() => removeSkill(skill)}
                      className="ml-1 text-blue-800 hover:text-blue-900 p-1"
                    >
                      &times;
                    </button>
                  )}
                </div>
              ))}
            </div>

            {editMode && (
              <div className="flex items-center mt-2">
                <input
                  type="text"
                  placeholder="Add a skill"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="input flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                />
                <button
                  onClick={addSkill}
                  className="btn btn-outline ml-2"
                >
                  Add
                </button>
              </div>
            )}
          </div>

          {/* Certifications */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Certifications</h3>
            
            <div className="space-y-4">
              {(editMode ? tempProfile.certifications : profile.certifications).map((cert, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{cert.name}</h4>
                      <p className="text-sm text-gray-600">Issuer: {cert.issuer}</p>
                      {cert.date && (
                        <p className="text-sm text-gray-600">Date: {new Date(cert.date).toLocaleDateString()}</p>
                      )}
                    </div>
                    {editMode && (
                      <button 
                        onClick={() => removeCertification(cert.name)}
                        className="text-red-500 hover:text-red-700"
                      >
                        &times;
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {profile.certifications.length === 0 && !editMode && (
                <p className="text-gray-500 text-center py-4">No certifications added yet.</p>
              )}
            </div>

            {editMode && (
              <div className="mt-4 border border-gray-200 rounded-lg p-4 bg-gray-50">
                <h4 className="font-medium text-gray-900 mb-3">Add New Certification</h4>
                <div className="space-y-3">
                  <div>
                    <label className="label">Certification Name</label>
                    <input
                      type="text"
                      value={newCertification.name}
                      onChange={(e) => setNewCertification({ ...newCertification, name: e.target.value })}
                      className="input"
                      placeholder="e.g., AWS Solutions Architect"
                    />
                  </div>
                  <div>
                    <label className="label">Issuing Organization</label>
                    <input
                      type="text"
                      value={newCertification.issuer}
                      onChange={(e) => setNewCertification({ ...newCertification, issuer: e.target.value })}
                      className="input"
                      placeholder="e.g., AWS, Coursera, Udemy"
                    />
                  </div>
                  <div>
                    <label className="label">Date Earned</label>
                    <input
                      type="date"
                      value={newCertification.date}
                      onChange={(e) => setNewCertification({ ...newCertification, date: e.target.value })}
                      className="input"
                    />
                  </div>
                  <button
                    onClick={addCertification}
                    className="btn btn-primary mt-2"
                  >
                    Add Certification
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;