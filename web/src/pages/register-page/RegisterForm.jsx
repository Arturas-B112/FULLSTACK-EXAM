import { Button, Stack, TextField } from '@mui/material';
import { useState } from 'react';

const RegisterForm = ({ onRegister, loading }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const clearInputs = () => {
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <>
      <Stack pt={2} spacing={2} alignItems="center" component="form">
        <Stack width={400} spacing={2}>
          <TextField
            label="Name"
            variant="standard"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></TextField>
          <TextField
            label="Email"
            type="email"
            variant="standard"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></TextField>
          <TextField
            label="Password"
            type="password"
            variant="standard"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></TextField>
        </Stack>
        <Button
          variant="outlined"
          disabled={loading}
          onClick={() => {
            onRegister({ name, email, password });
            clearInputs();
          }}
        >
          Register
        </Button>
      </Stack>
    </>
  );
};

export default RegisterForm;
