type TaskFilter = "all" | "mine" | "completed";

type TaskFiltersProps = {
  activeFilter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
};

const filters: {
  label: string;
  value: TaskFilter;
}[] = [
  {
    label: "Wszystkie",
    value: "all",
  },
  {
    label: "Moje",
    value: "mine",
  },
  {
    label: "Ukończone",
    value: "completed",
  },
];

function TaskFilters({ activeFilter, onFilterChange }: TaskFiltersProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {filters.map((filter) => {
        const isActive = filter.value === activeFilter;

        return (
          <button
            key={filter.value}
            type="button"
            onClick={() => onFilterChange(filter.value)}
            className={`
              shrink-0 rounded-full px-4 py-2 text-sm font-medium transition
              ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "bg-white text-slate-500 hover:bg-slate-100"
              }
            `}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}

export type { TaskFilter };

export default TaskFilters;
