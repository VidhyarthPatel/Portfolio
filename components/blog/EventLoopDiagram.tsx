"use client";

import React, { useState } from "react";

interface Phase {
  id: string;
  name: string;
  shortName: string;
  category: "event-loop" | "microtask";
  badge: string;
  color: string;
  description: string;
  handles: string[];
  exampleCode: string;
  timingNote: string;
}

const phases: Phase[] = [
  {
    id: "timers",
    name: "1. Timers Phase",
    shortName: "Timers",
    category: "event-loop",
    badge: "Phase 1",
    color: "emerald",
    description:
      "A timer specifies the threshold after which a provided callback may be executed, rather than the exact time a person wants it to be executed. The event loop checks the min-heap of timers and runs any whose delay has passed.",
    handles: [
      "setTimeout(callback, delay)",
      "setInterval(callback, delay)",
      "Handles expired timers sorted by nearest expiration time",
    ],
    exampleCode: `// Timers Phase
setTimeout(() => {
  console.log("Timer expired! Executed in Timers phase.");
}, 0);`,
    timingNote:
      "Note: The delay parameter is a minimum guaranteed delay, not an exact timestamp. System scheduling or other callbacks in the Poll phase may defer execution.",
  },
  {
    id: "pending",
    name: "2. Pending Callbacks Phase",
    shortName: "Pending I/O",
    category: "event-loop",
    badge: "Phase 2",
    color: "amber",
    description:
      "This phase executes callbacks for some system operations such as types of TCP errors. For example, if a TCP socket receives ECONNREFUSED when attempting to connect, some *nix systems wait to report the error in this phase.",
    handles: [
      "Deferred system-level I/O callbacks",
      "TCP connection error reporting (e.g. ECONNREFUSED)",
      "Stream pipe flush notifications",
    ],
    exampleCode: `// Example: TCP socket error deferred by OS
const net = require("net");
const socket = net.createConnection({ port: 9999 });
socket.on("error", (err) => {
  // If connection refused, callback runs in Pending phase
  console.error("Connection failed:", err.code);
});`,
    timingNote:
      "Most regular I/O callbacks are NOT handled here; they are processed in the Poll phase.",
  },
  {
    id: "idle",
    name: "3. Idle, Prepare Phase",
    shortName: "Idle / Prepare",
    category: "event-loop",
    badge: "Phase 3",
    color: "neutral",
    description:
      "Used only internally by libuv for housekeeping, updating internal loop state, and preparing for the upcoming Poll phase. No user JavaScript callbacks run in this phase.",
    handles: [
      "Internal libuv state synchronization",
      "Event loop timestamp updates (uv_update_time)",
      "Preparing poll file descriptor sets",
    ],
    exampleCode: `// Internal to libuv (C library)
// uv__idle_invoke(loop);
// No JavaScript API interfaces with this phase directly.`,
    timingNote:
      "Developers cannot directly schedule code into this phase. It ensures libuv handles low-level event plumbing smoothly.",
  },
  {
    id: "poll",
    name: "4. Poll Phase (The Engine Heart)",
    shortName: "Poll (I/O)",
    category: "event-loop",
    badge: "Phase 4 - Critical",
    color: "blue",
    description:
      "The poll phase has two main functions: 1) Calculating how long it should block and poll for I/O, and 2) Processing events in the poll queue. This is where almost all asynchronous I/O callbacks execute (files, incoming HTTP, incoming DB packets).",
    handles: [
      "Incoming HTTP/HTTPS request callbacks",
      "Database query results from sockets",
      "File read/write callbacks (fs.readFile, fs.writeFile)",
      "New network socket connections & incoming data packets",
    ],
    exampleCode: `// Poll Phase
const fs = require("fs");
fs.readFile("package.json", (err, data) => {
  if (err) throw err;
  console.log("File read completed in Poll phase!");
});`,
    timingNote:
      "If the poll queue is empty, the loop will check for setImmediate() timers. If present, it transitions to the Check phase. Otherwise, it blocks and waits for new incoming I/O events up to the next nearest timer.",
  },
  {
    id: "check",
    name: "5. Check Phase (setImmediate)",
    shortName: "Check",
    category: "event-loop",
    badge: "Phase 5",
    color: "purple",
    description:
      "This phase allows code execution immediately after the poll phase has completed. If the poll phase becomes idle and callbacks have been queued with setImmediate(), the event loop will continue to the check phase rather than waiting for I/O.",
    handles: [
      "setImmediate(callback)",
      "Guaranteed to execute right after the poll phase finishes",
      "Prevents I/O starvation from tight recursive loops",
    ],
    exampleCode: `// Check Phase
setImmediate(() => {
  console.log("Runs in Check phase immediately after Poll!");
});`,
    timingNote:
      "Inside any I/O cycle (like fs.readFile), setImmediate() will ALWAYS execute before any setTimeout(..., 0), because the check phase immediately follows the poll phase.",
  },
  {
    id: "close",
    name: "6. Close Callbacks Phase",
    shortName: "Close",
    category: "event-loop",
    badge: "Phase 6",
    color: "rose",
    description:
      "If a socket or handle is closed abruptly (e.g. socket.destroy()), the 'close' event will be emitted in this phase. Otherwise it will be emitted via process.nextTick().",
    handles: [
      "socket.on('close', ...)",
      "server.on('close', ...)",
      "ReadableStream.on('close', ...)",
      "Resource cleanup and descriptor deallocation",
    ],
    exampleCode: `// Close Phase
const server = net.createServer().listen(8080);
server.close(() => {
  console.log("Server closed cleanly in Close callbacks phase.");
});`,
    timingNote:
      "Provides a designated place for system cleanup before the loop re-enters iteration 1 (Timers) or terminates if no handles remain.",
  },
  {
    id: "nexttick",
    name: "★ Microtask 1: process.nextTick Queue",
    shortName: "nextTick Queue",
    category: "microtask",
    badge: "VIP Priority #1",
    color: "amber",
    description:
      "Technically NOT part of the libuv event loop. It is handled by Node.js directly. The nextTick queue is processed immediately after the currently running JavaScript operation finishes, BEFORE the event loop continues to any other phase or microtask.",
    handles: [
      "process.nextTick(callback)",
      "Highest priority execution in entire Node.js runtime",
      "Useful for emitting events right after constructor initialization",
    ],
    exampleCode: `// Microtask VIP #1
process.nextTick(() => {
  console.log("Runs BEFORE any Promise and BEFORE event loop moves!");
});`,
    timingNote:
      "⚠️ Danger: Recursively calling process.nextTick() will starve the Event Loop completely because I/O and timers will never get a chance to run!",
  },
  {
    id: "microtask",
    name: "★ Microtask 2: Promise Microtask Queue",
    shortName: "Promise Queue",
    category: "microtask",
    badge: "VIP Priority #2",
    color: "cyan",
    description:
      "Managed by the V8 engine. Contains resolved promise callbacks (.then, .catch, .finally), async/await continuations, and queueMicrotask(). Runs immediately after process.nextTick callbacks drain.",
    handles: [
      "Promise.resolve().then(callback)",
      "async / await expressions resumption",
      "queueMicrotask(callback)",
    ],
    exampleCode: `// Microtask VIP #2
Promise.resolve().then(() => {
  console.log("Promise resolved in microtask queue!");
});`,
    timingNote:
      "Since Node.js v11+, microtasks are drained between every single callback in all phases of the event loop, matching web browser standards.",
  },
];

export default function EventLoopDiagram() {
  const [selectedPhaseId, setSelectedPhaseId] = useState<string>("poll");

  const currentPhase =
    phases.find((p) => p.id === selectedPhaseId) || phases[3];

  const loopPhases = phases.filter((p) => p.category === "event-loop");
  const microtasks = phases.filter((p) => p.category === "microtask");

  return (
    <div className="my-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/60 p-4 sm:p-6 backdrop-blur-sm shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold">
            The libuv Engine Cycle
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-neutral-100">
            Event Loop Anatomy & Execution Phases
          </h3>
        </div>
        <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
          Click any phase to see code & rules
        </span>
      </div>

      {/* Main Diagram Area */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Visual Cycle & Phase Selectors */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            The 6 Event Loop Phases (Clockwise Cycle)
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {loopPhases.map((phase, index) => {
              const isSelected = selectedPhaseId === phase.id;
              return (
                <button
                  key={phase.id}
                  onClick={() => setSelectedPhaseId(phase.id)}
                  className={`text-left p-3 rounded-xl border transition-all duration-200 relative group ${
                    isSelected
                      ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 shadow-xs"
                      : "border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/80 hover:border-neutral-300 dark:hover:border-neutral-700"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded ${
                        isSelected
                          ? "bg-emerald-600 text-white"
                          : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                      }`}
                    >
                      Step {index + 1}
                    </span>
                    <span className="text-[11px] font-mono text-neutral-400">
                      {phase.badge}
                    </span>
                  </div>
                  <div
                    className={`mt-2 font-semibold text-sm ${
                      isSelected
                        ? "text-emerald-900 dark:text-emerald-200"
                        : "text-neutral-800 dark:text-neutral-200"
                    }`}
                  >
                    {phase.shortName}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Microtask VIP Callout Section */}
          <div className="mt-3 pt-3 border-t border-neutral-200 dark:border-neutral-800">
            <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              Inter-Phase Priority Queues (Runs Between Operations)
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {microtasks.map((micro) => {
                const isSelected = selectedPhaseId === micro.id;
                return (
                  <button
                    key={micro.id}
                    onClick={() => setSelectedPhaseId(micro.id)}
                    className={`text-left p-3 rounded-xl border transition-all duration-200 relative ${
                      isSelected
                        ? "border-amber-500 bg-amber-50 dark:bg-amber-950/40 shadow-xs"
                        : "border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/80 hover:border-neutral-300 dark:hover:border-neutral-700"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span
                        className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded ${
                          isSelected
                            ? "bg-amber-600 text-white"
                            : "bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800/60"
                        }`}
                      >
                        {micro.badge}
                      </span>
                    </div>
                    <div
                      className={`mt-1.5 font-semibold text-xs sm:text-sm ${
                        isSelected
                          ? "text-amber-950 dark:text-amber-200"
                          : "text-neutral-800 dark:text-neutral-200"
                      }`}
                    >
                      {micro.shortName}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Detailed Phase Inspector & Code */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/90 p-4 sm:p-5">
          <div>
            <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-neutral-100 dark:border-neutral-800">
              <span className="font-semibold text-sm sm:text-base text-neutral-900 dark:text-neutral-100">
                {currentPhase.name}
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40">
                {currentPhase.badge}
              </span>
            </div>

            <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
              {currentPhase.description}
            </p>

            <div className="mb-4">
              <span className="text-[11px] font-mono uppercase font-semibold text-neutral-400 block mb-1.5">
                What Executes Here:
              </span>
              <ul className="space-y-1.5">
                {currentPhase.handles.map((h, i) => (
                  <li
                    key={i}
                    className="text-xs text-neutral-600 dark:text-neutral-300 flex items-start gap-2"
                  >
                    <span className="text-emerald-500 font-bold mt-0.5">•</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Code Snippet Box */}
            <div className="mb-4">
              <span className="text-[11px] font-mono uppercase font-semibold text-neutral-400 block mb-1.5">
                Syntax Example:
              </span>
              <pre className="rounded-lg bg-neutral-900 text-neutral-100 p-3 text-[11px] font-mono overflow-x-auto border border-neutral-800 leading-relaxed">
                <code>{currentPhase.exampleCode}</code>
              </pre>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-neutral-100 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/60 text-[11px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
            <span className="font-semibold text-neutral-800 dark:text-neutral-200">
              Timing Rule:{" "}
            </span>
            {currentPhase.timingNote}
          </div>
        </div>
      </div>
    </div>
  );
}
