"use client";

import React, { useState } from "react";

interface LayerInfo {
  id: string;
  name: string;
  category: string;
  badge: string;
  description: string;
  items: { name: string; desc: string; tag?: string }[];
}

const layers: LayerInfo[] = [
  {
    id: "app",
    name: "1. Application Layer (JavaScript)",
    category: "User Code & Modules",
    badge: "Userland",
    description:
      "This is where your code lives. It includes your custom application logic, npm packages (Express, Fastify, Prisma, Socket.io), and high-level async handlers.",
    items: [
      { name: "Your Application Code", desc: "Controllers, routes, business logic, middleware", tag: "JS / TS" },
      { name: "npm Packages", desc: "Express, Fastify, Lodash, Axios, Prisma, Mongoose", tag: "Ecosystem" },
      { name: "Global Objects", desc: "console, process, Buffer, globalThis, setTimeout", tag: "Runtime API" },
    ],
  },
  {
    id: "api",
    name: "2. Node.js Core API (JavaScript Modules)",
    category: "Standard Library",
    badge: "Node.js Core",
    description:
      "The official Node.js JavaScript standard library. These modules provide high-level abstractions for interacting with the operating system, file system, networking, and streams.",
    items: [
      { name: "node:fs", desc: "File system read, write, watch, streams", tag: "I/O" },
      { name: "node:http / https", desc: "Server and client HTTP protocol implementation", tag: "Network" },
      { name: "node:crypto", desc: "OpenSSL cryptography wrappers, hashing, cipher", tag: "Security" },
      { name: "node:net / dgram", desc: "TCP and UDP socket networking", tag: "Transport" },
      { name: "node:stream & events", desc: "EventEmitter, Readable, Writable, Duplex, Transform", tag: "Core Pattern" },
      { name: "node:child_process / worker_threads", desc: "Process spawning & multithreaded compute", tag: "Concurrency" },
    ],
  },
  {
    id: "bindings",
    name: "3. Node.js C++ Bindings & Addon Bridge",
    category: "Interoperability Layer",
    badge: "C++ Bridge",
    description:
      "The critical glue between JavaScript and the underlying C/C++ libraries. When you call fs.open() in JavaScript, this layer translates the call into native C++ calls via V8 C++ APIs and passes them down to libuv.",
    items: [
      { name: "V8 C++ APIs", desc: "Exposes C++ functions and data structures directly to JavaScript", tag: "Binding" },
      { name: "Node.js Internal C++ Wrappers", desc: "node_file.cc, node_crypto.cc, node_http_parser.cc", tag: "Internal C++" },
      { name: "N-API / Node-API", desc: "Stable ABI for compiled native C/C++ addon modules", tag: "Native Addon" },
    ],
  },
  {
    id: "native",
    name: "4. Native Core Engines & C/C++ Libraries",
    category: "The Engine Room",
    badge: "C / C++ Core",
    description:
      "The true powerhouse of Node.js. It contains Google V8 to execute JavaScript and libuv to handle asynchronous non-blocking operations, thread pools, and the event loop.",
    items: [
      {
        name: "V8 Engine (Google, C++)",
        desc: "Compiles JS to optimized machine code (Ignition byte-code + TurboFan JIT compiler). Manages Memory Heap & Call Stack.",
        tag: "JS Engine",
      },
      {
        name: "libuv (C)",
        desc: "Cross-platform asynchronous I/O library. Implements the Event Loop, Worker Thread Pool (4 threads), and async abstractions.",
        tag: "Async Mastermind",
      },
      {
        name: "OpenSSL (C)",
        desc: "Enterprise-grade cryptography, TLS/SSL, HTTPS encryption, cipher generation.",
        tag: "Crypto",
      },
      {
        name: "llhttp (C)",
        desc: "Ultra-fast HTTP parser for parsing incoming requests & response headers.",
        tag: "HTTP Parser",
      },
      {
        name: "c-ares (C)",
        desc: "Asynchronous DNS request library used for non-blocking DNS resolution (dns.resolve).",
        tag: "DNS",
      },
      {
        name: "zlib (C)",
        desc: "High-performance data compression & decompression (gzip, deflate, brotli).",
        tag: "Compression",
      },
    ],
  },
  {
    id: "os",
    name: "5. Operating System Kernel & Hardware",
    category: "System Primitives",
    badge: "OS Kernel",
    description:
      "The underlying operating system kernel. libuv interfaces with platform-specific kernel event notification mechanisms for zero-overhead non-blocking I/O.",
    items: [
      { name: "Linux: epoll", desc: "I/O event notification facility for scalable network sockets", tag: "Linux" },
      { name: "macOS / BSD: kqueue", desc: "Scalable kernel event notification mechanism", tag: "macOS" },
      { name: "Windows: IOCP", desc: "Input/Output Completion Ports for asynchronous Windows I/O", tag: "Windows" },
      { name: "File System & Network Interface", desc: "Hard drives, SSDs, NICs, TCP/IP network stack", tag: "Hardware" },
    ],
  },
];

export default function NodeArchitectureDiagram() {
  const [activeLayer, setActiveLayer] = useState<string>("native");

  const selectedLayer = layers.find((l) => l.id === activeLayer) || layers[3];

  return (
    <div className="my-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/60 p-4 sm:p-6 backdrop-blur-sm shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold">
            Interactive Architecture Diagram
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-neutral-100">
            Node.js Multi-Tier Architectural Stack
          </h3>
        </div>
        <span className="text-xs text-neutral-500 dark:text-neutral-400">
          Click any layer to inspect its internals
        </span>
      </div>

      {/* Visual Stack Diagram */}
      <div className="mt-6 flex flex-col gap-2.5">
        {layers.map((layer) => {
          const isSelected = activeLayer === layer.id;
          return (
            <button
              key={layer.id}
              onClick={() => setActiveLayer(layer.id)}
              className={`w-full text-left transition-all duration-200 p-3 sm:p-4 rounded-xl border relative overflow-hidden group ${
                isSelected
                  ? "border-emerald-500/70 bg-emerald-500/10 dark:bg-emerald-950/30 shadow-xs"
                  : "border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/80 hover:border-neutral-300 dark:hover:border-neutral-700"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span
                    className={`w-2.5 h-2.5 rounded-full shrink-0 transition-colors ${
                      isSelected
                        ? "bg-emerald-500 ring-4 ring-emerald-500/20"
                        : "bg-neutral-300 dark:bg-neutral-700 group-hover:bg-neutral-400"
                    }`}
                  />
                  <div>
                    <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                      {layer.category}
                    </div>
                    <div
                      className={`text-sm sm:text-base font-semibold transition-colors ${
                        isSelected
                          ? "text-emerald-700 dark:text-emerald-300"
                          : "text-neutral-900 dark:text-neutral-100"
                      }`}
                    >
                      {layer.name}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full font-mono font-medium border ${
                      isSelected
                        ? "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-900/60 dark:text-emerald-200 dark:border-emerald-700"
                        : "bg-neutral-100 text-neutral-600 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-700"
                    }`}
                  >
                    {layer.badge}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isSelected
                        ? "rotate-90 text-emerald-600 dark:text-emerald-400"
                        : "text-neutral-400 group-hover:translate-x-0.5"
                    }`}
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Layer Detail Inspector */}
      <div className="mt-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/90 p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-4 border-b border-neutral-100 dark:border-neutral-800/80">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm sm:text-base">
              Layer Deep-Dive: {selectedLayer.name}
            </h4>
          </div>
          <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/60 w-fit">
            {selectedLayer.badge}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
          {selectedLayer.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {selectedLayer.items.map((item, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-neutral-150 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-950/40 p-3 flex flex-col justify-between hover:border-emerald-500/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="font-semibold text-xs text-neutral-900 dark:text-neutral-100 font-mono">
                    {item.name}
                  </span>
                  {item.tag && (
                    <span className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 bg-neutral-200/60 dark:bg-neutral-800/80 px-1.5 py-0.2 rounded">
                      {item.tag}
                    </span>
                  )}
                </div>
                <p className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
