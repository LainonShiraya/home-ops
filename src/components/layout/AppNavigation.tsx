import { CalendarDays, CheckSquare, Home, Plus, Wallet } from "lucide-react";

const navigationItems = [
  {
    label: "Zadania",
    icon: CheckSquare,
  },
  {
    label: "Kalendarz",
    icon: CalendarDays,
  },
  {
    label: "Wydatki",
    icon: Wallet,
  },
  {
    label: "Mieszkanie",
    icon: Home,
  },
];

function AppNavigation() {
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
        {navigationItems.map(({ label, icon: Icon }) => (
          <button
            key={label}
            type="button"
            className="
              flex
              flex-col
              items-center
              justify-center
              gap-1
              rounded-xl
              px-3
              py-2
              text-xs
              text-slate-500
              transition
              hover:bg-slate-50
              hover:text-slate-900

              lg:flex-row
              lg:justify-start
              lg:gap-3
              lg:px-4
              lg:py-3
              lg:text-sm
            "
          >
            <Icon size={20} />
            <span>{label}</span>
          </button>
        ))}

        <button
          type="button"
          aria-label="Dodaj zadanie"
          className="
            flex
            size-12
            items-center
            justify-center
            rounded-full
            bg-blue-600
            text-white
            shadow-lg
            transition
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
