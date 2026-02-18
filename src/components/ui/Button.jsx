import React from 'react'

function Button({ variant = "default", children }) {

  // const baseClasses = "button ";
  const baseClasses = "group border-2 border-blue-500 p-2 rounded-lg font-medium text-xs transition-all ease-in-out duration-200 ";

  const variantClasses = {
    default: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
  };

  const classes = `${baseClasses} ${variantClasses[variant] || variantClasses.default}`;
  return (
    <button className={classes}>{children}</button>
  )
}

export default Button



//Look for good tailwind button examples and implement them here. Make sure to include variants for primary, secondary, and default buttons.