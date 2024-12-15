import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// NUBA AUTO components
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import MKAlert from "components/MKAlert";

import Icon from "@mui/material/Icon";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

const conf = { "Content-Type": "application/json" };

function UserForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  const [dropdown, setDropdown] = useState(null);

  const openDropdown = ({ currentTarget }) => setDropdown(currentTarget);
  const closeDropdown = () => setDropdown(null);

  const [isOldPasswordVerified, setIsOldPasswordVerified] = useState(false); // **RED**
  const [oldPasswordError, setOldPasswordError] = useState("");

  const existingUser = location.state?.existingUser || null;

  const initialValues = {
    name: existingUser?.name || "",
    email: existingUser?.email || "",
    oldPassword: "",
    password: "",
    confirmPassword: "",
    type: existingUser?.type || "Admin",
  };


  const getValidationSchema = (isOldPasswordVerified, existingUser) => { 
    return Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: isOldPasswordVerified || !existingUser 
        ? Yup.string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters")
        : Yup.string().notRequired(),
      confirmPassword: isOldPasswordVerified || !existingUser 
        ? Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Please confirm your password")
        : Yup.string().notRequired(),
      type: Yup.string()
        .oneOf(["Admin", "User", "Worker"], "Invalid user type")
        .required("User type is required"),
    });
  };
  

  const handleSubmit = (values, { setSubmitting }) => {
    const url = existingUser
      ? `${apiUrl}/user/${existingUser._id}`
      : `${apiUrl}/user`;
    const method = existingUser ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: conf,
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to save user");
        // alert(
        //   existingUser
        //     ? "User updated successfully!"
        //     : "User added successfully!"
        // );
        navigate("/users");
      })
      .catch((error) => {
        console.error("Error saving user:", error);
        alert("Error saving user. Please try again.");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const validateOldPassword = (oldPassword) => { 
    fetch(`${apiUrl}/user/validate-password`, { 
      method: "POST",  
      headers: conf, 
      body: JSON.stringify({ password: oldPassword, email: existingUser.email }), 
    }) 
      .then((response) => { 
        if (response.ok) { 
          setIsOldPasswordVerified(true); 
          setOldPasswordError(""); 
        } else { 
          setIsOldPasswordVerified(false); 
          setOldPasswordError("Old password is incorrect"); 
        } 
      }) 
      .catch(() => { 
        setIsOldPasswordVerified(false); 
        setOldPasswordError("Error validating password. Please try again."); 
      }); 
  }; 

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={getValidationSchema(isOldPasswordVerified, existingUser)}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, setFieldValue, isSubmitting }) => (
        <Form>
          <MKBox component="section" py={12}>
            <Container>
              <Grid
                container
                item
                justifyContent="center"
                xs={10}
                lg={7}
                mx="auto"
                textAlign="center"
              >
                <MKTypography variant="h3" mb={1}>
                  {existingUser ? "Update User" : "New User"}
                </MKTypography>
              </Grid>
              <Grid container item xs={12} lg={7} sx={{ mx: "auto" }}>
                <MKBox width="100%">
                  <MKBox p={3}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Field
                          name="name"
                          as={MKInput}
                          label="Name"
                          fullWidth
                          error={touched.name && Boolean(errors.name)}
                          helperText={touched.name && errors.name}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          name="email"
                          as={MKInput}
                          type="email"
                          label="Email"
                          fullWidth
                          error={touched.email && Boolean(errors.email)}
                          helperText={touched.email && errors.email}
                        />
                      </Grid>
                      <Grid item xs={12}>
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
                          {values.type || "Select User Type"}{" "}
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
                          anchorEl={dropdown}
                          open={Boolean(dropdown)}
                          onClose={closeDropdown}
                        >
                          {["Admin", "User", "Worker"].map((type) => (
                            <MenuItem
                              key={type}
                              onClick={() => {
                                setFieldValue("type", type);
                                closeDropdown();
                              }}
                            >
                              {type}
                            </MenuItem>
                          ))}
                        </Menu>
                      </Grid>
                      {existingUser && ( 
                          <Grid item xs={12}> 
                            <MKBox display="flex" alignItems="center"> 
                                <Field 
                                  name="oldPassword" 
                                  as={MKInput} 
                                  type="password" 
                                  label="Old Password" 
                                  fullWidth 
                                  error={Boolean(oldPasswordError)} 
                                  helperText={oldPasswordError} 
                                /> 
                            <MKButton 
                              variant="gradient" 
                              color="info" 
                              onClick={() => validateOldPassword(values.oldPassword)} 
                              sx={{ ml: 2 }} 
                            > 
                             Verify 
                            </MKButton> 
                          </MKBox> 
                      </Grid> 
                    )} 

                  {(!existingUser || isOldPasswordVerified) && ( 
                    <> 
                    <Grid item xs={12}> 
                      <Field 
                        name="password" 
                        as={MKInput}
                        type="password" 
                        label="Password" 
                        fullWidth 
                        error={touched.password && Boolean(errors.password)} 
                        helperText={touched.password && errors.password} 
                      /> 
                    </Grid> 
                    <Grid item xs={12}> 
                      <Field 
                        name="confirmPassword" 
                        as={MKInput} 
                        type="password" 
                        label="Confirm Password" 
                        fullWidth 
                        error={ 
                          touched.confirmPassword && Boolean(errors.confirmPassword) 
                        } 
                        helperText={ 
                          touched.confirmPassword && errors.confirmPassword 
                        } 
                      /> 
                    </Grid> 
                  </> 
                  )} 

                  </Grid>
                    <Grid container item justifyContent="center" xs={12} my={2}>
                      {Object.keys(errors).length > 0 && (
                        <MKAlert color="error">
                          Please correct the errors before submitting.
                        </MKAlert>
                      )}
                      <MKButton
                        type="submit"
                        variant="gradient"
                        color="dark"
                        fullWidth
                        disabled={isSubmitting || (existingUser && !isOldPasswordVerified && errors.oldPassword)}
                        > 
                          {existingUser ? "Update" : "Save"}
                      </MKButton>
                    </Grid>
                  </MKBox>
                </MKBox>
              </Grid>
            </Container>
          </MKBox>
        </Form>
      )}
    </Formik>
  );
}

export default UserForm;
