"use client";

import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";

function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="w-full py-3.5 sm:py-5">
      <div className="flex items-center justify-between">
        {/* Left Side: Navigation Links */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/"
            className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white text-sm font-medium transition-colors"
          >
            Home
          </Link>
          <a
            href="#work"
            className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white text-sm font-medium transition-colors"
          >
            Work
          </a>
          <Link
            href="/blog"
            className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white text-sm font-medium transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/resume"
            className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white text-sm font-medium transition-colors"
          >
            Resume
          </Link>
        </div>

        {/* Right Side: Search and Theme Toggle */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Search bar UI (Command + K) */}
          <div className="hidden sm:flex items-center gap-3 rounded-full pl-3 pr-2 py-1.5 transition-colors cursor-pointer text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-transparent hover:border-neutral-200/50 dark:hover:border-neutral-700/50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.637 10.637Z"
              />
            </svg>
            <div className="flex items-center gap-0.5 text-[10px] font-semibold text-neutral-400 dark:text-neutral-500 font-mono bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded px-1.5 py-0.5 shadow-2xs">
              <span>⌘</span>
              <span>K</span>
            </div>
          </div>

          {/* Theme Toggle (Sun/Moon Icon) */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              // Sun Icon (when theme is dark, click to go light)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.75}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                />
              </svg>
            ) : (
              // Moon Icon (when theme is light/loading, click to go dark)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.75}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}


export default Navbar;
