# Course Structure Guide

## New Learning Model: Video + Study + Assessment

Your doula certification platform now uses a **video-focused learning model** instead of individual lesson videos. This is perfect when you have limited video content but rich study materials.

## How It Works

### 🎬 **Course Videos**
- **Main instructional videos** per course (not per lesson)
- Students watch these videos to understand core concepts
- Videos can be marked as preview content for non-enrolled users

### 📚 **Study Materials**  
- **Text-based lessons** with detailed course content
- Students read these materials to supplement video learning
- Lessons contain in-depth information, examples, and references

### ✅ **Assessment Ready**
- Students are tested on **video content** + **study materials**
- Quizzes/exams can reference specific topics from videos
- Clear learning path: Watch → Study → Test

## Configuration File
Location: `lib/video-config.ts`

## How to Add Course Videos

### 1. Main Course Videos
```typescript
{
  courseSlug: "complete-doula-certification",
  videoTitle: "Upright Positions | Beaumont Labor and Birth",
  videoUrl: "https://youtu.be/B6jkU_3CaeA",
  description: "Learn about upright positions during labor and birth",
  duration: "Educational Video",
  isPreview: true, // Available for preview
  topics: [
    "Upright labor positions",
    "Birth positioning benefits",
    "Labor progression techniques"
  ]
}
```

### 2. Your Current Videos
Based on your links, here's how to set them up:

```typescript
export const courseVideos: CourseVideo[] = [
  {
    courseSlug: "complete-doula-certification",
    videoTitle: "Upright Positions | Beaumont Labor and Birth",
    videoUrl: "https://youtu.be/B6jkU_3CaeA",
    description: "Learn about upright positions during labor and birth that can help with comfort and progression.",
    duration: "Educational Video", 
    isPreview: true, // Free preview
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
    isPreview: false, // Requires enrollment
    topics: [
      "Labor support strategies",
      "Communication with medical team", 
      "Comfort techniques",
      "Emotional support methods"
    ]
  }
];
```

### 3. Setting Free Previews
- Set `isPreview: true` for videos available without enrollment
- Preview users can watch these videos and see topics covered
- Enrollment required for full video access

## Quick Setup Steps

### Step 1: Find Your Course Data
1. Check your database or course files for exact:
   - Course slug (URL identifier)
   - Module titles
   - Lesson titles

### Step 2: Replace Placeholder URLs
1. Open `lib/video-config.ts`
2. Replace `https://www.youtube.com/watch?v=dQw4w9WgXcQ` with your actual video URLs
3. Update course slugs, module titles, and lesson titles to match your database

### Step 3: Set Preview Lessons
1. Choose 2-3 lessons per course to be free previews
2. Set `isPreview: true` for those lessons
3. These will be visible to non-enrolled users

## Example Configuration

```typescript
export const videoMappings: VideoMapping[] = [
  // Free Preview Lesson
  {
    courseSlug: "complete-doula-certification",
    moduleTitle: "Introduction to Doula Care",
    lessonTitle: "What is a Doula?",
    videoUrl: "https://www.youtube.com/watch?v=abc123def456",
    isPreview: true
  },
  
  // Paid Lesson
  {
    courseSlug: "complete-doula-certification", 
    moduleTitle: "Introduction to Doula Care",
    lessonTitle: "History and Philosophy of Doula Support",
    videoUrl: "https://www.youtube.com/watch?v=xyz789ghi012",
    isPreview: false
  },
  
  // Another Course
  {
    courseSlug: "advanced-birth-support",
    moduleTitle: "Advanced Techniques",
    lessonTitle: "Complex Birth Scenarios", 
    videoUrl: "https://vimeo.com/123456789",
    isPreview: false
  }
];
```

## Features

### Automatic Fallbacks
- If no video is configured, uses `DEFAULT_VIDEO_URL`
- If video URL is invalid, falls back to default
- Graceful handling of missing data

### Preview Mode
- Only shows lessons marked with `isPreview: true`
- Limits video playback to 30 seconds for locked content
- Shows enrollment prompts for locked lessons

### Video Player Integration
- Automatically uses Video.js with YouTube support
- Handles various video formats
- Responsive design for all devices

## Troubleshooting

### Video Not Playing?
1. Check if the URL is valid and accessible
2. Ensure Video.js supports the format
3. Verify the course slug, module title, and lesson title match exactly

### Preview Not Working?
1. Confirm `isPreview: true` is set
2. Check that lesson titles match the database exactly
3. Ensure you're accessing `/courses/[slug]/preview` route

### Need to Update Videos?
1. Edit `lib/video-config.ts`
2. Save the file
3. Changes take effect immediately (no restart needed)

## Tips
- Use descriptive, consistent naming for modules and lessons
- Test preview mode before publishing courses  
- Keep video URLs organized by course and module
- Consider using a CDN for faster video loading
- YouTube videos work great for easy hosting and management