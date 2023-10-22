import React, { PropsWithChildren } from 'react';
import { ThemeProvider, useTheme } from 'next-themes';
import { darkTheme, lightTheme } from '@/styles/themeConfig';
import { ConfigProvider } from 'antd';

const AntdConfigProvider = ({ children }: PropsWithChildren) => {
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <ConfigProvider theme={currentTheme === 'dark' ? darkTheme : lightTheme}>
      {children}
    </ConfigProvider>
  );
};

export const StyleProviders = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider attribute="class">
      <AntdConfigProvider>{children}</AntdConfigProvider>
    </ThemeProvider>
  );
};
