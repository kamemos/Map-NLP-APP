import React from 'react'
import Grid from '@material-ui/core/Grid';
import EditDialog from '../components/EditDialog'
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
        margin: theme.spacing.unit * 4
    },
    pseudoBox : {
        height: theme.spacing.unit * 2
    }
});

class DashboardPage extends React.Component{
    constructor(props){
        super(props)
        this.pid = this.props.match.params.pid
        this.state = {
            openEditDialog:false,
            text: '',
            sentiment: '',
            intention: '',
            product: '',
        }
    }

    render(){
        const AppContext = React.createContext()
        
        return(
            <React.Fragment>
            <div className={this.props.classes.dashboardLayout}>
            <Grid container spacing={24}>
                {/* <Grid item xs={12}>
                    <Button>Export</Button>
                </Grid> */}
                <Grid item xs={12}>
                    <TimeSeriesPanel pid={this.pid}/>
                </Grid>
                <Grid item xs={6}>
                    <SentimentPanel pid={this.pid}/>
                </Grid>
                <Grid item xs={6}>
                    <IntentionPanel pid={this.pid}/>
                </Grid>
                <Grid item xs={6}>
                    <ChannelPanel pid={this.pid}/>
                </Grid>
                <Grid item xs={6}>
                    <BrandPanel pid={this.pid}/>
                </Grid>
                <Grid item xs={12}>
                    <ProductPanel pid={this.pid}/>
                </Grid>
                <Grid item xs={12}>
                    <EngagementPanel pid={this.pid}/>
                </Grid>
            </Grid>
            </div>
            <EditDialog/>
            </React.Fragment>
            
        )
    }
}

export default withStyles(styles)(DashboardPage)