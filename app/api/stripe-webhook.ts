import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { type, data } = body

    if (type !== "checkout.session.completed") {
      return NextResponse.json({ received: true })
    }

    const session = data.object
    const userId = session.client_reference_id
    const courseSlug = session.metadata?.course_slug

    if (!userId || !courseSlug) {
      console.log("Missing userId or courseSlug:", { userId, courseSlug })
      return NextResponse.json(
        { error: "Missing userId or courseSlug" },
        { status: 400 }
      )
    }

    const supabase = await getSupabaseServerClient()

    const { data: course, error: courseError } = await supabase
      .from("courses")
      .select("id")
      .eq("slug", courseSlug)
      .single()

    if (courseError || !course) {
      console.log("Course not found:", courseSlug)
      return NextResponse.json(
        { error: "Course not found" },
        { status: 404 }
      )
    }

    const { data: existingEnrollment } = await supabase
      .from("enrollments")
      .select("id")
      .eq("user_id", userId)
      .eq("course_id", course.id)
      .single()

    if (existingEnrollment) {
      console.log("Already enrolled:", { userId, courseId: course.id })
      return NextResponse.json({ message: "Already enrolled" })
    }

    const { data: newEnrollment, error: enrollmentError } = await supabase
      .from("enrollments")
      .insert({
        user_id: userId,
        course_id: course.id,
        enrolled_at: new Date().toISOString(),
        progress_percentage: 0,
      })
      .select()
      .single()

    if (enrollmentError) {
      console.error("Enrollment error:", enrollmentError)
      return NextResponse.json(
        { error: "Failed to create enrollment" },
        { status: 500 }
      )
    }

    console.log("Enrollment created:", newEnrollment)
    return NextResponse.json({ success: true, enrollmentId: newEnrollment.id })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
