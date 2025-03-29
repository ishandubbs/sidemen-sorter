import React, { useState } from 'react';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const SIDEMEN_CHANNEL_ID = "UCDogdKl7t7NHzQ95aEwkdMw" //Sidemen Channel ID

const APIForm = ({ onVideoFetched, banList, banAttributes }) => {
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
                (video) => !banList.includes(video.id.videoId)
            );

            const categorizedVideos = {
                "Less than 1 Hour": [],
                "1-2 Hours": [],
                "2+ Hours": []
            }

            filteredVideos.forEach(video => {
                const duration = Math.random() * 3;
                if (duration < 1) {
                    categorizedVideos["Less than 1 Hour"].push(video)
                } else if (duration < 2) {
                    categorizedVideos["1-2 Hours"].push(video)
                } else {
                    categorizedVideos['2+ Hours'].push(video)
                }
            })

            let finalVideos = filteredVideos.filter(video => {
                return !banAttributes.some(attr => categorizedVideos[attr]?.includes(video))
            })
    
            if (finalVideos.length === 0) {
                console.warn("No available videos left.");
                onVideoFetched(null)
                return;
            }

            console.log("filtered:", finalVideos)
    
            const randomVideo = 
                finalVideos[Math.floor(Math.random() * finalVideos.length)];
                
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