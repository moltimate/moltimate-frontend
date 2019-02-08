import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  overrides: {
    MuiButton: { // Name of the component ⚛️ / style sheet
      primary: { // Name of the rule
        color: 'green', // Some CSS
      },
    },
  },
  typography: {
    useNextVariants: true,
    fontFamily: 'Nunito, sans-serif',
    color: '#434e61',
    button: {
      fontWeight: 700,
      fontSize: '12px',
    },
  },
});
