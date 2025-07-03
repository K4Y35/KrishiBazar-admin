"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SidebarLinkGroup from './sidebar-link-group';
import { menuItems } from './data';
import { MenuItem } from "./types";
import { MdKeyboardArrowDown, MdClose } from 'react-icons/md';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  let storedSidebarExpanded = 'true';
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== 'Escape') return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`dark:bg-boxdark fixed left-0 top-0 z-50 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <Link href="/">
          <h1 className="text-2xl font-bold text-white">Krishi Bazaar</h1>
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <MdClose className="fill-current" size={20} />
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="px-4 py-4 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Items --> */}
              {menuItems.map((menuItem: MenuItem, key: number) => {
                const Icon = menuItem.icon;
                const isActive = menuItem.submenu
                  ? menuItem.submenuItems?.some(
                      (item) => pathname === item.path,
                    ) || false
                  : pathname === menuItem.path;

                return (
                  <SidebarLinkGroup activeCondition={isActive} key={key}>
                    {(handleClick, open) => {
                      return (
                        <React.Fragment>
                          {menuItem.submenu ? (
                            <>
                              <Link
                                href="#"
                                className={`text-bodydark1 hover:bg-graydark dark:hover:bg-meta-4 group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out ${
                                  isActive && "bg-graydark dark:bg-meta-4"
                                }`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleClick();
                                }}
                              >
                                <Icon className="fill-current" size={20} />
                                {menuItem.title}
                                <MdKeyboardArrowDown
                                  className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current transition-transform duration-200 ${
                                    open && "rotate-180"
                                  }`}
                                  size={20}
                                />
                              </Link>
                              <div
                                className={`translate transform overflow-hidden ${!open && "hidden"}`}
                              >
                                <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                                  {menuItem.submenuItems?.map(
                                    (submenuItem, index) => (
                                      <li key={index}>
                                        <Link
                                          href={submenuItem.path}
                                          className={`text-bodydark2 group relative flex items-center gap-2.5 rounded-md px-4 font-medium duration-300 ease-in-out hover:text-white ${
                                            pathname === submenuItem.path
                                              ? "!text-white"
                                              : ""
                                          }`}
                                        >
                                          {submenuItem.title}
                                        </Link>
                                      </li>
                                    ),
                                  )}
                                </ul>
                              </div>
                            </>
                          ) : (
                            <Link
                              href={menuItem.path || "#"}
                              className={`text-bodydark1 hover:bg-graydark dark:hover:bg-meta-4 group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out ${
                                pathname === menuItem.path &&
                                "bg-graydark dark:bg-meta-4"
                              }`}
                            >
                              <Icon className="fill-current" size={20} />
                              {menuItem.title}
                            </Link>
                          )}
                        </React.Fragment>
                      );
                    }}
                  </SidebarLinkGroup>
                );
              })}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
