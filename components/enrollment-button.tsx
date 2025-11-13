"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, ExternalLink } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { createEnrollmentLink, createAnonymousPaymentLink } from "@/lib/payment/stripe-links";
import Link from "next/link";

interface EnrollmentButtonProps {
  courseSlug: string;
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  className?: string;
  children?: React.ReactNode;
}

export default function EnrollmentButton({ 
  courseSlug, 
  size = "lg", 
  variant = "default", 
  className = "",
  children = "Enroll Now - $497"
}: EnrollmentButtonProps) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const supabase = getSupabaseBrowserClient();

  useEffect(() => {
    const checkUserAndEnrollment = async () => {
      try {
        // Check if user is authenticated
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        setUser(currentUser);

        if (currentUser) {
          // Check if user is already enrolled
          const { data: course } = await supabase
            .from('courses')
            .select('id')
            .eq('slug', courseSlug)
            .single();

          if (course) {
            const { data: enrollment } = await (supabase as any)
              .from('enrollments')
              .select('*')
              .eq('user_id', currentUser.id)
              .eq('course_id', course.id)
              .single();

            setIsEnrolled(!!enrollment);
          }
        }
      } catch (error) {
        console.error('Error checking enrollment:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUserAndEnrollment();
  }, [courseSlug, supabase]);

  const handleEnrollment = () => {
    if (user) {
      // User is authenticated - create payment link with tracking
      const paymentUrl = createEnrollmentLink(user);
      window.open(paymentUrl, '_blank');
    } else {
      // User not authenticated - redirect to signup first
      window.location.href = '/signup';
    }
  };

  if (loading) {
    return (
      <Button size={size} variant={variant} className={className} disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </Button>
    );
  }

  // If user is already enrolled, show "Continue Learning" button
  if (isEnrolled) {
    return (
      <Button size={size} variant={variant} className={className} asChild>
        <Link href={`/courses/${courseSlug}/learn`}>
          Continue Learning
        </Link>
      </Button>
    );
  }

  // If user is authenticated but not enrolled
  if (user) {
    return (
      <Button 
        size={size} 
        variant={variant} 
        className={className}
        onClick={handleEnrollment}
      >
        {children}
        <ExternalLink className="ml-2 h-4 w-4" />
      </Button>
    );
  }

  // User not authenticated - redirect to signup
  return (
    <Button 
      size={size} 
      variant={variant} 
      className={className}
      onClick={() => window.location.href = '/signup'}
    >
      Sign Up to Enroll
    </Button>
  );
}