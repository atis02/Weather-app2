import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          width: "100vw",
          height: "100vh",
        }}
      >
        <Typography fontSize='50px'>Oops Not Found!</Typography>
        <Link to="/">
          <Button>Back to Home Page</Button>
        </Link>
      </Box>
    </>
  );
}
