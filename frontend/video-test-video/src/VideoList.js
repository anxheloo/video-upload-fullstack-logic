import React, { useState, useEffect } from "react";
import axios from "axios";

const VideoList = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          "http://192.168.1.213:9001/api/videos"
        );

        console.log("This is response:", response);
        setVideos(response.data.videos);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  const handleVideoHover = (event) => {
    const video = event.target;
    if (video.paused) {
      video.play();
    }
  };

  const handleVideoHoverOut = (event) => {
    const video = event.target;
    video.pause();
    // video.currentTime = 0; // Reset video to beginning
  };

  return (
    <div>
      <h1>Video List</h1>
      <div>
        {videos.map((video, index) => (
          <div key={video._id}>
            <h2>{video.title}</h2>
            <video
              controls
              //   autoPlay
              muted
              //   poster="https://plus.unsplash.com/premium_photo-1673624400092-0e8fd6910570?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              onMouseEnter={handleVideoHover}
              onMouseLeave={handleVideoHoverOut}
            >
              <source
                // src={`http://192.168.1.213:9001/${video.filename}`}
                src={`http://192.168.1.213:9001/public/videos/${video.filename}`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
            <p>{video.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoList;
