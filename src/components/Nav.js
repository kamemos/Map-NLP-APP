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
            <h3 style={{color:'white'}}><i style={{color:'red',fontSize:'150%'}}>D</i>eep-<i style={{color:'red',fontSize:'150%'}}>S</i>ight</h3>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}


export default Nav;