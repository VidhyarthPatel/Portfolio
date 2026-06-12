"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme | null;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme | null>(null);

  useEffect(() => {
    // Disable transitions during initialization
    document.documentElement.classList.add("disable-transitions");
    
    // Determine initial theme on mount
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    let initialTheme: Theme;
    
    if (savedTheme) {
      initialTheme = savedTheme;
    } else {
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      initialTheme = systemPrefersDark ? "dark" : "light";
    }

    setThemeState(initialTheme);
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
    // Force a style reflow and remove the class
    window.getComputedStyle(document.documentElement).opacity;
    document.documentElement.classList.remove("disable-transitions");
  }, []);

  const setTheme = (newTheme: Theme) => {
    // Disable transitions globally for the toggle snap
    document.documentElement.classList.add("disable-transitions");

    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Force a style reflow to apply the theme instantly
    window.getComputedStyle(document.documentElement).opacity;

    // Re-enable transitions in the next frame
    requestAnimationFrame(() => {
      document.documentElement.classList.remove("disable-transitions");
    });
  };

  const toggleTheme = () => {
    if (!theme) return;
    const newTheme: Theme = theme === "light" ? "dark" : "light";
    
    const audio = new Audio("/toggle sound.mp3");
    audio.play().catch((e) => console.log("Audio play error:", e));

    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
