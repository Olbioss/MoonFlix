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
import menuConfigs from "../../configs/menu.configs";
import { useUser, useLogout } from "../../api/queries/user.queries";

const UserMenu = () => {
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
          <Typography
            variant="h6"
            sx={{ cursor: "pointer", userSelect: "none" }}
            onClick={toggleMenu}
          >
            {user.displayName}
          </Typography>
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
