// components/InfoSection.js
import React from 'react';
import { Box, Typography } from '@mui/material';
import Cryptowallet from "./assets/Cryptowallet.png";

const InfoSection = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "center",
        mx: "auto",
        textAlign: { xs: "center", md: "left" },
        mt: -10
      }}
    >
      <Box
        sx={{
          width: { xs: 250, md: 400 },
          height: { xs: 250, md: 400 },
          borderRadius: "12px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mr: { md: 4 },
          mb: { xs: -5, md: 0 },
        }}
      >
        <img
          src={Cryptowallet}
          alt="Crypto Wallet Illustration"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </Box>

      <Typography
        variant="body1"
        sx={{
          fontSize: { xs: "0.7rem", md: "1.2rem" },
          color: "white",
          maxWidth: { xs: "90%", md: "50%" },
        }}
      >
        Every step forward is a step towards innovation. Stay secure, stay
        informed, and continue to explore the endless possibilities that the
        digital realm has to offer.
      </Typography>
    </Box>
  );
};

export default InfoSection;