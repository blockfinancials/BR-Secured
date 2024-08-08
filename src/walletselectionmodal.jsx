import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  InputAdornment,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { wallets } from "./utility/wallets";
import WalletModal from "./wallet-modal";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});

const WalletSelectionModal = ({ open, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [openWalletModal, setOpenWalletModal] = useState(false);

  const filteredWallets = wallets.filter((wallet) =>
    wallet.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectWallet = (wallet) => {
    setSelectedWallet(wallet);
    setOpenWalletModal(true);
  };

  const handleCloseWalletModal = () => {
    setOpenWalletModal(false);
    setSelectedWallet(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 350,
            maxHeight: 500,
            bgcolor: "white",
            borderRadius: "40px",
            boxShadow: 24,
            p: 3,
            paddingRight: "20px",
            overflowY: "auto",
            overflowX: "hidden",
          }}
          className="custom-scrollbar"
        >
          <Typography
            variant="h6"
            component="h2"
            sx={{
              mb: 2,
              textAlign: "center",
              color: "black",
              textTransform: "capitalize",
              fontWeight: 600,
            }}
          >
            Select a wallet
          </Typography>
          <Divider sx={{ mb: 2 }}></Divider>
          <TextField
            fullWidth
            placeholder="Search wallet"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "36px",
                backgroundColor: "#f5f5f5",
                paddingLeft: "15px",
                fontSize: "12px",
                color: "black",
                fontFamily: "Poppins, sans-serif",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" sx={{ color: "black" }} />
                </InputAdornment>
              ),
            }}
          />
          <Grid container spacing={2}>
            {filteredWallets.map((wallet) => (
              <Grid item xs={4} key={wallet.id}>
                <Button
                  onClick={() => handleSelectWallet(wallet)}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                    height: "90px",
                    padding: "8px",
                    backgroundColor: "#f5f5f5",
                    borderRadius: "12px",
                    "&:hover": { bgcolor: "#e0e0e0" },
                  }}
                >
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      mb: 1,
                      border: "2px solid white",
                      backgroundColor: "white",
                      borderRadius: "12px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={wallet.image}
                      alt={wallet.name}
                      style={{
                        width: "auto",
                        height: "auto",
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                  <Typography
                    variant="caption"
                    noWrap
                    sx={{
                      fontSize: "12px",
                      fontWeight: 400,
                      color: "black",
                      textTransform: "capitalize",
                      mb: -0.5,
                    }}
                  >
                    {wallet.name}
                  </Typography>
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Modal>
      
      <WalletModal
        open={openWalletModal}
        onClose={handleCloseWalletModal}
        selectedWallet={selectedWallet}
      />
    </ThemeProvider>
  );
};

export default WalletSelectionModal;