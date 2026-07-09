import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Button,
  IconButton,
  Stack,
  Toolbar,
  useScrollTrigger,
} from "@mui/material";
import { cloneElement, useState, type ReactElement } from "react";
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
      display: { xs: "block", md: "none" },
      color: "text.primary",
      backgroundColor: trigger ? "rgba(10,13,21,0.85)" : "transparent",
      backdropFilter: trigger ? "blur(12px)" : "none",
      borderBottom: trigger ? "1px solid rgba(233,238,248,0.08)" : "none",
      transition: "background-color .35s ease, backdrop-filter .35s ease",
    },
  });
};

// Mobile-only chrome: a slim translucent bar with the drawer trigger and
// wordmark. Desktop navigation lives in NavRail.
const Topbar = () => {
  const { data: user } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const setAuthModalOpen = useUiStore((s) => s.setAuthModalOpen);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <>
      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
      <ScrollAppbar>
        <AppBar elevation={0}>
          <Toolbar
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton
                color="inherit"
                aria-label="Open navigation menu"
                onClick={toggleSidebar}
              >
                <MenuIcon />
              </IconButton>
              <Logo />
            </Stack>

            {/* user menu */}
            {!user && (
              <Button
                variant="outlined"
                onClick={() => setAuthModalOpen(true)}
              >
                sign in
              </Button>
            )}
            {user && <UserMenu />}
            {/* user menu */}
          </Toolbar>
        </AppBar>
      </ScrollAppbar>
    </>
  );
};

export default Topbar;
