import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import GlobalLoading from "./common/GlobalLoading";
import Footer from "./common/Footer";
import Topbar from "./common/Topbar";
import AuthModal from "./common/AuthModal";
import { useEffect } from "react";
import { toast } from "react-toastify";
import favoriteApi from "../api/modules/favorite.api";
import useAuthStore from "../store/authStore";
import { useUser } from "../api/queries/user.queries";

const MainLayout = () => {
  const { data: user } = useUser();
  const setListFavorites = useAuthStore((s) => s.setListFavorites);

  useEffect(() => {
    const getFavorites = async () => {
      const { response, err } = await favoriteApi.getList();

      if (response) setListFavorites(response);
      if (err) toast.error(err.message);
    };

    if (user) getFavorites();
    if (!user) setListFavorites([]);
  }, [user, setListFavorites]);

  return (
    <>
      <GlobalLoading />

      <AuthModal />

      <Box display="flex" minHeight="100vh">
        {/* header */}
        <Topbar />
        {/* header */}

        {/* main */}
        <Box component="main" flexGrow={1} overflow="hidden" minHeight="100vh">
          <Outlet />
        </Box>
        {/* main */}
      </Box>

      {/* footer */}
      <Footer />
      {/* footer */}
    </>
  );
};

export default MainLayout;
