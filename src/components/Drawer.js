import React from 'react'
import { Link } from 'react-router-dom'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';

const styles = {menu:{
    marginLeft: -12,
    marginRight: 20
}}

class Drawer extends React.Component{
    constructor(props){
        super(props)
        this.state = {isToggle : false,
                      isRedirect : false,
                      redirectLink : ''};
        this.handleToggle = this.handleToggle.bind(this)
    }

    handleToggle(){
        let notIsToggle = !this.state.isToggle
        this.setState({isToggle:notIsToggle})
    }

    handleRedirect(text){
        this.setState({redirectLink:text,isRedirect:true})
    }

    render(){
        const sideList = (
            <div>
                <List>
                    <Divider />
                    <Link to="/home" style={{ textDecoration: 'none' }}>
                    <ListItem button>
                        <Avatar>
                            <Icon color='secondary'>home</Icon>
                        </Avatar>
                        <ListItemText>
                            Home
                        </ListItemText>
                    </ListItem>
                    </Link>
                    <Divider />
                    <Link to="/project" style={{ textDecoration: 'none' }}>
                        <ListItem button>
                            <Avatar>
                                <Icon color='secondary'>folder</Icon>
                            </Avatar>
                            <ListItemText>
                                Project
                            </ListItemText>
                        </ListItem>
                    </Link>
                    <Divider />
                    <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                        <ListItem button>
                            <Avatar>
                                <Icon color='secondary'>insert_chart_outlined</Icon>
                            </Avatar>
                            <ListItemText>
                                Dashboard
                            </ListItemText>
                        </ListItem>
                    </Link>
                    <Divider />
                    <ListItem button>
                        <Avatar>
                            <Icon color='secondary'>local_offer</Icon>
                        </Avatar>
                        <ListItemText>
                            Tagging
                        </ListItemText>
                    </ListItem>
                    <Divider />
                    <Link to="/live_message" style={{ textDecoration: 'none' }}>
                    <ListItem button>
                        <Avatar>
                            <Icon color='secondary'>chat_bubble</Icon>
                        </Avatar>
                        <ListItemText>
                            Live Message
                        </ListItemText>
                    </ListItem>
                    </Link>
                    <Divider />
                    <ListItem button>
                        <Avatar>
                            <Icon color='secondary'>help</Icon>
                        </Avatar>
                        <ListItemText>
                            Help
                        </ListItemText>
                    </ListItem>
                    <Divider />
                </List>
            </div>
        );

        return (
            <React.Fragment>
                <IconButton className={this.props.classes.menu} onClick={this.handleToggle}><Icon>menu</Icon></IconButton>
                <SwipeableDrawer 
                    anchor='left'
                    open={this.state.isToggle}
                    onClose={this.handleToggle}
                    onOpen={this.handleToggle}
                >
                <div
                    tabIndex={0}
                    role="button"
                    onClick={this.handleToggle}
                    onKeyDown={this.handleToggle}
                >
                
                    {sideList}
                </div>
                </SwipeableDrawer>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(Drawer);