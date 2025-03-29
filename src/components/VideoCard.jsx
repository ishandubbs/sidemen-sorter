import React from "react"

const VideoCard = ({ video, onBan, onBanAttribute }) => {
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
            <p onClick={() => onBanAttribute("Less Than 1")} className="clickable">Less Than 1 Hour</p>
            <p onClick={() => onBanAttribute("1-2 Hours")} className="clickable">1-2 Hours</p>
            <p onClick={() => onBanAttribute("2+ Hours")} className="clickable">2+ Hours</p>
            <div className="flex gap-3 mt-4">
                <button className="button" onClick={() => onBan(video.id.videoId)}>
                    Ban Video
                </button>
            </div>
        </div>
    )
}

export default VideoCard 