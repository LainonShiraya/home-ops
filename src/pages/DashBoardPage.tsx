import TaskCard from "../components/tasks/TaskCard";
import { tasks } from "../data/tasks";
import TaskFilters, { type TaskFilter } from "../components/tasks/TaskFilters";
import TaskStats from "../components/tasks/TaskStats";
import TaskForm from "../components/tasks/TaskForm";
import type { CreateTaskInput } from "../types/task";
import { useState } from "react";
import { toggleTask } from "../utils/taskUtils";

function DashboardPage() {
  const [activeFilter, setActiveFilter] = useState<TaskFilter>("all");
  const [taskList, setTaskList] = useState(tasks);
  const [isCreating, setIsCreating] = useState(false);

  const myTasks = taskList.filter((task) => task.assignee === "Konrad");

  const completedTasks = taskList.filter((task) => task.status === "completed");

  const filteredTasks = taskList.filter((task) => {
    switch (activeFilter) {
      case "mine":
        return task.assignee === "Konrad";

      case "completed":
        return task.status === "completed";

      default:
        return true;
    }
  });

  const handleToggleTask = (taskId: string) => {
    setTaskList((prev) =>
      prev.map((task) => (task.id === taskId ? toggleTask(task) : task)),
    );
  };
  const handleCreateTask = (input: CreateTaskInput) => {
    const newTask = {
      id: crypto.randomUUID(),
      ...input,
      status: "todo" as const,
      assignee: "Konrad",
    };

    setTaskList((prev) => [newTask, ...prev]);
    setIsCreating(false);
  };

  return (
    <main className="px-6 pb-24 lg:pb-6">
      <h1 className="text-2xl font-bold text-slate-900 pb-2 lg:pb-4">
        Moje zadania
      </h1>

      <TaskFilters
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <TaskStats
        total={tasks.length}
        myTasks={myTasks.length}
        completed={completedTasks.length}
      />

      <section className="mt-6 space-y-3">
        <section className="mt-6 space-y-3">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} onToggle={handleToggleTask} />
          ))}
        </section>
      </section>
      <button
        type="button"
        onClick={() => setIsCreating(true)}
        className="
    mt-6 rounded-xl bg-blue-600
    px-4 py-3 text-sm font-medium text-white
  "
      >
        + Dodaj zadanie
      </button>
      {isCreating && (
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="mb-5 text-lg font-semibold text-slate-900">
            Nowe zadanie
          </h2>

          <TaskForm
            onSubmit={handleCreateTask}
            onCancel={() => setIsCreating(false)}
          />
        </section>
      )}
    </main>
  );
}

export default DashboardPage;
