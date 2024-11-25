import { useEffect } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// NUBA AUTO themes
import theme from "assets/theme";
import Presentation from "layouts/pages/presentation";
import SignIn from "layouts/pages/authentication/sign-in";
import CarForm from "layouts/pages/landing-pages/carForm";
import UserForm from "layouts/pages/landing-pages/userForm";
import OwnerForm from "layouts/pages/landing-pages/ownerForm";
import TrackingForm from "layouts/pages/landing-pages/trackingForm";
import ContactUs from "layouts/pages/landing-pages/contact-us";
import AboutUs from "layouts/pages/landing-pages/about-us";

// NUBA AUTO routes
import routes from "routes";

export default function App() {
  const { pathname } = useLocation();

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        {getRoutes(routes)}
        <Route path="/presentation" element={<Presentation />} />
        <Route path="*" element={<Navigate to="/presentation" />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/carform" element={<CarForm />} />
        <Route path="/userform" element={<UserForm />} />
        <Route path="/ownerform" element={<OwnerForm />} />
        <Route path="/trackingform" element={<TrackingForm />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/aboutus" element={<AboutUs />} />
      </Routes>
    </ThemeProvider>
  );
}
