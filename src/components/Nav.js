import React from 'react';
import Drawer from './Drawer'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

class Nav extends React.Component {
  constructor(props){
    super(props)
    console.log(props)
  }
  
  render(){
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Drawer/>
            <Typography variant="title" >
              Essense
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}


export default Nav;