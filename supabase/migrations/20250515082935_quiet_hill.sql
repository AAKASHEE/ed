/*
  # Initial Schema Setup for EduTrack

  1. New Tables
    - `profiles`
      - Student, teacher, and HOD profiles
      - Stores user details, contact info, and role-specific data
    
    - `subjects`
      - Course subjects offered
      - Links teachers to their subjects
    
    - `marks`
      - Student academic performance
      - CIE and semester marks
    
    - `attendance`
      - Student attendance records
      - Daily/subject-wise tracking
    
    - `certifications`
      - Student certifications
      - Tracks certification details and dates
    
    - `career_plans`
      - Student career preferences
      - Stores placement, higher studies, or entrepreneurship details

  2. Security
    - Enable RLS on all tables
    - Policies for role-based access control
    - Secure data access patterns
*/

-- Create custom types
CREATE TYPE user_role AS ENUM ('student', 'teacher', 'hod');
CREATE TYPE career_path AS ENUM ('placement', 'higherStudies', 'entrepreneurship');

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  role user_role NOT NULL,
  full_name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  department text NOT NULL,
  batch text,
  usn text UNIQUE,
  address text,
  bio text,
  profile_image_url text,
  github_url text,
  linkedin_url text,
  portfolio_url text,
  qualifications text,
  experience text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Subjects table
CREATE TABLE IF NOT EXISTS subjects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  department text NOT NULL,
  teacher_id uuid REFERENCES profiles(id),
  batch text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Marks table
CREATE TABLE IF NOT EXISTS marks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES profiles(id),
  subject_id uuid REFERENCES subjects(id),
  cie_number integer CHECK (cie_number BETWEEN 1 AND 3),
  marks numeric CHECK (marks >= 0 AND marks <= 50),
  max_marks numeric DEFAULT 50,
  semester integer CHECK (semester BETWEEN 1 AND 8),
  cgpa numeric CHECK (cgpa >= 0 AND cgpa <= 10),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(student_id, subject_id, cie_number)
);

-- Attendance table
CREATE TABLE IF NOT EXISTS attendance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES profiles(id),
  subject_id uuid REFERENCES subjects(id),
  date date NOT NULL,
  status boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  UNIQUE(student_id, subject_id, date)
);

-- Certifications table
CREATE TABLE IF NOT EXISTS certifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES profiles(id),
  name text NOT NULL,
  issuer text NOT NULL,
  issue_date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Skills table
CREATE TABLE IF NOT EXISTS skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES profiles(id),
  name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(student_id, name)
);

-- Career plans table
CREATE TABLE IF NOT EXISTS career_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES profiles(id),
  path career_path NOT NULL,
  domain text,
  certifications text[],
  placement_platforms text[],
  platform_ranking text,
  internship_details text,
  project_details text,
  exam_preparation text[],
  assistance_required boolean,
  remarks text,
  problem_statement text,
  development_plan text,
  funding_available boolean,
  contacted_incubators boolean,
  incubator_remarks text,
  participated_competitions boolean,
  competition_remarks text,
  team_size integer,
  trl_level integer CHECK (trl_level BETWEEN 1 AND 9),
  start_date date,
  mentorship_areas text,
  achievements text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(student_id)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE marks ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_plans ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Teachers and HODs can view student profiles
CREATE POLICY "Teachers and HODs can view student profiles"
  ON profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND (role = 'teacher' OR role = 'hod')
    )
    AND role = 'student'
  );

-- Subjects policies
CREATE POLICY "Anyone can view subjects"
  ON subjects FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Teachers can manage their subjects"
  ON subjects FOR ALL
  USING (teacher_id = auth.uid());

-- Marks policies
CREATE POLICY "Students can view their own marks"
  ON marks FOR SELECT
  USING (student_id = auth.uid());

CREATE POLICY "Teachers can manage marks for their subjects"
  ON marks FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM subjects
      WHERE subjects.id = marks.subject_id
      AND subjects.teacher_id = auth.uid()
    )
  );

-- Attendance policies
CREATE POLICY "Students can view their own attendance"
  ON attendance FOR SELECT
  USING (student_id = auth.uid());

CREATE POLICY "Teachers can manage attendance for their subjects"
  ON attendance FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM subjects
      WHERE subjects.id = attendance.subject_id
      AND subjects.teacher_id = auth.uid()
    )
  );

-- Certifications policies
CREATE POLICY "Students can manage their certifications"
  ON certifications FOR ALL
  USING (student_id = auth.uid());

CREATE POLICY "Teachers and HODs can view certifications"
  ON certifications FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND (role = 'teacher' OR role = 'hod')
    )
  );

-- Skills policies
CREATE POLICY "Students can manage their skills"
  ON skills FOR ALL
  USING (student_id = auth.uid());

CREATE POLICY "Teachers and HODs can view skills"
  ON skills FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND (role = 'teacher' OR role = 'hod')
    )
  );

-- Career plans policies
CREATE POLICY "Students can manage their career plans"
  ON career_plans FOR ALL
  USING (student_id = auth.uid());

CREATE POLICY "Teachers and HODs can view career plans"
  ON career_plans FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND (role = 'teacher' OR role = 'hod')
    )
  );

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_department ON profiles(department);
CREATE INDEX IF NOT EXISTS idx_profiles_batch ON profiles(batch);
CREATE INDEX IF NOT EXISTS idx_subjects_teacher ON subjects(teacher_id);
CREATE INDEX IF NOT EXISTS idx_marks_student ON marks(student_id);
CREATE INDEX IF NOT EXISTS idx_marks_subject ON marks(subject_id);
CREATE INDEX IF NOT EXISTS idx_attendance_student ON attendance(student_id);
CREATE INDEX IF NOT EXISTS idx_attendance_subject ON attendance(subject_id);
CREATE INDEX IF NOT EXISTS idx_certifications_student ON certifications(student_id);
CREATE INDEX IF NOT EXISTS idx_skills_student ON skills(student_id);
CREATE INDEX IF NOT EXISTS idx_career_plans_student ON career_plans(student_id);