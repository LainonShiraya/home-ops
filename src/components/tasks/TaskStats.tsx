type TaskStatsProps = {
  total: number;
  myTasks: number;
  completed: number;
};

function TaskStats({ total, myTasks, completed }: TaskStatsProps) {
  const stats = [
    {
      label: "Wszystkie",
      value: total,
    },
    {
      label: "Moje",
      value: myTasks,
    },
    {
      label: "Ukończone",
      value: completed,
    },
  ];

  return (
    <section className="grid grid-cols-3 gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-slate-200 bg-white p-4"
        >
          <p className="text-2xl font-bold text-slate-900">{stat.value}</p>

          <p className="mt-1 text-xs text-slate-500">{stat.label}</p>
        </div>
      ))}
    </section>
  );
}

export default TaskStats;
