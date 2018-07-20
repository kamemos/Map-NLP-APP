import React from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';
import { Line } from 'react-chartjs-2';
import axios from 'axios'

const styles = (theme) => ({
    root : {
        width : '100%',
    },
});

class TimeSeriesPanel extends React.Component {
    constructor(props) {
        super(props)
        this.pid = this.props.pid
        this.state = {
            dataset : {
                labels: [],
                datasets: [
                  {
                    label: 'Engagement',
                    fill: false,
                    lineTension: 0.1,
                    cubicInterpolationMode: 'monotone',
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: []
                  }
                ]
              }
        }
    }

    componentDidMount(){
        let obj = {pid : this.pid}
        console.log('time series')
        axios.post('/dashboard/get_engagement',obj).then((res)=>{
            console.log('time series',res.data)
            let labels = [];
            let data = []
            res.data.engagement.forEach((engage)=>{
                labels.push(engage[0])
                data.push(engage[1])
            })
            let dataset = {
                labels: labels,
                datasets: [
                  {
                    label: 'Engagement',
                    fill: false,
                    lineTension: 0.1,
                    cubicInterpolationMode: 'monotone',
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: data
                  }
                ]
              }
            this.setState({dataset:dataset})
        })
    }

    render() {
        return (
            <ExpansionPanel className={this.props.classes.root} defaultExpanded={true}>
                <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
                    <Typography variant="title" component="h3">Engagement</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={this.props.classes.content}>
                    <Line 
                        data={this.state.dataset} 
                        height={350}
                        options={{
                            maintainAspectRatio: false,
                            legend:{display:false},
                            scales: {
                                xAxes: [{
                                    type: 'time',
                                    time: {
                                        displayFormats: {
                                            time: 'day',
                                            // quarter: 'D MMM YYYY'
                                        }
                                    }
                                }]
                            }
                        }}
                    />
                </ExpansionPanelDetails>
            </ExpansionPanel>
        )
    }
}

export default withStyles(styles)(TimeSeriesPanel)