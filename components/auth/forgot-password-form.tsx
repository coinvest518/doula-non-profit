"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, CheckCircle2 } from "lucide-react"

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [email, setEmail] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // TODO: Implement Supabase password reset
    // const supabase = getSupabaseBrowserClient()
    // const { error } = await supabase.auth.resetPasswordForEmail(email, {
    //   redirectTo: `${window.location.origin}/reset-password`,
    // })

    console.log("[v0] Password reset requested for:", email)

    setIsLoading(false)
    setIsSuccess(true)
  }

  if (isSuccess) {
    return (
      <div className="space-y-4 text-center">
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 className="h-8 w-8 text-primary" />
          </div>
        </div>
        <div>
          <h3 className="font-medium">Check your email</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            We've sent a password reset link to <span className="font-medium">{email}</span>
          </p>
        </div>
        <Button variant="outline" className="w-full bg-transparent" onClick={() => setIsSuccess(false)}>
          Send another link
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending reset link...
          </>
        ) : (
          "Send Reset Link"
        )}
      </Button>
    </form>
  )
}
