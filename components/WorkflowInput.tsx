type WorkflowInputProps = {
  value: string;
  onChange: (value: string) => void;
  onGenerate: () => void;
  isGenerating?: boolean;
};

const examples = [
  "When a new software engineer joins, create Google Workspace, Slack and GitHub accounts, assign a MacBook, schedule onboarding, and notify the manager.",
  "When an employee leaves the company, revoke access to all applications, disable accounts, collect company devices, archive documents, and notify HR and IT.",
  "When an engineer requests production access, verify manager approval, check security training completion, create an audit record, and grant access only if all requirements are satisfied.",
];

export default function WorkflowInput({
  value,
  onChange,
  onGenerate,
  isGenerating = false,
}: WorkflowInputProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-900">
        Describe Your Workflow
      </h2>

      <p className="mt-2 text-slate-600">
        Enter a business process in plain English and FlowForge will generate an executable workflow.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        {examples.map((example) => (
          <button
            key={example}
            type="button"
            onClick={() => onChange(example)}
            className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 hover:border-cyan-300 hover:bg-cyan-50"
          >
            {example.includes("joins")
              ? "👤 New Employee Onboarding"
              : example.includes("leaves")
              ? "🚪 Employee Offboarding"
              : "🔐 Production Access Request"}
          </button>
        ))}
      </div>

      <textarea
        className="mt-6 h-44 w-full rounded-2xl border border-slate-200 p-4 text-slate-900 outline-none focus:border-cyan-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="When a new software engineer joins, create Google Workspace, Slack and GitHub accounts, assign a MacBook, schedule onboarding, and notify the manager."
      />

      <button
        type="button"
        onClick={onGenerate}
        disabled={isGenerating}
        className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-cyan-600 px-6 py-3 font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:bg-cyan-400"
      >
        {isGenerating && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
        )}
        {isGenerating ? "Generating..." : "Generate Workflow"}
      </button>
    </div>
  );
}