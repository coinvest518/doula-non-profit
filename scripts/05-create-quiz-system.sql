-- Quiz and Assessment System for Course Platform
-- Adds quiz functionality to existing course structure

-- Quiz/Assessment table
CREATE TABLE IF NOT EXISTS course_quizzes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  module_id UUID REFERENCES course_modules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  instructions TEXT,
  time_limit_minutes INTEGER, -- NULL means no time limit
  passing_score INTEGER DEFAULT 70, -- Percentage needed to pass
  max_attempts INTEGER DEFAULT 3, -- NULL means unlimited
  is_required BOOLEAN DEFAULT true,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Quiz questions
CREATE TABLE IF NOT EXISTS quiz_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id UUID REFERENCES course_quizzes(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  question_type TEXT CHECK (question_type IN ('multiple_choice', 'true_false', 'short_answer', 'essay')) NOT NULL,
  points INTEGER DEFAULT 1,
  order_index INTEGER NOT NULL,
  explanation TEXT, -- Explanation shown after answering
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Quiz question options (for multiple choice)
CREATE TABLE IF NOT EXISTS quiz_question_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID REFERENCES quiz_questions(id) ON DELETE CASCADE,
  option_text TEXT NOT NULL,
  is_correct BOOLEAN DEFAULT false,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User quiz attempts
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  quiz_id UUID REFERENCES course_quizzes(id) ON DELETE CASCADE,
  attempt_number INTEGER NOT NULL,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  score INTEGER, -- Percentage score
  passed BOOLEAN DEFAULT false,
  time_taken_minutes INTEGER,
  UNIQUE(user_id, quiz_id, attempt_number)
);

-- User answers to quiz questions
CREATE TABLE IF NOT EXISTS quiz_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id UUID REFERENCES quiz_attempts(id) ON DELETE CASCADE,
  question_id UUID REFERENCES quiz_questions(id) ON DELETE CASCADE,
  selected_option_id UUID REFERENCES quiz_question_options(id) ON DELETE SET NULL, -- For multiple choice
  answer_text TEXT, -- For short answer/essay
  is_correct BOOLEAN,
  points_earned INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(attempt_id, question_id)
);

-- Enable RLS
ALTER TABLE course_quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_question_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_answers ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view quizzes for courses they're enrolled in" ON course_quizzes
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM enrollments 
      WHERE course_id = course_quizzes.course_id 
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view quiz questions for enrolled courses" ON quiz_questions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM course_quizzes cq
      JOIN enrollments e ON e.course_id = cq.course_id
      WHERE cq.id = quiz_questions.quiz_id
      AND e.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view quiz options for enrolled courses" ON quiz_question_options
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM quiz_questions qq
      JOIN course_quizzes cq ON cq.id = qq.quiz_id
      JOIN enrollments e ON e.course_id = cq.course_id
      WHERE qq.id = quiz_question_options.question_id
      AND e.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage their own quiz attempts" ON quiz_attempts
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own quiz answers" ON quiz_answers
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM quiz_attempts qa
      WHERE qa.id = quiz_answers.attempt_id
      AND qa.user_id = auth.uid()
    )
  );

-- Indexes for performance
CREATE INDEX idx_course_quizzes_course_id ON course_quizzes(course_id);
CREATE INDEX idx_course_quizzes_module_id ON course_quizzes(module_id);
CREATE INDEX idx_quiz_questions_quiz_id ON quiz_questions(quiz_id);
CREATE INDEX idx_quiz_question_options_question_id ON quiz_question_options(question_id);
CREATE INDEX idx_quiz_attempts_user_quiz ON quiz_attempts(user_id, quiz_id);
CREATE INDEX idx_quiz_answers_attempt_id ON quiz_answers(attempt_id);

-- Real quiz data for all modules in Complete Doula Certification
DO $$
DECLARE
  v_course_id UUID;
  v_module_id UUID;
  v_quiz_id UUID;
  v_question_id UUID;
  module_rec RECORD;
BEGIN
  -- Get course ID
  SELECT id INTO v_course_id FROM courses WHERE slug = 'complete-doula-certification';

  -- Loop through all modules and create quizzes
  FOR module_rec IN 
    SELECT id, title, order_index, description 
    FROM course_modules 
    WHERE course_id = v_course_id 
    ORDER BY order_index
  LOOP
    -- Create quiz for each module
    INSERT INTO course_quizzes (course_id, module_id, title, description, instructions, passing_score, max_attempts, order_index)
    VALUES (
      v_course_id,
      module_rec.id,
      'Module ' || module_rec.order_index || ': ' || module_rec.title || ' Quiz',
      'Test your understanding of ' || lower(module_rec.title),
      'Answer all questions based on the module content and videos. You need 70% to pass and have up to 3 attempts.',
      70,
      3,
      module_rec.order_index
    ) RETURNING id INTO v_quiz_id;

    -- MODULE 1: Foundations of Doula Care
    IF module_rec.order_index = 1 THEN
      -- Question 1
      INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index, explanation)
      VALUES (v_quiz_id, 'What is the primary role of a doula during birth?', 'multiple_choice', 2, 1,
              'Doulas provide continuous emotional, physical, and informational support - they do not perform medical procedures.')
      RETURNING id INTO v_question_id;
      
      INSERT INTO quiz_question_options (question_id, option_text, is_correct, order_index) VALUES
      (v_question_id, 'Provide medical care and deliver the baby', false, 1),
      (v_question_id, 'Offer continuous emotional, physical, and informational support', true, 2),
      (v_question_id, 'Replace the role of nurses and midwives', false, 3),
      (v_question_id, 'Make medical decisions for the client', false, 4);

      -- Question 2
      INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index, explanation)
      VALUES (v_quiz_id, 'Doulas have been supporting birthing people across cultures for centuries.', 'true_false', 1, 2,
              'True! Doula support has ancient roots across many cultures - from African griots to Indigenous birthkeepers.')
      RETURNING id INTO v_question_id;
      
      INSERT INTO quiz_question_options (question_id, option_text, is_correct, order_index) VALUES
      (v_question_id, 'True', true, 1), (v_question_id, 'False', false, 2);

      -- Question 3
      INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index, explanation)
      VALUES (v_quiz_id, 'Which type of support do doulas NOT provide?', 'multiple_choice', 2, 3,
              'Doulas provide emotional, physical, and informational support, but not medical care.')
      RETURNING id INTO v_question_id;
      
      INSERT INTO quiz_question_options (question_id, option_text, is_correct, order_index) VALUES
      (v_question_id, 'Emotional support during labor', false, 1),
      (v_question_id, 'Physical comfort measures', false, 2),
      (v_question_id, 'Medical diagnosis and treatment', true, 3),
      (v_question_id, 'Informational support about options', false, 4);

    -- MODULE 2: Anatomy, Physiology, and Birth Process
    ELSIF module_rec.order_index = 2 THEN
      -- Question 1
      INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index, explanation)
      VALUES (v_quiz_id, 'What hormone is primarily responsible for labor contractions?', 'multiple_choice', 2, 1,
              'Oxytocin triggers contractions and is often called the "love hormone" as it also promotes bonding.')
      RETURNING id INTO v_question_id;
      
      INSERT INTO quiz_question_options (question_id, option_text, is_correct, order_index) VALUES
      (v_question_id, 'Progesterone', false, 1),
      (v_question_id, 'Oxytocin', true, 2),
      (v_question_id, 'Estrogen', false, 3),
      (v_question_id, 'Relaxin', false, 4);

      -- Question 2
      INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index, explanation)
      VALUES (v_quiz_id, 'The cervix must dilate to 10 cm for the baby to be born.', 'true_false', 1, 2,
              'True! Complete dilation is 10 centimeters, which allows the baby to pass through the cervix.')
      RETURNING id INTO v_question_id;
      
      INSERT INTO quiz_question_options (question_id, option_text, is_correct, order_index) VALUES
      (v_question_id, 'True', true, 1), (v_question_id, 'False', false, 2);

      -- Question 3
      INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index, explanation)
      VALUES (v_quiz_id, 'Which comfort measure uses warm water to help with labor pain?', 'multiple_choice', 2, 3,
              'Hydrotherapy (warm showers or baths) can help relax muscles and reduce pain during labor.')
      RETURNING id INTO v_question_id;
      
      INSERT INTO quiz_question_options (question_id, option_text, is_correct, order_index) VALUES
      (v_question_id, 'Hydrotherapy', true, 1),
      (v_question_id, 'Aromatherapy', false, 2),
      (v_question_id, 'Acupuncture', false, 3),
      (v_question_id, 'Reflexology', false, 4);

    -- MODULE 3: Communication, Advocacy, and Emotional Support
    ELSIF module_rec.order_index = 3 THEN
      -- Question 1
      INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index, explanation)
      VALUES (v_quiz_id, 'What does trauma-informed care prioritize?', 'multiple_choice', 2, 1,
              'Trauma-informed care focuses on creating safety, building trust, and empowering clients.')
      RETURNING id INTO v_question_id;
      
      INSERT INTO quiz_question_options (question_id, option_text, is_correct, order_index) VALUES
      (v_question_id, 'Speed and efficiency', false, 1),
      (v_question_id, 'Safety and empowerment', true, 2),
      (v_question_id, 'Following strict protocols', false, 3),
      (v_question_id, 'Minimizing client questions', false, 4);

      -- Question 2
      INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index, explanation)
      VALUES (v_quiz_id, 'Effective advocacy means confronting medical staff when they disagree with the client.', 'true_false', 1, 2,
              'False! Advocacy is about collaboration, not confrontation. Help clients communicate their needs respectfully.')
      RETURNING id INTO v_question_id;
      
      INSERT INTO quiz_question_options (question_id, option_text, is_correct, order_index) VALUES
      (v_question_id, 'True', false, 1), (v_question_id, 'False', true, 2);

    -- MODULE 4: Standards of Care and Ethics
    ELSIF module_rec.order_index = 4 THEN
      -- Question 1
      INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index, explanation)
      VALUES (v_quiz_id, 'What does HIPAA protect?', 'multiple_choice', 2, 1,
              'HIPAA protects all personally identifiable health information, including names, medical history, and birth outcomes.')
      RETURNING id INTO v_question_id;
      
      INSERT INTO quiz_question_options (question_id, option_text, is_correct, order_index) VALUES
      (v_question_id, 'Only medical test results', false, 1),
      (v_question_id, 'Protected health information (PHI)', true, 2),
      (v_question_id, 'Only hospital records', false, 3),
      (v_question_id, 'Only insurance information', false, 4);

      -- Question 2
      INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index, explanation)
      VALUES (v_quiz_id, 'Doulas should always support the client''s choices, even if they disagree personally.', 'true_false', 1, 2,
              'True! Non-judgmental, client-centered care means supporting their informed decisions regardless of personal beliefs.')
      RETURNING id INTO v_question_id;
      
      INSERT INTO quiz_question_options (question_id, option_text, is_correct, order_index) VALUES
      (v_question_id, 'True', true, 1), (v_question_id, 'False', false, 2);

    -- MODULE 5: CPR and First Aid Certification
    ELSIF module_rec.order_index = 5 THEN
      -- Question 1
      INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index, explanation)
      VALUES (v_quiz_id, 'How often must doulas renew their CPR certification?', 'multiple_choice', 2, 1,
              'CPR certifications are valid for 2 years and must be renewed to maintain current certification.')
      RETURNING id INTO v_question_id;
      
      INSERT INTO quiz_question_options (question_id, option_text, is_correct, order_index) VALUES
      (v_question_id, 'Every year', false, 1),
      (v_question_id, 'Every 2 years', true, 2),
      (v_question_id, 'Every 3 years', false, 3),
      (v_question_id, 'Never expires', false, 4);

      -- Question 2
      INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index, explanation)
      VALUES (v_quiz_id, 'CPR training for doulas must include adult, child, and infant CPR.', 'true_false', 1, 2,
              'True! Doulas work with families and may need to respond to emergencies involving people of all ages.')
      RETURNING id INTO v_question_id;
      
      INSERT INTO quiz_question_options (question_id, option_text, is_correct, order_index) VALUES
      (v_question_id, 'True', true, 1), (v_question_id, 'False', false, 2);

    -- MODULE 6: Domestic Violence and Trauma-Informed Care
    ELSIF module_rec.order_index = 6 THEN
      -- Question 1
      INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index, explanation)
      VALUES (v_quiz_id, 'Which is a warning sign of domestic violence?', 'multiple_choice', 2, 1,
              'When a partner controls all interactions and won''t allow private conversations, this is a red flag for abuse.')
      RETURNING id INTO v_question_id;
      
      INSERT INTO quiz_question_options (question_id, option_text, is_correct, order_index) VALUES
      (v_question_id, 'Client asks many questions', false, 1),
      (v_question_id, 'Partner attends all appointments', false, 2),
      (v_question_id, 'Partner controls all conversations and won''t leave room', true, 3),
      (v_question_id, 'Client wants natural birth', false, 4);

      -- Question 2
      INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index, explanation)
      VALUES (v_quiz_id, 'If you suspect abuse, you should confront the abuser directly.', 'true_false', 1, 2,
              'False! Never confront an abuser as this can escalate danger. Speak privately with the client when safe.')
      RETURNING id INTO v_question_id;
      
      INSERT INTO quiz_question_options (question_id, option_text, is_correct, order_index) VALUES
      (v_question_id, 'True', false, 1), (v_question_id, 'False', true, 2);

    -- MODULE 7: Lactation and Newborn Care
    ELSIF module_rec.order_index = 7 THEN
      -- Question 1
      INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index, explanation)
      VALUES (v_quiz_id, 'What are early feeding cues in newborns?', 'multiple_choice', 2, 1,
              'Rooting, sucking motions, and hand-to-mouth movements happen before crying and indicate hunger.')
      RETURNING id INTO v_question_id;
      
      INSERT INTO quiz_question_options (question_id, option_text, is_correct, order_index) VALUES
      (v_question_id, 'Loud crying and fussing', false, 1),
      (v_question_id, 'Rooting and sucking motions', true, 2),
      (v_question_id, 'Sleeping deeply', false, 3),
      (v_question_id, 'Hiccupping', false, 4);

      -- Question 2
      INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index, explanation)
      VALUES (v_quiz_id, 'The ABC rule for safe sleep means: Alone, Back, Crib.', 'true_false', 1, 2,
              'True! Babies should sleep alone, on their back, in a crib with a firm mattress and no loose bedding.')
      RETURNING id INTO v_question_id;
      
      INSERT INTO quiz_question_options (question_id, option_text, is_correct, order_index) VALUES
      (v_question_id, 'True', true, 1), (v_question_id, 'False', false, 2);

    -- MODULE 8: Business of Doula Work & Medicaid Billing
    ELSIF module_rec.order_index = 8 THEN
      -- Question 1
      INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index, explanation)
      VALUES (v_quiz_id, 'What do you need to apply for Medicaid reimbursement?', 'multiple_choice', 2, 1,
              'A National Provider Identifier (NPI) is required to bill Medicaid for doula services.')
      RETURNING id INTO v_question_id;
      
      INSERT INTO quiz_question_options (question_id, option_text, is_correct, order_index) VALUES
      (v_question_id, 'Business license only', false, 1),
      (v_question_id, 'National Provider Identifier (NPI)', true, 2),
      (v_question_id, 'College degree', false, 3),
      (v_question_id, 'Hospital partnership', false, 4);

      -- Question 2
      INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index, explanation)
      VALUES (v_quiz_id, 'Georgia currently offers universal Medicaid coverage for doula services.', 'true_false', 1, 2,
              'False! Georgia does not yet have universal Medicaid doula coverage, though legislation is in progress.')
      RETURNING id INTO v_question_id;
      
      INSERT INTO quiz_question_options (question_id, option_text, is_correct, order_index) VALUES
      (v_question_id, 'True', false, 1), (v_question_id, 'False', true, 2);

    -- MODULE 9: Cultural Competency & Health Equity
    ELSIF module_rec.order_index = 9 THEN
      -- Question 1
      INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index, explanation)
      VALUES (v_quiz_id, 'Cultural humility means:', 'multiple_choice', 2, 1,
              'Cultural humility is recognizing that clients are experts in their own lives and being open to learning.')
      RETURNING id INTO v_question_id;
      
      INSERT INTO quiz_question_options (question_id, option_text, is_correct, order_index) VALUES
      (v_question_id, 'Knowing everything about all cultures', false, 1),
      (v_question_id, 'Recognizing clients as experts in their own lives', true, 2),
      (v_question_id, 'Avoiding cultural topics completely', false, 3),
      (v_question_id, 'Treating everyone exactly the same', false, 4);

      -- Question 2
      INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index, explanation)
      VALUES (v_quiz_id, 'Black birthing people are 3-4 times more likely to die from pregnancy-related causes.', 'true_false', 1, 2,
              'True! This devastating statistic reflects the impact of systemic racism and bias in healthcare.')
      RETURNING id INTO v_question_id;
      
      INSERT INTO quiz_question_options (question_id, option_text, is_correct, order_index) VALUES
      (v_question_id, 'True', true, 1), (v_question_id, 'False', false, 2);

    -- MODULE 10: Practicum / Fieldwork
    ELSIF module_rec.order_index = 10 THEN
      -- Question 1
      INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index, explanation)
      VALUES (v_quiz_id, 'How many births must you attend for certification?', 'multiple_choice', 2, 1,
              'The certification requires attending at least 2 births to gain hands-on experience.')
      RETURNING id INTO v_question_id;
      
      INSERT INTO quiz_question_options (question_id, option_text, is_correct, order_index) VALUES
      (v_question_id, '1 birth', false, 1),
      (v_question_id, '2 births', true, 2),
      (v_question_id, '5 births', false, 3),
      (v_question_id, '10 births', false, 4);

      -- Question 2
      INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index, explanation)
      VALUES (v_quiz_id, 'Clients must know you are a student doula during fieldwork.', 'true_false', 1, 2,
              'True! Informed consent requires clients to know your training status and experience level.')
      RETURNING id INTO v_question_id;
      
      INSERT INTO quiz_question_options (question_id, option_text, is_correct, order_index) VALUES
      (v_question_id, 'True', true, 1), (v_question_id, 'False', false, 2);

    -- MODULE 11: Certification Portfolio & Final Requirements
    ELSIF module_rec.order_index = 11 THEN
      -- Question 1
      INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index, explanation)
      VALUES (v_quiz_id, 'How many hours of direct client care are required for certification?', 'multiple_choice', 2, 1,
              'You must document at least 60 hours of direct client care including births and visits.')
      RETURNING id INTO v_question_id;
      
      INSERT INTO quiz_question_options (question_id, option_text, is_correct, order_index) VALUES
      (v_question_id, '40 hours', false, 1),
      (v_question_id, '60 hours', true, 2),
      (v_question_id, '80 hours', false, 3),
      (v_question_id, '100 hours', false, 4);

      -- Question 2
      INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index, explanation)
      VALUES (v_quiz_id, 'The book reflection paper must be at least 5 pages long.', 'true_false', 1, 2,
              'True! The reflection paper must be minimum 5 pages, double-spaced, covering insights from 3 approved books.')
      RETURNING id INTO v_question_id;
      
      INSERT INTO quiz_question_options (question_id, option_text, is_correct, order_index) VALUES
      (v_question_id, 'True', true, 1), (v_question_id, 'False', false, 2);

    END IF;
  END LOOP;
END $$;

SELECT 'Quiz system tables and sample data created successfully!' as status;