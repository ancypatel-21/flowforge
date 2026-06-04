"use client";

import { useEffect, useState } from "react";
import { generateWorkflow, WorkflowStep } from "@/lib/workflow";

type Props = {
  prompt: string;
};

function getWorkflowBaseName(prompt: string) {
  const text = prompt.toLowerCase();

  if (text.includes("leave") || text.includes("offboard") || text.includes("revoke")) {
    return "Employee Offboarding";
  }

  if (text.includes("access") || text.includes("production") || text.includes("permission")) {
    return "Production Access Review";
  }

  if (text.includes("join") || text.includes("onboard") || text.includes("hire")) {
    return "Employee Onboarding";
  }

  return "Workflow";
}

export default function EditableWorkflowGraph({ prompt }: Props) {
  const data = generateWorkflow(prompt);
  const [steps, setSteps] = useState<WorkflowStep[]>(data.steps);
  const [newStep, setNewStep] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSteps(data.steps);
    setNewStep("");
    setSaved(false);
  }, [prompt, data.title]);

  const updateStep = (id: number, title: string) => {
    setSteps((current) =>
      current.map((step) => (step.id === id ? { ...step, title } : step))
    );
    setSaved(false);
  };

  const removeStep = (id: number) => {
    setSteps((current) => current.filter((step) => step.id !== id));
    setSaved(false);
  };

  const moveStep = (index: number, direction: "up" | "down") => {
    setSteps((current) => {
      const next = [...current];
      const target = direction === "up" ? index - 1 : index + 1;

      if (target < 0 || target >= next.length) return next;

      [next[index], next[target]] = [next[target], next[index]];

      return next.map((step, i) => ({
        ...step,
        id: i + 1,
      }));
    });

    setSaved(false);
  };

  const addStep = () => {
    const trimmed = newStep.trim();
    if (!trimmed) return;

    setSteps((current) => [
      ...current,
      {
        id: current.length + 1,
        title: trimmed,
        status: "pending",
      },
    ]);

    setNewStep("");
    setSaved(false);
  };

  const handleSave = () => {
    const existing = JSON.parse(
      localStorage.getItem("flowforge-saved-workflows") || "[]"
    );

    const baseName = getWorkflowBaseName(prompt);
    const sameBaseCount = existing.filter(
      (item: { name?: string; title?: string }) =>
        String(item.name || item.title || "").startsWith(baseName)
    ).length;

    const payload = {
      name: `${baseName} #${sameBaseCount + 1}`,
      prompt,
      title: data.title,
      steps,
      savedAt: new Date().toISOString(),
    };

    existing.unshift(payload);

    localStorage.setItem(
      "flowforge-saved-workflows",
      JSON.stringify(existing.slice(0, 5))
    );

    window.dispatchEvent(new Event("flowforge-saved-workflows-updated"));

    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">
            Editable Workflow
          </h2>
          <p className="mt-2 text-slate-600">
            Review the generated flow, edit steps, reorder them, or add a new step.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="rounded-2xl bg-cyan-600 px-5 py-3 font-semibold text-white hover:bg-cyan-700"
        >
          {saved ? "Saved" : "Save Workflow"}
        </button>
      </div>

      <div className="mt-8 space-y-4">
        {steps.map((step, index) => (
          <div
            key={`${step.id}-${step.title}`}
            className={`rounded-2xl border p-4 ${
              step.status === "done"
                ? "border-emerald-200 bg-emerald-50"
                : step.status === "active"
                ? "border-cyan-200 bg-cyan-50"
                : "border-slate-200 bg-slate-50"
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                  step.status === "done"
                    ? "bg-emerald-600 text-white"
                    : step.status === "active"
                    ? "bg-cyan-600 text-white"
                    : "bg-slate-300 text-slate-700"
                }`}
              >
                {step.id}
              </div>

              <div className="min-w-0 flex-1">
                <input
                  value={step.title}
                  onChange={(e) => updateStep(step.id, e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-cyan-500"
                />

                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => moveStep(index, "up")}
                    disabled={index === 0}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Move up
                  </button>

                  <button
                    type="button"
                    onClick={() => moveStep(index, "down")}
                    disabled={index === steps.length - 1}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Move down
                  </button>

                  <button
                    type="button"
                    onClick={() => removeStep(step.id)}
                    className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-sm text-rose-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-sm font-medium text-slate-700">Add a new step</p>

        <div className="mt-3 flex gap-3">
          <input
            value={newStep}
            onChange={(e) => setNewStep(e.target.value)}
            placeholder="Example: Notify security team"
            className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-cyan-500"
          />
          <button
            type="button"
            onClick={addStep}
            className="rounded-xl bg-cyan-600 px-4 py-2 font-semibold text-white hover:bg-cyan-700"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}