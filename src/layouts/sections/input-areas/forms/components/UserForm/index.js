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

import { useState } from "react";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// import Switch from "@mui/material/Switch";

// NUBA AUTO components
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import MKAlert from "components/MKAlert";

import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { Formik, Form } from "formik";
import * as Yup from "yup";



function UserForm() {
  // const [checked, setChecked] = useState(true);
  const [user, setUser] = useState(null);
  // const handleChecked = () => setChecked(!checked);
  const handleUser = () => setUser(null);
  const [userType, setUserType] = useState(""); // State to hold selected value

  const [dropdown, setDropdown] = useState(null);
  const openDropdown = ({ currentTarget }) => setDropdown(currentTarget);
  const closeDropdown = () => setDropdown(null);
  
  // Styles
  const iconStyles = {
    ml: 1,
    fontWeight: "bold",
    transition: "transform 200ms ease-in-out",
  };

  const dropdownIconStyles = {
    transform: dropdown ? "rotate(180deg)" : "rotate(0)",
    ...iconStyles,
  };

  
  const handleSelect = (type) => {
    setUserType(type); // Update selected value
    closeDropdown(); // Close dropdown
  };

  // Validation Schema using Yup
  const validationSchema = Yup.object({
    username: Yup.string()
    .required("Username is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
  });


  
  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Form submitted successfully:", values);
    setSubmitting(false); // Stop the loading state
  };


  return (
    <Formik
    initialValues={{username: "", email: "", password: "", confirmPassword: "" }}
    validationSchema={validationSchema}
    onSubmit={(values, { setSubmitting }) => {
      handleSubmit(values);
      setSubmitting(false);
    }}
    validateOnChange={true} // Validate fields on change
    validateOnBlur={true}  // Validate fields on blur
  >
    {({ handleChange, handleBlur, values, errors, touched, isSubmitting }) => (
      <Form>
        <MKBox component="section" py={12} onChange={handleUser}>
          <Container>
            <Grid container item justifyContent="center" xs={10} lg={7} mx="auto" textAlign="center">
            
              <MKTypography variant="h3" mb={1}>
              {user ?   "Update User" : "New User"}
              </MKTypography>
            </Grid>
            <Grid container item xs={12} lg={7} sx={{ mx: "auto" }}>
              <MKBox width="100%" component="form" method="post" autoComplete="off">
                <MKBox p={3}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <MKInput
                        label="Username"
                        placeholder="eg. 1234"
                        name="username"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.username && Boolean(errors.username)}
                        helperText={touched.username && errors.username}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <MKInput
                          type="email"
                          label="E-mail"
                          placeholder="eg. xx@xx.com"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.email && Boolean(errors.email)}
                          helperText={touched.email && errors.email}
                          fullWidth
                          required
                        />
                    </Grid>
                    <Grid item xs={12}>
                      <MKButton variant="gradient" color="info" onClick={openDropdown}
                      fullWidth
                      sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} 
                      >
                        {userType || "Select User Type"}{" "}

                        <Icon sx={dropdownIconStyles}>expand_more</Icon>
                      </MKButton>
                      <Menu anchorEl={dropdown} open={Boolean(dropdown)} onClose={closeDropdown}
                        PaperProps={{
                          style: { width: dropdown?.offsetWidth }, // Match button's width
                        }} 
                      >
                        <MenuItem onClick={() => handleSelect("User")}>User</MenuItem>
                        <MenuItem onClick={() => handleSelect("Admin")}>Admin</MenuItem>
                        <MenuItem onClick={() => handleSelect("Worker")}>Worker</MenuItem>
                      </Menu>
                    </Grid>
                    <Grid item xs={12}>
                      <MKInput
                            type="password"
                            label="Password"
                            placeholder="eg.xxxxx"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.password && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            required
                          />
                    </Grid>
                    <Grid item xs={12}>
                      <MKInput
                            type="password"
                            label="Re-type Password"
                            placeholder="eg.xxxxx"
                            name="confirmPassword"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                            helperText={touched.confirmPassword && errors.confirmPassword}
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            required
                          />
                    </Grid>
                  </Grid>
                  <Grid container item justifyContent="center" xs={12} my={2}>
                    {/* Error Message */}
                    {Object.keys(errors).length > 0  &&(
                      
                      <MKAlert color="error" >
                        {/* <Icon fontSize="small">thumb_down</Icon>&nbsp; */}
                        Please correct the errors before submitting.
                      </MKAlert>
                    )}
                    <MKButton type="submit" variant="gradient" color="dark" fullWidth  
                      disabled={isSubmitting || Object.keys(errors).length > 0}>
                      Save
                    </MKButton>
                  </Grid>
                </MKBox>
              </MKBox>
            </Grid>
          </Container>
        </MKBox>
      </Form>)}
    </Formik>
  );
}

export default UserForm;
