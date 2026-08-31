import AppHeader from "./AppHeader";
import AppNavigation from "./AppNavigation";

type AppLayoutProps = {
  children: React.ReactNode;
};

function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <AppNavigation />

      <div className="lg:pl-60">
        <AppHeader />

        <main>{children}</main>
      </div>
    </div>
  );
}

export default AppLayout;
