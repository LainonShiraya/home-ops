import TaskCard from "../components/tasks/TaskCard";
import TaskFilters, { type TaskFilter } from "../components/tasks/TaskFilters";
import TaskStats from "../components/tasks/TaskStats";
import { useState } from "react";
import { sortTasksByPriority } from "../utils/taskUtils";
import { useTaskUI } from "../context/TaskUIContext/useTaskUI";
import TaskModal from "../components/tasks/TaskModal";
import type { TaskInput, Task } from "../types/task";
import TaskDeleteModal from "../components/tasks/TaskDeleteModal";
import { useTasks } from "../hooks/useTasks";
import { useHouseholds } from "../context/HouseholdContext/useHouseholds";
import HouseholdEmptyState from "../components/household/HouseholdEmptyState";

function DashboardPage() {
  const { activeHousehold } = useHouseholds();
  const [activeFilter, setActiveFilter] = useState<TaskFilter>("all");
  const { isTaskModalOpen, openTaskModal, closeTaskModal } = useTaskUI();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const { tasks, createTask, updateTask, deleteTask, toggleTaskStatus } =
    useTasks();
  const householdTasks = tasks.filter(
    (task) => task.householdId === activeHousehold?.id,
  );

  const myTasks = householdTasks.filter((task) => task.assigneeId === "user-1");

  const completedTasks = householdTasks.filter(
    (task) => task.status === "completed",
  );

  const filteredTasks = sortTasksByPriority(
    householdTasks.filter((task) => {
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

  const handleCreateTask = (input: TaskInput) => {
    createTask(input);
    setSelectedTask(null);
    closeTaskModal();
  };

  const handleUpdateTask = (input: TaskInput) => {
    if (!selectedTask) {
      return;
    }

    updateTask(selectedTask.id, input);
    setSelectedTask(null);
    closeTaskModal();
  };
  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    openTaskModal();
  };

  const confirmDeleteTask = () => {
    if (!taskToDelete) {
      return;
    }

    deleteTask(taskToDelete.id);
    setTaskToDelete(null);
  };
  if (!activeHousehold) {
    return <HouseholdEmptyState />;
  }
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
        total={householdTasks.length}
        myTasks={myTasks.length}
        completed={completedTasks.length}
      />
      <section className="mt-6 space-y-3">
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggle={toggleTaskStatus}
            onEdit={handleEditTask}
            onDelete={setTaskToDelete}
          />
        ))}
      </section>
      <TaskModal
        isOpen={isTaskModalOpen}
        onSubmit={selectedTask ? handleUpdateTask : handleCreateTask}
        onClose={() => {
          setSelectedTask(null);
          closeTaskModal();
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
