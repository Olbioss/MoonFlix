import { Box } from "@mui/material";
import { Swiper } from "swiper/react";
import type { ReactNode } from "react";

const AutoSwiper = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      sx={{
        // Padding + negative margin give the card glow shadows room to
        // render inside the swiper's overflow:hidden box.
        "& .swiper": {
          padding: "16px 12px",
          margin: "-16px -12px",
        },
        "& .swiper-slide": {
          width: {
            xs: "50%",
            sm: "35%",
            md: "25%",
            lg: "20.5%",
          },
          paddingRight: "14px",
        },
      }}
    >
      <Swiper
        slidesPerView="auto"
        grabCursor={true}
        style={{ width: "100%", height: "max-content" }}
      >
        {children}
      </Swiper>
    </Box>
  );
};

export default AutoSwiper;
