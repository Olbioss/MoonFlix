import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import GlobalLoading from "./common/GlobalLoading";
import Footer from "./common/Footer";
import Topbar from "./common/Topbar";
import NavRail from "./common/NavRail";
import AuthModal from "./common/AuthModal";
import uiConfigs from "../configs/ui.configs";

const MainLayout = () => {
  return (
    <>
      <GlobalLoading />

      <AuthModal />

      <Box display="flex" minHeight="100vh">
        {/* navigation: rail on desktop, topbar + drawer on mobile */}
        <NavRail />
        <Topbar />
        {/* navigation */}

        {/* main */}
        <Box
          component="main"
          flexGrow={1}
          overflow="hidden"
          minHeight="100vh"
          sx={{
            paddingLeft: { md: uiConfigs.size.railWidth },
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* grows so the footer sits at the viewport bottom on short pages */}
          <Box flexGrow={1}>
            <Outlet />
          </Box>

          <Footer />
        </Box>
        {/* main */}
      </Box>
    </>
  );
};

export default MainLayout;
