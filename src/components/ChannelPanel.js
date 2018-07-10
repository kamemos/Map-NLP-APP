import React from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import { HorizontalBar } from 'react-chartjs-2';
import { withStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';

const styles = (theme) => ({
    root : {
        width : '100%',
    }
});

class ChannelPanel extends React.Component {
    constructor(props) {
        super(props)
        this.data = {
            labels: ['Facebook', 'Twitter', 'Instragram','Pantip'],
            datasets: [
              {
                label: 'My First dataset',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: [65, 59, 80, 70]
              }
            ]
        };
    }

    render(){
        return(
            <ExpansionPanel className={this.props.classes.root} defaultExpanded={true}>
                <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
                    <Typography variant="title" component="h3">Channel</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <HorizontalBar
                        data={this.data}
                        options={{legend:{display:false}}}
                    />
                </ExpansionPanelDetails>
                <Divider/>
                <ExpansionPanelActions>
                    <Button>Summary</Button>
                    <Button>Filters</Button>
                </ExpansionPanelActions>
            </ExpansionPanel>
        )
    }
}

export default withStyles(styles)(ChannelPanel)