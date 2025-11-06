import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  GraduationCap,
  Award,
  Users,
  Clock,
  CheckCircle2,
  Star,
  ArrowRight,
  BookOpen,
  Heart,
  TrendingUp,
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-background to-muted/20 px-4 py-20 md:py-32">
          <div className="container mx-auto">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col justify-center space-y-6 opacity-0 animate-fade-in-up">
                <Badge className="w-fit bg-primary/10 text-primary hover:bg-primary/20">
                  Based in Atlanta, Georgia
                </Badge>
                <h1 className="font-serif text-4xl font-medium leading-tight text-balance md:text-5xl lg:text-6xl">
                  Become a Certified Doula & Transform Birth Experiences
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                  Professional certification programs designed for aspiring birth workers. Learn from experienced
                  instructors and join a supportive community of doulas making a difference.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button size="lg" asChild className="group">
                    <Link href="/courses">
                      Explore Courses
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/about">Learn More</Link>
                  </Button>
                </div>
              </div>

              <div className="relative opacity-0 animate-fade-in animation-delay-200">
                <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-muted">
                  <img
                    src="/professional-doula-supporting-pregnant-woman-warm-.jpg"
                    alt="Professional doula providing support"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 rounded-xl border border-border bg-card p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Certified Training</p>
                      <p className="text-xs text-muted-foreground">Nationally Recognized</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-b border-border px-4 py-16">
          <div className="container mx-auto">
            <div className="grid gap-8 md:grid-cols-3">
              <Card className="border-none bg-muted/30 opacity-0 animate-scale-in">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <p className="mt-4 font-serif text-3xl font-medium">2,500+</p>
                  <p className="text-sm text-muted-foreground">Certified Doulas</p>
                </CardContent>
              </Card>

              <Card className="border-none bg-muted/30 opacity-0 animate-scale-in animation-delay-200">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Star className="h-8 w-8 text-primary" />
                  </div>
                  <p className="mt-4 font-serif text-3xl font-medium">4.9/5</p>
                  <p className="text-sm text-muted-foreground">Student Rating</p>
                </CardContent>
              </Card>

              <Card className="border-none bg-muted/30 opacity-0 animate-scale-in animation-delay-400">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <p className="mt-4 font-serif text-3xl font-medium">15+</p>
                  <p className="text-sm text-muted-foreground">Years Experience</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Courses */}
        <section className="border-b border-border px-4 py-20">
          <div className="container mx-auto">
            <div className="mb-12 text-center">
              <h2 className="font-serif text-3xl font-medium text-balance md:text-4xl">
                Professional Certification Programs
              </h2>
              <p className="mt-4 text-lg text-muted-foreground text-pretty">
                Comprehensive training designed to prepare you for a rewarding career as a birth professional
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
                <div className="aspect-video overflow-hidden bg-muted">
                  <img
                    src="/doula-certification-training-classroom.jpg"
                    alt="Complete Doula Certification"
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <Badge className="mb-3">Beginner</Badge>
                  <h3 className="font-serif text-xl font-medium text-balance">Complete Doula Certification Program</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    Comprehensive training to become a certified birth doula
                  </p>
                  <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>40 hours</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="h-4 w-4" />
                      <span>Certificate</span>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <p className="font-serif text-2xl font-medium">$497</p>
                    <Button asChild>
                      <Link href="/courses/complete-doula-certification">Learn More</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
                <div className="aspect-video overflow-hidden bg-muted">
                  <img
                    src="/postpartum-doula-newborn-care-training.jpg"
                    alt="Advanced Postpartum Doula"
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <Badge className="mb-3">Advanced</Badge>
                  <h3 className="font-serif text-xl font-medium text-balance">Advanced Postpartum Doula Training</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    Specialized training for postpartum support and newborn care
                  </p>
                  <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>30 hours</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="h-4 w-4" />
                      <span>Certificate</span>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <p className="font-serif text-2xl font-medium">$397</p>
                    <Button asChild>
                      <Link href="/courses/advanced-postpartum-doula">Learn More</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
                <div className="aspect-video overflow-hidden bg-muted">
                  <img
                    src="/childbirth-education-instructor-teaching.jpg"
                    alt="Childbirth Education Instructor"
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <Badge className="mb-3">Intermediate</Badge>
                  <h3 className="font-serif text-xl font-medium text-balance">
                    Childbirth Education Instructor Course
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    Learn to teach comprehensive childbirth education classes
                  </p>
                  <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>35 hours</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="h-4 w-4" />
                      <span>Certificate</span>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <p className="font-serif text-2xl font-medium">$447</p>
                    <Button asChild>
                      <Link href="/courses/childbirth-education-instructor">Learn More</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 text-center">
              <Button size="lg" variant="outline" asChild>
                <Link href="/courses">
                  View All Courses
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="border-b border-border px-4 py-20">
          <div className="container mx-auto">
            <div className="mb-12 text-center">
              <h2 className="font-serif text-3xl font-medium text-balance md:text-4xl">
                Why Choose Fortis Porles Doula Academy
              </h2>
              <p className="mt-4 text-lg text-muted-foreground text-pretty">
                We provide comprehensive training and ongoing support for your doula journey
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <GraduationCap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mt-4 font-serif text-xl font-medium">Expert Instructors</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Learn from experienced doulas with decades of combined birth support experience
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mt-4 font-serif text-xl font-medium">Comprehensive Curriculum</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Evidence-based training covering all aspects of birth and postpartum support
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mt-4 font-serif text-xl font-medium">Supportive Community</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Join a network of passionate birth workers and receive ongoing mentorship
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mt-4 font-serif text-xl font-medium">Recognized Certification</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Earn nationally recognized certification to establish credibility with clients
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mt-4 font-serif text-xl font-medium">Flexible Learning</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Study at your own pace with lifetime access to course materials
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mt-4 font-serif text-xl font-medium">Career Support</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Get guidance on building and growing your successful doula practice
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-20">
          <div className="container mx-auto">
            <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/10">
              <CardContent className="p-8 md:p-12">
                <div className="mx-auto max-w-2xl text-center">
                  <h2 className="font-serif text-3xl font-medium text-balance md:text-4xl">
                    Ready to Start Your Doula Journey?
                  </h2>
                  <p className="mt-4 text-lg text-muted-foreground text-pretty">
                    Join thousands of certified doulas who have transformed their passion for birth into a meaningful
                    career
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Button size="lg" asChild>
                      <Link href="/signup">Get Started Today</Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                      <a href="mailto:Ashley.strong@fortisproles.org">Contact Us</a>
                    </Button>
                  </div>
                  <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>No prerequisites</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Lifetime access</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Certificate included</span>
                    </div>
                  </div>
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
