"use client";

import React, { useState } from "react";

interface PipelineStep {
  id: string;
  name: string;
  type: string;
  badge: string;
  color: string;
  description: string;
  codeSnippet: string;
  reqMutation: string;
  nextAction: string;
}

const pipelineSteps: PipelineStep[] = [
  {
    id: "builtin",
    name: "1. Built-in Parser Middleware",
    type: "Built-in",
    badge: "express.json()",
    color: "blue",
    description:
      "Intercepts raw incoming TCP data streams, buffers chunks, parses raw JSON payloads, and attaches the parsed JavaScript object to req.body.",
    codeSnippet: `// 1. Built-in body parser
app.use(express.json());

// Converts raw stream '{"name":"Alex"}' 
// into req.body = { name: "Alex" }`,
    reqMutation: "req.body is populated with parsed JSON object",
    nextAction: "Calls next() to proceed to logger middleware",
  },
  {
    id: "thirdparty",
    name: "2. Third-Party Logging / Security",
    type: "Third-party",
    badge: "cors() & logger",
    color: "purple",
    description:
      "Sets HTTP response security headers, handles cross-origin preflight requests (CORS), and logs HTTP method, status, and response duration.",
    codeSnippet: `// 2. Third-party security & logging
app.use(cors());
app.use(morgan("dev"));

// Injects CORS headers and logs:
// GET /api/users/42 200 - 12ms`,
    reqMutation: "Adds CORS headers to res; records start timestamp",
    nextAction: "Calls next() to proceed to route authentication",
  },
  {
    id: "custom-auth",
    name: "3. Custom Auth & Guard Middleware",
    type: "Auth Guard",
    badge: "Custom Auth",
    description:
      "Inspects request headers for a Bearer JWT token, validates the signature, and enriches the request by attaching the authenticated user payload to req.user.",
    codeSnippet: `// 3. Custom authentication middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    req.user = jwt.verify(token, SECRET);
    next(); // Pass control forward
  } catch (err) {
    next(err); // Route error to Error Middleware
  }
};`,
    reqMutation: "Enriches req with req.user = { id: 'usr_99', role: 'admin' }",
    nextAction: "Calls next() if valid; calls next(err) if token is invalid",
  },
  {
    id: "route-handler",
    name: "4. Target Route Handler (Controller)",
    type: "Controller",
    badge: "app.get()",
    color: "emerald",
    description:
      "The final destination for normal execution. Executes business logic (e.g. querying a database) and closes the HTTP request-response cycle using res.json().",
    codeSnippet: `// 4. Final Route Controller
app.get("/api/dashboard", authenticate, async (req, res) => {
  // req.user is guaranteed to be present
  const data = await getDashboardMetrics(req.user.id);
  
  // Closes the cycle!
  res.status(200).json({ success: true, data });
});`,
    reqMutation: "Reads req.user; sends formatted HTTP response body",
    nextAction: "Calls res.json() which ends the request cycle",
  },
  {
    id: "error-handling",
    name: "5. Centralized Error-Handling Middleware",
    type: "4-arg Catch",
    badge: "Error Handler",
    color: "rose",
    description:
      "Defined with exactly 4 parameters. Whenever any middleware or route handler invokes next(err) or throws an unhandled error, Express bypasses all remaining normal middleware and jumps straight to this handler.",
    codeSnippet: `// 5. Must have 4 arguments to be recognized by Express!
app.use((err, req, res, next) => {
  console.error("Centralized Error Log:", err.message);
  
  const status = err.statusCode || 500;
  res.status(status).json({
    success: false,
    error: err.message || "Internal Server Error"
  });
});`,
    reqMutation: "Catches thrown error or next(err); formats standardized error payload",
    nextAction: "Sends error response to client; prevents server crash",
  },
];

export default function ExpressMiddlewareDiagram() {
  const [selectedStepId, setSelectedStepId] = useState<string>("custom-auth");

  const currentStep =
    pipelineSteps.find((s) => s.id === selectedStepId) || pipelineSteps[2];

  return (
    <div className="my-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/60 p-4 sm:p-6 backdrop-blur-sm shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold">
            Interactive Flow Architecture
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-neutral-100">
            The Express.js Middleware Pipeline
          </h3>
        </div>
        <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
          Click any stage to trace req, res & next()
        </span>
      </div>

      {/* Visual Pipeline Bar */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-5 gap-2">
        {pipelineSteps.map((step, idx) => {
          const isSelected = selectedStepId === step.id;
          return (
            <button
              key={step.id}
              onClick={() => setSelectedStepId(step.id)}
              className={`p-3 rounded-xl border text-left transition-all relative group flex flex-col justify-between ${
                idx === 4 ? "col-span-2 sm:col-span-1" : ""
              } ${
                isSelected
                  ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 shadow-xs"
                  : "border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/80 hover:border-neutral-300 dark:hover:border-neutral-700"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5 gap-1">
                  <span
                    className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded whitespace-nowrap shrink-0 ${
                      isSelected
                        ? "bg-emerald-600 text-white"
                        : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                    }`}
                  >
                    Step {idx + 1}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 shrink-0">
                    {idx < pipelineSteps.length - 1 ? "→" : "●"}
                  </span>
                </div>
                <div
                  className={`text-xs sm:text-sm font-semibold truncate ${
                    isSelected
                      ? "text-emerald-900 dark:text-emerald-200"
                      : "text-neutral-900 dark:text-neutral-100"
                  }`}
                >
                  {step.badge}
                </div>
                <div className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 mt-1 truncate">
                  {step.type}
                </div>
              </div>

              <div className="mt-2.5 pt-1.5 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-[10px] font-mono">
                <span
                  className={
                    isSelected
                      ? "text-emerald-600 dark:text-emerald-400 font-semibold"
                      : "text-neutral-400"
                  }
                >
                  {isSelected ? "Active" : "Inspect"}
                </span>
                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Pipeline Stage Inspector Box */}
      <div className="mt-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/90 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-4 border-b border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h4 className="font-bold text-sm sm:text-base text-neutral-900 dark:text-neutral-100">
              {currentStep.name}
            </h4>
          </div>
          <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/60 w-fit">
            Type: {currentStep.type}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
          {currentStep.description}
        </p>

        {/* Code Snippet */}
        <div className="mb-4">
          <span className="text-[11px] font-mono uppercase font-semibold text-neutral-400 block mb-1.5">
            Implementation Pattern:
          </span>
          <pre className="rounded-lg bg-neutral-950 text-neutral-200 p-3 sm:p-4 text-xs font-mono overflow-x-auto border border-neutral-800 leading-relaxed">
            <code>{currentStep.codeSnippet}</code>
          </pre>
        </div>

        {/* Request State & Action */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-950/40">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-1">
              Request / Response Mutation:
            </span>
            <span className="text-xs text-neutral-800 dark:text-neutral-200 font-medium">
              {currentStep.reqMutation}
            </span>
          </div>

          <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-950/40">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-1">
              Next Action:
            </span>
            <span className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
              {currentStep.nextAction}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
