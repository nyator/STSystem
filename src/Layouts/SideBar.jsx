import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import MainContent from "./MainContent";
import Toast from "react-hot-toast";
import LogoutConfirmModal from "../components/ui/logoutConfirmModal";

import {
  LuChevronRight,
  LuLayoutDashboard,
  LuLogOut,
  LuSettings,
  LuTicket,
  LuUsersRound,
} from "react-icons/lu";
import logo from "../assets/logo.png";
import { useAuth } from "../Hooks/useAuth";
import { canManageTeam } from "../utils/AuthUtil";

export default function SideBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(true);
  const { user, logout } = useAuth();
  const [openLogoutConfirm, setOpenLogoutConfirm] = useState(false);

  const getActiveMenu = () => {
    const path = location.pathname;
    if (path.startsWith("/tickets")) return "Tickets";
    if (path.startsWith("/team")) return "Team";
    if (path.startsWith("/settings")) return "Settings";
    return "Dashboard";
  };

  const activeMenu = getActiveMenu();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 700) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (location.pathname === "/login") {
    return <MainContent />;
  }

  const menuItems = [
    { icon: LuLayoutDashboard, label: "Dashboard", path: "/" },
    { icon: LuTicket, label: "Tickets", path: "/tickets" },
    ...(canManageTeam(user)
      ? [{ icon: LuUsersRound, label: "Team", path: "/team" }]
      : []),
  ];

  const handleLogout = () => {
    setOpenLogoutConfirm(false);
    Toast.success("Logged out");
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex h-screen">
      <div
        className={`${
          isOpen ? "w-34" : "w-14"
        } h-full flex flex-col overflow-hidden border-r border-gray-200 bg-white transition-all duration-300 dark:border-gray-800 dark:bg-gray-950`}
      >
        {/* Header */}
        <div
          className={`mx-3 flex items-center ${isOpen ? "justify-between" : "justify-center"} border-b border-gray-100 px-0 py-5 dark:border-gray-800`}
        >
          {isOpen && <img src={logo} className="w-8 h-8" />}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-md border border-gray-200 bg-white p-2 text-gray-500 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <LuChevronRight
              size={15}
              className={`${isOpen ? "rotate-180" : ""} transition-transform duration-300`}
            />
          </button>
        </div>

        <nav
          className={`flex ${isOpen ? "items-start" : "items-center"} flex-col justify-start flex-1 py-4 px-2 space-y-3`}
        >
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center gap-2 rounded-md border px-2.5 py-2 ${isOpen ? "justify-start" : "justify-center"} ${activeMenu === item.label ? "border-blue-600 bg-blue-600 text-white shadow-sm shadow-blue-200/60 dark:shadow-none" : "border-transparent text-gray-600 hover:border-gray-200 hover:bg-gray-50 dark:text-gray-300 dark:hover:border-gray-800 dark:hover:bg-gray-900"} transition-all duration-200 ${isOpen ? "w-full" : ""}`}
            >
              <item.icon size={15} />
              {isOpen ? (
                <span className="text-xs font-medium">{item.label}</span>
              ) : null}
            </Link>
          ))}
        </nav>

        <nav
          className={`flex ${isOpen ? "items-start" : "items-center"} flex-col justify-end flex-1 py-4 px-2 space-y-3`}
        >
          <Link
            to="/settings"
            className={`flex items-center gap-2 rounded-md border px-2.5 py-2 ${isOpen ? "justify-start" : "justify-center"} ${activeMenu === "Settings" ? "border-gray-900 bg-gray-900 text-white dark:border-gray-700 dark:bg-gray-800" : "border-transparent text-gray-600 hover:border-gray-200 hover:bg-gray-50 dark:text-gray-300 dark:hover:border-gray-800 dark:hover:bg-gray-900"} transition-all duration-200 ${isOpen ? "w-full" : ""}`}
          >
            <LuSettings size={15} />
            {isOpen ? (
              <span className="text-xs font-medium">Settings</span>
            ) : null}
          </Link>
          <button
            type="button"
            onClick={() => setOpenLogoutConfirm(true)}
            className={`flex items-center gap-2 rounded-md border border-transparent px-2.5 py-2 text-gray-600 transition-all duration-200 hover:border-gray-200 hover:bg-gray-50 dark:text-gray-300 dark:hover:border-gray-800 dark:hover:bg-gray-900 ${isOpen ? "w-full justify-start" : "justify-center"}`}
          >
            <LuLogOut size={15} />
            {isOpen ? (
              <span className="text-xs font-medium">Logout</span>
            ) : null}
          </button>
        </nav>
      </div>

      <div>
        {openLogoutConfirm && (
          <LogoutConfirmModal
            isOpen={openLogoutConfirm}
            onConfirm={handleLogout}
            onCancel={() => setOpenLogoutConfirm(false)}
            submit={() => handleLogout()}
          />
        )}
      </div>

      <div className="h-full flex-1 overflow-auto bg-[#f6f7f9] dark:bg-[#0f141b] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-sm [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-gray-700">
        <MainContent />
      </div>
    </div>
  );
}
