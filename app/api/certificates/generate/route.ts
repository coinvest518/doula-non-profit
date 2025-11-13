import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { getCourseProgress, generateCertificateNumber } from "@/lib/supabase/course-progress"

export async function POST(request: Request) {
  try {
    const supabase = await getSupabaseServerClient()
    const { courseId } = await request.json()

    // Check if user is authenticated
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if course exists
    const { data: course, error: courseError } = await supabase
      .from("courses")
      .select("id, title, duration_hours")
      .eq("id", courseId)
      .single()

    if (courseError || !course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    // Check if user completed the course
    const progress = await getCourseProgress(supabase, user.id, courseId)

    if (!progress.isCompleted) {
      return NextResponse.json(
        { error: "Course not completed", progress },
        { status: 400 }
      )
    }

    // Check if certificate already exists
    const { data: existingCertificate } = await supabase
      .from("certifications")
      .select("id")
      .eq("user_id", user.id)
      .eq("course_id", courseId)
      .single()

    if (existingCertificate) {
      return NextResponse.json(
        { certificateId: existingCertificate.id, message: "Certificate already exists" },
        { status: 200 }
      )
    }

    // Generate certificate
    const certificateNumber = generateCertificateNumber()
    const issueDate = new Date()
    const expiryDate = new Date(issueDate)
    expiryDate.setFullYear(expiryDate.getFullYear() + 3) // Valid for 3 years

    const { data: certificate, error: certError } = await supabase
      .from("certifications")
      .insert({
        user_id: user.id,
        course_id: courseId,
        certificate_number: certificateNumber,
        issued_at: issueDate.toISOString(),
        expires_at: expiryDate.toISOString(),
      })
      .select()
      .single()

    if (certError) {
      console.error("Error creating certificate:", certError)
      return NextResponse.json(
        { error: "Failed to generate certificate" },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { certificateId: certificate.id, certificateNumber, message: "Certificate generated successfully" },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error in certificate generation:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
