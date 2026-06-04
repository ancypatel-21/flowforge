import { generateWorkflow } from "@/lib/workflow";

type Props = {
  prompt: string;
};

export default function ValidationPanel({ prompt }: Props) {
  const data = generateWorkflow(prompt);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-900">
        Validation
      </h2>
      <p className="mt-2 text-slate-600">
        FlowForge checks for policy issues, dependencies, and missing steps before execution.
      </p>

      <div className="mt-6 space-y-4">
        {data.validations.map((check) => (
          <div
            key={check.label}
            className={`rounded-2xl border p-4 ${
              check.status === "pass"
                ? "border-emerald-200 bg-emerald-50"
                : "border-amber-200 bg-amber-50"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-medium text-slate-900">{check.label}</p>
                <p className="mt-1 text-sm text-slate-600">{check.note}</p>
              </div>

              <div
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  check.status === "pass"
                    ? "bg-emerald-600 text-white"
                    : "bg-amber-500 text-white"
                }`}
              >
                {check.status === "pass" ? "Pass" : "Review"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}