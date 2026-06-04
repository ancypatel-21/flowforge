"use client";

import { useEffect, useState } from "react";

type SavedWorkflow = {
  name?: string;
  prompt: string;
  title: string;
  steps: { id: number; title: string; status: string }[];
  savedAt: string;
};

type Props = {
  onLoad: (prompt: string) => void;
};

function readSavedWorkflows() {
  return JSON.parse(localStorage.getItem("flowforge-saved-workflows") || "[]");
}

export default function SavedWorkflows({ onLoad }: Props) {
  const [items, setItems] = useState<SavedWorkflow[]>([]);

  useEffect(() => {
    const refresh = () => {
      setItems(readSavedWorkflows());
    };

    refresh();

    window.addEventListener("flowforge-saved-workflows-updated", refresh);
    window.addEventListener("storage", refresh);

    return () => {
      window.removeEventListener("flowforge-saved-workflows-updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const deleteWorkflow = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();

    const updated = items.filter((_, i) => i !== index);

    localStorage.setItem(
      "flowforge-saved-workflows",
      JSON.stringify(updated)
    );

    setItems(updated);
    window.dispatchEvent(new Event("flowforge-saved-workflows-updated"));
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-900">
        Saved Workflows
      </h2>
      <p className="mt-2 text-slate-600">
        Click a workflow to load it back into FlowForge.
      </p>

      <div className="mt-6 space-y-4">
        {items.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-600">
            No saved workflows yet.
          </div>
        ) : (
          items.map((item, index) => (
            <div
              key={item.savedAt + index}
              onClick={() => onLoad(item.prompt)}
              className="w-full cursor-pointer rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left transition hover:border-cyan-300 hover:bg-cyan-50"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium text-slate-900">
                    {item.name || item.title || "Untitled Workflow"}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    {item.steps.length} steps
                  </p>
                </div>

                <button
                  type="button"
                  onClick={(e) => deleteWorkflow(e, index)}
                  className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-medium text-rose-700 hover:bg-rose-100"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}