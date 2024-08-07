import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Typography, Box, Container, Stack } from "@mui/material";
import { styled } from "@mui/system";
import "./App.css";
import Categories from "./categories";
import WalletModal from "./wallet-modal";
import WalletSelectionModal from "./walletselectionmodal";
import { SelectMinimal } from "./mui-treasury/select-minimal";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CryptoCarousel from "./cryptocarousel";
import {wallets} from "./utility/wallets";
import HomeFooter from "./Homefooter"
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
  const [cryptocurrencies, setCryptocurrencies] = useState([]);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [openModal, setOpenModal] = useState(false);
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
    setSelectedWallet(wallets.find(wallet => wallet.id === event.target.value));
  };

  const handleConnectWallet = () => {
    if (selectedWallet) {
      setOpenModal(true);
    } else {
      setOpenWalletSelectionModal(true);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedWallet(null);
  };

  const handleCloseWalletSelectionModal = () => {
    setOpenWalletSelectionModal(false);
  };

  const handleSelectWallet = (wallet) => {
    setSelectedWallet(wallet);
    setOpenWalletSelectionModal(false);
    setOpenModal(true);
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
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "3.5rem", sm: "5rem", md: "8rem" },
                lineHeight: { xs: 1.2, sm: 1.1, md: 1 },
              }}
            >
              Blockchain Rectification
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Every digital artwork on Upside is authentic and truly unique.
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Blockchain technology makes this new approach to digital ownership
              possible. Open and decentralized protocol for syncing various
              Wallets issues on Secure Server.
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              This is not an app but a protocol that establishes a remote
              resolution between all noncustodial wallet It is an online server
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
              You will be on a chat with an Artificial Intelligence Robot with
              zero Human interference.
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 2 , sm: 2 }}
              justifyContent="center"
              sx={{ mt: 4 }}
            >
              <SelectMinimal
              value={selectedWallet ? selectedWallet.id : ""}
              onChange={handleWalletChange}
              menuItems={wallets.map(wallet => ({
                value: wallet.id,
                label: wallet.name
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
          <Categories />

          <WalletModal
            open={openModal}
            onClose={handleCloseModal}
            selectedWallet={selectedWallet}
          />

          <WalletSelectionModal
            open={openWalletSelectionModal}
            onClose={handleCloseWalletSelectionModal}
            onSelectWallet={handleSelectWallet}
          />
        </Container>
      </Box>
      <HomeFooter />
    </ThemeProvider>
  );
}

export default App;
