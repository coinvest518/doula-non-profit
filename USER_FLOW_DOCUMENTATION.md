# User Flow Documentation: New Users vs Existing Users

## Overview
This document explains the complete flow for new users and existing users, including enrollment, payment, course access, and progress tracking.

---

## NEW USER FLOW

### 1. Discovery Phase
- **Entry Point**: User lands on course page (`/courses/[slug]`)
- **State**: Not authenticated, no enrollment
- **UI Display**:
  - Course overview with modules/lessons visible
  - "Sign Up to Enroll" button (EnrollmentButton shows signup CTA)
  - Preview mode enabled for free lessons only
  - Enrollment button shows: "Sign Up to Enroll"

### 2. Authentication Phase
- **Action**: User clicks "Sign Up to Enroll"
- **Flow**: Redirected to `/signup`
- **Result**: User creates account with email/password
- **Database**: New record created in `auth.users` table

### 3. Post-Signup Phase
- **Redirect**: After signup, user redirected to dashboard
- **State**: Authenticated but NOT enrolled in any courses
- **Dashboard Display**:
  - Empty state: "No courses yet"
  - CTA: "Browse Courses" link
  - No enrollments in `enrollments` table

### 4. Course Selection & Enrollment Phase
- **Action**: User navigates back to course page or clicks "Browse Courses"
- **State**: Now authenticated
- **UI Change**: EnrollmentButton now shows "Enroll Now - $497"
- **Payment Flow**:
  1. User clicks "Enroll Now"
  2. Stripe payment link opens (with `client_reference_id` = user.id)
  3. User completes payment
  4. Stripe webhook triggers (or manual confirmation)
  5. Enrollment record created in `enrollments` table:
     ```
     {
       user_id: <user_id>,
       course_id: <course_id>,
       enrolled_at: now(),
       progress_percentage: 0,
       completed_at: null
     }
     ```

### 5. First Access Phase
- **Action**: User clicks "Continue Learning" (after enrollment)
- **Route**: `/courses/[slug]/learn`
- **Loading State**: Shows loading spinner while fetching progress
- **Initial State**:
  - No lesson progress yet (empty `lesson_progress` table)
  - Progress bar shows 0%
  - All lessons unlocked and available
  - First lesson auto-selected

### 6. Learning Phase
- **Actions Available**:
  - Watch videos
  - Read study materials
  - Mark lessons complete
  - Take quizzes
- **Tracking**:
  - Each lesson completion creates/updates `lesson_progress` record
  - `enrollments.progress_percentage` updates after each lesson
  - Completion tracked in `lesson_progress` table

### 7. Completion Phase
- **Trigger**: User completes all lessons (100% progress)
- **Actions**:
  1. `enrollments.completed_at` set to current timestamp
  2. Certificate generated and inserted into `certifications` table
  3. User notified of completion
- **Certificate Data**:
  ```
  {
    user_id: <user_id>,
    course_id: <course_id>,
    certificate_number: CERT-<timestamp>-<random>,
    issued_at: now()
  }
  ```

---

## EXISTING USER FLOW

### 1. Return Visit - Dashboard
- **Entry Point**: User logs in, navigates to `/dashboard`
- **State**: Authenticated
- **Dashboard Display**:
  - Shows all enrolled courses
  - Displays progress percentage for each course
  - Shows completion status (completed/in-progress)
  - Links to continue learning or view certificate

### 2. Resume Course
- **Action**: User clicks "Continue Learning" on enrolled course
- **Route**: `/courses/[slug]/learn`
- **Loading State**: Fetches user progress from database
- **Initial State**:
  - Progress bar shows current progress (e.g., 45%)
  - Completed lessons marked with checkmark
  - Last viewed lesson highlighted
  - Incomplete lessons available to continue

### 3. Continue Learning Phase
- **Actions**:
  - Resume from where they left off
  - Mark additional lessons complete
  - Progress updates in real-time
  - Progress percentage recalculated
- **Tracking**:
  - New `lesson_progress` records created for uncompleted lessons
  - `enrollments.progress_percentage` updated
  - `enrollments.updated_at` timestamp updated

### 4. Course Completion
- **Trigger**: User completes remaining lessons
- **Actions**:
  1. `enrollments.completed_at` set
  2. Certificate generated (if not already exists)
  3. User can view/download certificate
- **Certificate Access**: `/certificates` page shows all earned certificates

### 5. Multiple Courses
- **Scenario**: User enrolls in additional courses
- **Flow**: Same as new user enrollment flow (steps 4-7)
- **Dashboard**: Shows all courses with individual progress tracking
- **Certificates**: All certificates displayed on `/certificates` page

---

## DATABASE SCHEMA RELATIONSHIPS

### Key Tables

#### `auth.users` (Supabase Auth)
```
id: UUID (primary key)
email: string
created_at: timestamp
```

#### `enrollments`
```
id: UUID (primary key)
user_id: UUID (foreign key → auth.users)
course_id: UUID (foreign key → courses)
enrolled_at: timestamp
completed_at: timestamp (null until course complete)
progress_percentage: integer (0-100)
updated_at: timestamp
```

#### `lesson_progress`
```
id: UUID (primary key)
user_id: UUID (foreign key → auth.users)
lesson_id: UUID (foreign key → course_lessons)
completed: boolean
completed_at: timestamp
```

#### `certifications`
```
id: UUID (primary key)
user_id: UUID (foreign key → auth.users)
course_id: UUID (foreign key → courses)
certificate_number: string (unique)
issued_at: timestamp
```

---

## STATE MANAGEMENT & COMPONENT LOGIC

### EnrollmentButton Component
**Purpose**: Handles enrollment CTA with user state detection

**States**:
1. **Loading**: Checking auth status and enrollment
2. **Not Authenticated**: Shows "Sign Up to Enroll"
3. **Authenticated + Not Enrolled**: Shows "Enroll Now - $497"
4. **Authenticated + Enrolled**: Shows "Continue Learning"

**Code Flow**:
```
useEffect → Check auth status
  ├─ If no user → Show signup CTA
  ├─ If user exists → Check enrollments table
  │  ├─ If enrolled → Show "Continue Learning"
  │  └─ If not enrolled → Show "Enroll Now"
```

### CourseLearningClient Component
**Purpose**: Displays course content with progress tracking

**States**:
1. **Preview Mode** (unauthenticated):
   - Shows free lessons only
   - Loading state = false (immediate display)
   - Enrollment CTA visible
   - No progress tracking

2. **Learning Mode** (authenticated + enrolled):
   - Shows all lessons
   - Fetches progress from `lesson_progress` table
   - Allows marking lessons complete
   - Updates `enrollments.progress_percentage`
   - Checks for course completion

**Data Flow**:
```
Component Mount
  ├─ If preview mode → Set loading = false
  └─ If authenticated:
     ├─ Fetch user from auth
     ├─ Fetch lesson_progress for user
     ├─ Set completed lessons
     └─ Set loading = false
```

### Dashboard Component
**Purpose**: Shows user's enrolled courses and progress

**Data Fetching**:
```
useEffect → Fetch enrollments
  ├─ Query: enrollments WHERE user_id = current_user.id
  ├─ Include: related course data
  ├─ Display: course title, progress %, completion status
  └─ Links: "Continue Learning" or "View Certificate"
```

---

## PAYMENT & ENROLLMENT FLOW

### Payment Processing
1. **Initiation**: User clicks "Enroll Now"
2. **Stripe Link**: Opens with `client_reference_id` = user.id
3. **Payment**: User completes Stripe checkout
4. **Webhook**: Stripe sends payment confirmation
5. **Enrollment**: Backend creates enrollment record

### Enrollment Record Creation
**Trigger**: Payment success webhook or manual confirmation
**Action**: Insert into `enrollments` table
**Initial Values**:
- `user_id`: From payment `client_reference_id`
- `course_id`: From course context
- `enrolled_at`: Current timestamp
- `progress_percentage`: 0
- `completed_at`: null

---

## ERROR HANDLING & EDGE CASES

### New User Scenarios
1. **Signup Incomplete**: User closes browser during signup
   - Result: Auth record created but no profile
   - Fix: Prompt to complete profile on next login

2. **Payment Failed**: User's payment declined
   - Result: No enrollment record created
   - Fix: Show error, allow retry

3. **Payment Success but Enrollment Failed**: Race condition
   - Result: User paid but not enrolled
   - Fix: Webhook retry logic, manual reconciliation

### Existing User Scenarios
1. **Session Expired**: User's auth token expires
   - Result: Redirect to login
   - Fix: Auto-refresh token or re-authenticate

2. **Progress Not Saving**: Database error during lesson completion
   - Result: Lesson marked complete in UI but not in DB
   - Fix: Retry logic with user notification

3. **Duplicate Enrollment**: User tries to enroll twice
   - Result: Check for existing enrollment before creating new
   - Fix: Show "Already enrolled" message

---

## PROGRESS TRACKING LOGIC

### Lesson Completion
```
User clicks "Mark as Complete"
  ├─ Create/update lesson_progress record
  ├─ Calculate new progress percentage:
  │  └─ (completed_lessons / total_lessons) * 100
  ├─ Update enrollments.progress_percentage
  └─ Check if course complete (100%):
     ├─ If yes → Set enrollments.completed_at
     └─ If yes → Generate certificate
```

### Progress Calculation
```
Total Lessons = Sum of all lessons in all modules
Completed Lessons = Count of lesson_progress records where completed = true
Progress % = (Completed Lessons / Total Lessons) * 100
```

### Certificate Generation
```
Trigger: Course completion (100% progress)
Check: Does certification already exist?
  ├─ If yes → Skip (prevent duplicates)
  └─ If no → Create new certification record
Generate: certificate_number = CERT-<timestamp>-<random>
Store: Insert into certifications table
```

---

## SUMMARY TABLE

| Aspect | New User | Existing User |
|--------|----------|---------------|
| **Auth Status** | Not authenticated | Authenticated |
| **Enrollment** | None | One or more |
| **First Visit** | Course page → Signup → Dashboard | Dashboard or course page |
| **Progress** | 0% | Varies (0-100%) |
| **Lessons** | Free preview only | All unlocked |
| **Payment** | Required | Already paid |
| **Certificate** | Generated on completion | May already have |
| **Dashboard** | Empty state | Shows enrolled courses |
| **Loading State** | Immediate (preview) | Fetches progress |

