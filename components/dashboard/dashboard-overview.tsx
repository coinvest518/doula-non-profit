
"use client";

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { AIChat } from "@/components/dashboard/ai-chat"
import Link from "next/link"
import { BookOpen, Award, Clock, TrendingUp, PlayCircle, CheckCircle2 } from "lucide-react"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"

export function DashboardOverview() {
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([])
  const [certifications, setCertifications] = useState<any[]>([])
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const supabase = getSupabaseBrowserClient()
      const { data: { user: currentUser } } = await supabase.auth.getUser()
      setUser(currentUser)
      if (!currentUser) {
        setLoading(false)
        return
      }
      // Fetch enrollments with course info
      const { data: enrollments } = await supabase
        .from("enrollments")
        .select("*, course:courses(*)")
        .eq("user_id", currentUser.id)
      setEnrolledCourses(
        (enrollments || []).map((enrollment: any) => ({
          ...enrollment.course,
          progress: enrollment.progress_percentage || 0, // Use database progress
        }))
      )
      // Fetch certifications
      const { data: certs } = await supabase
        .from("certifications")
        .select("*")
        .eq("user_id", currentUser.id);
      setCertifications(certs || []);
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-medium">Welcome{user?.user_metadata?.full_name ? `, ${user.user_metadata.full_name}` : ""}</h1>
        <p className="mt-2 text-muted-foreground">Continue your learning journey</p>
      </div>
      {/* Stats Grid */}
      <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-semibold">{enrolledCourses.length}</p>
              <p className="text-sm text-muted-foreground">Active Courses</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Award className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-semibold">{certifications.length}</p>
              <p className="text-sm text-muted-foreground">Certificates Earned</p>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Continue Learning */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_400px]">
        <div className="space-y-8">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-serif text-2xl font-medium">Continue Learning</h2>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/courses">View All</Link>
              </Button>
            </div>
            <div className="space-y-4">
              {enrolledCourses.length === 0 && <div>No active courses yet.</div>}
              {enrolledCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="aspect-video w-full bg-muted md:w-48">
                      <img
                        src={course.thumbnail_url || "/placeholder.svg"}
                        alt={course.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <CardContent className="flex-1 p-6">
                      <div className="flex flex-col justify-between h-full">
                        <div>
                          <h3 className="font-serif text-lg font-medium text-balance">{course.title}</h3>
                        </div>
                        <div className="mt-4 space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                              Progress: {course.progress || 0}%
                            </span>
                          </div>
                          <Progress value={course.progress || 0} className="h-2" />
                          <Button className="w-full md:w-auto" asChild>
                            <Link href={`/courses/${course.slug}/learn`}>
                              <PlayCircle className="mr-2 h-4 w-4" />
                              Continue Learning
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
        {/* Sidebar */}
        <div className="space-y-6">
          <div>
            <h2 className="mb-4 font-serif text-2xl font-medium">AI Assistant</h2>
            <AIChat />
          </div>
        </div>
      </div>
    </div>
  );
}
