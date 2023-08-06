import { Button } from '@mui/material';
import PageHeader from '../../components/header/PageHeader';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <PageHeader title="Admin Login Page">
        <Button variant="outlined" onClick={() => navigate('/')}>
          REGISTER
        </Button>
      </PageHeader>
    </>
  );
};

export default LoginPage;
