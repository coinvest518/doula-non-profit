import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Award, Star, Users, CheckCircle2, PlayCircle, FileText, Download, Globe, Infinity } from "lucide-react"
import Link from "next/link"

// This would normally come from a database
const courseData = {
  title: "Complete Doula Certification Program",
  slug: "complete-doula-certification",
  description: "Comprehensive training to become a certified birth doula",
  longDescription:
    "This comprehensive program covers everything you need to know to become a professional birth doula. Learn about prenatal care, labor support techniques, postpartum care, and how to build your doula practice. Our evidence-based curriculum is designed by experienced doulas and includes hands-on practice, case studies, and real-world scenarios.",
  price: 497,
  duration: 40,
  level: "Beginner",
  rating: 4.9,
  students: 1250,
  reviews: 342,
  image: "/doula-certification-training-classroom.jpg",
  instructor: {
    name: "Dr. Sarah Mitchell",
    title: "Lead Doula Instructor",
    bio: "With over 15 years of experience as a birth doula and educator, Dr. Mitchell has supported over 500 families through pregnancy, birth, and postpartum.",
    image: "/instructor-sarah-mitchell.jpg",
  },
  modules: [
    {
      title: "Introduction to Doula Work",
      lessons: [
        { title: "What is a Doula?", duration: 15, type: "video" },
        { title: "History and Philosophy of Doula Care", duration: 20, type: "video" },
        { title: "Scope of Practice", duration: 25, type: "video" },
        { title: "Module 1 Quiz", duration: 10, type: "quiz" },
      ],
    },
    {
      title: "Pregnancy and Prenatal Care",
      lessons: [
        { title: "Stages of Pregnancy", duration: 30, type: "video" },
        { title: "Prenatal Visits and Support", duration: 25, type: "video" },
        { title: "Common Pregnancy Concerns", duration: 20, type: "video" },
        { title: "Birth Plan Development", duration: 30, type: "video" },
        { title: "Module 2 Quiz", duration: 15, type: "quiz" },
      ],
    },
    {
      title: "Labor and Birth Support",
      lessons: [
        { title: "Stages of Labor", duration: 35, type: "video" },
        { title: "Comfort Measures and Positioning", duration: 40, type: "video" },
        { title: "Supporting Different Birth Settings", duration: 30, type: "video" },
        { title: "Working with Medical Staff", duration: 25, type: "video" },
        { title: "Module 3 Quiz", duration: 15, type: "quiz" },
      ],
    },
    {
      title: "Postpartum Support",
      lessons: [
        { title: "Immediate Postpartum Care", duration: 25, type: "video" },
        { title: "Breastfeeding Basics", duration: 30, type: "video" },
        { title: "Newborn Care Essentials", duration: 25, type: "video" },
        { title: "Postpartum Mental Health", duration: 30, type: "video" },
        { title: "Module 4 Quiz", duration: 15, type: "quiz" },
      ],
    },
    {
      title: "Building Your Doula Practice",
      lessons: [
        { title: "Business Basics", duration: 30, type: "video" },
        { title: "Marketing Your Services", duration: 25, type: "video" },
        { title: "Client Communication", duration: 20, type: "video" },
        { title: "Continuing Education", duration: 15, type: "video" },
        { title: "Final Assessment", duration: 30, type: "quiz" },
      ],
    },
  ],
  features: [
    "40 hours of comprehensive video training",
    "Downloadable resources and templates",
    "Interactive quizzes and assessments",
    "Certificate of completion",
    "Lifetime access to course materials",
    "Private student community",
    "Business starter kit included",
    "Ongoing instructor support",
  ],
  requirements: [
    "No prior experience required",
    "Passion for supporting families",
    "Commitment to complete coursework",
  ],
}

export default function CourseDetailPage() {
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
                  <Badge>{courseData.level}</Badge>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800 border-orange-200">
                    Coming Soon
                  </Badge>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="font-medium">{courseData.rating}</span>
                    <span className="text-muted-foreground">
                      ({courseData.reviews} reviews, {courseData.students} students)
                    </span>
                  </div>
                </div>

                <h1 className="font-serif text-4xl font-medium text-balance md:text-5xl">{courseData.title}</h1>

                <p className="text-lg text-muted-foreground leading-relaxed">{courseData.longDescription}</p>

                <div className="flex flex-wrap gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <span>{courseData.duration} hours of content</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <span>{courseData.students.toLocaleString()} students enrolled</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Infinity className="h-5 w-5 text-muted-foreground" />
                    <span>Lifetime access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-muted-foreground" />
                    <span>Certificate included</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <img
                    src={courseData.instructor.image || "/placeholder.svg"}
                    alt={courseData.instructor.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">{courseData.instructor.name}</p>
                    <p className="text-sm text-muted-foreground">{courseData.instructor.title}</p>
                  </div>
                </div>
              </div>

              {/* Enrollment Card */}
              <Card className="h-fit lg:sticky lg:top-20">
                <div className="aspect-video overflow-hidden rounded-t-lg bg-muted">
                  <img
                    src={courseData.image || "/placeholder.svg"}
                    alt={courseData.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="mb-6">
                    <p className="font-serif text-3xl font-medium">${courseData.price}</p>
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
                        <span>40 hours of video content</span>
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
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4" />
                        <span>Certificate of completion</span>
                      </div>
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
                      {courseData.modules.length} modules • {courseData.duration} hours total
                    </p>
                  </div>

                  <Accordion type="single" collapsible className="w-full">
                    {courseData.modules.map((module, index) => (
                      <AccordionItem key={index} value={`module-${index}`}>
                        <AccordionTrigger className="text-left">
                          <div className="flex items-center gap-3">
                            <span className="font-medium">
                              Module {index + 1}: {module.title}
                            </span>
                            <span className="text-sm text-muted-foreground">({module.lessons.length} lessons)</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 pl-4">
                            {module.lessons.map((lesson, lessonIndex) => (
                              <div key={lessonIndex} className="flex items-center justify-between py-2">
                                <div className="flex items-center gap-3">
                                  {lesson.type === "video" ? (
                                    <PlayCircle className="h-4 w-4 text-muted-foreground" />
                                  ) : (
                                    <FileText className="h-4 w-4 text-muted-foreground" />
                                  )}
                                  <span className="text-sm">{lesson.title}</span>
                                </div>
                                <span className="text-sm text-muted-foreground">{lesson.duration} min</span>
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
                        {courseData.features.map((feature, index) => (
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

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-6">
                        <img
                          src={courseData.instructor.image || "/placeholder.svg"}
                          alt={courseData.instructor.name}
                          className="h-24 w-24 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-serif text-xl font-medium">{courseData.instructor.name}</h3>
                          <p className="text-sm text-muted-foreground">{courseData.instructor.title}</p>
                          <p className="mt-4 leading-relaxed">{courseData.instructor.bio}</p>

                          <div className="mt-6 flex gap-6 text-sm">
                            <div>
                              <p className="font-medium">{courseData.students.toLocaleString()}</p>
                              <p className="text-muted-foreground">Students</p>
                            </div>
                            <div>
                              <p className="font-medium">{courseData.rating}</p>
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
                </TabsContent>

                <TabsContent value="reviews" className="mt-8 space-y-6">
                  <div>
                    <h2 className="font-serif text-2xl font-medium">Student Reviews</h2>
                    <div className="mt-4 flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Star className="h-6 w-6 fill-primary text-primary" />
                        <span className="font-serif text-3xl font-medium">{courseData.rating}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p>{courseData.reviews} reviews</p>
                        <p>{courseData.students.toLocaleString()} students</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        name: "Jennifer Martinez",
                        rating: 5,
                        date: "2 weeks ago",
                        review:
                          "This course exceeded my expectations! The content is comprehensive and the instructor is incredibly knowledgeable. I feel confident starting my doula practice.",
                      },
                      {
                        name: "Amanda Chen",
                        rating: 5,
                        date: "1 month ago",
                        review:
                          "Best investment I've made in my career. The practical skills and business guidance are invaluable. Highly recommend to anyone interested in becoming a doula.",
                      },
                      {
                        name: "Rachel Thompson",
                        rating: 4,
                        date: "2 months ago",
                        review:
                          "Great course with lots of useful information. The video quality is excellent and the resources are very helpful. Would love to see more case studies included.",
                      },
                    ].map((review, index) => (
                      <Card key={index}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-medium">{review.name}</p>
                              <div className="mt-1 flex items-center gap-2">
                                <div className="flex">
                                  {Array.from({ length: review.rating }).map((_, i) => (
                                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                                  ))}
                                </div>
                                <span className="text-sm text-muted-foreground">{review.date}</span>
                              </div>
                            </div>
                          </div>
                          <p className="mt-3 leading-relaxed text-muted-foreground">{review.review}</p>
                        </CardContent>
                      </Card>
                    ))}
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
                  Join {courseData.students.toLocaleString()} students already enrolled
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <Button size="lg" disabled>
                    Coming Soon - ${courseData.price}
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
