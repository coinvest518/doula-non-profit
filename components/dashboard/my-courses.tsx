import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { PlayCircle, Clock, Award } from "lucide-react"

const activeCourses = [
  {
    id: "1",
    title: "Complete Doula Certification Program",
    progress: 65,
    totalLessons: 25,
    completedLessons: 16,
    totalHours: 40,
    thumbnail: "/doula-certification-training-classroom.jpg",
    level: "Beginner",
  },
  {
    id: "2",
    title: "Lactation Support Fundamentals",
    progress: 30,
    totalLessons: 12,
    completedLessons: 4,
    totalHours: 15,
    thumbnail: "/lactation-support-training.jpg",
    level: "Beginner",
  },
]

const completedCourses = [
  {
    id: "3",
    title: "Birth Plan Development Workshop",
    completedDate: "March 15, 2024",
    certificateId: "CERT-2024-001",
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
]

export function MyCourses() {
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
                        {course.completedLessons} of {course.totalLessons} lessons
                      </span>
                      <span className="font-medium">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />

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
