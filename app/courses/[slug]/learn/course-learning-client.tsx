"use client";

import { useState, useEffect } from "react";
import { CourseWithModules } from "@/lib/supabase/courses";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Lock, Play, PlayCircle, Share2, Bookmark, Star, Users, Video, BookOpen, ClipboardCheck } from "lucide-react";
import Link from "next/link";
import { getVideoForLesson, isLessonFreePreview, DEFAULT_VIDEO_URL, getCourseVideos } from "@/lib/video-config";
import { CourseVideosSection } from "@/components/course-videos-section";
import { QuizTake } from "@/components/quiz-take";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EnrollmentButton from "@/components/enrollment-button";

function isValidVideoUrl(url: string): boolean {
    try {
        const parsedUrl = new URL(url);
        
        // Allow direct video files that Video.js supports
        const videoExtensions = ['.mp4', '.webm', '.ogg', '.m4v', '.mov', '.avi', '.mkv', '.m3u8'];
        if (videoExtensions.some(ext => parsedUrl.pathname.toLowerCase().endsWith(ext))) {
            return parsedUrl.protocol === 'https:' || parsedUrl.protocol === 'http:';
        }
        
        // Allow YouTube URLs
        const youtubeDomains = ['youtube.com', 'www.youtube.com', 'youtu.be', 'm.youtube.com'];
        if (youtubeDomains.includes(parsedUrl.hostname)) {
            return parsedUrl.protocol === 'https:' || parsedUrl.protocol === 'http:';
        }
        
        // Allow CDN and cloud storage domains
        const allowedDomains = [
            // Cloud storage
            'amazonaws.com', 's3.amazonaws.com', 'cloudfront.net',
            'googleusercontent.com', 'googleapis.com',
            'azure.net', 'azureedge.net',
            // CDNs
            'cdn.jsdelivr.net', 'unpkg.com', 'cdnjs.cloudflare.com',
            // Video platforms
            'vimeo.com', 'wistia.com', 'fast.wistia.net'
        ];
        
        return (allowedDomains.some(domain => parsedUrl.hostname.includes(domain)) ||
                parsedUrl.hostname.includes('.amazonaws.com') ||
                parsedUrl.hostname.includes('.cloudfront.net')) &&
               (parsedUrl.protocol === 'https:' || parsedUrl.protocol === 'http:');
    } catch {
        return false;
    }
}

function escapeHtml(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;');
}

function formatContent(content: string): string {
    // First escape all HTML to prevent XSS
    const escaped = escapeHtml(content);
    
    // Then apply safe formatting
    return escaped
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
        .replace(/\n\n/g, '<br><br>')
        .replace(/• (.*?)(?=\n|$)/g, '<li class="ml-4 mb-2">$1</li>')
        .replace(/(<li.*?<\/li>)/g, '<ul class="list-disc list-inside space-y-2 my-4">$1</ul>')
        .replace(/<\/ul>\s*<ul[^>]*>/g, '')
        .replace(/\n/g, '<br>');
}

interface CourseLearningClientProps {
    course: CourseWithModules;
    isPreview?: boolean;
}

export function CourseLearningClient({ course, isPreview = false }: CourseLearningClientProps) {
    // In preview mode, only show free preview lessons (using video config)
    const previewLessons = isPreview 
        ? course.course_modules?.flatMap(module => 
            module.course_lessons?.filter(lesson => 
                isLessonFreePreview(course.slug, module.title, lesson.title)
            ) || []
          ) || []
        : [];
    
    const [activeLesson, setActiveLesson] = useState(
        isPreview 
            ? previewLessons[0] || course.course_modules?.[0]?.course_lessons?.[0]
            : course.course_modules?.[0]?.course_lessons?.[0]
    );
    const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleLessonClick = (lesson: any, moduleTitle: string) => {
        // In preview mode, only allow access to free preview lessons (using video config)
        const isFreePreview = isLessonFreePreview(course.slug, moduleTitle, lesson.title);
        if (isPreview && !isFreePreview) {
            return; // Don't allow clicking locked lessons in preview
        }
        setActiveLesson(lesson);
    };

    // Get the video URL for the active lesson using our configuration
    const getActiveVideoUrl = () => {
        if (!activeLesson) return DEFAULT_VIDEO_URL;
        
        // Find the module that contains this lesson
        const parentModule = course.course_modules?.find(module => 
            module.course_lessons?.some(lesson => lesson.id === activeLesson.id)
        );
        
        if (!parentModule) return DEFAULT_VIDEO_URL;
        
        // Get video URL from configuration
        const configVideo = getVideoForLesson(course.slug, parentModule.title, activeLesson.title);
        
        // Fallback to lesson's video_url, then database URL, then default
        return configVideo || 
               (activeLesson.video_url && isValidVideoUrl(activeLesson.video_url) ? activeLesson.video_url : null) ||
               DEFAULT_VIDEO_URL;
    };

    const handleToggleComplete = (lessonId: string) => {
        const newCompleted = new Set(completedLessons);
        if (newCompleted.has(lessonId)) {
            newCompleted.delete(lessonId);
        } else {
            newCompleted.add(lessonId);
        }
        setCompletedLessons(newCompleted);
    };

    const totalLessons = course.course_modules?.reduce((acc, module) => acc + (module.course_lessons?.length || 0), 0) || 0;
    const progress = totalLessons > 0 ? (completedLessons.size / totalLessons) * 100 : 0;
    const courseCompletion = `${completedLessons.size}/${totalLessons}`;

    // Get course videos for the new video-focused approach
    const courseVideos = getCourseVideos(course.slug);

    return (
        <div className="flex w-full flex-1">
            {/* Main Content (Left) */}
            <div className="flex-1 p-6 lg:p-8">
                <div className="mb-4 text-sm text-muted-foreground">
                    <span>{isPreview ? 'Course Preview' : 'My Course'} &gt; </span>
                    <span className="text-foreground">{course.title}</span>
                </div>
                
                {isPreview && (
                    <div className="mb-6 p-4 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold text-lg">📚 Course Preview Mode</h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                    You're viewing {previewLessons.length} free lesson(s). Enroll to access all {totalLessons} lessons!
                                </p>
                            </div>
                            <EnrollmentButton courseSlug={course.slug} size="lg" className="bg-primary hover:bg-primary/90">
                                Enroll Now - $497
                            </EnrollmentButton>
                        </div>
                    </div>
                )}
                
                <div className="flex justify-between items-center mb-6">
                    <h1 className="font-serif text-3xl lg:text-4xl font-bold">{course.title}</h1>
                </div>

                {/* Course Content Tabs */}
                <Tabs defaultValue="videos" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="videos" className="flex items-center gap-2">
                            <Video className="w-4 h-4" />
                            Course Videos
                        </TabsTrigger>
                        <TabsTrigger value="lessons" className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4" />
                            Study Materials
                        </TabsTrigger>
                        <TabsTrigger value="quizzes" className="flex items-center gap-2">
                            <ClipboardCheck className="w-4 h-4" />
                            Quizzes
                        </TabsTrigger>
                    </TabsList>

                    {/* Videos Tab */}
                    <TabsContent value="videos" className="mt-6">
                        <CourseVideosSection 
                            videos={courseVideos}
                            isPreview={isPreview}
                            courseSlug={course.slug}
                        />
                    </TabsContent>

                    {/* Lessons Tab */}
                    <TabsContent value="lessons" className="mt-6">
                        <div className="max-w-4xl mx-auto space-y-6">
                            <div className="text-center py-8">
                                <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                                <h3 className="font-serif text-2xl font-medium mb-2">Study Materials</h3>
                                <p className="text-muted-foreground mb-6">
                                    Review the course content and materials that supplement the instructional videos
                                </p>
                                {!isPreview && activeLesson && (
                                    <Button onClick={() => handleToggleComplete(activeLesson.id)}>
                                        {completedLessons.has(activeLesson.id) ? 'Mark as Incomplete' : 'Mark as Complete'}
                                    </Button>
                                )}
                            </div>

                            {activeLesson && activeLesson.content && (
                                <div className="max-w-none p-8 border rounded-lg bg-muted/20">
                                    <h2 className="font-serif text-xl font-semibold mb-4">{activeLesson.title}</h2>
                                    <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: formatContent(activeLesson.content) }} />
                                </div>
                            )}

                            <div className="prose max-w-none">
                                <h2 className="font-serif text-2xl font-semibold">About This Course</h2>
                                <p>{course.description}</p>
                                
                                {isPreview && (
                                    <div className="not-prose mt-8 p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10 rounded-xl">
                                        <div className="text-center">
                                            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                                                <Lock className="w-8 h-8 text-primary" />
                                            </div>
                                            <h3 className="text-xl font-semibold mb-2">Unlock Full Course Access</h3>
                                            <p className="text-muted-foreground mb-4">
                                                Get instant access to all {totalLessons} lessons, downloadable resources, and certification upon completion.
                                            </p>
                                            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground mb-6">
                                                <div className="flex items-center gap-1">
                                                    <Users className="w-4 h-4" />
                                                    <span>500+ Students</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Star className="w-4 h-4 fill-current text-yellow-500" />
                                                    <span>4.9 Rating</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <PlayCircle className="w-4 h-4" />
                                                    <span>{course.duration_hours}+ Hours</span>
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <EnrollmentButton courseSlug={course.slug} size="lg" className="w-full bg-primary hover:bg-primary/90">
                                                    Enroll Now - $497
                                                </EnrollmentButton>
                                                <Link href="/login" className="block">
                                                    <Button variant="outline" size="lg" className="w-full">
                                                        Already have an account? Sign In
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </TabsContent>

                    {/* Quizzes Tab */}
                    <TabsContent value="quizzes" className="mt-6">
                        <div className="max-w-4xl mx-auto space-y-6">
                            <div className="text-center py-8">
                                <ClipboardCheck className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                                <h3 className="font-serif text-2xl font-medium mb-2">Course Quizzes</h3>
                                <p className="text-muted-foreground mb-6">
                                    Test your knowledge with module quizzes. Complete the videos and study materials first.
                                </p>
                                
                                {isPreview ? (
                                    <div className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10 rounded-xl">
                                        <Lock className="w-12 h-12 text-primary mx-auto mb-4" />
                                        <h4 className="text-lg font-semibold mb-2">Quizzes Available After Enrollment</h4>
                                        <p className="text-muted-foreground mb-4">
                                            Complete interactive quizzes to test your understanding and earn your certification.
                                        </p>
                                        <EnrollmentButton courseSlug={course.slug} size="lg">
                                            Enroll to Access Quizzes
                                        </EnrollmentButton>
                                    </div>
                                ) : (
                                        <div className="space-y-4">
                                        {activeLesson ? (
                                            <QuizTake 
                                                moduleId={activeLesson.module_id} 
                                                courseId={course.id}
                                                onComplete={(score, passed) => {
                                                    console.log(`Quiz completed: Score ${score}%, Passed: ${passed}`);
                                                    if (passed) {
                                                        handleToggleComplete(activeLesson.id);
                                                    }
                                                }}
                                            />
                                        ) : (
                                            <div>
                                                <div className="text-center py-8 mb-6">
                                                    <ClipboardCheck className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                                                    <h4 className="text-lg font-medium mb-2">Select a Module to Take Quiz</h4>
                                                    <p className="text-muted-foreground">
                                                        Choose a lesson from the course outline to access its module quiz
                                                    </p>
                                                </div>
                                                
                                                <div className="space-y-3">
                                                    {course.course_modules?.map((module, index) => (
                                                        <div key={module.id} className="p-4 border rounded-lg bg-card">
                                                            <h4 className="font-semibold">Module {index + 1}: {module.title}</h4>
                                                            <p className="text-sm text-muted-foreground mb-3">{module.description}</p>
                                                            <p className="text-xs text-blue-600">
                                                                Select any lesson from this module to access its quiz
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}                                        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                            <h4 className="font-semibold text-blue-900 mb-2">Quiz Requirements</h4>
                                            <ul className="text-sm text-blue-800 space-y-1">
                                                <li>• Complete videos and study materials before taking quizzes</li>
                                                <li>• 70% score required to pass each module quiz</li>
                                                <li>• Up to 3 attempts per quiz</li>
                                                <li>• Pass all module quizzes to earn certification</li>
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

            {/* Sidebar (Right) */}
            <div className="w-96 border-l border-border bg-muted/20 p-6 flex-col gap-6 hidden lg:flex sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">
                <div className="p-4 bg-card rounded-lg border">
                    <h3 className="font-semibold mb-2">Your Study Progress {Math.round(progress)}%</h3>
                    <Progress value={progress} className="h-2 mb-2" />
                    <p className="text-sm text-muted-foreground">Great Job! Keep up the great work.</p>
                </div>
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-serif text-xl font-semibold">Course Completion</h3>
                        <span className="text-sm font-medium text-muted-foreground">{courseCompletion}</span>
                    </div>
                    <div className="space-y-2 max-h-[calc(100vh-350px)] overflow-y-auto pr-2">
                        {course.course_modules?.map((module) => (
                            <div key={module.id}>
                                {/* This is a simplified representation. You might want to use an Accordion here if modules are collapsible */}
                                <h4 className="font-semibold text-lg my-3">{module.title}</h4>
                                <div className="space-y-1">
                                    {module.course_lessons?.map(lesson => {
                                        const isFreePreview = isLessonFreePreview(course.slug, module.title, lesson.title);
                                        const isLocked = isPreview && !isFreePreview;
                                        const isClickable = !isLocked;
                                        
                                        return (
                                            <div key={lesson.id} className="relative">
                                                <button
                                                    onClick={() => handleLessonClick(lesson, module.title)}
                                                    disabled={isLocked}
                                                    className={`w-full text-left p-3 rounded-lg flex items-center gap-3 transition-colors relative ${
                                                        activeLesson?.id === lesson.id 
                                                            ? 'bg-primary text-primary-foreground' 
                                                            : isLocked 
                                                                ? 'bg-muted/50 opacity-60 cursor-not-allowed' 
                                                                : 'hover:bg-muted bg-card border'
                                                    }`}
                                                >
                                                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10">
                                                        {completedLessons.has(lesson.id) && !isPreview
                                                            ? <CheckCircle className="h-5 w-5 text-green-500" />
                                                            : activeLesson?.id === lesson.id && !isLocked
                                                                ? <Play className={`h-5 w-5 ${activeLesson?.id === lesson.id ? 'text-primary-foreground' : 'text-primary'}`} fill="currentColor" />
                                                                : isFreePreview
                                                                    ? <Play className="h-5 w-5 text-primary" />
                                                                    : <Lock className="h-5 w-5 text-muted-foreground" />
                                                        }
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2">
                                                            <p className={`font-medium text-sm ${activeLesson?.id === lesson.id ? 'text-primary-foreground' : isLocked ? 'text-muted-foreground' : 'text-foreground'}`}>
                                                                {lesson.title}
                                                            </p>
                                                            {isFreePreview && (
                                                                <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                                                                    FREE
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className={`text-xs ${activeLesson?.id === lesson.id ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                                                            {lesson.duration_minutes} min
                                                        </p>
                                                    </div>
                                                    {completedLessons.has(lesson.id) && !isPreview && <CheckCircle className="h-5 w-5 text-green-500" />}
                                                </button>
                                                
                                                {isLocked && (
                                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/80 to-background/90 rounded-lg flex items-center justify-end pr-4">
                                                        <EnrollmentButton courseSlug={course.slug} size="sm" variant="default" className="text-xs">
                                                            Unlock
                                                        </EnrollmentButton>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                        
                        {isPreview && (
                            <div className="mt-6 p-4 bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10 rounded-lg">
                                <div className="text-center">
                                    <Lock className="w-8 h-8 text-primary mx-auto mb-2" />
                                    <h4 className="font-semibold text-sm">Unlock All Lessons</h4>
                                    <p className="text-xs text-muted-foreground mb-3">
                                        Access {totalLessons - previewLessons.length} more lessons
                                    </p>
                                    <EnrollmentButton courseSlug={course.slug} size="sm" className="w-full">
                                        Enroll Now
                                    </EnrollmentButton>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}