import { LoginForm } from "@/components/auth/login-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { GraduationCap } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-muted/20 px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 font-serif text-2xl font-medium" suppressHydrationWarning>
            <GraduationCap className="h-7 w-7 text-primary" />
            <span>Fortis Porles Doula Academy</span>
          </Link>
          <p className="mt-2 text-sm text-muted-foreground">Welcome back to your learning journey</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-2xl">Sign In</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/signup" className="font-medium text-primary hover:underline" suppressHydrationWarning>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
