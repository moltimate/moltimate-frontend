import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  overrides: {
    palette: {
      primary: { main: "#3f51b5", contrastText: "#0f0" },
      secondary: { main: "#00D3A9", contrastText: "#f00" }
    },
  },
  typography: {
    useNextVariants: true,
    fontFamily: ['Questrial, sans-serif'],
    color: '#434e61',
    button: {
      fontWeight: 700,
      fontSize: '12px',
    },
  },
});
