import { CalendarDays, CheckSquare, Home, Plus, Wallet } from "lucide-react";
import { NavLink } from "react-router";
import { useTaskUI } from "../../context/TaskUIContext/useTaskUI";
const navigationItems = [
  {
    label: "Zadania",
    icon: CheckSquare,
    to: "/tasks",
  },
  {
    label: "Kalendarz",
    icon: CalendarDays,
    to: "/calendar",
  },
  {
    label: "Wydatki",
    icon: Wallet,
    to: "/expenses",
  },
  {
    label: "Mieszkanie",
    icon: Home,
    to: "/household",
  },
];

function AppNavigation() {
  const { openCreateTask } = useTaskUI();
  return (
    <nav
      className="
        fixed inset-x-0 bottom-0 z-50
        border-t border-slate-200
        bg-white
        px-2 py-2
        lg:inset-y-0 lg:left-0 lg:right-auto
        lg:w-60
        lg:border-r lg:border-t-0
        lg:px-4 lg:py-6
      "
    >
      <div className="flex items-center justify-around lg:flex-col lg:items-stretch lg:gap-2">
        {navigationItems.map(({ label, icon: Icon, to }) => (
          <NavLink
            key={label}
            to={to}
            className={({ isActive }) => `
    flex
    flex-col
    items-center
    justify-center
    gap-1
    rounded-xl
    px-3
    py-2
    text-xs
    transition

    ${
      isActive
        ? "bg-blue-50 text-blue-600"
        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
    }

    lg:flex-row
    lg:justify-start
    lg:gap-3
    lg:px-4
    lg:py-3
    lg:text-sm
  `}
          >
            <Icon size={20} />
            <span>{label}</span>
          </NavLink>
        ))}

        <button
          type="button"
          onClick={openCreateTask}
          aria-label="Dodaj zadanie"
          className="
    flex size-12 items-center justify-center
    rounded-full bg-blue-600 text-white
    shadow-lg transition
    hover:bg-blue-700
    active:scale-95

    lg:my-4
    lg:ml-1
    lg:size-auto
    lg:w-full
    lg:justify-start
    lg:rounded-xl
    lg:px-4
    lg:py-3
  "
        >
          <Plus size={22} />

          <span className="hidden lg:ml-3 lg:inline">Dodaj zadanie</span>
        </button>
      </div>
    </nav>
  );
}

export default AppNavigation;
