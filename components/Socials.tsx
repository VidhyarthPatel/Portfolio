"use client";

import React from "react";
import { motion } from "motion/react";
import {
  Call02Icon,
  GithubIcon,
  InstagramIcon,
  Linkedin,
  Location01Icon,
  Mail01Icon,
  NewTwitterIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

function Socials() {
  const leftColumn = [
    {
      name: "GitHub",
      value: "GitHub",
      href: "https://github.com/VidhyarthPatel",
      icon: <HugeiconsIcon icon={GithubIcon} size={18} />,
    },
    {
      name: "X",
      value: "X",
      href: "https://x.com",
      icon: <HugeiconsIcon icon={NewTwitterIcon} size={18} />,
    },
    {
      name: "Instagram",
      value: "Instagram",
      href: "https://instagram.com",
      icon: <HugeiconsIcon icon={InstagramIcon} size={18} />,
    },
    {
      name: "LinkedIn",
      value: "LinkedIn",
      href: "https://linkedin.com",
      icon: <HugeiconsIcon icon={Linkedin} size={18} />,
    },
  ];

  const rightColumn = [
    {
      name: "Phone",
      value: "+91 82001 33902",
      href: "tel:+918200133902",
      icon: (
        <HugeiconsIcon
          icon={Call02Icon}
          size={18}
          color="currentColor"
          strokeWidth={1.5}
        />
      ),
    },
    {
      name: "Gmail",
      value: "vidyarthpatel@gmail.com",
      href: "mailto:vidyarthpatel@gmail.com",
      icon: <HugeiconsIcon icon={Mail01Icon} size={18} />,
    },
    {
      name: "Location",
      value: "Gujarat, India",
      href: "https://www.google.com/maps/place/Gujarat,+India",
      icon: <HugeiconsIcon icon={Location01Icon} size={19} />,
    },
  ];

  interface SocialItem {
    name: string;
    value: string;
    href: string;
    icon: React.ReactNode;
  }

  const renderItem = (item: SocialItem, index: number) => (
    <motion.a
      variants={{
        hidden: { filter: "blur(10px)", x: -10, opacity: 0 },
        show: { filter: "blur(0px)", x: 0, opacity: 1, transition: { duration: 0.3 } },
      }}
      key={index}
      href={item.href}
      target={
        !item.href.startsWith("mailto") && !item.href.startsWith("tel")
          ? "_blank"
          : undefined
      }
      rel="noopener noreferrer"
      className="group flex items-center gap-1 hover:translate-x-0.5 transition-transform duration-200"
    >
      <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800 shadow-3xs group-hover:border-neutral-300 dark:group-hover:border-neutral-700 group-hover:bg-white dark:group-hover:bg-neutral-700 transition-colors flex-shrink-0">
        {item.icon}
      </div>
      <span className="text-[11px] min-[360px]:text-xs sm:text-sm font-mono tracking-tighter sm:tracking-tight text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-950 dark:group-hover:text-white group-hover:underline decoration-neutral-300 dark:decoration-neutral-700 underline-offset-4 transition-colors truncate">
        {item.value}
      </span>
    </motion.a>
  );

  return (
    <motion.div 
      className="grid grid-cols-2 p-4 sm:p-5 backdrop-blur-xs gap-0"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {/* Left Column */}
      <div className="flex flex-col gap-2 sm:gap-1 pr-1 sm:pr-6">
        {leftColumn.map(renderItem)}
      </div>

      {/* Right Column */}
      <div className="flex flex-col gap-2 sm:gap-1 pl-3 sm:pl-8 border-l border-dashed border-neutral-200 dark:border-neutral-800 mt-0 sm:mt-5">
        {rightColumn.map(renderItem)}
      </div>
    </motion.div>
  );
}

export default Socials;
