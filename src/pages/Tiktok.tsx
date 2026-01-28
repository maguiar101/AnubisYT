import { useEffect, useRef, useState } from "react";

export default function Tiktok() {
  return (
    <>
      <h1 className="text-4xl text-center">TikTok</h1>

      <div className=" h-200 w-100 border-2 rounded mx-20 my-3 py-5 flex flex-col items-center bg-white snap-y snap-mandatory overflow-scroll scrollbar-hide">
        <TikTokEmbed videoId="7498234795873439022" />
        <TikTokEmbed videoId="7505809299055086891" />
        <TikTokEmbed videoId="7506588556182162730" />
        <TikTokEmbed videoId="7507121531777010987" />
        <TikTokEmbed videoId="7506241391194950954" />
      </div>
    </>
  );
}

function TikTokEmbed({ videoId }: { videoId: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.5,
      }
    );

    if (iframeRef.current) {
      observer.observe(iframeRef.current);
    }

    return () => {
      if (iframeRef.current) {
        observer.unobserve(iframeRef.current);
      }
    };
  }, []);

  return (
    <>
      <div className="snap-center transition-all duration-500 ease-in-out transform hover:scale-102">
        <iframe
          className="rounded"
          ref={iframeRef}
          width="320"
          height="748"
          src={isVisible ? `https://www.tiktok.com/embed/${videoId}` : ""}
          allow="encrypted-media; picture-in-picture"
          allowFullScreen
          title="TikTok Video"
        ></iframe>
      </div>
    </>
  );
}
