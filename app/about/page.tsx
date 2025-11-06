import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Heart, Users, Award, BookOpen, Star, CheckCircle } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b border-border bg-gradient-to-b from-background to-muted/20 px-4 py-16">
          <div className="container mx-auto">
            <div className="mx-auto max-w-4xl text-center">
              <Badge variant="secondary" className="mb-4">
                About Fortis Proles Doula Academy
              </Badge>
              <h1 className="font-serif text-4xl font-medium text-balance md:text-6xl">
                Training Compassionate Doulas for Meaningful Careers
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed text-pretty">
                We train people who love helping others to become certified doulas - no medical background required. 
                Create purposeful impact in your community with a flexible, meaningful career supporting mothers and babies.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button size="lg" asChild>
                  <Link href="/courses">View Our Programs</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="mailto:Ashley.strong@fortisproles.org">Get in Touch</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="px-4 py-16">
          <div className="container mx-auto">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="font-serif text-3xl font-medium text-balance md:text-4xl">
                  Our Mission
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Fortis Proles Doula Academy exists to train compassionate individuals who feel called 
                  to support mothers and babies. We believe anyone with a heart for helping others can 
                  become a skilled doula and create meaningful impact in their community.
                </p>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Beyond doula training, we're also proud creators of Bebe Gaba - premium organic baby food 
                  that nourishes little ones with the same care and attention we bring to our educational programs. 
                  Everything we do centers around supporting families through life's most precious moments.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">14</div>
                    <div className="text-sm text-muted-foreground">Week Program</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">$900-$2,500</div>
                    <div className="text-sm text-muted-foreground">Per Birth Client</div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img
                  src="/professional-doula-supporting-pregnant-woman-warm-.jpg"
                  alt="Doula supporting expectant mother"
                  className="rounded-lg object-cover w-full h-96"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Meet Our Team */}
        <section className="border-t border-border bg-muted/20 px-4 py-16">
          <div className="container mx-auto">
            <div className="text-center">
              <h2 className="font-serif text-3xl font-medium text-balance md:text-4xl">
                What You'll Learn (In Plain Language)
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Our 14-week curriculum covers everything you need to become a confident, skilled doula.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-serif text-lg font-medium">Foundations of Doula Care</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    What a doula actually does, how we support moms, and how we're different from doctors/nurses.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-serif text-lg font-medium">Birth & Body Basics</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    What happens during pregnancy + birth and how to comfort someone in labor.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-serif text-lg font-medium">Emotional Support & Advocacy</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    How to help families feel safe, heard, and respected.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-serif text-lg font-medium">Ethics & Boundaries</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    How to work professionally and respectfully in hospitals + homes.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-serif text-lg font-medium">CPR & First Aid</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Safety skills for emergencies.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-serif text-lg font-medium">Trauma-Informed Care</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    How to support people who have experienced stress or violence.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-serif text-lg font-medium">Breastfeeding + Newborn Care</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Basics of nursing, bonding, and taking care of baby.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-serif text-lg font-medium">Business & Medicaid Billing</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    How to start your doula business and get paid (including Medicaid).
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-serif text-lg font-medium">Cultural Competency</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    How to support families from different backgrounds with respect + understanding.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-serif text-lg font-medium">Hands-On Training</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Attend real or practice births and receive mentorship.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="px-4 py-16">
          <div className="container mx-auto">
            <div className="text-center">
              <h2 className="font-serif text-3xl font-medium text-balance md:text-4xl">
                What You Receive
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Complete certification and business support to launch your doula career.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Certified Full-Spectrum Birth + Postpartum Doula</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium">CPR + First Aid Certification</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Domestic Violence + Trauma Training</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Business Start-Up + Marketing Support</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Medicaid Billing Readiness</h3>
                      <p className="text-sm text-muted-foreground mt-1">For select states</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Real Birth Experience + Mentorship</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Certifications & Accreditations */}
        <section className="border-t border-border bg-muted/20 px-4 py-16">
          <div className="container mx-auto">
            <div className="text-center">
              <h2 className="font-serif text-3xl font-medium text-balance md:text-4xl">
                Career Outcomes & Income Potential
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                After completing our program, you'll be ready to start your meaningful doula career.
              </p>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2">
              <Card>
                <CardContent className="p-8">
                  <h3 className="font-serif text-xl font-medium mb-4">Career Opportunities</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      Start your own doula business
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      Work with birthing centers and midwives
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      Serve private-pay and Medicaid clients
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      Support families through pregnancy, birth, and postpartum
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-8">
                  <h3 className="font-serif text-xl font-medium mb-4">Income Potential</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-2xl font-bold text-primary">$900–$2,500</div>
                      <div className="text-sm text-muted-foreground">Per birth support client</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">$25–$55/hour</div>
                      <div className="text-sm text-muted-foreground">Postpartum support</div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Plus Medicaid reimbursement where approved
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-12">
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-8 text-center">
                  <h3 className="font-serif text-xl font-medium mb-2">About Bebe Gaba</h3>
                  <p className="text-muted-foreground">
                    We're also proud creators of Bebe Gaba - premium organic baby food made with the same 
                    care and attention we bring to our doula training. Supporting families extends beyond 
                    birth into nourishing their little ones with wholesome, organic nutrition.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="px-4 py-16">
          <div className="container mx-auto">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-serif text-3xl font-medium text-balance md:text-4xl">
                Ready to Create Purposeful Impact?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                This program trains you to become a compassionate, skilled birth and postpartum doula — 
                and shows you how to turn it into a paid, purposeful career. No medical background required.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button size="lg" asChild>
                  <Link href="/courses">Browse Courses</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="mailto:Ashley.strong@fortisproles.org">Contact Us</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}