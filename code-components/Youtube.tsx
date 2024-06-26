import React, { ReactNode, useEffect, useRef, useState } from "react";
import Youtube from "react-youtube";
import { useMovie } from "./helper/contexts";

export interface ReactYotubeProps {
  children?: ReactNode;
  videoId: string;
  className?: string;
  controls?: boolean;
  autoplay?: boolean;
  mute?: boolean;
  lazyLoading?: boolean;
  start: number;
  end: number;
}

export function ReactYoutube(props: ReactYotubeProps) {
  const ref = useRef(null);
  const [isIntersecting, setIntersecting] = useState(false);
  const [wasHovered, setWasHovered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);
    });
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isIntersecting) {
      setWasHovered(true);
    }
  }, [isIntersecting]);

  return (
    <div ref={ref}>
      {(props.lazyLoading === false || wasHovered) && (
        <Youtube
          videoId={props.videoId}
          className={props.className}
          iframeClassName={props.className}
          opts={{
            playerVars: {
              autoplay: (props.autoplay ? 1 : 0) ?? 0,
              controls: (props.controls ? 1 : 0) ?? 0,
              showinfo: 0,
              mute:     (props.mute ? 1 : 0) ?? 0,
              start:    props.start ?? 0,
              end:      props.end ?? undefined,
              disablekb: 1,
              fs: 0,
              modestbranding: 1,
              loop: 1,
            },
          }}
        />
      )}
    </div>
  );
}

interface YoutubeThumbnailProps {
  videoId?: string;
  className?: string;
  customStyle?: object;
}

export const YoutubeThumbnail = (props: YoutubeThumbnailProps) => {
  const { videoId, className, customStyle } = props;
  const movieContext = useMovie();
  return (
    <img
      src={`https://img.youtube.com/vi/${
        videoId ?? movieContext?.videoId
      }/0.jpg`}
      className={className}
      style={customStyle}
      alt={'youtube'}
    />
  );
};
