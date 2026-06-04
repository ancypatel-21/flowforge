import { generateWorkflow } from "@/lib/workflow";

type Props = {
  prompt: string;
};

export default function ReasoningPanel({ prompt }: Props) {
  const data = generateWorkflow(prompt);
  const text = prompt.toLowerCase();

  const reasons = data.steps.map((step) => {
    if (step.title.toLowerCase().includes("slack")) {
      return "Slack was detected because the request mentions team communication or onboarding access.";
    }

    if (step.title.toLowerCase().includes("github")) {
      return "GitHub was detected because engineering workflows usually need source control access.";
    }

    if (step.title.toLowerCase().includes("macbook") || step.title.toLowerCase().includes("device")) {
      return "Device assignment was detected because the prompt mentions a laptop, MacBook, or company device.";
    }

    if (step.title.toLowerCase().includes("notify")) {
      return "Notification was detected because the workflow ends with an update to a manager or team.";
    }

    if (step.title.toLowerCase().includes("approval")) {
      return "Approval was added because the request involves access or a higher-risk action.";
    }

    return "This step was inferred from the natural-language request and compiled into the workflow.";
  });

  const detectedSignals = [
    text.includes("join") || text.includes("onboard") ? "new hire / onboarding" : null,
    text.includes("leave") || text.includes("offboard") ? "offboarding" : null,
    text.includes("access") ? "access request" : null,
    text.includes("laptop") || text.includes("macbook") ? "device assignment" : null,
    text.includes("slack") ? "Slack" : null,
    text.includes("github") ? "GitHub" : null,
  ].filter(Boolean) as string[];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-900">
        Why this workflow?
      </h2>
      <p className="mt-2 text-slate-600">
        FlowForge explains the signals it detected from the prompt.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {detectedSignals.length > 0 ? (
          detectedSignals.map((signal) => (
            <span
              key={signal}
              className="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-sm text-cyan-700"
            >
              {signal}
            </span>
          ))
        ) : (
          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-600">
            No strong signals detected
          </span>
        )}
      </div>

      <div className="mt-8 space-y-4">
        {data.steps.slice(0, 4).map((step, index) => (
          <div
            key={step.id}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
          >
            <p className="font-medium text-slate-900">
              Step {index + 1}: {step.title}
            </p>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              {reasons[index]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}