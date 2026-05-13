import { createPortalBody } from "../../utils/createPortal";
import Button from "../ui/Button";
import { LuBadgeInfo, LuX } from "react-icons/lu";

function TicketModal({
  isOpen,
  onClose,
  title = "Ticket",
  LAction,
  RVariant,
  RAction,
  children,
  submit,
  error,
  disabled,
  TitleIcon,
  LIcon,
  RIcon,
  ticketId,
  size = "md",
}) {
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
  };

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  if (!isOpen) return null;

  return createPortalBody(
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black/40 px-3 py-6 backdrop-blur-[1px]"
    >
      <div
        onClick={handleContentClick}
        className={`relative flex max-h-[85vh] w-full ${sizeClasses[size] || sizeClasses.md} flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-black/10 dark:border-gray-700 dark:bg-gray-800`}
      >
        <button
          type="button"
          onClick={onClose}
          className="group absolute right-4 top-4 rounded-lg bg-gray-100 p-2 text-2xl leading-none text-gray-600 transition duration-300 ease-in-out hover:bg-gray-200 active:scale-[0.9] dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
          aria-label="Close modal"
        >
          <LuX className="group-hover:rotate-90 text-sm transition-transform duration-300 ease-in-out group-hover:text-black dark:group-hover:text-white text-gray-600 dark:text-gray-100" />
        </button>

        <div className="border-b border-gray-100 px-6 py-4 pr-14 dark:border-gray-700">
          <h2 className="flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-white">
            {TitleIcon}
            <span>{title}</span>
          </h2>
          {ticketId && (
            <p className="mt-1 text-xs font-medium text-gray-400 dark:text-gray-500">
              {ticketId}
            </p>
          )}
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 text-gray-600 dark:text-gray-300">
          {children}
        </div>

        <div className="relative flex justify-end gap-2 border-t border-gray-100 px-6 py-4 dark:border-gray-700">
          {error && (
            <div className="absolute -top-6 left-0 flex w-full items-center justify-center space-x-1.5 rounded-2xl px-2 text-[12px] text-red-600">
              <LuBadgeInfo />
              <p>enter valid inputs into fields</p>
            </div>
          )}
          {LAction && (
            <Button variant="default" onClick={onClose}>
              {LIcon}
              {LAction}
            </Button>
          )}
          {RAction && (
            <Button
              variant={RVariant || "primary"}
              type="submit"
              disabled={disabled}
              onClick={submit}
            >
              {RIcon}
              {RAction}
            </Button>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default TicketModal;
