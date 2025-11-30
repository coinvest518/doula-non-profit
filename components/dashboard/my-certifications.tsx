
"use client";

import { useEffect, useState } from "react"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Award, Download, Share2, Calendar } from "lucide-react"

export function MyCertifications() {
  const [certifications, setCertifications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCerts = async () => {
      setLoading(true)
      const supabase = getSupabaseBrowserClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setLoading(false)
        return
      }
      const { data: certs } = await supabase
        .from("certifications")
        .select("*, course:courses(title)")
        .eq("user_id", user.id)
      setCertifications(certs || [])
      setLoading(false)
    }
    fetchCerts()
  }, [])

  if (loading) {
    return <div>Loading certifications...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-medium">My Certifications</h1>
        <p className="mt-2 text-muted-foreground">View and download your earned certificates</p>
      </div>

      {certifications.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert) => (
            <Card key={cert.id} className="overflow-hidden">
              <div className="border-b border-border bg-gradient-to-br from-primary/5 to-secondary/10 p-8">
                <div className="flex justify-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                    <Award className="h-10 w-10 text-primary" />
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <Badge className="mb-3" variant={cert.is_valid ? "default" : "secondary"}>
                  {cert.is_valid ? "Active" : "Expired"}
                </Badge>
                <h3 className="font-serif text-lg font-medium text-balance">{cert.course?.title || "Course"}</h3>

                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Issued: {cert.issued_at ? new Date(cert.issued_at).toLocaleDateString() : "-"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Expires: {cert.expires_at ? new Date(cert.expires_at).toLocaleDateString() : "-"}</span>
                  </div>
                  <p className="text-muted-foreground">ID: {cert.certificate_number}</p>
                </div>

                <div className="mt-6 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent" asChild>
                    <a href={cert.pdf_url || "#"} target="_blank" rel="noopener noreferrer">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <Award className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="mt-4 font-serif text-xl font-medium">No Certifications Yet</h3>
            <p className="mt-2 text-muted-foreground">Complete your courses to earn professional certifications</p>
            <Button className="mt-6" asChild>
              <a href="/dashboard/courses">View My Courses</a>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
