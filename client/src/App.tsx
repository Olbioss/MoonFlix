import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PageWrapper from "./components/common/PageWrapper";
import ErrorBoundary from "./components/common/ErrorBoundary";
import themeConfigs from "./configs/theme.configs";
import useThemeStore from "./store/themeStore";
import routes from "./routes/routes";

import "react-toastify/ReactToastify.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import MainLayout from "./components/MainLayout";
import NotFound from "./pages/NotFound";

const App = () => {
  const themeMode = useThemeStore((s) => s.themeMode);

  return (
    <ThemeProvider theme={themeConfigs.custom({ mode: themeMode })}>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        theme={themeMode}
      />
      <CssBaseline />

      {/* app routes */}
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              {routes.map((route, index) =>
                route.index ? (
                  <Route
                    index
                    key={index}
                    element={
                      route.state ? (
                        <PageWrapper state={route.state}>
                          {route.element}
                        </PageWrapper>
                      ) : (
                        route.element
                      )
                    }
                  />
                ) : (
                  <Route
                    path={route.path}
                    key={index}
                    element={
                      route.state ? (
                        <PageWrapper state={route.state}>
                          {route.element}
                        </PageWrapper>
                      ) : (
                        route.element
                      )
                    }
                  />
                ),
              )}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
      {/* app routes */}

      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </ThemeProvider>
  );
};

export default App;
