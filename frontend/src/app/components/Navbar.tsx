"use client";
import "@/app/styles/navbar.css";
import NavLinks from "@/app/components/nav-links";
import { TicketIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import clsx from "clsx";

const Navbar = () => {
  const [open, setOpen] = useState(false)
  return (
    <div
      className={`bg-black desktop:h-[196px] laptop:h-[140px] tablet:h-[150px] phone:h-[97px] flex fixed top-0 z-10 w-full`}
    >
      {/* Responsive For Laptop & Desktop */}
      <div className="tablet:hidden phone:hidden w-full flex">
        <div className="w-[20%] flex justify-center flex-col items-center">
          <h1 className="ticketflicks_desktop ticketflicks_laptop">
            TicketFlicks
          </h1>
          <p className="mt-[-1.5%] laptop:text-[12px]">First Branch</p>
        </div>
        <div className="w-[74%] flex items-center hide">
          <div className="navbox-desktop navbox-laptop drop-shadow-[0_35px_35px_rgba(60,60,60,0.25)] border-secondary bg-none w-full flex items-center">
            <NavLinks value={true} setClose={(bools) => setOpen(bools)} />
          </div>
        </div>
        <div className="w-[6%] flex items-center justify-start px-5 hide">
          <div className="w-2 h-2 bg-white"></div>
        </div>
      </div>

      {/* Responsive For Tablet & Phone */}
      <div className="px-[5.5%] w-full flex justify-center flex-col gap-5 laptop:hidden desktop:hidden">
        <div className="w-full flex justify-between">
          <TicketIcon className="tablet:w-12 phone:w-6" />
          <h1 className="tablet:text-[36px] font-extrabold phone:text-[24px]">
            TicketFlicks
          </h1>
          <button onClick={() => setOpen(true)}>
            <Bars3Icon className="tablet:w-14 phone:w-7" />
          </button>
        </div>
        <span className="w-full bg-white tablet:h-1 phone:h-[3px]"></span>
      </div>
      <div className={clsx("h-full fixed right-0 px-5 transition-all bg-secondary", {
        "w-0 opacity-0": !open,
        "w-[27%] opacity-100": open
      })}>
        <button onClick={() => setOpen(false)}><XMarkIcon className="w-6 absolute right-3 top-3" /></button>
            <h1 className="tablet:text-[24px] phone:text-[20px] font-bold mt-2">TicketFlicks</h1>
            <p className="w-full bg-white h-1 my-5"></p>
            <NavLinks value={false} setClose={(bools) => setOpen(bools)} />
      </div>
    </div>
  );
};

export default Navbar;
