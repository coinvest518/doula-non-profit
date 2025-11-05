import Link from "next/link"
import { GraduationCap, Facebook, Instagram, Linkedin, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 font-serif text-lg font-medium">
              <GraduationCap className="h-5 w-5 text-primary" />
              <span>Atlanta Doula Academy</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Professional doula and maternity certification programs based in Atlanta, Georgia.
            </p>
            <div className="mt-4 flex gap-3">
              <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="mailto:info@atlantadoulaacademy.com"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold">Courses</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/courses" className="text-muted-foreground transition-colors hover:text-foreground">
                  All Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/courses/doula-certification"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Doula Certification
                </Link>
              </li>
              <li>
                <Link
                  href="/courses/postpartum-training"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Postpartum Training
                </Link>
              </li>
              <li>
                <Link
                  href="/courses/childbirth-educator"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Childbirth Educator
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Resources</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/products" className="text-muted-foreground transition-colors hover:text-foreground">
                  Digital Products
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground transition-colors hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground transition-colors hover:text-foreground">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-muted-foreground transition-colors hover:text-foreground">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Company</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground transition-colors hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground transition-colors hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground transition-colors hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground transition-colors hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Atlanta Doula Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
