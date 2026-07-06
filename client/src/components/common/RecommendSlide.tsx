import AutoSwiper from "./AutoSwiper";
import { SwiperSlide } from "swiper/react";
import MediaItem from "./MediaItem";
import type { Media } from "../../types";

const RecommendSlide = ({
  medias,
  mediaType,
}: {
  medias: Media[];
  mediaType: string;
}) => {
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

export default RecommendSlide;
