import { createContext, useContext } from "react";

interface ThemeContextType {
  dark: boolean;
  setDark: (dark: boolean | ((prev: boolean) => boolean)) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  dark: false,
  setDark: () => {},
});

export const useTheme = () => useContext(ThemeContext);
