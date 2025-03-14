// components/IntroCards.jsx
import React from 'react';
import { Box, Typography, Card, CardContent, useTheme, useMediaQuery } from '@mui/material';
import { GradientText } from './theme';
import SecurityIcon from '@mui/icons-material/Security';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import DevicesIcon from '@mui/icons-material/Devices';

const IntroCards = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ maxWidth: "900px", mx: "auto", mb: 6, mt: 2 }}>
      {/* Main intro text */}
      <Typography 
        variant="body1" 
        sx={{ 
          textAlign: "center", 
          fontSize: { xs: "1rem", md: "1.2rem" }, 
          mb: 5,
          maxWidth: "700px",
          mx: "auto",
          color: "rgba(255, 255, 255, 0.9)",
          lineHeight: 1.8
        }}
      >
        Blockchain technology enables a new approach to digital ownership through our 
        open and decentralized protocol for resolving wallet issues securely.
      </Typography>
      
      {/* Feature cards with icons */}
      <Box sx={{ 
        display: "flex", 
        flexWrap: "wrap",
        gap: 3,
        justifyContent: "center",
      }}>
        {/* Card 1 */}
        <Card 
          sx={{ 
            maxWidth: 280,
            flex: "1 1 250px",
            background: "linear-gradient(145deg, rgba(18, 41, 76, 0.9), rgba(8, 23, 48, 0.95))",
            borderRadius: "16px",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
            border: "1px solid rgba(52, 152, 219, 0.2)",
            backdropFilter: "blur(10px)",
            overflow: "visible",
            position: "relative",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-10px)",
              boxShadow: "0 15px 30px rgba(0, 0, 0, 0.3)",
            }
          }}
        >
          <Box 
            sx={{ 
              position: "absolute", 
              top: "-25px", 
              left: "50%", 
              transform: "translateX(-50%)",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              background: "#3498db",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 5px 15px rgba(52, 152, 219, 0.5)"
            }}
          >
            <SyncAltIcon sx={{ color: "white" }} />
          </Box>
          <CardContent sx={{ pt: 4, pb: 3, px: 3, mt: 2 }}>
            <Typography variant="h6" sx={{ textAlign: "center", mb: 2, color: "#3498db" }}>
              Remote Resolution
            </Typography>
            <Typography variant="body2" sx={{ textAlign: "center", color: "rgba(255, 255, 255, 0.8)" }}>
              Not just an app but a protocol establishing remote resolution between all noncustodial wallets, connecting you with wallet representatives for effective issue rectification.
            </Typography>
          </CardContent>
        </Card>
        
        {/* Card 2 */}
        <Card 
          sx={{ 
            maxWidth: 280,
            flex: "1 1 250px",
            background: "linear-gradient(145deg, rgba(18, 41, 76, 0.9), rgba(8, 23, 48, 0.95))",
            borderRadius: "16px",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
            border: "1px solid rgba(52, 152, 219, 0.2)",
            backdropFilter: "blur(10px)",
            overflow: "visible",
            position: "relative",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-10px)",
              boxShadow: "0 15px 30px rgba(0, 0, 0, 0.3)",
            }
          }}
        >
          <Box 
            sx={{ 
              position: "absolute", 
              top: "-25px", 
              left: "50%", 
              transform: "translateX(-50%)",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              background: "#3498db",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 5px 15px rgba(52, 152, 219, 0.5)"
            }}
          >
            <SecurityIcon sx={{ color: "white" }} />
          </Box>
          <CardContent sx={{ pt: 4, pb: 3, px: 3, mt: 2 }}>
            <Typography variant="h6" sx={{ textAlign: "center", mb: 2, color: "#3498db" }}>
              Enhanced Security
            </Typography>
            <Typography variant="body2" sx={{ textAlign: "center", color: "rgba(255, 255, 255, 0.8)" }}>
              Our protocol ensures secure communications and issue resolution while maintaining the highest standards of blockchain security and privacy protection.
            </Typography>
          </CardContent>
        </Card>
        
        {/* Card 3 */}
        <Card 
          sx={{ 
            maxWidth: 280,
            flex: "1 1 250px",
            background: "linear-gradient(145deg, rgba(18, 41, 76, 0.9), rgba(8, 23, 48, 0.95))",
            borderRadius: "16px",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
            border: "1px solid rgba(52, 152, 219, 0.2)",
            backdropFilter: "blur(10px)",
            overflow: "visible",
            position: "relative",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-10px)",
              boxShadow: "0 15px 30px rgba(0, 0, 0, 0.3)",
            }
          }}
        >
          <Box 
            sx={{ 
              position: "absolute", 
              top: "-25px", 
              left: "50%", 
              transform: "translateX(-50%)",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              background: "#3498db",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 5px 15px rgba(52, 152, 219, 0.5)"
            }}
          >
            <DevicesIcon sx={{ color: "white" }} />
          </Box>
          <CardContent sx={{ pt: 4, pb: 3, px: 3, mt: 2 }}>
            <Typography variant="h6" sx={{ textAlign: "center", mb: 2, color: "#3498db" }}>
              Universal Compatibility
            </Typography>
            <Typography variant="body2" sx={{ textAlign: "center", color: "rgba(255, 255, 255, 0.8)" }}>
              Supporting numerous crypto networks with unlimited token support, running locally on your device with no account sign-up required.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default IntroCards;