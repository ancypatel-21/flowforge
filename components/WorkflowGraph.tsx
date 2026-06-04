import { generateWorkflow } from "@/lib/workflow";

type Props = {
  prompt: string;
};

export default function WorkflowGraph({ prompt }: Props) {
  const data = generateWorkflow(prompt);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-900">
        Workflow Graph
      </h2>
      <p className="mt-2 text-slate-600">
        FlowForge converts the prompt into an executable workflow pipeline.
      </p>

      <div className="mt-6 overflow-x-auto">
        <div className="flex min-w-max items-center gap-4">
          {data.steps.map((step, index) => (
            <div key={step.id} className="flex items-center gap-4">
              <div
                className={`min-w-44 rounded-3xl border p-5 shadow-sm ${
                  step.status === "done"
                    ? "border-emerald-200 bg-emerald-50"
                    : step.status === "active"
                      ? "border-cyan-200 bg-cyan-50"
                      : "border-slate-200 bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${
                      step.status === "done"
                        ? "bg-emerald-600 text-white"
                        : step.status === "active"
                          ? "bg-cyan-600 text-white"
                          : "bg-slate-300 text-slate-700"
                    }`}
                  >
                    {step.id}
                  </div>

                  <div
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      step.status === "done"
                        ? "bg-emerald-100 text-emerald-700"
                        : step.status === "active"
                          ? "bg-cyan-100 text-cyan-700"
                          : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {step.status === "done"
                      ? "Done"
                      : step.status === "active"
                        ? "Running"
                        : "Queued"}
                  </div>
                </div>

                <p className="mt-4 font-medium text-slate-900">
                  {step.title}
                </p>
              </div>

              {index < data.steps.length - 1 && (
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="h-px w-8 bg-slate-300" />
                  <div className="text-2xl">→</div>
                  <div className="h-px w-8 bg-slate-300" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}