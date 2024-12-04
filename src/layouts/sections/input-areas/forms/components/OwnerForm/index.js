/**
=========================================================
* NUBA AUTO - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
// stc/layouts/sections/input-areas/forms/components/OwnerForm.index.js;
//
import { useState, useEffect } from "react";
import PropTypes from "prop-types"; // Import prop-types

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// import Switch from "@mui/material/Switch";

// NUBA AUTO components
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import MKAlert from "components/MKAlert"; // Import alert component

function OwnerForm({ existingOwner = null, onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    notes: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // For success alert
  const [errorMessage, setErrorMessage] = useState(""); // For error alert

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
  const handleSubmit = async(e) => {
    e.preventDefault();

    const apiUrl = isUpdating
    ? `https://car-tracking-backend.vercel.app/api/owner/${existingOwner.id}` // Update endpoint
    : "https://car-tracking-backend.vercel.app/api/owner"; // Create endpoint

  const method = isUpdating ? "PUT" : "POST"; // Use PUT for updates and POST for creation

  try {
    const response = await fetch(apiUrl, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData), // Send the form data as JSON
    });

    if (!response.ok) {
      throw new Error(`Failed to ${isUpdating ? "update" : "create"} owner`);
    }

    const result = await response.json();
    console.log(`${isUpdating ? "Updated" : "Created"} owner:`, result);
    setSuccessMessage(`Owner ${isUpdating ? "updated" : "created"} successfully!`);
    setErrorMessage(""); // Clear any existing error

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
    <MKBox component="section" py={12}>
      <Container>
        <Grid container item justifyContent="center" xs={10} lg={7} mx="auto" textAlign="center">
        
          <MKTypography variant="h3" mb={1}>
          {isUpdating ?   "Update Owner" : "New Owner"}
          </MKTypography>
        </Grid>
        <Grid container item xs={12} lg={7} sx={{ mx: "auto" }}>
          <MKBox width="100%"  component="form" method="post" autoComplete="off" onSubmit={handleSubmit}>
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
                <MKButton type="submit" variant="gradient" color="dark" fullWidth>
                {isUpdating ? "Update" : "Save"}
                </MKButton>
              </Grid>
            </MKBox>
          </MKBox>
        </Grid>
      </Container>
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
