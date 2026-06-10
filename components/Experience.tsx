"use client";

import Image from "next/image";
import { motion } from "motion/react";
import QuantamiseLogoImge from "@/public/QuantamiselogoImg.webp";

import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiTailwindcss,
} from "react-icons/si";

const MotionIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 100" fill="currentColor" {...props}>
    <path d="M0 100V0l50 50 50-50v100L75 75l-25 25-25-25z" />
  </svg>
);

interface TechItem {
  name: string;
  icon: React.ComponentType<any>;
  color: string;
}

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string;
  logo: string | any;
  logoWidth: number;
  logoHeight: number;
  tech: TechItem[];
}

const experiences: ExperienceItem[] = [
  {
    company: "QuantamiseCode",
    role: "Software Developer Intern",
    period: "January 2026 - Present",
    description:
      "Building modern web applications using React, Next.js, and TypeScript while collaborating with the development team to deliver production-ready features.",
    logo: QuantamiseLogoImge,
    logoWidth: 60,
    logoHeight: 60,
    tech: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Express.js", icon: SiExpress, color: "#000000" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "Motion", icon: MotionIcon, color: "#0055FF" },
      { name: "TailwindCSS", icon: SiTailwindcss, color: "#61DAFB" },
    ],
  },
  {
    company: "Vedastik",
    role: "Frontend Developer (Freelance)",
    period: "December 2024 - February 2025",
    description:
      "Developed the full frontend for a startup web platform using ReactJS, TailwindCSS. Collaborated with a small founding team Implemented responsive UI, reusable components, and integrated design feedback.",
    logo: "https://www.vedastik.com/vedastik.svg",
    logoWidth: 45,
    logoHeight: 45,
    tech: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Motion", icon: MotionIcon, color: "#0055FF" },
      { name: "TailwindCSS", icon: SiTailwindcss, color: "#61DAFB" },
    ],
  },
];

export default function Experience() {
  return (
    <section className="p-5">
      <h2 className="mb-8 text-xl font-semibold">Where I've Worked</h2>

      <div className="flex flex-col gap-10">
        {experiences.map((exp, index) => (
          <div key={index} className="flex items-start justify-between gap-6">
            {/* Content */}
            <div className="flex-1">
              <h3 className="text-xl font-semibold">{exp.company}</h3>

              <div className="mt-1.5 flex flex-wrap items-baseline gap-2">
                <span className="text-sm font-medium">{exp.role}</span>
                <span className="text-sm text-neutral-500">{exp.period}</span>
              </div>

              <p className="mt-3 max-w-[620px] text-sm leading-relaxed text-neutral-600">
                {exp.description}
              </p>

              {/* Tech Stack */}
              <div className="h-4 flex items-center gap-4 mt-5 -space-x-6">
                {exp.tech.map((tech, idx) => {
                  const Icon = tech.icon;

                  return (
                    <motion.div
                      key={idx}
                      layout
                      initial={{
                        width: 24,
                      }}
                      whileHover={{
                        width: "auto",
                      }}
                      transition={{
                        ease: "easeInOut",
                        duration: 0.3,
                      }}
                      className="group flex items-center h-6 w-6 border border-neutral-300 overflow-hidden bg-neutral-100 z-10 hover:z-50 px-1 rounded-full cursor-pointer "
                    >
                      <div className="size-3.75 shrink-0 flex items-center justify-center">
                        <Icon
                          className="h-full w-full"
                          style={{ color: tech.color }}
                        />
                      </div>

                      <p className="text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 ml-2 transition-all duration-300 font-medium text-neutral-700">
                        {tech.name}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Logo */}
            <div className="shrink-0">
              <Image
                src={exp.logo}
                alt={`${exp.company} logo`}
                width={exp.logoWidth}
                height={exp.logoHeight}
                className="object-contain"
                priority
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
