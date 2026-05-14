import { useEffect, useState } from "react";
import { createPortal } from "react-dom"; // Standard portal usage
import Button from "../ui/Button";
import { LuArrowLeft, LuBadgeInfo, LuX } from "react-icons/lu";
import { IoChevronBackOutline } from "react-icons/io5";

function NewTicketModal({
  isOpen,
  onClose,
  titleID,
  LAction,
  RVariant,
  RAction,
  children,
  submit,
  error,
  disabled,
  TitleIcon,
  ticketTitle,
  LIcon,
  RIcon,
  size = "md",
}) {
  const [shouldRender, setShouldRender] = useState(isOpen);

  // Handle animation out before unmounting
  useEffect(() => {
    if (isOpen) setShouldRender(true);
  }, [isOpen]);

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  if (!shouldRender) return null;

  return createPortal(
    <div
      onClick={onClose}
      className={`fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative flex h-screen w-full  ${
          sizeClasses[size] || sizeClasses.md
        } transform flex-col bg-white shadow-2xl transition-transform duration-300 ease-out dark:bg-gray-800 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } border-l border-gray-200 dark:border-gray-700`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5 dark:border-gray-700">
          <div className="w-full flex justify-center items-center">
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 left-5 rounded-xl p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <IoChevronBackOutline size={20} />
            </button>

            <div>
              <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white">
                <span className="text-xs px-2 border rounded-md text-gray-500 dark:text-gray-400">
                  {titleID}
                </span>
                <span className="">{ticketTitle}</span>
              </h2>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 text-gray-600 dark:text-gray-300">
          {children}
        </div>

        {/* Footer */}
        <div className="bg-gray-50/50 dark:bg-gray-900/20 px-6 py-2 border-t border-gray-100 dark:border-gray-700 mb-4">
          {error && (
            <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-xs text-red-600 dark:bg-red-900/20">
              <LuBadgeInfo className="shrink-0" />
              <p>Please check the fields for valid inputs.</p>
            </div>
          )}

          <div className="flex justify-end gap-3">
            {LAction && (
              <Button
                variant="ghost"
                onClick={onClose}
                className="border border-gray-200 dark:border-gray-700"
              >
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
                className="px-8 shadow-lg shadow-blue-500/20"
              >
                {RIcon}
                {RAction}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default NewTicketModal;
