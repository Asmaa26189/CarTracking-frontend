import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

// @mui material components
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

// Icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// NUBA AUTO components
import BaseLayout from "layouts/sections/components/BaseLayout";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";
import { jwtDecode }  from "jwt-decode"; 

function ResponsiveTable() {
  const apiUrl = process.env.REACT_APP_API_URL;

  // States
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false); // For the delete dialog
  const [deletingId, setDeletingId] = useState(null); // User ID to delete
  const [token, setToken] = useState(localStorage.getItem("token"));  
  const [userType, setUserType] = useState('Guest');
  const config = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("token")}`, // Send the token from local storage
  }
  const config2 = {
    "Content-Type": "application/json",
  }


  // Fetch users on component load
  useEffect(() => {
    setToken(localStorage.getItem("token"));
    if (token) {
        const decodedToken = jwtDecode(token);
        setUserType(decodedToken.userType);
    }
    fetch(`${apiUrl}/user/`, { method: "GET", headers: config2 })
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => setRows(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  // Filter rows by search text
  const filteredRows = useMemo(
    () =>
      rows.filter(
        (row) =>
          row.name.toLowerCase().includes(searchText.toLowerCase()) ||
          row.email.toLowerCase().includes(searchText.toLowerCase()) ||
          row.type.toLowerCase().includes(searchText.toLowerCase())
      ),
    [rows, searchText]
  );

  // Pagination handlers
  const handlePageChange = (event, newPage) => setPage(newPage);
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Navigation Handlers
  const handleButtonClick = () => navigate("/userform");
  const handleEdit = (user) => navigate(`/userform`, { state: { existingUser: user } });

  // Open and close delete dialog
  const handleOpenDialog = (id) => {
    setDeletingId(id);
    setDialogOpen(true);
  };
  const handleCloseDialog = () => {
    setDeletingId(null);
    setDialogOpen(false);
  };

  // Delete user
  const handleDelete = () => {
    fetch(`${apiUrl}/user/${deletingId}`, { method: "DELETE" ,headers: config})
      .then((response) => {
        if (!response.ok) throw new Error("Failed to delete");
        setRows((prev) => prev.filter((row) => row._id !== deletingId));
      })
      .catch((err) => console.error("Delete error:", err))
      .finally(() => {
        handleCloseDialog();
      });
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
                        {userType === 'Admin' && (
                        <TableCell>
                          <MKButton onClick={() => handleEdit(row)}>
                            <EditIcon color="primary" />
                          </MKButton>
                          <MKButton onClick={() => handleOpenDialog(row._id)}>
                            <DeleteIcon color="error" />
                          </MKButton>
                        </TableCell>)}
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {/* Add User Button */}
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ResponsiveTable;
