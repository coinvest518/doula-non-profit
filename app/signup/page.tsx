import { SignupForm } from "@/components/auth/signup-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { GraduationCap } from "lucide-react"

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-muted/20 px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 font-serif text-2xl font-medium">
            <GraduationCap className="h-7 w-7 text-primary" />
            <span>Fortis Porles Doula Academy</span>
          </Link>
          <p className="mt-2 text-sm text-muted-foreground">Start your doula certification journey today</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-2xl">Create Account</CardTitle>
            <CardDescription>Sign up to access our certification programs</CardDescription>
          </CardHeader>
          <CardContent>
            <SignupForm />
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
