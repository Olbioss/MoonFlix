import { Grid, Skeleton } from "@mui/material";

// Poster-shaped placeholders shown while a media grid is loading, replacing the
// previous blank space.
const MediaGridSkeleton = ({ count = 8 }: { count?: number }) => {
  return (
    <Grid container spacing={1} sx={{ marginRight: "-8px!important" }}>
      {Array.from({ length: count }).map((_, index) => (
        <Grid item xs={6} sm={4} md={3} key={index}>
          <Skeleton
            variant="rounded"
            animation="wave"
            sx={{
              width: "100%",
              aspectRatio: "2 / 3",
              height: "auto",
              borderRadius: "10px",
              bgcolor: "rgba(233,238,248,0.06)",
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default MediaGridSkeleton;
