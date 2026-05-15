import { createContext, useContext } from "react"

export const SidebarContext = createContext({
  isSidebarOpen: true,
  toggleSidebar: () => {},
})

export const useSidebar = () => useContext(SidebarContext)
