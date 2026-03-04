import { useState } from 'react'
import { LuChevronDown, LuCheck } from 'react-icons/lu';
import { baseClasses, variantClasses, optionBaseClasses } from "../../constant/constants"

function MainButton({ variant = "default", children, type, onClick, }) {

  const classes = `${baseClasses} ${variantClasses[variant] || variantClasses.default}`;

  return (
    <>
      <button className={classes} onClick={onClick} type={type}>{children}</button>
    </>
  )
}




function OptionButton({ children, options, selected, isOpen, setIsOpen, title }) {

  // Find the selected option label to display
  const selectedOption = options.find(opt => opt.value === selected);
  const displayText = selectedOption ? selectedOption.label : children;

  return (
    <div className="relative h-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`${optionBaseClasses} ${isOpen ? 'bg-gray-200 text-gray-800' : 'hover:bg-gray-200'}`}
      >
        {title && <p className='text-center mr-2 text-gray-500'>{title} :</p>}

        {displayText}
        <LuChevronDown
          className={`inline ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          size={12}
        />
      </button>

      {isOpen && (
        <div className="absolute -top-30 left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg min-h-12 min-w-24 shadow-lg z-10">
          {options && options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className={`w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center justify-between ${selected === opt.value ? 'bg-blue-50 text-blue-600 font-medium' : ''}`}
              onClick={() => {
                setIsOpen(false);
                if (opt.onClick) opt.onClick();
              }}
            >
              {opt.label}
              {selected === opt.value}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export { MainButton as default, OptionButton }