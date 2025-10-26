import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { Lesson } from "@/types/course/enroll.details.type";

interface VideoPlayerProps {
  lesson: Lesson;
  poster?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ lesson, poster }) => {
  const [videoError, setVideoError] = React.useState(false);
  const [reloadKey, setReloadKey] = React.useState(0);

  React.useEffect(() => {
    setVideoError(false);
    setReloadKey(0);
  }, [lesson?.id]);

  if (lesson.contentType?.startsWith("image/")) {
    return (
      <Image
        src={lesson.content}
        alt={lesson.title || "Lesson image"}
        className="w-full h-full object-contain"
        width={800}
        height={600}
      />
    );
  }

  if (lesson.contentType?.startsWith("video/")) {
    if (videoError) {
      return (
        <div className="text-center p-4">
          <p className="mb-3 text-white">Unable to load video.</p>
          <div className="flex items-center justify-center gap-3">
            <Button
              size="sm"
              className="bg-white text-black"
              onClick={() => {
                setVideoError(false);
                setReloadKey((k) => k + 1);
              }}
            >
              Retry
            </Button>
            <a
              href={lesson.content}
              target="_blank"
              rel="noreferrer"
              className="underline text-white"
            >
              Open in new tab
            </a>
          </div>
        </div>
      );
    }

    return (
      <video
        key={`${lesson.id}-${reloadKey}`}
        controls
        autoPlay
        className="w-full h-full object-contain"
        poster={poster}
        controlsList="nodownload noplaybackrate"
        disablePictureInPicture
        onContextMenu={(e) => e.preventDefault()}
        preload="metadata"
        playsInline
        muted
        onError={() => setVideoError(true)}
        onLoadedData={() => setVideoError(false)}
      >
        <source src={lesson.content} type={lesson.contentType || "video/mp4"} />
        Your browser does not support the video tag.
      </video>
    );
  }

  // Fallback: treat as image if unknown
  return (
    <Image
      src={lesson.content}
      alt={lesson.title || "Lesson content"}
      className="w-full h-full object-contain"
      width={800}
      height={600}
    />
  );
};

export default VideoPlayer;
