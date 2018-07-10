import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
    paper: {
        width: '70%',
        margin: theme.spacing.unit,
        padding: theme.spacing.unit * 2,
    },
});

class MediaCard extends React.Component {
  render() {
    return (
        <Paper className={this.props.classes.paper}>
            <Grid container wrap="nowrap" spacing={16}>
            <Grid item>
                <Avatar>W</Avatar>
            </Grid>
            <Grid item xs>
                <Typography>hello this is message from facebook hello this is message from facebook hello this is message from facebook hello this is message from facebook hello this is message from facebook hello this is message from facebook hello this is message from facebook hello this is message from facebook hello this is message from facebook hello this is message from facebook hello this is message from facebook</Typography>
            </Grid>
            </Grid>
        </Paper>
    );
  }
}

export default withStyles(styles)(MediaCard);