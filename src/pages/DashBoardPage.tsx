import TaskCard from "../components/tasks/TaskCard";
import { tasks } from "../data/tasks";
import TaskFilters, { type TaskFilter } from "../components/tasks/TaskFilters";
import TaskStats from "../components/tasks/TaskStats";
import { useState } from "react";
import { sortTasksByPriority, toggleTask } from "../utils/taskUtils";
import { useTaskUI } from "../context/TaskUIContext/useTaskUI";
import CreateTaskModal from "../components/tasks/CreateTaskModal";
import type { CreateTaskInput, Task } from "../types/task";
import TaskDeleteModal from "../components/tasks/TaskDeleteModal";

function DashboardPage() {
  const [activeFilter, setActiveFilter] = useState<TaskFilter>("all");
  const [taskList, setTaskList] = useState(tasks);
  const myTasks = taskList.filter((task) => task.assigneeId === "user-1");
  const { isCreateTaskOpen, openCreateTask, closeCreateTask } = useTaskUI();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const completedTasks = taskList.filter((task) => task.status === "completed");

  const filteredTasks = sortTasksByPriority(
    taskList.filter((task) => {
      switch (activeFilter) {
        case "mine":
          return task.assigneeId === "user-1";

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
    setSelectedTask(null);
    const newTask = {
      id: Date.now().toString(),
      ...input,
      status: "todo" as const,
      assignee: "Konrad",
    };

    setTaskList((prev) => [newTask, ...prev]);
  };

  const handleUpdateTask = (input: CreateTaskInput) => {
    if (!selectedTask) {
      return;
    }

    setTaskList((prev) =>
      prev.map((task) =>
        task.id === selectedTask.id
          ? {
              ...task,
              ...input,
            }
          : task,
      ),
    );

    setSelectedTask(null);
    closeCreateTask();
  };
  const handleEditTask = (task: Task) => {
    openCreateTask();
    setSelectedTask(task);
  };

  const handleDeleteTask = (task: Task) => {
    setTaskToDelete(task);
  };

  const confirmDeleteTask = () => {
    if (!taskToDelete) {
      return;
    }
    setTaskList((prev) => prev.filter((task) => task.id !== taskToDelete.id));
    setTaskToDelete(null);
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
          <TaskCard
            key={task.id}
            task={task}
            onToggle={handleToggleTask}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          />
        ))}
      </section>
      <CreateTaskModal
        isOpen={isCreateTaskOpen}
        onSubmit={selectedTask ? handleUpdateTask : handleCreateTask}
        onClose={() => {
          setSelectedTask(null);
          closeCreateTask();
        }}
        initialValues={selectedTask ?? undefined}
      />
      <TaskDeleteModal
        task={taskToDelete}
        onConfirm={confirmDeleteTask}
        onClose={() => setTaskToDelete(null)}
      />
    </main>
  );
}

export default DashboardPage;
