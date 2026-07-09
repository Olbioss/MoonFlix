import { Box } from "@mui/material";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper } from "swiper/react";
import type { ReactNode } from "react";

const NavigationSwiper = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      sx={{
        "& .swiper-slide": {
          width: "100%",
          opacity: "0.6",
          paddingBottom: "3rem",
        },
        "& .swiper-slide-active": { opacity: 1 },
        "& .swiper-pagination-bullet": {
          backgroundColor: "rgba(233,238,248,0.35)",
          opacity: 1,
        },
        "& .swiper-pagination-bullet-active": {
          backgroundColor: "primary.main",
        },
        "& .swiper-button-next, & .swiper-button-prev": {
          color: "primary.main",
          "&::after": {
            fontSize: { xs: "1rem", md: "2rem" },
          },
        },
        "& .swiper": {
          paddingX: { xs: "1rem", md: "4rem" },
        },
      }}
    >
      <Swiper
        spaceBetween={10}
        grabCursor={true}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Navigation, Pagination]}
        style={{ width: "100%", height: "max-content" }}
      >
        {children}
      </Swiper>
    </Box>
  );
};

export default NavigationSwiper;
