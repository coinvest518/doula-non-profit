import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { AIChat } from "@/components/dashboard/ai-chat"
import Link from "next/link"
import { BookOpen, Award, Clock, TrendingUp, PlayCircle, CheckCircle2 } from "lucide-react"

// Mock data - would come from database
const enrolledCourses = [
  {
    id: "1",
    title: "Complete Doula Certification Program",
    progress: 65,
    totalLessons: 25,
    completedLessons: 16,
    nextLesson: "Labor Support Techniques",
    thumbnail: "/doula-certification-training-classroom.jpg",
  },
  {
    id: "2",
    title: "Lactation Support Fundamentals",
    progress: 30,
    totalLessons: 12,
    completedLessons: 4,
    nextLesson: "Common Breastfeeding Challenges",
    thumbnail: "/lactation-support-training.jpg",
  },
]

const recentActivity = [
  { type: "completed", title: "Completed: Stages of Labor", time: "2 hours ago" },
  { type: "started", title: "Started: Postpartum Support module", time: "1 day ago" },
  { type: "certificate", title: "Earned certificate: Birth Plan Development", time: "3 days ago" },
]

export function DashboardOverview() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-medium">Welcome back, Jane</h1>
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
              <p className="text-2xl font-semibold">2</p>
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
              <p className="text-2xl font-semibold">1</p>
              <p className="text-sm text-muted-foreground">Certificates Earned</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-semibold">24</p>
              <p className="text-sm text-muted-foreground">Hours Completed</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-semibold">48%</p>
              <p className="text-sm text-muted-foreground">Overall Progress</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
        <div className="space-y-8">
          {/* AI Chat Assistant */}
          <div>
            <h2 className="mb-4 font-serif text-2xl font-medium">AI Assistant</h2>
            <AIChat />
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_400px]">
        <div className="space-y-8">
          {/* Continue Learning */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-serif text-2xl font-medium">Continue Learning</h2>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/courses">View All</Link>
              </Button>
            </div>

            <div className="space-y-4">
              {enrolledCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="aspect-video w-full bg-muted md:w-48">
                      <img
                        src={course.thumbnail || "/placeholder.svg"}
                        alt={course.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <CardContent className="flex-1 p-6">
                      <div className="flex flex-col justify-between h-full">
                        <div>
                          <h3 className="font-serif text-lg font-medium text-balance">{course.title}</h3>
                          <p className="mt-2 text-sm text-muted-foreground">Next: {course.nextLesson}</p>
                        </div>

                        <div className="mt-4 space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                              {course.completedLessons} of {course.totalLessons} lessons
                            </span>
                            <span className="font-medium">{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                          <Button className="w-full md:w-auto" asChild>
                            <Link href={`/learn/${course.id}`}>
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
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                      activity.type === "completed"
                        ? "bg-primary/10"
                        : activity.type === "certificate"
                          ? "bg-secondary/20"
                          : "bg-muted"
                    }`}
                  >
                    {activity.type === "completed" ? (
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    ) : activity.type === "certificate" ? (
                      <Award className="h-4 w-4 text-secondary" />
                    ) : (
                      <PlayCircle className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                <Link href="/courses">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Browse More Courses
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                <Link href="/dashboard/certifications">
                  <Award className="mr-2 h-4 w-4" />
                  View Certificates
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                <Link href="/products">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Browse Resources
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Upgrade CTA */}
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/10">
            <CardContent className="p-6">
              <Badge className="mb-3">New Course</Badge>
              <h3 className="font-serif text-lg font-medium">Advanced Postpartum Training</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Expand your expertise with specialized postpartum care training
              </p>
              <Button className="mt-4 w-full" asChild>
                <Link href="/courses/advanced-postpartum-doula">Learn More</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
