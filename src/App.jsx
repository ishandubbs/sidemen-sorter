import { useState } from "react";
import APIForm from "./components/APIForm";
import VideoCard from "./components/VideoCard";
import "./App.css"

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const SIDEMEN_CHANNEL_ID = "UCDogdKl7t7NHzQ95aEwkdMw" //Sidemen Channel ID

const App = () => {
  const [currentVideo, setCurrentVideo] = useState(null);
  const [banList, setBanList] = useState([]);

  const fetchVideos = async () => {
    console.log("Fetching videos");
    setLoading(true);
    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${SIDEMEN_CHANNEL_ID}&maxResults=50&type=video&key=${API_KEY}`
        );

        console.log("Response status:", response.status);
        console.log("Full response:", response);
        const data = await response.json();

        if (data.error && data.error.errors[0].reason === "quotaExceeded") {
          console.warn("Quota exceeded! Switching to mock data...");
          useMockData(onVideoFetched); 
          return;
      }

        console.log("data:", data)

        if (!data.items) {
          console.error("YouTube API did not return `items`.");
          console.error("Possible API error:", data.error || "Unknown error.");
          return;
        };
        
        console.log("Fetched Videos", data.items)

        const filteredVideos = data.items.filter (
            (video) => !banList.some(
                (banned) => banned.id === video.id.videoId || banned.title === video.snippet.title || banned.channel === video.snippet.channelTitle)
        );

        console.log("Filtered Videos", filteredVideos)

        if (filteredVideos.length === 0) {
            console.warn("No available videos left.");
            onVideoFetched(null)
            return;
        }

        console.log("filtered:", filteredVideos)

        const randomVideo = 
            filteredVideos[Math.floor(Math.random() * filteredVideos.length)];
        if (!randomVideo) {
          console.error("No video found.");
          return;
        }

        onVideoFetched(randomVideo)
    } catch (error) {
        console.error("Catching errors:", error);
        useMockData(onVideoFetched);
    } finally {
      setLoading(false)
    }
  };

  const useMockData = (onVideoFetched) => {
    const mockData = [
        {
            id: { videoId: "dQw4w9WgXcQ" },
            snippet: {
                title: "20 WOMEN vs 2 SIDEMEN: FAZE RONALDO & JASON EDITION",
                description: "This is a sample video description.",
                channelTitle: "Sidemen"
            }
        },
        {
            id: { videoId: "3JZ_D3ELwOQ" },
            snippet: {
                title: "SIDEMEN POP THE BALLOON 2",
                description: "Another example video.",
                channelTitle: "Sidemen"
            }
        }
    ];

    const randomVideo = mockData[Math.floor(Math.random() * mockData.length)];
    onVideoFetched(randomVideo);
};

  const handleBanVideo = (video) => {
    console.log("Banned Video:", video)
    setBanList((prev) => [...prev, {
      id: video.id.videoId,
      title: video.snippet.title,
      description: video.snippet.description,
      channel: video.snippet.channelTitle
    }]);

    fetchVideos();
  }

  return (
    <div className="app-container">
      <h1 className="text-3x1 font-bold mb-4 text-white">Sidemen Video Discovery</h1>
      <APIForm fetchVideos={fetchVideos}/>
      {currentVideo ? (
        <VideoCard video={currentVideo} onBan={handleBanVideo} />
      ) : (
        <p className="text-white">No videos available, please try again.</p>
      )}
      
      <div className="ban-list-container">
        <h2>Banned List</h2>
        <ul>
          {banList.map((video, index) => (
            <li key={index}>
              <strong>{video.title}</strong> - {video.channel}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


export default App
