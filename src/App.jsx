import { useState } from "react";
import APIForm from "./components/APIForm";
import VideoCard from "./components/VideoCard";
import "./App.css"

const App = () => {
  const [currentVideo, setCurrentVideo] = useState(null);
  const [banList, setBanList] = useState([]);
  const [banAttributes, setBanAttributes] = useState([]);

  const handleBanVideo = (videoId) => {
    setBanList((prev) => [...prev, videoId])
  }

  const handleBanAttribute = (attribute) => {
    setBanAttributes((prev) => 
      prev.includes(attribute)
      ? prev.filter((attr) => attr !== attribute)
      : [...prev, attribute]
    )
  }

  return (
    <div className="app-container">
      <h1 className="text-3x1 font-bold mb-4 text-white">Sidemen Video Discovery</h1>
      <APIForm onVideoFetched={setCurrentVideo} banList={banList} banAttributes={banAttributes}/>
      {currentVideo && (<VideoCard video={currentVideo} onBan={handleBanVideo} onBanAttribute={handleBanAttribute} />)}
      
      <div className="ban-list-container">
        <h2>Banned List</h2>
        <ul>
          {banList.map((videoId) => (
            <li key={videoId}>{videoId}</li>
          ))}
        </ul>

        <h2>Banned Attributes</h2>
        <ul>
          {banAttributes.map((attr) => (
            <li key={attr} onClick={() => handleBanAttribute(attr)}>{attr}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}


export default App