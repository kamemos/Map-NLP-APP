import React from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
    root : {
        width : '100%',
    },
    content : {
        display : 'flex',
        justifyContent : 'center',
        flexWrap : 'wrap'
    },
    paper : {
        padding : theme.spacing.unit,
        height : '80px',
        display: 'flex',
        margin: theme.spacing.unit,
    },
    pseudoBox : {
        height : theme.spacing.unit * 2
    },
});

class OverviewPanel extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <React.Fragment>
            <ExpansionPanel className={this.props.classes.root} defaultExpanded={true}>
                <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
                    <Typography variant="title" component="h3">Overview</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={this.props.classes.content}>
                    <Paper className={this.props.classes.paper}>
                        <ListItem>
                            <Avatar>
                                <Icon>tag_faces</Icon>
                            </Avatar>
                            <ListItemText primary="1000" secondary="view" />
                        </ListItem>
                    </Paper>
                    <Paper className={this.props.classes.paper}>
                        <ListItem>
                            <Avatar>
                                <Icon>mode_comment</Icon>
                            </Avatar>
                            <ListItemText primary="1000" secondary="Engagement" />
                        </ListItem>
                    </Paper>
                    <Paper className={this.props.classes.paper}>
                        <ListItem>
                            <Avatar>
                                <Icon>bubble_chart</Icon>
                            </Avatar>
                            <ListItemText primary="1000" secondary="Mention" />
                        </ListItem>
                    </Paper>
                    <Paper className={this.props.classes.paper}>
                        <ListItem>
                            <Avatar>
                                <Icon>sentiment_very_dissatisfied</Icon>
                            </Avatar>
                            <ListItemText primary="30.2%" secondary="Negative" />
                        </ListItem>
                    </Paper>
                    <Paper className={this.props.classes.paper}>
                        <ListItem>
                            <Avatar>
                                <Icon>public</Icon>
                            </Avatar>
                            <ListItemText primary="Facebook" secondary="Top Channel" />
                        </ListItem>
                    </Paper>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(OverviewPanel)