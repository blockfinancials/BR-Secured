import React, { useState, useEffect } from "react";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Route, Routes } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";

// Import components
import MainContent from "./maincontent";
import PrivacyPolicy from "./policies/privacyPolicy";
import TermsOfService from "./policies/termsOfService";
import CookieBanner from "./components/modals/cookieBanner";
import LoadingScreen from "./loading";

// Import data and utilities
import { wallets } from "./utility/wallets";
import { theme } from "./theme";

// Import styles
import "./App.css";

function App() {
  const [cryptocurrencies, setCryptocurrencies] = useState([]);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [openWalletbaseModal, setOpenWalletbaseModal] = useState(false);
  const [openWalletSelectionModal, setOpenWalletSelectionModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCryptocurrencies();
    
    // Initial fade-in animation for page load
    document.body.classList.add('fade-in');
    
    // Set a timeout for the loading screen
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);
    
    return () => {
      document.body.classList.remove('fade-in');
      clearTimeout(timer);
    };
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

  if (isLoading) {
    return <LoadingScreen />;
  }

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