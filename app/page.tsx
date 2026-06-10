import Container from "@/components/container";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Socials from "@/components/Socials";
import Techstack from "@/components/Techstack";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      <Container className="border-x border-neutral-200 min-h-screen divide-y divide-neutral-200">
        <Hero />
        <Socials />
        <Techstack />
        <Projects />
        <Experience />
        <Testimonials />
      </Container>
    </div>
  );
}
