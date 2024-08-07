import { Box, Container, Stack, Typography, useTheme } from "@mui/material";
import { socialHolder } from "./utility/navLinks";
import Walletconnect from "./assets/WalletConnect.png";

export default function HomeFooter() {
  const theme = useTheme();

  return (
    <Box
      mt={4}
      py={{ xs: 3, md: 2 }} // Reduced padding to make the footer shorter
      minHeight={150}
      bgcolor="#07162D" // Lighter shade of blue
      borderTop="0.1rem solid #0F2D49" // White border on top
      borderRadius=" 50px 50px 0 0" // Border radius for left and right edges
    >
      <Container maxWidth="lg">
        <Stack
          direction={"row"}
          flexWrap={"wrap"}
          justifyContent={"space-between"}
          rowGap={"1rem"} // Reduced gap to fit the shorter height
          pb={3} // Reduced padding bottom
        >
          <Stack
                mt={4}
            gap={"1rem"}
            width={{ md: 250, lg: 300 }}
            sx={{ "*": { color: "white !important" } }} // Set text color to white
          >
            <Typography>Secured By</Typography>
            <Box
              component="img"
              src={Walletconnect} // Replace with your image path
              alt="Logo"
              height={30}
              width={150} // Adjust as needed
            />
          </Stack>
        </Stack>
        <Box py={2} minHeight={50} bgcolor="#07162D">
          {" "}
          {/* Consistent background color */}
          <Stack
            direction={"row"}
            flexWrap={"wrap"}
            justifyContent={"space-between"}
            gap={"1rem"}
          >
            <Typography variant="subtitle2" color="white">
              © {new Date().getFullYear()} All Rights Reserved
            </Typography>
            <Stack direction={"row"} alignItems={"center"} gap={"1rem"}>
              {socialHolder.subs &&
                socialHolder.subs.map((item, id) => (
                  <a
                    key={id}
                    href={item.urlLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Box
                      component={"img"}
                      src={item.img}
                      width={25}
                      alt={item.link}
                    />
                  </a>
                ))}
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
