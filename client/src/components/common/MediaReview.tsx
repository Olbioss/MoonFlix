import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { useUser } from "../../api/queries/user.queries";
import {
  useAddReview,
  useRemoveReview,
} from "../../api/queries/review.queries";
import Container from "./Container";
import TextAvatar from "./TextAvatar";
import type { MediaDetail, Review } from "../../types";

const ReviewItem = ({
  review,
  onRemoved,
}: {
  review: Review;
  onRemoved: (id: string) => void;
}) => {
  const { data: user } = useUser();
  const removeReview = useRemoveReview();

  return (
    <Box
      sx={{
        padding: 2,
        borderRadius: "10px",
        position: "relative",
        opacity: removeReview.isPending ? 0.6 : 1,
        transition: "background-color .35s ease",
        "&:hover": { backgroundColor: "background.paper" },
      }}
    >
      <Stack direction="row" spacing={2}>
        {/* avatar */}
        <TextAvatar text={review.user?.displayName} />
        {/* avatar */}
        <Stack spacing={2} flexGrow={1}>
          <Stack spacing={1}>
            <Typography variant="body1" fontWeight={600}>
              {review.user?.displayName}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {dayjs(review.createdAt).format("DD-MM-YYYY HH:mm:ss")}
            </Typography>
          </Stack>
          <Typography variant="body1" textAlign="justify">
            {review.content}
          </Typography>
          {user && user.id === review.user.id && (
            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              loadingPosition="start"
              loading={removeReview.isPending}
              onClick={() =>
                removeReview.mutate(review.id, {
                  onSuccess: () => onRemoved(review.id),
                })
              }
              sx={{
                position: { xs: "relative", md: "absolute" },
                right: { xs: 0, md: "10px" },
                marginTop: { xs: 2, md: 0 },
                width: "max-content",
              }}
            >
              remove
            </Button>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

const skip = 4;

const MediaReview = ({
  reviews,
  media,
  mediaType,
}: {
  reviews: Review[];
  media: MediaDetail;
  mediaType: string;
}) => {
  const { data: user } = useUser();
  const addReview = useAddReview();
  const [listReviews, setListReviews] = useState<Review[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [page, setPage] = useState(1);
  const [content, setContent] = useState("");
  const [reviewCount, setReviewCount] = useState(0);

  useEffect(() => {
    setListReviews([...reviews]);
    setFilteredReviews([...reviews].splice(0, skip));
    setReviewCount(reviews.length);
  }, [reviews]);

  const onAddReview = () => {
    addReview.mutate(
      {
        content,
        mediaId: media.id,
        mediaType,
        mediaTitle: media.title || media.name || "",
        mediaPoster: media.poster_path || "",
      },
      {
        onSuccess: (newReview) => {
          setFilteredReviews([...filteredReviews, newReview]);
          setReviewCount(reviewCount + 1);
          setContent("");
          toast.success("Post review success");
        },
      },
    );
  };

  const onLoadMore = () => {
    setFilteredReviews([
      ...filteredReviews,
      ...[...listReviews].splice(page * skip, skip),
    ]);
    setPage(page + 1);
  };

  const onRemoved = (id: string) => {
    if (listReviews.findIndex((e) => e.id === id) !== -1) {
      const newListReviews = [...listReviews].filter((e) => e.id !== id);
      setListReviews(newListReviews);
      setFilteredReviews([...newListReviews].splice(0, page * skip));
    } else {
      setFilteredReviews([...filteredReviews].filter((e) => e.id !== id));
    }

    setReviewCount(reviewCount - 1);

    toast.success("Remove review success");
  };

  return (
    <>
      <Container header={`Reviews (${reviewCount})`}>
        <Stack spacing={4} marginBottom={2}>
          {filteredReviews.map((item) =>
            item.user ? (
              <Box key={item.id}>
                <ReviewItem review={item} onRemoved={onRemoved} />
                <Divider />
              </Box>
            ) : null,
          )}
          {filteredReviews.length < listReviews.length && (
            <Button variant="outlined" onClick={onLoadMore}>
              load more
            </Button>
          )}
        </Stack>
        {user && (
          <>
            <Divider />
            <Stack direction="row" spacing={2}>
              <TextAvatar text={user.displayName} />
              <Stack spacing={2} flexGrow={1}>
                <Typography variant="body1" fontWeight={600}>
                  {user.displayName}
                </Typography>
                <TextField
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  multiline
                  rows={4}
                  placeholder="Write your review"
                  variant="outlined"
                />
                <Button
                  variant="contained"
                  size="large"
                  sx={{ width: "max-content" }}
                  startIcon={<SendOutlinedIcon />}
                  loadingPosition="start"
                  loading={addReview.isPending}
                  onClick={onAddReview}
                >
                  post
                </Button>
              </Stack>
            </Stack>
          </>
        )}
      </Container>
    </>
  );
};

export default MediaReview;
