import { useState } from "react";
import {
  LuSearch,
  LuTextSelect,
  LuTextCursorInput,
  LuMessagesSquare,
  LuEye,
  LuEyeOff,
} from "react-icons/lu";

export const baseInputClasses =
  "w-full p-2 text-gray-900 font-medium text-xs bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 h-10 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-500/20 transition-colors duration-200 dark:text-gray-100 placeholder:text-gray-400";

function SearchInput({ register, formfields, ...props }) {
  return (
    <div className="relative">
      <input
        {...register("search", formfields)}
        type="search"
        placeholder="Search Tickets"
        className={`pl-8 ${baseInputClasses}`}
        {...props}
      />
      <LuSearch
        className="absolute left-3 top-3 text-gray-400 dark:text-gray-400"
        size={15}
      />
    </div>
  );
}

function FormInputEmpty({
  register,
  readOnly,
  name,
  placeholder,
  error,
  formfields,
  ...props
}) {
  return (
    <div className="relative mb-2">
      <input
        {...register(name, formfields)}
        placeholder={placeholder}
        type={name === "email" ? "email" : "text"}
        className={`text-center ${baseInputClasses} ${error ? "border-red-400 bg-red-50 focus:ring-red-100 dark:bg-red-500/10" : ""}`}
        {...props}
        {...(readOnly && { readOnly })}
      />
    </div>
  );
}

function FormInput({
  register,
  readOnly,
  name,
  type,
  placeholder,
  error,
  formfields,
  icon,
  ...props
}) {
  const isPassword = type === "password" || name === "password";
  const [showPassword, setShowPassword] = useState(false);

  const resolvedType = isPassword
    ? showPassword ? "text" : "password"
    : type || (name === "email" ? "email" : "text");

  return (
    <div className="relative mb-2">
      <input
        {...register(name, formfields)}
        placeholder={placeholder}
        type={resolvedType}
        className={`pl-8 ${isPassword ? "pr-8" : ""} ${baseInputClasses} ${error ? "border-red-400 bg-red-50 focus:ring-red-100 dark:bg-red-500/10" : ""} ${readOnly ? "cursor-not-allowed bg-gray-50 dark:bg-gray-800" : ""}`}
        {...props}
        {...(readOnly && { readOnly })}
      />

      {/* Left icon */}
      {icon ? (
        icon
      ) : (
        <LuTextSelect
          className="absolute left-3 top-3 text-gray-700 dark:text-gray-400"
          size={15}
        />
      )}

      {/* Right toggle for password */}
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword((v) => !v)}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors duration-150 focus:outline-none"
          tabIndex={-1}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <LuEyeOff size={14} /> : <LuEye size={14} />}
        </button>
      )}
    </div>
  );
}

function FormTextArea({
  register,
  readOnly,
  name,
  placeholder,
  formfields,
  error,
  ...props
}) {
  return (
    <div className="relative mb-2">
      <textarea
        {...register(name, formfields)}
        placeholder={placeholder}
        className={`${error ? "border-red-400 bg-red-50 focus:ring-red-100 dark:bg-red-500/10" : ""} w-full p-2 pl-8 text-gray-900 font-medium text-xs bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 min-h-20 max-h-42 rounded-md focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-500/20 transition-colors duration-200 dark:text-gray-100 placeholder:text-gray-400 ${readOnly ? "cursor-not-allowed bg-gray-50 dark:bg-gray-800" : ""}`}
        {...props}
        {...(readOnly && { readOnly })}
      />
      <LuTextCursorInput
        className="absolute left-3 top-3 text-gray-700 dark:text-gray-400"
        size={15}
      />
    </div>
  );
}

function FormCommentArea({
  register,
  readOnly,
  name,
  placeholder,
  formfields,
  error,
  ...props
}) {
  return (
    <div className="relative mb-2">
      <textarea
        {...register(name, formfields)}
        placeholder={placeholder}
        className={`w-full p-2 pl-8 rounded-md min-h-9 h-9 text-xs text-gray-800 dark:text-gray-100 border border-dashed border-gray-300 dark:border-gray-700 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-500/20 transition-colors ${error ? "border-red-400 bg-red-50 dark:bg-red-500/10" : "bg-white dark:bg-gray-900"} max-h-42 ${readOnly ? "cursor-not-allowed" : ""}`}
        {...props}
        {...(readOnly && { readOnly })}
      />
      <LuMessagesSquare
        className="absolute left-3 top-2.5 text-gray-700 dark:text-gray-400"
        size={14}
      />
    </div>
  );
}

export {
  SearchInput as default,
  FormInputEmpty,
  FormInput,
  FormTextArea,
  FormCommentArea,
};
