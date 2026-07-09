import { useEffect, type ReactNode } from "react";
import useUiStore from "../../store/uiStore";

const pageTitles: Record<string, string> = {
  home: "Home",
  movie: "Movies",
  tv: "TV Series",
  search: "Search",
  favorite: "Favorites",
  reviews: "Reviews",
  "password.update": "Settings",
};

const PageWrapper = ({
  state,
  children,
}: {
  state: string;
  children: ReactNode;
}) => {
  const setAppState = useUiStore((s) => s.setAppState);

  useEffect(() => {
    window.scrollTo(0, 0);
    setAppState(state);

    // Detail pages overwrite this with the media/person name once loaded.
    const label = pageTitles[state];
    document.title = label ? `MoonFlix · ${label}` : "MoonFlix";
  }, [state, setAppState]);

  return children;
};

export default PageWrapper;
