import { Stack } from '@mui/material';
import Header from '../../header/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../../footer/Footer';

const PageTemplate = () => {
  return (
    <>
      <Stack>
        <Header />
        <Outlet />
        <Footer />
      </Stack>
    </>
  );
};

export default PageTemplate;
