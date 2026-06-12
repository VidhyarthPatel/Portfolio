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
    <motion.div
      className="grid grid-cols-[auto_1fr] sm:grid-cols-[1fr_auto] gap-x-4 sm:gap-x-6 gap-y-3 sm:gap-y-0 p-5"
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.15,
          },
        },
      }}
    >
      {/* Name and Badge (Header) */}
      <div className="col-start-2 row-start-1 sm:col-start-1 sm:row-start-1 flex flex-col justify-center">
        <div className="flex flex-col sm:flex-row sm:items-center">
          <motion.h1
            variants={{
              hidden: { filter: "blur(10px)", x: -10, opacity: 0 },
              show: {
                filter: "blur(0px)",
                x: 0,
                opacity: 1,
                transition: { duration: 0.3 },
              },
            }}
            className="text-3xl sm:text-4xl font-bold mt-1 sm:mt-5 text-shadow-[0_9px_20px_rgba(0,0,0,0.41)]"
          >
            Vidhyarth Patel
          </motion.h1>
          <div className="relative h-6 overflow-hidden mt-1.5 sm:mt-6 sm:ml-5 rounded-md border border-neutral-300 dark:border-neutral-700 px-2 w-fit">
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
        </div>
      </div>

      {/* Description Paragraph */}
      <motion.p
        variants={{
          hidden: { filter: "blur(10px)", x: -10, opacity: 0 },
          show: {
            filter: "blur(0px)",
            x: 0,
            opacity: 1,
            transition: { duration: 0.3 },
          },
        }}
        className="col-span-2 sm:col-span-1 sm:col-start-1 sm:row-start-2 text-md text-neutral-500 dark:text-neutral-400 font-medium w-full sm:w-145 mt-2 sm:mt-5"
      >
        I build modern web experiences end-to-end with{" "}
        <span className="text-black dark:text-white font-bold">React,</span>{" "}
        <span className="text-black dark:text-white font-bold">Next.js,</span>{" "}
        <span className="text-black dark:text-white font-bold">Express,</span>{" "}
        and{" "}
        <span className="text-black dark:text-white font-bold">MongoDB. </span>{" "}
        Whether it's crafting smooth user interfaces or developing reliable
        backend systems, I enjoy bringing ideas to life through code.
      </motion.p>

      {/* Profile Video */}
      <div className="col-start-1 row-start-1 sm:col-start-2 sm:row-start-1 sm:row-span-2 flex-shrink-0 flex items-center justify-start sm:justify-end">
        <video
          ref={videoRef}
          src="/profileVideo.mp4"
          className="rounded-full border-white dark:border-neutral-800 border-5 w-24 h-24 sm:w-35 sm:h-35 object-cover shadow-2xl cursor-pointer overflow-hidden"
          muted
          playsInline
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onEnded={handleEnded}
        />
      </div>
    </motion.div>
  );
}

export default Hero;
