import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import MKAlert from "components/MKAlert";
import { useLocation, useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";


function OwnerForm({ onSubmitSuccess }) {
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    notes: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // For success alert
  const [errorMessage, setErrorMessage] = useState(""); // For error alert
  // const [isDeleting, setIsDeleting] = useState(false); // To track if the user is trying to delete
  const [dialogOpen, setDialogOpen] = useState(false);
  const location = useLocation();
  const existingOwner = location.state?.existingOwner || null;
  const config = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("token")}`, // Send the token from local storage
  }
  // Populate the form with existingOwner data when in update mode
  useEffect(() => {
    if (existingOwner) {
      setFormData({
        name: existingOwner.name || "",
        phone: existingOwner.phone || "",
        notes: existingOwner.notes || "",
      });
      setIsUpdating(true);
    }
  }, [existingOwner]);


  const handleDeleteClick = () => {
    setDialogOpen(true); // Open the confirmation dialog
  };
  const handleCancelDelete = () => {
    setDialogOpen(false); // Close the dialog without deleting
  };

  const handleConfirmDelete = async () => {
    try {
      if (!existingOwner) {
        throw new Error(`Failed to delete owner`);
      }
      const response = await fetch(`${apiUrl}/owner/${existingOwner._id}`, {
        method: 'DELETE',
        headers: config
      });
      if (!response.ok) {
        throw new Error(`Failed to delete owner`);
      }
      setDialogOpen(false); // Close the dialog after successful deletion
      setSuccessMessage(`Owner Deleted successfully!`);
      setErrorMessage(""); // Clear any existing error
      navigate(`/owners`);
    } catch {
      setDialogOpen(false); // Close the dialog after successful deletion
      setErrorMessage(`Faild to delete owner`);
      setSuccessMessage(""); // Clear any existing error
      navigate(`/owners`);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setErrorMessage(""); // Set error message
    setSuccessMessage(""); // Clear any existing success message
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const api = isUpdating
      ? `${apiUrl}/owner/${existingOwner._id}` // Update endpoint
      : `${apiUrl}/owner`; // Create endpoint

    const method = isUpdating ? "PUT" : "POST"; // Use PUT for updates and POST for creation

    try {
      const response = await fetch(api, {
        method,
        headers: config,
        body: JSON.stringify(formData), // Send the form data as JSON
      });

      if (!response.ok) {
        throw new Error(`Failed to ${isUpdating ? "update" : "create"} owner`);
      }

      const result = await response.json();
      console.log(`${isUpdating ? "Updated" : "Created"} owner:`, result);
      setSuccessMessage(`Owner ${isUpdating ? "updated" : "created"} successfully!`);
      setErrorMessage(""); // Clear any existing error
      navigate(`/owners`);

      if (onSubmitSuccess) onSubmitSuccess(result); // Notify parent of success

      if (!isUpdating) {
        setFormData({ name: "", phone: "", notes: "" }); // Reset form after creating
      }
    } catch (error) {
      console.error(error.message);
      setErrorMessage("An error occurred while submitting the form."); // Set error message
      setSuccessMessage(""); // Clear any existing success message
    }
  };

  return (
    <MKBox component="section" py={6}>
      <Container>
        <Grid container item justifyContent="center" xs={10} lg={7} mx="auto" textAlign="center" >
          <MKTypography variant="h3" mb={1}>
            {isUpdating ? "Update Owner" : "New Owner"}
          </MKTypography>
        </Grid>
        <Grid container item xs={12} lg={7} sx={{ mx: "auto" }}>
          <MKBox width="100%" component="form" method="post" autoComplete="off" onSubmit={handleSubmit}>
            <MKBox p={3}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <MKInput
                    label="name"
                    placeholder="eg. name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <MKInput
                    label="phone"
                    placeholder="eg. 1222222222"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <MKInput
                    label="Notes"
                    placeholder="description "
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    multiline
                    fullWidth
                    rows={6}
                  />
                </Grid>

              </Grid>
              <Grid container item justifyContent="center" xs={12} my={2}>
                {/* Show success alert */}
                {successMessage && (
                  <MKAlert color="success" onClose={() => setSuccessMessage("")}
                  onClick={() => setErrorMessage("")}>
                    {successMessage}
                  </MKAlert>
                )}
                {/* Show error alert */}
                {errorMessage && (
                  <MKAlert color="error" onClose={() => setErrorMessage("")}
                  onClick={() => setErrorMessage("")}>
                    {errorMessage}
                  </MKAlert>
                )}
                <MKButton type="submit" variant="gradient" color="dark" fullWidth>
                  {isUpdating ? "Update" : "Save"}
                </MKButton>
                {/* Delete Button */}
                {existingOwner && (
                  <MKButton
                    variant="outlined"
                    color="error"
                    onClick={handleDeleteClick}
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    Delete Owner
                  </MKButton>
                )}
              </Grid>
            </MKBox>
          </MKBox>
        </Grid>
      </Container>
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
  );
}

// Prop validation
OwnerForm.propTypes = {
  existingOwner: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    phone: PropTypes.string,
    notes: PropTypes.string,
  }),
  onSubmitSuccess: PropTypes.func.isRequired,
};

export default OwnerForm;
