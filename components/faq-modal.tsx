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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { HelpCircle } from "lucide-react"

interface FAQModalProps {
  children: React.ReactNode
}

const faqs = [
  {
    question: "What is a doula and what do they do?",
    answer: "A doula is a trained professional who provides continuous physical, emotional, and informational support to mothers before, during, and shortly after childbirth. Doulas do not provide medical care but focus on comfort measures, advocacy, and emotional support."
  },
  {
    question: "Do I need medical experience to become a doula?",
    answer: "No medical background is required! Our program is designed for anyone with a passion for supporting families. We provide all the training you need, including basic anatomy, birth processes, and comfort techniques."
  },
  {
    question: "How long does the certification program take?",
    answer: "Our complete doula certification program is 14 weeks long with 40 hours of comprehensive training. You can study at your own pace with lifetime access to all materials."
  },
  {
    question: "What's included in the certification program?",
    answer: "You'll receive full-spectrum birth and postpartum doula training, CPR & First Aid certification, trauma-informed care training, business startup support, Medicaid billing readiness, and real birth experience with mentorship."
  },
  {
    question: "How much can I earn as a doula?",
    answer: "Doulas typically earn $900-$2,500 per birth client and $25-$55/hour for postpartum support. Income varies by location, experience, and services offered. Many doulas also accept Medicaid reimbursement where available."
  },
  {
    question: "Is the certification nationally recognized?",
    answer: "Yes! Our program meets the standards of major doula organizations and is recognized nationwide. You'll be prepared to work in hospitals, birth centers, and home birth settings."
  },
  {
    question: "Can I work part-time as a doula?",
    answer: "Absolutely! Many doulas work part-time or build their practice gradually. The flexible nature of doula work allows you to choose your clients and schedule around other commitments."
  },
  {
    question: "What about Bebe Gaba organic baby food?",
    answer: "Bebe Gaba is our premium organic baby food line, created with the same care and attention we bring to doula training. It's part of our commitment to supporting families throughout their journey."
  },
  {
    question: "Do you offer payment plans?",
    answer: "Payment options will be available when enrollment opens. We're committed to making doula education accessible to everyone who feels called to this work."
  },
  {
    question: "When will courses be available for enrollment?",
    answer: "Our courses are coming soon! Sign up for our newsletter or contact us directly to be notified when enrollment opens."
  }
]

export function FAQModal({ children }: FAQModalProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-serif text-xl">
            <HelpCircle className="h-5 w-5 text-primary" />
            Frequently Asked Questions
          </DialogTitle>
          <DialogDescription>
            Common questions about our doula certification programs and services.
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh] pr-4">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollArea>
        
        <div className="border-t pt-4">
          <p className="text-sm text-muted-foreground text-center">
            Have more questions? <a href="mailto:Ashley.strong@fortisproles.org" className="text-primary hover:underline">Contact us directly</a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}