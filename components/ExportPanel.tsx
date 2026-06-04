"use client";

import { useState } from "react";
import { generateWorkflow } from "@/lib/workflow";

type Props = {
  prompt: string;
};

export default function ExportPanel({ prompt }: Props) {
  const data = generateWorkflow(prompt);
  const [copied, setCopied] = useState(false);

  const jsonOutput = JSON.stringify(
    {
      title: data.title,
      steps: data.steps,
      validations: data.validations,
      logs: data.logs,
    },
    null,
    2
  );

  const handleCopy = async () => {
    await navigator.clipboard.writeText(jsonOutput);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-900">
        Export Workflow
      </h2>
      <p className="mt-2 text-slate-600">
        Copy the compiled workflow as JSON for downstream systems.
      </p>

      <pre className="mt-6 max-h-80 overflow-auto rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
        {jsonOutput}
      </pre>

      <button
        type="button"
        onClick={handleCopy}
        className="mt-6 rounded-2xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
      >
        {copied ? "Copied!" : "Copy JSON"}
      </button>
    </div>
  );
}