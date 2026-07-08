import { SwiperSlide } from "swiper/react";
import AutoSwiper from "./AutoSwiper";
import MediaItem from "./MediaItem";
import { useMediaList } from "../../api/queries/media.queries";

const MediaSlide = ({
  mediaType,
  mediaCategory,
}: {
  mediaType: string;
  mediaCategory: string;
}) => {
  const { data: medias = [] } = useMediaList(mediaType, mediaCategory);

  return (
    <AutoSwiper>
      {medias.map((media, index) => (
        <SwiperSlide key={index}>
          <MediaItem media={media} mediaType={mediaType} />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};

export default MediaSlide;
