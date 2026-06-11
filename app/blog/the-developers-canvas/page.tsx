import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/container";

export const metadata: Metadata = {
  title:
    "The Developer's Canvas: Why Design Sense Is Your Next Level-Up | Vidhyarth Patel",
  description:
    "In 2026, great developers aren't judged only by what they build — but by how it feels to use. That's where design sense becomes your next real level-up.",
};

export default function TheDevelopersCanvas() {
  return (
    <div className="bg-[#FAFAFA] dark:bg-neutral-900 min-h-screen">
      <Container className="border-x border-neutral-200 dark:border-neutral-800 min-h-screen">
        <article className="p-5 sm:p-8 max-w-none">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white text-sm transition-colors mb-8 group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m12 19-7-7 7-7"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 12H5"
              />
            </svg>
            Back to Blog
          </Link>

          {/* Meta info */}
          <div className="flex items-center gap-4 text-xs font-mono text-neutral-400 dark:text-neutral-500 mb-4">
            <span>Jan 08, 2026</span>
            <span className="text-neutral-300 dark:text-neutral-700">•</span>
            <span>5 min read</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-8 leading-tight text-neutral-900 dark:text-neutral-100">
            The Developer&apos;s Canvas: Why Design Sense Is Your Next Level-Up
          </h1>

          {/* Article body */}
          <div className="space-y-6 text-neutral-600 dark:text-neutral-300 leading-relaxed text-[15px] sm:text-base">
            <p>
              We&apos;ve all seen it: an app that technically works, but feels…
              off. The buttons respond, pages load, features exist — yet the
              experience doesn&apos;t feel smooth, polished, or enjoyable.
            </p>

            <p>
              In 2026, great developers aren&apos;t judged only by what they
              build — but by how it feels to use. That&apos;s where design sense
              becomes your next real level-up.
            </p>

            <p>
              Developing a design eye isn&apos;t about becoming a designer.
              It&apos;s about expanding your toolkit so the interfaces you build
              feel as good as they function.
            </p>

            {/* Section: Architecture of Good Design */}
            <h2 className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-neutral-100 pt-4">
              The Architecture of Good Design
            </h2>

            <p>
              Just like clean code follows principles, strong UI follows
              structure and logic.
            </p>

            <h3 className="text-base font-semibold text-neutral-800 dark:text-neutral-200 pt-2">
              Visual Hierarchy — the logic of the screen
            </h3>
            <p>
              Design is not random decoration. It&apos;s visual logic. By
              changing font size, weight, and contrast, you guide users toward
              what matters most — just like highlighting key parts of a system.
              If everything looks the same, nothing feels important.
            </p>

            <h3 className="text-base font-semibold text-neutral-800 dark:text-neutral-200 pt-2">
              The Power of Whitespace
            </h3>
            <p>
              In code, spacing makes logic readable. In UI, spacing makes
              experience breathable. Good whitespace:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2 text-neutral-500 dark:text-neutral-400">
              <li>Reduces cognitive load</li>
              <li>Improves focus</li>
              <li>Makes interfaces feel premium instead of crowded</li>
            </ul>
            <p>
              A calm layout is a fast layout — not in milliseconds, but in
              mental effort.
            </p>

            <h3 className="text-base font-semibold text-neutral-800 dark:text-neutral-200 pt-2">
              Purposeful Consistency
            </h3>
            <p>
              Think of this as your design system mindset. Consistent button
              styles, spacing, border radius, and typography turn scattered
              components into a cohesive product. Users feel trust when an
              interface behaves predictably. Consistency is not repetition —
              it&apos;s reliability.
            </p>

            {/* Section: Motion */}
            <h2 className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-neutral-100 pt-4">
              Motion: The Bridge Between Static and Alive
            </h2>
            <p>
              One of the fastest ways to upgrade your UI is through motion
              libraries like Framer Motion, GSAP, and React Spring. Motion is
              not decoration. It&apos;s communication.
            </p>
            <p>
              When something fades in, slides, or gently scales, you&apos;re
              telling the user: &quot;Yes — your action was received.&quot;
            </p>

            <h3 className="text-base font-semibold text-neutral-800 dark:text-neutral-200 pt-2">
              Why motion matters
            </h3>
            <ul className="list-disc list-inside space-y-2 ml-2 text-neutral-500 dark:text-neutral-400">
              <li>
                <span className="text-neutral-700 dark:text-neutral-300 font-medium">
                  Smooth state changes:
                </span>{" "}
                No harsh pops. No sudden jumps. Just calm transitions.
              </li>
              <li>
                <span className="text-neutral-700 dark:text-neutral-300 font-medium">
                  Visual feedback:
                </span>{" "}
                Hover effects, button taps, loading states — every
                micro-interaction builds confidence.
              </li>
              <li>
                <span className="text-neutral-700 dark:text-neutral-300 font-medium">
                  Attention control:
                </span>{" "}
                Subtle animation guides users better than any tooltip ever
                could.
              </li>
            </ul>
            <p>A static UI feels finished. A moving UI feels alive.</p>

            {/* Section: Why Design Sense Makes You Better */}
            <h2 className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-neutral-100 pt-4">
              Why Design Sense Makes You a Better Developer
            </h2>
            <p>
              Design awareness doesn&apos;t just help users — it helps you.
            </p>

            <h3 className="text-base font-semibold text-neutral-800 dark:text-neutral-200 pt-2">
              1. You start thinking in systems
            </h3>
            <p>
              Instead of random colors and spacing, you think in design tokens,
              spacing scales, and typography rhythm. Your UI becomes easier to
              maintain and easier to scale.
            </p>

            <h3 className="text-base font-semibold text-neutral-800 dark:text-neutral-200 pt-2">
              2. You build for perceived performance
            </h3>
            <p>
              A fast experience isn&apos;t only about load time. It&apos;s about
              how fast it feels. Skeletons, transitions, and micro-feedback make
              waiting invisible. The user feels speed — even when real speed
              stays the same.
            </p>

            <h3 className="text-base font-semibold text-neutral-800 dark:text-neutral-200 pt-2">
              3. You deliver craftsmanship, not just features
            </h3>
            <p>
              When spacing is tight, motion is smooth, and contrast is balanced,
              the product feels intentional. That polish tells users: This was
              built with care. And care is what separates tools from experiences.
            </p>

            {/* Section: Moving Forward */}
            <h2 className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-neutral-100 pt-4">
              Moving Forward
            </h2>
            <p>
              Design sense grows the same way coding skill does — by practice,
              not theory. Every project is a chance to notice alignment, spacing,
              contrast, timing, and motion. These details turn your work from
              functional to memorable.
            </p>
            <p>
              You don&apos;t need to become a designer. You just need to start
              thinking like someone who cares about the experience.
            </p>
          </div>

          {/* Footer divider */}
          <div className="border-t border-neutral-200 dark:border-neutral-800 mt-12 pt-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white text-sm transition-colors group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m12 19-7-7 7-7"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 12H5"
                />
              </svg>
              Back to all posts
            </Link>
          </div>
        </article>
      </Container>
    </div>
  );
}
