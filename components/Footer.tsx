"use client";

import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  InstagramIcon,
  Linkedin,
  NewTwitterIcon,
} from "@hugeicons/core-free-icons";

export default function Footer() {
  const HeartIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-4 h-4 text-red-500"
    >
      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
    </svg>
  );

  return (
    <footer className="w-full flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400 p-5">
      <div className="flex items-center gap-1.5 font-medium">
        <span>Made with</span>
        <HeartIcon />
        <span>by Vidhyarth</span>
      </div>

      <div className="flex items-center gap-5">
        <a
          href="https://twitter.com/VidhyarthPatel"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-neutral-900 dark:hover:text-white transition-colors"
          aria-label="X (Twitter)"
        >
          <HugeiconsIcon icon={NewTwitterIcon} size={20} />
        </a>
        <a
          href="https://linkedin.com/in/VidhyarthPatel"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-neutral-900 dark:hover:text-white transition-colors"
          aria-label="LinkedIn"
        >
          <HugeiconsIcon icon={Linkedin} size={20} />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-neutral-900 dark:hover:text-white transition-colors"
          aria-label="Instagram"
        >
          <HugeiconsIcon icon={InstagramIcon} size={20} />
        </a>
      </div>
    </footer>
  );
}
