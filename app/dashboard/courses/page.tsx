import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { MyCourses } from "@/components/dashboard/my-courses"

export default function MyCoursesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardNav />
      <main className="flex-1 bg-muted/20">
        <MyCourses />
      </main>
    </div>
  )
}
