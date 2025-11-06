import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />

      <main className="flex-1">
        <section className="border-b border-border bg-muted/20 px-4 py-16">
          <div className="container mx-auto">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="font-serif text-4xl font-medium text-balance md:text-5xl">
                Privacy Policy
              </h1>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                Your privacy and confidentiality are our highest priorities
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Last updated: December 2024
              </p>
            </div>
          </div>
        </section>

        <section className="px-4 py-16">
          <div className="container mx-auto">
            <div className="mx-auto max-w-4xl space-y-8">
              
              <Card>
                <CardContent className="p-8">
                  <h2 className="font-serif text-2xl font-medium mb-4">Our Commitment to Privacy</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    At Fortis Proles Doula Academy, we are committed to maintaining the highest standards of privacy and confidentiality. 
                    We understand the sensitive nature of birth work and family support, and we take our responsibility to protect your 
                    information seriously.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong>We do not store user data digitally.</strong> All client records and sensitive information are maintained 
                    as hard files in secure, private locations with restricted access.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="font-serif text-2xl font-medium mb-4">Information We Do NOT Collect</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Personal health information</li>
                    <li>• Family details or birth plans</li>
                    <li>• Private consultation notes</li>
                    <li>• Client communications or records</li>
                    <li>• Sensitive personal data</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="font-serif text-2xl font-medium mb-4">100% Non-Disclosure Agreement (NDA)</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We operate under a strict 100% Non-Disclosure Agreement. This means:
                  </p>
                  <ul className="space-y-2 text-muted-foreground mb-4">
                    <li>• We never share, sell, or disclose any client information</li>
                    <li>• All consultations remain completely confidential</li>
                    <li>• Family privacy is protected at all times</li>
                    <li>• No information is shared with third parties</li>
                    <li>• All staff and instructors are bound by confidentiality agreements</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed">
                    Your trust is sacred to us, and we uphold the highest ethical standards in all our interactions.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="font-serif text-2xl font-medium mb-4">Hard File Records Only</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    All records are maintained as physical hard files in secure locations:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• No digital storage of sensitive information</li>
                    <li>• Physical files stored in locked, secure facilities</li>
                    <li>• Access restricted to authorized personnel only</li>
                    <li>• Files destroyed according to professional retention schedules</li>
                    <li>• No cloud storage or digital backups of personal information</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="font-serif text-2xl font-medium mb-4">Private Consulting Privacy</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    During private consultations, we uphold the highest privacy standards:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• All conversations remain strictly confidential</li>
                    <li>• No recording or digital documentation without explicit consent</li>
                    <li>• Family information never shared with other clients or staff</li>
                    <li>• Consultation notes kept in secure physical files only</li>
                    <li>• Professional boundaries maintained at all times</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="font-serif text-2xl font-medium mb-4">Website and Technical Information</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Our website may collect minimal technical information for functionality:
                  </p>
                  <ul className="space-y-2 text-muted-foreground mb-4">
                    <li>• Basic analytics for website improvement</li>
                    <li>• Login credentials for course access (encrypted)</li>
                    <li>• Email addresses for course communications only</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed">
                    This technical data is never combined with personal consultation information and is used solely 
                    for educational platform functionality.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="font-serif text-2xl font-medium mb-4">Your Rights</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    You have the right to:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Request information about any records we maintain</li>
                    <li>• Request correction or deletion of any information</li>
                    <li>• Withdraw consent for any communications</li>
                    <li>• Receive copies of any records we maintain about you</li>
                    <li>• File complaints about privacy practices</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="font-serif text-2xl font-medium mb-4">Contact Us</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    If you have any questions about our privacy practices or need to exercise your privacy rights, 
                    please contact us at:
                  </p>
                  <p className="mt-4">
                    <a href="mailto:Ashley.strong@fortisproles.org" className="text-primary hover:underline">
                      Ashley.strong@fortisproles.org
                    </a>
                  </p>
                  <p className="text-sm text-muted-foreground mt-4">
                    We are committed to addressing any privacy concerns promptly and transparently.
                  </p>
                </CardContent>
              </Card>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}