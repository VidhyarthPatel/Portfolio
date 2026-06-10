"use client";

import React, { useEffect, useRef } from "react";
import { useAnimate } from "motion/react";

interface Testimonial {
  text: string;
  name: string;
  role: string;
  avatar: string;
}

const row1: Testimonial[] = [
  {
    text: "your portfolio is stunning. i created mine some weeks ago but this is another planet.",
    name: "Francesco Ciulla",
    role: "Developer Advocate @daily.dev",
    avatar: "https://github.com/francescoxx.png",
  },
  {
    text: "Perfect iOS-like wheel picker for the web 🙌",
    name: "Ajay Patel",
    role: "Creator of shadcnstudio.com",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
  },
  {
    text: "The typography and minimalism here is top notch. Truly inspiring work!",
    name: "Marc Lou",
    role: "Creator of shipfa.st",
    avatar: "https://github.com/marclou.png",
  },
  {
    text: "This portfolio layout is incredibly clean. The animations are so smooth and polished.",
    name: "Lee Robinson",
    role: "VP of Product @ Vercel",
    avatar: "https://github.com/leerob.png",
  },
];

const row2: Testimonial[] = [
  {
    text: "Simple and clean, love it! 🌟",
    name: "David Haz",
    role: "Creator of reactbits.dev",
    avatar:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&h=150&q=80",
  },
  {
    text: "Congrats. Way to go.",
    name: "shadcn",
    role: "Creator of shadcn/ui",
    avatar: "https://github.com/shadcn.png",
  },
  {
    text: "This Portfolio is something else! Clean, minimalist and highly professional. Love it.",
    name: "Ajay Patel",
    role: "Creator of shadcnstudio.com",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
  },
  {
    text: "Stunning design! The code matches the visual quality perfectly. Great developer.",
    name: "Guillermo Rauch",
    role: "CEO of Vercel",
    avatar: "https://github.com/rauchg.png",
  },
];

function Testimonials() {
  const [row1Scope, row1Animate] = useAnimate();
  const [row2Scope, row2Animate] = useAnimate();

  const row1AnimationRef = useRef<any>(null);
  const row2AnimationRef = useRef<any>(null);

  useEffect(() => {
    // Left-to-right marquee (Top row)
    row1AnimationRef.current = row1Animate(
      row1Scope.current,
      { x: ["-50%", "0%"] },
      {
        ease: "linear",
        duration: 35,
        repeat: Infinity,
      },
    );
    return () => row1AnimationRef.current?.stop();
  }, [row1Animate, row1Scope]);

  useEffect(() => {
    // Right-to-left marquee (Bottom row)
    row2AnimationRef.current = row2Animate(
      row2Scope.current,
      { x: ["0%", "-50%"] },
      {
        ease: "linear",
        duration: 35,
        repeat: Infinity,
      },
    );
    return () => row2AnimationRef.current?.stop();
  }, [row2Animate, row2Scope]);

  const Card = ({ item }: { item: Testimonial }) => (
    <div className="w-[320px] shrink-0 mr-4 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 rounded-2xl p-5 flex flex-col justify-between hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-2xs transition-all duration-200 select-none cursor-default">
      <p className="text-neutral-800 dark:text-neutral-200 font-serif text-[14px] leading-relaxed mb-5 font-normal whitespace-normal">
        {item.text}
      </p>
      <div className="flex items-center gap-3">
        <img
          src={item.avatar}
          alt={item.name}
          className="w-10 h-10 rounded-full object-cover shrink-0 border border-neutral-100 dark:border-neutral-800"
          referrerPolicy="no-referrer"
        />
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-semibold text-neutral-900 dark:text-white leading-tight truncate">
            {item.name}
          </span>
          <span className="text-[10px] text-neutral-500 dark:text-neutral-400 leading-tight truncate mt-0.5 font-sans">
            {item.role}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <section className="p-5 relative overflow-hidden">
      <h2 className="mb-8 text-xl font-semibold text-neutral-900 dark:text-white font-sans">
        What People Say About Me
      </h2>

      <div className="flex flex-col gap-4 relative">
        {/* Row 1: Left to Right scrolling */}
        <div className="flex overflow-hidden marquee-mask w-full">
          <div
            ref={row1Scope}
            className="flex shrink-0"
            onMouseEnter={() => row1AnimationRef.current?.pause()}
            onMouseLeave={() => row1AnimationRef.current?.play()}
          >
            {row1.map((item, idx) => (
              <Card key={`row1-1-${idx}`} item={item} />
            ))}
            {row1.map((item, idx) => (
              <Card key={`row1-2-${idx}`} item={item} />
            ))}
          </div>
        </div>

        {/* Row 2: Right to Left scrolling */}
        <div className="flex overflow-hidden marquee-mask w-full">
          <div
            ref={row2Scope}
            className="flex shrink-0"
            onMouseEnter={() => row2AnimationRef.current?.pause()}
            onMouseLeave={() => row2AnimationRef.current?.play()}
          >
            {row2.map((item, idx) => (
              <Card key={`row2-1-${idx}`} item={item} />
            ))}
            {row2.map((item, idx) => (
              <Card key={`row2-2-${idx}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
