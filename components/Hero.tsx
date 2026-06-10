"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, useRef } from "react";

function Hero() {
  const [current, setCurrent] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isHovered = useRef(false);
  const roles = [
    "Front-end engineer",
    "Full-stack engineer",
    "Vibe code engineer",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % roles.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleMouseEnter = () => {
    isHovered.current = true;
    if (videoRef.current && videoRef.current.paused) {
      videoRef.current.play().catch((e) => console.log(e));
    }
  };

  const handleMouseLeave = () => {
    isHovered.current = false;
  };

  const handleEnded = () => {
    if (videoRef.current) {
      if (isHovered.current) {
        // User is still hovering: loop the video
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch((e) => console.log(e));
      } else {
        // User has left: pause and reset to start
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  };

  return (
    <div className="flex items-center justify-between p-5">
      <div>
        <div className="flex items-center">
          <h1 className="text-4xl font-bold mt-5 text-shadow-[0_9px_20px_rgba(0,0,0,0.41)]">
            Vidhyarth Patel
          </h1>
          <span>
            {" "}
            <div className="relative h-6 overflow-hidden mt-6 ml-5 rounded-md border border-neutral-300 dark:border-neutral-700 px-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={roles[current]}
                  initial={{
                    y: -10,
                    opacity: 0,
                    filter: "blur(10px)",
                  }}
                  animate={{
                    y: 0,
                    x: [0, 0, 0, 0, 0, 10, 0, -10, 0, 0, 0, 0, 0],
                    opacity: 1,
                    filter: "blur(0px)",
                  }}
                  exit={{
                    y: 10,
                    opacity: 0,
                    filter: "blur(10px)",
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="flex h-6 items-center text-sm text-neutral-600 dark:text-neutral-300 font-semibold"
                >
                  {roles[current]}
                </motion.div>
              </AnimatePresence>
            </div>
          </span>
        </div>

        <p className="text-md text-neutral-500 dark:text-neutral-400 font-medium w-145 mt-5">
          I build modern web experiences end-to-end with{" "}
          <span className="text-black dark:text-white font-bold">React,</span>{" "}
          <span className="text-black dark:text-white font-bold">Next.js,</span>
          <span className="text-black dark:text-white font-bold">Express,</span> and{" "}
          <span className="text-black dark:text-white font-bold">MongoDB. </span>{" "}
          Whether it's crafting smooth user interfaces or developing reliable backend
          systems, I enjoy bringing ideas to life through code.
        </p>
      </div>
      <div className="">
        <video
          ref={videoRef}
          src="/profileVideo.mp4"
          className="rounded-full border-white dark:border-neutral-800 border-5 w-35 h-35 object-cover shadow-2xl cursor-pointer overflow-hidden"
          muted
          playsInline
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onEnded={handleEnded}
        />
      </div>
    </div>
  );
}

export default Hero;
