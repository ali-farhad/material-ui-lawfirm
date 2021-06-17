import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { deepOrange } from "@material-ui/core/colors";

import btnBg from "./assets/btnBg.png";
const theme = createMuiTheme({
  palette: {
    primary: deepOrange,
  },
  typography: {
    fontFamily: "Poppins",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
  customBtn: {
    background: `url(${btnBg}) no-repeat`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
});

export default theme;
