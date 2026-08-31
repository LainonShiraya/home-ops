import { Bell, UserCircle } from "lucide-react";

function AppHeader() {
  return (
    <header className="flex items-center justify-between px-6 py-5">
      <div>
        <p className="text-sm text-slate-500">Dzień dobry 👋</p>

        <h1 className="mt-1 text-xl font-bold text-slate-900">Konrad</h1>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Powiadomienia"
          className="flex size-10 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100"
        >
          <Bell size={20} />
        </button>

        <button
          type="button"
          aria-label="Profil użytkownika"
          className="flex size-10 items-center justify-center rounded-full bg-blue-100 text-blue-600"
        >
          <UserCircle size={22} />
        </button>
      </div>
    </header>
  );
}

export default AppHeader;
