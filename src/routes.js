import { jwtDecode }  from "jwt-decode"; // Install if not already: npm install jwt-decode

// Import required components
import AboutUs from "layouts/pages/landing-pages/about-us";
import ContactUs from "layouts/pages/landing-pages/contact-us";
import Car from "layouts/pages/landing-pages/car";
import Owner from "layouts/pages/landing-pages/owner";
import User from "layouts/pages/landing-pages/user";
import Tracking from "layouts/pages/landing-pages/tracking";
// import {useEffect } from "react";

// Check if user is authenticated and get user type
let userType = null;
const token = localStorage.getItem("token"); 
if (token) {
  try {
    const decodedToken = jwtDecode(token);
    userType = decodedToken.type; // Ensure `userType` exists in the token payload
  } catch (error) {
    console.error("Invalid token:", error);
  }
}
// Define all routes
const allRoutes = [
  {
    name: "Owners",
    component: <Owner />,
    route: "/owners",
    access: ["Admin"], // Only Admins can see
  },
  {
    name: "Cars",
    component: <Car />,
    route: "/cars",
    access: ["Admin"], // Only Admins can see
  },
  {
    name: "Tracking Cars",
    component: <Tracking />,
    route: "/trackings",
    access: ["Admin","User","Worker"], // Admin & CarTracking users can see
  },
  {
    name: "Users",
    component: <User />,
    route: "/users",
    access: ["Admin"], // Only Admins can see
  },
  {
    name: "About us",
    component: <AboutUs />,
    route: "/about-us",
    access: ["Public","User","Worker"], // Everyone can see
  },
  {
    name: "Contact us",
    component: <ContactUs />,
    route: "/contact-us",
    access: ["Public","User","Worker"], // Everyone can see
  },
];

// // Filter routes based on authentication & user type
// const routes = allRoutes.filter(route => 
//   route.access.includes("Public") || // Show public routes to everyone
//   (userType && route.access.includes(userType))// Show routes based on user type
// );

const routes = allRoutes.filter(route => 
  route.access.includes("Public") || // Show public routes to everyone
  (userType && route.access.includes(userType))// Show routes based on user type
)

export default routes;
