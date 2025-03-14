import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Paper, Fade, useMediaQuery } from '@mui/material';
import { styled } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import CookieIcon from '@mui/icons-material/Cookie';

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

const BannerContainer = styled(Paper)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  left: theme.spacing(2),
  right: theme.spacing(2),
  padding: theme.spacing(3),
  borderRadius: '16px',
  backgroundColor: 'rgba(20, 20, 22, 0.95)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
  color: '#fff',
  zIndex: 9999,
  maxWidth: '900px',
  margin: '0 auto',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  [theme.breakpoints.down('sm')]: {
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: '16px 16px 0 0',
    padding: theme.spacing(2),
  },
}));

const LearnMoreLink = styled('span')(({ theme }) => ({
  color: '#3498db',
  textDecoration: "underline",
  cursor: "pointer",
  fontWeight: 500,
  transition: 'color 0.2s',
  '&:hover': {
    color: '#2980b9',
  },
}));

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };
  
  useEffect(() => {
    // Small delay to make the banner appear with animation
    const timer = setTimeout(() => {
      const cookiesAccepted = localStorage.getItem('cookiesAccepted');
      if (cookiesAccepted === null) {
        setShowBanner(true);
      }
    }, 1000);
    
    return () => clearTimeout(timer);
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
    <Fade in={showBanner} timeout={800}>
      <BannerContainer elevation={4}>
        <Box sx={{ display: 'flex', gap: 2, mb: isMobile ? 2 : 3 }}>
          <CookieIcon color="primary" sx={{ fontSize: 28 }} />
          <Typography 
            variant="h6" 
            fontWeight={600}
            sx={{ fontSize: isMobile ? '1rem' : '1.125rem' }}
          >
            Cookie Consent
          </Typography>
        </Box>
        
        <Typography 
          variant="body2" 
          mb={isMobile ? 2 : 3} 
          sx={{ 
            fontSize: isMobile ? '0.875rem' : '0.95rem',
            lineHeight: 1.6,
            opacity: 0.9
          }}
        >
          We use cookies to enhance your experience, analyze site traffic, and personalize content. 
          By continuing to visit this site, you agree to our use of cookies.{" "}
          <LearnMoreLink 
            onClick={() => openInNewTab("/terms-of-service")}
          >
            Learn more
          </LearnMoreLink>
        </Typography>
        
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'flex-end', 
            gap: isMobile ? 1.5 : 2,
            flexDirection: isMobile ? 'column' : 'row',
            mt: isMobile ? 2 : 0
          }}
        >
          <StyledButton onClick={handleDecline} fullWidth={isMobile} variant="outlined" sx={{ borderColor: '#3498db' }}>
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
      </BannerContainer>
    </Fade>
  );
};

export default CookieBanner;