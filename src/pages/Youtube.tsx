import { useEffect, useState } from "react";

import Loader from "../components/Loader.tsx";

const API = "AIzaSyBkMjKVsA4GoW-UCdx5J9OQFJYE7mZXEHE";

export default function Youtube({ fonts }: { fonts?: any }) {
  const controller = new AbortController();
  const [videos, setVideos] = useState([] as any[]);
  const [playlists, setPlaylists] = useState([] as any[]);
  const [subscribers, setSubscribers] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchVideos() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=30&playlistId=UUBYRxdLyJJKbr5stwWfZqVg&key=${API}`,
          { signal: controller.signal },
        );
        if (!res.ok) {
          throw new Error("Something went wrong fetching videos");
        }
        const data = await res.json();

        //console.log(data.items);
        setVideos(data.items);
      } catch (error) {
        setError("Failed to fetch videos");
      } finally {
        setIsLoading(false);
      }
    }

    async function fetchPlaylists() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `https://youtube.googleapis.com/youtube/v3/playlists?part=contentDetails%2C%20snippet&channelId=UCBYRxdLyJJKbr5stwWfZqVg&maxResults=10&key=${API}`,
          { signal: controller.signal },
        );
        if (!res.ok) {
          throw new Error("Something went wrong fetching playlists");
        }
        const data = await res.json();
        //console.log(data.items);
        setPlaylists(data.items);
      } catch (error) {
        setError("Failed to fetch playlists");
      } finally {
        setIsLoading(false);
      }
    }
    async function fetchSubscribers() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `https://youtube.googleapis.com/youtube/v3/channels?part=statistics&id=UCBYRxdLyJJKbr5stwWfZqVg&key=${API}`,
          { signal: controller.signal },
        );
        if (!res.ok) {
          throw new Error("Something went wrong fetching channel stats");
        }
        const data = await res.json();
        console.log(data.items[0].statistics.subscriberCount);
        setSubscribers(data.items[0].statistics.subscriberCount);
      } catch (error) {
        setError("Failed to fetch channel stats");
      } finally {
        setIsLoading(false);
      }
    }

    fetchVideos();
    fetchPlaylists();
    fetchSubscribers();
  }, []);

  return (
    <>
      <h1
        className="text-4xl text-center font-bold mt-8 mb-2"
        style={fonts.walter}
      >
        You <span className="text-white rounded-lg bg-red-500">Tube</span>{" "}
        Channel
      </h1>

      <p
        className="text-center p-2 max-2xl:mx-60 text-gray-400/75 max-xl:text-sm max-xl:mx-40 max-lg:mx-20 max-sm:text-xs max-sm:mx-20"
        style={fonts.margarine}
      >
        Welcome to my YouTube Channel Page! Here you'll find all my latest
        videos and different playlists for you to check out. Don't forget to{" "}
        <a
          className="text-red-400 underline hover:text-red-500"
          href="https://www.youtube.com/@anubisforreal"
          target="_blank"
        >
          subscribe
        </a>{" "}
        and hit the notification bell so you never miss an upload!
      </p>
      <p className="text-center text-gray-400" style={fonts.walter}>
        Current Subscribers:{" "}
        <span className="text-red-400" style={fonts.chewy}>
          {subscribers}
        </span>
      </p>
      <div className="grid grid-cols-4 gap-10 mx-10 max-lg:grid-cols-3 max-sm:grid-cols-1">
        <VideoList className="col-span-3 max-lg:col-span-2 max-sm:col-span-1">
          <div>
            <h1
              className="mb-10 text-center text-2xl font-semibold text-red-400 max-sm:text-2xl"
              style={fonts.chewy}
            >
              Latest Uploads
            </h1>

            {isLoading && (
              <div className="flex justify-center">
                <Loader />
              </div>
            )}
            {error && <p className="text-red-500 text-center">{error}</p>}
            {!error && !isLoading && <Video videos={videos} fonts={fonts} />}
          </div>
        </VideoList>
        <VideoList className="col-span-1 ">
          <h1
            className="mb-10 text-center text-2xl font-semibold text-red-400 max-sm:text-2xl"
            style={fonts.chewy}
          >
            Playlists
          </h1>
          {isLoading && (
            <div className="flex justify-center">
              <Loader />
            </div>
          )}
          {error && <p className="text-red-500 text-center">{error}</p>}
          {!error && !isLoading && (
            <Playlist playlists={playlists} fonts={fonts} />
          )}
        </VideoList>
      </div>
    </>
  );
}

// ====================== 'VideoList' COMPONENT ===============================

export function VideoList({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <>
      <div
        className={`h-fit my-10 py-10 rounded-lg border-red-500/15 shadow-lg shadow-red-500/20 bg-white/10 border-2 ${className}`}
      >
        {children}
      </div>
    </>
  );
}

// ====================== 'VIDEO' COMPONENT ================================

export function Video({ videos, fonts }: { videos: any[]; fonts: any }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCount, setShowCount] = useState(9);

  useEffect(() => {
    function updateShowCount() {
      if (window.innerWidth < 768) {
        // mobile
        setShowCount(3);
      } else if (window.innerWidth < 1024) {
        // tablet
        setShowCount(6);
      } else {
        // desktop
        setShowCount(9);
      }
    }

    updateShowCount();
    window.addEventListener("resize", updateShowCount);
    return () => window.removeEventListener("resize", updateShowCount);
  }, []);

  const displayedVideos = isExpanded ? videos : videos.slice(0, showCount);

  return (
    <>
      <ul className="grid grid-cols-3 gap-4 justify-items-center mx-5 max-lg:grid-cols-2 max-md:grid-cols-1 max-md:gap-6">
        {displayedVideos.map((video) => (
          <li key={video.id} className="text-center">
            <h3
              className=" text-md text-red-200/75 mb-2 mt-5 max-xl:text-xs max-sm:text-lg"
              style={fonts.robotoSlab}
            >
              {video.snippet.title}
            </h3>

            <a
              target="_blank"
              href={`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`}
            >
              <img
                className="border-6 hover:border-4 border-white/75 hover:border-white rounded-lg hover:scale-105 transition-all duration-200 max-2xl:w-95 max-md:w-full"
                src={
                  video.snippet.thumbnails.maxres?.url ||
                  video.snippet.thumbnails.high?.url ||
                  video.snippet.thumbnails.medium.url
                }
                alt={video.snippet.title}
              />
            </a>
          </li>
        ))}
      </ul>

      {videos.length > showCount && (
        <div className="text-center mt-6">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-6 py-2 bg-red-500/75 hover:bg-red-600 hover:cursor-pointer text-white rounded-lg transition-colors max-md:text-sm"
            style={fonts.robotoSlab}
          >
            {isExpanded ? "Show Less" : `Show All (${videos.length})`}
          </button>
        </div>
      )}
    </>
  );
}

// ==================== 'PLAYLIST' COMPONENT =============================

export function Playlist({
  playlists,
  fonts,
}: {
  playlists: any[];
  fonts: any;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCount, setShowCount] = useState(2);
  const [showTitle, setShowTitle] = useState(true);

  useEffect(() => {
    function updateShowCount() {
      if (window.innerWidth < 640) {
        // mobile
        setShowCount(3);
        setShowTitle(true);
      } else if (window.innerWidth < 1024) {
        // tablet
        setShowCount(4);
        setShowTitle(false);
      } else {
        // desktop
        setShowCount(3);
        setShowTitle(true);
      }
    }

    updateShowCount();
    window.addEventListener("resize", updateShowCount);
    return () => window.removeEventListener("resize", updateShowCount);
  }, []);

  const displayedPlaylists = isExpanded
    ? playlists
    : playlists.slice(0, showCount);

  return (
    <>
      <ul>
        {displayedPlaylists.map((playlist) => (
          <li key={playlist.id} className="text-center mx-2">
            {showTitle && (
              <h3
                className=" text-sm text-red-200/75 mb-2 mt-5 max-sm:text-lg"
                style={fonts.robotoSlab}
              >
                {playlist.snippet.title}
              </h3>
            )}

            <a
              target="_blank"
              href={`https://www.youtube.com/playlist?list=${playlist.id}`}
            >
              <img
                className="border-6 hover:border-4 border-white/75 hover:border-white rounded-lg hover:scale-105 transition-transform duration-200 w-75 max-lg:w-50 mx-auto max-lg:mb-5 max-sm:w-full"
                src={
                  playlist.snippet.thumbnails.maxres?.url ||
                  playlist.snippet.thumbnails.high?.url ||
                  playlist.snippet.thumbnails.medium.url
                }
                alt={playlist.snippet.title}
              />
            </a>
          </li>
        ))}
      </ul>

      {playlists.length > showCount && (
        <div className="text-center mt-6">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-6 py-2 bg-red-500/75 hover:bg-red-600 hover:cursor-pointer text-white rounded-lg transition-colors max-md:text-sm"
            style={fonts.robotoSlab}
          >
            {isExpanded ? "Show Less" : `Show All (${playlists.length})`}
          </button>
        </div>
      )}
    </>
  );
}
