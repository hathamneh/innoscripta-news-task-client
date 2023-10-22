'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import { IconDeviceLaptop, IconMoon, IconSun } from '@tabler/icons-react';
import { Button, Dropdown } from 'antd';

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

  const items = [
    { key: 'light', label: 'Light', icon: <IconSun className="w-4" /> },
    { key: 'dark', label: 'Dark', icon: <IconMoon className="w-4" /> },
    {
      key: 'system',
      label: 'System',
      icon: <IconDeviceLaptop className="w-4" />,
    },
  ];

  return mounted ? (
    <Dropdown
      menu={{ items, onClick: ({ key }) => setTheme(key), activeKey: theme }}
      trigger={['click']}>
      <Button
        icon={
          currentTheme == 'light' ? (
            <IconSun className="w-4 block" />
          ) : (
            <IconMoon className="w-4 block" />
          )
        }
      />
    </Dropdown>
  ) : null;
};

export default ThemeToggle;
