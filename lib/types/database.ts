export interface Profile {
  id: string
  email: string | null
  full_name: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface Course {
  id: string
  title: string
  slug: string
  description: string | null
  long_description: string | null
  price: number | null
  duration_hours: number | null
  level: "beginner" | "intermediate" | "advanced" | null
  thumbnail_url: string | null
  is_published: boolean
  certification_included: boolean
  instructor_id: string | null
  created_at: string
  updated_at: string
}

export interface Instructor {
  id: string
  name: string
  title: string | null
  bio: string | null
  avatar_url: string | null
  email: string | null
  created_at: string
  updated_at: string
}

export interface CourseModule {
  id: string
  course_id: string
  title: string
  description: string | null
  order_index: number
  created_at: string
}

export interface CourseLesson {
  id: string
  module_id: string
  title: string
  content: string | null
  video_url: string | null
  duration_minutes: number | null
  order_index: number
  is_free_preview: boolean
  created_at: string
}

export interface Enrollment {
  id: string
  user_id: string
  course_id: string
  enrolled_at: string
  completed_at: string | null
  progress: number
}

export interface Certification {
  id: string
  user_id: string
  course_id: string
  certificate_number: string
  issued_at: string
  expires_at: string | null
  is_valid: boolean
}

export interface DigitalProduct {
  id: string
  title: string
  slug: string
  description: string | null
  price: number
  thumbnail_url: string | null
  file_url: string | null
  file_type: string | null
  category: string | null
  is_published: boolean
  download_count: number
  created_at: string
  updated_at: string
}

export interface ProductPurchase {
  id: string
  user_id: string
  product_id: string
  purchased_at: string
  payment_status: "pending" | "completed" | "failed"
  stripe_payment_id: string | null
  download_count: number
}
