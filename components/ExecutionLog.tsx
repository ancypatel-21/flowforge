import { generateWorkflow } from "@/lib/workflow";

type Props = {
  prompt: string;
};

export default function ExecutionLog({ prompt }: Props) {
  const data = generateWorkflow(prompt);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">
          Execution Log
        </h2>
        <p className="mt-2 text-slate-600">
          FlowForge simulates the workflow before it goes live.
        </p>
      </div>

      <div className="mt-8 space-y-3">
        {data.logs.map((log) => (
          <div
            key={log.time + log.message}
            className={`flex items-center gap-4 rounded-2xl border p-4 ${
              log.status === "done"
                ? "border-slate-200 bg-slate-50"
                : "border-cyan-200 bg-cyan-50"
            }`}
          >
            <div className="w-20 text-sm font-medium text-slate-500">
              {log.time}
            </div>

            <div className="flex-1">
              <p className="font-medium text-slate-900">{log.message}</p>
            </div>

            <div
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                log.status === "done"
                  ? "bg-emerald-600 text-white"
                  : "bg-cyan-600 text-white"
              }`}
            >
              {log.status === "done" ? "Done" : "Running"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}