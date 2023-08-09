import { RouterProvider } from 'react-router-dom';
import { routes } from './routes';
import './App.css';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { createTheme, ThemeProvider } from '@mui/material';

const App = () => {
  const theme = createTheme({
    typography: {
      fontFamily: ['"Bebas Neue"', 'sans-serif'].join(','),
      fontSize: 20,
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <RouterProvider router={routes} />
        </LocalizationProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
