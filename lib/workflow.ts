export type WorkflowStep = {
  id: number;
  title: string;
  status: "done" | "active" | "pending";
};

export type ValidationCheck = {
  label: string;
  status: "pass" | "warn";
  note: string;
};

export type ExecutionLog = {
  time: string;
  message: string;
  status: "done" | "active";
};

export type WorkflowData = {
  title: string;
  steps: WorkflowStep[];
  validations: ValidationCheck[];
  logs: ExecutionLog[];
};

function toTitleCase(text: string) {
  return text
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function normalizeStep(text: string) {
  const t = text.toLowerCase().trim();

  if (!t) return null;

  if (t.includes("google") || t.includes("workspace") || t.includes("email")) {
    return "Provision Google Workspace";
  }

  if (t.includes("slack")) {
    return "Provision Slack account";
  }

  if (t.includes("github")) {
    return "Provision GitHub access";
  }

  if (t.includes("jira")) {
    return "Create Jira ticket";
  }

  if (t.includes("notion")) {
    return "Provision Notion access";
  }

  if (t.includes("laptop") || t.includes("macbook") || t.includes("device")) {
    return "Assign MacBook";
  }

  if (t.includes("notify") || t.includes("inform")) {
    return "Notify manager";
  }

  if (t.includes("revoke") || t.includes("disable") || t.includes("remove access")) {
    return "Revoke application access";
  }

  if (t.includes("approve") || t.includes("approval")) {
    return "Request approval";
  }

  if (t.includes("training") || t.includes("verify")) {
    return "Verify training completion";
  }

  if (t.includes("audit")) {
    return "Create audit record";
  }

  if (t.includes("collect") || t.includes("return")) {
    return "Collect company device";
  }

  if (t.includes("schedule") || t.includes("book")) {
    return "Schedule onboarding meetings";
  }

  return toTitleCase(t);
}

function parsePromptSteps(prompt: string): string[] {
  const normalized = prompt
    .replace(/\n/g, ",")
    .replace(/\bthen\b/gi, ",")
    .replace(/\band then\b/gi, ",")
    .replace(/\band\b/gi, ",")
    .replace(/[.;]/g, ",");

  return normalized
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .map(normalizeStep)
    .filter((step): step is string => Boolean(step));
}

function buildFromSteps(title: string, stepTitles: string[]): WorkflowData {
  const steps: WorkflowStep[] = stepTitles.map((stepTitle, index) => ({
    id: index + 1,
    title: stepTitle,
    status: index < 3 ? "done" : index === 3 ? "active" : "pending",
  }));

  const validations: ValidationCheck[] = [
    {
      label: "Required fields present",
      status: "pass",
      note: "The request contains enough detail to build a workflow.",
    },
    {
      label: "Dependency check",
      status: stepTitles.length > 2 ? "pass" : "warn",
      note:
        stepTitles.length > 2
          ? "The main workflow dependencies look complete."
          : "Add more steps to make the workflow more complete.",
    },
    {
      label: "Approval policy",
      status: title === "Access Request Review" ? "warn" : "pass",
      note:
        title === "Access Request Review"
          ? "High-risk access should include explicit approval."
          : "No extra approval required for this workflow.",
    },
    {
      label: "Execution readiness",
      status: "pass",
      note: "The workflow can be simulated safely before launch.",
    },
  ];

  const logs: ExecutionLog[] = [
    {
      time: "10:01:02",
      message: "Workflow request received",
      status: "done",
    },
    {
      time: "10:01:03",
      message: "Prompt parsed into executable steps",
      status: "done",
    },
    {
      time: "10:01:04",
      message: `${stepTitles[0] ?? "First step"} queued`,
      status: "done",
    },
    {
      time: "10:01:05",
      message: `${stepTitles[1] ?? "Second step"} completed`,
      status: "done",
    },
    {
      time: "10:01:06",
      message: `${stepTitles[2] ?? "Third step"} in progress`,
      status: "active",
    },
  ];

  return {
    title,
    steps,
    validations,
    logs,
  };
}

export function generateWorkflow(prompt: string): WorkflowData {
  const text = prompt.toLowerCase();

  if (text.includes("leave") || text.includes("offboard") || text.includes("revoke")) {
    const parsed = parsePromptSteps(prompt);
    return buildFromSteps(
      "Employee Offboarding",
      parsed.length
        ? parsed
        : [
            "Confirm separation details",
            "Revoke app access",
            "Disable accounts",
            "Collect company device",
            "Notify HR and IT",
          ]
    );
  }

  if (text.includes("access") || text.includes("production") || text.includes("permission")) {
    const parsed = parsePromptSteps(prompt);
    return buildFromSteps(
      "Access Request Review",
      parsed.length
        ? parsed
        : [
            "Check approvals",
            "Verify training completion",
            "Review policy risk",
            "Create approval ticket",
            "Grant access",
          ]
    );
  }

  const parsed = parsePromptSteps(prompt);

  return buildFromSteps(
    "Employee Onboarding",
    parsed.length
      ? parsed
      : [
          "Create employee record",
          "Provision Google Workspace",
          "Provision Slack account",
          "Provision GitHub access",
          "Assign MacBook",
          "Schedule onboarding meetings",
          "Notify manager",
        ]
  );
}