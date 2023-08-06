import PageHeader from '../../components/header/PageHeader';
import { Link, useNavigate } from 'react-router-dom';
import RegisterForm from './RegisterForm';
import { useState } from 'react';
import { adminRegister } from '../../api';
import { Button, LinearProgress, Typography } from '@mui/material';

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState();
  const [error, setError] = useState();

  const navigate = useNavigate();

  const handleAdminRegister = async (body) => {
    setIsLoading(true);
    try {
      const response = await adminRegister({
        admin_name: body.name,
        email: body.email,
        password: body.password,
      });
      setError();
      setMessage(response.data.message);
    } catch ({ response }) {
      setMessage();
      setError(response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <PageHeader title="Admin Register Page">
        <Button variant="outlined" onClick={() => navigate('/login')}>
          LOGIN
        </Button>
      </PageHeader>
      {isLoading && <LinearProgress />}
      <RegisterForm
        onRegister={(body) => handleAdminRegister(body)}
        loading={isLoading}
      />
      {message && (
        <Typography textAlign="center" mt={2}>
          {message}
        </Typography>
      )}
      {error && (
        <Typography textAlign="center" mt={2}>
          {error}
        </Typography>
      )}
    </>
  );
};

export default RegisterPage;
