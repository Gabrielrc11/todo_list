import React, { useState, useMemo, useEffect } from 'react';
import { CssBaseline, ThemeProvider, createTheme, useMediaQuery } from '@mui/material';
import TodoList from './components/TodoList';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('theme-mode');
    return savedMode || (prefersDarkMode ? 'dark' : 'light');
  });

  useEffect(() => {
    localStorage.setItem('theme-mode', mode);
  }, [mode]);

  // Atualiza o tema quando a preferência do sistema mudar
  useEffect(() => {
    const savedMode = localStorage.getItem('theme-mode');
    if (!savedMode) {
      setMode(prefersDarkMode ? 'dark' : 'light');
    }
  }, [prefersDarkMode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
                primary: {
                  main: '#2196f3',
                  light: '#64b5f6',
                  dark: '#1976d2',
                },
                secondary: {
                  main: '#f50057',
                  light: '#ff4081',
                  dark: '#c51162',
                },
                error: {
                  main: '#f44336',
                  light: '#e57373',
                  dark: '#d32f2f',
                },
                info: {
                  main: '#29b6f6',
                  light: '#4fc3f7',
                  dark: '#0288d1',
                },
                background: {
                  default: '#f5f5f5',
                  paper: '#ffffff',
                },
              }
            : {
                primary: {
                  main: '#90caf9',
                  light: '#e3f2fd',
                  dark: '#42a5f5',
                },
                secondary: {
                  main: '#f48fb1',
                  light: '#fce4ec',
                  dark: '#f06292',
                },
                error: {
                  main: '#ef5350',
                  light: '#e57373',
                  dark: '#d32f2f',
                },
                info: {
                  main: '#29b6f6',
                  light: '#4fc3f7',
                  dark: '#0288d1',
                },
                background: {
                  default: '#121212',
                  paper: '#1e1e1e',
                },
              }),
        },
        shape: {
          borderRadius: 8,
        },
        typography: {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          h4: {
            fontWeight: 600,
          },
          button: {
            textTransform: 'none',
            fontWeight: 500,
          },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 8,
                padding: '8px 16px',
              },
              contained: {
                boxShadow: '0 2px 4px 0 rgba(0,0,0,0.1)',
                '&:hover': {
                  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.1)',
                },
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                boxShadow: '0 2px 4px 0 rgba(0,0,0,0.05)',
              },
            },
          },
          MuiTextField: {
            styleOverrides: {
              root: {
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(0, 0, 0, 0.15)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(0, 0, 0, 0.25)',
                  },
                },
              },
            },
          },
        },
      }),
    [mode]
  );

  const handleToggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('theme-mode', newMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TodoList onToggleTheme={handleToggleTheme} isDarkMode={mode === 'dark'} />
    </ThemeProvider>
  );
}

export default App;
