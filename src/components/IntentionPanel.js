import React from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import FilterDialog from './FilterDialog'
import SampleDialog from './SampleDialog'
import SummaryDialog from './SummaryDialog'
import { Bar } from 'react-chartjs-2';
import { HorizontalBar } from 'react-chartjs-2';
import { withStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import { Dialog,DialogTitle,DialogContent,DialogActions } from '@material-ui/core';
import { GridList,GridListTile,ListSubheader } from '@material-ui/core';
import { List,ListItem,ListItemText,Avatar } from '@material-ui/core';

const styles = (theme) => ({
    root : {
        width : '100%',
    }
});

class IntentionPanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            openSamDialog : false,
            openSumDialog : false,
            openFltDialog : false,
            data : [],
            label: [],
            samples : [],
            filteredSamples : [],
            isLoading : false,
            dataset : {
                labels: ['General', 'Information', 'Participation', 'Enquiry', 'Compliment', 'Complaint'],
                datasets: [
                  {
                    label: 'Overall Intention',
                    backgroundColor: 'rgba(255,206,86,0.2)',
                    borderColor: 'rgba(255,206,86,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,206,86,0.4)',
                    hoverBorderColor: 'rgba(255,206,86,1)',
                    data: [0,0,0,0,0,0]
                  }
                ]
            }
        }
        this.pid = this.props.pid
    }

    handleChangeDataset = (values,labels) => {
        var lbs = []
        labels.forEach((x)=>{
            if (x !== 'complaint/suggestion'){
                lbs.push(x)
            }
            else lbs.push('complaint')
        })
        let dataset = { 
                    labels: lbs,
                    datasets: [
                    {
                        label: 'Overall Intention',
                        backgroundColor: 'rgba(255,206,86,0.2)',
                        borderColor: 'rgba(255,206,86,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(255,206,86,0.4)',
                        hoverBorderColor: 'rgba(255,206,86,1)',
                        data: values
                    }]
        }
        this.setState({dataset:dataset})
    }

    handleShowSamples = (elem)=>{
        if (elem[0]) {
            let target = elem[0]._model.label
            if (target === 'complaint'){
                target = 'complaint/suggestion'
            }
            let filteredSamples = this.state.samples.filter((sample)=>(sample.intention === target))
            this.setState({openSamDialog:true,filteredSamples:filteredSamples})
        }
    }

    render(){
        return(
            <React.Fragment>
            <ExpansionPanel className={this.props.classes.root} defaultExpanded={true}>
                <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
                    <Typography variant="title" component="h3">Intention</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Bar 
                        data={this.state.dataset}
                        options={{legend:{display:false}}}
                        onElementsClick={this.handleShowSamples}
                    />
                </ExpansionPanelDetails>
                <Divider/>
                <ExpansionPanelActions>
                    <Button onClick={()=>{this.setState({openSumDialog:true})}}>Summary</Button>
                    <Button onClick={()=>{this.setState({openFltDialog:true})}}>Filters</Button>
                </ExpansionPanelActions>
            </ExpansionPanel>
            <SampleDialog
                open={this.state.openSamDialog} 
                close={()=>{this.setState({openSamDialog:false})}}
                head='Intention Samples'
                samples={this.state.filteredSamples}
            />
            <SummaryDialog
                open={this.state.openSumDialog} 
                close={()=>{this.setState({openSumDialog:false})}}
                head='Intention Summary'
                values={this.state.data}
                labels={this.state.label}
            />
            <FilterDialog 
                open={this.state.openFltDialog} 
                close={()=>(this.setState({openFltDialog:false}))}
                target={'intention'}
                pid={this.props.pid}
                handleIsLoding={(isFetch)=>{this.setState({isLoading:isFetch})}}
                handleChangeData={(data)=>{this.setState({data:data})}}
                handleChangeLabel={(label)=>{this.setState({label:label})}}
                handleChangeDataset={this.handleChangeDataset}
                handleChangeSamples={(samples)=>{this.setState({samples:samples})}}
            />
            </React.Fragment>

        )
    }
}

export default withStyles(styles)(IntentionPanel)