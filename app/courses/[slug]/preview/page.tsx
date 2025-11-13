
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { getCourseBySlug } from "@/lib/supabase/courses";
import { notFound } from "next/navigation";
import { CourseLearningClient } from "../learn/course-learning-client";
import { Navigation } from "@/components/navigation";

interface CoursePreviewPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function CoursePreviewPage({ params }: CoursePreviewPageProps) {
    const { slug } = await params;
    const supabase = await getSupabaseServerClient();

    const course = await getCourseBySlug(supabase, slug);

    if (!course) {
        notFound();
    }

    // For preview, we can show a limited version.
    // Here, we'll just pass the course data to a client component
    // that is aware it's in "preview" mode.
    // We are reusing the CourseLearningClient but a dedicated preview client could be made.
    return (
        <div className="flex min-h-screen flex-col">
            <Navigation />
            <CourseLearningClient course={course} isPreview={true} />
        </div>
    );
}
