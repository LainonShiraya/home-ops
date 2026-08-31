import { Outlet } from "react-router";
import AppHeader from "./AppHeader";
import AppNavigation from "./AppNavigation";

function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <AppNavigation />

      <div className="lg:pl-60">
        <AppHeader />

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
