import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useState, type ChangeEvent } from "react";
import MediaGrid from "../components/common/MediaGrid";
import MediaGridSkeleton from "../components/common/MediaGridSkeleton";
import uiConfigs from "../configs/ui.configs";
import { useSearchMedia } from "../api/queries/media.queries";

const mediaTypes = ["movie", "tv", "people"];
let timer: ReturnType<typeof setTimeout>;
const timeout = 500;

const MediaSearch = () => {
  const [query, setQuery] = useState("");
  const [mediaType, setMediaType] = useState(mediaTypes[0]);

  const { data, fetchNextPage, hasNextPage, isFetching } = useSearchMedia(
    mediaType,
    query,
  );
  const medias = data?.pages.flatMap((p) => p.results) ?? [];

  const onQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    clearTimeout(timer);
    timer = setTimeout(() => setQuery(newQuery), timeout);
  };

  return (
    <>
      <Box
        sx={{
          ...uiConfigs.style.mainContent,
          paddingTop: { xs: "80px", md: "2rem" },
        }}
      >
        <Stack spacing={2}>
          <Stack
            spacing={2}
            direction="row"
            justifyContent="center"
            sx={{ width: "100%" }}
          >
            {mediaTypes.map((item, index) => (
              <Button
                size="large"
                key={index}
                variant={mediaType === item ? "contained" : "text"}
                sx={{
                  color:
                    mediaType === item
                      ? "primary.contrastText"
                      : "text.primary",
                }}
                onClick={() => setMediaType(item)}
              >
                {item}
              </Button>
            ))}
          </Stack>
          <TextField
            color="primary"
            placeholder="Search MoonFlix"
            sx={{ width: "100%" }}
            autoFocus
            onChange={onQueryChange}
          />
          {isFetching && medias.length === 0 && query.trim() ? (
            <MediaGridSkeleton />
          ) : (
            <MediaGrid medias={medias} mediaType={mediaType} />
          )}
          {!isFetching && medias.length === 0 && query.trim() && (
            <Typography
              color="text.secondary"
              textAlign="center"
              sx={{ paddingY: "2rem", letterSpacing: "0.04em" }}
            >
              Nothing found under this moon.
            </Typography>
          )}
          {medias.length > 0 && hasNextPage && (
            <Button
              variant="outlined"
              loading={isFetching}
              onClick={() => fetchNextPage()}
            >
              load more
            </Button>
          )}
        </Stack>
      </Box>
    </>
  );
};

export default MediaSearch;
