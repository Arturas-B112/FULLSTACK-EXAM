import { Button, Stack, TextField } from '@mui/material';
import { useState } from 'react';

const LoginForm = ({ loading, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const clearInputs = () => {
    setEmail('');
    setPassword('');
  };

  return (
    <>
      <Stack pt={2} spacing={2} alignItems="center" component="form">
        <Stack width={400} spacing={2}>
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
            onLogin({ email, password });
            clearInputs();
          }}
        >
          Login
        </Button>
      </Stack>
    </>
  );
};

export default LoginForm;
