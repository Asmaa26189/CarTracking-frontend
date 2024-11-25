/* =========================================================
 * NUBA AUTO - Responsive Table
 ========================================================= */

// @mui material components
// import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";

// import react 
import React from "react";
import { useNavigate } from 'react-router-dom';

// NUBA AUTO examples
// import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import BaseLayout from "layouts/sections/components/BaseLayout";
// import DefaultFooter from "examples/Footers/DefaultFooter";

// Routes
// import routes from "routes";
// import footerRoutes from "footer.routes";

// NUBA AUTO components
import MKBox from "components/MKBox";
// import MKTypography from "components/MKTypography";

// Sample Data
const rows = [
  { id: 1, name: "John Doe", age: 28, department: "HR" },
  { id: 2, name: "Jane Smith", age: 34, department: "Engineering" },
  { id: 3, name: "Alice Johnson", age: 29, department: "Marketing" },
  { id: 4, name: "Bob Brown", age: 41, department: "Sales" },
  { id: 5, name: "Tom Green", age: 22, department: "Design" },
];

function ResponsiveTable() {
  // States
  const navigate = useNavigate();
  const [searchText, setSearchText] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleButtonClick = () => {
    navigate('/trackingform');  // Replace '/new-page' with the target page's path
  };

  // Filter rows based on search text
  const filteredRows = rows.filter(
    (row) =>
      row.name.toLowerCase().includes(searchText.toLowerCase()) ||
      row.department.toLowerCase().includes(searchText.toLowerCase())
  );

  // Pagination Handlers
  const handlePageChange = (event, newPage) => setPage(newPage);
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
    <BaseLayout
          breadcrumb={[
            { label: "main", route: "/presention" },
            { label: "All Tracking", route: "/tracking" },
          ]}
        >
        <MKBox
        variant="gradient"
        bgColor="info"
        coloredShadow="info"
        borderRadius="lg"
        p={2}
        mx={2}
        mt={-3}
        >
            <MKTypography variant="h3" color="white">
                All Tracking
            </MKTypography>
        </MKBox>
           
            <MKBox pt={6} px={2}>
            {/* Search Field */}                
            <MKBox mb={3} >
                <TextField
                variant="outlined"
                label="Search"
                fullWidth
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                />
            </MKBox>
            
            {/* Table */}
            <TableContainer component={Paper} sx={{ borderRadius: "lg", boxShadow: 2 }}>
                <Table>
                <TableBody>
                    {filteredRows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                        <TableRow key={row.id}>
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.age}</TableCell>
                        <TableCell>{row.department}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
            <MKBox display="flex" justifyContent="center" mt={3}>
            <MKButton variant="gradient" color="info" height="20%"  onClick={handleButtonClick}>
                    Add New
                </MKButton>
            </MKBox>

            {/* Pagination */}
            <MKBox display="flex" justifyContent="center" mt={3}>
                <TablePagination
                component="div"
                count={filteredRows.length}
                page={page}
                onPageChange={handlePageChange}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleRowsPerPageChange}
                rowsPerPageOptions={[5, 10, 25]}
                />
            </MKBox>
        </MKBox>
      </BaseLayout>
    </>
  );
}

export default ResponsiveTable;
