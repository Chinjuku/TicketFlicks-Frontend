"use client";
import "@/styles/index.css";
import { useEffect, useState } from "react";
import Navbar from "@/app/ui/navbar";
import dynamic from 'next/dynamic';
import { SwitchToggle } from "@/app/ui/switch";

const ScrollWatcher = dynamic(() => import('@/app/ui/scroll-watcher'), { ssr: false });

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
        <div className={`${theme} bg-gradient-to-b from-black via-primary to-black text-white`}>
          <ScrollWatcher />
          <Navbar />
          <SwitchToggle isSelected={isSelected} setIsSelected={(isSelected) => setIsSelected(isSelected)} />
          {children}
        </div>
    );
  }
