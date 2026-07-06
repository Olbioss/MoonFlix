import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import MediaItem from "../components/common/MediaItem";
import Container from "../components/common/Container";
import uiConfigs from "../configs/ui.configs";
import favoriteApi from "../api/modules/favorite.api";
import useAuthStore from "../store/authStore";
import useUiStore from "../store/uiStore";
import type { Favorite } from "../types";

const FavoriteItem = ({
  media,
  onRemoved,
}: {
  media: Favorite;
  onRemoved: (id: string) => void;
}) => {
  const removeFavorite = useAuthStore((s) => s.removeFavorite);
  const [onRequest, setOnRequest] = useState(false);

  const onRemove = async () => {
    if (onRequest) return;
    setOnRequest(true);
    const { response, err } = await favoriteApi.remove({
      favoriteId: media.id,
    });
    setOnRequest(false);

    if (err) toast.error(err.message);
    if (response) {
      removeFavorite({ mediaId: media.mediaId });
      onRemoved(media.id);
    }
  };

  return (
    <>
      <MediaItem media={media} mediaType={media.mediaType} />
      <Button
        fullWidth
        variant="contained"
        sx={{ marginTop: 2 }}
        startIcon={<DeleteIcon />}
        loadingPosition="start"
        loading={onRequest}
        onClick={onRemove}
      >
        remove
      </Button>
    </>
  );
};

const FavoriteList = () => {
  const [medias, setMedias] = useState<Favorite[]>([]);
  const [filteredMedias, setFilteredMedias] = useState<Favorite[]>([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const setGlobalLoading = useUiStore((s) => s.setGlobalLoading);
  const skip = 8;

  useEffect(() => {
    const getFavorites = async () => {
      setGlobalLoading(true);
      const { response, err } = await favoriteApi.getList();
      setGlobalLoading(false);

      if (err) toast.error(err.message);
      if (response) {
        setCount(response.length);
        setMedias([...response]);
        setFilteredMedias([...response].splice(0, skip));
      }
    };

    getFavorites();
  }, [setGlobalLoading]);

  const onLoadMore = () => {
    setFilteredMedias([
      ...filteredMedias,
      ...[...medias].splice(page * skip, skip),
    ]);
    setPage(page + 1);
  };

  const onRemoved = (id: string) => {
    const newMedias = [...medias].filter((e) => e.id !== id);
    setMedias(newMedias);
    setFilteredMedias([...newMedias].splice(0, page * skip));
    setCount(count - 1);
  };

  return (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Container header={`Your favorites (${count})`}>
        <Grid container spacing={1} sx={{ marginRight: "-8px!important" }}>
          {filteredMedias.map((item, index) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <FavoriteItem media={item} onRemoved={onRemoved} />
            </Grid>
          ))}
        </Grid>
        {filteredMedias.length < medias.length && (
          <Button onClick={onLoadMore}>load more</Button>
        )}
      </Container>
    </Box>
  );
};

export default FavoriteList;
