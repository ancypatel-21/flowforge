import { generateWorkflow } from "@/lib/workflow";

type Props = {
  prompt: string;
};

export default function ParsedActions({ prompt }: Props) {
  const data = generateWorkflow(prompt);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-900">
        Parsed Actions
      </h2>
      <p className="mt-2 text-slate-600">
        FlowForge extracts actionable steps from the prompt before compiling the workflow.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        {data.steps.map((step) => (
          <span
            key={step.id}
            className="rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-medium text-cyan-700"
          >
            {step.title}
          </span>
        ))}
      </div>
    </div>
  );
}