import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { routesGen } from "../../routes/routes";

import uiConfigs from "../../configs/ui.configs";

import tmdbConfigs from "../../api/configs/tmdb.configs";
import { useGenres, useMediaList } from "../../api/queries/media.queries";
import { isNewRelease } from "../../utils/date.utils";

const HeroSlide = ({
  mediaType,
  mediaCategory,
  compact = false,
}: {
  mediaType: string;
  mediaCategory: string;
  // Browse pages use a shorter hero so the grid lands above the fold;
  // home keeps the full cinematic height.
  compact?: boolean;
}) => {
  const { data: genres = [] } = useGenres(mediaType);
  const { data: movies = [] } = useMediaList(mediaType, mediaCategory);

  return (
    <Box
      sx={{
        position: "relative",
        color: "text.primary",
        "&::before": {
          content: '""',
          width: "100%",
          height: "45%",
          position: "absolute",
          bottom: 0,
          left: 0,
          zIndex: 2,
          pointerEvents: "none",
          ...uiConfigs.style.gradientBgImage,
        },
      }}
    >
      <Swiper
        grabCursor={true}
        loop={true}
        modules={[Autoplay]}
        style={{ width: "100%", height: "max-content" }}
        speed={900}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
      >
        {movies.map((movie, index) => {
          const date = movie.release_date || movie.first_air_date;
          const year = date?.split("-")[0];

          return (
            <SwiperSlide key={index}>
              {/* backdrop */}
              <Box
                sx={{
                  height: compact
                    ? { xs: "60vh", md: "64vh" }
                    : { xs: "80vh", md: "90vh" },
                  backgroundPosition: "top",
                  backgroundSize: "cover",
                  backgroundImage: `url(${tmdbConfigs.backdropPath(
                    movie.backdrop_path || movie.poster_path,
                  )})`,
                }}
              />
              {/* dissolve toward the text column */}
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  ...uiConfigs.style.horizontalGradientBgImage,
                }}
              />
              {/* night tint unifying every backdrop, plus a faint champagne
                  glow behind the text column */}
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  backgroundColor: "rgba(10,13,21,0.35)",
                  backgroundImage:
                    "radial-gradient(ellipse at 22% 38%, rgba(212,185,120,0.10), transparent 55%)",
                }}
              />
              {/* content */}
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  paddingX: { sm: "10px", md: "4rem", lg: "6rem" },
                }}
              >
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: { xs: "center", md: "flex-start" },
                    paddingTop: { md: "16vh" },
                    paddingX: "30px",
                    width: { sm: "unset", md: "55%", lg: "45%" },
                  }}
                >
                  <Stack spacing={3} direction="column">
                    {/* kicker */}
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Box
                        sx={{
                          width: "14px",
                          height: "14px",
                          borderRadius: "50%",
                          background:
                            "radial-gradient(circle at 68% 35%, transparent 0 46%, #D4B978 50%)",
                        }}
                      />
                      <Typography
                        variant="overline"
                        sx={{ color: "primary.main", lineHeight: 1 }}
                      >
                        Tonight&rsquo;s premiere
                      </Typography>
                    </Stack>
                    {/* kicker */}

                    {/* title */}
                    <Typography
                      variant="h2"
                      fontSize={{ xs: "2.2rem", md: "3rem", lg: "4rem" }}
                      sx={{
                        ...uiConfigs.style.typoLines(2, "left"),
                      }}
                    >
                      {movie.title || movie.name}
                    </Typography>
                    {/* title */}

                    {/* meta row */}
                    <Stack
                      direction="row"
                      spacing={1.5}
                      alignItems="center"
                      flexWrap="wrap"
                      useFlexGap
                    >
                      {isNewRelease(date) && (
                        <Typography
                          sx={{
                            color: "primary.main",
                            fontWeight: 600,
                            fontSize: "0.75rem",
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                          }}
                        >
                          New
                        </Typography>
                      )}
                      {year && (
                        <Typography
                          sx={{
                            color: "text.secondary",
                            fontSize: "0.85rem",
                            letterSpacing: "0.1em",
                          }}
                        >
                          {year}
                        </Typography>
                      )}
                      {[...(movie.genre_ids ?? [])]
                        .splice(0, 2)
                        .map((genreId, i) => (
                          <Chip
                            variant="filled"
                            color="primary"
                            size="small"
                            key={i}
                            label={genres.find((e) => e.id === genreId)?.name}
                          />
                        ))}
                      {!!movie.vote_average && (
                        <Typography
                          sx={{
                            color: "primary.main",
                            fontSize: "0.85rem",
                            letterSpacing: "0.08em",
                          }}
                        >
                          ✦ {movie.vote_average.toFixed(1)}
                        </Typography>
                      )}
                    </Stack>
                    {/* meta row */}

                    {/* overview */}
                    <Typography
                      variant="body1"
                      sx={{
                        color: "rgba(233,238,248,0.75)",
                        ...uiConfigs.style.typoLines(3),
                      }}
                    >
                      {movie.overview}
                    </Typography>
                    {/* overview */}

                    {/* buttons */}
                    <Button
                      variant="outlined"
                      size="large"
                      startIcon={<PlayArrowIcon />}
                      component={Link}
                      to={routesGen.mediaDetail(mediaType, movie.id)}
                      sx={{ width: "max-content" }}
                    >
                      watch now
                    </Button>
                    {/* buttons */}
                  </Stack>
                </Box>
              </Box>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
};

export default HeroSlide;
