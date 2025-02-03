import { useState, useEffect, useRef } from "react";
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
import InputAdornment from "@mui/material/InputAdornment";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";

function TrackingForm({ onSubmitSuccess }) {
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    notes: "",
    carId: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // For success alert
  const [errorMessage, setErrorMessage] = useState(""); // For error alert
  // const [isDeleting, setIsDeleting] = useState(false); // To track if the user is trying to delete
  const [dialogOpen, setDialogOpen] = useState(false);
  const [cars, setCars] = useState([]);
  const location = useLocation();
  const existingTracking = location.state?.existingTracking || null;
  const [ownerName, setOwnerName] = useState(existingTracking?.carId.owner || ""); // New state for owner name
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [selectedValue, setSelectedValue] = useState(""); // Selected value state
  const [isFocused, setIsFocused] = useState(false); // Manage focus state
  const inputRef = useRef(null); // Ref for the input field
  const listRef = useRef(null); // Ref for the list

  // Populate the form with existingTracking data when in update mode
  useEffect(() => {
    if (existingTracking) {
      setSelectedValue(existingTracking.carId.code);
      setFormData({
        notes: existingTracking.notes || "",
        carId: existingTracking.carId._id || "",
      });
      setIsUpdating(true);
    }
  }, [existingTracking]);


  const handleDeleteClick = () => {
    setDialogOpen(true); // Open the confirmation dialog
  };
  const handleCancelDelete = () => {
    setDialogOpen(false); // Close the dialog without deleting
  };

  const handleConfirmDelete = async () => {
    try {
      if (!existingTracking) {
        throw new Error(`Failed to delete car`);
      }
      const response = await fetch(`${apiUrl}/tracking/${existingTracking._id}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
        }
      });
      if (!response.ok) {
        throw new Error(`Failed to delete car`);
      }
      setDialogOpen(false); // Close the dialog after successful deletion
      setSuccessMessage(`Car Deleted successfully!`);
      setErrorMessage(""); // Clear any existing error
      navigate(`/trackings`);
    } catch {
      setDialogOpen(false); // Close the dialog after successful deletion
      setErrorMessage(`Faild to delete tracking`);
      setSuccessMessage(""); // Clear any existing error
      navigate(`/trackings`);
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
      ? `${apiUrl}/tracking/${existingTracking._id}` // Update endpoint
      : `${apiUrl}/tracking`; // Create endpoint

    const method = isUpdating ? "PUT" : "POST"; // Use PUT for updates and POST for creation

    try {
      const response = await fetch(api, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send the form data as JSON
      });

      if (!response.ok) {
        throw new Error(`Failed to ${isUpdating ? "update" : "create"} car`);
      }

      const result = await response.json();
      console.log(`${isUpdating ? "Updated" : "Created"} tracking:`, result);
      setSuccessMessage(`Car ${isUpdating ? "updated" : "created"} successfully!`);
      setErrorMessage(""); // Clear any existing error
      navigate(`/trackings`);

      if (onSubmitSuccess) onSubmitSuccess(result); // Notify parent of success

      if (!isUpdating) {
        setFormData({ notes: "", carId: "" }); // Reset form after creating
      }
    } catch (error) {
      console.error(error.message);
      setErrorMessage("An error occurred while submitting the form."); // Set error message
      setSuccessMessage(""); // Clear any existing success message
    }
  };



  const fetchCars = async () => {
    const api = `${apiUrl}/car`;
    try {
      const response = await fetch(api, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });
      if (!response.ok) {
        throw new Error(`Failed to get tracking`);
      }
      const result = await response.json();
      setCars(result.map((car) => ({ id: car._id, code: car.code, owner: car.ownerId.name })));
    } catch (error) {
      console.error("Error fetching cars:", error.message);
      setErrorMessage("Failed to fetch cars.");
    }
  };

  useEffect(() => {

    fetchCars();
  }, []);
  // Filter the data based on the search query
  const filteredData = cars.filter((car) =>
    car ? car.code.toLowerCase().includes(searchQuery.toLowerCase()) : ""
  );
  console.log(selectedValue);

  // Handle change in search input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSelectItem = (car) => {
    setSelectedValue(car.code);
    setFormData((prev) => ({ ...prev, carId: car.id }));
    setOwnerName(car.owner || "");
    setSearchQuery(car.code);
    setIsFocused(false);
  };

  // Handle focus event (show the dropdown)
  const handleFocus = () => {
    setIsFocused(true); // Show dropdown when input is focused
  };

  // Handle blur event (hide the dropdown after leaving the input)
  const handleBlur = (event) => {
    // Use setTimeout to ensure the click event on list items is captured first
    setTimeout(() => {
      if (!listRef.current || !listRef.current.contains(event.relatedTarget)) {
        setIsFocused(false); // Hide dropdown when focus is lost outside the input and list
      }
    }, 100);
  };

  // Prevent blur event from hiding the dropdown when clicking on list items
  const handleMouseDownOnList = (event) => {
    event.preventDefault(); // Prevent the onBlur from being triggered when clicking list items
  };

  return (
    <MKBox component="section" py={12}>
      <Container>
        <Grid container justifyContent="center" sx={{ textAlign: "center", mb: 2 }}>
          <MKTypography variant="h3">
            {existingTracking ? "Update Tracking" : "New Tracking"}
          </MKTypography>
        </Grid>
        <Grid container justifyContent="center">
          <MKBox
            width="100%"
            component="form"
            method="post"
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <MKBox p={3}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <MKInput
                    name="carId"
                    label="Car"
                    ref={inputRef}
                    placeholder="Search"
                    fullWidth
                    value={selectedValue || searchQuery} // Reflect the selected value or the search query
                    onChange={handleSearchChange} // Handle the search query change
                    onKeyDown={(e) => {
                      if (e.key === "Backspace" && !searchQuery) {
                        setSelectedValue("");
                        setFormData((prev) => ({ ...prev, ownerId: "" }));
                      } else {
                        handleFocus();
                      }
                    }}
                    onFocus={handleFocus} // Show dropdown when input is focused
                    onBlur={handleBlur} // Hide dropdown when input loses focus
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                  />

                  {/* Render the dropdown if the input is focused and there are filtered items */}
                  {isFocused && (
                    <List
                      sx={{ maxHeight: 200, overflow: "auto", mt: 2 }}
                      ref={listRef}
                      onMouseDown={handleMouseDownOnList} // Prevent blur on click
                    >
                      {/* If no results found, show a message */}
                      {filteredData.length === 0 ? (
                        <MenuItem disabled>No results found</MenuItem>
                      ) : (
                        filteredData.map((item) => (
                          <ListItem key={item.id} onClick={() => handleSelectItem(item)}>
                            {item.code}
                          </ListItem>
                        ))
                      )}
                    </List>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <MKInput
                    name="Owner"
                    value={existingTracking?.carId?.ownerId?.name || ownerName || "Select a car"}
                    label="Owner"
                    placeholder="Owner"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    rows={6}
                    InputProps={{
                      readOnly: true,
                    }}
                  ></MKInput>
                </Grid>
                <Grid item xs={12}>
                  {existingTracking && (
                    <MKInput
                      name="Date"
                      value={existingTracking.date.split('T')[0] || ""}
                      label="Date"
                      placeholder="Date"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      rows={6}
                      InputProps={{
                        readOnly: true,
                      }}
                    ></MKInput>
                  )}
                </Grid>

                <Grid item xs={12}>
                  <MKInput
                    name="notes"
                    onChange={handleChange}
                    value={formData.notes}
                    label="Notes"
                    placeholder="Notes "
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
                  <MKAlert
                    color="success"
                    onClose={() => setSuccessMessage("")}
                    onClick={() => setErrorMessage("")} // Close alert on click
                  >
                    {successMessage}
                  </MKAlert>
                )}
                {/* Show error alert */}
                {errorMessage && (
                  <MKAlert
                    color="error"
                    onClose={() => setErrorMessage("")}
                    onClick={() => setErrorMessage("")}
                  >
                    {errorMessage}
                  </MKAlert>
                )}
                <MKButton type="submit" variant="gradient" color="dark" fullWidth>
                  {isUpdating ? "Update" : "Save"}
                </MKButton>
                {/* Delete Button */}
                {existingTracking && (
                  <MKButton
                    variant="outlined"
                    color="error"
                    onClick={handleDeleteClick}
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    Delete Tracking
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
TrackingForm.propTypes = {
  existingTracking: PropTypes.shape({
    id: PropTypes.string,
    notes: PropTypes.string,
    carId: PropTypes.string,
  }),
  onSubmitSuccess: PropTypes.func.isRequired,
};

export default TrackingForm;
