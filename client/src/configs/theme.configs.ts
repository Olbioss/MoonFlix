import { createTheme } from "@mui/material/styles";
import { type PaletteMode } from "@mui/material";

export const themeModes = {
  dark: "dark",
  light: "light",
} as const;

// A refined Netflix-red identity: a slightly deeper, less harsh red than pure
// #ff0000, near-black surfaces with a hint of lift on paper, and quiet dividers.
const brandRed = {
  main: "#e50914",
  light: "#ff2e3d",
  dark: "#b20710",
  contrastText: "#ffffff",
};

const themeConfigs = {
  custom: ({ mode }: { mode: PaletteMode }) => {
    const isDark = mode === themeModes.dark;

    const customPalette = isDark
      ? {
          primary: brandRed,
          secondary: {
            main: "#f5f5f5",
            contrastText: "#0a0a0a",
          },
          background: {
            default: "#0a0a0a",
            paper: "#171717",
          },
          text: {
            primary: "#ffffff",
            secondary: "rgba(255,255,255,0.68)",
          },
          divider: "rgba(255,255,255,0.09)",
        }
      : {
          primary: brandRed,
          secondary: {
            main: "#1a1a1a",
            contrastText: "#ffffff",
          },
          background: {
            default: "#f4f4f5",
            paper: "#ffffff",
          },
          text: {
            primary: "#141414",
            secondary: "rgba(0,0,0,0.6)",
          },
          divider: "rgba(0,0,0,0.08)",
        };

    return createTheme({
      palette: {
        mode,
        ...customPalette,
      },
      shape: {
        borderRadius: 8,
      },
      typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h4: { fontWeight: 700, letterSpacing: "-0.5px" },
        h5: { fontWeight: 700, letterSpacing: "-0.25px" },
        h6: { fontWeight: 700 },
        button: { fontWeight: 600, letterSpacing: "0.3px" },
      },
      components: {
        MuiButton: {
          defaultProps: { disableElevation: true },
          styleOverrides: {
            root: {
              borderRadius: 8,
              paddingInline: 20,
              transition:
                "transform .15s ease, background-color .2s ease, box-shadow .2s ease",
              "&:hover": { transform: "translateY(-1px)" },
            },
          },
        },
        MuiIconButton: {
          styleOverrides: {
            root: { transition: "transform .15s ease, color .2s ease" },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: { backgroundImage: "none" },
          },
        },
        MuiCssBaseline: {
          styleOverrides: {
            html: { scrollBehavior: "smooth" },
            body: { transition: "background-color .3s ease" },
            "*::-webkit-scrollbar": { width: 8, height: 8 },
            "*::-webkit-scrollbar-track": { backgroundColor: "transparent" },
            "*::-webkit-scrollbar-thumb": {
              backgroundColor: isDark
                ? "rgba(229,9,20,0.45)"
                : "rgba(0,0,0,0.25)",
              borderRadius: 8,
            },
            "*::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "rgba(229,9,20,0.7)",
            },
          },
        },
      },
    });
  },
};

export default themeConfigs;
