import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import { Box, Button, Chip, Divider, Stack, Typography } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import CircularRate from "../components/common/CircularRate";
import Container from "../components/common/Container";
import ImageHeader from "../components/common/ImageHeader";

import uiConfigs from "../configs/ui.configs";
import tmdbConfigs from "../api/configs/tmdb.configs";
import mediaApi from "../api/modules/media.api";

import useUiStore from "../store/uiStore";
import { useUser } from "../api/queries/user.queries";
import {
  useFavorites,
  useAddFavorite,
  useRemoveFavorite,
} from "../api/queries/favorite.queries";
import type { Genre, MediaDetail } from "../types";
import CastSlide from "../components/common/CastSlide";
import MediaVideoSlide from "../components/common/MediaVideoSlide";
import BackdropSlide from "../components/common/BackdropSlide";
import PosterSlide from "../components/common/PosterSlide";
import RecommendSlide from "../components/common/RecommendSlide";
import MediaSlide from "../components/common/MediaSlide";
import MediaReview from "../components/common/MediaReview";

const MediaDetail = () => {
  const { mediaType = "", mediaId = "" } = useParams();
  const { data: user } = useUser();
  const { data: listFavorites = [] } = useFavorites();
  const addFavorite = useAddFavorite();
  const removeFavorite = useRemoveFavorite();
  const favoritePending = addFavorite.isPending || removeFavorite.isPending;
  const [media, setMedia] = useState<MediaDetail>();
  const [isFavorite, setIsFavorite] = useState(false);
  const [genres, setGenres] = useState<Genre[]>([]);

  const setGlobalLoading = useUiStore((s) => s.setGlobalLoading);
  const setAuthModalOpen = useUiStore((s) => s.setAuthModalOpen);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const getMedia = async () => {
      setGlobalLoading(true);
      const { response, err } = await mediaApi.getDetail({
        mediaType,
        mediaId,
      });
      setGlobalLoading(false);

      if (response) {
        setMedia(response);
        setIsFavorite(response.isFavorite ?? false);
        setGenres(response.genres.slice(0, 2));
      }

      if (err) toast.error(err.message);
    };

    getMedia();
  }, [mediaType, mediaId, setGlobalLoading]);

  const onRemoveFavorite = () => {
    if (favoritePending || !media) return;

    const favorite = listFavorites.find(
      (e) => e.mediaId.toString() === media.id.toString(),
    );
    if (!favorite) return;

    removeFavorite.mutate(favorite.id, {
      onSuccess: () => {
        setIsFavorite(false);
        toast.success("Remove favorite success");
      },
    });
  };

  const onFavoriteClick = () => {
    if (!user) return setAuthModalOpen(true);
    if (favoritePending || !media) return;

    if (isFavorite) {
      onRemoveFavorite();
      return;
    }

    addFavorite.mutate(
      {
        mediaId: media.id,
        mediaTitle: media.title || media.name || "",
        mediaType,
        mediaPoster: media.poster_path || "",
        mediaRate: media.vote_average ?? 0,
      },
      {
        onSuccess: () => {
          setIsFavorite(true);
          toast.success("Add favorite success");
        },
      },
    );
  };

  return media ? (
    <>
      <ImageHeader
        imgPath={tmdbConfigs.backdropPath(
          media.backdrop_path || media.poster_path,
        )}
      />
      <Box
        sx={{
          color: "primary.contrastText",
          ...uiConfigs.style.mainContent,
        }}
      >
        {/* media content */}
        <Box sx={{ marginTop: { xs: "-10rem", md: "-15rem", lg: "-20rem" } }}>
          <Box
            sx={{ display: "flex", flexDirection: { md: "row", xs: "column" } }}
          >
            {/* poster */}
            <Box
              sx={{
                width: { xs: "70%", sm: "50%", md: "40%" },
                margin: { xs: "0 auto 2rem", md: "0 2rem 0 0" },
              }}
            >
              <Box
                sx={{
                  paddingTop: "140%",
                  ...uiConfigs.style.backgroundImage(
                    tmdbConfigs.posterPath(
                      media.poster_path || media.backdrop_path,
                    ),
                  ),
                }}
              />
            </Box>
            {/* poster */}

            {/* media info */}
            <Box
              sx={{ width: { xs: "100%", md: "60%" }, color: "text.primary" }}
            >
              <Stack spacing={5}>
                {/* title */}
                <Typography
                  variant="h4"
                  fontSize={{ xs: "2rem", md: "2rem", lg: "4rem" }}
                  fontWeight="700"
                  sx={{ ...uiConfigs.style.typoLines(2, "left") }}
                >
                  {[
                    media.title || media.name,
                    (mediaType === tmdbConfigs.mediaType.movie
                      ? media.release_date
                      : media.first_air_date
                    )?.split("-")[0],
                  ]
                    .filter(Boolean)
                    .join(" ")}
                </Typography>
                {/* title */}

                <Stack direction="row" spacing={1} alignItems="center">
                  {/* rate */}
                  <CircularRate value={media.vote_average ?? 0} />
                  {/* rate */}
                  <Divider orientation="vertical" />
                  {/* genre */}
                  {genres.map((genre, index) => (
                    <Chip
                      label={genre.name}
                      variant="filled"
                      color="primary"
                      key={index}
                    />
                  ))}
                  {/* genre */}
                </Stack>
                {/* overview */}
                <Typography
                  variant="body1"
                  sx={{ ...uiConfigs.style.typoLines(5) }}
                >
                  {media.overview}
                </Typography>
                {/* overview */}

                {/* buttons */}
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="text"
                    sx={{
                      width: "max-content",
                      "& .MuiButton-startIcon": { marginRight: "0" },
                    }}
                    size="large"
                    startIcon={
                      isFavorite ? (
                        <FavoriteIcon />
                      ) : (
                        <FavoriteBorderOutlinedIcon />
                      )
                    }
                    loadingPosition="start"
                    loading={favoritePending}
                    onClick={onFavoriteClick}
                  />
                  <Button
                    variant="contained"
                    sx={{ width: "max-content" }}
                    size="large"
                    startIcon={<PlayArrowIcon />}
                    onClick={() => videoRef.current?.scrollIntoView()}
                  >
                    watch now
                  </Button>
                </Stack>
                {/* buttons */}

                {/* cast */}
                <Container header="Cast">
                  <CastSlide casts={media.credits.cast} />
                </Container>
                {/* cast */}
              </Stack>
            </Box>
            {/* media info */}
          </Box>
        </Box>
        {/* media content */}

        {/* media videos */}
        <div ref={videoRef} style={{ paddingTop: "2rem" }}>
          <Container header="Videos">
            <MediaVideoSlide videos={[...media.videos.results].splice(0, 5)} />
          </Container>
        </div>
        {/* media videos */}

        {/* media backdrop */}
        {media.images.backdrops.length > 0 && (
          <Container header="backdrops">
            <BackdropSlide backdrops={media.images.backdrops} />
          </Container>
        )}
        {/* media backdrop */}

        {/* media posters */}
        {media.images.posters.length > 0 && (
          <Container header="posters">
            <PosterSlide posters={media.images.posters} />
          </Container>
        )}
        {/* media posters */}

        {/* media reviews */}
        <MediaReview
          reviews={media.reviews}
          media={media}
          mediaType={mediaType}
        />
        {/* media reviews */}

        {/* media recomendation */}
        <Container header="you may also like">
          {media.recommend.length > 0 && (
            <RecommendSlide medias={media.recommend} mediaType={mediaType} />
          )}
          {media.recommend.length === 0 && (
            <MediaSlide
              mediaType={mediaType}
              mediaCategory={tmdbConfigs.mediaCategory.top_rated}
            />
          )}
        </Container>
        {/* media recomendation */}
      </Box>
    </>
  ) : null;
};

export default MediaDetail;
