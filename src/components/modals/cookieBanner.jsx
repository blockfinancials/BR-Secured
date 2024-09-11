import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Link, useMediaQuery } from '@mui/material';
import { styled } from '@mui/system';
import { useTheme } from '@mui/material/styles';

const StyledButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  borderRadius: "22px",
  padding: "10px 16px",
  fontSize: "0.9rem",
  backgroundColor: "#3498db",
  height: "48px",
  minWidth: "120px",
  "&:hover": {
    backgroundColor: "#2980b9",
  },
  [theme.breakpoints.down('sm')]: {
    height: "40px",
    minWidth: "100px",
    fontSize: "0.8rem",
    padding: "8px 12px",
  },
}));

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
        p: isMobile ? 2 : 3,
        zIndex: 9999,
      }}
    >
      <Typography 
        variant={isMobile ? "body2" : "body1"} 
        mb={isMobile ? 1 : 2} 
        textAlign="center"
        sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}
      >
        We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
        <Link 
          href="/privacy-policy" 
          color="inherit" 
          sx={{ 
            ml: 1,
            display: isMobile ? 'block' : 'inline',
            mt: isMobile ? 1 : 0
          }}
        >
          Learn more
        </Link>
      </Typography>
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: isMobile ? 1 : 2,
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center'
        }}
      >
        <StyledButton onClick={handleDecline} fullWidth={isMobile}>
          <Typography
            variant="caption"
            noWrap
            sx={{
              color: "white",
              fontSize: isMobile ? "13px" : "15px",
              textTransform: "capitalize",
            }}
          >
            Decline
          </Typography>
        </StyledButton>
        <StyledButton onClick={handleAccept} fullWidth={isMobile}>
          <Typography
            variant="caption"
            noWrap
            sx={{
              color: "white",
              fontSize: isMobile ? "13px" : "15px",
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