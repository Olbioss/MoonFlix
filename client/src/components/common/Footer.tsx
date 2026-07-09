import Container from "./Container";
import { Box, Button, Paper, Stack } from "@mui/material";
import Logo from "./Logo";
import menuConfigs from "../../configs/menu.configs";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Container>
      <Paper
        square={true}
        sx={{
          backgroundImage: "unset",
          padding: "2rem",
          border: "none",
          borderTop: "1px solid rgba(212,185,120,0.25)",
        }}
      >
        <Stack
          alignItems={"center"}
          justifyContent={"space-between"}
          direction={{ xs: "column", md: "row" }}
          sx={{ height: "max-content" }}
        >
          <Logo />
          <Box>
            {menuConfigs.main.map((item, index) => (
              <Button
                key={index}
                sx={{ color: "text.secondary" }}
                component={Link}
                to={item.path}
              >
                {item.display}
              </Button>
            ))}
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Footer;
