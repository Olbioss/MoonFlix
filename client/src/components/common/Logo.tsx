import { Typography, useTheme } from "@mui/material";

const Logo = () => {
  const theme = useTheme();

  return (
    <Typography
      sx={{
        fontFamily: '"Marcellus", "Georgia", serif',
        textTransform: "uppercase",
        letterSpacing: "0.24em",
        fontSize: "1.3rem",
        whiteSpace: "nowrap",
      }}
    >
      Moon<span style={{ color: theme.palette.primary.main }}>Flix</span>
    </Typography>
  );
};

export default Logo;
