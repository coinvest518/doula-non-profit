/**
 * Stripe Payment Link Integration
 * Handles payment processing with user tracking for the doula certification platform
 */

const STRIPE_PAYMENT_LINK = "https://donate.stripe.com/14AbJ13nQ62Ka5ddM4ew80q";

interface PaymentLinkOptions {
  userId?: string;
  userEmail?: string;
}

/**
 * Creates a payment link URL with user tracking and custom redirect URLs
 */
export function createPaymentLink(options: PaymentLinkOptions = {}, courseSlug?: string): string {
  const { userId, userEmail } = options;

  const url = new URL(STRIPE_PAYMENT_LINK);
  
  if (userId) {
    url.searchParams.append('client_reference_id', userId);
  }
  
  if (userEmail) {
    url.searchParams.append('prefilled_email', userEmail);
  }
  
  if (courseSlug) {
    url.searchParams.append('metadata[course_slug]', courseSlug);
  }
  
  return url.toString();
}

/**
 * Creates enrollment link for authenticated users
 */
export function createEnrollmentLink(user: { id: string; email?: string; user_metadata?: { full_name?: string } }, courseSlug?: string): string {
  return createPaymentLink({
    userId: user.id,
    userEmail: user.email || ''
  }, courseSlug);
}

/**
 * Creates anonymous payment link (for users not logged in)
 */
export function createAnonymousPaymentLink(): string {
  return createPaymentLink();
}

/**
 * Extract user ID from payment success callback
 */
export function extractUserIdFromCallback(searchParams: URLSearchParams): string | null {
  return searchParams.get('client_reference_id');
}

export { STRIPE_PAYMENT_LINK };
