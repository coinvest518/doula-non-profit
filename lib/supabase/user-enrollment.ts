import type { Database } from "@/lib/types/supabase"
import type { SupabaseClient as BaseSupabaseClient } from "@supabase/supabase-js"

type SupabaseClient = BaseSupabaseClient<Database>

/**
 * User enrollment state
 */
export interface UserEnrollmentState {
  isAuthenticated: boolean
  userId?: string
  userEmail?: string
  enrolledCourses: EnrolledCourse[]
  isLoading: boolean
  error?: string
}

export interface EnrolledCourse {
  id: string
  courseId: string
  courseTitle: string
  courseSlug: string
  enrolledAt: string
  completedAt?: string
  progressPercentage: number
  isCompleted: boolean
}

/**
 * Check if user is enrolled in a specific course
 */
export async function checkCourseEnrollment(
  supabase: SupabaseClient,
  userId: string,
  courseSlug: string
): Promise<boolean> {
  try {
    const { data: course } = await supabase
      .from("courses")
      .select("id")
      .eq("slug", courseSlug)
      .single()

    if (!course) return false

    const { data: enrollment } = await supabase
      .from("enrollments")
      .select("id")
      .eq("user_id", userId)
      .eq("course_id", course.id)
      .single()

    return !!enrollment
  } catch (error) {
    console.error("Error checking enrollment:", error)
    return false
  }
}

/**
 * Get all enrolled courses for a user
 */
export async function getUserEnrolledCourses(
  supabase: SupabaseClient,
  userId: string
): Promise<EnrolledCourse[]> {
  try {
    const { data: enrollments, error } = await supabase
      .from("enrollments")
      .select(
        `
        id,
        course_id,
        enrolled_at,
        completed_at,
        progress_percentage,
        courses (
          id,
          title,
          slug
        )
      `
      )
      .eq("user_id", userId)
      .order("enrolled_at", { ascending: false })

    if (error) throw error

    return (enrollments || []).map((enrollment: any) => ({
      id: enrollment.id,
      courseId: enrollment.course_id,
      courseTitle: enrollment.courses?.title || "Unknown Course",
      courseSlug: enrollment.courses?.slug || "",
      enrolledAt: enrollment.enrolled_at,
      completedAt: enrollment.completed_at,
      progressPercentage: enrollment.progress_percentage || 0,
      isCompleted: !!enrollment.completed_at,
    }))
  } catch (error) {
    console.error("Error fetching enrolled courses:", error)
    return []
  }
}

/**
 * Create enrollment record after successful payment
 */
export async function createEnrollment(
  supabase: SupabaseClient,
  userId: string,
  courseId: string
): Promise<{ success: boolean; enrollmentId?: string; error?: string }> {
  try {
    const { data: enrollment, error } = await supabase
      .from("enrollments")
      .insert({
        user_id: userId,
        course_id: courseId,
        enrolled_at: new Date().toISOString(),
        progress_percentage: 0,
      })
      .select()
      .single()

    if (error) throw error

    return {
      success: true,
      enrollmentId: enrollment?.id,
    }
  } catch (error) {
    console.error("Error creating enrollment:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create enrollment",
    }
  }
}

/**
 * Update enrollment progress
 */
export async function updateEnrollmentProgress(
  supabase: SupabaseClient,
  userId: string,
  courseId: string,
  progressPercentage: number
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from("enrollments")
      .update({
        progress_percentage: progressPercentage,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userId)
      .eq("course_id", courseId)

    if (error) throw error

    return { success: true }
  } catch (error) {
    console.error("Error updating enrollment progress:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update progress",
    }
  }
}

/**
 * Mark course as completed
 */
export async function markCourseCompleted(
  supabase: SupabaseClient,
  userId: string,
  courseId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from("enrollments")
      .update({
        completed_at: new Date().toISOString(),
        progress_percentage: 100,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userId)
      .eq("course_id", courseId)

    if (error) throw error

    return { success: true }
  } catch (error) {
    console.error("Error marking course completed:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to mark course completed",
    }
  }
}

/**
 * Get enrollment details
 */
export async function getEnrollmentDetails(
  supabase: SupabaseClient,
  userId: string,
  courseId: string
): Promise<{
  enrollment?: any
  error?: string
}> {
  try {
    const { data: enrollment, error } = await supabase
      .from("enrollments")
      .select("*")
      .eq("user_id", userId)
      .eq("course_id", courseId)
      .single()

    if (error && error.code !== "PGRST116") throw error

    return { enrollment }
  } catch (error) {
    console.error("Error fetching enrollment details:", error)
    return {
      error: error instanceof Error ? error.message : "Failed to fetch enrollment",
    }
  }
}

/**
 * Check if user has certificate for course
 */
export async function getUserCertificate(
  supabase: SupabaseClient,
  userId: string,
  courseId: string
): Promise<{ certificate?: any; error?: string }> {
  try {
    const { data: certificate, error } = await supabase
      .from("certifications")
      .select("*")
      .eq("user_id", userId)
      .eq("course_id", courseId)
      .single()

    if (error && error.code !== "PGRST116") throw error

    return { certificate }
  } catch (error) {
    console.error("Error fetching certificate:", error)
    return {
      error: error instanceof Error ? error.message : "Failed to fetch certificate",
    }
  }
}
