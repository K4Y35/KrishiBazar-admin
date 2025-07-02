import { MenuItem } from '../types';
import { HomeIcon, FarmersIcon, CalendarIcon, SettingsIcon } from './icons';

export const menuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    path: '/',
    icon: HomeIcon,
  },
  {
    title: 'Manage Farmers',
    icon: FarmersIcon,
    submenu: true,
    submenuItems: [
      {
        title: 'Pending Approvals',
        path: '/farmers/pending-approvals',
      },
    ],
  },
  {
    title: 'Calendar',
    path: '/calendar',
    icon: CalendarIcon,
  },
  {
    title: 'Settings',
    path: '/pages/settings',
    icon: SettingsIcon,
  },
];
