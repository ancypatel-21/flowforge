import { generateWorkflow } from "@/lib/workflow";

type Props = {
  prompt: string;
};

export default function AnalysisCard({ prompt }: Props) {
  const data = generateWorkflow(prompt);

  const riskLevel = data.validations.some((check) => check.status === "warn")
    ? "Medium"
    : "Low";

  const estimatedTime =
    data.title === "Employee Offboarding"
      ? "3 min"
      : data.title === "Access Request Review"
      ? "2 min"
      : "4 min";

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-900">
        Workflow Analysis
      </h2>
      <p className="mt-2 text-slate-600">
        FlowForge summarizes the compiled workflow before execution.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm text-slate-500">Workflow Type</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">
            {data.title}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm text-slate-500">Risk Level</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">
            {riskLevel}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm text-slate-500">Estimated Time</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">
            {estimatedTime}
          </p>
        </div>
      </div>
    </div>
  );
}