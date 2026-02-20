import React from 'react'
import { LuChevronDown } from 'react-icons/lu';

function MainButton({ variant = "default", children, type }) {
  const baseClasses = "group border-2 text-nowrap p-2 rounded-lg font-medium text-xs transition-all ease-in-out duration-200 ";
  const variantClasses = {
    default: "bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-200",
    primary: "bg-blue-500 text-white hover:bg-blue-600 border-blue-500",
    secondary: "bg-gray-500 text-white hover:bg-gray-600 border-gray-500",
  };
  const classes = `${baseClasses} ${variantClasses[variant] || variantClasses.default}`;

  return (
    <button className={classes} type={type}>{children}</button>
  )
}

function OptionButton({ children, isOpen, setOpen }) {
  const baseClasses = "bg-gray-100 mb-2 px-4 p-2 text-gray-400 rounded-full items-center flex text-xs transition-all ease-in-out duration-200";
  const openClasses = isOpen ? "bg-gray-200 text-gray-600" : "hover:bg-gray-200";

  const [open, setIsOpen] = React.useState(false);
  return (
    <div className="relative h-full">
      <button onClick={() => setIsOpen(!open)} className={`${baseClasses} ${openClasses}`}>{children} <LuChevronDown className="inline ml-1" size={12} /></button>
      {
        open && (
          <div className="absolute bottom-0 left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            {children}
          </div>
        )
      }
    </div>
  )
}

export { MainButton as default, OptionButton }

//Look for good tailwind button examples and implement them here. Make sure to include variants for primary, secondary, and default buttons.