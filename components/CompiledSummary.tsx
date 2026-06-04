import { generateWorkflow } from "@/lib/workflow";

type Props = {
  prompt: string;
};

function detectSystems(prompt: string) {
  const text = prompt.toLowerCase();
  const systems: string[] = [];

  if (text.includes("google") || text.includes("workspace") || text.includes("email")) {
    systems.push("Google Workspace");
  }
  if (text.includes("slack")) {
    systems.push("Slack");
  }
  if (text.includes("github")) {
    systems.push("GitHub");
  }
  if (text.includes("jira")) {
    systems.push("Jira");
  }
  if (text.includes("notion")) {
    systems.push("Notion");
  }
  if (text.includes("laptop") || text.includes("macbook") || text.includes("device")) {
    systems.push("Device Inventory");
  }
  if (text.includes("hr")) {
    systems.push("HR System");
  }

  return systems.length ? systems : ["Core Workflow Engine"];
}

function buildDsl(stepCount: number) {
  const lines = [
    "WORKFLOW_COMPILE_START",
    "PARSE_INTENT",
    "VALIDATE_POLICY",
    "BUILD_EXECUTION_GRAPH",
    "SIMULATE_EXECUTION",
    "EXPORT_PLAN",
  ];

  if (stepCount > 5) {
    lines.push("OPTIMIZE_DEPENDENCIES");
  }

  lines.push("WORKFLOW_COMPILE_END");
  return lines;
}

export default function CompilerOutput({ prompt }: Props) {
  const data = generateWorkflow(prompt);
  const systems = detectSystems(prompt);
  const dsl = buildDsl(data.steps.length);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-900">
        Compiler Output
      </h2>
      <p className="mt-2 text-slate-600">
        FlowForge converts the prompt into an intermediate workflow representation.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm text-slate-500">Detected Workflow Type</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">
            {data.title}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm text-slate-500">Detected Actions</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">
            {data.steps.length}
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-sm text-slate-500">Detected Systems</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {systems.map((system) => (
            <span
              key={system}
              className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-700"
            >
              {system}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-950 p-4">
        <p className="text-sm text-slate-400">Generated Workflow DSL</p>
        <pre className="mt-3 overflow-auto text-sm leading-6 text-cyan-200">
          {dsl.map((line) => `> ${line}`).join("\n")}
        </pre>
      </div>
    </div>
  );
}