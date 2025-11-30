-- Minimal SQL Updates for Progress Tracking (only new additions)
-- Run this if you already have the base tables but need the progress tracking features

-- Add updated_at column to enrollments table (if it doesn't exist)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'enrollments' AND column_name = 'updated_at') THEN
        ALTER TABLE enrollments ADD COLUMN updated_at TIMESTAMPTZ DEFAULT NOW();
    END IF;
END $$;

-- Create quiz_attempts table (if it doesn't exist)
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

-- Enable RLS on quiz_attempts (if not already enabled)
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for quiz_attempts (only if they don't exist)
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

-- Create indexes for quiz_attempts (if they don't exist)
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user_id ON quiz_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_module_id ON quiz_attempts(module_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_course_id ON quiz_attempts(course_id);