-- Just add the module_id column to quiz_attempts table (temporary fix)
-- Run this if you want to bypass the foreign key constraint for now

ALTER TABLE quiz_attempts ADD COLUMN IF NOT EXISTS module_id UUID;