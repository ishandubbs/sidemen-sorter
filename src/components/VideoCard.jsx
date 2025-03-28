import React from "react"

const VideoCard = ({ video, onBan }) => {
    if (!video) return null;

    return (
        <div className="video-container">
            <h2 className="text-xl font semibold">{video.snippet.title}</h2>
            <iframe
             width='560'
             height='315'
             className="screenshot"
             src={`https://www.youtube.com/embed/${video.id.videoId}`}
             title = "Youtube video player"
             allowFullScreen
             ></iframe>
            <div className="flex gap-3 mt-4">
                <button className="button" onClick={() => onBan(video)}>
                    Ban Video
                </button>
            </div>
        </div>
    )
}

export default VideoCard