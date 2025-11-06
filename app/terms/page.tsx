import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"

export default function TermsOfServicePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />

      <main className="flex-1">
        <section className="border-b border-border bg-muted/20 px-4 py-16">
          <div className="container mx-auto">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="font-serif text-4xl font-medium text-balance md:text-5xl">
                Terms of Service
              </h1>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                Professional standards and service agreements
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
                  <h2 className="font-serif text-2xl font-medium mb-4">Agreement to Terms</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    By accessing and using Fortis Proles Doula Academy services, you agree to be bound by these Terms of Service. 
                    These terms govern your use of our educational programs, consultations, and related services.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="font-serif text-2xl font-medium mb-4">Educational Services</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Fortis Proles Doula Academy provides professional doula certification and training programs:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Comprehensive 14-week doula certification program</li>
                    <li>• Specialized training modules and workshops</li>
                    <li>• Private consultations and mentorship</li>
                    <li>• Business development support</li>
                    <li>• Continuing education opportunities</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="font-serif text-2xl font-medium mb-4">Professional Standards</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    All students and participants must maintain professional standards:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Respect for all families and birth choices</li>
                    <li>• Adherence to doula scope of practice</li>
                    <li>• Commitment to ongoing education and improvement</li>
                    <li>• Professional communication and conduct</li>
                    <li>• Compliance with local laws and regulations</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="font-serif text-2xl font-medium mb-4">Confidentiality and Privacy</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Strict confidentiality standards apply to all participants:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• All client information must remain confidential</li>
                    <li>• No sharing of family details or birth experiences without consent</li>
                    <li>• Professional boundaries must be maintained</li>
                    <li>• Case studies must be anonymized and approved</li>
                    <li>• Violation of confidentiality may result in program termination</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="font-serif text-2xl font-medium mb-4">Certification Requirements</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    To receive certification, students must:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Complete all required coursework and assessments</li>
                    <li>• Attend mandatory training sessions</li>
                    <li>• Demonstrate competency in required skills</li>
                    <li>• Maintain professional conduct throughout the program</li>
                    <li>• Meet continuing education requirements for certification renewal</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="font-serif text-2xl font-medium mb-4">Payment and Refund Policy</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Payment terms and conditions:
                  </p>
                  <ul className="space-y-2 text-muted-foreground mb-4">
                    <li>• Course fees are due upon enrollment</li>
                    <li>• Payment plans may be available upon request</li>
                    <li>• Refunds available within 14 days of enrollment if no content accessed</li>
                    <li>• No refunds after course materials have been accessed</li>
                    <li>• Consultation fees are non-refundable once services are provided</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed">
                    Special circumstances will be considered on a case-by-case basis.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="font-serif text-2xl font-medium mb-4">Intellectual Property</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    All course materials and content are protected:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Course materials are for personal use only</li>
                    <li>• No reproduction or distribution without written permission</li>
                    <li>• Bebe Gaba brand and products are proprietary</li>
                    <li>• Certification credentials may not be misrepresented</li>
                    <li>• Academy name and branding are protected trademarks</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="font-serif text-2xl font-medium mb-4">Limitation of Liability</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Fortis Proles Doula Academy provides educational services only:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• We do not provide medical advice or care</li>
                    <li>• Students are responsible for their own professional practice</li>
                    <li>• Academy is not liable for student actions with clients</li>
                    <li>• Professional liability insurance is student's responsibility</li>
                    <li>• Educational content is for training purposes only</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="font-serif text-2xl font-medium mb-4">Termination</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We reserve the right to terminate services for:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Violation of professional standards</li>
                    <li>• Breach of confidentiality agreements</li>
                    <li>• Inappropriate conduct or communication</li>
                    <li>• Non-payment of fees</li>
                    <li>• Misrepresentation of credentials or qualifications</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="font-serif text-2xl font-medium mb-4">Changes to Terms</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We may update these terms periodically. Continued use of our services constitutes acceptance of any changes. 
                    We will notify users of significant changes via email or website notice.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="font-serif text-2xl font-medium mb-4">Contact Information</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    For questions about these Terms of Service, please contact:
                  </p>
                  <p className="mt-4">
                    <a href="mailto:Ashley.strong@fortisproles.org" className="text-primary hover:underline">
                      Ashley.strong@fortisproles.org
                    </a>
                  </p>
                  <p className="text-sm text-muted-foreground mt-4">
                    Fortis Proles Doula Academy<br />
                    Atlanta, Georgia
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