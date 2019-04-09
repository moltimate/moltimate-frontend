import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  palette: {
    primary: {
      dark: '#5433FF',
      main: '#5433FF',
    },
    secondary: {
      dark: '#009EFF',
      main: '#00D9A8',
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
});
