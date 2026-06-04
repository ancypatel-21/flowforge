export default function Navbar() {
  return (
    <div className="mb-8 flex items-center justify-between rounded-3xl border border-slate-200 bg-white px-6 py-4 shadow-sm">
      <div>
        <p className="text-xl font-bold text-slate-900">FlowForge</p>
        <p className="text-sm text-slate-500">AI Workflow Compiler</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
          ● Live Demo
        </div>
        <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-medium text-slate-700">
          Compiler Ready
        </div>
      </div>
    </div>
  );
}