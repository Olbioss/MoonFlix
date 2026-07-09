import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Typography,
} from "@mui/material";
import { useState, type MouseEvent } from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import menuConfigs from "../../configs/menu.configs";
import { useUser, useLogout } from "../../api/queries/user.queries";
import TextAvatar from "./TextAvatar";

// "name" renders the display name (mobile topbar); "avatar" renders a
// compact avatar trigger (nav rail).
const UserMenu = ({ variant = "name" }: { variant?: "name" | "avatar" }) => {
  const { data: user } = useUser();
  const logout = useLogout();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const toggleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      {user && (
        <>
          {variant === "avatar" ? (
            <Box
              onClick={toggleMenu}
              role="button"
              aria-label="Open user menu"
              sx={{ cursor: "pointer", lineHeight: 0 }}
            >
              <TextAvatar text={user.displayName} />
            </Box>
          ) : (
            <Typography
              variant="body1"
              fontWeight={500}
              sx={{ cursor: "pointer", userSelect: "none" }}
              onClick={toggleMenu}
            >
              {user.displayName}
            </Typography>
          )}
          <Menu
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            slotProps={{ paper: { sx: { padding: 0 } } }}
          >
            {menuConfigs.user.map((item, index) => (
              <ListItemButton
                component={Link}
                to={item.path}
                key={index}
                onClick={handleClose}
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
            <ListItemButton sx={{ borderRadius: "10px" }} onClick={logout}>
              <ListItemIcon>
                <LogoutOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={
                  <Typography textTransform="uppercase">sign out</Typography>
                }
              />
            </ListItemButton>
          </Menu>
        </>
      )}
    </>
  );
};

export default UserMenu;
