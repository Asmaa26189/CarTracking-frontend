/*
=========================================================
* NUBA AUTO - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// NUBA AUTO components
import MKBox from "components/MKBox";
// import MKInput from "components/MKInput";
// import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";

// NUBA AUTO examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";

// // @mui icons
import Phone from "@mui/icons-material/Phone";
import Email from "@mui/icons-material/Email";
import Location from "@mui/icons-material/LocationOn";
import House from "@mui/icons-material/House";

// Routes
import routes from "routes";
import footerRoutes from "footer.routes";

// Image
import bgImage from "assets/images/illustrations/illustration-reset.jpg";

function ContactUs() {
  return (
    <>
      <MKBox position="fixed" top="0.5rem" width="100%">
        <DefaultNavbar
          routes={routes}
          action={{
            type: "internal",
            route: "/sign-in",
            label: "sign in",
            color: "info",
          }}
        />
      </MKBox>
      
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} lg={6}>
          <MKBox
            display={{ xs: "none", lg: "flex" }}
            width="calc(100% - 2rem)"
            height="calc(100vh - 2rem)"
            borderRadius="lg"
            ml={2}
            mt={2}
            sx={{ backgroundImage: `url(${bgImage})`,backgroundSize: "100%"}}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={10}
          md={7}
          lg={6}
          xl={4}
          ml={{ xs: "auto", lg: 6 }}
          mr={{ xs: "auto", lg: 6 }}
        >
          <MKBox
            bgColor="white"
            borderRadius="xl"
            shadow="lg"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            mt={{ xs: 20, sm: 18, md: 20 }}
            mb={{ xs: 20, sm: 18, md: 20 }}
            mx={3}
          >
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
                Contact us
              </MKTypography>
            </MKBox>
            <MKBox p={3}>
              <MKTypography variant="body2" color="text" mb={3}>
              استمتع بعربيتك من غير قلق مع نوبا أوتو لخدمات السيارات
              </MKTypography>
              <MKTypography variant="body2" color="text" mb={3}>
              Keep your journey exceptional with Nuba Auto car services center where your car will get treated with the help of professionals and field experts.
              </MKTypography>
              <MKBox width="100%" component="form" method="post" autoComplete="off">
                <Grid container spacing={3}>
                  <Grid item xs={12} md={12}>
                    {/* <MKInput
                      variant="standard"
                      label="Full Name"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                    /> */}
                     <MKTypography color="inherit">
                        <Phone color="inherit" />&nbsp;
                          010 12500071
                     </MKTypography>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <MKTypography color="inherit">
                        <Email color="inherit" />&nbsp;
                        info@nubaauto.com
                     </MKTypography>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <MKTypography color="inherit">
                        <Location color="inherit" />&nbsp;
                         https://linktr.ee/nubaauto
                     </MKTypography>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <MKTypography color="inherit">
                      <House color="inherit" />&nbsp;
                        308 maadi, Cairo, Egypt
                     </MKTypography>
                  </Grid>
                </Grid>
              </MKBox>
            </MKBox>
          </MKBox>
        </Grid>
      </Grid>
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default ContactUs;
