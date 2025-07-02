'use client';

import React from 'react';
import { DashboardIcon, UsersIcon } from './icons';
import { MenuItem } from './types';

export const menuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    icon: <DashboardIcon />,
    link: '/',
  },
  {
    title: 'Manage Farmers',
    icon: <UsersIcon />,
    submenu: true,
    submenuItems: [
      {
        title: 'Pending Approvals',
        link: '/farmers/pending-approvals',
      },
    ],
  },
]; 