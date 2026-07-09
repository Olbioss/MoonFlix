import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Grid } from "@mui/material";
import { useState } from "react";
import MediaItem from "../components/common/MediaItem";
import Container from "../components/common/Container";
import MediaGridSkeleton from "../components/common/MediaGridSkeleton";
import uiConfigs from "../configs/ui.configs";
import {
  useFavorites,
  useRemoveFavorite,
} from "../api/queries/favorite.queries";
import type { Favorite } from "../types";

const FavoriteItem = ({ media }: { media: Favorite }) => {
  const removeFavorite = useRemoveFavorite();

  return (
    <>
      <MediaItem media={media} mediaType={media.mediaType} />
      <Button
        fullWidth
        variant="outlined"
        sx={{ marginTop: 2 }}
        startIcon={<DeleteIcon />}
        loadingPosition="start"
        loading={removeFavorite.isPending}
        onClick={() => removeFavorite.mutate(media.id)}
      >
        remove
      </Button>
    </>
  );
};

const skip = 8;

const FavoriteList = () => {
  const { data: favorites = [], isLoading } = useFavorites();
  const [page, setPage] = useState(1);

  const filteredMedias = favorites.slice(0, page * skip);

  return (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Container header={`Your favorites (${favorites.length})`}>
        {isLoading ? (
          <MediaGridSkeleton />
        ) : (
          <>
            <Grid container spacing={1} sx={{ marginRight: "-8px!important" }}>
              {filteredMedias.map((media) => (
                <Grid item xs={6} sm={4} md={3} key={media.id}>
                  <FavoriteItem media={media} />
                </Grid>
              ))}
            </Grid>
            {filteredMedias.length < favorites.length && (
              <Button onClick={() => setPage((p) => p + 1)}>load more</Button>
            )}
          </>
        )}
      </Container>
    </Box>
  );
};

export default FavoriteList;
