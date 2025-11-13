"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export default function PaymentSuccessPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [enrolled, setEnrolled] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get client_reference_id from URL parameters (this is the user ID we'll pass)
  const clientReferenceId = searchParams.get('client_reference_id');
  const supabase = getSupabaseBrowserClient();

  useEffect(() => {
    const processEnrollment = async () => {
      try {
        // Get current user
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        
        if (authError || !user) {
          setError("Please sign in to complete enrollment");
          setLoading(false);
          return;
        }

        // Check if user is already enrolled in the doula certification course
        const { data: existingEnrollment } = await (supabase as any)
          .from('enrollments')
          .select('*')
          .eq('user_id', user.id)
          .eq('course_id', 'course_id_for_doula_cert') // We'll need to get the actual course ID
          .single();

        if (existingEnrollment) {
          setEnrolled(true);
          setLoading(false);
          return;
        }

        // Get the course ID for Complete Doula Certification
        const { data: course } = await supabase
          .from('courses')
          .select('id')
          .eq('slug', 'complete-doula-certification')
          .single();

        if (course) {
          // Create enrollment record
          const { error: enrollmentError } = await (supabase as any)
            .from('enrollments')
            .insert({
              user_id: user.id,
              course_id: course.id,
              enrolled_at: new Date().toISOString(),
              payment_status: 'completed'
            });

          if (enrollmentError) {
            console.error('Enrollment error:', enrollmentError);
            setError("Failed to complete enrollment. Please contact support.");
          } else {
            setEnrolled(true);
          }
        } else {
          setError("Course not found. Please contact support.");
        }
      } catch (err) {
        console.error('Payment processing error:', err);
        setError("An error occurred. Please contact support.");
      } finally {
        setLoading(false);
      }
    };

    processEnrollment();
  }, [supabase, clientReferenceId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Processing Your Payment...</h2>
          <p className="text-muted-foreground">Please wait while we complete your enrollment</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-red-600">Payment Processing Error</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">{error}</p>
            <div className="space-y-2">
              <Link href="/login">
                <Button className="w-full">Sign In</Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="w-full">Contact Support</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-lg w-full">
        <CardHeader className="text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <CardTitle className="text-2xl font-serif">Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Welcome to Complete Doula Certification!</h3>
            <p className="text-muted-foreground">
              Your payment has been processed successfully and you're now enrolled in the course.
            </p>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-900 mb-2">What's Next?</h4>
            <ul className="text-sm text-green-800 text-left space-y-1">
              <li>• Access all 11 modules and course videos</li>
              <li>• Complete quizzes for each module</li>
              <li>• Track your progress through the certification</li>
              <li>• Earn your doula certification upon completion</li>
            </ul>
          </div>

          <div className="space-y-3">
            <Link href="/courses/complete-doula-certification/learn">
              <Button size="lg" className="w-full">
                Start Learning Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="lg" className="w-full">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}