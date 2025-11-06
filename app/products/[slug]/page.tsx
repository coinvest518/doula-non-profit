import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Download, FileText, CheckCircle2, ShoppingCart } from "lucide-react"

// This would normally come from a database
const productData = {
  title: "Birth Plan Template Bundle",
  slug: "birth-plan-template-bundle",
  description: "Comprehensive birth plan templates for various birth settings",
  longDescription:
    "Our Birth Plan Template Bundle includes professionally designed templates for hospital births, home births, and birth center deliveries. Each template is fully customizable and includes sections for preferences, medical history, labor support, and postpartum care. Perfect for doulas to use with clients or for expectant parents to create their ideal birth plan.",
  price: 29.99,
  category: "Templates",
  rating: 4.8,
  reviews: 156,
  downloads: 1250,
  fileType: "PDF & DOCX",
  fileSize: "2.5 MB",
  image: "/Birthplan.png",
  features: [
    "3 customizable birth plan templates",
    "Hospital, home, and birth center versions",
    "Editable in Word and PDF formats",
    "Professional design and layout",
    "Includes medical history section",
    "Labor preferences checklist",
    "Postpartum care preferences",
    "Instant download after purchase",
  ],
  includes: [
    "Hospital Birth Plan Template (PDF & DOCX)",
    "Home Birth Plan Template (PDF & DOCX)",
    "Birth Center Plan Template (PDF & DOCX)",
    "Quick Reference Guide (PDF)",
    "Customization Instructions (PDF)",
  ],
}

export default function ProductDetailPage() {
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
                  <Badge variant="secondary">{productData.category}</Badge>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="font-medium">{productData.rating}</span>
                    <span className="text-muted-foreground">
                      ({productData.reviews} reviews, {productData.downloads.toLocaleString()} downloads)
                    </span>
                  </div>
                </div>

                <h1 className="font-serif text-4xl font-medium text-balance md:text-5xl">{productData.title}</h1>

                <p className="text-lg text-muted-foreground leading-relaxed">{productData.longDescription}</p>

                <div className="flex flex-wrap gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <span>{productData.fileType}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Download className="h-5 w-5 text-muted-foreground" />
                    <span>{productData.fileSize}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Download className="h-5 w-5 text-muted-foreground" />
                    <span>Instant download</span>
                  </div>
                </div>
              </div>

              {/* Purchase Card */}
              <Card className="h-fit lg:sticky lg:top-20">
                <div className="aspect-[4/3] overflow-hidden rounded-t-lg bg-muted">
                  <img
                    src={productData.image || "/placeholder.svg"}
                    alt={productData.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="mb-6">
                    <p className="font-serif text-3xl font-medium">${productData.price}</p>
                    <p className="text-sm text-muted-foreground">One-time purchase, instant download</p>
                  </div>

                  <div className="space-y-3">
                    <Button size="lg" className="w-full">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                    <Button size="lg" variant="outline" className="w-full bg-transparent">
                      Buy Now
                    </Button>
                  </div>

                  <div className="mt-6 space-y-3 border-t border-border pt-6">
                    <p className="text-sm font-medium">What's included:</p>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      {productData.includes.map((item, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Product Details */}
        <section className="px-4 py-12">
          <div className="container mx-auto">
            <div className="mx-auto max-w-4xl">
              <Tabs defaultValue="features" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="features" className="mt-8 space-y-6">
                  <div>
                    <h2 className="font-serif text-2xl font-medium">Product Features</h2>
                    <p className="mt-2 text-muted-foreground">Everything included in this digital product</p>
                  </div>

                  <Card className="bg-muted/30">
                    <CardContent className="p-6">
                      <div className="grid gap-3 md:grid-cols-2">
                        {productData.features.map((feature, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <div>
                    <h3 className="font-medium">How to Use</h3>
                    <ol className="mt-4 space-y-3 text-sm text-muted-foreground">
                      <li className="flex gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                          1
                        </span>
                        <span>Purchase and download the template bundle instantly</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                          2
                        </span>
                        <span>Open the templates in Microsoft Word or your preferred PDF editor</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                          3
                        </span>
                        <span>Customize the templates with your client's preferences and information</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                          4
                        </span>
                        <span>Print or share digitally with your clients and their care team</span>
                      </li>
                    </ol>
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="mt-8 space-y-6">
                  <div>
                    <h2 className="font-serif text-2xl font-medium">Customer Reviews</h2>
                    <div className="mt-4 flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Star className="h-6 w-6 fill-primary text-primary" />
                        <span className="font-serif text-3xl font-medium">{productData.rating}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p>{productData.reviews} reviews</p>
                        <p>{productData.downloads.toLocaleString()} downloads</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        name: "Sarah Johnson",
                        rating: 5,
                        date: "1 week ago",
                        review:
                          "These templates are exactly what I needed for my doula practice. Professional, comprehensive, and easy to customize. My clients love them!",
                      },
                      {
                        name: "Emily Rodriguez",
                        rating: 5,
                        date: "2 weeks ago",
                        review:
                          "Great value for the price. The templates cover all the important aspects of birth planning and are beautifully designed.",
                      },
                      {
                        name: "Michelle Davis",
                        rating: 4,
                        date: "3 weeks ago",
                        review:
                          "Very helpful templates that save me time. Would love to see a version for cesarean births included in future updates.",
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

        {/* Related Products */}
        <section className="border-t border-border bg-muted/20 px-4 py-12">
          <div className="container mx-auto">
            <h2 className="mb-6 font-serif text-2xl font-medium">Related Products</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Doula Business Starter Kit",
                  price: 49.99,
                  image: "/Businesskit.png",
                },
                {
                  title: "Labor Comfort Measures Poster Set",
                  price: 24.99,
                  image: "/laborcomfort.png",
                },
              ].map((product, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="aspect-[4/3] bg-muted">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-balance">{product.title}</h3>
                    <div className="mt-3 flex items-center justify-between">
                      <p className="font-serif text-xl font-medium">${product.price}</p>
                      <Button size="sm" variant="outline" className="bg-transparent">
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
