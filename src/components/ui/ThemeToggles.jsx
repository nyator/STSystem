import { useContext } from "react";
import { ThemeContext } from "../../context/themeContextObject";
import { LuSunMedium, LuMoon } from "react-icons/lu";

function ThemeToggle() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    return (
        <div className='flex space-x-2 items-center'>
            <div className="toggle-switch">
                <input
                    type="checkbox"
                    id="toggle"
                    className="toggle-input"
                    checked={theme === "dark"}
                    onChange={toggleTheme}
                    aria-label="Toggle dark mode"
                />
                <label htmlFor="toggle" className="slider"></label>
            </div>
        </div>
    );
}

function ThemeToggle2() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    return (
        <button type="button" onClick={toggleTheme} aria-label="Toggle dark mode" className=" hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-full hover:animate-wiggle">
            {theme === 'dark' ? <LuSunMedium size={18} color="#fbc32b" /> : <LuMoon size={18} color="#007FFF" />}
        </button>
    );
}

export { ThemeToggle as default, ThemeToggle2 };
