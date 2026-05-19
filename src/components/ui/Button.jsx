import { useEffect, useRef, useState } from "react";
import { LuChevronDown } from "react-icons/lu";
import {
  baseClasses,
  variantClasses,
  optionBaseClasses,
} from "../../constant/constants";

function MainButton({
  variant = "default",
  children,
  type,
  onClick,
  disabled,
}) {
  const classes = `${baseClasses} ${variantClasses[variant] || variantClasses.default}`;
  const disabledClass = `${baseClasses} ${variantClasses.disabled}`;

  return (
    <button
      className={disabled ? disabledClass : classes}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

function OptionButton({
  options,
  selected,
  isOpen,
  setIsOpen,
  title,
  disabled,
}) {
  const ref = useRef();
  const [menuPlacement, setMenuPlacement] = useState("down");

  const getBoundaryRect = () => {
    let parent = ref.current?.parentElement;

    while (parent && parent !== document.body) {
      const { overflowY, overflow } = window.getComputedStyle(parent);
      const clipsY = /(auto|scroll|hidden)/.test(`${overflowY} ${overflow}`);

      if (clipsY) return parent.getBoundingClientRect();
      parent = parent.parentElement;
    }

    return {
      top: 0,
      bottom: window.innerHeight,
    };
  };

  const updateMenuPlacement = () => {
    if (!ref.current) return;

    const triggerRect = ref.current.getBoundingClientRect();
    const boundaryRect = getBoundaryRect();
    const menuHeight = Math.min(options.length * 36, 240);
    const roomBelow = boundaryRect.bottom - triggerRect.bottom;
    const roomAbove = triggerRect.top - boundaryRect.top;
    const shouldOpenUp = roomBelow < menuHeight && roomAbove > roomBelow;

    setMenuPlacement(shouldOpenUp ? "up" : "down");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsOpen]);

  const selectedOption = options.find((opt) => opt.value === selected);
  const displayText = selectedOption ? selectedOption.label : selected;
  const placementClass =
    menuPlacement === "up" ? "bottom-full mb-1" : "top-full mt-1";

  return (
    <div
      className="relative"
      ref={ref}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        onClick={() => {
          if (!isOpen) updateMenuPlacement();
          setIsOpen(!isOpen);
        }}
        disabled={disabled}
        className={`${disabled ? "active:scale-[1]" : ""} ${optionBaseClasses} ${isOpen ? "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200" : "hover:bg-gray-200 dark:hover:bg-gray-700"}`}
      >
        {title && (
          <p className="text-center mr-2 text-gray-500 dark:text-gray-400">
            {title}:
          </p>
        )}
        {displayText}
        {disabled ? null : (
          <LuChevronDown
            className={`inline ml-1 transition-transform ${isOpen ? "rotate-180" : ""}`}
            size={12}
          />
        )}
      </button>

      {isOpen && (
        <div
          className={`absolute left-0 z-50 max-h-60 w-full min-w-24 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800 ${placementClass}`}
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className={`w-full text-left px-4 py-2 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 ${
                selected === opt.value
                  ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-medium"
                  : ""
              }`}
              onClick={() => {
                setIsOpen(null);
                opt.onClick?.();
              }}
            >
              {opt.label}
              {/* {selected === opt.value && <LuCheck size={12} />} */}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export { MainButton as default, OptionButton };
