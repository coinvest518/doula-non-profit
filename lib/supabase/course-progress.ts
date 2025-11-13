import type { Database } from "@/lib/types/supabase"
import type { SupabaseClient as BaseSupabaseClient } from "@supabase/supabase-js"

type SupabaseClient = BaseSupabaseClient<Database>

/**
 * Get user's progress for a specific course
 */
export async function getCourseProgress(
  supabase: SupabaseClient,
  userId: string,
  courseId: string
) {
  // Get all lessons for the course
  const { data: lessons } = await supabase
    .from("course_lessons")
    .select("id, course_module_id")
    .eq("course_module_id", courseId)

  if (!lessons || lessons.length === 0) {
    return { completedCount: 0, totalCount: 0, percentage: 0, isCompleted: false }
  }

  const lessonIds = lessons.map((l: any) => l.id)

  // Get completed lessons for this user
  const { data: progress } = await supabase
    .from("lesson_progress")
    .select("lesson_id, is_completed")
    .eq("user_id", userId)
    .in("lesson_id", lessonIds)
    .eq("is_completed", true)

  const completedCount = progress?.length || 0
  const totalCount = lessons.length
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0
  const isCompleted = completedCount === totalCount && totalCount > 0

  return {
    completedCount,
    totalCount,
    percentage,
    isCompleted,
  }
}

/**
 * Mark a lesson as completed for a user
 */
export async function markLessonComplete(
  supabase: SupabaseClient,
  userId: string,
  lessonId: string
) {
  const { data, error } = await supabase
    .from("lesson_progress")
    .upsert(
      {
        user_id: userId,
        lesson_id: lessonId,
        is_completed: true,
        completed_at: new Date().toISOString(),
      },
      {
        onConflict: "user_id,lesson_id",
      }
    )
    .select()
    .single()

  if (error) {
    console.error("Error marking lesson complete:", error)
    throw error
  }

  return data
}

/**
 * Check if user has a certificate for a course
 */
export async function getUserCertificate(
  supabase: SupabaseClient,
  userId: string,
  courseId: string
) {
  const { data: certificate, error } = await supabase
    .from("certifications")
    .select("*")
    .eq("user_id", userId)
    .eq("course_id", courseId)
    .single()

  if (error && error.code !== "PGRST116") {
    // PGRST116 is "not found" error, which is expected
    console.error("Error fetching certificate:", error)
    throw error
  }

  return certificate
}

/**
 * Generate a unique certificate number
 */
export function generateCertificateNumber(): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `FPDA-${timestamp}-${random}`
}
