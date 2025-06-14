import { createTheme } from '@mui/material/styles';

// Define your brand colors
const palette = {
  mode: 'dark', // Crucial: Set the mode to 'dark' for MUI's internal dark theme handling
  primary: {
    main: '#2374E1', // A prominent, slightly muted Facebook blue for primary actions
    light: '#428CD4',
    dark: '#1A5DAF',
    contrastText: '#fff',
  },
  secondary: {
    main: '#8A8D91', // A subdued grey, common for secondary actions or less emphasized elements
    light: '#A0A3A6',
    dark: '#6A6D70',
    contrastText: '#fff', // Or a very light grey if you want more contrast
  },
  error: {
    main: '#F02849', // Facebook's typical red for errors/warnings
    light: '#F3526D',
    dark: '#C8213D',
    contrastText: '#fff',
  },
  warning: {
    main: '#F7B538', // A more yellow/orange for warnings
    light: '#F9C967',
    dark: '#C5912C',
    contrastText: '#000', // Black or very dark grey for contrast on bright warning
  },
  info: {
    main: '#2D88FF', // A brighter blue for info messages, similar to Facebook's link color
    light: '#5AA0FF',
    dark: '#216ACF',
    contrastText: '#fff',
  },
  success: {
    main: '#31A24C', // Facebook's green for success
    light: '#5DBE70',
    dark: '#227236',
    contrastText: '#fff',
  },
  background: {
    default: '#18191A', // The darkest background color, Facebook's main dark background
    paper: '#242526', // Slightly lighter for cards, modals, and elevated surfaces
  },
  text: {
    primary: '#E4E6EB', // Light grey for primary text
    secondary: '#B0B3B8', // Slightly darker grey for secondary text
    disabled: '#8A8D91', // Even darker for disabled text
  },
  action: {
    active: '#B0B3B8', // For icons or interactive elements in their active state
    hover: 'rgba(255, 255, 255, 0.08)', // Light hover effect
    selected: 'rgba(255, 255, 255, 0.16)', // Selected state
    disabled: 'rgba(255, 255, 255, 0.3)',
    disabledBackground: 'rgba(255, 255, 255, 0.12)',
    focus: 'rgba(255, 255, 255, 0.12)',
  },
  divider: 'rgba(255, 255, 255, 0.1)', // A subtle divider color
};

// Create theme
const theme = createTheme({
  palette,
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
    },
    button: {
      textTransform: 'none', // Disable uppercase transform
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8, // Rounded corners
  },
  spacing: 8, // Base spacing unit
  components: {
    // Customize MUI components
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 20px',
          fontSize: '0.95rem',
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: palette.primary.main,
            },
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

export default theme;