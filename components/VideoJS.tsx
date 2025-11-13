import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
// Import YouTube plugin
import 'videojs-youtube';

interface VideoJSProps {
  options: any;
  onReady?: (player: any) => void;
}

// Helper function to determine video type and convert YouTube URLs
const getVideoSource = (src: string) => {
  if (src.includes('youtube.com') || src.includes('youtu.be')) {
    // For YouTube videos, use the original URL
    return {
      src: src,
      type: 'video/youtube'
    };
  }
  
  // For other video files, detect type from extension
  if (src.endsWith('.m3u8')) {
    return { src, type: 'application/x-mpegURL' };
  }
  if (src.endsWith('.webm')) {
    return { src, type: 'video/webm' };
  }
  if (src.endsWith('.ogg')) {
    return { src, type: 'video/ogg' };
  }
  
  // Default to mp4
  return { src, type: 'video/mp4' };
};

export const VideoJS: React.FC<VideoJSProps> = (props) => {
  const videoRef = React.useRef<HTMLDivElement>(null);
  const playerRef = React.useRef<any>(null);
  const { options, onReady } = props;

  React.useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current && videoRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode. 
      const videoElement = document.createElement("video-js");

      videoElement.classList.add('vjs-big-play-centered');
      videoRef.current.appendChild(videoElement);

      // Process sources to handle different video types
      const processedSources = options.sources?.map((source: any) => {
        if (typeof source === 'string') {
          return getVideoSource(source);
        }
        return getVideoSource(source.src);
      }) || [];

      const playerOptions = {
        ...options,
        sources: processedSources,
        // Add some default options for better compatibility
        preload: 'metadata',
        playbackRates: [0.5, 1, 1.25, 1.5, 2],
        children: ['mediaLoader', 'posterImage', 'bigPlayButton', 'loadingSpinner', 'controlBar'],
        // YouTube specific options
        youtube: {
          ytControls: 0,
          rel: 0,
          showinfo: 0,
          modestbranding: 1
        }
      };

      const player = playerRef.current = videojs(videoElement, playerOptions, () => {
        console.log('Video.js player is ready');
        onReady && onReady(player);
      });

      // Add error handling
      player.on('error', (e: any) => {
        console.error('Video.js player error:', e);
        const error = player.error();
        if (error) {
          console.error('Error details:', error);
        }
      });

    } else if (playerRef.current && options.sources) {
      // Update existing player with new sources
      const player = playerRef.current;
      player.src(options.sources);
    }
  }, [options, onReady]);

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
};

export default VideoJS;