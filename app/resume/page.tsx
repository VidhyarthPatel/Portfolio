"use client";

import React from "react";
import Container from "@/components/container";
import { motion } from "motion/react";

export default function ResumePage() {
  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 10, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.4, ease: "easeInOut" as const },
    },
  };

  const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  );

  return (
    <div className="bg-[#FAFAFA] dark:bg-neutral-900 min-h-screen">
      <Container className="border-x border-neutral-200 dark:border-neutral-800 min-h-screen py-10 px-5">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-8 max-w-5xl mx-auto mt-6"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <motion.h1 variants={item} className="text-3xl font-semibold text-neutral-900 dark:text-white">
              Resume
            </motion.h1>
            
            <motion.a
              variants={item}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/new_resume.pdf"
              download="Vidhyarth_Resume.pdf"
              className="bg-neutral-900 dark:bg-neutral-800 text-white dark:text-neutral-200 text-sm font-medium px-6 py-2.5 rounded-lg border border-neutral-700 hover:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors shadow-sm cursor-pointer flex items-center gap-2 whitespace-nowrap"
            >
              <DownloadIcon />
              Download Resume
            </motion.a>
          </div>

          <motion.div 
            variants={item} 
            className="w-full h-[70vh] sm:h-[80vh] rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm bg-neutral-100 dark:bg-neutral-800"
          >
            <iframe 
              src="/new_resume.pdf#toolbar=0&navpanes=0&scrollbar=0" 
              className="w-full h-full border-none"
              title="Resume Preview"
            />
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
}
