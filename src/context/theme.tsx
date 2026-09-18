import { createContext, useContext, type Dispatch, type SetStateAction } from "react";

export type ThemeContextValue = {
  dark: boolean;
  setDark: Dispatch<SetStateAction<boolean>>;
};

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeContext.Provider");
  }
  return ctx;
}
