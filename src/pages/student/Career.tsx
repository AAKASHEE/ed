import { useState } from 'react';
import { BriefcaseIcon, GraduationCap, Lightbulb } from 'lucide-react';

type CareerPath = 'placement' | 'higherStudies' | 'entrepreneurship' | 'undecided';

interface CareerFormState {
  path: CareerPath;
  
  // Placement fields
  domain?: string;
  hasCertification?: boolean;
  certificationDetails?: string;
  certifications?: string[];
  placementPlatforms?: string[];
  platformRanking?: string;
  internshipDetails?: string;
  projectDetails?: string;
  
  // Higher Studies fields
  examPrep?: string[];
  assistanceRequired?: boolean;
  remarks?: string;
  
  // Entrepreneurship fields
  problem?: string;
  developmentPlan?: string;
  funding?: boolean;
  contactedIncubators?: boolean;
  incubatorRemarks?: string;
  participatedCompetitions?: boolean;
  competitionRemarks?: string;
  teamSize?: number;
  trl?: number;
  startDate?: string;
  mentorshipAreas?: string;
  achievements?: string;
}

const StudentCareer = () => {
  const [careerForm, setCareerForm] = useState<CareerFormState>({
    path: 'undecided',
  });

  const handlePathChange = (path: CareerPath) => {
    setCareerForm({ ...careerForm, path });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setCareerForm({ ...careerForm, [name]: checkbox.checked });
    } else {
      setCareerForm({ ...careerForm, [name]: value });
    }
  };

  const handleMultiSelectChange = (name: string, value: string) => {
    const currentValues = careerForm[name as keyof CareerFormState] as string[] || [];
    
    if (currentValues.includes(value)) {
      setCareerForm({
        ...careerForm,
        [name]: currentValues.filter(v => v !== value),
      });
    } else {
      setCareerForm({
        ...careerForm,
        [name]: [...currentValues, value],
      });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <h1 className="page-title">Career Planning</h1>

      <div className="card">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Select Your Career Path</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button
            className={`p-4 rounded-lg border-2 flex flex-col items-center transition-all ${
              careerForm.path === 'placement'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50/50'
            }`}
            onClick={() => handlePathChange('placement')}
          >
            <div className={`p-3 rounded-full mb-2 ${
              careerForm.path === 'placement' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'
            }`}>
              <BriefcaseIcon size={24} />
            </div>
            <h3 className="font-semibold">Placement</h3>
            <p className="text-sm text-gray-500 text-center mt-1">Prepare for industry jobs</p>
          </button>
          
          <button
            className={`p-4 rounded-lg border-2 flex flex-col items-center transition-all ${
              careerForm.path === 'higherStudies'
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 hover:border-purple-200 hover:bg-purple-50/50'
            }`}
            onClick={() => handlePathChange('higherStudies')}
          >
            <div className={`p-3 rounded-full mb-2 ${
              careerForm.path === 'higherStudies' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-500'
            }`}>
              <GraduationCap size={24} />
            </div>
            <h3 className="font-semibold">Higher Studies</h3>
            <p className="text-sm text-gray-500 text-center mt-1">Continue academic journey</p>
          </button>
          
          <button
            className={`p-4 rounded-lg border-2 flex flex-col items-center transition-all ${
              careerForm.path === 'entrepreneurship'
                ? 'border-orange-500 bg-orange-50'
                : 'border-gray-200 hover:border-orange-200 hover:bg-orange-50/50'
            }`}
            onClick={() => handlePathChange('entrepreneurship')}
          >
            <div className={`p-3 rounded-full mb-2 ${
              careerForm.path === 'entrepreneurship' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-500'
            }`}>
              <Lightbulb size={24} />
            </div>
            <h3 className="font-semibold">Entrepreneurship</h3>
            <p className="text-sm text-gray-500 text-center mt-1">Start your own venture</p>
          </button>
        </div>

        {careerForm.path === 'undecided' && (
          <div className="bg-gray-50 p-8 rounded-lg text-center border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Your Career Journey Starts Here</h3>
            <p className="text-gray-600 mb-4">Select one of the career paths above to begin planning your future.</p>
            <p className="text-sm text-gray-500">Your selections and preferences will help us provide tailored guidance and support.</p>
          </div>
        )}

        {careerForm.path === 'placement' && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-lg font-semibold border-b pb-2">Placement Preparation</h3>
            
            <div className="space-y-4">
              <div>
                <label className="label">Preferred Domain</label>
                <input 
                  type="text" 
                  name="domain"
                  value={careerForm.domain || ''}
                  onChange={handleChange}
                  placeholder="e.g., Machine Learning, Web Development, Data Science"
                  className="input"
                />
              </div>
              
              <div>
                <p className="label mb-2">Do you have any Professional domain specific Certification towards placement?</p>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input 
                      type="radio" 
                      name="hasCertification" 
                      checked={careerForm.hasCertification === true}
                      onChange={() => setCareerForm({...careerForm, hasCertification: true})}
                      className="mr-2"
                    />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="radio" 
                      name="hasCertification" 
                      checked={careerForm.hasCertification === false}
                      onChange={() => setCareerForm({...careerForm, hasCertification: false})}
                      className="mr-2"
                    />
                    No
                  </label>
                </div>
              </div>
              
              {careerForm.hasCertification && (
                <div>
                  <label className="label">Certification Details</label>
                  <textarea 
                    name="certificationDetails"
                    value={careerForm.certificationDetails || ''}
                    onChange={handleChange}
                    placeholder="Please specify your certifications"
                    className="input min-h-[80px]"
                  />
                </div>
              )}
              
              <div>
                <p className="label mb-2">Do you have any of these certifications?</p>
                <div className="space-y-2">
                  {['AWS', 'Azure', 'Google Cloud Platform'].map((cert) => (
                    <label key={cert} className="flex items-center">
                      <input 
                        type="checkbox" 
                        checked={(careerForm.certifications || []).includes(cert)}
                        onChange={() => handleMultiSelectChange('certifications', cert)}
                        className="mr-2"
                      />
                      {cert}
                    </label>
                  ))}
                  <div>
                    <label className="flex items-center">
                      <input 
                        type="checkbox" 
                        checked={(careerForm.certifications || []).includes('Other')}
                        onChange={() => handleMultiSelectChange('certifications', 'Other')}
                        className="mr-2"
                      />
                      Other (specify below)
                    </label>
                    {(careerForm.certifications || []).includes('Other') && (
                      <textarea 
                        name="otherCertifications"
                        className="input mt-2"
                        placeholder="Please specify other certifications"
                      />
                    )}
                  </div>
                </div>
              </div>
              
              <div>
                <p className="label mb-2">Have you started placement preparation from the following?</p>
                <div className="grid grid-cols-2 gap-2">
                  {['Neopat', 'LeetCode', 'CodeChef', 'HackerEarth', 'HackerRank'].map((platform) => (
                    <label key={platform} className="flex items-center">
                      <input 
                        type="checkbox" 
                        checked={(careerForm.placementPlatforms || []).includes(platform)}
                        onChange={() => handleMultiSelectChange('placementPlatforms', platform)}
                        className="mr-2"
                      />
                      {platform}
                    </label>
                  ))}
                  <div className="col-span-2">
                    <label className="flex items-center">
                      <input 
                        type="checkbox" 
                        checked={(careerForm.placementPlatforms || []).includes('Other')}
                        onChange={() => handleMultiSelectChange('placementPlatforms', 'Other')}
                        className="mr-2"
                      />
                      Other (specify below)
                    </label>
                    {(careerForm.placementPlatforms || []).includes('Other') && (
                      <input 
                        type="text" 
                        name="otherPlatform"
                        className="input mt-2"
                        placeholder="Please specify other platforms"
                      />
                    )}
                  </div>
                </div>
              </div>
              
              <div>
                <label className="label">Please specify Ranking for above Chosen option</label>
                <input 
                  type="text" 
                  name="platformRanking"
                  value={careerForm.platformRanking || ''}
                  onChange={handleChange}
                  placeholder="e.g., LeetCode: 1500, CodeChef: 4-star"
                  className="input"
                />
              </div>
              
              <div>
                <label className="label">Internship Details</label>
                <textarea 
                  name="internshipDetails"
                  value={careerForm.internshipDetails || ''}
                  onChange={handleChange}
                  placeholder="Please provide details about any internships you've completed or are currently pursuing"
                  className="input min-h-[80px]"
                />
              </div>
              
              <div>
                <label className="label">Project Details</label>
                <textarea 
                  name="projectDetails"
                  value={careerForm.projectDetails || ''}
                  onChange={handleChange}
                  placeholder="Please provide details about your key projects"
                  className="input min-h-[80px]"
                />
              </div>
            </div>
          </div>
        )}

        {careerForm.path === 'higherStudies' && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-lg font-semibold border-b pb-2">Higher Studies Preparation</h3>
            
            <div className="space-y-4">
              <div>
                <p className="label mb-2">Preparing for:</p>
                <div className="grid grid-cols-2 gap-2">
                  {['Gate', 'GRE/Tofel', 'CAT', 'IELTS'].map((exam) => (
                    <label key={exam} className="flex items-center">
                      <input 
                        type="checkbox" 
                        checked={(careerForm.examPrep || []).includes(exam)}
                        onChange={() => handleMultiSelectChange('examPrep', exam)}
                        className="mr-2"
                      />
                      {exam}
                    </label>
                  ))}
                  <div className="col-span-2">
                    <label className="flex items-center">
                      <input 
                        type="checkbox" 
                        checked={(careerForm.examPrep || []).includes('Other')}
                        onChange={() => handleMultiSelectChange('examPrep', 'Other')}
                        className="mr-2"
                      />
                      Other (specify below)
                    </label>
                    {(careerForm.examPrep || []).includes('Other') && (
                      <input 
                        type="text" 
                        name="otherExam"
                        className="input mt-2"
                        placeholder="Please specify other exams"
                      />
                    )}
                  </div>
                </div>
              </div>
              
              <div>
                <p className="label mb-2">Any assistance required from college?</p>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input 
                      type="radio" 
                      name="assistanceRequired" 
                      checked={careerForm.assistanceRequired === true}
                      onChange={() => setCareerForm({...careerForm, assistanceRequired: true})}
                      className="mr-2"
                    />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="radio" 
                      name="assistanceRequired" 
                      checked={careerForm.assistanceRequired === false}
                      onChange={() => setCareerForm({...careerForm, assistanceRequired: false})}
                      className="mr-2"
                    />
                    No
                  </label>
                </div>
              </div>
              
              <div>
                <label className="label">Remarks</label>
                <textarea 
                  name="remarks"
                  value={careerForm.remarks || ''}
                  onChange={handleChange}
                  placeholder="Any additional information or specific assistance needed"
                  className="input min-h-[100px]"
                />
              </div>
            </div>
          </div>
        )}

        {careerForm.path === 'entrepreneurship' && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-lg font-semibold border-b pb-2">Entrepreneurship Planning</h3>
            
            <div className="space-y-4">
              <div>
                <label className="label">Problem you are trying to solve</label>
                <textarea 
                  name="problem"
                  value={careerForm.problem || ''}
                  onChange={handleChange}
                  placeholder="Describe the problem your venture aims to solve"
                  className="input min-h-[100px]"
                />
              </div>
              
              <div>
                <label className="label">Plan of taking ideation to product development</label>
                <textarea 
                  name="developmentPlan"
                  value={careerForm.developmentPlan || ''}
                  onChange={handleChange}
                  placeholder="Outline your approach for developing your idea into a product"
                  className="input min-h-[100px]"
                />
              </div>
              
              <div>
                <p className="label mb-2">Funding available?</p>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input 
                      type="radio" 
                      name="funding" 
                      checked={careerForm.funding === true}
                      onChange={() => setCareerForm({...careerForm, funding: true})}
                      className="mr-2"
                    />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="radio" 
                      name="funding" 
                      checked={careerForm.funding === false}
                      onChange={() => setCareerForm({...careerForm, funding: false})}
                      className="mr-2"
                    />
                    No
                  </label>
                </div>
              </div>
              
              <div>
                <p className="label mb-2">Did you contact IEDC/DERBI / any other Incubators for taking Entrepreneurship idea ahead?</p>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input 
                      type="radio" 
                      name="contactedIncubators" 
                      checked={careerForm.contactedIncubators === true}
                      onChange={() => setCareerForm({...careerForm, contactedIncubators: true})}
                      className="mr-2"
                    />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="radio" 
                      name="contactedIncubators" 
                      checked={careerForm.contactedIncubators === false}
                      onChange={() => setCareerForm({...careerForm, contactedIncubators: false})}
                      className="mr-2"
                    />
                    No
                  </label>
                </div>
                
                {careerForm.contactedIncubators && (
                  <div className="mt-2">
                    <label className="label">Remark if yes</label>
                    <textarea 
                      name="incubatorRemarks"
                      value={careerForm.incubatorRemarks || ''}
                      onChange={handleChange}
                      placeholder="Describe your interaction with incubators"
                      className="input"
                    />
                  </div>
                )}
              </div>
              
              <div>
                <p className="label mb-2">Any Innovation/Hackathon/Idea Competition Participated?</p>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input 
                      type="radio" 
                      name="participatedCompetitions" 
                      checked={careerForm.participatedCompetitions === true}
                      onChange={() => setCareerForm({...careerForm, participatedCompetitions: true})}
                      className="mr-2"
                    />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="radio" 
                      name="participatedCompetitions" 
                      checked={careerForm.participatedCompetitions === false}
                      onChange={() => setCareerForm({...careerForm, participatedCompetitions: false})}
                      className="mr-2"
                    />
                    No
                  </label>
                </div>
                
                {careerForm.participatedCompetitions && (
                  <div className="mt-2">
                    <label className="label">Remarks if Yes</label>
                    <textarea 
                      name="competitionRemarks"
                      value={careerForm.competitionRemarks || ''}
                      onChange={handleChange}
                      placeholder="Describe your participation and any achievements"
                      className="input"
                    />
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">No. of Team Members</label>
                  <input 
                    type="number" 
                    name="teamSize"
                    value={careerForm.teamSize || ''}
                    onChange={handleChange}
                    min="1"
                    className="input"
                  />
                </div>
                
                <div>
                  <label className="label">Technology Readiness Level (TRL)</label>
                  <select 
                    name="trl"
                    value={careerForm.trl || ''}
                    onChange={handleChange}
                    className="input"
                  >
                    <option value="">Select TRL Level</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="label">When did you start</label>
                  <input 
                    type="date" 
                    name="startDate"
                    value={careerForm.startDate || ''}
                    onChange={handleChange}
                    className="input"
                  />
                </div>
              </div>
              
              <div>
                <label className="label">Area where you need mentorship</label>
                <textarea 
                  name="mentorshipAreas"
                  value={careerForm.mentorshipAreas || ''}
                  onChange={handleChange}
                  placeholder="Describe areas where you need guidance or mentorship"
                  className="input"
                />
              </div>
              
              <div>
                <label className="label">Achievements</label>
                <textarea 
                  name="achievements"
                  value={careerForm.achievements || ''}
                  onChange={handleChange}
                  placeholder="List any achievements or milestones reached"
                  className="input"
                />
              </div>
            </div>
          </div>
        )}
        
        {careerForm.path !== 'undecided' && (
          <div className="flex justify-end mt-8">
            <button 
              className="btn btn-primary px-6"
              onClick={() => alert('Career plan updated successfully!')}
            >
              Save Career Plan
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentCareer;