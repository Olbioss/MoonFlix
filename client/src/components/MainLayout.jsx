import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import GlobalLoading from "./common/GlobalLoading";
import Footer from "./common/Footer";
import Topbar from "./common/Topbar";
import AuthModal from "./common/AuthModal";
import { useEffect } from "react";
import { toast } from "react-toastify";
import userApi from "../api/modules/user.api";
import favoriteApi from "../api/modules/favorite.api";
import useAuthStore from "../store/authStore";

const MainLayout = () => {
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);
  const setListFavorites = useAuthStore((s) => s.setListFavorites);

  useEffect(() => {
    const authUser = async () => {
      const { response, err } = await userApi.getInfo();

      if (response) setUser(response);
      if (err) setUser(null);
    };

    authUser();
  }, [setUser]);

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
