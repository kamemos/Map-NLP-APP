import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import ProjectPage from './pages/ProjectPage'
import DashboardPage from './pages/DashboardPage'
import LiveMsgPage from './pages/LiveMsgPage'
import HomePage from './pages/HomePage'
import TaggingPage from './pages/TaggingPage'
import Nav from './components/Nav'
import Footer from './components/Footer'
import 'typeface-roboto'
import './assets/css/page.css'
import theme from './theme'
import { Provider } from 'mobx-react'
import { MuiThemeProvider } from '@material-ui/core/styles';
import editDialogStore from './store/EditDialogStore'    

class App extends React.Component {
  render() {
    return (

      <BrowserRouter>
      <Provider editDialogStore={editDialogStore}>
          <MuiThemeProvider theme={theme}>
          <Nav/>
          <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/project" component={ProjectPage}/>
            <Route exact path="/dashboard/:pid" component={DashboardPage}/>
            <Route exact path="/live_message" component={LiveMsgPage}/>
            <Route exact path="/tagging" component={TaggingPage}/>
          </Switch>
          <Footer/>
          </MuiThemeProvider>
      </Provider >
      </BrowserRouter>
    );
  }
}

export default App;
