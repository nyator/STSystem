import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext.jsx"


const ThemeToggle = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <div className='flex space-x-2 items-center'>
            <span className="text-xs font-medium text-nowrap">Light / Dark Mode</span>
            <div className="toggle-switch">
                <input 
                    type="checkbox" 
                    id="toggle" 
                    className="toggle-input" 
                    checked={theme === "dark"}
                    onChange={toggleTheme}
                />
                <label htmlFor="toggle" className="slider"></label>
            </div>
        </div>
    )
}

export default ThemeToggle

