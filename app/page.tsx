"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WorkflowInput from "@/components/WorkflowInput";
import ParsedActions from "@/components/ParsedActions";
import WorkflowDSL from "@/components/WorkflowDSL";
import WorkflowGraph from "@/components/WorkflowGraph";
import EditableWorkflowGraph from "@/components/EditableWorkflowGraph";
import ValidationPanel from "@/components/ValidationPanel";
import AnalysisCard from "@/components/AnalysisCard";
import ReasoningPanel from "@/components/ReasoningPanel";
import ExportPanel from "@/components/ExportPanel";
import SavedWorkflows from "@/components/SavedWorkflows";

const defaultPrompt =
  "When a new software engineer joins, create Google Workspace, Slack and GitHub accounts, assign a MacBook, schedule onboarding, and notify the manager.";

export default function Home() {
  const [draftPrompt, setDraftPrompt] = useState(defaultPrompt);
  const [activePrompt, setActivePrompt] = useState(defaultPrompt);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);

    setTimeout(() => {
      setActivePrompt(draftPrompt);
      setIsGenerating(false);
    }, 700);
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-6">
        <Navbar />
        <Hero />

        <div className="mt-8">
          <WorkflowInput
            value={draftPrompt}
            onChange={setDraftPrompt}
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
          />
        </div>

        <div className="mt-8">
          <ParsedActions prompt={activePrompt} />
        </div>

        <div className="mt-8">
          <WorkflowDSL prompt={activePrompt} />
        </div>

        <div className="mt-8">
          <WorkflowGraph prompt={activePrompt} />
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <EditableWorkflowGraph prompt={activePrompt} />
          <ValidationPanel prompt={activePrompt} />
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <AnalysisCard prompt={activePrompt} />
          <ReasoningPanel prompt={activePrompt} />
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <ExportPanel prompt={activePrompt} />
          <SavedWorkflows
            onLoad={(prompt) => {
              setDraftPrompt(prompt);
              setActivePrompt(prompt);
            }}
          />
        </div>
      </div>
    </main>
  );
}