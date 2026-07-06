import { useEffect } from "react";
import useUiStore from "../../store/uiStore";

const PageWrapper = ({ state, children }) => {
  const setAppState = useUiStore((s) => s.setAppState);

  useEffect(() => {
    window.scrollTo(0, 0);
    setAppState(state);
  }, [state, setAppState]);

  return children;
};

export default PageWrapper;
