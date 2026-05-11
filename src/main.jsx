import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./context/themeContext";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";
import SideBar from "./Layouts/SideBar";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <SideBar />
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
      <Toaster position="top-center" />
    </QueryClientProvider>
  </StrictMode>,
);

