import { Box, Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Logo from "../components/common/Logo";
import uiConfigs from "../configs/ui.configs";

const NotFound = () => {
  return (
    <Box
      sx={{
        ...uiConfigs.style.mainContent,
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Stack spacing={3} alignItems="center" maxWidth="520px">
        <Logo />
        <Typography
          sx={{
            fontFamily: '"Marcellus", "Georgia", serif',
            fontSize: { xs: "6rem", md: "10rem" },
            lineHeight: 1,
            backgroundImage: "linear-gradient(180deg, #E5CF9A, #B39A5C)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          404
        </Typography>
        <Typography variant="h5">Lost in orbit</Typography>
        <Typography color="text.secondary">
          The page you&apos;re looking for drifted off into deep space.
          Let&apos;s get you back to the good stuff.
        </Typography>
        <Button
          variant="outlined"
          size="large"
          component={Link}
          to="/"
          startIcon={<HomeOutlinedIcon />}
        >
          Back home
        </Button>
      </Stack>
    </Box>
  );
};

export default NotFound;
