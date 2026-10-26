import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/container";
import ExpressMiddlewareDiagram from "@/components/blog/ExpressMiddlewareDiagram";

export const metadata: Metadata = {
  title:
    "Express.js & Middleware Architecture: The High-Level Guide | Vidhyarth Patel",
  description:
    "A clean, high-level architectural guide to Express.js and middleware — how the request-response pipeline works, the 5 types of middleware, and essential execution patterns.",
  openGraph: {
    title: "Express.js & Middleware Architecture | Vidhyarth Patel",
    description:
      "A high-level mental model of Express.js: routing, the middleware pipeline, req/res/next lifecycle, and error handling.",
    type: "article",
  },
};

export default function ExpressMiddlewareBlog() {
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

          {/* Meta & Badges */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-neutral-400 dark:text-neutral-500 mb-4">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold">
              Backend Architecture
            </span>
            <span>Oct 26, 2026</span>
            <span className="text-neutral-300 dark:text-neutral-700">•</span>
            <span>6 min read</span>
            <span className="text-neutral-300 dark:text-neutral-700">•</span>
            <span className="text-neutral-500 dark:text-neutral-400">Express.js</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-6 leading-tight text-neutral-900 dark:text-neutral-100">
            Express.js and Middleware: The High-Level Architecture
          </h1>

          <p className="text-base sm:text-lg text-neutral-500 dark:text-neutral-400 leading-relaxed mb-8 border-b border-neutral-200 dark:border-neutral-800 pb-8">
            Express.js is described as a <em>&quot;fast, unopinionated, minimalist web framework for Node.js.&quot;</em> But at its core, an Express application is remarkably simple: <strong>it is fundamentally a series of middleware function calls chained together.</strong> Here is the high-level architecture of how Express works and how requests flow through its pipeline.
          </p>

          {/* Article Body */}
          <div className="space-y-7 text-neutral-600 dark:text-neutral-300 leading-relaxed text-[15px] sm:text-base">
            {/* Section 1: What is Express? */}
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100 pt-2">
              1. What is Express.js, Really?
            </h2>

            <p>
              Node.js includes a native <code className="px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-xs font-mono">http</code> module. While functional, writing clean APIs with native Node requires manually parsing query strings, buffering raw JSON chunks from TCP streams, handling CORS headers, and writing massive <code className="px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-xs font-mono">switch(req.url)</code> statements.
            </p>

            <p>
              Express is a thin, elegant wrapper around Node&apos;s native <code className="px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-xs font-mono">http.createServer()</code>. It introduces two primary superpowers:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2">
              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60">
                <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1 text-sm sm:text-base">
                  1. Express Routing
                </h4>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Maps incoming HTTP verbs (<code className="font-mono text-emerald-600 dark:text-emerald-400">GET</code>, <code className="font-mono text-emerald-600 dark:text-emerald-400">POST</code>, <code className="font-mono text-emerald-600 dark:text-emerald-400">PUT</code>, <code className="font-mono text-emerald-600 dark:text-emerald-400">DELETE</code>) and URL paths to specific controller logic, extracting route parameters like <code className="font-mono">/users/:id</code>.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60">
                <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1 text-sm sm:text-base">
                  2. The Middleware Pipeline
                </h4>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  A composable chain of functions that intercept, inspect, modify, or terminate HTTP requests before they reach your final route handler.
                </p>
              </div>
            </div>

            {/* Section 2: What is Middleware? */}
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100 pt-6">
              2. What is Middleware? (The Core Mental Model)
            </h2>

            <p>
              A <strong>middleware function</strong> is simply a function that has direct access to three things:
            </p>

            <ol className="list-decimal list-inside space-y-1.5 ml-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-mono">
              <li><strong className="text-neutral-900 dark:text-neutral-100 font-sans">req:</strong> The incoming HTTP Request object (headers, body, params, query)</li>
              <li><strong className="text-neutral-900 dark:text-neutral-100 font-sans">res:</strong> The outgoing HTTP Response object (status, json, send, headers)</li>
              <li><strong className="text-neutral-900 dark:text-neutral-100 font-sans">next:</strong> A callback function that passes execution to the next middleware in the chain</li>
            </ol>

            <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-950 text-neutral-100 p-4 font-mono text-xs sm:text-sm overflow-x-auto my-3">
              <pre className="text-emerald-300">
                <code>{`// The canonical middleware signature:
function myMiddleware(req, res, next) {
  // 1. Perform logic / inspect request
  console.log(\`[\${req.method}] \${req.url}\`);

  // 2. Mutate request or response
  req.requestTime = Date.now();

  // 3. Hand over control to the next function
  next(); 
}`}</code>
              </pre>
            </div>

            <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/5 dark:bg-amber-950/20 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
              <strong className="text-amber-800 dark:text-amber-400">The Golden Middleware Rule:</strong> Every middleware function <strong>must</strong> either:
              <ul className="list-disc list-inside mt-1 space-y-1 text-neutral-600 dark:text-neutral-300">
                <li><strong>End the request-response cycle</strong> (by sending data via <code className="font-mono">res.send()</code>, <code className="font-mono">res.json()</code>, or <code className="font-mono">res.end()</code>), OR</li>
                <li><strong>Call <code className="font-mono">next()</code></strong> to pass control to the next middleware.</li>
              </ul>
              If a middleware does neither, the client request will hang indefinitely until it times out!
            </div>

            {/* Section 3: The Middleware Pipeline Diagram */}
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100 pt-6">
              3. The Middleware Pipeline: How a Request Travels
            </h2>

            <p>
              When an HTTP request enters an Express server, it travels down a linear pipeline (often visualized as an onion or assembly line). Each middleware performs a specific job before handing the baton forward.
            </p>

            {/* Interactive Pipeline Diagram */}
            <ExpressMiddlewareDiagram />

            {/* Section 4: The 5 Types of Middleware */}
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100 pt-6">
              4. The 5 Types of Express Middleware
            </h2>

            <p>
              Express categorizes middleware into five distinct types based on how and where they are mounted:
            </p>

            <div className="space-y-3.5 my-4">
              {/* Type 1 */}
              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm sm:text-base">
                    1. Application-Level Middleware
                  </h4>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                    app.use() / app.METHOD()
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-2">
                  Bound directly to the Express application instance using <code className="font-mono">app.use()</code> or HTTP verbs like <code className="font-mono">app.get()</code>. Executes for every incoming request or for a specific path prefix.
                </p>
                <pre className="p-2.5 rounded bg-neutral-900 text-neutral-200 text-xs font-mono overflow-x-auto">
                  <code>{`// Executes on EVERY request
app.use((req, res, next) => {
  console.log("Global Logger");
  next();
});`}</code>
                </pre>
              </div>

              {/* Type 2 */}
              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm sm:text-base">
                    2. Router-Level Middleware
                  </h4>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                    router.use()
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-2">
                  Works identically to application-level middleware, but is bound to an isolated instance of <code className="font-mono">express.Router()</code>. Ideal for modular routing (e.g. all <code className="font-mono">/api/users</code> routes).
                </p>
                <pre className="p-2.5 rounded bg-neutral-900 text-neutral-200 text-xs font-mono overflow-x-auto">
                  <code>{`const router = express.Router();
// Protects only routes registered on this router
router.use(authMiddleware);
router.get("/profile", getUserProfile);
app.use("/api/users", router);`}</code>
                </pre>
              </div>

              {/* Type 3 */}
              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm sm:text-base">
                    3. Error-Handling Middleware
                  </h4>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400 border border-rose-300 dark:border-rose-900">
                    (err, req, res, next)
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-2">
                  Must take <strong>exactly 4 parameters</strong> so Express recognizes it as an error handler. Whenever any previous middleware calls <code className="font-mono">next(error)</code>, Express immediately skips all remaining normal middleware and routes execution directly here.
                </p>
                <pre className="p-2.5 rounded bg-neutral-900 text-neutral-200 text-xs font-mono overflow-x-auto">
                  <code>{`// Placed at the very bottom of your app file
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});`}</code>
                </pre>
              </div>

              {/* Type 4 */}
              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm sm:text-base">
                    4. Built-in Middleware
                  </h4>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                    express.*
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-2">
                  Bundled directly with Express without requiring external packages:
                </p>
                <ul className="list-disc list-inside space-y-1 text-xs text-neutral-500 dark:text-neutral-400">
                  <li><code className="font-mono">express.json()</code>: Parses incoming requests with JSON payloads.</li>
                  <li><code className="font-mono">express.urlencoded()</code>: Parses URL-encoded form submissions.</li>
                  <li><code className="font-mono">express.static()</code>: Serves static assets like images, HTML, and CSS files.</li>
                </ul>
              </div>

              {/* Type 5 */}
              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm sm:text-base">
                    5. Third-Party Middleware
                  </h4>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                    npm ecosystem
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-2">
                  Battle-tested community packages added via npm:
                </p>
                <div className="flex flex-wrap gap-2 text-xs font-mono text-neutral-600 dark:text-neutral-400">
                  <span className="px-2 py-1 rounded bg-neutral-100 dark:bg-neutral-800">cors</span>
                  <span className="px-2 py-1 rounded bg-neutral-100 dark:bg-neutral-800">helmet (security headers)</span>
                  <span className="px-2 py-1 rounded bg-neutral-100 dark:bg-neutral-800">morgan (HTTP logger)</span>
                  <span className="px-2 py-1 rounded bg-neutral-100 dark:bg-neutral-800">cookie-parser</span>
                </div>
              </div>
            </div>

            {/* Section 5: The Behavior of next() */}
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100 pt-6">
              5. Mastering next(): The 3 Invocations
            </h2>

            <p>
              How you invoke <code className="px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-xs font-mono">next()</code> dictates the entire path of request execution:
            </p>

            <div className="overflow-x-auto my-3">
              <table className="w-full text-left text-xs sm:text-sm border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden font-mono">
                <thead className="bg-neutral-100 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300">
                  <tr>
                    <th className="p-3 border-b border-neutral-200 dark:border-neutral-800">Call</th>
                    <th className="p-3 border-b border-neutral-200 dark:border-neutral-800">What It Does</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 text-xs">
                  <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-900/40">
                    <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">next()</td>
                    <td className="p-3 font-sans text-neutral-600 dark:text-neutral-300">
                      Standard pass. Immediately advances execution to the next middleware or route handler in line.
                    </td>
                  </tr>
                  <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-900/40">
                    <td className="p-3 text-rose-600 dark:text-rose-400 font-bold">next(err)</td>
                    <td className="p-3 font-sans text-neutral-600 dark:text-neutral-300">
                      Error signal. Passing any argument (except <code className="font-mono">&apos;route&apos;</code>) instructs Express to abort the normal chain and jump directly to the 4-argument error-handling middleware.
                    </td>
                  </tr>
                  <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-900/40">
                    <td className="p-3 text-purple-600 dark:text-purple-400 font-bold">next(&apos;route&apos;)</td>
                    <td className="p-3 font-sans text-neutral-600 dark:text-neutral-300">
                      Bypass current route. Skips the remaining middleware callbacks inside the current route handler and passes control to the next matched route. (Only works in <code className="font-mono">app.METHOD</code> or <code className="font-mono">router.METHOD</code>).
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Section 6: Key Takeaway Summary */}
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100 pt-6">
              6. Summary: The Mental Model in 3 Sentences
            </h2>

            <div className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100/50 dark:bg-neutral-950/50 text-neutral-700 dark:text-neutral-300 space-y-2 text-sm sm:text-base">
              <p>
                <strong>1. Pipeline Order Matters:</strong> Express executes middleware strictly in the order they are defined via <code className="font-mono text-emerald-600 dark:text-emerald-400">app.use()</code>.
              </p>
              <p>
                <strong>2. State Lives on req:</strong> Middleware communicates downstream by attaching properties to the shared <code className="font-mono text-emerald-600 dark:text-emerald-400">req</code> object (e.g. <code className="font-mono">req.user</code>, <code className="font-mono">req.body</code>).
              </p>
              <p>
                <strong>3. Always End or Forward:</strong> Every middleware must either terminate the cycle with a response or invoke <code className="font-mono text-emerald-600 dark:text-emerald-400">next()</code>.
              </p>
            </div>
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
