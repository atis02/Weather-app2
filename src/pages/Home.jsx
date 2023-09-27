import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import CloudIcon from "@mui/icons-material/Cloud";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import Image from "./nasa.jpg";
import AirIcon from '@mui/icons-material/Air';

const styles = {
  paperContainer: {
    backgroundImage: `url(${Image})`,
  },
};
export default function Home() {
  const [city, SetCity] = useState("");
  const [Error, SetError] = useState("");
  const [data, Setdata] = useState({
    celcius: 10,
    city: "London",
    humidity: 10,
    speed: 2,
    Image: "",
  });

  const handleClick = () => {
    if (city !== "") {
      const BaseUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&limit=5&appid=d043e63c3832e1ef5e1163d7a2a361ec&units=metric`;
      axios.get(BaseUrl).then((response) => {
        console.log(response);
        let image = "";
        if (response.data.weather[0].main === "Clear") {
          image = (
            <WbSunnyIcon
              sx={{ color: "yellow", width: "150px", height: "130px" }}
            />
          );
        } else if (response.data.weather[0].main === "Clouds") {
          image = <CloudIcon sx={{ width: "150px", height: "130px" }} />;
        } else if (response.data.weather[0].main === "Rain") {
          image = <ThunderstormIcon sx={{ width: "150px", height: "130px" }} />;
        } else if (response.data.weather[0].main === "Drizzle") {
          image = <CloudQueueIcon sx={{ width: "150px", height: "130px" }} />;
        } else if (response.data.weather[0].main === "Mist") {
          image = <AcUnitIcon sx={{ width: "150px", height: "130px" }} />;
        } else {
          image = (
            <WbSunnyIcon
              sx={{ color: "yellow", width: "150px", height: "130px" }}
            />
          );
        }
        Setdata({
          ...data,
          celcius: response.data.main.temp,
          city: response.data.name,
          humidity: response.data.main.humidity,
          speed: response.data.wind.speed,
          Image: image,
        });
        SetError("");
      });
    }
  };

  return (
    <>
      <Box
        width="100vw"
        height="100vh"
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Stack
          background="blur 50px"
          direction="column"
          spacing={10}
          alignItems="center"
          justifyContent="center"
        >
          <Stack spacing={2}>
            <TextField
              id="city"
              label="Choose your city"
              variant="outlined"
              onChange={(event) => SetCity(event.target.value)}
            />
            <Button type="submit" onClick={handleClick}>
              Search
            </Button>
          </Stack>
          <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
            spacing={4}
          >
                {data.Image}
                <Typography fontSize="35px">{data.city}</Typography>
                <Typography fontSize="35px">
                  {Math.round(data.celcius)} °C
                </Typography>
              <Stack direction="row">
                Humidity: <WaterDropIcon />
                <Typography>{Math.round(data.humidity)}%</Typography>
              </Stack>
              <Stack direction="row" spacing="5px">
                <Typography >Wind: </Typography>
                <AirIcon/><Typography>{Math.round(data.speed)}km/h</Typography>
              </Stack>
          </Stack>
        </Stack>
      </Box>
    </>
  );
}
