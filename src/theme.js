import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#98ee99',
      main: '#66bb6a',
      dark: '#338a3e',
      contrastText: '#000',
    },
    secondary: {
      light: '#ffa270',
      main: '#ff7043',
      dark: '#c63f17',
      contrastText: '#000',
    },
  },
  spacing: {
    unit: 8
  }
});

export default theme;