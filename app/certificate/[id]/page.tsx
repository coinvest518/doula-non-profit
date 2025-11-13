import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Award, Download, Share2, Printer, CheckCircle2 } from "lucide-react"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"

interface CertificatePageProps {
  params: Promise<{
    id: string
  }>
}

export default async function CertificatePage({ params }: CertificatePageProps) {
  const { id } = await params
  const supabase = await getSupabaseServerClient()

  // Fetch certificate data with related course and user information
  const { data: certificate, error } = await supabase
    .from("certifications")
    .select(`
      *,
      course:courses(
        title,
        duration_hours
      ),
      user:profiles(
        full_name
      )
    `)
    .eq("id", id)
    .single()

  if (error || !certificate) {
    notFound()
  }

  // Format dates
  const issueDate = certificate.issued_at 
    ? new Date(certificate.issued_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : "N/A"
  
  const expiryDate = certificate.expires_at
    ? new Date(certificate.expires_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : "No Expiration"

  const isExpired = certificate.expires_at && new Date(certificate.expires_at) < new Date()
  const recipientName = (certificate.user as any)?.full_name || "Certificate Holder"
  const courseName = (certificate.course as any)?.title || "Course"
  const totalHours = (certificate.course as any)?.duration_hours || 0
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-muted/20 px-4 py-12">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl font-medium">Professional Certificate</h1>
            <p className="mt-2 text-muted-foreground">Certificate ID: {certificate.certificate_number}</p>
          </div>
          <Badge variant={isExpired ? "destructive" : "default"}>
            {isExpired ? "Expired" : "Verified"}
          </Badge>
        </div>

        {/* Certificate Display */}
        <Card className="overflow-hidden border-2 border-primary/20">
          <div className="border-b-8 border-primary bg-gradient-to-br from-primary/5 via-secondary/10 to-accent/5 p-12">
            <div className="mx-auto max-w-3xl space-y-8 text-center">
              <div className="flex justify-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
                  <Award className="h-12 w-12 text-primary" />
                </div>
              </div>

              <div>
                <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                  Certificate of Completion
                </p>
                <h2 className="mt-4 font-serif text-4xl font-medium md:text-5xl">Fortis Proles Doula Academy</h2>
              </div>

              <div className="space-y-2">
                <p className="text-lg text-muted-foreground">This certifies that</p>
                <p className="font-serif text-3xl font-medium md:text-4xl">{recipientName}</p>
                <p className="text-lg text-muted-foreground">has successfully completed</p>
                <p className="font-serif text-2xl font-medium md:text-3xl">{courseName}</p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
                <div>
                  <p className="text-muted-foreground">Completion Date</p>
                  <p className="mt-1 font-medium">{issueDate}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Total Hours</p>
                  <p className="mt-1 font-medium">{totalHours} hours</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Certificate Number</p>
                  <p className="mt-1 font-medium">{certificate.certificate_number}</p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-12 pt-8">
                <div className="text-center">
                  <div className="h-px w-48 bg-border" />
                  <p className="mt-2 text-sm font-medium">Ashley Strong</p>
                  <p className="text-xs text-muted-foreground">Lead Instructor</p>
                </div>
              </div>

              {certificate.expires_at && (
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <CheckCircle2 className={`h-4 w-4 ${isExpired ? "text-destructive" : "text-primary"}`} />
                  <span>{isExpired ? "Expired on" : "Valid until"} {expiryDate}</span>
                </div>
              )}
            </div>
          </div>

          <CardContent className="bg-muted/30 p-6">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
              <Button variant="outline" className="bg-transparent">
                <Printer className="mr-2 h-4 w-4" />
                Print Certificate
              </Button>
              <Button variant="outline" className="bg-transparent">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Certificate Details */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-medium">Certificate Details</h3>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Issue Date</span>
                  <span className="font-medium">{issueDate}</span>
                </div>
                {certificate.expires_at && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Expiry Date</span>
                    <span className="font-medium">{expiryDate}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <Badge variant={isExpired ? "destructive" : "secondary"}>
                    {isExpired ? "Expired" : "Active"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-medium">Verification</h3>
              <div className="mt-4 space-y-3 text-sm">
                <p className="text-muted-foreground">
                  This certificate can be verified by visiting our verification portal and entering the certificate
                  number.
                </p>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  Verify Certificate
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <Card className="mt-6 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/10">
          <CardContent className="p-6">
            <h3 className="font-medium">About This Certification</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              This certificate demonstrates successful completion of the {courseName} at Fortis Proles Doula
              Academy. The program includes {totalHours} hours of comprehensive training in birth
              support, prenatal care, labor techniques, and postpartum support. This certification is recognized by
              professional doula organizations and demonstrates competency in providing professional birth support
              services.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
