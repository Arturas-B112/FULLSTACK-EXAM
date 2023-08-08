import {
  Button,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
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
      const response = await addVisitors(
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
          id: response.insertId,
          visitor_fullname: body.name,
          email: body.email,
          dob: body.date,
          admin_id: state.admin_id,
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
      const response = await deleteVisitors(id, headers);

      setFilteredVisitors((prev) =>
        prev.filter((visitor) => visitor.id !== id)
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilter = (e) => {
    const keyword = e.target.value;
    setKeyword(keyword);

    if (keyword !== '') {
      const results = visitors.filter((visitor) =>
        visitor.visitor_fullname.toLowerCase().includes(keyword.toLowerCase())
      );
      setFilteredVisitors(results);
    } else {
      setFilteredVisitors(visitors);
    }
  };

  return (
    <>
      <PageHeader title="Visitors Page">
        <Typography>Your admin ID is: {state.admin_id}</Typography>
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
        <VisitorsTable
          visitors={filteredVisitors}
          onDelete={(id) => handleDeleteVisitor(id, headers)}
          onUpdate={(visitor) => {
            navigate(`/visitors/${visitor.id}`, {
              state: {
                visitor,
                headers,
                admin_id: state.admin_id,
              },
            });
          }}
        />
      </Stack>
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
