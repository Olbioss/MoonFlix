import { Box, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";

const Container = ({
  header,
  children,
}: {
  header?: ReactNode;
  children: ReactNode;
}) => {
  return (
    <Box
      sx={{
        marginTop: "5rem",
        color: "text.primary",
      }}
    >
      <Stack spacing={4}>
        {header && (
          <Box
            sx={{
              position: "relative",
              width: "100%",
              "&::after": {
                content: '""',
                position: "absolute",
                left: 0,
                top: "calc(100% + 12px)",
                height: "1px",
                width: "100%",
                backgroundImage:
                  "linear-gradient(to right, rgba(212,185,120,0.6), rgba(212,185,120,0.05))",
              },
            }}
          >
            <Typography
              variant="h5"
              textTransform="uppercase"
              letterSpacing="0.22em"
            >
              {header}
            </Typography>
          </Box>
        )}
        {children}
      </Stack>
    </Box>
  );
};

export default Container;
