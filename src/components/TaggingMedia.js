import React from 'react'
import { Paper,Typography,Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
    paper : {
        width : '60%',
        padding : theme.spacing.unit * 2
    }
})

class TaggingMedia extends React.Component{
    constructor(props){
        super(props)
        this.sentiments = ['positive',
                          'neutral',
                          'negative']
        this.intentions = ['General', 
                           'Information',
                           'Participation', 
                           'Enquiry', 
                           'Compliment', 
                           'Complaint']
        this.products = ['Others', 
                        'Internet Banking', 
                        'Money Transfer' , 
                        'ATM/Debit Card', 
                        'Corporate' , 
                        'Deposit Account' , 
                        'Investment',
                        'Branch',
                        'Call Center']
    }

    render(){
        return(
            <Paper className={this.props.classes.paper} elevation={1}>
                <Typography component="p">
                Paper can be used to build surface or other elements for your application.
                </Typography>
                <Divider/>
                <Typography component="p">
                [Paper] [can] [be] [used] [to] [build] [surface] [or] [other] [elements] [for] [your] [application].
                </Typography>
            </Paper>
        )
    }
}

export default withStyles(styles)(TaggingMedia)