import React from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
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
            openFltDialog : false,
            openSumDialog : false

        }
        this.data = {
            labels: ['General', 'Information', 'Participation', 'Enquiry', 'Compliment', 'Complaint'],
            datasets: [
              {
                label: 'Overall Intention',
                backgroundColor: 'rgba(255,206,86,0.2)',
                borderColor: 'rgba(255,206,86,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,206,86,0.4)',
                hoverBorderColor: 'rgba(255,206,86,1)',
                data: [65, 59, 80, 81, 56, 55]
              },
              
            ]
          };
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
                        data={this.data}
                    />
                </ExpansionPanelDetails>
                <Divider/>
                <ExpansionPanelActions>
                    <Button onClick={()=>{this.setState({openSumDialog:true})}}>Summary</Button>
                    <Button>Filters</Button>
                </ExpansionPanelActions>
            </ExpansionPanel>

            <Dialog 
            open={this.state.openSumDialog} 
            onClose={()=>{this.setState({openSumDialog:false})}}
            maxWidth="md" 
            >
                <DialogTitle>Intention Summary</DialogTitle>
                <Divider/>
                <DialogContent>
                    <GridList cols={3}>
                        <GridListTile key="Subheader" cols={1} style={{ height: 'auto' }}>
                            <ListItem>
                                <Avatar>
                                    <Icon>sentiment_very_satisfied</Icon>
                                </Avatar>
                                <ListItemText primary="Participation" secondary="total : 300" />
                            </ListItem>
                        </GridListTile>
                        <GridListTile key="Subheader" cols={1} style={{ height: 'auto' }}>
                            <ListItem>
                                <ListItemText primary="Participation" secondary="30% total : 300" />
                            </ListItem>
                        </GridListTile>
                        <GridListTile key="Subheader" cols={1} style={{ height: 'auto' }}>
                            <ListItem>
                                <ListItemText primary="Participation" secondary="30% total : 300" />
                            </ListItem>
                        </GridListTile>
                        <GridListTile key="Subheader" cols={1} style={{ height: 'auto' }}>
                            <ListItem>
                                <ListItemText primary="30%" secondary="total : 300" />
                            </ListItem>
                        </GridListTile>
                        <GridListTile key="Subheader" cols={1} style={{ height: 'auto' }}>
                            <ListItem>
                                <ListItemText primary="30%" secondary="total : 300" />
                            </ListItem>
                        </GridListTile>
                        <GridListTile key="Subheader" cols={1} style={{ height: 'auto' }}>
                            <ListItem>
                                <ListItemText primary="30%" secondary="total : 300" />
                            </ListItem>
                        </GridListTile>
                    </GridList>

                </DialogContent>
                <Divider/>
                <DialogActions>
                    <Button onClick={()=>{this.setState({openSumDialog:false})}} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            </React.Fragment>

        )
    }
}

export default withStyles(styles)(IntentionPanel)