import React from 'react';
import { Typography, Container, Box, ThemeProvider, createTheme, List, ListItem, ListItemText } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontFamily: '"Passion One", sans-serif',
          fontWeight: 700,
          fontSize: '4rem',
          color: '#3498db',
          marginBottom: '30px',
          textAlign: 'center',
          wordBreak: 'break-word',
        },
        h2: {
          fontFamily: '"Passion One", sans-serif',
          color: '#3498db',
          marginTop: '40px',
          marginBottom: '20px',
        },
      },
    },
  },
});

const PrivacyPolicy = () => (
  <ThemeProvider theme={theme}>
    <Box sx={{ bgcolor: '#0f1724', color: 'white', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="md">
        <Typography variant="h1">Privacy Policy</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          <strong>Effective Date:</strong> July 15, 2023 | <strong>Last Updated:</strong> February 22, 2024
        </Typography>

        <Typography variant="h2">Introduction</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Welcome to Blockchain Rectification ("Company," "we," "our," or "us"). We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy explains how we facilitate connections and manage information when you use our website [yourdomain.com] and any related services (collectively, the "Site").
        </Typography>

        <Typography variant="h2">Our Role as a Connection Facilitator</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Blockchain Rectification operates as a secure medium for connecting users with blockchain services and solutions. We want to emphasize that:
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="We do not collect or store personal information beyond what is necessary to facilitate connections." />
          </ListItem>
          <ListItem>
            <ListItemText primary="We do not collect or store credit card details or other sensitive financial information." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Our primary function is to act as a bridge between users and blockchain services, ensuring secure and efficient connections without unnecessarily holding onto user data." />
          </ListItem>
        </List>

        <Typography variant="h2">Information We Facilitate</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          To provide our services, we may facilitate the transmission of the following types of information:
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Blockchain Identifiers: Public keys, wallet addresses, or other blockchain-specific identifiers necessary for connections." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Connection Data: Information required to establish and maintain secure connections between users and blockchain services." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Technical Information: Non-personal data such as device type, browser information, and IP address, used solely for maintaining service quality and security." />
          </ListItem>
        </List>

        <Typography variant="h2">How We Handle Information</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Our approach to information handling is designed to maximize privacy and security:
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Minimal Collection: We only facilitate the transmission of information absolutely necessary for our services to function." />
          </ListItem>
          <ListItem>
            <ListItemText primary="No Persistent Storage: Personal information is not stored on our servers beyond the duration of the active connection session." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Encryption in Transit: All data transmitted through our platform is encrypted to ensure security." />
          </ListItem>
          <ListItem>
            <ListItemText primary="No Sale of Data: We do not sell, trade, or otherwise transfer user information to third parties." />
          </ListItem>
        </List>

        <Typography variant="h2">Use of Information</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          The information facilitated through our platform is used solely for:
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Establishing and maintaining secure connections between users and blockchain services." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Improving the functionality and security of our connection services." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Complying with legal obligations, if required." />
          </ListItem>
        </List>

        {/* <Typography variant="h2">Contact Us</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          If you have any questions or concerns about this Privacy Policy or our information handling practices, please contact us at:
        </Typography>
        <Typography variant="body1" component="address" sx={{ fontStyle: 'normal' }}>
          Blockchain Rectification<br />
          [Your Address]<br />
          [Your Email Address]<br />
          [Your Phone Number]
        </Typography> */}
      </Container>
    </Box>
  </ThemeProvider>
);

export default PrivacyPolicy;