import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import CalendarPage from "./pages/CalendarPage";
import DashboardPage from "./pages/DashboardPage";
import ExpensesPage from "./pages/ExpensesPage";
import HouseholdPage from "./pages/HouseholdPage";
import AppLayout from "./components/layout/AppLayout";
import { TaskUIProvider } from "./context/TaskUIContext/TaskUIProvider";
function App() {
  return (
    <BrowserRouter>
      <TaskUIProvider>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/tasks" element={<DashboardPage />} />

            <Route path="/calendar" element={<CalendarPage />} />

            <Route path="/expenses" element={<ExpensesPage />} />

            <Route path="/household" element={<HouseholdPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/tasks" replace />} />
        </Routes>
      </TaskUIProvider>
    </BrowserRouter>
  );
}

export default App;
