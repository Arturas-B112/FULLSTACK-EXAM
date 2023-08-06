import { Stack, Typography } from '@mui/material';

const PageHeader = ({ title, children }) => {
  return (
    <>
      <Stack direction="row" justifyContent="space-between" mx={2}>
        <Typography variant="h5">{title}</Typography>
        <Stack spacing={1} direction="row" alignItems="center">
          {children}
        </Stack>
      </Stack>
    </>
  );
};

export default PageHeader;
