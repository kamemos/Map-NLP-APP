import React from 'react'
import { ExpansionPanel,ExpansionPanelSummary,ExpansionPanelDetails,ExpansionPanelActions } from '@material-ui/core';
import { Dialog,DialogTitle,DialogContent,DialogActions } from '@material-ui/core';
import { List,ListItemText,ListItem } from '@material-ui/core';
import FilterDialog from './FilterDialog';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import { Doughnut } from 'react-chartjs-2';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

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

class OverviewPanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = { openSumDialog : false,
                       openFltDialog : false,
                       target : 'sentiment',
                       sentiments : [],
                       intentions : [],
                       products : [],
                     }
        this.data = { datasets : [{
                            data:[10,20,30],
                            borderWidth: 1,
                            borderColor: ['rgba(255,99,132,1)','rgba(54,162,235,1)','rgba(0,200,83,1)'],
                            backgroundColor: ['rgba(255,99,132,0.2)','rgba(54,162,235,0.2)','rgba(0,200,83,0.2)'],
                            hoverBackgroundColor: ['rgba(255,99,132,0.4)','rgba(54,162,235,0.4)','rgba(0,200,83,0.4)']}],
                            labels : ['negative','neutral','positive']
                    }
    }

    render(){
        return(
            <React.Fragment>
            <ExpansionPanel className={this.props.classes.root} defaultExpanded={true}>
                <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
                    <Typography variant="title" component="h3">Sentiment</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Doughnut
                        onElementsClick={(elem)=>{console.log(elem)}}
                        data={this.data}
                        options={{legend: {position:'bottom'}}}
                    />
                </ExpansionPanelDetails>
                <Divider />
                <ExpansionPanelActions>
                    <Button onClick={()=>{this.setState({openSumDialog:true})}}>Summary</Button>
                    <Button onClick={()=>{this.setState({openFltDialog:true})}}>Filters</Button>
                </ExpansionPanelActions>
            </ExpansionPanel>

            <Dialog 
                open={this.state.openSumDialog} 
                onClose={()=>{this.setState({openSumDialog:false})}}
                maxWidth="xs" 
            >
                <DialogTitle>Sentiment Summary</DialogTitle>
                <Divider/>
                <DialogContent>
                    <List>
                        <ListItem>
                        <Avatar>
                            <Icon>sentiment_very_satisfied</Icon>
                        </Avatar>
                        <ListItemText primary="30%" secondary="total : 300" />
                        </ListItem>
                        <ListItem>
                        <Avatar>
                            <Icon>sentiment_satisfied</Icon>
                        </Avatar>
                        <ListItemText primary="20%" secondary="total : 200" />
                        </ListItem>
                        <ListItem>
                        <Avatar>
                            <Icon>sentiment_very_dissatisfied</Icon>
                        </Avatar>
                        <ListItemText primary="50%" secondary="total : 500" />
                        </ListItem>
                    </List>
                </DialogContent>
                <Divider/>
                <DialogActions>
                    <Button onClick={()=>{this.setState({openSumDialog:false})}} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            <FilterDialog 
                open={this.state.openFltDialog} 
                close={()=>(this.setState({openFltDialog:false}))}
                target={this.state.target}
                sentiments={this.state.sentiments}
                intentions={this.state.intentions}
                product={this.state.products}
            />
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(OverviewPanel)