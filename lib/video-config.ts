// Course Video Configuration
// Link main instructional videos to courses for study and assessment

export interface CourseVideo {
  courseSlug: string;
  videoTitle: string;
  videoUrl: string;
  description: string;
  duration?: string;
  isPreview?: boolean;
  topics?: string[]; // Topics covered in this video
}

export const courseVideos: CourseVideo[] = [
  // Complete Doula Certification Course - Main Videos
  {
    courseSlug: "complete-doula-certification",
    videoTitle: "Upright Positions | Beaumont Labor and Birth",
    videoUrl: "https://youtu.be/B6jkU_3CaeA",
    description: "Learn about upright positions during labor and birth that can help with comfort and progression.",
    duration: "Educational Video",
    isPreview: true, // This video is available for preview
    topics: [
      "Upright labor positions",
      "Birth positioning benefits", 
      "Labor progression techniques",
      "Comfort measures during birth"
    ]
  },
  {
    courseSlug: "complete-doula-certification", 
    videoTitle: "Advanced Labor Support Techniques",
    videoUrl: "https://youtu.be/Z6InDDGdXF0",
    description: "Comprehensive guide to supporting clients through various stages of labor.",
    duration: "Full Training Video",
    isPreview: false,
    topics: [
      "Labor support strategies",
      "Communication with medical team",
      "Comfort techniques",
      "Emotional support methods"
    ]
  }
];

// Legacy lesson-level mappings (keeping for compatibility)
export interface VideoMapping {
  lessonId?: string;
  lessonTitle?: string;
  moduleTitle?: string;
  courseSlug?: string;
  videoUrl: string;
  isPreview?: boolean;
}

export const videoMappings: VideoMapping[] = [
  // These are now primarily for text-based lessons with references to main videos
  {
    courseSlug: "complete-doula-certification",
    moduleTitle: "Introduction to Doula Care",
    lessonTitle: "History and Philosophy of Doula Support",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Replace with actual video
    isPreview: false
  },
  {
    courseSlug: "complete-doula-certification",
    moduleTitle: "Introduction to Doula Care",
    lessonTitle: "The Doula's Role and Scope of Practice",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Replace with actual video
    isPreview: false
  },
  
  // Prenatal Support Module
  {
    courseSlug: "complete-doula-certification",
    moduleTitle: "Prenatal Support and Education",
    lessonTitle: "Understanding Pregnancy Physiology",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Replace with actual video
    isPreview: true // Another free preview
  },
  {
    courseSlug: "complete-doula-certification",
    moduleTitle: "Prenatal Support and Education",
    lessonTitle: "Nutrition and Wellness During Pregnancy",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Replace with actual video
    isPreview: false
  },
  {
    courseSlug: "complete-doula-certification",
    moduleTitle: "Prenatal Support and Education",
    lessonTitle: "Birth Planning and Preferences",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Replace with actual video
    isPreview: false
  },
  
  // Labor Support Module
  {
    courseSlug: "complete-doula-certification",
    moduleTitle: "Labor Support Techniques",
    lessonTitle: "Stages of Labor Overview",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Replace with actual video
    isPreview: false
  },
  {
    courseSlug: "complete-doula-certification",
    moduleTitle: "Labor Support Techniques",
    lessonTitle: "Comfort Measures and Pain Management",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Replace with actual video
    isPreview: false
  },
  {
    courseSlug: "complete-doula-certification",
    moduleTitle: "Labor Support Techniques",
    lessonTitle: "Positioning and Movement During Labor",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Replace with actual video
    isPreview: false
  },
  
  // Communication Module
  {
    courseSlug: "complete-doula-certification",
    moduleTitle: "Communication and Advocacy",
    lessonTitle: "Effective Communication with Clients",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Replace with actual video
    isPreview: false
  },
  {
    courseSlug: "complete-doula-certification",
    moduleTitle: "Communication and Advocacy",
    lessonTitle: "Working with Healthcare Providers",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Replace with actual video
    isPreview: false
  },
  {
    courseSlug: "complete-doula-certification",
    moduleTitle: "Communication and Advocacy",
    lessonTitle: "Informed Consent and Decision Making",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Replace with actual video
    isPreview: false
  },
  
  // Postpartum Support Module
  {
    courseSlug: "complete-doula-certification",
    moduleTitle: "Postpartum Support and Recovery",
    lessonTitle: "Physical Recovery After Birth",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Replace with actual video
    isPreview: false
  },
  {
    courseSlug: "complete-doula-certification",
    moduleTitle: "Postpartum Support and Recovery",
    lessonTitle: "Emotional Support and Mental Health",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Replace with actual video
    isPreview: false
  },
  {
    courseSlug: "complete-doula-certification",
    moduleTitle: "Postpartum Support and Recovery",
    lessonTitle: "Breastfeeding Support Basics",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Replace with actual video
    isPreview: false
  },
  
  // Professional Practice Module
  {
    courseSlug: "complete-doula-certification",
    moduleTitle: "Professional Practice and Business",
    lessonTitle: "Starting Your Doula Practice",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Replace with actual video
    isPreview: false
  },
  {
    courseSlug: "complete-doula-certification",
    moduleTitle: "Professional Practice and Business",
    lessonTitle: "Client Contracts and Documentation",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Replace with actual video
    isPreview: false
  },
  {
    courseSlug: "complete-doula-certification",
    moduleTitle: "Professional Practice and Business",
    lessonTitle: "Ethics and Professional Standards",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Replace with actual video
    isPreview: false
  }
];

// Helper function to get main course videos
export function getCourseVideos(courseSlug: string): CourseVideo[] {
  return courseVideos.filter(video => video.courseSlug === courseSlug);
}

// Helper function to get preview videos for a course
export function getPreviewVideos(courseSlug: string): CourseVideo[] {
  return courseVideos.filter(video => 
    video.courseSlug === courseSlug && video.isPreview === true
  );
}

// Helper function to get the main video for course learning
export function getMainCourseVideo(courseSlug: string): CourseVideo | null {
  const videos = getCourseVideos(courseSlug);
  return videos.length > 0 ? videos[0] : null;
}

// Legacy functions (keeping for compatibility)
export function getVideoForLesson(
  courseSlug: string, 
  moduleTitle: string, 
  lessonTitle: string
): string | null {
  // First check if there's a main course video
  const mainVideo = getMainCourseVideo(courseSlug);
  if (mainVideo) {
    return mainVideo.videoUrl;
  }
  
  // Fallback to lesson-specific mapping
  const mapping = videoMappings.find(
    (mapping) => 
      mapping.courseSlug === courseSlug &&
      mapping.moduleTitle === moduleTitle &&
      mapping.lessonTitle === lessonTitle
  );
  
  return mapping?.videoUrl || null;
}

export function isLessonFreePreview(
  courseSlug: string, 
  moduleTitle: string, 
  lessonTitle: string
): boolean {
  // Check if the main course video is preview
  const mainVideo = getMainCourseVideo(courseSlug);
  if (mainVideo) {
    return mainVideo.isPreview || false;
  }
  
  // Fallback to lesson-specific mapping
  const mapping = videoMappings.find(
    (mapping) => 
      mapping.courseSlug === courseSlug &&
      mapping.moduleTitle === moduleTitle &&
      mapping.lessonTitle === lessonTitle
  );
  
  return mapping?.isPreview || false;
}

export function getVideosForCourse(courseSlug: string): VideoMapping[] {
  return videoMappings.filter(mapping => mapping.courseSlug === courseSlug);
}

// Default fallback video (replace with your default video)
export const DEFAULT_VIDEO_URL = "https://www.youtube.com/watch?v=Z6InDDGdXF0";