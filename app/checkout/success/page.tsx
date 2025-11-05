import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle2, Download, ArrowRight } from "lucide-react"

export default function CheckoutSuccessPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-muted/20 px-4 py-12">
      <div className="w-full max-w-2xl space-y-8">
        <Card className="border-primary/20">
          <CardContent className="p-12 text-center">
            <div className="flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle2 className="h-10 w-10 text-primary" />
              </div>
            </div>

            <h1 className="mt-6 font-serif text-3xl font-medium">Payment Successful!</h1>
            <p className="mt-3 text-lg text-muted-foreground">
              Thank you for your purchase. Your order has been confirmed.
            </p>

            <div className="mt-8 rounded-lg border border-border bg-muted/30 p-6">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order number</span>
                  <span className="font-medium">#ADA-2024-001</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium">March 20, 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total</span>
                  <span className="font-medium">$531.79</span>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <Button size="lg" className="w-full" asChild>
                <Link href="/dashboard">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full bg-transparent" asChild>
                <Link href="/checkout/receipt">
                  <Download className="mr-2 h-4 w-4" />
                  Download Receipt
                </Link>
              </Button>
            </div>

            <p className="mt-6 text-sm text-muted-foreground">
              A confirmation email has been sent to your email address with your order details and access instructions.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-primary/5 to-secondary/10">
          <CardContent className="p-6">
            <h2 className="font-serif text-xl font-medium">What's Next?</h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span>Access your course immediately from your dashboard</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span>Start learning at your own pace with lifetime access</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span>Earn your professional certification upon completion</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
