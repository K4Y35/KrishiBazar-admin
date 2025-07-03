"use client";

import Link from 'next/link';
import { ThemeToggleSwitch } from './theme-toggle';
import { UserInfo } from './user-info';
import { Notification } from './notification';
import { MdMenu } from 'react-icons/md';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Header = ({ sidebarOpen, setSidebarOpen }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-40 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        {/* Left side - Mobile menu and logo */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <MdMenu 
              className={`text-black dark:text-white transition-transform duration-200 ${
                sidebarOpen ? 'rotate-90' : ''
              }`}
              size={22}
            />
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}

          <Link className="block flex-shrink-0 lg:hidden" href="/">
            <h1 className="text-xl font-bold text-black dark:text-white">KrishiBazaar</h1>
          </Link>
        </div>

        {/* Right side - Icons and user info */}
        <div className="flex items-center gap-3 2xsm:gap-7 ml-auto">
          <ul className="flex items-center gap-2 2xsm:gap-4">


            {/* <!-- Dark Mode Toggler --> */}
            <li>
              <ThemeToggleSwitch />
            </li>
            {/* <!-- Dark Mode Toggler --> */}
          </ul>

          {/* <!-- User Area --> */}
          <UserInfo />
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
