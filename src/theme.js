import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: 'Nunito, sans-serif',
    color: '#434e61',
    button: {
      fontWeight: 700,
      fontSize: '12px',
    },
  },
  palette: {
    primary: { main: '#011638' },
  },
});
