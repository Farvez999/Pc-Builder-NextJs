import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";

const HeroSection = () => {
  return (
    <Box
      sx={{
        background:
          'url("https://media.istockphoto.com/id/1126678409/photo/3d-render-technology-store.jpg?s=170667a&w=0&k=20&c=eqlY1T49TMopf7gaLTqYz7QnYOjIJhNjIt1jIutVt64=")', // Update with the actual image file name
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "calc(100vh - 64px)", // Adjust the height as needed (excluding the header height)
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "#fff",
      }}
    >
      <Typography variant="h2" style={{ fontWeight: '800', color: "#000" }} component="h1" gutterBottom>
        Welcome To Star Tech
      </Typography>
      {/* <Typography variant="h5" style={{ fontWeight: "700", color: "#619A52" }} gutterBottom>
        Customize and create your dream PC!
      </Typography> */}

      <Link href={"/pc-builder"}>
        <Button variant="contained" color="primary" style={{ backgroundColor: "blue", fontWeight: "600" }} size="large">
          Get Started
        </Button>
      </Link>
    </Box>
  );
};

export default HeroSection;
