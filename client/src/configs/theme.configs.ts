import { createTheme } from "@mui/material/styles";
import { colors, type PaletteMode } from "@mui/material";

export const themeModes = {
  dark: "dark",
  light: "light",
} as const;

const themeConfigs = {
  custom: ({ mode }: { mode: PaletteMode }) => {
    const customPallete =
      mode === themeModes.dark
        ? {
            primary: {
              main: "#ff0000",
              contrastText: "#ffffff",
            },
            secondary: {
              main: "#f44336",
              contrastText: "#ffffff",
            },
            background: {
              default: "#000000",
              paper: "#131313",
            },
          }
        : {
            primary: {
              main: "#ff0000",
            },
            secondary: {
              main: "#f44336",
            },
            background: {
              default: colors.grey["100"],
            },
          };

    return createTheme({
      palette: {
        mode,
        ...customPallete,
      },
      components: {
        MuiButton: {
          defaultProps: { disableElevation: true },
        },
      },
    });
  },
};

export default themeConfigs;
