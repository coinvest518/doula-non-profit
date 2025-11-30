"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, ExternalLink } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { createEnrollmentLink } from "@/lib/payment/stripe-links";
import { checkCourseEnrollment } from "@/lib/supabase/user-enrollment";
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
    let isMounted = true;

    const checkUserAndEnrollment = async () => {
      try {
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        if (!isMounted) return;
        setUser(currentUser);

        if (currentUser) {
          const enrolled = await checkCourseEnrollment(supabase, currentUser.id, courseSlug);
          if (isMounted) setIsEnrolled(enrolled);
        }
      } catch (error) {
        console.error('Error checking enrollment:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    checkUserAndEnrollment();
    return () => {
      isMounted = false;
    };
  }, [courseSlug, supabase]);

  const handleEnrollment = () => {
    if (user) {
      const paymentUrl = createEnrollmentLink(user);
      window.open(paymentUrl, '_blank');
    } else {
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

  if (isEnrolled) {
    return (
      <Button size={size} variant={variant} className={className} asChild>
        <Link href={`/courses/${courseSlug}/learn`}>
          Continue Learning
        </Link>
      </Button>
    );
  }

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
