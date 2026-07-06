import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import tmdbConfigs from "../api/configs/tmdb.configs";
import mediaApi from "../api/modules/media.api";
import uiConfigs from "../configs/ui.configs";
import HeroSlide from "../components/common/HeroSlide";
import MediaGrid from "../components/common/MediaGrid";
import MediaGridSkeleton from "../components/common/MediaGridSkeleton";
import useUiStore from "../store/uiStore";
import usePrevious from "../hooks/usePrevious";
import type { Media } from "../types";
import { toast } from "react-toastify";

const MediaList = () => {
  const { mediaType = "" } = useParams();

  const [medias, setMedias] = useState<Media[]>([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [currCategory, setCurrCategory] = useState(0);
  const [currPage, setCurrPage] = useState(1);

  const prevMediaType = usePrevious(mediaType);
  const setAppState = useUiStore((s) => s.setAppState);
  const setGlobalLoading = useUiStore((s) => s.setGlobalLoading);

  const mediaCategories = useMemo(() => ["popular", "top_rated"], []);
  const category = ["popular", "top rated"];

  useEffect(() => {
    setAppState(mediaType);
    window.scrollTo(0, 0);
  }, [mediaType, setAppState]);

  useEffect(() => {
    const getMedias = async () => {
      if (currPage === 1) setGlobalLoading(true);
      setMediaLoading(true);

      const { response, err } = await mediaApi.getList({
        mediaType,
        mediaCategory: mediaCategories[currCategory],
        page: currPage,
      });

      setMediaLoading(false);
      setGlobalLoading(false);

      if (err) toast.error(err.message);
      if (response) {
        if (currPage !== 1) setMedias((m) => [...m, ...response.results]);
        else setMedias([...response.results]);
      }
    };
    getMedias();
  }, [
    mediaType,
    currCategory,
    currPage,
    prevMediaType,
    mediaCategories,
    setGlobalLoading,
  ]);

  const onCategoryChange = (categoryIndex: number) => {
    if (currCategory === categoryIndex) return;
    setMedias([]);
    setCurrPage(1);
    setCurrCategory(categoryIndex);
  };

  const onLoadMore = () => setCurrPage(currPage + 1);

  return (
    <>
      <HeroSlide
        mediaType={mediaType}
        mediaCategory={mediaCategories[currCategory]}
      />
      <Box sx={{ ...uiConfigs.style.mainContent }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
          sx={{ marginBottom: 4 }}
        >
          <Typography fontWeight="700" variant="h5">
            {mediaType === tmdbConfigs.mediaType.movie ? "Movies" : "Tv Series"}
          </Typography>
          <Stack direction="row" spacing={2}>
            {category.map((cate, index) => (
              <Button
                key={index}
                size="large"
                variant={currCategory === index ? "contained" : "text"}
                sx={{
                  color:
                    currCategory === index
                      ? "primary.contrastText"
                      : "text.primary",
                }}
                onClick={() => onCategoryChange(index)}
              >
                {cate}
              </Button>
            ))}
          </Stack>
        </Stack>
        {mediaLoading && medias.length === 0 ? (
          <MediaGridSkeleton />
        ) : (
          <MediaGrid medias={medias} mediaType={mediaType} />
        )}
        <Button
          sx={{ marginTop: 8 }}
          fullWidth
          color="primary"
          loading={mediaLoading}
          onClick={onLoadMore}
        >
          load more
        </Button>
      </Box>
    </>
  );
};

export default MediaList;
