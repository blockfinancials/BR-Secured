import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Typography, Box, Container, Stack } from "@mui/material";
import { styled } from "@mui/system";
import "./App.css";
import Categories from "./categories";
import WalletbaseModal from "./walletbasemodal";
import WalletSelectionModal from "./walletselectionmodal";
import { SelectMinimal } from "./mui-treasury/select-minimal";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CryptoCarousel from "./cryptocarousel";
import { wallets } from "./utility/wallets";
import HomeFooter from "./Homefooter";
import Cryptowallet from "./assets/Cryptowallet.png";
//import Heroimg from "./assets/heroimg.png";
import Partners from "./components/partners";
import { Route, Routes } from "react-router-dom";
import PrivacyPolicy from "./policies/privacyPolicy";
import TermsOfService from "./policies/termsOfService";
//import { Link, useNavigate } from "react-router-dom";

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
          textAlign: "center", // Center align the text
          wordBreak: "break-word", // Allow word breaking for wrapping
        },
      },
    },
  },
});

const StyledButton = styled(Button)(({ theme }) => ({
  color: "#3498db",
  borderRadius: "22px",
  padding: "14px 20px", // Adjust padding to match select height
  fontSize: "0.9rem",
  backgroundColor: "#3498db",
  height: "56px", // Set a fixed height to match the select
  minWidth: "200px", // Set a minimum width if needed
  "&:hover": {
    backgroundColor: "#2980b9",
  },
}));

function App() {
  //const navigate = useNavigate();

  const [cryptocurrencies, setCryptocurrencies] = useState([]);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [openWalletbaseModal, setOpenWalletbaseModal] = useState(false);
  const [openWalletSelectionModal, setOpenWalletSelectionModal] =
    useState(false);

  useEffect(() => {
    fetchCryptocurrencies();
  }, []);

  const fetchCryptocurrencies = async () => {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            ids: "bitcoin,ethereum,binancecoin,ripple,cardano,solana,polkadot,dogecoin,tether,usd-coin,avalanche-2,chainlink,matic-network,stellar,cosmos,algorand",
            order: "market_cap_desc",
            per_page: 16,
            page: 1,
            sparkline: false,
            price_change_percentage: "1h",
          },
        }
      );
      setCryptocurrencies(response.data);
    } catch (error) {
      console.error("Error fetching cryptocurrency data:", error);
    }
  };

  const handleWalletChange = (event) => {
    setSelectedWallet(
      wallets.find((wallet) => wallet.id === event.target.value)
    );
  };

  const handleConnectWallet = () => {
    setOpenWalletbaseModal(true);
  };

  const handleCloseWalletbaseModal = () => {
    setOpenWalletbaseModal(false);
  };

  const handleCloseWalletSelectionModal = () => {
    setOpenWalletSelectionModal(false);
  };

  const handleSelectWallet = (wallet) => {
    setSelectedWallet(wallet);
    setOpenWalletSelectionModal(false);
  };

  const handleOpenWalletSelectionModal = () => {
    setOpenWalletbaseModal(false);
    setOpenWalletSelectionModal(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: "#0f1724", color: "white", minHeight: "100vh" }}>
        <CryptoCarousel cryptocurrencies={cryptocurrencies} />
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              maxWidth: 800,
              width: "100%",
              px: 2,
              mt: { xs: 7, md: 5 },
              position: "relative",
            }}
          >
            {/* <img
    src={Heroimg}
    alt="Top Left"
    style={{
      position: "absolute",
      top: 0,
      left: -390,
      width: "500px",
      height: "350px",
      display: { xs: "none", md: "block" }, // Hide on small screens
    }}
  />
  <img
    src={Heroimg}
    alt="Bottom Right"
    style={{
      position: "absolute",
      bottom: -60,
      right: -450,
      width: "500px",
      height: "350px",
      display: { xs: "none", md: "block" }, // Hide on small screens
    }}
  /> */}
            <Typography
              variant="h1"
              sx={{
                mt: { md: 5 },
                fontSize: { xs: "3.3rem", sm: "5rem", md: "8rem" },
                lineHeight: { xs: 1.2, sm: 1.1, md: 1 },
              }}
            >
              Blockchain Rectification
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Blockchain technology makes this new approach to digital ownership
              possible. Open and decentralized protocol for syncing various
              Wallets issues on Secure Server.
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              This is not an app but a protocol that establishes a remote
              resolution between all noncustodial wallet. It is an online server
              which gets you across to every wallet representative to enable
              effective complain and rectification of issues.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: 2,
                color: "#3498db",
                fontWeight: "bold",
              }}
            >
              This is a protocol that supports a number crypto networks with
              unlimited token support. No account sign-up is required because it
              all runs locally on your device.
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 2, sm: 2 }}
              justifyContent="center"
              sx={{ mt: 4 }}
            >
              <SelectMinimal
                value={selectedWallet ? selectedWallet.id : ""}
                onChange={handleWalletChange}
                menuItems={wallets.map((wallet) => ({
                  value: wallet.id,
                  label: wallet.name,
                }))}
                sx={{
                  minWidth: { xs: "100%", sm: "auto" },
                  "& .MuiSelect-select": {
                    fontSize: { xs: "0.8rem", sm: "0.9rem" },
                  },
                }}
              />
              <StyledButton onClick={handleConnectWallet}>
                <Typography
                  variant="caption"
                  noWrap
                  sx={{
                    color: "white",
                    fontSize: "15px",
                    textTransform: "capitalize",
                  }}
                >
                  Connect Wallet
                </Typography>
              </StyledButton>
            </Stack>
          </Box>
          <Partners />
          <Categories />

          {/* Render WalletbaseModal outside of Routes */}
          <WalletbaseModal
            open={openWalletbaseModal}
            onClose={handleCloseWalletbaseModal}
            onOpenWalletSelection={handleOpenWalletSelectionModal}
          />

          <WalletSelectionModal
            open={openWalletSelectionModal}
            onClose={handleCloseWalletSelectionModal}
            onSelectWallet={handleSelectWallet}
          />
        </Container>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // Stack vertically on small screens, horizontally on larger screens
          alignItems: "center",
          justifyContent: "center",
          mb: 4, // Add margin-bottom to separate from the footer
          mx: "auto", // Center the whole container
          textAlign: { xs: "center", md: "left" }, // Center text on small screens, left align on larger screens
        }}
      >
        <Box
          sx={{
            width: { xs: 250, md: 400 }, // Increase width for different screen sizes
            height: { xs: 250, md: 400 }, // Increase height for different screen sizes
            borderRadius: "12px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mr: { md: 4 }, // Add margin-right on larger screens to separate from the text
            mb: { xs: -5, md: 0 }, // Add margin-bottom on small screens for spacing
          }}
        >
          <img
            src={Cryptowallet}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain", // Ensure the image fits within the box without distortion
            }}
          />
        </Box>

        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "0.7rem", md: "1.2rem" }, // Adjust font size based on screen size
            color: "white",
            maxWidth: { xs: "90%", md: "50%" }, // Limit the width of the text
          }}
        >
          Every step forward is a step towards innovation. Stay secure, stay
          informed, and continue to explore the endless possibilities that the
          digital realm has to offer.
        </Typography>
      </Box>

      <HomeFooter />
      <Routes>
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
