import React, { useState } from "react";
import {
  Button,
  Box,
  Typography,
  Stack,
  Grid
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
import Claim from "./assets/claim.svg";
import Migration from "./assets/migration.svg";

import Bridge from "./assets/bridge.svg";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import WalletbaseModal from "./walletbasemodal";
import WalletSelectionModal from "./walletselectionmodal"

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
  const [openWalletbaseModal, setOpenWalletbaseModal] = useState(false);
  const [openWalletSelectionModal, setOpenWalletSelectionModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleOpenWalletbaseModal = (category) => {
    setSelectedCategory(category);
    setOpenWalletbaseModal(true);
  };

  const handleCloseWalletbaseModal = () => {
    setOpenWalletbaseModal(false);
  };

  const handleOpenWalletSelectionModal = () => {
    setOpenWalletbaseModal(false); // Close the Walletbase modal
    setOpenWalletSelectionModal(true); // Open the WalletSelection modal
  };

  const handleCloseWalletSelectionModal = () => {
    setOpenWalletSelectionModal(false);
  };

  const handleSelectWallet = (wallet) => {
    // Handle wallet selection logic here
    console.log(`Selected wallet: ${wallet}`);
    handleCloseWalletSelectionModal();
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
      title: "Claim",
      description: "Securely Claim your Tokens",
      icon: Claim,
    },
    {
      title: "Migration",
      description: "Migration Error Assistance ",
      icon: Migration,
    },
    {
      title: "Swap Error",
      description: "Seamless error exchanges",
      icon: Swap,
    },
    {
      title: "Stake Errors",
      description: "Earn rewards through staking",
      icon: Stake,
    },
    {
      title: "Bridge Error",
      description: "Rectification of Bridge Error",
      icon: Bridge,
    },
    {
      title: "Support",
      description: "Get assistance and information",
      icon: Support,
    },
    {
      title: "Rectification",
      description: "Ensured solutions",
      icon: Settings,
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
            mb: "-5px",
          }}
        >
          Why Choose Us{" "}
        </Typography>
        <Box sx={{ padding: { xs: 2, sm: 4, md: 6 } }}>
          <Grid container spacing={3} justifyContent="center">
            {categories.map((category, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box
                  onClick={() => handleOpenWalletbaseModal(category)}
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

      <WalletbaseModal
        open={openWalletbaseModal}
        onClose={handleCloseWalletbaseModal}
        onOpenWalletSelection={handleOpenWalletSelectionModal}
        category={selectedCategory}
      />

      <WalletSelectionModal
        open={openWalletSelectionModal}
        onClose={handleCloseWalletSelectionModal}
        onSelectWallet={handleSelectWallet}
        category={selectedCategory}
      />
    </Box>
  );
};

export default Categories;
