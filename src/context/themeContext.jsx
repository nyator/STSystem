import { useState, useEffect } from "react";
import {getLocalStorage, setLocalStorage} from '../Hooks/useLocalStorage'
import { ThemeContext } from "./themeContextObject";

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => getLocalStorage("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    setLocalStorage("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => (t === "light" ? "dark" : "light"));
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
