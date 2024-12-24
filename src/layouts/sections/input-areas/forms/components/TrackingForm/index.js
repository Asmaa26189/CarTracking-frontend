import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  TextField,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";

function TrackingForm() {
  const location = useLocation();
  const existingTracking = location.state?.existingTracking || null;

  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  // States
  const [ownerOptions, setOwnerOptions] = useState([]);
  const [filteredOwnerOptions, setFilteredOwnerOptions] = useState([]);
  const [carOptions, setCarOptions] = useState([]);
  const [filteredCarOptions, setFilteredCarOptions] = useState([]);
  const [selectedOwner, setSelectedOwner] = useState(existingTracking?.ownerId || "");
  const [selectedCar, setSelectedCar] = useState(existingTracking?.carId || "");
  const [ownerSearch, setOwnerSearch] = useState("");
  const [carSearch, setCarSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false); // For the delete confirmation dialog
  const [initialValues] = useState({
    notes: existingTracking?.notes || "",
  });

  // Fetch dropdown data
  useEffect(() => {
    fetch(`${apiUrl}/owner`, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setOwnerOptions(data);
        setFilteredOwnerOptions(data);
      })
      .catch((err) => console.error("Error fetching owners:", err));

    fetch(`${apiUrl}/car`, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setCarOptions(data);
        setFilteredCarOptions(data);
      })
      .catch((err) => console.error("Error fetching cars:", err));
  }, [apiUrl]);

  // Update filtered owner list and synchronize dropdown value
  useEffect(() => {
    const filtered = ownerOptions.filter((owner) =>
      owner.name.toLowerCase().includes(ownerSearch.toLowerCase())
    );
    setFilteredOwnerOptions(filtered);
    if (filtered.length > 0 && !selectedOwner) {
      setSelectedOwner(filtered[0]._id);
    }
  }, [ownerSearch, ownerOptions, selectedOwner]);

  // Update filtered car list and synchronize dropdown value
  useEffect(() => {
    const filtered = carOptions.filter((car) =>
      car.code.toLowerCase().includes(carSearch.toLowerCase())
    );
    setFilteredCarOptions(filtered);
    if (filtered.length > 0 && !selectedCar) {
      setSelectedCar(filtered[0]._id);
    }
  }, [carSearch, carOptions, selectedCar]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      ownerId: selectedOwner,
      carId: selectedCar,
      notes: event.target.notes.value,
    };

    fetch(`${apiUrl}/tracking`, {
      method: existingTracking ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to save data");
        navigate("/tracking");
      })
      .catch((err) => console.error("Error saving tracking:", err));
  };

  const handleDelete = () => {
    fetch(`${apiUrl}/tracking/${existingTracking._id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to delete tracking");
        navigate("/tracking");
      })
      .catch((err) => console.error("Error deleting tracking:", err))
      .finally(() => setDialogOpen(false));
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
            component="form"
            method="post"
            autoComplete="off"
            onSubmit={handleSubmit}
            sx={{
              width: "100%",
              maxWidth: 600,
              backgroundColor: "#f8f9fa",
              padding: 3,
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            {/* Owner Dropdown */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="owner-select-label">Owner</InputLabel>
              <TextField
                placeholder="Search Owner"
                variant="outlined"
                size="small"
                sx={{ mb: 1 }}
                value={ownerSearch}
                onChange={(e) => setOwnerSearch(e.target.value)}
              />
              <Select
                labelId="owner-select-label"
                value={selectedOwner}
                onChange={(e) => setSelectedOwner(e.target.value)}
              >
                {filteredOwnerOptions.map((owner) => (
                  <MenuItem key={owner._id} value={owner._id}>
                    {owner.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Car Dropdown */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="car-select-label">Car</InputLabel>
              <TextField
                placeholder="Search Car"
                variant="outlined"
                size="small"
                sx={{ mb: 1 }}
                value={carSearch}
                onChange={(e) => setCarSearch(e.target.value)}
              />
              <Select
                labelId="car-select-label"
                value={selectedCar}
                onChange={(e) => setSelectedCar(e.target.value)}
              >
                {filteredCarOptions.map((car) => (
                  <MenuItem key={car._id} value={car._id}>
                    {car.code}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Notes */}
            <MKInput
              label="Notes"
              placeholder="Describe your problem"
              multiline
              fullWidth
              rows={6}
              name="notes"
              defaultValue={initialValues.notes}
              sx={{ mb: 2 }}
            />

            <Box textAlign="center" display="flex" justifyContent="center" gap={2}>
              {existingTracking && (
                <MKButton
                  variant="gradient"
                  color="error"
                  onClick={() => setDialogOpen(true)}
                >
                  Delete
                </MKButton>
              )}
              <MKButton type="submit" variant="gradient" color="dark">
                {existingTracking ? "Update" : "Save"}
              </MKButton>
            </Box>
          </MKBox>
        </Grid>
      </Container>

      {/* Delete Confirmation Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this tracking record? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </MKBox>
  );
}

export default TrackingForm;
