import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Link } from '@mui/material';
import { styled } from '@mui/system';

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

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (cookiesAccepted === null) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookiesAccepted', 'false');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        bgcolor: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        p: 3,
        zIndex: 9999,
      }}
    >
      <Typography variant="body1" mb={2} textAlign="center">
        We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
        <Link href="/privacy-policy" color="inherit" sx={{ ml: 1 }}>
          Learn more
        </Link>
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <StyledButton onClick={handleDecline}>
          <Typography
            variant="caption"
            noWrap
            sx={{
              color: "white",
              fontSize: "15px",
              textTransform: "capitalize",
            }}
          >
            Decline
          </Typography>
        </StyledButton>
        <StyledButton onClick={handleAccept}>
          <Typography
            variant="caption"
            noWrap
            sx={{
              color: "white",
              fontSize: "15px",
              textTransform: "capitalize",
            }}
          >
            Accept
          </Typography>
        </StyledButton>
      </Box>
    </Box>
  );
};

export default CookieBanner;