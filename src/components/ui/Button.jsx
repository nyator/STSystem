import { useState } from 'react'
import { LuChevronDown } from 'react-icons/lu';
import { baseClasses, variantClasses, optionBaseClasses } from "../../constant/constants"

function MainButton({ variant = "default", children, type, onClick, }) {

  const classes = `${baseClasses} ${variantClasses[variant] || variantClasses.default}`;

  return (
    <>
      <button className={classes} onClick={onClick} type={type}>{children}</button>
    </>
  )
}




function OptionButton({ children, options, isOpen, setOpen }) {
  const openClasses = isOpen ? "bg-gray-200 text-gray-600" : "hover:bg-gray-200";

  const [open, setIsOpen] = useState(false);
  return (
    <div className="relative h-full">
      <button onClick={() => setIsOpen(!open)} className={`${optionBaseClasses} ${openClasses}`}>{children}<LuChevronDown className="inline ml-1" size={12} /></button>
      {
        open && (
          <div className="absolute -bottom-12 left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg min-h-12 shadow-lg z-10">
            {optionItems}
          </div>
        )
      }
    </div>
  )
}

export { MainButton as default, OptionButton }