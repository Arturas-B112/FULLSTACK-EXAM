import { RouterProvider } from 'react-router-dom';
import { routes } from './routes';
import './App.css';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const App = () => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <RouterProvider router={routes} />
      </LocalizationProvider>
    </>
  );
};

export default App;
