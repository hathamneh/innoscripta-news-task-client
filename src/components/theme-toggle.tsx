'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import { IconDeviceLaptop, IconMoon, IconSun } from '@tabler/icons-react';
import Dropdown from '@/components/Dropdown';
import { DropdownButton } from '@/components/DropdownLink';

const ThemeToggle = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const switchTheme = () => {
    // three-way switch
    if (theme === 'dark') {
      setTheme('light');
    } else if (theme === 'light') {
      setTheme('system');
    } else {
      setTheme('dark');
    }
  };

  const trigger = (
    <button className="transition text-slate-700 dark:text-slate-300 rounded-full w-6 h-6 flex items-center justify-center">
      {currentTheme == 'light' && <IconSun className="w-4 block" />}
      {currentTheme == 'dark' && <IconMoon className="w-4 block" />}
    </button>
  );

  return mounted ? (
    <Dropdown trigger={trigger}>
      <DropdownButton
        isActive={theme === 'light'}
        onClick={() => setTheme('light')}>
        <IconSun className="w-4" />
        Light
      </DropdownButton>
      <DropdownButton
        isActive={theme === 'dark'}
        onClick={() => setTheme('dark')}>
        <IconMoon className="w-4" />
        Dark
      </DropdownButton>
      <DropdownButton
        isActive={theme === 'system'}
        onClick={() => setTheme('system')}>
        <IconDeviceLaptop className="w-4" />
        System
      </DropdownButton>
    </Dropdown>
  ) : null;
};

export default ThemeToggle;
