import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Clock, Award, Star } from "lucide-react"
import EnrollmentButton from "@/components/enrollment-button"

const courses = [
  {
    id: "complete-doula-certification",
    title: "Complete Doula Certification Program",
    slug: "complete-doula-certification",
    description: "Comprehensive training to become a certified birth doula",
    price: 497,
    duration: 40,
    level: "Beginner",
    rating: 4.9,
    students: 1250,
    image: "/doula-certification-training-classroom.jpg",
  },
  {
    id: "advanced-postpartum-doula",
    title: "Advanced Postpartum Doula Training",
    slug: "advanced-postpartum-doula",
    description: "Specialized training for postpartum support and newborn care",
    price: 397,
    duration: 30,
    level: "Advanced",
    rating: 4.8,
    students: 850,
    image: "/postpartum-doula-newborn-care-training.jpg",
  },
  {
    id: "childbirth-education-instructor",
    title: "Childbirth Education Instructor Course",
    slug: "childbirth-education-instructor",
    description: "Learn to teach comprehensive childbirth education classes",
    price: 447,
    duration: 35,
    level: "Intermediate",
    rating: 4.9,
    students: 620,
    image: "/childbirth-education-instructor-teaching.jpg",
  },
  {
    id: "lactation-support-fundamentals",
    title: "Lactation Support Fundamentals",
    slug: "lactation-support-fundamentals",
    description: "Essential breastfeeding support skills for doulas",
    price: 197,
    duration: 15,
    level: "Beginner",
    rating: 4.7,
    students: 980,
    image: "/lactation-support-training.jpg",
  },
]

export function CourseGrid() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{courses.length} courses available</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {courses.map((course) => (
          <Card key={course.id} className="group overflow-hidden transition-shadow hover:shadow-lg">
            <div className="aspect-video overflow-hidden bg-muted">
              <img
                src={course.image || "/placeholder.svg"}
                alt={course.title}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <CardContent className="p-6">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge>{course.level}</Badge>
                  {course.id !== "complete-doula-certification" && (
                    <Badge variant="secondary" className="bg-orange-100 text-orange-800 border-orange-200">
                      Coming Soon
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="font-medium">{course.rating}</span>
                  <span className="text-muted-foreground">({course.students})</span>
                </div>
              </div>

              <h3 className="font-serif text-xl font-medium text-balance">{course.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{course.description}</p>

              <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration} hours</span>
                </div>
                <div className="flex items-center gap-1">
                  <Award className="h-4 w-4" />
                  <span>Certificate</span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div>
                  <p className="font-serif text-2xl font-medium">${course.price}</p>
                  {course.id !== "complete-doula-certification" && (
                    <p className="text-xs text-muted-foreground">Enrollment opens soon</p>
                  )}
                </div>
                <div className="flex gap-2">
                  {course.id === "complete-doula-certification" && (
                    <EnrollmentButton 
                      courseSlug={course.slug}
                      size="sm"
                    >Enroll Now</EnrollmentButton>
                  )}
                  <Button variant={course.id === "complete-doula-certification" ? "outline" : "default"} size="sm" asChild>
                    <Link href={`/courses/${course.slug}`}>View Details</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
