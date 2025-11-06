import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Award, Download, Copy, Share2, Eye, Users, Calendar } from "lucide-react"

export default function CertificatesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            {/* Sidebar */}
            <aside className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Ashley Strong</p>
                      <p className="text-sm text-muted-foreground">Instructor</p>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <nav className="space-y-2">
                    <a href="#" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-muted">
                      <Award className="h-4 w-4" />
                      Certificates
                    </a>
                    <a href="/dashboard" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted">
                      <Users className="h-4 w-4" />
                      Dashboard
                    </a>
                    <a href="/courses" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted">
                      <Calendar className="h-4 w-4" />
                      Courses
                    </a>
                  </nav>
                </CardContent>
              </Card>
            </aside>

            {/* Main Content */}
            <div className="space-y-6">
              <div>
                <h1 className="font-serif text-3xl font-medium">Issue Certificates: Complete Doula Certification</h1>
                <p className="mt-2 text-muted-foreground">
                  Issue certificates of completion to your attendees. Links to a digital certificate will be emailed to each individual.
                </p>
                <a href="#" className="text-sm text-primary hover:underline">Learn more</a>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {/* Certificate Preview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Certificate Preview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="aspect-[4/3] rounded-lg overflow-hidden border-2 border-yellow-200">
                      <img
                        src="/certexp.png"
                        alt="Certificate Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                          <Eye className="mr-2 h-4 w-4" />
                          Preview
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Here's your certificate!</DialogTitle>
                          <DialogDescription>
                            Preview of the certificate that will be issued to students.
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="aspect-[4/3] rounded-lg overflow-hidden border-2 border-yellow-200">
                          <img
                            src="/certexp.png"
                            alt="Certificate Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex gap-2">
                          <Button className="flex-1">
                            <Download className="mr-2 h-4 w-4" />
                            Download PDF
                          </Button>
                          <Button variant="outline">
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button variant="outline">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>

                {/* Recipients */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Select Recipients</CardTitle>
                    <p className="text-sm text-muted-foreground">Choose who will receive a certificate</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {[1, 2, 3, 4].map((i) => (
                          <Avatar key={i} className="border-2 border-background">
                            <AvatarFallback>U{i}</AvatarFallback>
                          </Avatar>
                        ))}
                        <div className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                          <span className="text-xs font-medium">+12</span>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">16 people selected</span>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      Edit Recipients
                    </Button>
                    
                    <Button className="w-full bg-red-600 hover:bg-red-700">
                      <Award className="mr-2 h-4 w-4" />
                      Issue Certificates
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Certificates */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Certificates Issued</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Sarah Johnson", course: "Complete Doula Certification", date: "Dec 15, 2024", status: "Delivered" },
                      { name: "Maria Rodriguez", course: "Postpartum Training", date: "Dec 12, 2024", status: "Delivered" },
                      { name: "Jennifer Chen", course: "Lactation Support", date: "Dec 10, 2024", status: "Pending" },
                    ].map((cert, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>{cert.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{cert.name}</p>
                            <p className="text-sm text-muted-foreground">{cert.course}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">{cert.date}</p>
                          <Badge variant={cert.status === 'Delivered' ? 'default' : 'secondary'}>
                            {cert.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}