"use client";
import "@/styles/index.css";
import { useEffect, useState } from "react";
import Navbar from "@/app/ui/navbar";
import ScrollWatcher from "@/app/ui/scroll-watcher";
import { SwitchToggle } from "@/app/ui/switch";

export default function ClientRootLayout({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState("dark"); // Default to dark
    const [isSelected, setIsSelected] = useState(true);
  
    useEffect(() => {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme) {
        setTheme(storedTheme);
        setIsSelected(storedTheme === "dark");
      } else {
        setTheme("dark");
        setIsSelected(true);
      }
    }, []);
  
    useEffect(() => {
      const newTheme = isSelected ? "dark" : "light";
      setTheme(newTheme);
      localStorage.setItem("theme", newTheme);
    }, [isSelected]);
    return (
        <div id="body" className={`${theme} bg-gradient-to-b from-black via-primary to-black text-white`}>
          <Navbar />
          <SwitchToggle isSelected={isSelected} setIsSelected={(isSelected) => setIsSelected(isSelected)} />
          {children}
          <ScrollWatcher />
        </div>
    );
  }
