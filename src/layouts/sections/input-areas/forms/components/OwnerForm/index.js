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

function OwnerForm() {
  // const [checked, setChecked] = useState(true);
  const [owner, setOwner] = useState(null);
  // const handleChecked = () => setChecked(!checked);
  const handleOwner = () => setOwner(null);
  

  return (
    <MKBox component="section" py={12} onChange={handleOwner}>
      <Container>
        <Grid container item justifyContent="center" xs={10} lg={7} mx="auto" textAlign="center">
        
          <MKTypography variant="h3" mb={1}>
          {owner ?   "Update Owner" : "New Owner"}
          </MKTypography>
        </Grid>
        <Grid container item xs={12} lg={7} sx={{ mx: "auto" }}>
          <MKBox width="100%" component="form" method="post" autoComplete="off">
            <MKBox p={3}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <MKInput
                    label="name"
                    placeholder="eg. name"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <MKInput
                    label="phone"
                    placeholder="eg. 1222222222"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                <MKInput
                  label="Notes"
                  placeholder="description "
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

export default OwnerForm;
