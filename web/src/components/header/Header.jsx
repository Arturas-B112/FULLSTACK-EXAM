import { Button, Stack, Typography } from '@mui/material';
import icon from '../../assets/party.svg';

const Header = () => {
  return (
    <>
      <Stack
        my={2}
        mx={2}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <img src={icon} width={100}></img>
        <Typography variant="h4"> FEUA5 Afterparty Event</Typography>
        <Button
          variant="outlined"
          color="error"
          onClick={() =>
            window.location.replace(
              'https://codeacademy.lt/?gclid=CjwKCAjw8symBhAqEiwAaTA__G7OvTPTvQkd7UoVxFyDj2SVlpGFd23reFOIMKur8u-_c93CY8BjKxoCBKoQAvD_BwE'
            )
          }
        >
          Join CodeAcademy
        </Button>
      </Stack>
    </>
  );
};

export default Header;
