import { Paper, Box, LinearProgress, Toolbar } from "@mui/material";
import { useEffect, useState } from "react";
import { useIsFetching } from "@tanstack/react-query";
import Logo from "./Logo";

const GlobalLoading = () => {
  // Show the overlay while any query except the silent background user
  // revalidation is in flight.
  const fetching = useIsFetching({
    predicate: (query) => query.queryKey[0] !== "user",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (fetching > 0) {
      setIsLoading(true);
    } else {
      const timer = setTimeout(() => setIsLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, [fetching]);

  return (
    <>
      <Paper
        sx={{
          opacity: isLoading ? 1 : 0,
          pointerEvents: "none",
          transition: "all .3s ease",
          position: "fixed",
          width: "100vw",
          height: "100vh",
          zIndex: 999,
        }}
      >
        <Toolbar />
        <LinearProgress />
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Logo />
        </Box>
      </Paper>
    </>
  );
};

export default GlobalLoading;
