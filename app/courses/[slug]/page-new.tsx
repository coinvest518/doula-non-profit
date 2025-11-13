import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Award, Star, Users, CheckCircle2, PlayCircle, FileText, Download, Globe, Infinity } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { getCourseBySlug, getCourseStats } from "@/lib/supabase/courses"

export default async function CourseDetailPage({ params }: { params: { slug: string } }) {
  const supabase = await getSupabaseServerClient()
  const course = await getCourseBySlug(supabase, params.slug)

  if (!course) {
    notFound()
  }

  // Get course statistics
  const stats = await getCourseStats(supabase, course.id)

  // Calculate total lessons and duration
  const totalLessons = course.course_modules?.reduce(
    (acc, module) => acc + (module.course_lessons?.length || 0),
    0
  ) || 0

  const totalDuration = course.course_modules?.reduce((acc, module) => {
    const moduleDuration = module.course_lessons?.reduce(
      (sum, lesson) => sum + (lesson.duration_minutes || 0),
      0
    ) || 0
    return acc + moduleDuration
  }, 0) || 0

  // Default features based on course
  const features = [
    `${course.duration_hours || 0} hours of comprehensive video training`,
    "Downloadable resources and templates",
    "Interactive quizzes and assessments",
    "Certificate of completion",
    "Lifetime access to course materials",
    "Private student community",
    "Business starter kit included",
    "Ongoing instructor support",
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b border-border bg-muted/20 px-4 py-12">
          <div className="container mx-auto">
            <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Badge className="capitalize">{course.level || "Beginner"}</Badge>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800 border-orange-200">
                    Coming Soon
                  </Badge>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="font-medium">4.9</span>
                    <span className="text-muted-foreground">
                      ({stats.students} students)
                    </span>
                  </div>
                </div>

                <h1 className="font-serif text-4xl font-medium text-balance md:text-5xl">{course.title}</h1>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  {course.long_description || course.description}
                </p>

                <div className="flex flex-wrap gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <span>{course.duration_hours} hours of content</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <span>{stats.students.toLocaleString()} students enrolled</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Infinity className="h-5 w-5 text-muted-foreground" />
                    <span>Lifetime access</span>
                  </div>
                  {course.certification_included && (
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-muted-foreground" />
                      <span>Certificate included</span>
                    </div>
                  )}
                </div>

                {course.instructor && (
                  <div className="flex items-center gap-4">
                    <img
                      src={course.instructor.avatar_url || "/logonon.png"}
                      alt={course.instructor.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium">{course.instructor.name}</p>
                      <p className="text-sm text-muted-foreground">{course.instructor.title}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Enrollment Card */}
              <Card className="h-fit lg:sticky lg:top-20">
                <div className="aspect-video overflow-hidden rounded-t-lg bg-muted">
                  <img
                    src={course.thumbnail_url || "/placeholder.svg"}
                    alt={course.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="mb-6">
                    <p className="font-serif text-3xl font-medium">${course.price}</p>
                    <p className="text-sm text-muted-foreground">Enrollment opens soon</p>
                  </div>

                  <div className="space-y-3">
                    <Button size="lg" className="w-full" disabled>
                      Coming Soon - Notify Me
                    </Button>
                    <Button size="lg" variant="outline" className="w-full bg-transparent">
                      Preview Course
                    </Button>
                  </div>

                  <div className="mt-6 space-y-3 border-t border-border pt-6">
                    <p className="text-sm font-medium">This course includes:</p>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <PlayCircle className="h-4 w-4" />
                        <span>{course.duration_hours} hours of video content</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        <span>Downloadable resources</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        <span>Business starter kit</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        <span>Access on all devices</span>
                      </div>
                      {course.certification_included && (
                        <div className="flex items-center gap-2">
                          <Award className="h-4 w-4" />
                          <span>Certificate of completion</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Infinity className="h-4 w-4" />
                        <span>Lifetime access</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Course Content */}
        <section className="px-4 py-12">
          <div className="container mx-auto">
            <div className="mx-auto max-w-4xl">
              <Tabs defaultValue="curriculum" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                  <TabsTrigger value="instructor">Instructor</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="curriculum" className="mt-8 space-y-6">
                  <div>
                    <h2 className="font-serif text-2xl font-medium">Course Curriculum</h2>
                    <p className="mt-2 text-muted-foreground">
                      {course.course_modules?.length || 0} modules • {totalLessons} lessons • {Math.round(totalDuration / 60)} hours total
                    </p>
                  </div>

                  <Accordion type="single" collapsible className="w-full">
                    {course.course_modules?.map((module, index) => (
                      <AccordionItem key={module.id} value={`module-${index}`}>
                        <AccordionTrigger className="text-left">
                          <div className="flex items-center gap-3">
                            <span className="font-medium">
                              Module {index + 1}: {module.title}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              ({module.course_lessons?.length || 0} lessons)
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 pl-4">
                            {module.course_lessons?.map((lesson, lessonIndex) => (
                              <div key={lesson.id} className="flex items-center justify-between py-2">
                                <div className="flex items-center gap-3">
                                  {lesson.video_url ? (
                                    <PlayCircle className="h-4 w-4 text-muted-foreground" />
                                  ) : (
                                    <FileText className="h-4 w-4 text-muted-foreground" />
                                  )}
                                  <span className="text-sm">{lesson.title}</span>
                                  {lesson.is_free_preview && (
                                    <Badge variant="secondary" className="text-xs">Free Preview</Badge>
                                  )}
                                </div>
                                <span className="text-sm text-muted-foreground">
                                  {lesson.duration_minutes} min
                                </span>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>

                  <Card className="bg-muted/30">
                    <CardContent className="p-6">
                      <h3 className="font-medium">What you'll learn</h3>
                      <div className="mt-4 grid gap-3 md:grid-cols-2">
                        {features.map((feature, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="instructor" className="mt-8 space-y-6">
                  <div>
                    <h2 className="font-serif text-2xl font-medium">Your Instructor</h2>
                  </div>

                  {course.instructor && (
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-6">
                          <img
                            src={course.instructor.avatar_url || "/placeholder.svg"}
                            alt={course.instructor.name}
                            className="h-24 w-24 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="font-serif text-xl font-medium">{course.instructor.name}</h3>
                            <p className="text-sm text-muted-foreground">{course.instructor.title}</p>
                            <p className="mt-4 leading-relaxed">{course.instructor.bio}</p>

                            <div className="mt-6 flex gap-6 text-sm">
                              <div>
                                <p className="font-medium">{stats.students.toLocaleString()}</p>
                                <p className="text-muted-foreground">Students</p>
                              </div>
                              <div>
                                <p className="font-medium">4.9</p>
                                <p className="text-muted-foreground">Rating</p>
                              </div>
                              <div>
                                <p className="font-medium">8</p>
                                <p className="text-muted-foreground">Courses</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="reviews" className="mt-8 space-y-6">
                  <div>
                    <h2 className="font-serif text-2xl font-medium">Student Reviews</h2>
                    <div className="mt-4 flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Star className="h-6 w-6 fill-primary text-primary" />
                        <span className="font-serif text-3xl font-medium">4.9</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p>Coming soon</p>
                        <p>{stats.students.toLocaleString()} students</p>
                      </div>
                    </div>
                  </div>

                  <div className="text-center text-muted-foreground py-12">
                    <p>Student reviews will be available once the course launches.</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-border bg-muted/20 px-4 py-12">
          <div className="container mx-auto">
            <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/10">
              <CardContent className="p-8 text-center md:p-12">
                <h2 className="font-serif text-3xl font-medium text-balance">Ready to Start Your Doula Journey?</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Join {stats.students.toLocaleString()} students already enrolled
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <Button size="lg" disabled>
                    Coming Soon - ${course.price}
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/courses">View All Courses</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
