import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/container";

export const metadata: Metadata = {
  title: "Blog | Vidhyarth Patel – Freelance Full Stack Developer",
  description:
    "Read articles on web development, design, React, Next.js, and more by Vidhyarth Patel – Freelance Full Stack Developer.",
};

const blogs = [
  {
    slug: "the-developers-canvas",
    title: "The Developer's Canvas: Why Design Sense Is Your Next Level-Up",
    description:
      "In 2026, great developers aren't judged only by what they build — but by how it feels to use. That's where design sense becomes your next real level-up.",
    date: "Jan 08, 2026",
    readTime: "5 min read",
  },
];

export default function BlogPage() {
  return (
    <div className="bg-[#FAFAFA] dark:bg-neutral-900 min-h-screen">
      <Container className="border-x border-neutral-200 dark:border-neutral-800 min-h-screen">
        <div className="p-5 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
            Blog
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-8">
            Thoughts on development, design, and building for the web.
          </p>

          <div className="flex flex-col gap-4">
            {blogs.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <article className="group relative rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-5 sm:p-6 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
                    <div className="flex-1 min-w-0">
                      <h2 className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-700 dark:group-hover:text-white transition-colors leading-snug">
                        {post.title}
                      </h2>
                      <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-2 line-clamp-2">
                        {post.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-mono text-neutral-400 dark:text-neutral-500 shrink-0 mt-1 sm:mt-1">
                      <span>{post.date}</span>
                      <span className="text-neutral-300 dark:text-neutral-700">
                        •
                      </span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Hover arrow */}
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2 transition-all duration-300 text-neutral-400 dark:text-neutral-500 hidden sm:block">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
