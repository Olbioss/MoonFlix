import { Box, CircularProgress, Typography } from "@mui/material";

const CircularRate = ({ value }: { value: number }) => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
        width: "max-content",
      }}
    >
      {/* faint track behind the gold ring */}
      <CircularProgress
        variant="determinate"
        value={100}
        size={50}
        sx={{ color: "rgba(233,238,248,0.12)" }}
      />
      <CircularProgress
        variant="determinate"
        value={value * 10}
        color="primary"
        size={50}
        sx={{ position: "absolute", left: 0 }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          fontWeight="600"
          sx={{ marginTop: "-5px" }}
        >
          {Math.floor(value * 10) / 10}
        </Typography>
      </Box>
    </Box>
  );
};

export default CircularRate;
