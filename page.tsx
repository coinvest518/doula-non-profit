import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CourseFilters } from "@/components/course-filters"
import { CourseGrid } from "@/components/course-grid"
import { Suspense } from "react"

export default function CoursesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Header */}
        <section className="border-b border-border bg-muted/20 px-4 py-16">
          <div className="container mx-auto">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="font-serif text-4xl font-medium text-balance md:text-5xl">
                Professional Certification Courses
              </h1>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed text-pretty">
                Comprehensive training programs designed to prepare you for a rewarding career in birth work. All
                courses include certification upon completion.
              </p>
            </div>
          </div>
        </section>

        {/* Courses Section */}
        <section className="px-4 py-12">
          <div className="container mx-auto">
            <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
              <aside>
                <Suspense fallback={<div>Loading filters...</div>}>
                  <CourseFilters />
                </Suspense>
              </aside>

              <div>
                <Suspense fallback={<div>Loading courses...</div>}>
                  <CourseGrid />
                </Suspense>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
