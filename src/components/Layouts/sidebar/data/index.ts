import { MenuItem } from '../types';
import { HomeIcon, FarmersIcon } from './icons';

export const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    path: "/",
    icon: HomeIcon,
  },
  {
    title: "Manage Farmers",
    icon: FarmersIcon,
    submenu: true,
    submenuItems: [
      {
        title: "Pending Approvals",
        path: "/farmers/pending-approvals",
      },
    ],
  },
  {
    title: "Manage Investors",
    icon: FarmersIcon,
    submenu: true,
    submenuItems: [
      {
        title: "Pending Approvals",
        path: "/investors/pending-approvals",
      },
    ],
  },
];
