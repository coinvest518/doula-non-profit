import { CheckoutForm } from "@/components/checkout/checkout-form"
import Link from "next/link"
import { GraduationCap, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CheckoutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-muted/20">
      <header className="border-b border-border bg-background px-4 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-serif text-xl font-medium">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span>Fortis Porles Doula Academy</span>
          </Link>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/courses">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Courses
            </Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 px-4 py-12">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h1 className="font-serif text-3xl font-medium">Complete Your Purchase</h1>
            <p className="mt-2 text-muted-foreground">Secure checkout powered by Stripe</p>
          </div>

          <CheckoutForm />
        </div>
      </main>
    </div>
  )
}
