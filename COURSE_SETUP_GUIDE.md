# Course Management Setup Guide

This guide explains how to set up and manage the Complete Doula Certification course with its 11 modules, lessons, videos, and text content.

## 📋 What's Been Completed

### 1. Database Structure
- ✅ Course tables with support for modules and lessons
- ✅ Instructor table for course instructors
- ✅ Fields for video URLs and rich text content in lessons
- ✅ Support for free preview lessons

### 2. SQL Scripts Created
Located in `scripts/` directory:

#### `03-complete-doula-course-data.sql`
Complete SQL script with:
- Full course data for "Complete Doula Certification Program"
- All 11 modules with proper sequencing
- 40+ lessons with full text content
- Duration and ordering for each lesson
- Placeholder video URL fields (ready for YouTube/Vimeo links)

#### `04-add-instructor-table.sql`
- Creates instructors table
- Adds Ashley Strong as the lead instructor
- Links instructor to the course

### 3. Data Fetching Utilities
`lib/supabase/courses.ts` - Complete CRUD operations:
- `getCourses()` - Fetch all courses
- `getCourseBySlug()` - Get course with all modules and lessons
- `getCourseStats()` - Get enrollment statistics
- `createCourse()`, `updateCourse()`, `deleteCourse()`
- `createModule()`, `updateModule()`, `deleteModule()`
- `createLesson()`, `updateLesson()`, `deleteLesson()`

### 4. Updated Frontend
- ✅ Course detail page (`app/courses/[slug]/page.tsx`) now fetches from database
- ✅ Displays all modules and lessons dynamically
- ✅ Shows instructor information (Ashley Strong)
- ✅ Free preview badges on applicable lessons

## 🚀 Getting Started

### Step 1: Run the SQL Scripts

Connect to your Supabase database and run the scripts in order:

```bash
# First, ensure tables exist
# Run: scripts/01-create-tables.sql

# Then add instructor support
psql -h your-db-host -U postgres -d your-database -f scripts/04-add-instructor-table.sql

# Finally, load the complete course data
psql -h your-db-host -U postgres -d your-database -f scripts/03-complete-doula-course-data.sql
```

Or use the Supabase SQL Editor:
1. Go to Supabase Dashboard → SQL Editor
2. Paste and run `04-add-instructor-table.sql`
3. Then paste and run `03-complete-doula-course-data.sql`

### Step 2: Verify the Data

After running the scripts, verify:

```sql
-- Check course exists
SELECT * FROM courses WHERE slug = 'complete-doula-certification';

-- Check modules
SELECT title, order_index FROM course_modules 
WHERE course_id = (SELECT id FROM courses WHERE slug = 'complete-doula-certification')
ORDER BY order_index;

-- Check lessons
SELECT cm.title as module, cl.title as lesson, cl.duration_minutes
FROM course_lessons cl
JOIN course_modules cm ON cl.module_id = cm.id
WHERE cm.course_id = (SELECT id FROM courses WHERE slug = 'complete-doula-certification')
ORDER BY cm.order_index, cl.order_index;
```

### Step 3: Access the Course

1. **Public View**: Visit `http://localhost:3000/courses/complete-doula-certification`

## 📝 Managing Course Content

### Direct Database Updates

For bulk changes, you can use SQL directly:

#### Update a Lesson's Content:
```sql
UPDATE course_lessons 
SET content = 'Your new lesson content here',
    video_url = 'https://youtube.com/watch?v=VIDEO_ID'
WHERE title = 'Lesson Title';
```

#### Add a New Lesson:
```sql
INSERT INTO course_lessons (module_id, title, content, video_url, duration_minutes, order_index)
VALUES (
  (SELECT id FROM course_modules WHERE title = 'Module Name'),
  'New Lesson Title',
  'Lesson content goes here...',
  'https://youtube.com/watch?v=VIDEO_ID',
  25,
  5  -- order within the module
);
```

#### Update Instructor Bio:
```sql
UPDATE instructors 
SET bio = 'Updated bio text here',
    avatar_url = '/path-to-new-image.jpg'
WHERE name = 'Ashley Strong';
```

## 🎥 Adding Videos

### Video Hosting Options:

1. **YouTube** (Recommended for free hosting)
   - Upload video to YouTube
   - Get video ID from URL: `https://youtube.com/watch?v=VIDEO_ID`
   - Store in database: `https://youtube.com/watch?v=VIDEO_ID`

2. **Vimeo** (Professional option)
   - Upload to Vimeo
   - Get video ID: `https://vimeo.com/VIDEO_ID`
   - Store: `https://vimeo.com/VIDEO_ID`

3. **Self-hosted** (Full control)
   - Upload to Supabase Storage or AWS S3
   - Get public URL
   - Store the full URL

### Update Video URLs:
```sql
-- Example: Add YouTube video to Module 1, Lesson 1
UPDATE course_lessons 
SET video_url = 'https://youtube.com/watch?v=dQw4w9WgXcQ'
WHERE title = 'Welcome, Future Doula!';
```

## 📚 Course Structure

The Complete Doula Certification course includes:

### Module 1: Foundations of Doula Care
- Welcome, Future Doula!
- The History and Cultural Legacy of Doula Work
- The Doula's Role vs. Clinical Providers
- Types of Support Doulas Provide
- Module 1 Quiz

### Module 2: Anatomy, Physiology, and the Birth Process
- Understanding Pregnancy and Childbirth Physiology
- Recognizing Medical Interventions
- Comfort Measures and Birth Support
- Module 2 Quiz

### Module 3: Communication, Advocacy, and Emotional Support
- Trauma-Informed Communication
- Effective Advocacy in Birth Settings
- Supporting Partner and Family Dynamics
- Module 3 Quiz

### Module 4: Standards of Care and Ethics
- Doula Ethics and Professional Conduct
- HIPAA and Confidentiality
- Documentation, Contracts, and Informed Consent
- Module 4 Quiz

### Module 5: CPR and First Aid Certification
- Why CPR and First Aid Matter for Doulas
- What You'll Learn in Certification
- Where to Enroll
- CPR Certification Assignment

### Module 6: Domestic Violence and Trauma-Informed Care
- Identifying and Responding to Domestic Violence
- Mandatory Reporting Laws
- Connecting Clients to Resources
- DV Awareness Certification Assignment

### Module 7: Lactation and Newborn Care
- Supporting Breastfeeding and Bonding
- Teaching Newborn Care
- Safe Sleep Practices
- Module 7 Quiz

### Module 8: Business of Doula Work & Medicaid Billing
- Business and Marketing Strategies
- Medicaid Billing and Reimbursement
- Preparing for Medicaid in Georgia
- Alternative Payment Models
- Module 8 Quiz

### Module 9: Cultural Competency & Health Equity
- Providing Culturally Responsive Care
- Addressing Racial Disparities and Implicit Bias
- Practicing Cultural Humility
- Module 9 Quiz

### Module 10: Practicum / Fieldwork
- What Fieldwork Looks Like
- Documentation Requirements
- How to Obtain Clientele
- Ethical Considerations During Fieldwork

### Module 11: Certification Portfolio & Final Requirements
- Hands-On Client Experience (60 Hours)
- Doula Book Study & Reflection Paper
- Final Submission Checklist

## 🔧 Future Enhancements

### Planned Features:
1. **Rich Text Editor** - WYSIWYG editor for lesson content
2. **Video Player Component** - Embedded YouTube/Vimeo player
3. **Drag-and-Drop Reordering** - For modules and lessons
4. **Bulk Import/Export** - CSV or JSON for course content
5. **Version History** - Track changes to course content
6. **Preview Mode** - See changes before publishing

### To Add Interactive Editing:
1. Create form components for courses, modules, and lessons
2. Use the existing CRUD functions in `lib/supabase/courses.ts`
3. Add real-time validation and auto-save
4. Implement rich text editor (e.g., Tiptap, Quill, or Lexical)

## 📊 Database Schema Reference

### Key Tables:
- `courses` - Course metadata
- `instructors` - Instructor profiles
- `course_modules` - Course sections/modules
- `course_lessons` - Individual lessons with content and videos
- `enrollments` - Student enrollments
- `lesson_progress` - Track student progress

### Important Fields:
- `course_lessons.content` - TEXT field for lesson content (supports Markdown/HTML)
- `course_lessons.video_url` - URL to video resource
- `course_lessons.is_free_preview` - Boolean for preview access
- `course_lessons.duration_minutes` - Lesson duration

## 🆘 Troubleshooting

### Course not showing up?
```sql
-- Check if course is published
UPDATE courses SET is_published = true 
WHERE slug = 'complete-doula-certification';
```

### Modules in wrong order?
```sql
-- Reorder modules
UPDATE course_modules SET order_index = 1 WHERE title = 'Module 1 Title';
UPDATE course_modules SET order_index = 2 WHERE title = 'Module 2 Title';
```

### Need to reset all data?
```sql
-- WARNING: This deletes all course data
DELETE FROM course_lessons WHERE module_id IN (
  SELECT id FROM course_modules WHERE course_id = (
    SELECT id FROM courses WHERE slug = 'complete-doula-certification'
  )
);
DELETE FROM course_modules WHERE course_id = (
  SELECT id FROM courses WHERE slug = 'complete-doula-certification'
);
-- Then re-run the SQL scripts
```

## 📞 Support

For questions or issues:
1. Check Supabase logs for database errors
2. Check browser console for frontend errors
3. Verify environment variables are set correctly
4. Ensure Row Level Security (RLS) policies allow access

---

**Next Steps:**
1. Run the SQL scripts to load data
2. Add video URLs to lessons
3. Review and customize lesson content
4. Test the course on the live site
