import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import menuConfigs from "../../configs/menu.configs";
import Logo from "./Logo";
import uiConfigs from "../../configs/ui.configs";

import { useUser } from "../../api/queries/user.queries";
import useUiStore from "../../store/uiStore";

const Sidebar = ({
  open,
  toggleSidebar,
}: {
  open: boolean;
  toggleSidebar: (value?: boolean) => void;
}) => {
  const { data: user } = useUser();
  const appState = useUiStore((s) => s.appState);

  const sidebarWidth = uiConfigs.size.sidebarWidth;

  const drawer = (
    <>
      <Toolbar sx={{ paddingY: "20px", color: "text.primary" }}>
        <Stack width="100%" direction="row" justifyContent="center">
          <Logo />
        </Stack>
      </Toolbar>
      <List sx={{ paddingX: "30px" }}>
        <Typography
          variant="overline"
          sx={{ color: "primary.main", display: "block", marginBottom: "8px" }}
        >
          Menu
        </Typography>
        {menuConfigs.main.map((item, index) => (
          <ListItemButton
            key={index}
            sx={{
              borderRadius: "10px",
              marginY: 1,
              color: appState.includes(item.state)
                ? "primary.main"
                : "text.primary",
              backgroundColor: appState.includes(item.state)
                ? "rgba(212,185,120,0.10)"
                : "unset",
              "& .MuiListItemIcon-root": { color: "inherit" },
            }}
            component={Link}
            to={item.path}
            onClick={() => toggleSidebar(false)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText
              disableTypography
              primary={
                <Typography textTransform="uppercase">
                  {item.display}
                </Typography>
              }
            />
          </ListItemButton>
        ))}

        {user && (
          <>
            <Typography
              variant="overline"
              sx={{
                color: "primary.main",
                display: "block",
                marginBottom: "8px",
                marginTop: "16px",
              }}
            >
              Personal
            </Typography>
            {menuConfigs.user.map((item, index) => (
              <ListItemButton
                key={index}
                sx={{
                  borderRadius: "10px",
                  marginY: 1,
                  color: appState.includes(item.state)
                    ? "primary.main"
                    : "text.primary",
                  backgroundColor: appState.includes(item.state)
                    ? "rgba(212,185,120,0.10)"
                    : "unset",
                  "& .MuiListItemIcon-root": { color: "inherit" },
                }}
                component={Link}
                to={item.path}
                onClick={() => toggleSidebar(false)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={
                    <Typography textTransform="uppercase">
                      {item.display}
                    </Typography>
                  }
                />
              </ListItemButton>
            ))}
          </>
        )}

      </List>
    </>
  );

  return (
    <div>
      <Drawer
        open={open}
        onClose={() => toggleSidebar(false)}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: sidebarWidth,
            borderRight: "0px",
          },
        }}
      >
        {drawer}
      </Drawer>
    </div>
  );
};

export default Sidebar;
