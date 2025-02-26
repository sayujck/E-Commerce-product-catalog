"use client";

import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { createContext, useState, useMemo, useContext, ReactNode } from "react";

const ThemeContext = createContext<any>(null);

export function ThemeProviderWrapper({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
        },
      }),
    [darkMode]
  );

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext);
}
