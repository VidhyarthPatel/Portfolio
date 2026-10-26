"use client";

import React, { useState } from "react";

export default function RequestFlowDiagram() {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = [
    {
      step: 1,
      title: "1. Incoming Request Hits V8 Call Stack",
      badge: "Main Thread",
      actor: "V8 Engine (Single Thread)",
      desc: "Client sends an HTTP request or event. Node.js receives the request and places its handler on the V8 Call Stack. JavaScript execution begins on the single main thread.",
      code: "app.get('/file', async (req, res) => {\n  console.log('Request received'); // Synchronous\n  fs.readFile('data.pdf', ...);   // Async offload\n});",
    },
    {
      step: 2,
      title: "2. The Fork: Kernel Async vs Worker Threadpool",
      badge: "Smart Offloading",
      actor: "libuv Dispatcher",
      desc: "Node.js distinguishes between Network I/O and Blocking I/O: Network sockets go directly to OS Kernel (epoll/kqueue). File system, crypto, and compression are offloaded to libuv's 4 Worker Threads. The main thread immediately resumes serving other clients!",
      code: "// Network I/O -> Handled by OS Kernel (0 worker threads used!)\n// File I/O -> Handled by libuv Threadpool (Threads 1-4)\n// Crypto / Hashing -> libuv Threadpool",
    },
    {
      step: 3,
      title: "3. Background Asynchronous Processing",
      badge: "Zero Blocking",
      actor: "OS Kernel & libuv Workers",
      desc: "While the hard drive reads 50MB from disk on Worker Thread 1, or the OS kernel waits for a network packet, the V8 Main Thread is 100% FREE. It handles hundreds of other incoming user requests with zero delay.",
      code: "// Meanwhile on Main Thread:\n// Handled Request #2 -> Sent 200 OK\n// Handled Request #3 -> Sent 200 OK\n// Main thread never freezes!",
    },
    {
      step: 4,
      title: "4. Notification & Callback Enqueueing",
      badge: "Event Queue",
      actor: "libuv Event Loop",
      desc: "Once the disk read finishes or the network socket receives data, libuv places the registered callback function into the Event Loop's Poll Queue.",
      code: "// libuv puts callback in Poll Queue:\n// (err, fileBuffer) => res.send(fileBuffer);",
    },
    {
      step: 5,
      title: "5. Execution & Client Response",
      badge: "Completion",
      actor: "Call Stack + Response Stream",
      desc: "The Event Loop detects that the Call Stack is empty. It picks the callback from the queue, pushes it onto the Call Stack, executes the code, and sends the response back to the client.",
      code: "// Callback executes on Main Thread\nres.send(fileBuffer); // Response streamed to client\n// Call Stack cleared. Ready for next loop tick.",
    },
  ];

  const current = steps[activeStep - 1];

  return (
    <div className="my-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/60 p-4 sm:p-6 backdrop-blur-sm shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold">
            Execution Flow Walkthrough
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-neutral-100">
            How Node.js Handles Asynchronous Non-Blocking Requests
          </h3>
        </div>
        <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
          Step {activeStep} of 5
        </span>
      </div>

      {/* Visual Step Progress Bar */}
      <div className="mt-6 grid grid-cols-5 gap-1.5 sm:gap-2">
        {steps.map((s) => (
          <button
            key={s.step}
            onClick={() => setActiveStep(s.step)}
            className={`p-2 sm:p-3 rounded-lg border text-left transition-all ${
              activeStep === s.step
                ? "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-semibold shadow-xs"
                : "border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 text-neutral-500 hover:border-neutral-300"
            }`}
          >
            <div className="text-[10px] sm:text-xs font-mono">Step {s.step}</div>
            <div className="text-[11px] sm:text-xs truncate hidden sm:block">
              {s.badge}
            </div>
          </button>
        ))}
      </div>

      {/* Interactive Step Content Box */}
      <div className="mt-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/90 p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold font-mono">
              {current.step}
            </span>
            <h4 className="font-bold text-sm sm:text-base text-neutral-900 dark:text-neutral-100">
              {current.title}
            </h4>
          </div>
          <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/60">
            {current.actor}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
          {current.desc}
        </p>

        {/* Pseudo Code / Architecture Preview */}
        <div>
          <span className="text-[11px] font-mono uppercase font-semibold text-neutral-400 block mb-1.5">
            What Happens Under The Hood:
          </span>
          <pre className="rounded-lg bg-neutral-950 text-emerald-300 p-3 sm:p-4 text-xs font-mono overflow-x-auto border border-neutral-800 leading-relaxed">
            <code>{current.code}</code>
          </pre>
        </div>

        {/* Step Navigation Controls */}
        <div className="mt-5 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
          <button
            onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
            disabled={activeStep === 1}
            className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            ← Previous Step
          </button>
          <button
            onClick={() => setActiveStep((prev) => Math.min(5, prev + 1))}
            disabled={activeStep === 5}
            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Next Step →
          </button>
        </div>
      </div>
    </div>
  );
}
