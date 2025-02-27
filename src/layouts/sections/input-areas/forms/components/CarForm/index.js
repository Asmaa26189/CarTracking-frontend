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
import MKDatePicker from "components/MKDatePicker";
import InputAdornment from "@mui/material/InputAdornment";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";

function CarForm({ onSubmitSuccess }) {
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    code: "",
    type: "",
    description: "",
    ownerId: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // For success alert
  const [errorMessage, setErrorMessage] = useState(""); // For error alert
  // const [isDeleting, setIsDeleting] = useState(false); // To track if the user is trying to delete
  const [dialogOpen, setDialogOpen] = useState(false);
  const [owners, setOwners] = useState([]);
  const location = useLocation();
  const existingCar = location.state?.existingCar || null;
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [searchQueryType, setSearchQueryType] = useState(""); // Search query state
  const [selectedValue, setSelectedValue] = useState(""); // Selected value state
  const [selectedValueType, setSelectedValueType] = useState(""); // Selected value state
  const [isFocused, setIsFocused] = useState(false); // Manage focus state
  const [isFocusedType, setIsFocusedType] = useState(false); // Manage focus state
  const inputRef = useRef(null); // Ref for the input field
  const listRef = useRef(null); // Ref for the listexistingCar.ownerId
  const inputRefType = useRef(null); // Ref for the input field
  const listRefType = useRef(null); // Ref for the listexistingCar.ownerId
  const fuelTypes = [
    { id: "gas", name: "Gas" },
    { id: "diesel", name: "Diesel" },
  ];
  const config = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("token")}`, // Send the token from local storage
  }
  const config2 = {

    "Content-Type": "application/json",
  }
  // Populate the form with existingCar data when in update mode
  useEffect(() => {
    if (existingCar) {
      setSelectedValue(existingCar.ownerId.name);
      const typeObject = typesData.find((t) => t.id === existingCar.type);
      setSelectedValueType(typeObject ? typeObject.name : ""); // Display name
      setFormData({
        code: existingCar.code || "",
        type: existingCar?.type || "Select car type",
        description: existingCar.description || "",
        ownerId: existingCar.ownerId._id || "",
        date: existingCar.date.split('T')[0] || "",
        brand: existingCar.brand || "",
        model: existingCar.model || "",
        year: existingCar.year || "",
        color: existingCar.color || "",
        engineNumber: existingCar.engineNumber || "",
        chassisNumber: existingCar.chassisNumber || "",
        fuel: existingCar.fuel || "",
        mileage: existingCar.mileage || "",
        // lastMaintenance: existingCar.lastMaintenance.split('T')[0] || "",
        // insurance: existingCar.insurance || "", 

      });
      setIsUpdating(true);
    }
  }, [existingCar]);


  const handleDeleteClick = () => {
    setDialogOpen(true); // Open the confirmation dialog
  };
  const handleCancelDelete = () => {
    setDialogOpen(false); // Close the dialog without deleting
  };

  const handleConfirmDelete = async () => {
    try {
      if (!existingCar) {
        throw new Error(`Failed to delete car`);
      }
      const response = await fetch(`${apiUrl}/car/${existingCar._id}`, {
        method: 'DELETE',
        headers: config,
      });
      if (!response.ok) {
        throw new Error(`Failed to delete car`);
      }
      setDialogOpen(false); // Close the dialog after successful deletion
      setSuccessMessage(`Car Deleted successfully!`);
      setErrorMessage(""); // Clear any existing error
      navigate(`/cars`);
    } catch {
      setDialogOpen(false); // Close the dialog after successful deletion
      setErrorMessage(`Faild to delete car`);
      setSuccessMessage(""); // Clear any existing error
      navigate(`/cars`);
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

  const handleDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      date,
    }));
  };



  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const api = isUpdating
      ? `${apiUrl}/car/${existingCar._id}` // Update endpoint
      : `${apiUrl}/car`; // Create endpoint

    const method = isUpdating ? "PUT" : "POST"; // Use PUT for updates and POST for creation

    try {
      const response = await fetch(api, {
        method,
        headers: config,
        body: JSON.stringify(formData), // Send the form data as JSON
      });

      if (!response.ok) {
        throw new Error(`Failed to ${isUpdating ? "update" : "create"} car`);
      }

      const result = await response.json();
      console.log(`${isUpdating ? "Updated" : "Created"} car:`, result);
      setSuccessMessage(`Car ${isUpdating ? "updated" : "created"} successfully!`);
      setErrorMessage(""); // Clear any existing error
      navigate(`/cars`);

      if (onSubmitSuccess) onSubmitSuccess(result); // Notify parent of success

      if (!isUpdating) {
        setFormData({ code: "", type: "Select car type", description: "", date: "", ownerId: "" }); // Reset form after creating
      }
    } catch (error) {
      console.error(error.message);
      setErrorMessage("An error occurred while submitting the form."); // Set error message
      setSuccessMessage(""); // Clear any existing success message
    }
  };



  const fetchOwners = async () => {
    const api = `${apiUrl}/owner`;
    try {
      const response = await fetch(api, {
        method: "GET",
        headers: config2,
      });
      if (!response.ok) {
        throw new Error(`Failed to get owners`);
      }
      const result = await response.json();
      setOwners(result.map((owner) => ({ id: owner._id, name: owner.name })));
    } catch (error) {
      console.error("Error fetching owners:", error.message);
      setErrorMessage("Failed to fetch owners.");
    }
  };

  useEffect(() => {

    fetchOwners();
  }, []);
  // Filter the data based on the search query
  const filteredData = owners.filter((owner) =>
    owner ? owner.name.toLowerCase().includes(searchQuery.toLowerCase()) : ""
  );
  const typesData = [{ "id": "Pick-up", "name": "Pick up" }, 
  { "id": "Sedan", "name": "Sedan" },
  { "id": "Hilux", "name": "Hilux" },
  { "id": "Hatchback", "name": "Hatchback" },
  { "id": "4x4", "name": "4x4" },
  { "id": "SUV", "name": "SUV" },
  { "id": "Coupe", "name": "Coupe" },
  { "id": "Luxury", "name": "Luxury" },
  { "id": "VAN", "name": "VAN" }];

  const filteredDataType = typesData.filter((type) =>
    type ? type.name.toLowerCase().includes(searchQueryType.toLowerCase()) : ""
  );
  console.log(selectedValue);

  // Handle change in search input
  // const handleSearchChange = (e) => {
  //   setSearchQuery(e.target.value);
  // };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setSelectedValue(""); // Clear the selected value when manually typing
    setFormData((prev) => ({ ...prev, ownerId: "" })); // Reset ownerId
  };

  const handleSearchChangeType = (e) => {
    const value = e.target.value;
    setSearchQueryType(value);
    setSelectedValueType(""); // Clear the selected value when manually typing
    setFormData((prev) => ({ ...prev, type: "" })); // Reset ownerId
  };

  const handleSelectItem = (owner) => {
    setSelectedValue(owner.name);
    setFormData((prev) => ({ ...prev, ownerId: owner.id }));
    setSearchQuery(owner.name);
    setIsFocused(false);
  };
  const handleSelectItemType = (type) => {
    setSelectedValueType(type.name);
    setFormData((prev) => ({ ...prev, type: type.id }));
    setSearchQueryType(type.name);
    setIsFocusedType(false);
  };

  // Handle focus event (show the dropdown)
  const handleFocus = () => {
    setIsFocused(true); // Show dropdown when input is focused
  };
  const handleFocusType = () => {
    setIsFocusedType(true); // Show dropdown when input is focused
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
  // Handle blur event (hide the dropdown after leaving the input)
  const handleBlurType = (event) => {
    // Use setTimeout to ensure the click event on list items is captured first
    setTimeout(() => {
      if (!listRefType.current || !listRefType.current.contains(event.relatedTarget)) {
        setIsFocusedType(false); // Hide dropdown when focus is lost outside the input and list
      }
    }, 100);
  };

  // Prevent blur event from hiding the dropdown when clicking on list items
  const handleMouseDownOnList = (event) => {
    event.preventDefault(); // Prevent the onBlur from being triggered when clicking list items
  };
  // Prevent blur event from hiding the dropdown when clicking on list items
  const handleMouseDownOnListType = (event) => {
    event.preventDefault(); // Prevent the onBlur from being triggered when clicking list items
  };


  return (
    <MKBox component="section" py={1} height="1000hv">
      <Container>
        <Grid container item justifyContent="center" xs={10} lg={7} mx="auto" textAlign="center">

          <MKTypography variant="h3" mb={1}>
            {existingCar ? "Update Car" : "New Car"}
          </MKTypography>
        </Grid>
        <Grid container item xs={12} lg={7} sx={{ mx: "auto" }}>
          <MKBox width="100%" component="form" method="post" autoComplete="off" onSubmit={handleSubmit}>
            <MKBox p={3}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <MKInput
                    name="ownerId"
                    label="Owner"
                    ref={inputRef}
                    placeholder="Search"
                    fullWidth
                    value={selectedValue || searchQuery} // Reflect the selected value or the search query
                    onChange={handleSearchChange} // Handle the search query change
                    onKeyDown={(e) => {
                      if (e.key === "Backspace" && searchQuery === "") {
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
                    <List sx={{ maxHeight: 200, overflow: "auto", mt: 2 }}
                      ref={listRef}
                      onMouseDown={handleMouseDownOnList} // Prevent blur on click
                    >
                      {/* If no results found, show a message */}
                      {filteredData.length === 0 ? (
                        <MenuItem disabled>No results found</MenuItem>
                      ) : (
                        filteredData.map((item) => (
                          <ListItem
                            key={item.id}
                            onClick={() => handleSelectItem(item)}

                          >
                            {item.name}
                          </ListItem>
                        ))
                      )}
                    </List>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <MKInput
                    name="type"
                    label="Type"
                    ref={inputRefType}
                    placeholder="Search"
                    fullWidth
                    value={selectedValueType || searchQueryType} // Reflect the selected value or the search query
                    onChange={handleSearchChangeType} // Handle the search query change
                    onKeyDown={(e) => {
                      if (e.key === "Backspace" && searchQuery === "") {
                        setSelectedValueType("");
                        setFormData((prev) => ({ ...prev, type: "" }));
                      } else {
                        handleFocusType();
                      }
                    }}
                    onFocus={handleFocusType} // Show dropdown when input is focused
                    onBlur={handleBlurType} // Hide dropdown when input loses focus
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
                  {isFocusedType && (
                    <List sx={{ maxHeight: 200, overflow: "auto", mt: 2 }}
                      ref={listRefType}
                      onMouseDown={handleMouseDownOnListType} // Prevent blur on click
                    >
                      {/* If no results found, show a message */}
                      {filteredDataType.length === 0 ? (
                        <MenuItem disabled>No results found</MenuItem>
                      ) : (
                        filteredDataType.map((item) => (
                          <ListItem
                            key={item.id}
                            onClick={() => handleSelectItemType(item)}

                          >
                            {item.name}
                          </ListItem>
                        ))
                      )}
                    </List>
                  )}
                </Grid>
                <Grid item xs={6}>
                  <MKInput
                    label="Code"
                    name="code"
                    placeholder="eg. 1234"
                    value={formData.code}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <MKDatePicker
                    name="date"
                    value={formData.date}
                    onChange={handleDateChange}
                    input={{
                      label: "Date",
                      placeholder: "eg. yyyy-mm-dd",
                      fullWidth: true, // Makes the input take the full width
                      InputLabelProps: { shrink: true }, // Ensures the label doesn't overlap with the placeholder
                    }}

                    sx={{
                      width: "100%", // Ensures responsiveness
                      "& .MuiInputBase-root": {
                        fontSize: "1rem", // Adjust font size to match MKInput
                        padding: "6px 0", // Standard padding for inputs
                      },
                      "& .MuiInput-underline:before": {
                        borderBottom: "1px solid rgba(0, 0, 0, 0.42)", // Matches underline style
                      },
                      "& .MuiInput-underline:hover:before": {
                        borderBottom: "2px solid black", // Hover effect
                      },
                      "& .MuiInput-underline:after": {
                        borderBottom: "2px solid blue", // Active underline color
                      },
                    }}
                    required
                  />
                </Grid>
                {/*<Grid item xs={6}>
                  <MKButton
                    variant="gradient"
                    color="info"
                    onClick={openDropdown}
                    fullWidth
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {fieldValue || "Select Car Type"}{" "}
                    <Icon
                      sx={{
                        ml: 1,
                        fontWeight: "bold",
                        transition: "transform 200ms ease-in-out",
                        transform: dropdown
                          ? "rotate(180deg)"
                          : "rotate(0)",
                      }}
                    >
                      expand_more
                    </Icon>
                  </MKButton>
                   <Menu
                    name="type"
                    anchorEl={dropdown}
                    open={Boolean(dropdown)}
                    onClose={closeDropdown}
                  >
                    {["Pick up - سيدان", "Hilux - هاتش باك", "4x4 - SUV - TEV"].map((type) => (
                      <MenuItem
                        key={type}
                        onClick={() => {
                          setFieldValue(type);
                          closeDropdown();
                        }}
                      >
                        {type}
                      </MenuItem>
                    ))}
                  </Menu>
                </Grid> */}
                <Grid item xs={6}>
                  <MKInput
                    label="Brand"
                    name="brand"
                    placeholder="eg. 1234"
                    value={formData.brand}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <MKInput
                    label="Year"
                    name="year"
                    placeholder="eg. 1234"
                    value={formData.year}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <MKInput
                    label="Model"
                    name="model"
                    placeholder="eg. 1234"
                    value={formData.model}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    required
                  />
                </Grid>
                {/* <Grid item xs={6}>
                  <MKInput
                    label="Color"
                    name="color"
                    placeholder="eg. 1234"
                    value={formData.color}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    required
                  />
                </Grid> */}
                <Grid item xs={6}>
                  <MKInput
                    label="Engine Number"
                    name="engineNumber"
                    placeholder="eg. 1234"
                    value={formData.engineNumber}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <MKInput
                    label="Chassis Number"
                    name="chassisNumber"
                    placeholder="eg. 1234"
                    value={formData.chassisNumber}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    required
                  />
                </Grid>
                {/* <Grid item xs={6}>
                  <MKInput
                    label="Insurance"
                    name="insurance"
                    placeholder="eg. 1234"
                    value={formData.insurance}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    required
                  />
                </Grid> */}
                <Grid item xs={6}>
                  <MKInput
                    label="Mileage"
                    name="mileage"
                    placeholder="eg. 1234"
                    value={formData.mileage}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <MKInput
                    select
                    label="Fuel"
                    name="fuel"
                    placeholder="eg. 1234"
                    value={formData.fuel}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    required
                    sx={{
                      "& .MuiInputBase-root": {
                        height: "40px", // Matches the height of other inputs
                        display: "flex",
                        alignItems: "center",
                      },
                      "@media (max-width: 600px)": {
                        "& .MuiInputBase-root": {
                          height: "45px", // Slightly smaller on small screens
                        },
                      },
                    }}
                  >
                    {fuelTypes.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </MKInput>
                </Grid>
                {/* <Grid item xs={6}>
                  <MKDatePicker
                    name="lastMaintenance"
                    value={formData.lastMaintenance}
                    onChange={handleDateChange}
                    input={{
                      label: "Last Maintenance",
                      placeholder: "eg. yyyy-mm-dd",
                      fullWidth: true, // Makes the input take the full width
                      InputLabelProps: { shrink: true }, // Ensures the label doesn't overlap with the placeholder
                    }}

                    sx={{
                      width: "100%", // Ensures responsiveness
                      "& .MuiInputBase-root": {
                        fontSize: "1rem", // Adjust font size to match MKInput
                        padding: "6px 0", // Standard padding for inputs
                      },
                      "& .MuiInput-underline:before": {
                        borderBottom: "1px solid rgba(0, 0, 0, 0.42)", // Matches underline style
                      },
                      "& .MuiInput-underline:hover:before": {
                        borderBottom: "2px solid black", // Hover effect
                      },
                      "& .MuiInput-underline:after": {
                        borderBottom: "2px solid blue", // Active underline color
                      },
                    }}
                    required
                  />
                </Grid>
               
                <Grid item xs={12}>
                  <MKInput
                    name="description"
                    onChange={handleChange}
                    value={formData.description}
                    label="Notes"
                    placeholder="Notes "
                    InputLabelProps={{ shrink: true }}
                    multiline
                    fullWidth
                    rows={6}
                  />
                </Grid> */}

              </Grid>
              <Grid container item justifyContent="center" xs={12} my={2}>
                {/* Show success alert */}
                {successMessage && (
                  <MKAlert color="success" onClose={() => setSuccessMessage("")}
                    onClick={() => setErrorMessage("")} // Close alert on click
                  >
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
                {existingCar && (
                  <MKButton
                    variant="outlined"
                    color="error"
                    onClick={handleDeleteClick}
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    Delete Car
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
CarForm.propTypes = {
  existingCar: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    description: PropTypes.string,
    ownerId: PropTypes.string,
    date: PropTypes.string,
    brand: PropTypes.string,
    model: PropTypes.string,
    year: PropTypes.string,
    color: PropTypes.string,
    engineNumber: PropTypes.string,
    chassisNumber: PropTypes.string,
    fuel: PropTypes.string,
    mileage: PropTypes.string,
    // lastMaintenance: PropTypes.string,
    // insurance: PropTypes.string,
  }),
  onSubmitSuccess: PropTypes.func.isRequired,
};

export default CarForm;
