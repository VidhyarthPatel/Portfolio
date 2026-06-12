"use client";

import React from "react";
import { motion } from "motion/react";

export default function BookCall() {
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

  return (
    <section className="p-5" id="book-a-call">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="flex flex-col items-start"
      >
        <motion.h2
          variants={item}
          className="text-xl font-semibold text-neutral-900 dark:text-white mb-4"
        >
          Get in touch
        </motion.h2>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-6">
          <motion.p
            variants={item}
            className="text-neutral-500 dark:text-neutral-400 max-w-[500px] text-sm sm:text-base leading-relaxed"
          >
            I'm currently looking for new opportunities. Whether you have a
            question or want to say hi, hit that button.
          </motion.p>

          <motion.button
            variants={item}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-neutral-900 dark:bg-neutral-800 text-white dark:text-neutral-200 text-sm font-medium px-6 py-2.5 rounded-lg border border-neutral-700 hover:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors shadow-sm cursor-pointer whitespace-nowrap"
          >
            Book a Call
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}
