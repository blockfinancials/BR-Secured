import React, { useState } from "react";
import {
  Button,
  Box,
  Typography,
  Stack,
  Grid,
  Modal,
  Fade,
  Backdrop,
  Container,
} from "@mui/material";
import Dapps from "./assets/dapps.svg";
import Validate from "./assets/padlock.svg";
import Swap from "./assets/swap.svg";
import Stake from "./assets/stake.svg";
import Wallet from "./assets/wallet.svg";
import NFT from "./assets/nft.svg";
import Security from "./assets/security.svg";
import Support from "./assets/support.svg";
import Settings from "./assets/settings.svg";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontFamily: '"Passion One", sans-serif',
          fontWeight: 700,
          fontSize: "8rem",
          color: "#3498db",
          marginBottom: "30px",
          textAlign: "center",
          wordBreak: "break-word",
        },
      },
    },
  },
});
const Categories = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleOpenModal = (category) => {
    setSelectedCategory(category);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const categories = [
    {
      title: "Connect to Dapps",
      description: "Error resolution for Dapp connections",
      icon: Dapps,
    },
    {
      title: "Validation",
      description: "Secure validation processes",
      icon: Validate,
    },
    {
      title: "Swap Tokens",
      description: "Seamless token exchanges",
      icon: Swap,
    },
    {
      title: "Stake Assets",
      description: "Earn rewards through staking",
      icon: Stake,
    },
    {
      title: "Wallet Management",
      description: "Secure asset management",
      icon: Wallet,
    },
    {
      title: "NFT Marketplace",
      description: "Trade unique digital collectibles",
      icon: NFT,
    },
    {
      title: "Security Center",
      description: "Enhance account protection",
      icon: Security,
    },
    {
      title: "Support",
      description: "Get assistance and information",
      icon: Support,
    },
    {
      title: "Settings",
      description: "Customize your experience",
      icon: Settings,
    },
  ];

  return (
    <Box sx={{ mt: 12 }}>
      <Box
        sx={{
          maxWidth: 1200,
          margin: "0 auto",
          backgroundColor: "rgba(5, 17, 36, 0.8)",
          borderRadius: "20px",
          overflow: "hidden",
          border: "4px solid rgba(52, 152, 219, 0.2)",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "1.5rem", sm: "5rem", md: "2.2rem" },
            lineHeight: { xs: 1.2, sm: 1.1, md: 1 },
           mt: "20px",
           mb: "-5px"
          }}
        >
          Make Your Selection Below
        </Typography>
        <Box sx={{ padding: { xs: 2, sm: 4, md: 6 } }}>
          <Grid container spacing={3} justifyContent="center">
            {categories.map((category, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box
                  onClick={() => handleOpenModal(category)}
                  sx={{
                    backgroundColor: "rgba(8, 23, 48, 0.8)",
                    p: 3,
                    borderRadius: "16px",
                    border: "1px solid rgba(52, 152, 219, 0.3)",
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 8px 25px rgba(52, 152, 219, 0.25)",
                      backgroundColor: "rgba(12, 36, 73, 0.8)",
                    },
                    "&:active": {
                      transform: "translateY(0)",
                      boxShadow: "0 4px 15px rgba(52, 152, 219, 0.25)",
                    },
                  }}
                >
                  <Stack alignItems="center" spacing={2}>
                    <Box
                      sx={{
                        p: 2,
                        width: "70px",
                        height: "70px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#3498db",
                      }}
                    >
                      <img
                        color={"black"}
                        height="40px"
                        width="40px"
                        src={category.icon}
                        alt={category.title}
                      />
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{ color: "#fff", fontWeight: 600 }}
                    >
                      {category.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                    >
                      {category.description}
                    </Typography>
                  </Stack>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "rgba(8, 23, 48, 0.95)",
              border: "2px solid rgba(52, 152, 219, 0.5)",
              borderRadius: "20px",
              boxShadow: "0 0 30px rgba(52, 152, 219, 0.3)",
              p: 4,
            }}
          >
            <Typography
              variant="h5"
              component="h2"
              color="#fff"
              fontWeight={600}
            >
              {selectedCategory?.title}
            </Typography>
            <Typography sx={{ mt: 2, color: "rgba(255, 255, 255, 0.7)" }}>
              {selectedCategory?.description}
            </Typography>
            <Button
              onClick={handleCloseModal}
              sx={{
                mt: 3,
                bgcolor: "#3498db",
                color: "#fff",
                "&:hover": {
                  bgcolor: "#2980b9",
                },
              }}
            >
              Close
            </Button>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default Categories;
