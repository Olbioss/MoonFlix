import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import tmdbConfigs from "../api/configs/tmdb.configs";
import uiConfigs from "../configs/ui.configs";
import HeroSlide from "../components/common/HeroSlide";
import MediaGrid from "../components/common/MediaGrid";
import MediaGridSkeleton from "../components/common/MediaGridSkeleton";
import useUiStore from "../store/uiStore";
import { useInfiniteMediaList } from "../api/queries/media.queries";
import NotFound from "./NotFound";

const MediaList = () => {
  const { mediaType = "" } = useParams();
  const [currCategory, setCurrCategory] = useState(0);
  const setAppState = useUiStore((s) => s.setAppState);

  // Junk single-segment URLs land here via /:mediaType — treat anything
  // that isn't a real media type as a 404 and fire no queries.
  const isValidType = (
    Object.values(tmdbConfigs.mediaType) as string[]
  ).includes(mediaType);
  const safeMediaType = isValidType ? mediaType : "";

  const mediaCategories = useMemo(() => ["popular", "top_rated"], []);
  const category = ["popular", "top rated"];

  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useInfiniteMediaList(safeMediaType, mediaCategories[currCategory]);
  const medias = data?.pages.flatMap((p) => p.results) ?? [];

  useEffect(() => {
    setAppState(mediaType);
    window.scrollTo(0, 0);
  }, [mediaType, setAppState]);

  const onCategoryChange = (categoryIndex: number) => {
    if (currCategory === categoryIndex) return;
    setCurrCategory(categoryIndex);
  };

  if (!isValidType) return <NotFound />;

  return (
    <>
      <HeroSlide
        compact
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
          <Typography variant="h5" textTransform="uppercase" letterSpacing="0.22em">
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
        {isLoading ? (
          <MediaGridSkeleton />
        ) : (
          <MediaGrid medias={medias} mediaType={mediaType} />
        )}
        {medias.length > 0 && hasNextPage && (
          <Button
            sx={{ marginTop: 8 }}
            fullWidth
            variant="outlined"
            color="primary"
            loading={isFetching}
            onClick={() => fetchNextPage()}
          >
            load more
          </Button>
        )}
      </Box>
    </>
  );
};

export default MediaList;
