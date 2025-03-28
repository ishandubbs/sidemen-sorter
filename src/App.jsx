import { useState } from "react";
import APIForm from "./components/APIForm";
import VideoCard from "./components/VideoCard";
import "./App.css"

const App = () => {
  const [currentVideo, setCurrentVideo] = useState(null);
  const [banList, setBanList] = useState([]);

  const handleBanVideo = (video) => {
    setBanList((prev) => [...prev, {
      id: video.id.videoId,
      title: video.snippet.title,
      description: video.snippet.description,
      channel: video.snippet.channelTitle
    }])

    fetchVideos()
  }

  return (
    <div className="app-container">
      <h1 className="text-3x1 font-bold mb-4 text-white">Sidemen Video Discovery</h1>
      <APIForm onVideoFetched={setCurrentVideo} banList={banList}/>
      {currentVideo && (<VideoCard video={currentVideo} onBan={handleBanVideo} />)}
      
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
