import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  useScrollTrigger,
} from "@mui/material";
import { cloneElement, useState, type ReactElement } from "react";
import { Link } from "react-router-dom";
import menuConfigs from "../../configs/menu.configs";
import { useUser } from "../../api/queries/user.queries";
import useUiStore from "../../store/uiStore";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import Sidebar from "./Sidebar";

const ScrollAppbar = ({
  children,
  window,
}: {
  children: ReactElement<any>;
  window?: () => Window;
}) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
    target: window ? window() : undefined,
  });
  return cloneElement(children, {
    sx: {
      color: "text.primary",
      backgroundColor: trigger ? "rgba(10,13,21,0.85)" : "transparent",
      backdropFilter: trigger ? "blur(12px)" : "none",
      borderBottom: trigger ? "1px solid rgba(233,238,248,0.08)" : "none",
      transition: "background-color .35s ease, backdrop-filter .35s ease",
    },
  });
};

const Topbar = () => {
  const { data: user } = useUser();
  const appState = useUiStore((s) => s.appState);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const setAuthModalOpen = useUiStore((s) => s.setAuthModalOpen);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <>
      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
      <ScrollAppbar>
        <AppBar elevation={0} sx={{ zIndex: 9999 }}>
          <Toolbar
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton
                color="inherit"
                aria-label="Open navigation menu"
                sx={{ mr: 2, display: { md: "none" } }}
                onClick={toggleSidebar}
              >
                <MenuIcon />
              </IconButton>

              <Box sx={{ display: { xs: "inline-block", md: "none" } }}>
                <Logo />
              </Box>
            </Stack>

            <Box
              flexGrow={1}
              alignItems="center"
              display={{ xs: "none", md: "flex" }}
            >
              <Box sx={{ marginRight: "30px" }}>
                <Logo />
              </Box>
              {menuConfigs.main.map((item, index) => (
                <Button
                  key={index}
                  sx={{
                    color: appState.includes(item.state)
                      ? "primary.contrastText"
                      : "inherit",
                    mr: 2,
                  }}
                  component={Link}
                  to={item.path}
                  variant={appState.includes(item.state) ? "contained" : "text"}
                >
                  {item.display}
                </Button>
              ))}
            </Box>
            {/* user menu */}
            <Stack spacing={3} direction="row" alignContent="center">
              {!user && (
                <Button
                  variant="contained"
                  onClick={() => setAuthModalOpen(true)}
                >
                  sign in
                </Button>
              )}
            </Stack>
            {user && <UserMenu />}
            {/* user menu */}
          </Toolbar>
        </AppBar>
      </ScrollAppbar>
    </>
  );
};

export default Topbar;
