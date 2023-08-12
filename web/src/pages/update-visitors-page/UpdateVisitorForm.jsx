import { Button, Stack, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const updateVisitorsForm = ({ visitor, onUpdate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState(new Date());

  const navigate = useNavigate();

  useEffect(() => {
    setName(visitor.visitor_fullname);
    setEmail(visitor.email);
    setDate(new Date());
  }, []);

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
          <DatePicker
            label="Date of birth"
            value={Date.parse(visitor.dob)}
            onChange={(value) => setDate(value)}
          />
        </Stack>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" onClick={() => navigate(-1)}>
            Go back
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              onUpdate({
                name,
                date: date.toISOString().substring(0, 10),
                email,
              });
            }}
          >
            Update
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default updateVisitorsForm;
