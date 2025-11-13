import type { SupabaseClient } from "@supabase/supabase-js"
import type { Course, CourseModule, CourseLesson } from "@/lib/types/database"

// Extended types for joined data
export interface CourseWithModules extends Course {
  instructor?: {
    id: string
    name: string
    title: string | null
    bio: string | null
    avatar_url: string | null
  } | null
  course_modules?: CourseModuleWithLessons[]
}

export interface CourseModuleWithLessons extends CourseModule {
  course_lessons?: CourseLesson[]
}

/**
 * Fetch all published courses
 */
export async function getCourses(supabase: SupabaseClient) {
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching courses:", error)
    return []
  }

  return data as Course[]
}

/**
 * Fetch a single course by slug with all modules and lessons
 */
export async function getCourseBySlug(
  supabase: SupabaseClient,
  slug: string
): Promise<CourseWithModules | null> {
  const { data: course, error: courseError } = await supabase
    .from("courses")
    .select(
      `
      *,
      instructor:instructors(id, name, title, bio, avatar_url),
      course_modules:course_modules(
        *,
        course_lessons:course_lessons(*)
      )
    `
    )
    .eq("slug", slug)
    .single()

  if (courseError || !course) {
    console.error("Error fetching course:", courseError)
    return null
  }

  // Sort modules and lessons
  const sortedModules = (course.course_modules || []).sort(
    (a: CourseModule, b: CourseModule) => a.order_index - b.order_index
  )

  const modulesWithSortedLessons = sortedModules.map((module: any) => ({
    ...module,
    course_lessons: (module.course_lessons || []).sort(
      (a: CourseLesson, b: CourseLesson) => a.order_index - b.order_index
    ),
  }))

  return {
    ...course,
    course_modules: modulesWithSortedLessons,
  } as CourseWithModules
}

/**
 * Fetch course statistics
 */
export async function getCourseStats(
  supabase: SupabaseClient,
  courseId: string
) {
  const { count: studentsCount } = await supabase
    .from("enrollments")
    .select("*", { count: "exact", head: true })
    .eq("course_id", courseId)

  const { count: completedCount } = await supabase
    .from("enrollments")
    .select("*", { count: "exact", head: true })
    .eq("course_id", courseId)
    .not("completed_at", "is", null)

  return {
    students: studentsCount || 0,
    completed: completedCount || 0,
  }
}

/**
 * Create a new course
 */
export async function createCourse(
  supabase: SupabaseClient,
  courseData: any
) {
  const { data, error } = await supabase
    .from("courses")
    .insert(courseData)
    .select()
    .single()

  if (error) {
    console.error("Error creating course:", error)
    throw error
  }

  return data
}

/**
 * Update a course
 */
export async function updateCourse(
  supabase: SupabaseClient,
  courseId: string,
  updates: any
) {
  const { data, error } = await supabase
    .from("courses")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", courseId)
    .select()
    .single()

  if (error) {
    console.error("Error updating course:", error)
    throw error
  }

  return data
}

/**
 * Delete a course
 */
export async function deleteCourse(
  supabase: SupabaseClient,
  courseId: string
) {
  const { error } = await supabase.from("courses").delete().eq("id", courseId)

  if (error) {
    console.error("Error deleting course:", error)
    throw error
  }
}

/**
 * Create a new module
 */
export async function createModule(
  supabase: SupabaseClient,
  moduleData: any
) {
  const { data, error } = await supabase
    .from("course_modules")
    .insert(moduleData)
    .select()
    .single()

  if (error) {
    console.error("Error creating module:", error)
    throw error
  }

  return data
}

/**
 * Update a module
 */
export async function updateModule(
  supabase: SupabaseClient,
  moduleId: string,
  updates: any
) {
  const { data, error } = await supabase
    .from("course_modules")
    .update(updates)
    .eq("id", moduleId)
    .select()
    .single()

  if (error) {
    console.error("Error updating module:", error)
    throw error
  }

  return data
}

/**
 * Delete a module
 */
export async function deleteModule(
  supabase: SupabaseClient,
  moduleId: string
) {
  const { error } = await supabase.from("course_modules").delete().eq("id", moduleId)

  if (error) {
    console.error("Error deleting module:", error)
    throw error
  }
}

/**
 * Create a new lesson
 */
export async function createLesson(
  supabase: SupabaseClient,
  lessonData: any
) {
  const { data, error } = await supabase
    .from("course_lessons")
    .insert(lessonData)
    .select()
    .single()

  if (error) {
    console.error("Error creating lesson:", error)
    throw error
  }

  return data
}

/**
 * Update a lesson
 */
export async function updateLesson(
  supabase: SupabaseClient,
  lessonId: string,
  updates: any
) {
  const { data, error } = await supabase
    .from("course_lessons")
    .update(updates)
    .eq("id", lessonId)
    .select()
    .single()

  if (error) {
    console.error("Error updating lesson:", error)
    throw error
  }

  return data
}

/**
 * Delete a lesson
 */
export async function deleteLesson(
  supabase: SupabaseClient,
  lessonId: string
) {
  const { error } = await supabase.from("course_lessons").delete().eq("id", lessonId)

  if (error) {
    console.error("Error deleting lesson:", error)
    throw error
  }
}
