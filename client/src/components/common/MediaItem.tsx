import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import uiConfigs from "../../configs/ui.configs";
import { routesGen } from "../../routes/routes";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useFavorites } from "../../api/queries/favorite.queries";
import favoriteUtils from "../../utils/favorite.utils";
import { isNewRelease } from "../../utils/date.utils";

// MediaItem renders items from several sources (browse media, favorites, and
// person credits), so the shape is intentionally permissive.
export interface MediaItemData {
  id?: string | number;
  mediaId?: string | number;
  title?: string;
  name?: string;
  mediaTitle?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  mediaPoster?: string;
  profile_path?: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
  mediaRate?: number;
  mediaType?: string;
}

const MediaItem = ({
  media,
  mediaType,
}: {
  media: MediaItemData;
  mediaType: string;
}) => {
  const { data: listFavorites = [] } = useFavorites();

  const [title, setTitle] = useState("");
  const [posterPath, setPosterPath] = useState("");
  const [releaseDate, setReleaseDate] = useState<string>();
  const [rate, setRate] = useState<number>();

  useEffect(() => {
    setTitle(media.title || media.name || media.mediaTitle || "");

    setPosterPath(
      tmdbConfigs.posterPath(
        media.poster_path ||
          media.backdrop_path ||
          media.mediaPoster ||
          media.profile_path,
      ),
    );

    if (mediaType === tmdbConfigs.mediaType.movie) {
      setReleaseDate(media.release_date && media.release_date.split("-")[0]);
    } else {
      setReleaseDate(
        media.first_air_date && media.first_air_date.split("-")[0],
      );
    }

    setRate(media.vote_average || media.mediaRate);
  }, [media, mediaType]);

  const isNew = isNewRelease(
    mediaType === tmdbConfigs.mediaType.movie
      ? media.release_date
      : media.first_air_date,
  );

  return (
    <Link
      to={
        mediaType !== "people"
          ? routesGen.mediaDetail(mediaType, media.mediaId || media.id || "")
          : routesGen.person(media.id || "")
      }
    >
      <Box
        sx={{
          ...uiConfigs.style.backgroundImage(posterPath),
          paddingTop: "160%",
          borderRadius: "10px",
          overflow: "hidden",
          outline: "1px solid rgba(233,238,248,0.10)",
          outlineOffset: "-1px",
          boxShadow: "0 8px 28px rgba(0,0,0,0.45)",
          transition: "box-shadow .4s ease, outline-color .4s ease",
          "&:hover": {
            boxShadow: "0 10px 34px rgba(212,185,120,0.16)",
            outlineColor: "rgba(212,185,120,0.35)",
          },
          "&:hover .media-info": { opacity: 1, bottom: 0 },
          "&:hover .media-back-drop, &:hover .media-play-btn": { opacity: 1 },
          color: "#E9EEF8",
        }}
      >
        {/* movie or tv item */}
        {mediaType !== "people" && (
          <>
            {favoriteUtils.check({
              listFavorites,
              mediaId: media.id ?? "",
            }) && (
              <FavoriteIcon
                color="primary"
                sx={{
                  position: "absolute",
                  top: 2,
                  right: 2,
                  fontSize: "2rem",
                }}
              />
            )}
            <Box
              className="media-back-drop"
              sx={{
                opacity: { xs: 1, md: 0 },
                transition: "all 0.3s ease",
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                backgroundImage:
                  "linear-gradient(to top, rgba(10,13,21,1), rgba(10,13,21,0))",
              }}
            />
            {isNew && (
              <Box
                sx={{
                  position: "absolute",
                  left: 0,
                  bottom: "16px",
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  padding: "4px 10px 3px",
                }}
              >
                New
              </Box>
            )}
            <Button
              className="media-play-btn"
              variant="contained"
              aria-label="Play"
              startIcon={<PlayArrowIcon />}
              sx={{
                display: { xs: "none", md: "flex" },
                opacity: 0,
                transition: "all 0.3s ease",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                borderRadius: "50%",
                minWidth: 0,
                padding: "14px",
                "& .MuiButton-startIcon": { margin: 0 },
              }}
            />
            <Box
              className="media-info"
              sx={{
                transition: "all 0.3s ease",
                opacity: { xs: 1, md: 0 },
                position: "absolute",
                bottom: { xs: 0, md: "-20px" },
                width: "100%",
                height: "max-content",
                boxSizing: "border-box",
                padding: { xs: "10px", md: "2rem 1rem" },
              }}
            >
              <Stack spacing={{ xs: 0.5, md: 1 }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  {!!rate && (
                    <Typography
                      variant="caption"
                      sx={{
                        color: "primary.main",
                        letterSpacing: "0.08em",
                      }}
                    >
                      ✦ {rate.toFixed(1)}
                    </Typography>
                  )}
                  {releaseDate && (
                    <Typography
                      variant="caption"
                      sx={{
                        color: "rgba(233,238,248,0.7)",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {releaseDate}
                    </Typography>
                  )}
                </Stack>

                <Typography
                  variant="body1"
                  fontWeight="600"
                  sx={{
                    fontSize: "1rem",
                    ...uiConfigs.style.typoLines(1, "left"),
                  }}
                >
                  {title}
                </Typography>
              </Stack>
            </Box>
          </>
        )}
        {/* movie or tv item */}

        {/* people */}
        {mediaType === "people" && (
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
              {media.name}
            </Typography>
          </Box>
        )}
        {/* people */}
      </Box>
    </Link>
  );
};

export default MediaItem;
