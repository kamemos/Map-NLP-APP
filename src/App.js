import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import ProjectPage from './pages/ProjectPage'
import DashboardPage from './pages/DashboardPage'
import LiveMsgPage from './pages/LiveMsgPage'
import Nav from './components/Nav'
import Footer from './components/Footer'
import 'typeface-roboto'
import './assets/css/page.css'
import theme from './theme'
import { MuiThemeProvider } from '@material-ui/core/styles';


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
      <React.Fragment>
          <MuiThemeProvider theme={theme}>
          <Nav/>
          <Switch>
            <Route exact path="/project" component={ProjectPage}/>
            <Route exact path="/dashboard" component={DashboardPage}/>
            <Route exact path="/live_message" component={LiveMsgPage}/>
          </Switch>
          <Footer/>
          </MuiThemeProvider>
      </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
