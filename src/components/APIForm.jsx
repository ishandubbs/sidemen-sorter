import React, { useState } from 'react';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const SIDEMEN_CHANNEL_ID = "UCDogdKl7t7NHzQ95aEwkdMw" //Sidemen Channel ID

const APIForm = ({ onVideoFetched, banList }) => {
    const [loading, setLoading] = useState(false);
    console.log("Button clicked!")

    const fetchVideos = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${SIDEMEN_CHANNEL_ID}&maxResults=50&type=video&key=${API_KEY}`
            );
            const data = await response.json();

            console.log("data:", data)

            if (!data.items) {
                throw new Error("No data returned.")
            }

            console.log("Fetched Videos", data.items)
    
            const filteredVideos = data.items.filter (
                (video) => !banList.some(
                    (banned) => banned.id === video.id.videoId || banned.title === video.snippet.title || banned.channel === video.snippet.channelTitle
                )
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
                    console.error("No video found!");
                    return;
                }
    
            console.log("Selected Video:", randomVideo);
    
            onVideoFetched(randomVideo);
        } catch (error) {
            console.error("Catching errors:", error);
            onVideoFetched(null);
        } finally {
            setLoading(false);
        }
    };
    
        

    return (
        <div className='form-container'>
          <button className='button' onClick={fetchVideos} disabled={loading}>
            {loading ? "Loading..." : "Discover Video"}
            </button>
        </div>
    );
};

export default APIForm;