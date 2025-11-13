-- Add instructor support to the database

-- Create instructors table
CREATE TABLE IF NOT EXISTS instructors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  title TEXT,
  bio TEXT,
  avatar_url TEXT,
  email TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add instructor_id to courses table
ALTER TABLE courses 
ADD COLUMN IF NOT EXISTS instructor_id UUID REFERENCES instructors(id) ON DELETE SET NULL;

-- Enable RLS for instructors
ALTER TABLE instructors ENABLE ROW LEVEL SECURITY;

-- RLS Policy for instructors (public read)
CREATE POLICY "Anyone can view instructors" ON instructors
  FOR SELECT USING (true);

-- Insert Ashley Strong as the main instructor
INSERT INTO instructors (name, title, bio, avatar_url)
VALUES (
  'Ashley Strong',
  'Lead Doula Instructor',
  'Ashley is a certified birth doula, postpartum doula, and childbirth educator with over 15 years of experience. She is passionate about empowering families and providing compassionate, evidence-based care. Ashley has attended over 500 births and is the founder of the Doula Academy.',
  '/logonon.png'
)
ON CONFLICT DO NOTHING;

-- Update the Complete Doula Certification course to use Ashley Strong
UPDATE courses 
SET instructor_id = (SELECT id FROM instructors WHERE name = 'Ashley Strong')
WHERE slug = 'complete-doula-certification';

SELECT 'Instructor table and data added successfully!' as status;
