import type { Metadata } from "next";
import "@/app/styles/index.css";
import { inter, lato } from "@/app/ui/fonts";
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
    <html
      lang="en"
      className={`${lato.className} scroll-smooth scroll-pt-[20%]`}
      style={lato.style}
    >
      <body className="desktop:pt-[196px] laptop:pt-[140px] tablet:pt-[150px] phone:pt-[97px] bg-gradient-to-b text-white from-black from-15% via-primary1 via-85% overflow-x-hidden to-black h-full">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
