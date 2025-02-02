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
import { useState, useEffect } from "react";
import axios from "axios";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// NUBA AUTO components
import MKBox from "components/MKBox";

// NUBA AUTO examples
import DefaultCounterCard from "examples/Cards/CounterCards/DefaultCounterCard";
 // Define API URL
 const apiUrl = process.env.REACT_APP_API_URL;
 const api = `${apiUrl}/`;

function Counters() {
  const [carsCount, setCarsCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [trackedCount, setTrackedCount] = useState(0);
 

  const fetchData = async () => {
    try {
      
      const carsResponse = await axios.get(`${api}car/`);
      const usersResponse = await axios.get(`${api}user/`);
      const trackedResponse = await axios.get(`${api}tracking/`);

      // set data
      setCarsCount(carsResponse.data.length);
      setUsersCount(usersResponse.data.length);
      setTrackedCount(trackedResponse.data.length);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch 
  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <MKBox component="section" py={3}>
      <Container>
        <Grid container item xs={12} lg={9} sx={{ mx: "auto" }}>
          <Grid item xs={12} md={4}>
            <DefaultCounterCard
              count={carsCount}
              suffix="+"
              title="Cars"
              description="Number Of Cars Entered"
            />
          <Divider orientation="vertical" sx={{ display: { xs: "none", md: "block" }, mx: 0 }} />
          </Grid>
          <Grid item xs={12} md={4}>
            <DefaultCounterCard
              count={usersCount}
              suffix="+"
              title="Users"
              description="Total Users Engaged with the App "
            />
            <Divider orientation="vertical" sx={{ display: { xs: "none", md: "block" }, ml: 0 }} />
          </Grid>
          <Grid item xs={12} md={4}>
            <DefaultCounterCard
              count={trackedCount}
              title="Tracking"
              description="Total Number of Tracked Cars Entered"
            />
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Counters;
