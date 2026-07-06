/// <reference types="vite/client" />

declare module "swiper/css";
declare module "swiper/css/navigation";
declare module "swiper/css/pagination";

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_TMDB_IMAGE_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
