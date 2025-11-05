import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Download, Star } from "lucide-react"

const products = [
  {
    id: "birth-plan-template-bundle",
    title: "Birth Plan Template Bundle",
    slug: "birth-plan-template-bundle",
    description: "Comprehensive birth plan templates for various birth settings",
    price: 29.99,
    category: "Templates",
    rating: 4.8,
    downloads: 1250,
    image: "/birth-plan-templates.jpg",
  },
  {
    id: "postpartum-care-guide",
    title: "Postpartum Care Guide for New Parents",
    slug: "postpartum-care-guide",
    description: "Complete guide covering the first 6 weeks postpartum",
    price: 19.99,
    category: "Guides",
    rating: 4.9,
    downloads: 2100,
    image: "/postpartum-care-guide.jpg",
  },
  {
    id: "doula-business-starter-kit",
    title: "Doula Business Starter Kit",
    slug: "doula-business-starter-kit",
    description: "Everything you need to launch your doula practice",
    price: 49.99,
    category: "Business",
    rating: 4.9,
    downloads: 850,
    image: "/doula-business-kit.jpg",
  },
  {
    id: "labor-comfort-measures-posters",
    title: "Labor Comfort Measures Poster Set",
    slug: "labor-comfort-measures-posters",
    description: "Visual guides for labor support techniques",
    price: 24.99,
    category: "Resources",
    rating: 4.7,
    downloads: 1500,
    image: "/labor-comfort-posters.jpg",
  },
  {
    id: "client-intake-forms-package",
    title: "Client Intake Forms Package",
    slug: "client-intake-forms-package",
    description: "Professional intake and assessment forms",
    price: 34.99,
    category: "Templates",
    rating: 4.8,
    downloads: 980,
    image: "/client-intake-forms.jpg",
  },
  {
    id: "breastfeeding-support-guide",
    title: "Breastfeeding Support Guide",
    slug: "breastfeeding-support-guide",
    description: "Comprehensive lactation support resource",
    price: 27.99,
    category: "Guides",
    rating: 4.9,
    downloads: 1650,
    image: "/breastfeeding-guide.jpg",
  },
]

export function ProductGrid() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{products.length} products available</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Card key={product.id} className="group overflow-hidden transition-shadow hover:shadow-lg">
            <div className="aspect-[4/3] overflow-hidden bg-muted">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <CardContent className="p-6">
              <div className="mb-3 flex items-center justify-between">
                <Badge variant="secondary">{product.category}</Badge>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="font-medium">{product.rating}</span>
                </div>
              </div>

              <h3 className="font-serif text-lg font-medium text-balance">{product.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{product.description}</p>

              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <Download className="h-4 w-4" />
                <span>{product.downloads.toLocaleString()} downloads</span>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <p className="font-serif text-2xl font-medium">${product.price}</p>
                <Button asChild>
                  <Link href={`/products/${product.slug}`}>View Details</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
