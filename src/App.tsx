import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import CalendarPage from "./pages/CalendarPage";
import DashboardPage from "./pages/DashboardPage";
import ExpensesPage from "./pages/ExpensesPage";
import AppLayout from "./components/layout/AppLayout";
import HouseholdPage from "./pages/HouseholdPage";

import { TaskUIProvider } from "./context/TaskUIContext/TaskUIProvider";
import { HouseholdProvider } from "./context/HouseholdContext/HouseholdProvider";
import NotificationProvider from "./context/NotificationContext/NotificationProvider";
import { TaskProvider } from "./context/TaskContext/TaskProvider";
function App() {
  return (
    <BrowserRouter>
      <HouseholdProvider>
        <NotificationProvider>
          <TaskProvider>
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
          </TaskProvider>
        </NotificationProvider>
      </HouseholdProvider>
    </BrowserRouter>
  );
}

export default App;
