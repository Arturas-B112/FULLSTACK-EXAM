import { Alert, Button, LinearProgress, Stack } from '@mui/material';
import PageHeader from '../../components/header/PageHeader';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import { useState } from 'react';
import { adminLogin } from '../../api';
import Cookies from 'js-cookie';

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const navigate = useNavigate();

  const handleAdminLogin = async (body) => {
    setIsLoading(true);
    try {
      const { data } = await adminLogin({
        email: body.email,
        password: body.password,
      });

      Cookies.set('token', data.token);
      navigate('/visitors');
    } catch ({ response }) {
      setError(response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <PageHeader title="Admin Login Page">
        <Button variant="outlined" onClick={() => navigate('/')}>
          REGISTER
        </Button>
      </PageHeader>
      {isLoading && <LinearProgress />}
      <LoginForm
        onLogin={(body) => handleAdminLogin(body)}
        loading={isLoading}
      />
      {error && (
        <Stack alignItems="center" mt={2}>
          <Alert severity="error">{error}</Alert>
        </Stack>
      )}
    </>
  );
};

export default LoginPage;
