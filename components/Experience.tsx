"use client";

import Image from "next/image";
import { motion } from "motion/react";
import QuantamiseLogoImge from "@/public/QuantamiselogoImg.webp";
import ConvergeLogoImg from "@/public/convergedigitalsLogo.png";

import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiTailwindcss,
  SiTypescript,
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
  logoClassName?: string;
  tech: TechItem[];
}

const experiences: ExperienceItem[] = [
  {
    company: "Converge Digitals",
    role: "Frontend Developer",
    period: "Aug 2026 - Present",
    description:
      "Developing high-performance web applications and modern user interfaces with Next.js, React, and TypeScript. Collaborating with cross-functional teams to build scalable, responsive, and visually engaging digital experiences.",
    logo: ConvergeLogoImg,
    logoWidth: 50,
    logoHeight: 50,
    logoClassName: "rounded-xl border border-neutral-200 dark:border-neutral-800",
    tech: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "TailwindCSS", icon: SiTailwindcss, color: "#61DAFB" },
      { name: "Motion", icon: MotionIcon, color: "#0055FF" },
    ],
  },
  {
    company: "QuantamiseCode",
    role: "Software Developer Intern",
    period: "Jan 2026 - Jul 2026",
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
  const word = "Where I've Worked".split(" ");
  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      y: 10,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
    },
  };

  return (
    <section className="p-5">
      <motion.div
        className="mb-8 relative inline-block text-xl font-semibold text-neutral-900 dark:text-white"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <motion.div
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.05,
              },
            },
          }}
          className="flex gap-1"
        >
          {word.map((w, index) => (
            <motion.span
              key={index}
              variants={item}
              transition={{ duration: 0.1 }}
              className="whitespace-pre"
            >
              {w}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      <motion.div 
        className="flex flex-col gap-10"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {experiences.map((exp, index) => (
          <motion.div 
            key={index} 
            className="flex items-start justify-between gap-6"
            variants={item}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Content */}
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">{exp.company}</h3>

              <div className="mt-1.5 flex flex-wrap items-baseline gap-2">
                <span className="text-sm font-medium text-neutral-900 dark:text-neutral-200">{exp.role}</span>
                <span className="text-sm text-neutral-500 dark:text-neutral-400">{exp.period}</span>
              </div>

              <p className="mt-3 max-w-[620px] text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
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
                        duration: 0.4,
                      }}
                      className="group flex items-center h-6 w-6 border border-neutral-300 dark:border-neutral-700 overflow-hidden bg-neutral-100 dark:bg-neutral-800 z-10 hover:z-50 px-1 rounded-full cursor-pointer"
                    >
                      <div className="size-3.75 shrink-0 flex items-center justify-center">
                        <Icon
                          className={`h-full w-full ${tech.color === "#000000" ? "text-neutral-950 dark:text-neutral-50 fill-current" : ""}`}
                          style={{ color: tech.color === "#000000" ? undefined : tech.color }}
                        />
                      </div>

                      <p className="text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 ml-2 transition-all duration-300 font-medium text-neutral-700 dark:text-neutral-300">
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
                className={`object-contain ${exp.logoClassName || ""}`}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
