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
import axios from 'axios'
import SummaryDialog from './SummaryDialog'

const styles = (theme) => ({
    root : {
        width : '100%',
    }
});

class ChannelPanel extends React.Component {
    constructor(props) {
        super(props)
        this.pid = this.props.pid
        this.state = {
            openSumDialog : false,
            data : [],
            labels: [],
            dataset : {
                labels: [],
                datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: []
                }
                ]
            }
        }
    }

    componentDidMount(){
        let obj = {pid : this.pid}
        axios.post('/dashboard/get_channel',obj).then((res)=>{
            let labels = []
            let data = []
            for (let [key, value] of Object.entries(res.data.channel)) {
                labels.push(key)
                data.push(value)
            }
            this.setState({
                data : data,
                labels : labels,
                dataset : {
                    labels: labels,
                    datasets: [
                    {
                        label: 'My First dataset',
                        backgroundColor: 'rgba(255,99,132,0.2)',
                        borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                        hoverBorderColor: 'rgba(255,99,132,1)',
                        data: data
                    }
                    ]
                }
            })
        })
    }

    render(){
        return(
            <React.Fragment>
            <ExpansionPanel className={this.props.classes.root} defaultExpanded={true}>
                <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
                    <Typography variant="title" component="h3">Channel</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <HorizontalBar
                        data={this.state.dataset}
                        options={{legend:{display:false}}}
                    />
                </ExpansionPanelDetails>
                <Divider/>
                <ExpansionPanelActions>
                    <Button onClick={()=>{this.setState({openSumDialog:true})}}>Summary</Button>
                </ExpansionPanelActions>
            </ExpansionPanel>

            <SummaryDialog
                open={this.state.openSumDialog} 
                close={()=>{this.setState({openSumDialog:false})}}
                head='Channel Summary'
                values={this.state.data}
                labels={this.state.labels}
            />
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(ChannelPanel)