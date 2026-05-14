import { ThemeToggle2 } from "../ui/ThemeToggles";
import { useAuth } from "../../Hooks/useAuth";
import NotificationCenter from "../ui/NotificationCenter";

function Header({ icon, title, description }) {
  const { user, isAuthenticated } = useAuth();

  return (
    <div>
      <div className="z-0 flex items-center justify-between">
        <div className="block">
          <div className="flex justify-start w-full items-end space-x-2">
            <div className="w-fit rounded-md bg-blue-50 p-1.5 text-blue-600 ring-1 ring-blue-100 dark:bg-blue-500/10 dark:text-blue-300 dark:ring-blue-500/20">
              {icon}
            </div>
            <h1 className="text-xl font-semibold text-gray-950 dark:text-white">{title}</h1>
          </div>
          <p className="hidden text-xs text-gray-500 dark:text-gray-400 sm:block">
            {description}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex gap-2">
            <ThemeToggle2 />
            <NotificationCenter />
          </div>

          {isAuthenticated && (
            <div className="flex items-center gap-1 px-2 py-2 leading-tight">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-xs font-semibold text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200">
                {user.name?.charAt(0).toUpperCase()}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] font-semibold text-gray-700 dark:text-gray-200">
                  {user.name}
                </p>
                <p className="text-[7px] text-gray-400 uppercase dark:text-gray-500">
                  {user.role}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
