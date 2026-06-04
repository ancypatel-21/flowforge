import { generateWorkflow } from "@/lib/workflow";

type Props = {
  prompt: string;
};

export default function InsightStrip({ prompt }: Props) {
  const data = generateWorkflow(prompt);

  const risk =
    data.validations.some((check) => check.status === "warn") ? "Medium" : "Low";

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm text-slate-500">Workflow Type</p>
        <p className="mt-2 text-lg font-semibold text-slate-900">{data.title}</p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm text-slate-500">Risk Level</p>
        <p className="mt-2 text-lg font-semibold text-slate-900">{risk}</p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm text-slate-500">Execution Steps</p>
        <p className="mt-2 text-lg font-semibold text-slate-900">
          {data.steps.length}
        </p>
      </div>
    </div>
  );
}