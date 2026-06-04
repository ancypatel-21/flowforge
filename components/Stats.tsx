const stats = [
  {
    label: "Workflow Confidence",
    value: "96%",
  },
  {
    label: "Policy Checks",
    value: "4",
  },
  {
    label: "Execution Steps",
    value: "7",
  },
];

export default function Stats() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <p className="text-sm text-slate-500">
            {stat.label}
          </p>

          <p className="mt-3 text-4xl font-bold text-slate-900">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}