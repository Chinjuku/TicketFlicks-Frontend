"use client";
import "@/styles/navbar.css";
import NavLinks from "@/components/Home/nav-links";
import { TicketIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState, useContext, FormEvent } from "react";
import clsx from "clsx";
import { useUser } from "@/context/userContext";
import { FaCircleUser } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { themeContext } from "@/context/themeContext";
import { logout } from "@/lib/auth";

const Navbar = () => {
  const { user } = useUser();
  const [open, setOpen] = useState<boolean>(false);
  const { theme } = useContext(themeContext);

  return (
    <div
      className={`bg-gradient-to-b from-black from-30% via-primary via-50% to-black desktop:h-[196px] laptop:h-[140px] tablet:h-[150px] phone:h-[97px] flex fixed top-0 z-[1000] w-full`}
    >
      {/* Responsive For Laptop & Desktop */}
      <div className="tablet:hidden phone:hidden w-full flex">
        <div className="w-[20%] flex justify-center flex-col items-center">
          <h1 className="ticketflicks_desktop ticketflicks_laptop">
            TicketFlicks
          </h1>
          <p className="mt-[-1.5%] laptop:text-[12px]">First Branch</p>
        </div>
        <div className="w-[66%] flex items-center hide">
          <div className="navbox-desktop navbox-laptop drop-shadow-[0_35px_35px_rgba(60,60,60,0.25)] border-secondary bg-none w-full flex items-center">
            <NavLinks value={true} setClose={(bools) => setOpen(bools)} />
          </div>
        </div>
        <div className="w-[14%] flex items-center justify-center px-5">
          {user ? (
            <>
              <Dropdown className={`${theme} text-white`}>
                <DropdownTrigger>
                  <Button className="flex gap-2 items-center bg-transparent desktop:text-[22px] laptop:text-[18px]">
                    <FaCircleUser className="w-7 h-7" />
                    {user.name
                      ? user.name
                      : user.email.split("@")[0].substring(0, 6) + "..."}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem key="profile">
                    <Link href="/profile">
                      <Button className="w-full h-full bg-transparent desktop:text-[18px]">
                        Profile
                      </Button>
                    </Link>
                  </DropdownItem>
                  <DropdownItem
                    key="dashboard"
                    className={clsx("block", {
                      hidden: !user.isAdmin,
                    })}
                  >
                    <Link
                      href="/dashboard"
                      className="w-full h-full desktop:text-[18px]"
                    >
                      Dashboard
                    </Link>
                  </DropdownItem>
                  <DropdownItem
                    key="logout"
                    className="text-danger"
                    color="danger"
                  >
                    <form action={logout}>
                      <button
                        type="submit"
                        className="w-full h-full desktop:text-[18px]"
                      >
                        Logout
                      </button>
                    </form>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </>
          ) : (
            <Link
              href="/login"
              className="hover:scale-[1.1] transition-all flex gap-2 items-center"
            >
              <FaUser className="w-4 h-4" />
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Responsive For Tablet & Phone */}
      <div className="px-[5.5%] w-full flex justify-center flex-col gap-5 phone:gap-3 laptop:hidden desktop:hidden">
        <div className="w-full flex justify-between">
          {user ? (
            <>
              <Dropdown className={`${theme} text-white`}>
                <DropdownTrigger>
                  <Button className="flex gap-2 items-center bg-transparent">
                    <FaCircleUser className="w-7 h-7" />
                    {user.name
                      ? user.name
                      : user.email.split("@")[0].substring(0, 6) + "..."}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem key="profile">
                    <Link href="/profile">
                      <Button className="w-full h-full bg-transparent desktop:text-[18px]">
                        Profile
                      </Button>
                    </Link>
                  </DropdownItem>
                  <DropdownItem
                    key="dashboard"
                    className={clsx("block", {
                      hidden: !user.isAdmin,
                    })}
                  >
                    <Link
                      href="/dashboard"
                      className="w-full h-full desktop:text-[18px]"
                    >
                      Dashboard
                    </Link>
                  </DropdownItem>
                  <DropdownItem
                    key="logout"
                    className="text-danger"
                    color="danger"
                  >
                    <form action={logout}>
                      <button type="submit" className="w-full">
                        Logout
                      </button>
                    </form>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </>
          ) : (
            <Link
              href="/login"
              className="hover:scale-[1.1] transition-all flex gap-2 items-center"
            >
              <FaUser className="w-4 h-4" />
              Login
            </Link>
          )}
          <h1 className="tablet:text-[36px] font-extrabold phone:text-[24px]">
            TicketFlicks
          </h1>
          <button onClick={() => setOpen(true)}>
            <Bars3Icon className="tablet:w-14 phone:w-7" />
          </button>
        </div>
        <span className="w-full bg-white tablet:h-1 phone:h-[3px]"></span>
      </div>
      <div
        className={clsx(
          "h-full fixed right-0 px-5 transition-all bg-secondary",
          {
            "w-0 opacity-0": !open,
            "tablet:w-[27%] phone:w-[35%] opacity-100": open,
          }
        )}
      >
        <button onClick={() => setOpen(false)}>
          <XMarkIcon className="w-6 absolute right-3 top-3" />
        </button>
        <h1 className="tablet:text-[24px] phone:text-[18px] font-bold mt-2">
          TicketFlicks
        </h1>
        <p className="w-full bg-white h-1 phone:h-[3px] my-5 phone:my-3"></p>
        <NavLinks value={false} setClose={(bools) => setOpen(bools)} />
      </div>
    </div>
  );
};

export default Navbar;
