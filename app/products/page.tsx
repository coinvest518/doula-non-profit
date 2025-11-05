import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ProductFilters } from "@/components/products/product-filters"
import { ProductGrid } from "@/components/products/product-grid"
import { Suspense } from "react"

export default function ProductsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Header */}
        <section className="border-b border-border bg-muted/20 px-4 py-16">
          <div className="container mx-auto">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="font-serif text-4xl font-medium text-balance md:text-5xl">
                Digital Resources & Templates
              </h1>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed text-pretty">
                Professional tools and resources to support your doula practice. Instantly downloadable templates,
                guides, and business materials.
              </p>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="px-4 py-12">
          <div className="container mx-auto">
            <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
              <aside>
                <Suspense fallback={<div>Loading filters...</div>}>
                  <ProductFilters />
                </Suspense>
              </aside>

              <div>
                <Suspense fallback={<div>Loading products...</div>}>
                  <ProductGrid />
                </Suspense>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
