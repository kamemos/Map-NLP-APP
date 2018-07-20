import React from 'react'
import { Dialog,DialogTitle,DialogContent,DialogActions, Typography, Divider } from '@material-ui/core';
import { GridList,GridListTile,Avatar,ListItem,ListItemText,Icon,Button } from '@material-ui/core';
import { Paper,Table,TableHead,TableCell,TableRow,TableBody } from '@material-ui/core';

class SummaryDialog extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            labels : [],
            values : [],
            total : '1',
        }
        this.columns = ['class','total','percentage']
    }

    componentWillReceiveProps(nextProps){
        let total = nextProps.values.reduce((a, b) => a + b, 0);
        this.setState({
            labels : nextProps.labels,
            values : nextProps.values,
            total : total
        })
    }

    render(){
        const LabelTile = ({key,value,label,total}) => {
            let percentage = Math.round((value/total)*100)
            return(
                <GridListTile key={key} cols={1} style={{ height: 'auto' }}>
                    <div style={{display:'flex',margin:'5px'}}>
                        <Avatar>{label.substring(0,2)}</Avatar>
                        <div style={{display:'flex',display:'column'}}>
                            <Typography>
                                {label}
                            </Typography>
                            <Typography>
                                {'total : '+value+' , '+percentage+'%'}
                            </Typography>  
                        </div>
                    </div>
                </GridListTile>
            )
        }

        return (
            <Dialog
                open={this.props.open} 
                onClose={this.props.close}
            >   
                <DialogTitle>{this.props.head}</DialogTitle>
                <Divider/>
                <DialogContent>
                    <div style={{display:'flex',justifyContent:'flex-end'}}>
                        <Typography style={{margin:'10px'}}>
                            Amount : {this.state.total}
                        </Typography>
                    </div>
                    <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Class</TableCell>
                                <TableCell>Total</TableCell>
                                <TableCell>Pecentage</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.labels.map((label,idx)=>{
                                return(
                                    <TableRow key={this.props.head+'_row_'+idx} hover>
                                        <TableCell>{label}</TableCell>
                                        <TableCell>{this.state.values[idx]}</TableCell>
                                        <TableCell>{((this.state.values[idx]/this.state.total)*100).toFixed(2)+'%'}</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                    </Paper>
                </DialogContent>
                <Divider/>
                <DialogActions>
                    <Button onClick={this.props.close} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default SummaryDialog