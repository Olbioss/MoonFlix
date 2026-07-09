import { createTheme } from "@mui/material/styles";

// "Selene" — MoonFlix's lunar-noir identity. A single committed dark theme:
// night-ink surfaces, moon-silver text, and one champagne-gold accent.
// Display type is Marcellus (ships in weight 400 only — never bold it),
// body/UI type is Archivo.
const selene = {
  ink: "#0A0D15",
  surface: "#131A29",
  silver: "#E9EEF8",
  muted: "#8C97AE",
  gold: "#D4B978",
  goldLight: "#E5CF9A",
  goldDark: "#B39A5C",
};

const marcellus = '"Marcellus", "Georgia", serif';

const themeConfigs = {
  custom: () =>
    createTheme({
      palette: {
        // Hardcoded dark keeps MUI's dark defaults (Skeleton, Modal backdrop,
        // action states) correct for the night palette.
        mode: "dark",
        primary: {
          main: selene.gold,
          light: selene.goldLight,
          dark: selene.goldDark,
          // Dark text on gold — gold is a light accent, white would wash out.
          contrastText: selene.ink,
        },
        secondary: {
          main: selene.silver,
          contrastText: selene.ink,
        },
        background: {
          default: selene.ink,
          paper: selene.surface,
        },
        text: {
          primary: selene.silver,
          secondary: selene.muted,
        },
        divider: "rgba(233,238,248,0.09)",
      },
      shape: {
        borderRadius: 10,
      },
      typography: {
        fontFamily: '"Archivo", "Helvetica", "Arial", sans-serif',
        h1: { fontFamily: marcellus, fontWeight: 400 },
        h2: { fontFamily: marcellus, fontWeight: 400 },
        h3: { fontFamily: marcellus, fontWeight: 400 },
        h4: { fontFamily: marcellus, fontWeight: 400, letterSpacing: "0.02em" },
        h5: { fontFamily: marcellus, fontWeight: 400, letterSpacing: "0.02em" },
        h6: { fontFamily: marcellus, fontWeight: 400, letterSpacing: "0.02em" },
        overline: {
          fontFamily: marcellus,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
        },
        button: {
          fontWeight: 500,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        },
      },
      components: {
        MuiButton: {
          defaultProps: { disableElevation: true },
          styleOverrides: {
            root: {
              borderRadius: 999,
              paddingInline: 26,
              transition: "all .35s ease",
            },
            outlinedPrimary: {
              borderColor: "rgba(212,185,120,0.55)",
              "&:hover": {
                borderColor: selene.gold,
                backgroundColor: "rgba(212,185,120,0.08)",
              },
            },
            sizeLarge: {
              paddingBlock: 10,
            },
          },
        },
        MuiIconButton: {
          styleOverrides: {
            root: { transition: "transform .15s ease, color .2s ease" },
          },
        },
        MuiChip: {
          styleOverrides: {
            root: { borderRadius: 999 },
            filledPrimary: {
              backgroundColor: "rgba(212,185,120,0.10)",
              border: "1px solid rgba(212,185,120,0.35)",
              color: selene.gold,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontSize: "0.72rem",
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              backgroundImage: "none",
              border: "1px solid rgba(233,238,248,0.06)",
            },
          },
        },
        MuiCssBaseline: {
          styleOverrides: {
            html: { scrollBehavior: "smooth" },
            body: { backgroundColor: selene.ink },
            "::selection": {
              backgroundColor: "rgba(212,185,120,0.35)",
              color: selene.silver,
            },
            "*::-webkit-scrollbar": { width: 6, height: 6 },
            "*::-webkit-scrollbar-track": { backgroundColor: "transparent" },
            "*::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(212,185,120,0.35)",
              borderRadius: 999,
            },
            "*::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "rgba(212,185,120,0.6)",
            },
          },
        },
      },
    }),
};

export default themeConfigs;
