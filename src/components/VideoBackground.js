import React from "react";

const VideoBackground = ({ videoSrc }) => {
  return (
    <video
      autoPlay
      loop
      muted
      style={{
        position: "fixed",
        right: 0,
        bottom: 0,
        minWidth: "100%",
        minHeight: "100%",
        width: "auto",
        height: "auto",
        zIndex: -1,
      }}
    >
      <source src={videoSrc} type="video/mp4" />
      Tu navegador no soporta el elemento de video.
    </video>
  );
};

export default VideoBackground;
