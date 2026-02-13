
// Fix: Added missing React import to resolve the 'Cannot find namespace React' error on line 11.
import React from 'react';

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  active?: boolean;
}

export interface NavLink {
  label: string;
  href: string;
}