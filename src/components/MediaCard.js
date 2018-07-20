import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Chip,Divider } from '@material-ui/core/';
import Avatar from '@material-ui/core/Avatar';
import { IconButton,Icon } from '@material-ui/core';
import { observer,inject } from 'mobx-react'

const styles = theme => ({
    paper: {
        width: '70%',
        margin: theme.spacing.unit,
        padding: theme.spacing.unit * 2,
        display: 'flex',
        minHeight: '80px',
        flexDirection : 'column'
    },
    chip : {
        margin: '5px'
    }
});

@inject('editDialogStore')
@observer
class MediaCard extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            open: false,
            sentiment: this.props.sentiment,
            intention: this.props.intention,
            product: this.props.product
        }
    }

    handleEditDialog = ()=>{
        let editDialogStore = this.props.editDialogStore
        console.log(this.props)
        editDialogStore.setOpen(true)
        editDialogStore.setText(this.props.text)
        editDialogStore.setSentiment(this.props.sentiment)
        editDialogStore.setIntention(this.props.intention)
        editDialogStore.setProduct(this.props.product)
    }

    render() {
        const classes = this.props.classes 
        return (
            <Paper className={this.props.classes.paper}>
                <Typography>{this.props.text}</Typography>
                <div style={{height:'10px'}}/>
                <Divider/>
                <div style={{height:'5px'}}/>
                <div style={{display:'flex',justifyContent:'flex-end',flexWrap:'wrap'}}>
                    <Chip className={classes.chip} label={this.props.sentiment}/>
                    <Chip className={classes.chip} label={this.props.intention}/>
                    <Chip className={classes.chip} label={this.props.product}/>
                    <IconButton onClick={this.handleEditDialog}><Icon>edit</Icon></IconButton>
                </div>
            </Paper>
        );
    }
}

export default withStyles(styles)(MediaCard);