import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

const VisitorsTable = ({ visitors, onDelete, onUpdate }) => {
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
              <TableCell colSpan={2} align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visitors.map((visitor) => (
              <TableRow
                key={visitor.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{visitor.visitor_fullname}</TableCell>
                <TableCell>{visitor.email}</TableCell>
                <TableCell>{visitor.dob.substring(0, 10)}</TableCell>
                <TableCell>{visitor.admin_id}</TableCell>
                <TableCell>
                  <Button onClick={() => onDelete(visitor.id)}>Delete</Button>
                </TableCell>
                <TableCell>
                  <Button onClick={() => onUpdate(visitor)}>Update</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default VisitorsTable;
