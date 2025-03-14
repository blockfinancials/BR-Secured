// components/MainContent.js
import React from "react";
import { Typography, Box, Container, Stack, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { SelectMinimal } from "./mui-treasury/select-minimal"

// Import styled components from theme
import { StyledButton, FeatureSection, GradientText } from "./theme";

// Import components
import CryptoCarousel from "./cryptocarousel";
import Partners from "./components/partners"
import Categories from "./categories";
import HomeFooter from "./Homefooter";
import IntroCards from "./introcards";
import WalletbaseModal from "./walletbasemodal";
import WalletSelectionModal from "./walletselectionmodal";
import InfoSection from "./infosection";
// Import utility
import { wallets } from "./utility/wallets";
import FAQSection from "./faq";

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ bgcolor: "background.default", color: "text.primary", minHeight: "100vh" }}>
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
              textShadow: "0 2px 10px rgba(52, 152, 219, 0.3)",
            }}
          >
            Blockchain Rectification
          </Typography>
          
          <IntroCards />

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 2, sm: 2 }}
            justifyContent="center"
            sx={{ mt: 4, mb: 6 }}
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
            <StyledButton 
              onClick={handleConnectWallet}
              sx={{
                boxShadow: "0 4px 14px rgba(52, 152, 219, 0.3)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 20px rgba(52, 152, 219, 0.4)",
                }
              }}
            >
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
        <FAQSection />
        <InfoSection />

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
      <HomeFooter />
    </Box>
  );
}

export default MainContent;