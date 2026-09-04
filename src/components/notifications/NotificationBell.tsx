import { Bell } from "lucide-react";
import { useState } from "react";

import { useNotifications } from "../../context/NotificationContext/useNotifications";

function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);

  const { myNotifications, unreadCount, markAsRead, markAllAsRead } =
    useNotifications();

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="relative cursor-pointer rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
        aria-label="Powiadomienia"
      >
        <Bell size={20} />

        {unreadCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex size-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute right-0 top-12 z-50 w-[calc(100vw-2rem)] max-w-sm overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
              <h2 className="font-semibold text-slate-900">Powiadomienia</h2>

              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={markAllAsRead}
                  className="cursor-pointer text-xs font-medium text-indigo-600 hover:text-indigo-700"
                >
                  Oznacz jako przeczytane
                </button>
              )}
            </div>

            {myNotifications.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <Bell size={28} className="mx-auto text-slate-300" />

                <p className="mt-3 text-sm font-medium text-slate-700">
                  Brak powiadomień
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Tutaj pojawią się najnowsze informacje.
                </p>
              </div>
            ) : (
              <div className="max-h-96 overflow-y-auto">
                {myNotifications.map((notification) => (
                  <button
                    key={notification.id}
                    type="button"
                    onClick={() => {
                      markAsRead(notification.id);
                    }}
                    className={`flex w-full cursor-pointer gap-3 border-b border-slate-100 px-4 py-3 text-left last:border-b-0 hover:bg-slate-50 ${
                      notification.read ? "bg-white" : "bg-indigo-50/40"
                    }`}
                  >
                    <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                      <Bell size={17} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium text-slate-900">
                          {notification.title}
                        </p>

                        {!notification.read && (
                          <span className="mt-1 size-2 shrink-0 rounded-full bg-indigo-600" />
                        )}
                      </div>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        {notification.message}
                      </p>

                      <p className="mt-1 text-[11px] text-slate-400">
                        {new Date(notification.createdAt).toLocaleString(
                          "pl-PL",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                          },
                        )}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default NotificationBell;
