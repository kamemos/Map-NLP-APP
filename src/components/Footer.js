import React from 'react'
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
    root : {
        width : '100%',
        height : '20%',
        backgroundColor : theme.palette.primary.main,
        bottom: 0,
    }
})

class Footer extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <React.Fragment>
            {/* <div style={{height:'100px'}}/> */}
            <div className={this.props.classes.root}>
            </div>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(Footer)