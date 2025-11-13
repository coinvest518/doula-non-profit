"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ContactModal } from "@/components/contact-modal"
import { Menu, X, GraduationCap } from "lucide-react"
import { useState } from "react"

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-serif text-xl font-medium">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="text-balance">Fortis Proles Doula Academy</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="/courses"
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              Courses
            </Link>
            <Link
              href="/products"
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              Resources
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              About
            </Link>
            <Link
              href="/certificates"
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              Certificates
            </Link>
            <Link
              href="/investors"
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              Investors
            </Link>
            <ContactModal>
              <button className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground">
                Contact
              </button>
            </ContactModal>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Button variant="ghost" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-border py-4 md:hidden">
            <div className="flex flex-col gap-4">
              <Link
                href="/courses"
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                Courses
              </Link>
              <Link
                href="/products"
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                Resources
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/certificates"
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                Certificates
              </Link>
              <Link
                href="/investors"
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                Investors
              </Link>
              <ContactModal>
                <button 
                  className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground text-left"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </button>
              </ContactModal>
              <div className="flex flex-col gap-2 pt-2">
                <Button variant="ghost" asChild className="w-full">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild className="w-full">
                  <Link href="/signup">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
