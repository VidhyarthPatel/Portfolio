import React from "react";
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
      value: "github.com/vidhyarth",
      href: "https://github.com/vidhyarth",
      icon: <HugeiconsIcon icon={GithubIcon} size={18} />,
    },
    {
      name: "X (Twitter)",
      value: "x.com/vidhyarth",
      href: "https://x.com",
      icon: <HugeiconsIcon icon={NewTwitterIcon} size={18} />,
    },
    {
      name: "Instagram",
      value: "instagram.com/vidhyarth",
      href: "https://instagram.com",
      icon: <HugeiconsIcon icon={InstagramIcon} size={18} />,
    },
    {
      name: "LinkedIn",
      value: "linked.com/vidhyarth",
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
    <a
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
      <div className="flex items-center justify-center w-8 h-8 rounded-lg border border-neutral-200 bg-neutral-100 shadow-3xs group-hover:border-neutral-300 group-hover:bg-white transition-colors">
        {item.icon}
      </div>
      <span className="text-sm font-mono tracking-tight text-neutral-700 group-hover:text-neutral-950 group-hover:underline decoration-neutral-300 underline-offset-4 transition-colors">
        {item.value}
      </span>
    </a>
  );

  return (
    <div className="grid grid-cols-2 p-5 backdrop-blur-xs">
      {/* Left Column */}
      <div className="flex flex-col gap-1 pr-6">
        {leftColumn.map(renderItem)}
      </div>

      {/* Right Column */}
      <div className="flex flex-col mt-5 gap-1 pl-8 border-l border-dashed border-neutral-200">
        {rightColumn.map(renderItem)}
      </div>
    </div>
  );
}

export default Socials;
