import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { Box, IconButton, Stack, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import menuConfigs from "../../configs/menu.configs";
import uiConfigs from "../../configs/ui.configs";
import { useUser } from "../../api/queries/user.queries";
import useUiStore from "../../store/uiStore";
import UserMenu from "./UserMenu";

// Desktop navigation: a slim fixed icon rail on the left edge. The active
// route is marked by a glowing gold bar hugging the viewport edge. On
// mobile the rail hides and Topbar + Sidebar take over.
const NavRail = () => {
  const { data: user } = useUser();
  const appState = useUiStore((s) => s.appState);
  const setAuthModalOpen = useUiStore((s) => s.setAuthModalOpen);

  // Favorites joins the rail when signed in; reviews/password stay in the
  // user menu.
  const items = user
    ? [...menuConfigs.main, menuConfigs.user[0]]
    : menuConfigs.main;

  return (
    <Box
      component="nav"
      aria-label="Primary"
      sx={{
        display: { xs: "none", md: "flex" },
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        width: uiConfigs.size.railWidth,
        zIndex: (theme) => theme.zIndex.appBar,
        flexDirection: "column",
        alignItems: "center",
        paddingY: "22px",
        backgroundColor: "rgba(10,13,21,0.9)",
        backdropFilter: "blur(10px)",
        borderRight: "1px solid rgba(233,238,248,0.07)",
      }}
    >
      {/* crescent glyph — the rail-sized wordmark */}
      <Box
        component={Link}
        to="/"
        aria-label="MoonFlix home"
        sx={{
          width: "26px",
          height: "26px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 68% 35%, transparent 0 46%, #D4B978 50%)",
          marginBottom: "26px",
          flexShrink: 0,
        }}
      />

      <Stack spacing={0.5} alignItems="center" width="100%" flexGrow={1}>
        {items.map((item) => {
          const active = appState.includes(item.state);
          return (
            <Box
              key={item.state}
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  top: "10px",
                  bottom: "10px",
                  width: "2px",
                  backgroundColor: active ? "primary.main" : "transparent",
                  boxShadow: active
                    ? "0 0 10px rgba(212,185,120,0.8)"
                    : "none",
                  transition: "background-color .35s ease",
                },
              }}
            >
              <Tooltip title={item.display} placement="right">
                <IconButton
                  component={Link}
                  to={item.path}
                  aria-label={item.display}
                  sx={{
                    color: active ? "text.primary" : "text.secondary",
                    "&:hover": { color: "text.primary" },
                  }}
                >
                  {item.icon}
                </IconButton>
              </Tooltip>
            </Box>
          );
        })}
      </Stack>

      {user ? (
        <UserMenu variant="avatar" />
      ) : (
        <Tooltip title="sign in" placement="right">
          <IconButton
            aria-label="Sign in"
            onClick={() => setAuthModalOpen(true)}
            sx={{ color: "primary.main" }}
          >
            <LoginOutlinedIcon />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
};

export default NavRail;
