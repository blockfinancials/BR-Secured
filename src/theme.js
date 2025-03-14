// theme.js
import { createTheme } from "@mui/material/styles";
import { styled } from "@mui/system";
import { Box, Button, Typography } from "@mui/material";

export const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
    h1: {
      fontFamily: '"Passion One", sans-serif',
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    body1: {
      lineHeight: 1.7,
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontFamily: '"Passion One", sans-serif',
          fontWeight: 700,
          fontSize: "8rem",
          color: "#3498db",
          marginBottom: "30px",
          textAlign: "center",
          wordBreak: "break-word",
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingTop: "1rem",
          paddingBottom: "1rem",
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#3498db",
      dark: "#2980b9",
    },
    background: {
      default: "#0f1724",
      paper: "#162032",
    },
    text: {
      primary: "#ffffff",
      secondary: "rgba(255, 255, 255, 0.7)",
    },
  },
});

// Styled components
export const StyledButton = styled(Button)(({ theme }) => ({
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

export const GradientText = styled(Typography)(({ theme }) => ({
  background: "linear-gradient(90deg, #3498db 0%, #00c0ff 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  textFillColor: "transparent",
  fontWeight: "bold",
  display: "inline-block",
}));

export const FeatureSection = styled(Box)(({ theme }) => ({
  borderRadius: "16px",
  padding: theme.spacing(3),
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  background: "rgba(255, 255, 255, 0.05)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
  },
}));