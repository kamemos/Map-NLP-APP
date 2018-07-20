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

class BrandPanel extends React.Component {
    constructor(props) {
        super(props)
        this.data = {
            labels: ['KBank', 'SCB', 'KTC', 'Bay'],
            datasets: [
              {
                label: 'Overall Intention',
                backgroundColor: 'rgba(0,200,83,0.2)',
                borderColor: 'rgba(0,200,83,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(0,200,83,0.4)',
                hoverBorderColor: 'rgba(0,200,83,1)',
                data: [0,0,0,0]
              },
              
            ]
          };
    }

    render(){
        return(
            <ExpansionPanel className={this.props.classes.root} defaultExpanded={true}>
                <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
                    <Typography variant="title" component="h3">Brands</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <HorizontalBar 
                        data={this.data}
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

export default withStyles(styles)(BrandPanel)