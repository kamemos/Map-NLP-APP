import React from 'react'
import MediaCard from './MediaCard'
import { Dialog,DialogTitle,DialogContent,DialogActions, Typography, Divider } from '@material-ui/core';
import { Table,TableBody,TableRow,TableCell,TableFooter,TablePagination,Button } from '@material-ui/core';

class SampleDialog extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            samples: this.props.samples,
            page: 0
        }
    }

    render(){
        return(
            <React.Fragment>
            <Dialog
                open={this.props.open} 
                onClose={this.props.close}
                maxWidth='md'
                fullWidth={true}
            >   
                <DialogTitle>{this.props.head}</DialogTitle>
                <Divider/>
                <DialogContent>
                    <Table>
                        <TableBody style={{overflowY:'scroll',height:'100px'}}>
                        {this.props.samples.slice(this.state.page*5,this.state.page*5+5).map((sample,idx)=>{
                            return(
                                <TableRow key={this.props.head+idx}>
                                    <TableCell style={{display:'flex',justifyContent:'center'}}>
                                        <MediaCard
                                            text={sample.text}
                                            sentiment={sample.sentiment1}
                                            intention={sample.intention}
                                            product={sample.product}
                                        />
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                        </TableBody>
                    </Table>
                </DialogContent>
                <Divider/>
                <DialogActions>
                    <Table>
                        <TableBody>
                        <TableRow>
                        <TablePagination
                            count={this.props.samples.length}
                            rowsPerPage={5}
                            style={{position:'static'}}
                            page={this.state.page}
                            onChangePage={(event, page) => {this.setState({ page })}}
                            rowsPerPageOptions={[5]}
                        />
                        </TableRow>
                        </TableBody>
                    </Table>
                    <Button onClick={()=>{this.props.close();this.setState({page:0});}} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
            {/* <EditDialog/> */}
            </React.Fragment>
        )
    }
}

export default SampleDialog