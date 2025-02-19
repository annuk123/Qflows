"use client";
import React from "react";
import { motion } from "framer-motion";

const CodePreviewWithVideo = () => {
    const videoRef = React.useRef<HTMLVideoElement | null>(null);
    const [isPlaying, setIsPlaying] = React.useState(true);
  
    const togglePlay = () => {
      if (videoRef.current) {
        if (isPlaying) {
          videoRef.current.pause();
        } else {
          videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
      }
    };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col md:flex-row items-center justify-center bg-gray-900 p-6 rounded-2xl shadow-xl space-y-4 md:space-y-0 md:space-x-6"
    >
      {/* Video and Code Snippet Sections (same as above) */}
      <div className="relative">
      <video
        ref={videoRef}
        src="/code-preview.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-auto rounded-3xl"
      />
      <button
        onClick={togglePlay}
        className="absolute bottom-4 right-4 bg-gray-800 text-white py-2 px-4 rounded-lg shadow-lg"
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
    </div>
    </motion.div>
  );
};

export default CodePreviewWithVideo;
