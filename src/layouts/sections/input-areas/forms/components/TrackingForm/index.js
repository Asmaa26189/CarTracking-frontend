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

import React, { useState, useRef } from "react";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";

// import Switch from "@mui/material/Switch";

// NUBA AUTO components
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import MKDatePicker from "components/MKDatePicker";

function TrackingForm() {
  // const [checked, setChecked] = useState(true);
  const [tracking, setTracking] = useState(null);
  // const handleChecked = () => setChecked(!checked);
  const handleTracking = () => setTracking(null);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [selectedValue, setSelectedValue] = useState(""); // Selected value state
  const [isFocused, setIsFocused] = useState(false); // Manage focus state
  const inputRef = useRef(null); // Ref for the input field
  const listRef = useRef(null); // Ref for the list
  
  console.log(selectedValue);
   // Sample data to search
  const data = [
    "Apple",
    "Banana",
    "Grapes",
    "Orange",
    "Mango",
    "Peach",
    "Strawberry",
    "Pineapple",
    "Watermelon",
    "Blueberry"
  ];

  // Filter the data based on the search query
  const filteredData = data.filter((item) =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle change in search input
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); // Update search query state
  };

  // Handle selecting an item from the dropdown
  const handleSelectItem = (item) => {
    setSelectedValue(item); // Set selected value when an item is selected
    setSearchQuery(item); // Optionally, set the search field to the selected value
    setIsFocused(false); // Hide the dropdown after selection
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
    <MKBox component="section" py={12} onChange={handleTracking}>
      <Container>
        <Grid container item justifyContent="center" xs={10} lg={7} mx="auto" textAlign="center">
        
          <MKTypography variant="h3" mb={1}>
          {tracking ?   "Update Tracking" : "New Tracking"}
          </MKTypography>
        </Grid>
        <Grid container item xs={12} lg={7} sx={{ mx: "auto" }}>
          <MKBox width="100%" component="form" method="post" autoComplete="off">
            <MKBox p={3}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                     <MKInput
                      label="Car"
                      ref={inputRef}
                      placeholder="Search"
                      fullWidth
                      value={searchQuery} // Bind the input value to the search query state
                      onChange={handleSearchChange} // Handle the search query change
                      onKeyDown={handleFocus}
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
                          filteredData.map((item, index) => (
                            <ListItem
                              key={index}
                              onClick={() => handleSelectItem(item)}
                              
                            >
                              {item}
                            </ListItem>
                          ))
                        )}
                      </List>
                    )}

                    {/* Optionally, show the selected value */}
                    {/* {selectedValue && (
                      <div style={{ marginTop: "16px", color: "green" }}>
                        Selected: {selectedValue}
                      </div>
                    )} */}
                </Grid>
                <Grid item xs={12}>
                   <MKDatePicker
                        input={{
                          label:"Date",
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
                      />
                </Grid>
                <Grid item xs={12}>
                <MKInput
                  label="Notes"
                  placeholder="Describe your problem"
                  InputLabelProps={{ shrink: true }}
                  multiline
                  fullWidth
                  rows={6}
                    />
                </Grid>
              </Grid>
              <Grid container item justifyContent="center" xs={12} my={2}>
                <MKButton type="submit" variant="gradient" color="dark" fullWidth>
                  Save
                </MKButton>
              </Grid>
            </MKBox>
          </MKBox>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default TrackingForm;
