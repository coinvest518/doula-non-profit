-- Insert sample courses
INSERT INTO courses (title, slug, description, long_description, price, duration_hours, level, is_published, certification_included) VALUES
('Complete Doula Certification Program', 'complete-doula-certification', 'Comprehensive training to become a certified birth doula', 'This comprehensive program covers everything you need to know to become a professional birth doula. Learn about prenatal care, labor support techniques, postpartum care, and how to build your doula practice. Includes certification upon completion.', 497.00, 40, 'beginner', true, true),
('Advanced Postpartum Doula Training', 'advanced-postpartum-doula', 'Specialized training for postpartum support and newborn care', 'Deepen your expertise in postpartum care with this advanced training. Cover topics including lactation support, newborn care, maternal mental health, and family dynamics. Perfect for experienced doulas looking to specialize.', 397.00, 30, 'advanced', true, true),
('Childbirth Education Instructor Course', 'childbirth-education-instructor', 'Learn to teach comprehensive childbirth education classes', 'Become a certified childbirth educator and help families prepare for birth. This course covers curriculum development, teaching methodologies, and evidence-based birth education practices.', 447.00, 35, 'intermediate', true, true),
('Lactation Support Fundamentals', 'lactation-support-fundamentals', 'Essential breastfeeding support skills for doulas', 'Learn the fundamentals of lactation support to better serve your clients. Understand common breastfeeding challenges, positioning techniques, and when to refer to an IBCLC.', 197.00, 15, 'beginner', true, false);

-- Insert sample digital products
INSERT INTO digital_products (title, slug, description, price, category, is_published) VALUES
('Birth Plan Template Bundle', 'birth-plan-template-bundle', 'Comprehensive birth plan templates for various birth settings', 29.99, 'templates', true),
('Postpartum Care Guide for New Parents', 'postpartum-care-guide', 'Complete guide covering the first 6 weeks postpartum', 19.99, 'guides', true),
('Doula Business Starter Kit', 'doula-business-starter-kit', 'Everything you need to launch your doula practice', 49.99, 'business', true),
('Labor Comfort Measures Poster Set', 'labor-comfort-measures-posters', 'Visual guides for labor support techniques', 24.99, 'resources', true),
('Client Intake Forms Package', 'client-intake-forms-package', 'Professional intake and assessment forms', 34.99, 'templates', true);
