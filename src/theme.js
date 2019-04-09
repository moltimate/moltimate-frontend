import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  overrides: {
<<<<<<< HEAD
    MuiButton: { // Name of the component ⚛️ / style sheet
      primary: { // Name of the rule
        color: 'green', // Some CSS
      },
=======
    palette: {
      primary: { main: "#3f51b5", contrastText: "#0f0" },
      secondary: { main: "#00D3A9", contrastText: "#f00" }
>>>>>>> dev
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
