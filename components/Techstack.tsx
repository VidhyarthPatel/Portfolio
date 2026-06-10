import React from "react";
import { IconType } from "react-icons";
import {
  SiTypescript,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiRedux,
  SiTailwindcss,
  SiPostgresql,
  SiMongodb,
  SiGit,
  SiPrisma,
  SiVercel,
  SiRedis,
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

const techStack: TechItem[] = [
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Express.js", icon: SiExpress, color: "#000000" },
  { name: "Redux", icon: SiRedux, color: "#764ABC" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Motion", icon: MotionIcon, color: "#0055FF" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "Prisma", icon: SiPrisma, color: "#2D3748" },
  { name: "Vercel", icon: SiVercel, color: "#000000" },
  { name: "Redis", icon: SiRedis, color: "#DC382D" },
];

function TechStack() {
  return (
    <div className="py-6 px-6 bg-[#FAFAFA] backdrop-blur-xs">
      <div className="flex flex-wrap gap-2">
        {techStack.map((tech, index) => {
          const Icon = tech.icon;
          return (
            <div
              key={index}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-neutral-200 bg-white/70 hover:bg-white hover:border-neutral-300 hover:shadow-3xs transition-all duration-200 cursor-default select-none group"
            >
              <div className="flex items-center justify-center w-3.5 h-3.5 shrink-0">
                <Icon className="w-full h-full" style={{ color: tech.color }} />
              </div>
              <span className="text-xs font-sans font-normal tracking-tight text-neutral-600 group-hover:text-neutral-900 transition-colors">
                {tech.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TechStack;
