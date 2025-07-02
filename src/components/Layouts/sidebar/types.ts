import { FC } from 'react';

export interface MenuItem {
  title: string;
  path?: string;
  icon: FC;
  submenu?: boolean;
  submenuItems?: SubMenuItem[];
}

export interface SubMenuItem {
  title: string;
  path: string;
} 