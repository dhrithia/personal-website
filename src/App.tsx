import { useState, useEffect } from "react";
import { RouterProvider } from "react-router";
import { router } from "./app/routes";
import { ThemeContext } from "./context/theme";

export default function App() {
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      <RouterProvider router={router} />
    </ThemeContext.Provider>
  );
}
