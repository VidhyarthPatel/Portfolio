import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Container from "@/components/container";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = "https://vidhyarth.me";

export const metadata: Metadata = {
  title: "Vidhyarth Patel | Freelance Full Stack Developer – React, Next.js, Node.js",
  description:
    "Freelance Full Stack Developer specializing in React, Next.js, Node.js, Express.js, MongoDB and PostgreSQL. Hire me to build modern, high-performance web applications. Explore my projects, technical skills, and experience.",
  keywords: [
    "freelance developer",
    "freelance web developer",
    "freelance full stack developer",
    "hire freelance developer",
    "hire React developer",
    "hire Next.js developer",
    "hire Node.js developer",
    "freelance frontend developer",
    "freelance backend developer",
    "React developer for hire",
    "Next.js freelancer",
    "MERN stack developer",
    "full stack developer India",
    "freelance developer Gujarat",
    "Vidhyarth Patel",
    "web application developer",
    "PostgreSQL developer",
    "MongoDB developer",
    "Express.js developer",
    "freelance software engineer",
  ],
  authors: [{ name: "Vidhyarth Patel", url: siteUrl }],
  creator: "Vidhyarth Patel",
  publisher: "Vidhyarth Patel",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Vidhyarth Patel – Freelance Developer",
    title: "Vidhyarth Patel | Freelance Full Stack Developer – React, Next.js, Node.js",
    description:
      "Freelance Full Stack Developer available for hire. I build modern web apps with React, Next.js, Node.js, Express.js, MongoDB & PostgreSQL. Check out my portfolio and let's work together.",
    images: [
      {
        url: "/profileImg.png",
        width: 1200,
        height: 630,
        alt: "Vidhyarth Patel – Freelance Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vidhyarth Patel | Freelance Full Stack Developer",
    description:
      "Freelance Full Stack Developer specializing in React, Next.js, Node.js, Express.js, MongoDB & PostgreSQL. Available for hire.",
    images: ["/profileImg.png"],
    creator: "@vidhyarth",
  },
  category: "technology",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Vidhyarth Patel",
  url: siteUrl,
  image: `${siteUrl}/profileImg.png`,
  jobTitle: "Freelance Full Stack Developer",
  description:
    "Freelance Full Stack Developer specializing in React, Next.js, Node.js, Express.js, MongoDB and PostgreSQL. Available for hire to build modern, high-performance web applications.",
  email: "mailto:vidyarthpatel@gmail.com",
  telephone: "+918200133902",
  address: {
    "@type": "PostalAddress",
    addressRegion: "Gujarat",
    addressCountry: "IN",
  },
  sameAs: [
    "https://github.com/vidhyarth",
    "https://linkedin.com/in/vidhyarth",
    "https://x.com/vidhyarth",
    "https://instagram.com/vidhyarth",
  ],
  knowsAbout: [
    "React",
    "Next.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "PostgreSQL",
    "JavaScript",
    "TypeScript",
    "Tailwind CSS",
    "Full Stack Development",
    "Frontend Development",
    "Backend Development",
    "Web Application Development",
  ],
  makesOffer: {
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: "Freelance Web Development",
      description:
        "Custom web application development using React, Next.js, Node.js, Express.js, MongoDB and PostgreSQL.",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedTheme = localStorage.getItem('theme');
                  var systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })()
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#FAFAFA] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
        <ThemeProvider>
          <Container className="sticky top-0 z-50 border-x border-b border-neutral-200 dark:border-neutral-800 px-5 bg-[#FAFAFA]/80 dark:bg-neutral-900/80 backdrop-blur-md">
            <Navbar />
          </Container>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
