import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { keyframes } from '@mui/system';
import BlockchainLogo from "./assets/logo.svg";

const pulse = keyframes`
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(52, 152, 219, 0.7);
  }
  
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 15px rgba(52, 152, 219, 0);
  }
  
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(52, 152, 219, 0);
  }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const LoadingScreen = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0f1724',
        zIndex: 9999,
        animation: `${fadeIn} 0.5s ease-in-out`,
      }}
    >
      <Box
        sx={{
          width: 120,
          height: 120,
          borderRadius: '20%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(52, 152, 219, 0.1)',
          marginBottom: 4,
          animation: `${pulse} 1.5s infinite`,
          position: 'relative',
        }}
      >
        <img 
          src={BlockchainLogo} 
          alt="Blockchain Rectification" 
          style={{ 
            width: '80%', 
            height: '80%',
            objectFit: 'contain',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '20%',
            border: '2px solid rgba(52, 152, 219, 0.5)',
          }}
        />
      </Box>
      
      <Typography 
        variant="h5" 
        sx={{ 
          color: '#3498db',
          fontWeight: 700,
          marginBottom: 3,
          fontFamily: '"Passion One", sans-serif',
        }}
      >
        BLOCKCHAIN RECTIFICATION
      </Typography>
      
      <CircularProgress 
        size={40} 
        thickness={4} 
        sx={{ 
          color: '#3498db',
          '& .MuiCircularProgress-circle': {
            strokeLinecap: 'round',
          }
        }} 
      />
      
      <Typography 
        variant="body2" 
        sx={{ 
          color: 'rgba(255, 255, 255, 0.7)',
          marginTop: 2,
          fontWeight: 300,
        }}
      >
        Initializing secure connection...
      </Typography>
    </Box>
  );
};

export default LoadingScreen;