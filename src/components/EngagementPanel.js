import React from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import MediaCard from './MediaCard';
import { withStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';

const styles = (theme) => ({
    root : {
        width : '100%',
    },
    mediaBar : {
        display : 'flex',
        flexDirection : 'column',
        justifyContent: 'center',
        alignItems : 'center'
    }
});

class ChannelPanel extends React.Component {
    constructor(props) {
        super(props)
    }

    render(){
        return(
            <ExpansionPanel className={this.props.classes.root} defaultExpanded={false}>
                <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
                    <Typography variant="title" component="h3">Top 3 Engagement Post</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div className={this.props.classes.mediaBar}>
                    <MediaCard/>
                    <MediaCard/>
                    <MediaCard/>
                    </div>
                </ExpansionPanelDetails>
                <Divider/>
                <ExpansionPanelActions>
                    <Button onClick={()=>{this.setState({openSumDialog:true})}}>Summary</Button>
                    <Button>Filters</Button>
                </ExpansionPanelActions>
            </ExpansionPanel>
        )
    }
}

export default withStyles(styles)(ChannelPanel)