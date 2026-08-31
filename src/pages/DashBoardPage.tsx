import TaskCard from "../components/tasks/TaskCard";
import { tasks } from "../data/tasks";
import TaskFilters, { type TaskFilter } from "../components/tasks/TaskFilters";
import TaskStats from "../components/tasks/TaskStats";
import { useState } from "react";
import { sortTasksByPriority, toggleTask } from "../utils/taskUtils";
import { useTaskUI } from "../context/TaskUIContext/useTaskUI";
import CreateTaskModal from "../components/tasks/CreateTaskModal";
import type { CreateTaskInput } from "../types/task";
function DashboardPage() {
  const [activeFilter, setActiveFilter] = useState<TaskFilter>("all");
  const [taskList, setTaskList] = useState(tasks);
  const myTasks = taskList.filter((task) => task.assignee === "Konrad");
  const { isCreateTaskOpen, closeCreateTask } = useTaskUI();

  const completedTasks = taskList.filter((task) => task.status === "completed");

  const filteredTasks = sortTasksByPriority(
    taskList.filter((task) => {
      switch (activeFilter) {
        case "mine":
          return task.assignee === "Konrad";

        case "completed":
          return task.status === "completed";

        default:
          return true;
      }
    }),
  );

  const handleToggleTask = (taskId: string) => {
    setTaskList((prev) =>
      prev.map((task) => (task.id === taskId ? toggleTask(task) : task)),
    );
  };

  const handleCreateTask = (input: CreateTaskInput) => {
    const newTask = {
      id: Date.now().toString(),
      ...input,
      status: "todo" as const,
      assignee: "Konrad",
    };

    setTaskList((prev) => [newTask, ...prev]);
    closeCreateTask();
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
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} onToggle={handleToggleTask} />
        ))}
      </section>
      <CreateTaskModal
        isOpen={isCreateTaskOpen}
        onSubmit={handleCreateTask}
        onClose={closeCreateTask}
      />
    </main>
  );
}

export default DashboardPage;
