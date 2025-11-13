"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle, ArrowLeft, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <XCircle className="h-16 w-16 text-orange-500 mx-auto mb-4" />
          <CardTitle className="text-2xl font-serif">Payment Cancelled</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div>
            <p className="text-muted-foreground mb-4">
              Your payment was cancelled. No charges have been made to your account.
            </p>
            <p className="text-sm text-muted-foreground">
              You can try again anytime or contact us if you need assistance.
            </p>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">Still Interested?</h4>
            <p className="text-sm text-blue-800">
              The Complete Doula Certification course is still available. 
              You can enroll anytime to start your journey.
            </p>
          </div>

          <div className="space-y-3">
            <Link href="/courses/complete-doula-certification">
              <Button size="lg" className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Course
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="w-full">
                <MessageCircle className="mr-2 h-4 w-4" />
                Contact Support
              </Button>
            </Link>
            <Link href="/">
              <Button variant="ghost" size="lg" className="w-full">
                Return Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}