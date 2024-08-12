import React from 'react';
import { Box, Typography, Button, Modal } from '@mui/material';
import Error from "..//../assets/error.svg"

const ErrorModal = ({ open, onClose, errorMessage }) => {
  return (
    <Modal open={open} onClose={onClose}>
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
        <Box
          component="img"
          src={Error} // Replace with your image path
          alt="Error"
          sx={{
            width: "80px",
            height: "80px",
            mb: 2,
            mx: "auto",
          }}
        />
        <Typography
          color={"black"}
          variant="body1"
          sx={{ mb: 2 }}
        >
          {errorMessage}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={onClose}
          sx={{ width: "100%", borderRadius: "8px" }}
        >
          OK
        </Button>
      </Box>
    </Modal>
  );
};

export default ErrorModal;
