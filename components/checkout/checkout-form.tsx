"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Lock, CreditCard, CheckCircle2 } from "lucide-react"

// Mock cart data - would come from state management or URL params
const cartItems = [
  {
    id: "1",
    type: "course",
    title: "Complete Doula Certification Program",
    price: 497.0,
    image: "/doula-certification-training-classroom.jpg",
  },
]

export function CheckoutForm() {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
    name: "",
    country: "US",
    zip: "",
  })

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0)
  const tax = subtotal * 0.07 // 7% tax
  const total = subtotal + tax

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // TODO: Implement Stripe payment
    // const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
    // const { error } = await stripe.confirmPayment({...})

    console.log("[v0] Payment processed for:", formData.email)

    setIsProcessing(false)
    router.push("/checkout/success")
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Payment Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                <p className="text-xs text-muted-foreground">Receipt will be sent to this email</p>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  <Label>Card Information</Label>
                </div>

                <div className="space-y-2">
                  <Input
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Input
                      placeholder="MM / YY"
                      value={formData.expiry}
                      onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      placeholder="CVC"
                      value={formData.cvc}
                      onChange={(e) => setFormData({ ...formData, cvc: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <Label>Billing Information</Label>

                <div className="space-y-2">
                  <Input
                    placeholder="Full name on card"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Input
                      placeholder="Country"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      placeholder="ZIP code"
                      value={formData.zip}
                      onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={isProcessing}>
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing payment...
                  </>
                ) : (
                  <>
                    <Lock className="mr-2 h-4 w-4" />
                    Pay ${total.toFixed(2)}
                  </>
                )}
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                Your payment information is secure and encrypted
              </p>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Order Summary */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="h-20 w-20 overflow-hidden rounded-lg bg-muted">
                  <img src={item.image || "/placeholder.svg"} alt={item.title} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm text-balance">{item.title}</h3>
                  <Badge variant="secondary" className="mt-1">
                    {item.type === "course" ? "Course" : "Digital Product"}
                  </Badge>
                  <p className="mt-2 font-medium">${item.price.toFixed(2)}</p>
                </div>
              </div>
            ))}

            <Separator />

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span className="font-serif text-xl">${total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div className="space-y-1 text-sm">
                <p className="font-medium">What you'll get:</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Instant access to course materials</li>
                  <li>• Lifetime access to content</li>
                  <li>• Certificate upon completion</li>
                  <li>• 30-day money-back guarantee</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
