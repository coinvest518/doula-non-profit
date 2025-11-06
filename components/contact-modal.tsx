"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Mail, Calendar, Heart } from "lucide-react"

interface ContactModalProps {
  children: React.ReactNode
}

export function ContactModal({ children }: ContactModalProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-serif text-xl">
            <Heart className="h-5 w-5 text-primary" />
            Get in Touch
          </DialogTitle>
          <DialogDescription className="text-left">
            Ready to start your doula journey or have questions about our programs? 
            We're here to support you every step of the way.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 pt-4">
          <div className="rounded-lg bg-muted/50 p-4">
            <h3 className="font-medium text-sm mb-2">Free Consultation Available</h3>
            <p className="text-sm text-muted-foreground">
              Book a complimentary 15-minute consultation to discuss your goals, 
              learn about our programs, and get personalized guidance for your doula career.
            </p>
          </div>
          
          <div className="space-y-3">
            <Button 
              className="w-full justify-start" 
              asChild
              onClick={() => setOpen(false)}
            >
              <a href="mailto:Ashley.strong@fortisproles.org">
                <Mail className="mr-2 h-4 w-4" />
                Send Email
              </a>
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start bg-transparent"
              asChild
              onClick={() => setOpen(false)}
            >
              <a href="https://calendly.com/fortisproles" target="_blank" rel="noopener noreferrer">
                <Calendar className="mr-2 h-4 w-4" />
                Book Free Consultation
              </a>
            </Button>
          </div>
          
          <div className="text-center pt-2">
            <p className="text-xs text-muted-foreground">
              We typically respond within 24 hours
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}