import type { ThemeConfig } from 'antd';
import { theme } from 'antd';

const { darkAlgorithm } = theme;

export const darkTheme: ThemeConfig = {
  token: {
    colorPrimary: '#4f46e5',
    colorBgBase: '#111827',
  },
  algorithm: [darkAlgorithm],
};

export const lightTheme: ThemeConfig = {
  token: {
    colorPrimary: '#4f46e5',
  },
};
