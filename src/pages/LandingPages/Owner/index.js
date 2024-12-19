import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";
import React from "react";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import BaseLayout from "layouts/sections/components/BaseLayout";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MKAlert from "components/MKAlert"; // Import alert component
import MKBox from "components/MKBox";

function ResponsiveTable() {
  const apiUrl = process.env.REACT_APP_API_URL;
  // States
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [successMessage, setSuccessMessage] = useState(""); // For success alert
  const [errorMessage, setErrorMessage] = useState(""); // For error alert
  // const [isDeleting, setIsDeleting] = useState(false); // To track if the user is trying to delete
  const [dialogOpen, setDialogOpen] = useState(false); // To manage the dialog open state
  const [deleteId, setDeleteId] = useState(null); // To store the id of the owner to be deleted

  const fetchData = async () => {
    const api = `${apiUrl}/owner`;
    const response = await fetch(api, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    if (!response.ok) {
      throw new Error(`Failed to get owners`);
    }
    const result = await response.json();
    setRows(result);
  };
  useEffect(() => {

    fetchData();
  }, []);

  const handleButtonClick = () => {
    navigate('/ownerform');  // Replace '/new-page' with the target page's path
  };

  const handleEdit = (owner) => {
    navigate(`/ownerform`, { state: { existingOwner: owner } }); // Redirect to the form with the owner's ID
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setDialogOpen(true); // Open the confirmation dialog
  };
  const handleCancelDelete = () => {
    setDialogOpen(false); // Close the dialog without deleting
  };


  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`${apiUrl}/owner/${deleteId}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
        }
      });
      if (!response.ok) {
        throw new Error(`Failed to delete owner`);
      }
      setSuccessMessage(`Owner Deleted successfully!`);
      setErrorMessage(""); // Clear any existing error
    } catch {
      setErrorMessage(`Faild to delete owner`);
      setSuccessMessage(""); // Clear any existing error
    }
    setDeleteId(null)
    setDialogOpen(false); // Close the dialog after successful deletion
    fetchData();
  };
  // Filter rows based on search text
  const filteredRows = rows.filter(
    (row) =>
      row.name.toLowerCase().includes(searchText.toLowerCase()) ||
      row.phone.toLowerCase().includes(searchText.toLowerCase()) ||
      row.notes.toLowerCase().includes(searchText.toLowerCase())
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
          { label: "All Owners", route: "/owners" },
        ]}
      >
        {/* Show success alert */}

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
            All Owners
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
                    <TableRow key={row._id}>
                      <TableCell>{row.name || ""}</TableCell>
                      <TableCell>{row.phone || ""}</TableCell>
                      <TableCell>{row.notes || ""}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleEdit(row)}>
                          <EditIcon color="primary" />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteClick(row._id)}>
                          <DeleteIcon color="error" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <MKBox display="flex" justifyContent="center" mt={3}>
            <MKButton variant="gradient" color="info" height="20%" onClick={handleButtonClick}>
              Add New Owner
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
          {successMessage && (
            <MKAlert color="success" onClose={() => setSuccessMessage("")}>
              {successMessage}
            </MKAlert>
          )}
          {/* Show error alert */}
          {errorMessage && (
            <MKAlert color="error" onClose={() => setErrorMessage("")}>
              {errorMessage}
            </MKAlert>
          )}
          {/* Confirmation Dialog */}
          <Dialog open={dialogOpen} onClose={handleCancelDelete}>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
              <p>Are you sure you want to delete this owner?</p>
            </DialogContent>
            <DialogActions>
              <MKButton onClick={handleCancelDelete} color="primary">
                Cancel
              </MKButton>
              <MKButton onClick={handleConfirmDelete} color="error">
                Delete
              </MKButton>
            </DialogActions>
          </Dialog>
        </MKBox>
      </BaseLayout>
    </>
  );
}

export default ResponsiveTable;
