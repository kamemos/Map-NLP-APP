import React from 'react'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import OveriewPanel from '../components/OverviewPanel'
import BrandPanel from '../components/BrandPanel'
import ProductPanel from '../components/ProductPanel'
import SentimentPanel from '../components/SentimentPanel'
import IntentionPanel from '../components/IntentionPanel'
import ChannelPanel from '../components/ChannelPanel'
import EngagementPanel from '../components/EngagementPanel'
import TimeSeriesPanel from '../components/TimeSeriesPanel'
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
    dashboardLayout : {
        margin: theme.spacing.unit * 8
    },
    pseudoBox : {
        height: theme.spacing.unit * 2
    }
});

class DashboardPage extends React.Component{
    render(){
        return(
            <div className={this.props.classes.dashboardLayout}>
            <Grid container spacing={24}>
                <Grid item xs={12}>
                    <OveriewPanel/>
                </Grid>
                <Grid item xs={12}>
                    <TimeSeriesPanel/>
                </Grid>
                <Grid item xs={6}>
                    <SentimentPanel/>
                </Grid>
                <Grid item xs={6}>
                    <IntentionPanel/>
                </Grid>
                <Grid item xs={6}>
                    <ChannelPanel/>
                </Grid>
                <Grid item xs={6}>
                    <BrandPanel/>
                </Grid>
                <Grid item xs={12}>
                    <ProductPanel/>
                </Grid>
                <Grid item xs={12}>
                    <EngagementPanel/>
                </Grid>
            </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(DashboardPage)