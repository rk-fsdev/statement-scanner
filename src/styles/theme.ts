import { theme } from '@chakra-ui/core';

export default {
  ...theme,
  colors: {
    ...theme.colors,
    background: '#f7f7fa',
    green: {
      ...theme.colors.green,
      500: '#018273',
      600: '#2e8d7e',
      800: '#168c7f',
    },
    gray: {
      ...theme.colors.gray,
      50: '#f7f7fa',
      100: '#feffff',
      200: '#efefef',
      250: '#d2d2d2',
      300: '#c5c5c5',
      400: '#d2d2d2',
      600: '#777777',
      700: '#7c7c7c',
      800: '#1e1e1e',
    },
    customGray: {
      0: '#ffffff',
      5: '#f1f1f1',
      10: '#e9edf3',
      20: '#e9e9e9',
      50: '#dddddd',
      100: '#c0c0c4',
      300: '#a0a0a5',
      400: '#aec2d7',
      600: '#979797',
      700: '#808189',
      800: '#77869e',
      850: '#6d7298',
      900: '#4c4d52',
    },
    customGreen: {
      300: '#252a3d',
      500: '#001f56',
    },
  },
  fontSizes: {
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '20px',
    xl: '24px',
    '2xl': '28px',
    '3xl': '32px',
    '4xl': '36px',
    '5xl': '40px',
    '6xl': '44px',
  },
  height: {
    header: {
      xs: 80,
    },
    searchInput: {
      xs: 50,
    },
    navbar: {
      xs: 70,
    },
    home: {
      xs: 'calc(100% - 80px - 70px)', // header height = 80px, navbar height = 70px
    },
  },
  padding: {
    block: {
      xs: '10px 20px',
    },
  },
};
