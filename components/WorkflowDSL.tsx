import { generateWorkflow } from "@/lib/workflow";

type Props = {
  prompt: string;
};

function toDsl(stepTitle: string) {
  const text = stepTitle.toLowerCase();

  if (text.includes("slack")) return "PROVISION_SLACK";
  if (text.includes("github")) return "PROVISION_GITHUB";
  if (text.includes("google")) return "PROVISION_GOOGLE_WORKSPACE";
  if (text.includes("jira")) return "CREATE_JIRA_TICKET";
  if (text.includes("notion")) return "PROVISION_NOTION";
  if (text.includes("macbook") || text.includes("device") || text.includes("laptop")) return "ASSIGN_DEVICE";
  if (text.includes("notify")) return "NOTIFY_MANAGER";
  if (text.includes("approval")) return "REQUEST_APPROVAL";
  if (text.includes("revoke")) return "REVOKE_ACCESS";
  if (text.includes("collect")) return "COLLECT_DEVICE";
  if (text.includes("schedule")) return "SCHEDULE_MEETING";

  return `STEP_${stepTitle.replace(/\s+/g, "_").toUpperCase()}`;
}

export default function WorkflowDSL({ prompt }: Props) {
  const data = generateWorkflow(prompt);
  const lines = data.steps.map((step) => toDsl(step.title));

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-900">
        Intermediate Representation
      </h2>
      <p className="mt-2 text-slate-600">
        FlowForge compiles actions into a structured workflow DSL before execution.
      </p>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-950 p-4">
        <p className="text-sm text-slate-400">Compiled Workflow DSL</p>
        <pre className="mt-3 overflow-auto text-sm leading-7 text-cyan-200">
          {lines.map((line) => `> ${line}`).join("\n")}
        </pre>
      </div>
    </div>
  );
}