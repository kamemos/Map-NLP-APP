import React from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import { Bar } from 'react-chartjs-2';
import { withStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';

const styles = (theme) => ({
    root : {
        width : '100%',
    }
});

class ProductPanel extends React.Component {
    constructor(props) {
        super(props)
        this.data = {
            labels: [
                'Others', 
                'Internet Banking', 
                'Money Transfer' , 
                'ATM/Debit Card', 
                'Corporate' , 
                'Deposit Account' , 
                'Investment',
                'Branch',
                'Call Center'
            ],
            datasets: [
              {
                label: 'Overall Intention',
                backgroundColor: 'rgba(54,162,235,0.2)',
                borderColor: 'rgba(54,162,235,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(54,162,235,0.4)',
                hoverBorderColor: 'rgba(54,162,235,1)',
                data: [65, 59, 80, 81, 60, 60 , 60, 60, 60]
              },
            ]
          };
    }

    render(){
        return(
            <ExpansionPanel className={this.props.classes.root} defaultExpanded={true}>
                <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
                    <Typography variant="title" component="h3">Products</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Bar 
                        data={this.data}
                        height={350}
                        options={{
                            maintainAspectRatio: false
                        }}
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

export default withStyles(styles)(ProductPanel)