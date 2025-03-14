import React, { useState } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FAQSection = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const faqData = [
    {
      id: 'panel1',
      title: "Wallet Rectification Protocol",
      content: "Our protocol provides a comprehensive solution for resolving blockchain wallet issues across multiple networks, ensuring secure and seamless wallet management."
    },
    {
      id: 'panel2',
      title: "Wallet Connection",
      content: "We use a secure, decentralized approach to connect and resolve issues with various cryptocurrency wallets, maintaining the highest standards of blockchain security."
    },
    {
      id: 'panel3',
      title: "Data Security",
      content: "We implement advanced encryption and follow strict privacy protocols to ensure your wallet and personal information remain completely confidential."
    },
    {
      id: 'panel4',
      title: "Supported Networks",
      content: "Our protocol supports multiple major blockchain networks, including Bitcoin, Ethereum, Binance Smart Chain, Solana, Cardano, and many more."
    },
    {
      id: 'panel5',
      title: "Account Requirements",
      content: "No account creation is required. Our protocol works directly with your existing wallets, providing a seamless and non-intrusive experience."
    }
  ];

  return (
    <Box sx={{ mt: 4, mb: 10 }}>
      <Box
        sx={{
          maxWidth: 1200,
          margin: "0 auto",
          backgroundColor: "rgba(5, 17, 36, 0.8)",
          borderRadius: "20px",
          overflow: "hidden",
          border: "2px solid rgba(52, 152, 219, 0.2)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
          position: "relative",
        }}
      >
        <Box 
          sx={{ 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center",
            position: "relative",
            py: 3,
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: 0,
              left: "20%",
              right: "20%",
              height: "1px",
              background: "rgba(52, 152, 219, 0.3)",
            }
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "1.5rem", sm: "5rem", md: "2.2rem" },
              lineHeight: { xs: 1.2, sm: 1.1, md: 1 },
              mt: "20px",
              mb: "-5px",
            }}
          >
            Frequently Asked Questions
          </Typography>
        </Box>
        
        <Container maxWidth="md" sx={{ py: 4 }}>
          {faqData.map((faq, index) => (
            <Accordion
              key={faq.id}
              expanded={expanded === faq.id}
              onChange={handleChange(faq.id)}
              sx={{
                backgroundColor: 'rgba(18, 41, 76, 0.9)',
                mb: 2,
                borderRadius: '12px',
                '&:before': {
                  display: 'none',
                },
                '&.Mui-expanded': {
                  margin: '12px 0',
                }
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: '#3498db' }} />}
                sx={{
                  '& .MuiAccordionSummary-content': {
                    alignItems: 'center',
                    display: 'flex',
                    gap: 2
                  }
                }}
              >
                <Box
                  sx={{
                    width: 30,
                    height: 30,
                    borderRadius: '50%',
                    backgroundColor: '#3498db',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography 
                    sx={{ 
                      color: 'white', 
                      fontWeight: 'bold',
                      fontSize: '1.2rem'
                    }}
                  >
                    {index + 1}
                  </Typography>
                </Box>
                <Typography sx={{ color: '#3498db', fontWeight: 600 }}>
                  {faq.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: 'rgba(255,255,255,0.7)' }}>
                  {faq.content}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Container>
      </Box>

      {/* "More to explore" section */}
      <Box 
        sx={{ 
          maxWidth: "600px", 
          margin: "3rem auto 0", 
          textAlign: "center",
          px: 2
        }}
      >
        <Typography 
          variant="body1"
          sx={{ 
            color: "rgba(255, 255, 255, 0.8)",
            fontStyle: "italic",
            position: "relative",
            display: "inline-block",
          }}
        >
          Got more questions? Our comprehensive support is just a click away.
          <Box 
            sx={{ 
              position: "absolute",
              bottom: "-10px",
              left: "20%",
              right: "20%",
              height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
            }}
          />
        </Typography>
      </Box>
    </Box>
  );
};

export default FAQSection;