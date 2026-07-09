import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import uiConfigs from "../../configs/ui.configs";
import { routesGen } from "../../routes/routes";
import type { Cast } from "../../types";

const CastSlide = ({ casts }: { casts: Cast[] }) => {
  return (
    <Box
      sx={{
        "& .swiper-slide": {
          width: { xs: "50%", md: "25%", lg: "20.5%" },
          color: "text.primary",
        },
      }}
    >
      <Swiper
        spaceBetween={10}
        slidesPerView="auto"
        grabCursor={true}
        style={{ width: "100%", height: "max-content" }}
      >
        {casts.map((cast, index) => (
          <SwiperSlide key={index}>
            <Link to={routesGen.person(cast.id)}>
              <Box
                sx={{
                  paddingTop: "120%",
                  color: "text.primary",
                  borderRadius: "10px",
                  overflow: "hidden",
                  outline: "1px solid rgba(233,238,248,0.10)",
                  outlineOffset: "-1px",
                  ...uiConfigs.style.backgroundImage(
                    tmdbConfigs.posterPath(cast.profile_path),
                  ),
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    width: "100%",
                    height: "max-content",
                    bottom: 0,
                    padding: "10px",
                    backgroundColor: "rgba(10,13,21,0.72)",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  <Typography sx={{ ...uiConfigs.style.typoLines(1, "left") }}>
                    {cast.name}
                  </Typography>
                </Box>
              </Box>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default CastSlide;
