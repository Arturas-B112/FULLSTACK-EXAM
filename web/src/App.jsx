import { RouterProvider } from 'react-router-dom';
import { routes } from './routes';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {
  createTheme,
  CssBaseline,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material';

const App = () => {
  let theme = createTheme({
    palette: {
      background: {
        default: '#a8a8a8',
      },
    },
    typography: {
      fontFamily: ['"Bebas Neue"', 'sans-serif'].join(','),
      fontSize: 20,
    },
  });

  theme = responsiveFontSizes(theme);

  return (
    <>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CssBaseline />
          <RouterProvider router={routes} />
        </LocalizationProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
