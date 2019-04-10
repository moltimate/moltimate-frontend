import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  palette: {
    primary: {
      light: '#010AD9',
      dark: '#5433FF',
      main: '#5433FF',
    },
    secondary: {
      light: '#00D9A8',
      dark: '#009EFF',
      main: '#20BDFF',
    },
    error: {
      main: '#FF6857',
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
  overrides: {
    MuiButton: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        borderRadius: 25,
        padding: '10px 20px',
      },
    },
  },
});
