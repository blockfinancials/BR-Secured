import React from 'react';
import { Box, Typography, Modal, CircularProgress } from '@mui/material';

const LoadingModal = ({ open }) => {
  return (
    <Modal open={open}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "white",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <CircularProgress sx={{ mb: 2 }} />
        <Typography color="black">
          Connecting to wallet...
        </Typography>
      </Box>
    </Modal>
  );
};

export default LoadingModal;
