-- SQL to add missing tables for progress tracking
-- Run this if you have courses table but missing course_modules and related tables

-- Course modules table (required for quiz_attempts)
CREATE TABLE IF NOT EXISTS course_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Course lessons table (required for lesson_progress)
CREATE TABLE IF NOT EXISTS course_lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID REFERENCES course_modules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT,
  video_url TEXT,
  duration_minutes INTEGER,
  order_index INTEGER NOT NULL,
  is_free_preview BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Lesson progress tracking table
CREATE TABLE IF NOT EXISTS lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES course_lessons(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  UNIQUE(user_id, lesson_id)
);

-- Certifications table
CREATE TABLE IF NOT EXISTS certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  certificate_number TEXT UNIQUE NOT NULL,
  issued_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  pdf_url TEXT,
  UNIQUE(user_id, course_id)
);

-- Add updated_at column to enrollments table (if it doesn't exist)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'enrollments' AND column_name = 'updated_at') THEN
        ALTER TABLE enrollments ADD COLUMN updated_at TIMESTAMPTZ DEFAULT NOW();
    END IF;
END $$;

-- Create quiz_attempts table
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  module_id UUID REFERENCES course_modules(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  total_points INTEGER NOT NULL,
  passed BOOLEAN NOT NULL,
  attempt_number INTEGER DEFAULT 1,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  answers JSONB,
  UNIQUE(user_id, module_id, attempt_number)
);

-- Enable RLS on new tables
ALTER TABLE course_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for course_modules (public read for published courses)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'course_modules' AND policyname = 'Anyone can view modules for published courses') THEN
        CREATE POLICY "Anyone can view modules for published courses" ON course_modules
          FOR SELECT USING (
            EXISTS (
              SELECT 1 FROM courses
              WHERE courses.id = course_modules.course_id
              AND courses.is_published = true
            )
          );
    END IF;
END $$;

-- RLS Policies for course_lessons (public read for published courses)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'course_lessons' AND policyname = 'Anyone can view lessons for published courses') THEN
        CREATE POLICY "Anyone can view lessons for published courses" ON course_lessons
          FOR SELECT USING (
            EXISTS (
              SELECT 1 FROM course_modules cm
              JOIN courses c ON c.id = cm.course_id
              WHERE cm.id = course_lessons.module_id
              AND c.is_published = true
            )
          );
    END IF;
END $$;

-- RLS Policies for lesson progress
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'lesson_progress' AND policyname = 'Users can view their own progress') THEN
        CREATE POLICY "Users can view their own progress" ON lesson_progress
          FOR SELECT USING (auth.uid() = user_id);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'lesson_progress' AND policyname = 'Users can update their own progress') THEN
        CREATE POLICY "Users can update their own progress" ON lesson_progress
          FOR ALL USING (auth.uid() = user_id);
    END IF;
END $$;

-- RLS Policies for certifications
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'certifications' AND policyname = 'Users can view their own certifications') THEN
        CREATE POLICY "Users can view their own certifications" ON certifications
          FOR SELECT USING (auth.uid() = user_id);
    END IF;
END $$;

-- RLS Policies for quiz attempts
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'quiz_attempts' AND policyname = 'Users can view their own quiz attempts') THEN
        CREATE POLICY "Users can view their own quiz attempts" ON quiz_attempts
          FOR SELECT USING (auth.uid() = user_id);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'quiz_attempts' AND policyname = 'Users can create their own quiz attempts') THEN
        CREATE POLICY "Users can create their own quiz attempts" ON quiz_attempts
          FOR INSERT WITH CHECK (auth.uid() = user_id);
    END IF;
END $$;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_course_modules_course_id ON course_modules(course_id);
CREATE INDEX IF NOT EXISTS idx_course_lessons_module_id ON course_lessons(module_id);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_user_id ON lesson_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_lesson_id ON lesson_progress(lesson_id);
CREATE INDEX IF NOT EXISTS idx_certifications_user_id ON certifications(user_id);
CREATE INDEX IF NOT EXISTS idx_certifications_course_id ON certifications(course_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user_id ON quiz_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_module_id ON quiz_attempts(module_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_course_id ON quiz_attempts(course_id);