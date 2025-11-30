# Code Flow Explanation: New Users vs Existing Users

## Quick Reference

### New User Journey
```
Landing Page → Not Authenticated
    ↓
Click "Sign Up to Enroll"
    ↓
Redirect to /signup
    ↓
Create Account (Auth)
    ↓
Redirect to /dashboard (Empty State)
    ↓
Browse Courses
    ↓
Click "Enroll Now"
    ↓
Stripe Payment
    ↓
Payment Success
    ↓
Enrollment Record Created
    ↓
Redirect to /courses/[slug]/learn
    ↓
Start Learning (0% Progress)
```

### Existing User Journey
```
Login → Authenticated
    ↓
Dashboard Shows Enrolled Courses
    ↓
Click "Continue Learning"
    ↓
Load Course with Progress
    ↓
Resume from Last Position
    ↓
Mark Lessons Complete
    ↓
Progress Updates
    ↓
100% Complete → Certificate Generated
```

---

## Component-by-Component Code Flow

### 1. EnrollmentButton Component
**File**: `components/enrollment-button.tsx`

**Purpose**: Smart button that changes based on user state

**State Machine**:
```
┌─────────────────────────────────────────────────────────┐
│ Component Mounts                                        │
│ loading = true                                          │
└────────────────────┬────────────────────────────────────┘
                     │
                     ↓
        ┌────────────────────────┐
        │ Check Auth Status      │
        │ supabase.auth.getUser()│
        └────────────┬───────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
        ↓                         ↓
   User Found              No User Found
        │                         │
        ↓                         ↓
  Check Enrollment         loading = false
  in DB                    Show: "Sign Up to Enroll"
        │
   ┌────┴────┐
   │          │
   ↓          ↓
Enrolled   Not Enrolled
   │          │
   ↓          ↓
Show:      Show:
"Continue  "Enroll Now"
Learning"
```

**Code Flow**:
```typescript
useEffect(() => {
  // 1. Check if user is authenticated
  const { user: currentUser } = await supabase.auth.getUser()
  setUser(currentUser)
  
  // 2. If user exists, check if enrolled
  if (currentUser) {
    const enrolled = await checkCourseEnrollment(
      supabase, 
      currentUser.id, 
      courseSlug
    )
    setIsEnrolled(enrolled)
  }
  
  // 3. Stop loading
  setLoading(false)
}, [courseSlug])

// Render based on state
if (loading) return <LoadingButton />
if (isEnrolled) return <ContinueLearningButton />
if (user) return <EnrollNowButton />
return <SignUpButton />
```

**Key Points**:
- Uses `isMounted` flag to prevent state updates after unmount
- Calls `checkCourseEnrollment()` utility for clean enrollment check
- Three distinct UI states for different user scenarios

---

### 2. Course Page Component
**File**: `app/courses/[slug]/page.tsx`

**Purpose**: Display course details and enrollment CTA

**Flow**:
```
Page Loads
    ↓
Fetch Course Data
    ├─ Course title, description
    ├─ Modules and lessons
    ├─ Instructor info
    └─ Reviews
    ↓
Render Course Overview
    ├─ Tabs: Overview, Instructor, Reviews
    ├─ Module/Lesson List
    └─ EnrollmentButton (smart button)
    ↓
User Interaction
    ├─ If not authenticated → Click button → Redirect to /signup
    ├─ If authenticated + not enrolled → Click button → Stripe payment
    └─ If enrolled → Click button → Redirect to /courses/[slug]/learn
```

**Code Example**:
```typescript
export default async function CoursePage({ params }) {
  const { slug } = params
  
  // Fetch course with modules and lessons
  const course = await getCourseBySlug(slug)
  
  return (
    <div>
      <CourseOverview course={course} />
      <EnrollmentButton courseSlug={slug} />
    </div>
  )
}
```

---

### 3. CourseLearningClient Component
**File**: `app/courses/[slug]/learn/course-learning-client.tsx`

**Purpose**: Main learning interface with progress tracking

**State Management**:
```
Component Mounts
    ↓
┌─────────────────────────────────────────┐
│ Determine Mode                          │
│ isPreview = !isAuthenticated            │
└────────────┬────────────────────────────┘
             │
    ┌────────┴────────┐
    │                 │
    ↓                 ↓
PREVIEW MODE      LEARNING MODE
(Free Lessons)    (Authenticated)
    │                 │
    ↓                 ↓
loading=false    Fetch User
Show Free        Fetch Progress
Lessons Only     loading=false
    │            Show All Lessons
    │            with Progress
    └────┬────────┘
         │
         ↓
    User Clicks Lesson
         │
    ┌────┴────────────────┐
    │                     │
    ↓                     ↓
PREVIEW MODE         LEARNING MODE
Can't Mark           Can Mark Complete
Complete             Updates DB
    │                Updates Progress %
    │                Checks Completion
    └────┬────────────┘
         │
         ↓
    100% Complete?
         │
    ┌────┴────┐
    │         │
    ↓         ↓
   Yes       No
    │         │
    ↓         ↓
Generate  Continue
Certificate Learning
```

**Code Flow**:
```typescript
export function CourseLearningClient({ course, isPreview = false }) {
  const [user, setUser] = useState(null)
  const [completedLessons, setCompletedLessons] = useState(new Set())
  const [loading, setLoading] = useState(!isPreview)
  
  useEffect(() => {
    if (isPreview) {
      setLoading(false)
      return
    }
    
    // Authenticated user - fetch progress
    const loadProgress = async () => {
      const { user: currentUser } = await supabase.auth.getUser()
      setUser(currentUser)
      
      if (currentUser) {
        const { data: progress } = await supabase
          .from('lesson_progress')
          .select('lesson_id')
          .eq('user_id', currentUser.id)
        
        setCompletedLessons(new Set(progress.map(p => p.lesson_id)))
      }
      
      setLoading(false)
    }
    
    loadProgress()
  }, [course.id, isPreview])
  
  const handleToggleComplete = async (lessonId) => {
    if (!user || isPreview) return
    
    // Update lesson_progress table
    await supabase.from('lesson_progress').upsert({
      user_id: user.id,
      lesson_id: lessonId,
      completed: true,
      completed_at: new Date().toISOString()
    })
    
    // Update enrollment progress
    const newProgress = calculateProgress(completedLessons)
    await updateEnrollmentProgress(user.id, course.id, newProgress)
    
    // Check if course complete
    if (newProgress === 100) {
      await generateCertificate(user.id, course.id)
    }
  }
}
```

**Key Points**:
- Preview mode loads immediately (no DB queries)
- Learning mode fetches progress from `lesson_progress` table
- Completion triggers certificate generation
- Progress percentage calculated and stored in `enrollments` table

---

### 4. Dashboard Component
**File**: `components/dashboard/dashboard-overview.tsx`

**Purpose**: Show user's enrolled courses and progress

**Flow**:
```
Component Mounts
    ↓
Check Authentication
    ├─ If not authenticated → Redirect to /login
    └─ If authenticated → Continue
    ↓
Fetch Enrollments
    ├─ Query: enrollments WHERE user_id = current_user.id
    ├─ Include: related course data
    └─ Include: progress_percentage
    ↓
┌──────────────────────────────────┐
│ Check Enrollment Count           │
└────────┬─────────────────────────┘
         │
    ┌────┴────┐
    │         │
    ↓         ↓
Empty      Has Courses
State
    │         │
    ↓         ↓
Show:     Display:
"No       ├─ Course Title
Courses"  ├─ Progress Bar
"Browse   ├─ % Complete
Courses"  ├─ Status (In Progress/Completed)
          └─ Action Button
             ├─ "Continue Learning" (if in progress)
             └─ "View Certificate" (if completed)
```

**Code Flow**:
```typescript
export function DashboardOverview() {
  const [enrollments, setEnrollments] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        
        if (!user) {
          redirect('/login')
        }
        
        const { data: enrolledCourses } = await supabase
          .from('enrollments')
          .select(`
            id,
            course_id,
            enrolled_at,
            completed_at,
            progress_percentage,
            courses (id, title, slug)
          `)
          .eq('user_id', user.id)
        
        setEnrollments(enrolledCourses || [])
      } catch (error) {
        console.error('Error fetching enrollments:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchEnrollments()
  }, [])
  
  if (loading) return <LoadingSpinner />
  
  if (enrollments.length === 0) {
    return (
      <EmptyState>
        <p>No courses yet</p>
        <Link href="/courses">Browse Courses</Link>
      </EmptyState>
    )
  }
  
  return (
    <div>
      {enrollments.map(enrollment => (
        <CourseCard
          key={enrollment.id}
          course={enrollment.courses}
          progress={enrollment.progress_percentage}
          isCompleted={!!enrollment.completed_at}
        />
      ))}
    </div>
  )
}
```

**Key Points**:
- Fetches enrollments with related course data
- Shows empty state for new users
- Displays progress percentage from `enrollments` table
- Links to continue learning or view certificate

---

### 5. User Enrollment Utility
**File**: `lib/supabase/user-enrollment.ts`

**Purpose**: Centralized enrollment tracking functions

**Key Functions**:

#### checkCourseEnrollment()
```typescript
async function checkCourseEnrollment(
  supabase,
  userId,
  courseSlug
): Promise<boolean> {
  // 1. Get course ID from slug
  const { data: course } = await supabase
    .from('courses')
    .select('id')
    .eq('slug', courseSlug)
    .single()
  
  // 2. Check if enrollment exists
  const { data: enrollment } = await supabase
    .from('enrollments')
    .select('id')
    .eq('user_id', userId)
    .eq('course_id', course.id)
    .single()
  
  // 3. Return boolean
  return !!enrollment
}
```

#### getUserEnrolledCourses()
```typescript
async function getUserEnrolledCourses(
  supabase,
  userId
): Promise<EnrolledCourse[]> {
  // 1. Query enrollments with course data
  const { data: enrollments } = await supabase
    .from('enrollments')
    .select(`
      id,
      course_id,
      enrolled_at,
      completed_at,
      progress_percentage,
      courses (id, title, slug)
    `)
    .eq('user_id', userId)
  
  // 2. Map to EnrolledCourse interface
  return enrollments.map(e => ({
    id: e.id,
    courseId: e.course_id,
    courseTitle: e.courses.title,
    courseSlug: e.courses.slug,
    progressPercentage: e.progress_percentage,
    isCompleted: !!e.completed_at
  }))
}
```

#### createEnrollment()
```typescript
async function createEnrollment(
  supabase,
  userId,
  courseId
): Promise<{ success: boolean; enrollmentId?: string }> {
  // 1. Insert enrollment record
  const { data: enrollment, error } = await supabase
    .from('enrollments')
    .insert({
      user_id: userId,
      course_id: courseId,
      enrolled_at: new Date().toISOString(),
      progress_percentage: 0
    })
    .select()
    .single()
  
  // 2. Return result
  return {
    success: !error,
    enrollmentId: enrollment?.id
  }
}
```

---

## Database Query Patterns

### Pattern 1: Check if User is Enrolled
```sql
SELECT * FROM enrollments
WHERE user_id = $1 AND course_id = $2
LIMIT 1
```

### Pattern 2: Get User's Enrolled Courses
```sql
SELECT 
  e.id,
  e.course_id,
  e.enrolled_at,
  e.completed_at,
  e.progress_percentage,
  c.title,
  c.slug
FROM enrollments e
JOIN courses c ON e.course_id = c.id
WHERE e.user_id = $1
ORDER BY e.enrolled_at DESC
```

### Pattern 3: Get User's Lesson Progress
```sql
SELECT lesson_id, completed_at
FROM lesson_progress
WHERE user_id = $1 AND course_id = $2
```

### Pattern 4: Update Enrollment Progress
```sql
UPDATE enrollments
SET progress_percentage = $1, updated_at = NOW()
WHERE user_id = $2 AND course_id = $3
```

### Pattern 5: Mark Course Complete
```sql
UPDATE enrollments
SET completed_at = NOW(), progress_percentage = 100
WHERE user_id = $1 AND course_id = $2
```

---

## State Transitions Summary

| Component | State | Trigger | Next State |
|-----------|-------|---------|-----------|
| EnrollmentButton | Loading | Component mount | Check auth |
| EnrollmentButton | Not Auth | No user found | Show "Sign Up" |
| EnrollmentButton | Auth + Not Enrolled | User found, no enrollment | Show "Enroll Now" |
| EnrollmentButton | Auth + Enrolled | User found, enrollment exists | Show "Continue Learning" |
| CourseLearningClient | Preview | isPreview=true | Show free lessons |
| CourseLearningClient | Learning | User authenticated | Fetch progress |
| CourseLearningClient | In Progress | Lessons completed <100% | Show progress bar |
| CourseLearningClient | Completed | All lessons done | Generate certificate |
| Dashboard | Empty | No enrollments | Show empty state |
| Dashboard | Populated | Has enrollments | Show course cards |

---

## Error Handling

### Scenario 1: Payment Success but Enrollment Failed
```
Payment Webhook Received
  ↓
Try to create enrollment
  ↓
Database error occurs
  ↓
Log error
  ↓
Manual reconciliation needed
  ↓
Admin creates enrollment manually
```

### Scenario 2: User Session Expires
```
User in learning mode
  ↓
Session expires
  ↓
Try to mark lesson complete
  ↓
Auth error returned
  ↓
Redirect to login
  ↓
User logs back in
  ↓
Progress preserved (already saved)
```

### Scenario 3: Duplicate Enrollment Attempt
```
User clicks "Enroll Now" twice
  ↓
First payment processes
  ↓
Enrollment created
  ↓
Second payment processes
  ↓
Check for existing enrollment
  ↓
Enrollment already exists
  ↓
Skip duplicate creation
  ↓
Refund second payment
```

---

## Performance Considerations

### Optimization 1: Enrollment Check
- Use indexed query on `(user_id, course_id)`
- Cache result in component state
- Revalidate on course change

### Optimization 2: Progress Fetching
- Fetch all lesson progress in single query
- Use Set for O(1) lookup
- Batch updates when possible

### Optimization 3: Dashboard Loading
- Fetch enrollments with course data in single query
- Use `select()` to limit fields
- Implement pagination for many courses

### Optimization 4: Certificate Generation
- Check for existing certificate before creating
- Use unique constraint to prevent duplicates
- Generate certificate number server-side

