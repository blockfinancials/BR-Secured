import React from "react";
import { Modal, Box, Typography, Grid, Button, Divider } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Walleticon from "./assets/Walleticon.png";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});

const WalletbaseModal = ({ open, onClose, onOpenWalletSelection }) => {
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
            textAlign: "center",
          }}
          className="custom-scrollbar"
        >
          <Typography
            variant="h6"
            component="h2"
            sx={{
              mb: 2,
              color: "black",
              textTransform: "capitalize",
              fontWeight: 600,
              fontSize: "18px",
            }}
          >
            Get Started
          </Typography>
          <Button
            variant="contained"
            onClick={onOpenWalletSelection}
            sx={{
              mb: 2,
              textTransform: "capitalize",
              backgroundColor: "#e0e0e0",
              color: "black",
              borderRadius: "30px",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            Connect
          </Button>
          <Divider sx={{ mb: 2 }}></Divider>
          <Button
            variant="contained"
            onClick={onOpenWalletSelection}
            sx={{
              mt: 2,
              textTransform: "capitalize",
              backgroundColor: "#007BFF",
              color: "white",
              borderRadius: "30px",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            Connect with Web3
          </Button>
          <Button
            display="flex"
            alignItems="center"
            variant="contained"
            onClick={onOpenWalletSelection}
            sx={{
              mt: 1,
              textTransform: "capitalize",
              backgroundColor: "#4CAF50",
              color: "white",
              borderRadius: "30px",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            <img
              src={Walleticon}
              alt="Chain Icon"
              style={{ marginRight: "8px", width: "20px", height: "20px" }}
            />
            WalletConnect
          </Button>
          <Typography
            variant="body2"
            sx={{
              mt: 2,
              fontSize: "10px",
              color: "grey",
            }}
          >
            By connecting your wallet you agree to our Terms of Service and
            Privacy Policy.
          </Typography>
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

export default WalletbaseModal;
