import { Component, type ReactNode } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

// Route-level safety net: if any screen throws during render, show a recoverable
// fallback instead of a blank white page.
class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error("MoonFlix render error:", error);
  }

  handleReload = () => {
    window.location.assign("/");
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 3,
            textAlign: "center",
          }}
        >
          <Stack spacing={2} alignItems="center" maxWidth="480px">
            <Typography variant="h4" fontWeight={700}>
              Something went wrong
            </Typography>
            <Typography color="text.secondary">
              An unexpected error interrupted playback. Reloading usually sorts
              it out.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={this.handleReload}
            >
              Reload MoonFlix
            </Button>
          </Stack>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
