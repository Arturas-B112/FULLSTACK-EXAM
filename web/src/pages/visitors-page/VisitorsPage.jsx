import { Button, LinearProgress, Stack, Typography } from '@mui/material';
import PageHeader from '../../components/header/PageHeader';
import Cookies from 'js-cookie';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { addVisitors, deleteVisitors, getVisitors } from '../../api';
import VisitorsTable from './VisitorsTable';
import AddVisitorDialog from './AddVisitorDialog';

const VisitorsPage = () => {
  const navigate = useNavigate();
  const token = Cookies.get('token');
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const { state } = useLocation();

  const [visitors, setVisitors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onDialogClose = () => setIsDialogOpen(false);

  const fetchVisitors = async (headers) => {
    setIsLoading(true);
    try {
      const { data } = await getVisitors(headers);

      setVisitors(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVisitors(headers);
  }, []);

  const handleAddVisitor = async (body, headers) => {
    try {
      const response = await addVisitors(
        {
          visitor_fullname: body.name,
          email: body.email,
          dob: body.date,
        },
        headers
      );

      setVisitors((prev) => [
        ...prev,
        {
          id: response.insertId,
          visitor_fullname: body.name,
          email: body.email,
          dob: body.date,
          admin_id: state.id,
        },
      ]);

      setIsDialogOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteVisitor = async (id, headers) => {
    setIsLoading(true);
    try {
      await deleteVisitors(id, headers);

      setVisitors((prev) => prev.filter((visitor) => visitor.id !== id));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <PageHeader title="Visitors Page">
        <Typography>Your Admin ID is: {state.id}</Typography>
        <Button
          variant="outlined"
          onClick={() => {
            Cookies.remove('token');
            navigate('/');
          }}
        >
          LOGOUT
        </Button>
      </PageHeader>
      {isLoading && <LinearProgress />}
      <Stack my={2} mx="auto" spacing={1}>
        <Button variant="contained" onClick={() => setIsDialogOpen(true)}>
          Add new visitor
        </Button>
        <VisitorsTable
          visitors={visitors}
          onDelete={(id) => handleDeleteVisitor(id, headers)}
        />
      </Stack>
      {isDialogOpen && (
        <AddVisitorDialog
          loading={isLoading}
          open={isDialogOpen}
          onClose={onDialogClose}
          onSave={(body) => handleAddVisitor(body, headers)}
        />
      )}
    </>
  );
};

export default VisitorsPage;
