import { Alert, Button, LinearProgress, Stack, TextField } from '@mui/material';
import PageHeader from '../../components/header/PageHeader';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { addVisitors, deleteVisitors, getVisitors } from '../../api';
import VisitorsTable from './VisitorsTable';
import AddVisitorDialog from './AddVisitorDialog';

const VisitorsPage = () => {
  const navigate = useNavigate();
  const token = Cookies.get('token');

  if (!token) {
    navigate('/');
  }

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const [visitors, setVisitors] = useState([]);
  const [filteredVisitors, setFilteredVisitors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [keyword, setKeyword] = useState('');

  const onAddDialogClose = () => setIsAddDialogOpen(false);

  const fetchVisitors = async (headers) => {
    setIsLoading(true);
    try {
      const { data } = await getVisitors(headers);

      setVisitors(data);
      setFilteredVisitors(data);
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
      const { data } = await addVisitors(
        {
          visitor_fullname: body.name,
          email: body.email,
          dob: body.date,
        },
        headers
      );

      setFilteredVisitors((prev) => [
        ...prev,
        {
          id: data.id,
          visitor_fullname: body.name,
          email: body.email,
          dob: body.date,
          admin_id: data.admin_id,
        },
      ]);

      setVisitors((prev) => [
        ...prev,
        {
          id: data.id,
          visitor_fullname: body.name,
          email: body.email,
          dob: body.date,
          admin_id: data.admin_id,
        },
      ]);

      setIsAddDialogOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteVisitor = async (id, headers) => {
    setIsLoading(true);
    try {
      await deleteVisitors(id, headers);

      setFilteredVisitors((prev) =>
        prev.filter((visitor) => visitor.id !== id)
      );
      setVisitors((prev) => prev.filter((visitor) => visitor.id !== id));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilter = (e) => {
    const keyword = e.target.value;

    if (keyword !== '') {
      const results = filteredVisitors.filter((visitor) =>
        visitor.visitor_fullname.toLowerCase().includes(keyword.toLowerCase())
      );
      setFilteredVisitors(results);
    } else {
      setFilteredVisitors(visitors);
    }
    setKeyword(keyword);
  };

  return (
    <>
      <PageHeader title="Visitors Page">
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
      <Stack my={2} mx="auto" spacing={1}>
        <Button variant="contained" onClick={() => setIsAddDialogOpen(true)}>
          Add new visitor
        </Button>
        <Stack py={2}>
          <TextField
            label="Filter by visitor name"
            type="search"
            value={keyword}
            variant="outlined"
            onChange={handleFilter}
          />
        </Stack>
        {isLoading && <LinearProgress />}
        <VisitorsTable
          visitors={filteredVisitors}
          onDelete={(id) => handleDeleteVisitor(id, headers)}
          onUpdate={(visitor) => {
            navigate(`/visitors/${visitor.id}`, {
              state: {
                visitor,
                headers,
              },
            });
          }}
        />
      </Stack>
      {filteredVisitors.length === 0 && (
        <Stack alignItems="center" mt={2}>
          <Alert severity="error">Add some data!</Alert>
        </Stack>
      )}
      {isAddDialogOpen && (
        <AddVisitorDialog
          loading={isLoading}
          open={isAddDialogOpen}
          onClose={onAddDialogClose}
          onSave={(body) => handleAddVisitor(body, headers)}
        />
      )}
    </>
  );
};

export default VisitorsPage;
