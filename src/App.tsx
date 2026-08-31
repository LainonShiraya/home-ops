import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import CalendarPage from "./pages/CalendarPage";
import DashboardPage from "./pages/DashboardPage";
import ExpensesPage from "./pages/ExpensesPage";
import HouseholdPage from "./pages/HouseholdPage";
import AppLayout from "./components/layout/AppLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/tasks" element={<DashboardPage />} />

          <Route path="/calendar" element={<CalendarPage />} />

          <Route path="/expenses" element={<ExpensesPage />} />

          <Route path="/household" element={<HouseholdPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/tasks" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
