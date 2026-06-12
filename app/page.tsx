import Container from "@/components/container";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Socials from "@/components/Socials";
import Techstack from "@/components/Techstack";
import Testimonials from "@/components/Testimonials";
import BookCall from "@/components/BookCall";
import Footer from "@/components/Footer";

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
