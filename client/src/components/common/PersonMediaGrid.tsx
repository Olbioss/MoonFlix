import { Button, Grid } from "@mui/material";
import { useMemo, useState } from "react";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import MediaItem from "./MediaItem";
import { usePersonMedias } from "../../api/queries/person.queries";
import type { Media } from "../../types";

const skip = 8;

const getReleaseDate = (media: Media) => {
  const date =
    media.media_type === tmdbConfigs.mediaType.movie
      ? new Date(media.release_date ?? "")
      : new Date(media.first_air_date ?? "");
  return date.getTime();
};

const PersonMediaGrid = ({ personId }: { personId: string }) => {
  const { data: cast = [] } = usePersonMedias(personId);
  const [page, setPage] = useState(1);

  const medias = useMemo(
    () => [...cast].sort((a, b) => getReleaseDate(b) - getReleaseDate(a)),
    [cast],
  );
  const filteredMedias = medias.slice(0, page * skip);

  return (
    <>
      <Grid container spacing={1} sx={{ marginRight: "-8px!important" }}>
        {filteredMedias.map((media, index) => (
          <Grid item xs={6} sm={4} md={3} key={index}>
            <MediaItem media={media} mediaType={media.media_type ?? ""} />
          </Grid>
        ))}
      </Grid>
      {filteredMedias.length < medias.length && (
        <Button onClick={() => setPage((p) => p + 1)}>load more</Button>
      )}
    </>
  );
};

export default PersonMediaGrid;
