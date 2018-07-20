import { Dialog,DialogTitle,DialogContent,DialogActions } from '@material-ui/core';
import { Button,Divider,Typography,LinearProgress } from '@material-ui/core';
import React from 'react'
import axios from 'axios'

class DownloadDialog extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            openUpload: false,
            isLoding: false,
            file: null,
            errMsg: ''
        }
        console.log(this.props)
    }

    handleFileUpload = () => {
        const data = new FormData();
        this.setState({isLoding:true})
        console.log(this.pid)
        data.append('file', this.state.file);
        data.append('pid', this.props.pid);
        data.append('keywords', this.props.keywords);
        data.append('excludeKeywords', this.props.excludeKeywords);
        this.setState({isLoding:true})
        axios.post('/upload/csv', data ).then((res)=>{
            this.setState({isLoding:false})
            if (!res.data.isSuccess){
                this.setState({errMsg:res.data.errMsg,isLoding:false})
            }
        }).catch((err)=>{
            this.setState({isLoding:false})
        })
    }

    render(){
        return(
            <Dialog
            open={this.props.open} 
            >
                <DialogTitle>Upload</DialogTitle>
                <Divider/>
                <DialogContent>
                        <Typography color='error' style={{marginTop:'10px'}} variant="subheading" component='p'>
                            {this.state.errMsg}
                        </Typography>
                        <input type="file" onChange={(e)=>{this.setState({file:e.target.files[0]})}}/>
                        <Button type="submit" disabled={this.state.isLoding} onClick={this.handleFileUpload} color='primary'>Upload</Button>
                        <div style={{height:'5px'}}/>
                        {(this.state.isLoding) && <LinearProgress color="secondary"/> }
                </DialogContent>
                <Divider/>
                <DialogActions>
                    <Button onClick={this.props.close} color='primary'>Close</Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default DownloadDialog