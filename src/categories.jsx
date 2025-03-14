import React, { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Grid,
  useMediaQuery,
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
import { useTheme } from "@mui/material/styles";
import WalletbaseModal from "./walletbasemodal";
import WalletSelectionModal from "./walletselectionmodal";

const Categories = () => {
  const [openWalletbaseModal, setOpenWalletbaseModal] = useState(false);
  const [openWalletSelectionModal, setOpenWalletSelectionModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleOpenWalletbaseModal = (category) => {
    setSelectedCategory(category);
    setOpenWalletbaseModal(true);
  };

  const handleCloseWalletbaseModal = () => {
    setOpenWalletbaseModal(false);
  };

  const handleOpenWalletSelectionModal = () => {
    setOpenWalletbaseModal(false);
    setOpenWalletSelectionModal(true);
  };

  const handleCloseWalletSelectionModal = () => {
    setOpenWalletSelectionModal(false);
  };

  const handleSelectWallet = (wallet) => {
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
    <Box sx={{ mt: 12, mb: 10 }}>
      <Box
        sx={{
          maxWidth: 1200,
          margin: "0 auto",
          backgroundColor: "rgba(5, 17, 36, 0.8)",
          borderRadius: "20px",
          overflow: "hidden",
          border: "2px solid rgba(52, 152, 219, 0.2)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
          position: "relative",
        }}
      >
        <Box 
          sx={{ 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center",
            position: "relative",
            py: 3,
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: 0,
              left: "20%",
              right: "20%",
              height: "1px",
              background: "rgba(52, 152, 219, 0.3)",
            }
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
        </Box>
        
        <Box sx={{ padding: { xs: 2, sm: 4, md: 5 } }}>
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
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 8px 25px rgba(52, 152, 219, 0.25)",
                      backgroundColor: "rgba(12, 36, 73, 0.8)",
                      borderColor: "rgba(52, 152, 219, 0.7)",
                      "& .icon-container": {
                        transform: "rotateY(180deg)",
                      },
                    },
                    "&:active": {
                      transform: "translateY(0)",
                      boxShadow: "0 4px 15px rgba(52, 152, 219, 0.25)",
                    },
                  }}
                >
                  <Stack alignItems="center" spacing={2} sx={{ width: "100%" }}>
                    <Box
                      className="icon-container"
                      sx={{
                        p: 2,
                        width: "70px",
                        height: "70px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#3498db",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                        transition: "transform 0.6s ease",
                        perspective: "1000px",
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
                      sx={{ 
                        color: "#fff", 
                        fontWeight: 600,
                        fontSize: { xs: "1rem", md: "1.1rem" }
                      }}
                    >
                      {category.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ 
                        color: "rgba(255, 255, 255, 0.7)",
                        fontSize: { xs: "0.8rem", md: "0.9rem" }
                      }}
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

      {/* Add a "More to explore" section */}
      <Box 
        sx={{ 
          maxWidth: "600px", 
          margin: "3rem auto 0", 
          textAlign: "center",
          px: 2
        }}
      >
        <Typography 
          variant="body1"
          sx={{ 
            color: "rgba(255, 255, 255, 0.8)",
            fontStyle: "italic",
            position: "relative",
            display: "inline-block",
          }}
        >
          Explore all our services and resolve your blockchain issues in minutes with our
          smart contract rectification protocol.
          <Box 
            sx={{ 
              position: "absolute",
              bottom: "-10px",
              left: isMobile ? "10%" : "20%",
              right: isMobile ? "10%" : "20%",
              height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
            }}
          />
        </Typography>
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