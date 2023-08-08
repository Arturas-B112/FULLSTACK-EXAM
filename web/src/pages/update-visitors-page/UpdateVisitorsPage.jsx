import { useLocation, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/header/PageHeader';
import { Button, LinearProgress, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import UpdateVisitorsForm from './UpdateVisitorForm';
import { updateVisitors } from '../../api';
import { useState } from 'react';

const UpdateVisitorsPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateVisitor = async (id, body, headers) => {
    setIsLoading(true);
    try {
      const response = await updateVisitors(
        id,
        {
          visitor_fullname: body.name,
          email: body.email,
          dob: body.date,
        },
        headers
      );

      navigate('/visitors', {
        state: {
          admin_id: state.admin_id,
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <PageHeader
        title={`Currently updating ${state.visitor.visitor_fullname}`}
      >
        <Typography>Your admin ID is: {state.admin_id}</Typography>
        <Button
          variant="outlined"
          onClick={() => {
            Cookies.remove('token');
            navigate('/', {
              state: {
                admin_id: state.admin_id,
              },
            });
          }}
        >
          LOGOUT
        </Button>
      </PageHeader>
      <UpdateVisitorsForm
        visitor={state.visitor}
        onUpdate={(body) =>
          handleUpdateVisitor(state.visitor.id, body, state.headers)
        }
      />
    </>
  );
};

export default UpdateVisitorsPage;
