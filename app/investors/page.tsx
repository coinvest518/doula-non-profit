import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, BookOpen, Briefcase, ExternalLink } from "lucide-react"
import { Navigation } from "@/components/navigation"
import Link from "next/link"

export default function InvestorsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Navigation />
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            501(c)(3) Nonprofit Organization
          </Badge>
          <h1 className="text-4xl font-bold mb-4">Support Our Mission</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            "Care for One. Strengthen Many." — Your tax-deductible donation provides real care, real relief, and real hope to families when they need it most.
          </p>
        </div>

        {/* Organization Description */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-primary" />
              Fortis Proles Inc. — Organization Description
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Fortis Proles Inc. is a registered 501(c)(3) nonprofit organization dedicated to improving maternal support, postpartum wellness, and family stability. We provide birth doula services, postpartum care, parent education, emotional support resources, and community wellness programs designed to strengthen families from the start.
            </p>
            <p>
              We believe that strong families create strong communities, and every parent deserves support, guidance, and access to compassionate care during childbirth and early parenthood. Our programs are structured to provide hands-on support, education, and a network of trusted resources that empower parents and caregivers during life's most vulnerable transitions.
            </p>
            <div className="pt-4">
              <Button asChild variant="outline">
                <Link href="/about">
                  Learn more <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Partnership Overview */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              FDWA x Fortis Proles Partnership Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Our sister company, FDWA (Futuristic Digital Wealth Agency), is building AI and automation systems that create long-term financial empowerment. Through{" "}
              <Link href="https://fwda.site" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                https://fwda.site
              </Link>
              , we are developing tools that help underserved communities:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Build financial literacy and credit stability</li>
              <li>Start and scale online businesses</li>
              <li>Automate income-producing systems</li>
              <li>Gain access to digital entrepreneurship education</li>
            </ul>
            <p>
              Together, FDWA supports the mission of Fortis Proles by helping families achieve economic strength, digital literacy, and long-term independence.
            </p>
          </CardContent>
        </Card>

        {/* Impact Areas */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">💖 Where Donations Go</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Birth & Postpartum Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  <strong>Example Use:</strong> Doula care, wellness check-ins
                </p>
                <p className="text-sm">
                  <strong>Outcome:</strong> Safer, more supported birth & parent experiences
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Family Assistance Fund</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  <strong>Example Use:</strong> Baby supplies, emergency needs, home support
                </p>
                <p className="text-sm">
                  <strong>Outcome:</strong> Reduced stress & stronger early development conditions
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Community Education</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  <strong>Example Use:</strong> Workshops, support groups, parenting resources
                </p>
                <p className="text-sm">
                  <strong>Outcome:</strong> Confident parents, stable households
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Training & Employment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  <strong>Example Use:</strong> Certifying caregivers & doulas
                </p>
                <p className="text-sm">
                  <strong>Outcome:</strong> Creating local jobs & sustainable community growth
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tax Deductible Notice */}
        <Card className="mb-12 border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-lg font-semibold mb-2">
                Donations are tax-deductible under our 501(c)(3) status.
              </p>
              <p className="text-muted-foreground">
                EIN: [ 33-1375504 ] — All donations qualify as charitable tax deductions.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">
            Donate today and help us support a family, empower a parent, and strengthen a community.
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button size="lg" asChild className="min-w-[200px]">
              <Link href="https://www.zeffy.com/en-US/donation-form/the-strong-offspring-initiative" target="_blank" rel="noopener noreferrer">
                Donate Now <Heart className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <div className="text-sm text-muted-foreground">
              One-time or Monthly Giving Available
            </div>
          </div>

          <p className="text-muted-foreground mb-4">
            Sponsorship & Corporate Partnership Options Available
          </p>
          
          <Button variant="outline" asChild>
            <Link href="mailto:Ashley.strong@fortisproles.org?subject=Partnership Inquiry">
              Contact Us for Partnerships
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}