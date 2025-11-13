
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { getCourseBySlug } from "@/lib/supabase/courses";
import { notFound } from "next/navigation";
import { CourseLearningClient } from "./course-learning-client";
import { Navigation } from "@/components/navigation";

interface CourseLearnPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function CourseLearnPage({ params }: CourseLearnPageProps) {
    const { slug } = await params;
    const supabase = await getSupabaseServerClient();

    const course = await getCourseBySlug(supabase, slug);

    if (!course) {
        notFound();
    }

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        // Or redirect to login
        notFound();
    }

    const { data: enrollment } = await supabase
        .from("enrollments")
        .select("id")
        .eq("user_id", user.id)
        .eq("course_id", course.id)
        .single();

    if (!enrollment) {
        // User is not enrolled, so they can't access this page
        console.log(`User ${user.id} is not enrolled in course ${course.id}`);
        notFound();
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navigation />
            <CourseLearningClient course={course} />
        </div>
    );
}
