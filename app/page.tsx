import Container from "@/components/container";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import Socials from "@/components/Socials";

const Techstack = dynamic(() => import("@/components/Techstack"));
const Projects = dynamic(() => import("@/components/Projects"));
const Experience = dynamic(() => import("@/components/Experience"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const BookCall = dynamic(() => import("@/components/BookCall"));

export default function Home() {
  return (
    <div className="bg-[#FAFAFA] dark:bg-neutral-900 min-h-screen">
      <Container className="border-x border-neutral-200 dark:border-neutral-800 min-h-screen divide-y divide-neutral-200 dark:divide-neutral-800">
        <Hero />
        <Socials />
        <Techstack />
        <Projects />
        <Experience />
        <Testimonials />
        <BookCall />
      </Container>
    </div>
  );
}
