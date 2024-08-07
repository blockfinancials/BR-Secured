import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function CryptoCarousel({ cryptocurrencies }) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "#1a2738",
        py: 0.5,
        borderTop: "2px solid #2c3e50",
        borderBottom: "2px solid #2c3e50",
      }}
    >
      <Slider {...settings}>
        {cryptocurrencies.map((crypto) => (
          <Box key={crypto.id} sx={{ px: 1 }}>
            <Grid 
              container 
              alignItems="center" 
              spacing={0.5} 
              sx={{ flexWrap: "nowrap", whiteSpace: "nowrap" }}
            >
              <Grid item>
                <img src={crypto.image} alt={crypto.name} width="16" />
              </Grid>
              <Grid item>
                <Typography
                  component="span"
                  sx={{
                    color: "#3498db",
                    fontWeight: "bold",
                    mr: 0.5,
                    fontSize: "0.7rem",
                  }}
                >
                  {crypto.name}
                </Typography>
                <Typography
                  component="span"
                  sx={{ color: "white", fontSize: "0.7rem" }}
                >
                  {crypto.symbol.toUpperCase()}
                </Typography>
              </Grid>
              <Grid item>
                <Typography sx={{ color: "white", fontSize: "0.7rem" }}>
                  ${crypto.current_price.toFixed(2)}
                </Typography>
              </Grid>
              <Grid item>
                <Typography 
                  sx={{
                    color:
                      crypto.price_change_percentage_1h_in_currency > 0
                        ? "#4caf50"
                        : "#f44336",
                    fontSize: "0.7rem",
                  }}
                >
                  {crypto.price_change_percentage_1h_in_currency.toFixed(2)}%
                </Typography>
              </Grid>
            </Grid>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}

export default CryptoCarousel;
