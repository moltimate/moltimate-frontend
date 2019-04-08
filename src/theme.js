import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  palette: {
    primary: {
      light: '#010AD9',
      dark: '#5433FF',
      contrastText: 3,
      main: '#5433FF',
    },
    secondary: {
      light: '#00D9A8',
      dark: '#009EFF',
      contrastText: 3,
      main: '#00D9A8',
    },
    error: {
      main: '#FF6857',
    },
    success: {
      color: '#84C556',
    }
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
