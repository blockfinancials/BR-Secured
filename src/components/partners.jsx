import { Box, Container, Stack, Typography, useTheme } from "@mui/material";
import ScrollCarousel from "scroll-carousel-react";
import { partnerImgs } from "../utility/partnerData";

export default function Partners() {
  const theme = useTheme();
  return (
    <Container maxWidth="xl">
      <Stack gap={"2rem"} py={{ xs: 8, md: 10 }}>
        <Typography
          textAlign={"center"}
          variant="h6"
          color={theme.palette.mode === "dark" ? "grey.300" : "grey.700"}
          fontWeight={300}
        >
          Trusted by 50+ organizations in the blockchain community
        </Typography>
        <Box
          sx={{
            img: {
              // filter:
              //   theme.palette.mode === "dark"
              //     ? "grayscale(100%) brightness(70%) invert(100%)"
              //     : "grayscale(100%)",
              height: {
                xs: "30px", // height for extra-small screens
                sm: "35px", // height for small screens
                md: "43px", // height for medium and larger screens
              },
            },
          }}
        >
          <ScrollCarousel
            autoplay={true}
            speed={2}
            smartSpeed={true}
            margin={60}
          >
            {partnerImgs.map((itr, id) => (
              <Box key={id} component={"img"} src={itr} height={"100%"} />
            ))}
          </ScrollCarousel>
        </Box>
      </Stack>
    </Container>
  );
}
