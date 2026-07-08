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
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";

import { themeModes } from "../../configs/theme.configs";
import { useUser } from "../../api/queries/user.queries";
import useThemeStore from "../../store/themeStore";
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
  const themeMode = useThemeStore((s) => s.themeMode);
  const setThemeMode = useThemeStore((s) => s.setThemeMode);

  const sidebarWidth = uiConfigs.size.sidebarWidth;

  const onSwitchTheme = () => {
    const theme =
      themeMode === themeModes.dark ? themeModes.light : themeModes.dark;
    setThemeMode(theme);
  };

  const drawer = (
    <>
      <Toolbar sx={{ paddingY: "20px", color: "text.primary" }}>
        <Stack width="100%" direction="row" justifyContent="center">
          <Logo />
        </Stack>
      </Toolbar>
      <List sx={{ paddingX: "30px" }}>
        <Typography variant="h6" marginBottom="20px">
          MENU
        </Typography>
        {menuConfigs.main.map((item, index) => (
          <ListItemButton
            key={index}
            sx={{
              borderRadius: "10px",
              marginY: 1,
              backgroundColor: appState.includes(item.state)
                ? "primary.main"
                : "unset",
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
            <Typography variant="h6" marginBottom="20px">
              PERSONAL
            </Typography>
            {menuConfigs.user.map((item, index) => (
              <ListItemButton
                key={index}
                sx={{
                  borderRadius: "10px",
                  marginY: 1,
                  backgroundColor: appState.includes(item.state)
                    ? "primary.main"
                    : "unset",
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

        <Typography variant="h6" marginBottom="20px">
          THEME
        </Typography>
        <ListItemButton onClick={onSwitchTheme}>
          <ListItemIcon>
            {themeMode === themeModes.dark && <DarkModeOutlinedIcon />}
            {themeMode === themeModes.light && <WbSunnyOutlinedIcon />}
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={
              <Typography textTransform="uppercase">
                {themeMode === themeModes.dark ? "dark mode" : "light mode"}
              </Typography>
            }
          />
        </ListItemButton>
      </List>
    </>
  );

  return (
    <div>
      <Drawer
        open={open}
        onClose={() => toggleSidebar(false)}
        sx={{
          "& .MuiDrawer-Paper": {
            boxSizing: "border-box",
            widh: sidebarWidth,
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
