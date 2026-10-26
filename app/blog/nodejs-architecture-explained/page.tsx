import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/container";
import NodeArchitectureDiagram from "@/components/blog/NodeArchitectureDiagram";
import RequestFlowDiagram from "@/components/blog/RequestFlowDiagram";
import EventLoopDiagram from "@/components/blog/EventLoopDiagram";

export const metadata: Metadata = {
  title:
    "Demystifying Node.js Architecture: How Single-Threaded JavaScript Scales to Millions | Vidhyarth Patel",
  description:
    "An in-depth breakdown of Node.js internal architecture — V8 engine, libuv, the Event Loop phases, worker threadpool, and how non-blocking I/O really works under the hood.",
  openGraph: {
    title: "Demystifying Node.js Architecture | Vidhyarth Patel",
    description:
      "A deep dive into V8, libuv, the 6 Event Loop phases, worker threadpool, and how Node.js achieves high-concurrency non-blocking I/O.",
    type: "article",
  },
};

export default function NodejsArchitectureBlog() {
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
              Deep Dive
            </span>
            <span>Oct 26, 2026</span>
            <span className="text-neutral-300 dark:text-neutral-700">•</span>
            <span>12 min read</span>
            <span className="text-neutral-300 dark:text-neutral-700">•</span>
            <span className="text-neutral-500 dark:text-neutral-400">Node.js Internals</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-6 leading-tight text-neutral-900 dark:text-neutral-100">
            Demystifying Node.js Architecture: How Single-Threaded JavaScript Scales to Millions
          </h1>

          <p className="text-base sm:text-lg text-neutral-500 dark:text-neutral-400 leading-relaxed mb-8 border-b border-neutral-200 dark:border-neutral-800 pb-8">
            Node.js powers everything from Netflix and Uber to PayPal and LinkedIn. Yet, ask most developers how it actually executes asynchronous code, and you&apos;ll often hear: <em>&quot;It&apos;s just single-threaded with an event loop.&quot;</em> But is it truly single-threaded? What is libuv? How does it handle 50,000 requests without choking? Let&apos;s pop open the hood and explore the real engineering behind Node.js.
          </p>

          {/* Article Body */}
          <div className="space-y-7 text-neutral-600 dark:text-neutral-300 leading-relaxed text-[15px] sm:text-base">
            {/* Section 1: The Origin Story */}
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100 pt-2">
              1. The Origin Story: The C10K Problem
            </h2>

            <p>
              In 2009, Ryan Dahl set out to solve a notorious bottleneck in web infrastructure known as the <strong>C10K problem</strong> — the challenge of handling 10,000 concurrent client connections on a single web server.
            </p>

            <p>
              At the time, the dominant web server was Apache HTTP Server. Apache used a <strong>multi-threaded, thread-per-request model</strong>:
            </p>

            <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100/50 dark:bg-neutral-950/50 p-4 sm:p-5">
              <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2 text-sm sm:text-base">
                The Thread-Per-Connection Dilemma:
              </h4>
              <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                <li>Each incoming HTTP request spawned a dedicated operating system thread.</li>
                <li>Each thread reserved 1MB to 2MB of stack memory in RAM.</li>
                <li>10,000 active connections consumed ~20GB of memory just maintaining idle threads!</li>
                <li>The OS CPU spent up to 80% of its cycles performing <em>context switching</em> between threads rather than executing actual application code.</li>
              </ul>
            </div>

            <p>
              Ryan Dahl asked a simple yet radical question: <em>&quot;Why should an idle connection waiting for a database response hold an entire OS thread hostage?&quot;</em>
            </p>

            <p>
              His solution was to combine Google&apos;s high-performance <strong>V8 JavaScript engine</strong> with an event-driven C library called <strong>libuv</strong>. The result was a runtime that uses a <strong>single main thread for JavaScript execution</strong>, while delegating all asynchronous I/O to the operating system kernel and background worker threads.
            </p>

            {/* Callout: Common Myths */}
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-950/20 p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <h4 className="font-semibold text-emerald-900 dark:text-emerald-300 text-sm sm:text-base">
                  Clearing Up Common Misconceptions
                </h4>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300">
                <li>
                  <strong className="text-neutral-900 dark:text-neutral-100">Myth 1: Node.js is a framework or language.</strong>{" "}
                  Reality: Node.js is neither. JavaScript is the programming language; Node.js is a C/C++ runtime environment that executes JavaScript outside the browser.
                </li>
                <li>
                  <strong className="text-neutral-900 dark:text-neutral-100">Myth 2: Node.js is 100% single-threaded.</strong>{" "}
                  Reality: Your JavaScript code runs on a single main thread, but Node.js behind the scenes utilizes multi-threaded C libraries (via libuv) and multi-core OS kernel facilities.
                </li>
              </ul>
            </div>

            {/* Section 2: Architectural Stack */}
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100 pt-6">
              2. The Multi-Layer Anatomy of Node.js
            </h2>

            <p>
              To understand how Node.js functions, think of it as a layered stack. When you type <code className="px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-xs font-mono">fs.readFile()</code> or <code className="px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-xs font-mono">http.createServer()</code>, your request cascades down through multiple specialized subsystems before ever touching the physical hardware.
            </p>

            {/* Interactive Architecture Diagram */}
            <NodeArchitectureDiagram />

            <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 pt-3">
              The Key Pillars of the Engine Room
            </h3>

            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60">
                <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 text-base mb-1">
                  1. Google V8 Engine (C++)
                </h4>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-2">
                  Created by Google for the Chrome browser, V8 is an open-source, ultra-optimized JavaScript engine written in C++. It parses JavaScript source code into an Abstract Syntax Tree (AST), translates it into bytecode with the <strong>Ignition</strong> interpreter, and continuously compiles frequently executed (&quot;hot&quot;) code into native machine code using the <strong>TurboFan</strong> JIT (Just-In-Time) optimizing compiler.
                </p>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  V8 also provides the <strong>Memory Heap</strong> (where objects and variables are allocated) and the <strong>Call Stack</strong> (where synchronous execution frames are tracked).
                </p>
              </div>

              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60">
                <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 text-base mb-1">
                  2. libuv (C Library)
                </h4>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-2">
                  If V8 is the brain of Node.js, <strong>libuv is the muscular nervous system</strong>. Written specifically for Node.js, libuv is a multi-platform C support library with a focus on asynchronous I/O.
                </p>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  libuv is responsible for the <strong>Event Loop</strong>, cross-platform asynchronous socket abstractions, file descriptor polling, child process IPC, timers, and the <strong>Worker Thread Pool</strong>.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60">
                <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 text-base mb-1">
                  3. Node.js C++ Bindings & Addons
                </h4>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  JavaScript itself has no built-in capability to write bytes directly to a physical hard drive, create TCP sockets, or perform low-level cryptographic hashing. The C++ bindings act as a bridge, exposing native system primitives directly to JavaScript modules in <code className="px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-xs font-mono">node:fs</code>, <code className="px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-xs font-mono">node:net</code>, and <code className="px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-xs font-mono">node:crypto</code>.
                </p>
              </div>
            </div>

            {/* Section 3: How Requests Work (Non-blocking I/O) */}
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100 pt-6">
              3. The Non-Blocking Request Lifecycle
            </h2>

            <p>
              How does a single JavaScript thread handle thousands of simultaneous user requests without freezing? The secret lies in <strong>delegation</strong>.
            </p>

            <p>
              Imagine a fast-casual restaurant:
            </p>

            <ul className="list-disc list-inside space-y-1.5 ml-2 text-neutral-600 dark:text-neutral-400 text-sm">
              <li>
                In the <strong>multi-threaded model (Apache)</strong>, one waiter stands at table 1, takes the order, walks to the kitchen, and waits in the kitchen until the chef finishes grilling the steak before returning to table 1. You need 50 waiters for 50 tables.
              </li>
              <li>
                In the <strong>Node.js model</strong>, there is one super-fast waiter (the Main Thread). The waiter takes table 1&apos;s order, hands the ticket to the kitchen, and immediately turns around to serve table 2 and table 3. When table 1&apos;s meal is ready, the kitchen dings a bell (Event Loop notification), and the waiter serves the dish during their next pass.
              </li>
            </ul>

            {/* Request Flow Diagram */}
            <RequestFlowDiagram />

            <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 pt-3">
              OS Kernel Asynchrony vs. libuv Thread Pool
            </h3>

            <p>
              Here is a nuance that separates junior developers from senior engineers: <strong>Not all asynchronous operations in Node.js use the worker threadpool!</strong>
            </p>

            <div className="overflow-x-auto my-4">
              <table className="w-full text-left text-xs sm:text-sm border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
                <thead className="bg-neutral-100 dark:bg-neutral-800/80 font-mono text-neutral-700 dark:text-neutral-300">
                  <tr>
                    <th className="p-3 border-b border-neutral-200 dark:border-neutral-800">Operation Type</th>
                    <th className="p-3 border-b border-neutral-200 dark:border-neutral-800">Handled By</th>
                    <th className="p-3 border-b border-neutral-200 dark:border-neutral-800">Mechanism & Threads Used</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 font-mono text-xs">
                  <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-900/40">
                    <td className="p-3 font-semibold text-emerald-600 dark:text-emerald-400">Network I/O (HTTP, TCP, UDP, Sockets)</td>
                    <td className="p-3">OS Kernel</td>
                    <td className="p-3 text-neutral-500 dark:text-neutral-400 font-sans">
                      Non-blocking kernel polling via <code>epoll</code> (Linux), <code>kqueue</code> (macOS), <code>IOCP</code> (Windows). <strong>0 worker threads consumed!</strong>
                    </td>
                  </tr>
                  <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-900/40">
                    <td className="p-3 font-semibold text-amber-600 dark:text-amber-400">File System I/O (fs.readFile, fs.writeFile)</td>
                    <td className="p-3">libuv Thread Pool</td>
                    <td className="p-3 text-neutral-500 dark:text-neutral-400 font-sans">
                      Most operating systems do NOT provide true non-blocking file API. libuv simulates non-blocking file I/O using worker threads.
                    </td>
                  </tr>
                  <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-900/40">
                    <td className="p-3 font-semibold text-purple-600 dark:text-purple-400">Cryptography (crypto.pbkdf2, scrypt, randomBytes)</td>
                    <td className="p-3">libuv Thread Pool</td>
                    <td className="p-3 text-neutral-500 dark:text-neutral-400 font-sans">
                      CPU-heavy mathematical hashing operations offloaded to avoid blocking the main event loop.
                    </td>
                  </tr>
                  <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-900/40">
                    <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">Data Compression (zlib.gzip, deflate, brotli)</td>
                    <td className="p-3">libuv Thread Pool</td>
                    <td className="p-3 text-neutral-500 dark:text-neutral-400 font-sans">
                      Compute-intensive compression algorithms executed asynchronously in background worker threads.
                    </td>
                  </tr>
                  <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-900/40">
                    <td className="p-3 font-semibold text-rose-600 dark:text-rose-400">DNS Lookups (dns.lookup)</td>
                    <td className="p-3">libuv Thread Pool</td>
                    <td className="p-3 text-neutral-500 dark:text-neutral-400 font-sans">
                      Uses synchronous libc <code>getaddrinfo(3)</code> under the hood, running in threadpool. Note: <code>dns.resolve*</code> uses <code>c-ares</code> without threads.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Deep dive thread pool size */}
            <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100/40 dark:bg-neutral-950/40">
              <h4 className="font-semibold text-sm sm:text-base text-neutral-900 dark:text-neutral-100 mb-1">
                Tuning the Thread Pool: <code className="text-emerald-600 dark:text-emerald-400 font-mono">UV_THREADPOOL_SIZE</code>
              </h4>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-3">
                By default, libuv spawns a thread pool of <strong>4 worker threads</strong>. If your server executes 5 simultaneous heavy file reads or password hashes, the 5th operation must wait in line until one of the first four completes. You can increase this limit (up to a maximum of 1024 or 128 depending on platform) before the Node process boots:
              </p>
              <pre className="rounded-lg bg-neutral-900 text-neutral-100 p-3 text-xs font-mono overflow-x-auto border border-neutral-800">
                <code>{`# Increase libuv worker threads from default 4 to 16
UV_THREADPOOL_SIZE=16 node server.js`}</code>
              </pre>
            </div>

            {/* Section 4: The Event Loop Breakdown */}
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100 pt-6">
              4. The Event Loop: All 6 Phases Dissected
            </h2>

            <p>
              The <strong>Event Loop</strong> is often spoken of as an abstract concept, but in reality, it is a clean, structured C loop inside libuv (<code className="px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-xs font-mono">uv_run</code>) that iterates continuously as long as there are pending timers, active I/O handles, or background operations.
            </p>

            <p>
              Each complete rotation of the event loop is called a <strong>Tick</strong>. During every single tick, the event loop steps sequentially through <strong>six distinct phases</strong> in exact clockwise order:
            </p>

            {/* Interactive Event Loop Diagram */}
            <EventLoopDiagram />

            <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 pt-3">
              The Two VIP Microtask Queues: The Rule of Node v11+
            </h3>

            <p>
              Notice the two special microtask queues highlighted in amber above. They do not belong to the standard libuv loop cycle:
            </p>

            <ul className="list-disc list-inside space-y-2 ml-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
              <li>
                <strong className="text-neutral-900 dark:text-neutral-100">process.nextTick() Queue:</strong> Holds the highest execution priority in the entire Node.js runtime. Whenever a JavaScript operation finishes executing on the call stack, Node immediately drains this queue before moving to any other microtask or event loop phase.
              </li>
              <li>
                <strong className="text-neutral-900 dark:text-neutral-100">Promise Microtask Queue:</strong> Manages resolved Promises (<code className="font-mono text-xs">.then()</code>, <code className="font-mono text-xs">.catch()</code>, <code className="font-mono text-xs">async/await</code> continuations) and <code className="font-mono text-xs">queueMicrotask()</code>. It drains immediately after the nextTick queue empties.
              </li>
            </ul>

            <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/5 dark:bg-amber-950/20 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
              <span className="font-bold text-amber-800 dark:text-amber-400">Crucial Historical Shift (Node.js 11+):</span> Prior to Node.js 11, microtasks were executed only at the boundary between phases. Since Node.js 11, Node matches the browser HTML5 standard: <strong>Microtasks are executed immediately after each individual callback finishes</strong>, even within the same phase!
            </div>

            {/* Section 5: The Execution Order Challenge */}
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100 pt-6">
              5. The Execution Order Challenge: Test Your Knowledge
            </h2>

            <p>
              To prove you truly understand the Event Loop and its microtask queues, analyze this classic puzzle. What will the output order be in the console?
            </p>

            {/* Code Block with output */}
            <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-950 text-neutral-100 p-4 sm:p-5 font-mono text-xs sm:text-sm overflow-x-auto">
              <div className="text-neutral-500 pb-2 border-b border-neutral-800 text-xs mb-3 flex items-center justify-between">
                <span>puzzle.js</span>
                <span>Node.js v20+</span>
              </div>
              <pre className="text-neutral-200 leading-relaxed">
                <code>{`console.log("1: Synchronous start");

setTimeout(() => {
  console.log("2: setTimeout (Timers phase)");
}, 0);

setImmediate(() => {
  console.log("3: setImmediate (Check phase)");
});

Promise.resolve().then(() => {
  console.log("4: Promise resolved (Microtask)");
});

process.nextTick(() => {
  console.log("5: process.nextTick (VIP Microtask)");
});

console.log("6: Synchronous end");`}</code>
              </pre>
            </div>

            <div className="p-4 sm:p-5 rounded-xl border border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-950/20">
              <h4 className="font-semibold text-emerald-900 dark:text-emerald-300 text-sm sm:text-base mb-2">
                Output Explanation Step-by-Step:
              </h4>
              <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                <li>
                  <strong><code className="text-emerald-600 dark:text-emerald-400">1: Synchronous start</code></strong> — Executed immediately on the V8 Call Stack.
                </li>
                <li>
                  <strong><code className="text-emerald-600 dark:text-emerald-400">6: Synchronous end</code></strong> — The main script finishes executing its synchronous code before any queued callbacks run.
                </li>
                <li>
                  <strong><code className="text-emerald-600 dark:text-emerald-400">5: process.nextTick</code></strong> — Call stack is empty! Node drains the <code className="font-mono">process.nextTick</code> queue before anything else.
                </li>
                <li>
                  <strong><code className="text-emerald-600 dark:text-emerald-400">4: Promise resolved</code></strong> — The nextTick queue is clear, so the Promise microtask queue executes next.
                </li>
                <li>
                  <strong><code className="text-emerald-600 dark:text-emerald-400">2: setTimeout (or 3)</code></strong> — The Event Loop begins its first loop. In the Timers phase, the 0ms timer is evaluated. Note: At the top level of a file, <code className="font-mono">setTimeout(..., 0)</code> vs <code className="font-mono">setImmediate</code> can occasionally be non-deterministic due to timer clock resolution (1ms bound).
                </li>
                <li>
                  <strong><code className="text-emerald-600 dark:text-emerald-400">3: setImmediate</code></strong> — Runs in the Check phase immediately after the Poll phase.
                </li>
              </ol>
            </div>

            {/* Note on I/O cycle guarantee */}
            <div className="p-3.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-100/50 dark:bg-neutral-900/40 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
              <strong className="text-neutral-900 dark:text-neutral-100">Pro-tip for technical interviews:</strong> Inside an I/O callback (e.g. inside <code className="font-mono">fs.readFile</code>), <code className="font-mono text-emerald-600 dark:text-emerald-400">setImmediate()</code> is <strong>100% guaranteed</strong> to run BEFORE <code className="font-mono text-emerald-600 dark:text-emerald-400">setTimeout(..., 0)</code>, because the I/O callback executes in the Poll phase, and the Check phase immediately follows Poll!
            </div>

            {/* Section 6: When Node.js Isn't Enough: Worker Threads */}
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100 pt-6">
              6. What About CPU-Intensive Tasks? (worker_threads)
            </h2>

            <p>
              Node.js shines brightest for <strong>I/O-bound applications</strong>: REST APIs, chat applications, streaming servers, and microservices where waiting for the database or network dominates the latency.
            </p>

            <p>
              However, if you execute a heavy CPU computation — such as complex image rendering, training machine learning models, or calculating large Fibonacci sequences on the main thread — the single V8 Call Stack will be blocked. Every other incoming user request will hang until the CPU finishes!
            </p>

            <p>
              To solve this, Node.js introduced the official <code className="px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-xs font-mono">worker_threads</code> module, allowing developers to execute JavaScript on isolated worker threads with shared memory:
            </p>

            <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-950 text-neutral-100 p-4 sm:p-5 font-mono text-xs sm:text-sm overflow-x-auto">
              <div className="text-neutral-500 pb-2 border-b border-neutral-800 text-xs mb-3 flex items-center justify-between">
                <span>multithread-example.js</span>
                <span>worker_threads</span>
              </div>
              <pre className="text-neutral-200 leading-relaxed">
                <code>{`const { Worker, isMainThread, parentPort, workerData } = require('node:worker_threads');

if (isMainThread) {
  // Main Thread: Free to serve HTTP requests!
  const worker = new Worker(__filename, { workerData: { iterations: 1e9 } });
  
  worker.on('message', (result) => {
    console.log('Heavy computation result:', result);
  });
  
  worker.on('error', (err) => console.error(err));
} else {
  // Worker Thread: Executes heavy CPU task in background
  let sum = 0;
  for (let i = 0; i < workerData.iterations; i++) {
    sum += i;
  }
  parentPort.postMessage(sum);
}`}</code>
              </pre>
            </div>

            {/* Section 7: Architectural Best Practices */}
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100 pt-6">
              7. Golden Rules for High-Performance Node.js Systems
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 my-4">
              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm sm:text-base">
                      1. Never Block the Event Loop
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Avoid synchronous methods like <code className="font-mono">fs.readFileSync()</code> in production request routes. Watch out for catastrophic backtracking in regular expressions (ReDoS) and parsing massive JSON strings synchronously.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm sm:text-base">
                      2. Embrace Node Streams
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Never load a 500MB file into memory with <code className="font-mono">fs.readFile()</code> to send over HTTP. Use <code className="font-mono">stream.pipeline()</code> to stream chunks directly from disk to socket, maintaining a flat memory footprint.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500" />
                    <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm sm:text-base">
                      3. Tune Thread Pool for Crypto/FS
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    If your microservice performs hundreds of bcrypt password hashes or image thumbnail compressions, set <code className="font-mono">UV_THREADPOOL_SIZE</code> equal to your machine&apos;s available CPU cores to prevent queue starvation.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm sm:text-base">
                      4. Monitor Event Loop Lag
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Use APM tools or Node&apos;s <code className="font-mono">perf_hooks</code> (<code className="font-mono">monitorEventLoopDelay</code>) to track event loop latency in production. If lag exceeds 50ms, your main thread is being starved.
                  </p>
                </div>
              </div>
            </div>

            {/* Conclusion */}
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100 pt-6">
              Conclusion: The Elegance of Asynchronous Design
            </h2>

            <p>
              Node.js isn&apos;t fast because JavaScript is inherently faster than C++ or Java. Node.js is fast because its <strong>architecture respects how modern hardware and operating systems actually work</strong>.
            </p>

            <p>
              By treating I/O as events rather than blocking threads, combining Google&apos;s JIT compilation with libuv&apos;s asynchronous plumbing, Node.js delivers one of the most efficient, scalable, and developer-friendly runtimes in modern computing history.
            </p>

            <p>
              Once you understand the dance between the V8 Call Stack, libuv, the Event Loop phases, and OS kernel polling, you stop writing code that blindly hopes for performance — and begin architecting backend systems that scale effortlessly.
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
