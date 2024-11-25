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
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// NUBA AUTO components
import MKBox from "components/MKBox";

// NUBA AUTO examples
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import CenteredBlogCard from "examples/Cards/BlogCards/CenteredBlogCard";

// Images
import bgImage from "assets/images/bg-about-us2.jpg";


function Information() {
  return (
    <MKBox component="section" py={12}>
      <Container>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} lg={6}>
            <Grid container justifyContent="flex-start">
              <Grid item xs={12} md={6}>
                <MKBox mb={5}>
                  <DefaultInfoCard
                    title="No more surprises!"
                    description="
                    No more surprises! Get your battery checked today at Nuba Auto and enjoy a smooth drive.
                    خليك عامل حساب المفاجآت واتطمن على بطارية عربيتك في مركز صيانة نوبا أوتو.
                    "
                  />
                </MKBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <MKBox mb={5}>
                  <DefaultInfoCard
                    title=" Fix the damage"
                    description="
                    We fix the damage and leave it without a scar. Enjoy a seamless glass repair service at Nuba Auto.
                    زجاج عربيتك من غير خدش مع خدمات مركز نوبا أوتو لتصليح زجاج العربيات.
                    "
                  />
                </MKBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <MKBox mb={{ xs: 5, md: 0 }}>
                  <DefaultInfoCard
                    title="Discover the trade-in value"
                    description="
                    Discover the trade-in value of your car at Nuba Auto car services center and take the next step toward your car upgrade.
                    قيم عربيتك وافحصها قبل البيع في مركز نوبا أوتو للعربيات اللي بيساعدك تغير عربيتك أو تبيعها.
                    "
                  />
                </MKBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <MKBox mb={{ xs: 5, md: 0 }}>
                  <DefaultInfoCard
                    title="Regain The Shine"
                    description="
                    Shiny, spotless, and ready for the road. Get you car washed at Nuba Auto and regain that shine
                    رجع لعربيتك لمعانها مع خدمة غسيل السيارات في مركز صيانة نوبا أوتو. في انتظاركم في فروعنا.
                    "
                  />
                </MKBox>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4} sx={{ ml: "auto", mt: { xs: 3, lg: 0 } }}>
            <CenteredBlogCard
              image ={bgImage}
              title="Get insights on Search"
              // description="Website visitors today demand a frictionless user expericence — especially when using search. Because of the hight standards."
              action={{
                type: "external",
                route: "https://www.facebook.com/NubaAuto",
                color: "info",
                label: "find out more",
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Information;
