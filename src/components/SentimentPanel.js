import React from 'react'
import { ExpansionPanel,ExpansionPanelSummary,ExpansionPanelDetails,ExpansionPanelActions } from '@material-ui/core';
import { Dialog,DialogTitle,DialogContent,DialogActions } from '@material-ui/core';
import { List,ListItemText,ListItem } from '@material-ui/core';
import FilterDialog from './FilterDialog';
import SummaryDialog from './SummaryDialog';
import SampleDialog from './SampleDialog';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import { Doughnut } from 'react-chartjs-2';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';

const styles = (theme) => ({
    root : {
        width : '100%',
    },
    filterButton : {
        margin : theme.spacing.unit
    },
    buttonBar : {
        display:'flex',
        flexWrap:'wrap',
        justifyContent:'center'
    },
    productBtn : {
        margin : theme.spacing.unit
    }
});

class SentimentPanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            openSumDialog : false,
            openFltDialog : false,
            openSamDialog : false,
            samples : [],
            filteredSamples : [],
            data : [],
            label: [],
            isLoading : false,
            field: '',
            target: '',
            dataset : { datasets : [{
                data:[],
                borderWidth: 1,
                borderColor: ['rgba(255,99,132,1)','rgba(54,162,235,1)','rgba(0,200,83,1)'],
                backgroundColor: ['rgba(255,99,132,0.2)','rgba(54,162,235,0.2)','rgba(0,200,83,0.2)'],
                hoverBackgroundColor: ['rgba(255,99,132,0.4)','rgba(54,162,235,0.4)','rgba(0,200,83,0.4)']}],
                labels : []
            }
        }
        this.pid = this.props.pid
    }

    handleChangeDataset = (values,labels) => {
        let dataset = { datasets : [{
            data: values,
            borderWidth: 1,
            borderColor: ['rgba(255,99,132,1)','rgba(54,162,235,1)','rgba(0,200,83,1)'],
            backgroundColor: ['rgba(255,99,132,0.2)','rgba(54,162,235,0.2)','rgba(0,200,83,0.2)'],
            hoverBackgroundColor: ['rgba(255,99,132,0.4)','rgba(54,162,235,0.4)','rgba(0,200,83,0.4)']}],
            labels : labels
        }
        this.setState({dataset:dataset})
    }

    handleShowSamples = (elem)=>{
        if (elem[0]) {
            let target = elem[0]._model.label
            let filteredSamples = this.state.samples.filter((sample)=>(sample.sentiment1 === target))
            this.setState({openSamDialog:true,filteredSamples:filteredSamples})
        }
    }
    
    render(){
        // const legendOpts = {
            // onClick: (e, item) => {console.log('item',item)},
            // onHover: (e, item) => alert(`Item with text ${item.text} and index ${item.index} hovered`),
            // position:'right'
        // }
        return(
            <React.Fragment>
            <ExpansionPanel className={this.props.classes.root} defaultExpanded={true}>
                <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
                    <Typography variant="title" component="h3">Sentiment</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Doughnut
                        onElementsClick={this.handleShowSamples}
                        data={this.state.dataset}
                        options={{
                            legend: {position:'right'}
                        }}
                        // getDatasetAtEvent={(dataset)=>{console.log('dataset',dataset)}}
                    />
                </ExpansionPanelDetails>
                <Divider />
                <ExpansionPanelActions>
                    <Button onClick={()=>{this.setState({openSumDialog:true})}}>Summary</Button>
                    <Button onClick={()=>{this.setState({openFltDialog:true})}}>Filters</Button>
                </ExpansionPanelActions>
            </ExpansionPanel>
            <SampleDialog
                open={this.state.openSamDialog} 
                close={()=>{this.setState({openSamDialog:false})}}
                head='Sentiment Samples'
                samples={this.state.filteredSamples}
            />
            <SummaryDialog
                open={this.state.openSumDialog} 
                close={()=>{this.setState({openSumDialog:false})}}
                head='Sentiment Summary'
                values={this.state.data}
                labels={this.state.label}
            />
            <FilterDialog 
                open={this.state.openFltDialog} 
                close={()=>(this.setState({openFltDialog:false}))}
                target={'sentiment'}
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

export default withStyles(styles)(SentimentPanel)