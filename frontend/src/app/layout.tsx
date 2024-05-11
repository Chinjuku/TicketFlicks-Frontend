import type { Metadata } from "next";
import "@/app/styles/index.css";
import { inter } from "@/app/ui/fonts"
import Navbar from "@/app/components/navbar";

export const metadata: Metadata = {
  title: "TicketFlicks",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.className} scroll-smooth scroll-pt-[20%]`} style={inter.style}>
      <body className="desktop:pt-[196px] laptop:pt-[140px] tablet:pt-[150px] phone:pt-[97px] bg-gradient-to-b from-black text-white from-15% via-primary via-85% to-black h-screen">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
