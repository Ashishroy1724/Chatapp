import { create } from "zustand";

export const useThemeStore = create((set) => ({
    theme: localStorage.getItem("chat-theme") || "coffee",
    setTheme: (theme) => {
        localStorage.setItem("chat-theme", theme);
        document.documentElement.setAttribute("data-theme", theme); // Apply theme globally
        set({ theme });
    },
}));

// Ensure the initial theme is applied on page load
const initialTheme = localStorage.getItem("chat-theme") || "coffee";
document.documentElement.setAttribute("data-theme", initialTheme);
