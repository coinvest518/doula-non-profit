# Quick Reference Guide: User Flows & Code

## 🆕 NEW USER FLOW (Step-by-Step)

### Step 1: Discovery
```
User lands on /courses/[slug]
├─ Not authenticated
├─ Sees course overview
├─ Sees "Sign Up to Enroll" button
└─ Can view free preview lessons
```

### Step 2: Authentication
```
User clicks "Sign Up to Enroll"
├─ Redirected to /signup
├─ Creates account (email + password)
├─ Auth record created in Supabase
└─ Redirected to /dashboard
```

### Step 3: Dashboard (Empty State)
```
User sees dashboard
├─ No courses enrolled
├─ Shows "No courses yet" message
├─ CTA: "Browse Courses" link
└─ No data in enrollments table
```

### Step 4: Course Selection
```
User clicks "Browse Courses"
├─ Navigates to /courses
├─ Sees all available courses
├─ Clicks on course of interest
└─ Redirected to /courses/[slug]
```

### Step 5: Enrollment
```
User clicks "Enroll Now - $497"
├─ EnrollmentButton detects: authenticated + not enrolled
├─ Opens Stripe payment link
├─ Stripe link includes: client_reference_id = user.id
├─ User completes payment
└─ Stripe webhook triggered
```

### Step 6: Post-Payment
```
Payment webhook received
├─ Enrollment record created:
│  ├─ user_id: <user_id>
│  ├─ course_id: <course_id>
│  ├─ enrolled_at: now()
│  ├─ progress_percentage: 0
│  └─ completed_at: null
├─ User redirected to /courses/[slug]/learn
└─ Loading spinner shows while fetching progress
```

### Step 7: First Learning Session
```
Course learning page loads
├─ Fetches user from auth
├─ Fetches lesson_progress (empty for new user)
├─ Sets loading = false
├─ Shows all lessons unlocked
├─ First lesson auto-selected
└─ Progress bar shows 0%
```

### Step 8: Learning & Completion
```
User completes lessons
├─ Clicks "Mark as Complete"
├─ lesson_progress record created
├─ enrollments.progress_percentage updated
├─ Repeat for each lesson
└─ When 100% complete:
   ├─ enrollments.completed_at = now()
   ├─ Certificate generated
   └─ User notified
```

---

## 👤 EXISTING USER FLOW (Step-by-Step)

### Step 1: Login
```
User navigates to /login
├─ Enters email + password
├─ Auth verified
├─ Redirected to /dashboard
└─ Session created
```

### Step 2: Dashboard (Populated)
```
Dashboard loads
├─ Fetches enrollments WHERE user_id = current_user.id
├─ Shows all enrolled courses
├─ Displays progress for each:
│  ├─ Course title
│  ├─ Progress bar (e.g., 45%)
│  ├─ Status (In Progress / Completed)
│  └─ Action button
└─ Empty courses show "Browse Courses" CTA
```

### Step 3: Resume Course
```
User clicks "Continue Learning"
├─ Navigated to /courses/[slug]/learn
├─ Fetches user from auth
├─ Fetches lesson_progress for user
├─ Sets completed lessons from DB
├─ Loading = false
└─ Shows progress bar with current %
```

### Step 4: Continue Learning
```
User resumes course
├─ Completed lessons marked with ✓
├─ Incomplete lessons available
├─ Can mark additional lessons complete
├─ Progress updates in real-time
└─ Each completion:
   ├─ Updates lesson_progress
   ├─ Recalculates progress %
   └─ Updates enrollments table
```

### Step 5: Course Completion
```
User completes all lessons
├─ Progress reaches 100%
├─ enrollments.completed_at = now()
├─ Check for existing certificate
├─ If not exists:
│  ├─ Generate certificate_number
│  └─ Insert into certifications table
└─ User can view certificate
```

### Step 6: Multiple Courses
```
User enrolls in another course
├─ Follows same flow as new user (steps 4-8)
├─ Dashboard shows all courses
├─ Each with independent progress
└─ Certificates page shows all earned certs
```

---

## 📊 DATABASE STATE TRACKING

### New User State
```
enrollments table:
  ├─ EMPTY (no records)

lesson_progress table:
  ├─ EMPTY (no records)

certifications table:
  ├─ EMPTY (no records)

auth.users table:
  └─ ✓ Record exists
```

### User After Enrollment
```
enrollments table:
  ├─ user_id: <id>
  ├─ course_id: <id>
  ├─ enrolled_at: 2024-01-15T10:00:00Z
  ├─ completed_at: null
  ├─ progress_percentage: 0
  └─ updated_at: 2024-01-15T10:00:00Z

lesson_progress table:
  ├─ EMPTY (no records yet)

certifications table:
  └─ EMPTY (no records)
```

### User After Completing Lessons
```
enrollments table:
  ├─ user_id: <id>
  ├─ course_id: <id>
  ├─ enrolled_at: 2024-01-15T10:00:00Z
  ├─ completed_at: null
  ├─ progress_percentage: 45
  └─ updated_at: 2024-01-15T14:30:00Z

lesson_progress table:
  ├─ Record 1: lesson_id: <id>, completed: true
  ├─ Record 2: lesson_id: <id>, completed: true
  ├─ Record 3: lesson_id: <id>, completed: true
  └─ ... (more records)

certifications table:
  └─ EMPTY (not 100% yet)
```

### User After Course Completion
```
enrollments table:
  ├─ user_id: <id>
  ├─ course_id: <id>
  ├─ enrolled_at: 2024-01-15T10:00:00Z
  ├─ completed_at: 2024-01-20T16:45:00Z
  ├─ progress_percentage: 100
  └─ updated_at: 2024-01-20T16:45:00Z

lesson_progress table:
  ├─ Record 1: lesson_id: <id>, completed: true
  ├─ Record 2: lesson_id: <id>, completed: true
  ├─ ... (all lessons)
  └─ Record N: lesson_id: <id>, completed: true

certifications table:
  ├─ user_id: <id>
  ├─ course_id: <id>
  ├─ certificate_number: CERT-1705779900000-ABC123XYZ
  └─ issued_at: 2024-01-20T16:45:00Z
```

---

## 🔄 KEY COMPONENT STATES

### EnrollmentButton States
```
┌─────────────────────────────────────────────────────────┐
│ LOADING STATE                                           │
│ Shows: Spinner + "Loading..."                           │
│ Trigger: Component mount                                │
│ Duration: Until auth check completes                    │
└─────────────────────────────────────────────────────────┘
                         ↓
        ┌────────────────┴────────────────┐
        │                                 │
        ↓                                 ↓
┌──────────────────────┐    ┌──────────────────────┐
│ NOT AUTHENTICATED    │    │ AUTHENTICATED        │
│ Shows: "Sign Up to   │    │ Check enrollment     │
│ Enroll"              │    │ in database          │
│ Action: Redirect to  │    └──────────┬───────────┘
│ /signup              │               │
└──────────────────────┘        ┌──────┴──────┐
                                │             │
                                ↓             ↓
                        ┌──────────────┐  ┌──────────────┐
                        │ ENROLLED     │  │ NOT ENROLLED │
                        │ Shows:       │  │ Shows:       │
                        │ "Continue    │  │ "Enroll Now" │
                        │ Learning"    │  │ Action:      │
                        │ Action:      │  │ Open Stripe  │
                        │ Go to learn  │  │ payment link │
                        └──────────────┘  └──────────────┘
```

### CourseLearningClient States
```
┌─────────────────────────────────────────────────────────┐
│ COMPONENT MOUNT                                         │
│ Check: isPreview parameter                              │
└────────────────┬────────────────────────────────────────┘
                 │
        ┌────────┴────────┐
        │                 │
        ↓                 ↓
┌──────────────┐  ┌──────────────────────┐
│ PREVIEW MODE │  │ LEARNING MODE        │
│ loading=false│  │ loading=true         │
│ Show:        │  │ Fetch user from auth │
│ ├─ Free      │  │ Fetch lesson_progress│
│ │  lessons   │  │ loading=false        │
│ ├─ Enroll    │  │ Show:                │
│ │  CTA       │  │ ├─ All lessons       │
│ └─ Lock icon │  │ ├─ Progress bar      │
│              │  │ ├─ Completed marks   │
│              │  │ └─ Mark complete btn │
└──────────────┘  └──────────────────────┘
```

### Dashboard States
```
┌─────────────────────────────────────────────────────────┐
│ DASHBOARD LOAD                                          │
│ Check: User authenticated?                              │
└────────────────┬────────────────────────────────────────┘
                 │
        ┌────────┴────────┐
        │                 │
        ↓                 ↓
┌──────────────┐  ┌──────────────────────┐
│ NOT AUTH     │  │ AUTHENTICATED        │
│ Redirect to  │  │ Fetch enrollments    │
│ /login       │  │ loading=true         │
└──────────────┘  └──────────┬───────────┘
                             │
                    ┌────────┴────────┐
                    │                 │
                    ↓                 ↓
            ┌──────────────┐  ┌──────────────────┐
            │ EMPTY STATE  │  │ POPULATED STATE  │
            │ Show:        │  │ Show:            │
            │ ├─ "No       │  │ ├─ Course cards  │
            │ │  courses"  │  │ ├─ Progress bars │
            │ ├─ "Browse   │  │ ├─ Status badges │
            │ │  Courses"  │  │ └─ Action buttons│
            │ │  link      │  │                  │
            │ └─ Empty     │  │ Each card shows: │
            │    icon      │  │ ├─ Title         │
            │              │  │ ├─ Progress %    │
            │              │  │ ├─ Status        │
            │              │  │ └─ Button        │
            └──────────────┘  └──────────────────┘
```

---

## 🎯 KEY FUNCTIONS & THEIR PURPOSE

| Function | File | Purpose | Input | Output |
|----------|------|---------|-------|--------|
| `checkCourseEnrollment()` | user-enrollment.ts | Check if user enrolled | userId, courseSlug | boolean |
| `getUserEnrolledCourses()` | user-enrollment.ts | Get all user's courses | userId | EnrolledCourse[] |
| `createEnrollment()` | user-enrollment.ts | Create enrollment after payment | userId, courseId | {success, enrollmentId} |
| `updateEnrollmentProgress()` | user-enrollment.ts | Update progress % | userId, courseId, % | {success} |
| `markCourseCompleted()` | user-enrollment.ts | Mark course 100% done | userId, courseId | {success} |
| `getCourseProgress()` | course-progress.ts | Calculate course progress | userId, courseId | {%, completed, total} |
| `markLessonComplete()` | course-progress.ts | Mark lesson done | userId, lessonId | progress record |
| `createEnrollmentLink()` | stripe-links.ts | Generate payment link | user object | URL string |

---

## 🚨 COMMON ISSUES & SOLUTIONS

### Issue 1: New User Sees "Loading..." Forever
**Cause**: `supabase` in dependency array causes infinite loop
**Solution**: Remove `supabase` from deps, use cleanup function
```typescript
useEffect(() => {
  let isMounted = true
  // ... async code
  return () => { isMounted = false }
}, [courseSlug]) // NOT supabase
```

### Issue 2: Progress Not Updating
**Cause**: Missing `updated_at` timestamp in update
**Solution**: Always include timestamp
```typescript
await supabase.from('enrollments').update({
  progress_percentage: newProgress,
  updated_at: new Date().toISOString() // ← Add this
})
```

### Issue 3: Duplicate Certificates
**Cause**: No check for existing certificate
**Solution**: Query first, then insert
```typescript
const { data: existing } = await supabase
  .from('certifications')
  .select('id')
  .eq('user_id', userId)
  .eq('course_id', courseId)
  .single()

if (!existing) {
  // Create certificate
}
```

### Issue 4: Dashboard Shows Empty for Enrolled User
**Cause**: Wrong user_id in query
**Solution**: Verify auth user matches query
```typescript
const { data: { user } } = await supabase.auth.getUser()
// Use user.id, not hardcoded value
```

---

## 📋 CHECKLIST: NEW USER FLOW

- [ ] User not authenticated
- [ ] User clicks "Sign Up to Enroll"
- [ ] Redirected to /signup
- [ ] Account created in auth.users
- [ ] Redirected to /dashboard
- [ ] Dashboard shows empty state
- [ ] User clicks "Browse Courses"
- [ ] User selects course
- [ ] User clicks "Enroll Now"
- [ ] Stripe payment link opens
- [ ] User completes payment
- [ ] Enrollment record created
- [ ] User redirected to /courses/[slug]/learn
- [ ] Progress bar shows 0%
- [ ] User can mark lessons complete
- [ ] Progress updates in real-time
- [ ] At 100%, certificate generated
- [ ] User can view certificate

---

## 📋 CHECKLIST: EXISTING USER FLOW

- [ ] User authenticated
- [ ] User navigates to /dashboard
- [ ] Dashboard shows enrolled courses
- [ ] Progress displayed for each course
- [ ] User clicks "Continue Learning"
- [ ] Course page loads with progress
- [ ] Completed lessons marked with ✓
- [ ] User can mark more lessons complete
- [ ] Progress updates in real-time
- [ ] At 100%, certificate generated
- [ ] User can view certificate
- [ ] User can enroll in another course
- [ ] Dashboard shows all courses

