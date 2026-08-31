import AppLayout from "../components/layout/AppLayout";
import TaskCard from "../components/tasks/TaskCard";
import { tasks } from "../data/tasks";

function DashboardPage() {
  return (
    <AppLayout>
      <main className="px-6 pb-24 lg:pb-6">
        <h1 className="text-2xl font-bold text-slate-900">Moje zadania</h1>

        <section className="mt-6 space-y-3">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </section>
      </main>
    </AppLayout>
  );
}

export default DashboardPage;
