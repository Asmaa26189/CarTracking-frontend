/* =========================================================
 * NUBA AUTO - Responsive Table
 ========================================================= */

// @mui material components
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import BaseLayout from "layouts/sections/components/BaseLayout";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


// import react 
import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

// NUBA AUTO components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";

const conf = {
  "Content-Type": "application/json",
};

function ResponsiveTable() {
  const apiUrl = process.env.REACT_APP_API_URL;

  // States
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  //const [loading, setLoading] = useState(true);
  //const [error, setError] = useState(null);

  const handleButtonClick = () => {
    navigate("/userform");
  };

  const handleEdit = (user) => {
    navigate(`/userform`, { state: { existingUser: user } });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      fetch(`${apiUrl}/user/${id}`, { method: "DELETE" })
        .then((response) => {
          if (!response.ok) throw new Error("Failed to delete");
          setRows((prev) => prev.filter((row) => row._id !== id));
        })
        .catch((err) => console.error("Delete error:", err));
    }
  };

  useEffect(() => {
    fetch(`${apiUrl}/user/`, { method: "GET", headers: conf })
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        setRows(data);
        //setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        //setError(err.message);
        //setLoading(false);
      });
  }, []);

  const filteredRows = useMemo(
    () =>
      rows.filter(
        (row) =>
          row.name.toLowerCase().includes(searchText.toLowerCase()) ||
          row.email.toLowerCase().includes(searchText.toLowerCase())||
          row.type.toLowerCase().includes(searchText.toLowerCase())
      ),
    [rows, searchText]
  );

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
          { label: "All Users", route: "/users" },
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
            All Users
          </MKTypography>
        </MKBox>

        <MKBox pt={6} px={2}>
          {/* Search Field */}
          <MKBox mb={3}>
            <TextField
              variant="outlined"
              label="Search"
              fullWidth
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </MKBox>

          {/* Table */}
          {filteredRows.length === 0 ? (
            <MKTypography variant="body2">No users found.</MKTypography>
          ) : (
            <TableContainer component={Paper} sx={{ borderRadius: "lg", boxShadow: 2 }}>
              <Table>
                <TableBody>
                  {filteredRows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TableRow key={row._id}>
                        <TableCell>{row.name || ""}</TableCell>
                        <TableCell>{row.email || ""}</TableCell>
                        <TableCell>{row.type || ""}</TableCell>
                        <TableCell>
                        <MKButton onClick={() => handleEdit(row)}><EditIcon color="blue"/></MKButton>
                        <MKButton  onClick={() => handleDelete(row._id)}> <DeleteIcon color="error" /></MKButton>
                          
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          <MKBox display="flex" justifyContent="center" mt={3}>
            <MKButton variant="gradient" color="info" height="20%" onClick={handleButtonClick}>
              Add New User
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
