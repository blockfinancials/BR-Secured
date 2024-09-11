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

const TermsOfService = () => (
  <ThemeProvider theme={theme}>
    <Box sx={{ bgcolor: '#0f1724', color: 'white', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="md">
        <Typography variant="h1">Terms of Service</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          <strong>Effective Date:</strong> July 15, 2023 | <strong>Last Updated:</strong> February 22, 2024
        </Typography>

        <Typography variant="h2">Introduction</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Welcome to Blockchain Rectification ("Company," "we," "our," or "us"). These Terms of Service ("Terms") govern your use of our website [yourdomain.com] and any other related services (collectively, the "Site") that act as a secure medium for connecting users with blockchain services and solutions. By accessing or using our Site, you agree to be bound by these Terms. If you do not agree to these Terms, you must not use our Site.
        </Typography>

        <Typography variant="h2">Our Services</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Blockchain Rectification provides a platform that facilitates secure connections between users and various blockchain services. We do not store personal data or financial information beyond what is necessary to establish these connections. Our primary functions include:
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Facilitating secure connections to blockchain services" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Providing a user interface for interacting with blockchain technologies" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Ensuring the integrity and security of connection data during transmission" />
          </ListItem>
        </List>

        <Typography variant="h2">Use of the Site</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          <strong>Eligibility:</strong> You must be at least 18 years old or the age of majority in your jurisdiction to use our Site.
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          <strong>Account Creation:</strong> While we do not store personal information, you may need to provide certain blockchain identifiers or connection data to use our services. You agree to provide accurate and up-to-date information as required for service functionality.
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          <strong>Security:</strong> You are responsible for maintaining the security of your blockchain access credentials and for any activity that occurs under your connection session.
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          <strong>Prohibited Activities:</strong> You agree not to:
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Use the Site for any unlawful purpose or in violation of these Terms" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Attempt to interfere with or disrupt the integrity or performance of our services" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Attempt to gain unauthorized access to our systems or other users' data" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Use the Site to transmit any viruses, malware, or other malicious code" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Engage in any activity that could damage, disable, or impair the functioning of the Site" />
          </ListItem>
        </List>

        <Typography variant="h2">Intellectual Property</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          All content on the Site, including but not limited to text, graphics, logos, and software, is the property of Blockchain Rectification or its licensors and is protected by copyright and other intellectual property laws.
        </Typography>

        <Typography variant="h2">Disclaimer of Warranties</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Our services are provided on an "as is" and "as available" basis. We do not warrant that the Site will be uninterrupted, error-free, or completely secure. We disclaim all warranties, express or implied, including but not limited to implied warranties of merchantability and fitness for a particular purpose.
        </Typography>

        <Typography variant="h2">Limitation of Liability</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          To the fullest extent permitted by applicable law, Blockchain Rectification shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of our services.
        </Typography>

        <Typography variant="h2">Changes to These Terms</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          We may update these Terms from time to time. We will notify you of any changes by posting the new Terms on this page and updating the "Last Updated" date. Your continued use of the Site after any changes indicates your acceptance of the new Terms.
        </Typography>

        {/* <Typography variant="h2">Contact Us</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          If you have any questions about these Terms, please contact us at:
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

export default TermsOfService;