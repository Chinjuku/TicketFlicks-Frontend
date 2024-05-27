"use client";
import "@/styles/index.css";
import { useEffect, useState, useContext } from "react";
import Navbar from "@/app/ui/navbar";
import ScrollWatcher from "@/app/ui/scroll-watcher";
import { SwitchToggle } from "@/app/ui/switch";
import { lato } from "@/app/ui/fonts";
import { themeContext } from "@/context/themeContext"

export default function ClientRootLayout({ children }: { children: React.ReactNode }) {
    // const [theme, setTheme] = useState("dark"); // Default to dark
    const [isSelected, setIsSelected] = useState(true);
    const { theme, setTheme } = useContext(themeContext)
    useEffect(() => {
      if (theme) {
        setTheme(theme);
        setIsSelected(theme === "dark");
      } else {
        setTheme("dark");
        setIsSelected(true);
      }
    }, [theme]);
  
    useEffect(() => {
      const newTheme = isSelected ? "dark" : "light";
      setTheme(newTheme);
      localStorage.setItem("theme", newTheme);
    }, [isSelected]);
    
    return (
        <div id="body" className={`${theme} ${lato.className} bg-gradient-to-b from-black via-primary to-black text-white`}>
          <Navbar />
          <SwitchToggle isSelected={isSelected} setIsSelected={(isSelected) => setIsSelected(isSelected)} />
          {children}
          <ScrollWatcher />
        </div>
    );
  }
