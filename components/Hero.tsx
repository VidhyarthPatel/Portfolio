"use client";

import Image from "next/image";
import profileImg from "@/public/profileImg.png";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

function Hero() {
  const [current, setCurrent] = useState(0);
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
  return (
    <div className="flex items-center justify-between p-5">
      <div>
        <div className="flex items-center">
          <h1 className="text-4xl font-bold mt-5 text-shadow-[0_9px_20px_rgba(0,0,0,0.41)]">
            Vidhyarth Patel
          </h1>
          <span>
            {" "}
            <div className="relative h-6 overflow-hidden mt-6 ml-5 rounded-md border border-neutral-300 px-2">
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
                  className="flex h-6 items-center text-sm text-neutral-600 font-semibold"
                >
                  {roles[current]}
                </motion.div>
              </AnimatePresence>
            </div>
          </span>
        </div>

        <p className="text-md text-neutral-500 font-medium w-145 mt-5">
          I build modern web experiences end-to-end with{" "}
          <span className="text-black font-bold">React,</span>{" "}
          <span className="text-black font-bold">Next.js,</span>
          <span className="text-black font-bold">Express,</span> and{" "}
          <span className="text-black font-bold">MongoDB. </span> Whether it's
          crafting smooth user interfaces or developing reliable backend
          systems, I enjoy bringing ideas to life through code.
        </p>
      </div>
      <div className="">
        <Image
          src={profileImg}
          alt="profileImg"
          className="rounded-full border-white border-5 w-35 h-35 object-cover shadow-2xl"
        ></Image>
      </div>
    </div>
  );
}

export default Hero;
