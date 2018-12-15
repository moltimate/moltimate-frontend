import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: 'Nunito, sans-serif',
    fontWeight: '700',
    color: '#434e61',
    button: {
      fontWeight: 700,
    },
  },
  palette: {
    primary: { main: '#011638' },
  },
});
