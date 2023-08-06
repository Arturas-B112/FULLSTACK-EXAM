import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useState } from 'react';

const AddVisitorDialog = ({ open, onClose, onSave, loading }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState(new Date());

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      fullWidth
      onClose={!loading ? onClose : undefined}
    >
      <DialogTitle>Add new visitor</DialogTitle>
      <DialogContent>
        <Stack pt={2} spacing={2}>
          <TextField
            fullWidth
            label="Name"
            value={name}
            disabled={loading}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            disabled={loading}
            onChange={(e) => setEmail(e.target.value)}
          />
          <DatePicker
            label="Date of birth"
            value={date}
            disabled={loading}
            onChange={(value) => setDate(value)}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          disabled={loading}
          onClick={!loading ? onClose : undefined}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          disabled={loading}
          onClick={() =>
            onSave({ name, date: date.toISOString().substring(0, 10), email })
          }
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddVisitorDialog;
