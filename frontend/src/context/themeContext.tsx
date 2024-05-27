"use client";
import React, { createContext, useState, ReactNode, useEffect } from "react";

interface ThemeContextProps {
  theme: string | null;
  setTheme: React.Dispatch<React.SetStateAction<string | null>>;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export const themeContext = createContext<ThemeContextProps>({} as ThemeContextProps);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<string | null>("dark");
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      setTheme("dark");
    }
  }, []);

  return (
    <themeContext.Provider value={{ theme, setTheme }}>
      {children}
    </themeContext.Provider>
  );
};
