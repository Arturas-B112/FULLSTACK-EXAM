import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

const VisitorsTable = ({ visitors }) => {
  return (
    <>
      <TableContainer component={Paper} sx={{ maxWidth: 950 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Date Of Birth</TableCell>
              <TableCell>Admin ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visitors.map((visitor) => (
              <>
                <TableRow
                  key={visitor.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {visitor.visitor_fullname}
                  </TableCell>
                  <TableCell>{visitor.email}</TableCell>
                  <TableCell>{visitor.dob.substring(0, 10)}</TableCell>
                  <TableCell>{visitor.admin_id}</TableCell>
                  <TableCell>
                    <Button>Delete</Button>
                  </TableCell>
                  <TableCell>
                    <Button>Update</Button>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default VisitorsTable;
