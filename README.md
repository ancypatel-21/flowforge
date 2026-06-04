# FlowForge

### AI Workflow Compiler for Enterprise Operations

FlowForge transforms natural-language business requests into validated, editable, and executable workflows.

Instead of manually building automation flows, administrators describe a process in plain English. FlowForge analyzes the request, extracts operational actions, generates an intermediate workflow representation, validates dependencies and policies, produces a workflow graph, and enables human review before execution.

---

## Problem

Modern organizations rely on dozens of systems:

* Google Workspace
* Slack
* GitHub
* Jira
* Notion
* HR Platforms
* Device Management Systems

Operational workflows such as employee onboarding, offboarding, access requests, and compliance reviews are often fragmented across these tools.

Creating and maintaining workflows requires significant manual effort and technical expertise.

---

## Solution

FlowForge acts as an AI Workflow Compiler.

Users describe a business process in plain English:

> When a new software engineer joins, create Slack, GitHub, and Jira accounts, assign a MacBook, and notify the hiring manager.

FlowForge converts the request into:

* Parsed Actions
* Intermediate Representation (Workflow DSL)
* Executable Workflow Graph
* Validation Checks
* Human Review Layer
* Exportable Workflow Definition

---

## Architecture

```text
Natural Language Request
            ↓
      Action Parser
            ↓
  Intermediate Representation
            ↓
      Workflow Graph
            ↓
     Validation Engine
            ↓
      Human Review
            ↓
       Export Layer
```

---

## Core Features

### Natural Language Workflow Creation

Convert operational requests into structured workflows.

### Parsed Actions Engine

Extracts actionable workflow steps from natural language.

### Workflow DSL Generation

Compiles business processes into an intermediate representation.

Example:

```text
PROVISION_SLACK
PROVISION_GITHUB
ASSIGN_DEVICE
NOTIFY_MANAGER
```

### Workflow Graph

Visual pipeline representation of generated workflows.

### Validation Engine

Checks:

* Dependencies
* Missing Steps
* Policy Constraints
* Execution Readiness

### Human Review Layer

Users can:

* Edit workflow steps
* Reorder workflow steps
* Remove workflow steps
* Add new workflow steps

### Workflow Persistence

Save, load, and manage generated workflows.

### Export System

Export compiled workflows as JSON for downstream automation systems.

---

## Example Workflow

### Input

```text
When a new software engineer joins, create Slack, GitHub, and Jira accounts, assign a MacBook, and notify the hiring manager.
```

### Parsed Actions

```text
Provision Slack Account
Provision GitHub Access
Create Jira Ticket
Assign MacBook
Notify Manager
```

### Intermediate Representation

```text
PROVISION_SLACK
PROVISION_GITHUB
CREATE_JIRA_TICKET
ASSIGN_DEVICE
NOTIFY_MANAGER
```

---

## Technology Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

### State Management

* React Hooks

### Storage

* Browser Local Storage

### Deployment

* GitHub
* Vercel (optional)

---

## Design Goals

FlowForge was designed around three principles:

### Explainability

Every generated workflow should be understandable and reviewable.

### Human-in-the-Loop Automation

AI generates workflows, humans approve and refine them.

### Enterprise Readiness

Workflow generation must include validation, policy awareness, and operational reasoning.

---

## Future Work

### Workflow Templates

Reusable onboarding, offboarding, and access management templates.

### Approval Engine

Multi-step approval workflows.

### Role-Based Policy Validation

Automated compliance enforcement.

### SaaS Integrations

* Slack
* GitHub
* Google Workspace
* Jira
* Notion

### Execution Runtime

Execute generated workflows directly instead of exporting them.

---

## Vision

FlowForge explores a future where operational automation begins with intent rather than configuration.

Instead of manually building workflows, organizations describe outcomes in natural language and allow systems to compile those intentions into structured, validated, and executable business processes.

---

Built by Ancy Patel.
