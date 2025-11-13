"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Lock, CheckCircle2, BookOpen, Clock } from "lucide-react";
import VideoJS from '@/components/VideoJS';
import Link from "next/link";
import { CourseVideo } from "@/lib/video-config";
import EnrollmentButton from "@/components/enrollment-button";

interface CourseVideosProps {
  videos: CourseVideo[];
  isPreview?: boolean;
  courseSlug: string;
}

export function CourseVideosSection({ videos, isPreview = false, courseSlug }: CourseVideosProps) {
  const [activeVideo, setActiveVideo] = useState<CourseVideo | null>(
    isPreview 
      ? videos.find(v => v.isPreview) || null
      : videos[0] || null
  );
  
  const [completedVideos, setCompletedVideos] = useState<Set<string>>(new Set());

  const handleVideoComplete = (videoUrl: string) => {
    const newCompleted = new Set(completedVideos);
    newCompleted.add(videoUrl);
    setCompletedVideos(newCompleted);
  };

  const previewVideos = videos.filter(v => v.isPreview);
  const visibleVideos = isPreview ? previewVideos : videos;

  return (
    <div className="space-y-6">
      {/* Video Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl font-semibold">Course Videos</h2>
          <p className="text-muted-foreground mt-1">
            Watch these instructional videos to understand the course material
          </p>
        </div>
        {isPreview && (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Preview Mode
          </Badge>
        )}
      </div>

      {/* Preview Mode Alert */}
      {isPreview && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Play className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium text-blue-900">
                  {previewVideos.length} of {videos.length} videos available in preview
                </p>
                <p className="text-sm text-blue-700">
                  Enroll to access all course videos and take assessments
                </p>
              </div>
              <div className="ml-auto">
                <EnrollmentButton courseSlug="complete-doula-certification">
                  Enroll Now
                </EnrollmentButton>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Video Player (2/3) */}
        <div className="lg:col-span-2">
          {activeVideo ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-serif text-xl">
                    {activeVideo.videoTitle}
                  </CardTitle>
                  {!isPreview && (
                    <Button
                      size="sm"
                      variant={completedVideos.has(activeVideo.videoUrl) ? "secondary" : "default"}
                      onClick={() => handleVideoComplete(activeVideo.videoUrl)}
                    >
                      {completedVideos.has(activeVideo.videoUrl) ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 mr-1" />
                          Completed
                        </>
                      ) : (
                        "Mark Complete"
                      )}
                    </Button>
                  )}
                </div>
                <p className="text-muted-foreground">{activeVideo.description}</p>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4">
                  <VideoJS
                    options={{
                      autoplay: false,
                      controls: true,
                      responsive: true,
                      fluid: true,
                      sources: [activeVideo.videoUrl]
                    }}
                    onReady={(player: any) => {
                      console.log('Course video ready');
                    }}
                  />
                </div>
                
                {/* Video Topics */}
                {activeVideo.topics && activeVideo.topics.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Topics Covered:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activeVideo.topics.map((topic, index) => (
                        <Badge key={index} variant="secondary">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="aspect-video flex items-center justify-center">
              <CardContent className="text-center">
                <Play className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium">Select a video to watch</h3>
                <p className="text-sm text-muted-foreground">
                  Choose from the videos on the right to begin learning
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Video List (1/3) */}
        <div className="space-y-3">
          <h3 className="font-medium">Course Videos ({visibleVideos.length})</h3>
          
          {visibleVideos.map((video, index) => {
            const isLocked = isPreview && !video.isPreview;
            const isActive = activeVideo?.videoUrl === video.videoUrl;
            const isCompleted = completedVideos.has(video.videoUrl);
            
            return (
              <Card 
                key={video.videoUrl}
                className={`cursor-pointer transition-colors ${
                  isActive 
                    ? 'ring-2 ring-primary' 
                    : isLocked 
                      ? 'opacity-60' 
                      : 'hover:bg-muted/50'
                }`}
                onClick={() => !isLocked && setActiveVideo(video)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                      {isCompleted && !isPreview ? (
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      ) : isLocked ? (
                        <Lock className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm leading-tight">
                        {video.videoTitle}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {video.duration || 'Video'}
                      </p>
                      
                      {video.isPreview && (
                        <Badge variant="outline" className="mt-2 text-xs">
                          FREE
                        </Badge>
                      )}
                    </div>
                    
                    {isLocked && (
                      <Link href="/signup">
                        <Button size="sm" variant="outline" className="text-xs">
                          Unlock
                        </Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
          
          {/* Locked Videos Preview */}
          {isPreview && videos.length > previewVideos.length && (
            <Card className="border-dashed">
              <CardContent className="p-4 text-center">
                <Lock className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm font-medium">
                  {videos.length - previewVideos.length} more videos
                </p>
                <p className="text-xs text-muted-foreground mb-3">
                  Unlock with enrollment
                </p>
                <EnrollmentButton courseSlug="complete-doula-certification" size="sm">
                  Enroll Now
                </EnrollmentButton>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      
      {/* Study Instructions */}
      <Card className="bg-muted/20">
        <CardContent className="p-6">
          <h3 className="font-serif text-lg font-medium mb-3">How to Study</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-medium text-sm">
                1
              </div>
              <div>
                <p className="font-medium text-sm">Watch Videos</p>
                <p className="text-xs text-muted-foreground">
                  View all course instructional videos
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-medium text-sm">
                2
              </div>
              <div>
                <p className="font-medium text-sm">Study Lessons</p>
                <p className="text-xs text-muted-foreground">
                  Read through course modules and materials
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-medium text-sm">
                3
              </div>
              <div>
                <p className="font-medium text-sm">Take Assessment</p>
                <p className="text-xs text-muted-foreground">
                  Complete quizzes based on video content
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}