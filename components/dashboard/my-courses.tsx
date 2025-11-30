
import { useEffect, useState } from "react"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { PlayCircle, Clock, Award } from "lucide-react"

export function MyCourses() {
  const [activeCourses, setActiveCourses] = useState<any[]>([])
  const [completedCourses, setCompletedCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true)
      const supabase = getSupabaseBrowserClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setLoading(false)
        return
      }
      // Fetch enrollments with course info
      const { data: enrollments } = await supabase
        .from("enrollments")
        .select("*, course:courses(*)")
        .eq("user_id", user.id)
      const active = []
      const completed = []
      for (const enrollment of enrollments || []) {
        if (enrollment.completed_at) {
          completed.push({
            ...enrollment.course,
            completedDate: enrollment.completed_at,
          })
        } else {
          active.push({
            ...enrollment.course,
            progress: enrollment.progress_percentage,
            totalHours: enrollment.course?.duration_hours,
            thumbnail: enrollment.course?.thumbnail_url,
            level: enrollment.course?.level,
          })
        }
      }
      setActiveCourses(active)
      setCompletedCourses(completed)
      setLoading(false)
    }
    fetchCourses()
  }, [])

  if (loading) {
    return <div>Loading courses...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-medium">My Courses</h1>
        <p className="mt-2 text-muted-foreground">Track your learning progress and access course materials</p>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList>
          <TabsTrigger value="active">Active Courses ({activeCourses.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedCourses.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            {activeCourses.length === 0 && <div>No active courses yet.</div>}
            {activeCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <div className="aspect-video bg-muted">
                  <img
                    src={course.thumbnail || "/placeholder.svg"}
                    alt={course.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <Badge className="mb-3">{course.level}</Badge>
                  <h3 className="font-serif text-xl font-medium text-balance">{course.title}</h3>

                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Progress: {course.progress || 0}%
                      </span>
                    </div>
                    <Progress value={course.progress || 0} className="h-2" />
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{course.totalHours} hours</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Award className="h-4 w-4" />
                        <span>Certificate</span>
                      </div>
                    </div>

                    <Button className="w-full" asChild>
                      <Link href={`/learn/${course.id}`}>
                        <PlayCircle className="mr-2 h-4 w-4" />
                        Continue Learning
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            {completedCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <div className="aspect-video bg-muted">
                  <img
                    src={course.thumbnail || "/placeholder.svg"}
                    alt={course.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="mb-3 flex items-center gap-2">
                    <Badge variant="secondary">Completed</Badge>
                    <span className="text-sm text-muted-foreground">{course.completedDate}</span>
                  </div>
                  <h3 className="font-serif text-xl font-medium text-balance">{course.title}</h3>

                  <div className="mt-4 space-y-2">
                    <p className="text-sm text-muted-foreground">Certificate ID: {course.certificateId}</p>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1 bg-transparent" asChild>
                        <Link href={`/learn/${course.id}`}>Review Course</Link>
                      </Button>
                      <Button className="flex-1" asChild>
                        <Link href={`/dashboard/certifications`}>
                          <Award className="mr-2 h-4 w-4" />
                          View Certificate
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
