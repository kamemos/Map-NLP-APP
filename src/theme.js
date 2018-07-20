import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#6fbf73',
      main: '#4caf50',
      dark: '#357a38',
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