import React from 'react'
import { Dialog,DialogTitle,DialogContent,DialogActions, Typography, Divider } from '@material-ui/core';
import { FormControl,InputLabel,Select,MenuItem,Button,CircularProgress } from '@material-ui/core'
import { observer,inject } from 'mobx-react'
import axios from 'axios'

@inject('editDialogStore')
@observer
class EditDialog extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isLoading:false,
            msg: '',
            success: true
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(){
        this.setState({isLoading:true})
        let target = this.props.editDialogStore
        let obj = { 
            text: target.text,
            sentiment: target.sentiment,
            intention: target.intention,
            product: target.product 
        }
        axios.post('label_correction',obj).then((res)=>{
            this.setState({isLoading:false,success:true,msg:'Success'})
        }).catch((err)=>{
            this.setState({isLoading:false,success:false,msg:'Fail'})
        })
    }

    render(){
        console.log(this.props.editDialogStore)
        const editDialogStore = this.props.editDialogStore
        return(
            <Dialog
                open={editDialogStore.open}
                onClose={()=>{editDialogStore.setOpen(false)}}
                fullWidth={true}
            >
                <Divider/>
                <DialogContent>
                    <Typography style={{margin:'10px'}}>{editDialogStore.text}</Typography>
                    <div style={{height:'20px'}}/>
                    <div style={{display:'flex',justifyContent:'space-around',flexWrap:'wrap'}}> 
                        <FormControl style={{minWidth:'100px'}}>
                            <InputLabel>Sentiment</InputLabel>
                            <Select
                                value={editDialogStore.sentiment}
                                onChange={(e)=>{editDialogStore.setSentiment(e.target.value)}}
                            >
                                <MenuItem value={'positive'}>positive</MenuItem>
                                <MenuItem value={'neutral'}>neutral</MenuItem> 
                                <MenuItem value={'negative'}>negative</MenuItem>    
                            </Select>
                        </FormControl>
                        <FormControl style={{minWidth:'100px'}}>
                            <InputLabel>Intention</InputLabel>
                            <Select
                                value={editDialogStore.intention}
                                onChange={(e)=>{editDialogStore.setIntention(e.target.value)}}
                            >                                
                                <MenuItem value={'general'}>general</MenuItem>
                                <MenuItem value={'information'}>information</MenuItem>
                                <MenuItem value={'participation'}>participation</MenuItem> 
                                <MenuItem value={'enquiry'}>enquiry</MenuItem>
                                <MenuItem value={'compliment'}>compliment</MenuItem>  
                                <MenuItem value={'complaint/suggestion'}>complaint/suggestion</MenuItem>      
                            </Select>
                        </FormControl>
                        <FormControl style={{minWidth:'100px'}}>
                            <InputLabel>Product</InputLabel>
                            <Select
                                value={editDialogStore.product}
                                onChange={(e)=>{editDialogStore.setProduct(e.target.value)}}
                            > 
                                <MenuItem value={'others'}>others</MenuItem>
                                <MenuItem value={'internet banking'}>internet banking</MenuItem>
                                <MenuItem value={'money transfer'}>money transfer</MenuItem>
                                <MenuItem value={'atm/debit card'}>atm/debit card</MenuItem> 
                                <MenuItem value={'corporate'}>corporate</MenuItem>
                                <MenuItem value={'deposit account'}>deposit account</MenuItem>  
                                <MenuItem value={'investment'}>investment</MenuItem>
                                <MenuItem value={'branch'}>branch</MenuItem>
                                <MenuItem value={'call Center'}>call c  enter</MenuItem>                        
                            </Select>
                        </FormControl>
                    </div>
                </DialogContent>
                <Divider/>
                <DialogActions>
                    <Typography style={{color:(this.state.success ? 'green':'red')}}>
                        {this.state.msg}
                    </Typography>
                    <Button color='primary' onClick={()=>{editDialogStore.setOpen(false)}}>close</Button>
                    <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <Button 
                            onClick={this.handleSubmit} 
                            color="primary"
                            style={{zIndex:'1'}}
                            disabled={this.state.isLoading}
                        >
                            Submit
                        </Button>
                        {this.state.isLoading && 
                        <CircularProgress 
                            size={24}
                            style={{position:'absolute',zIndex:'1'}}
                        />}
                    </div>
                </DialogActions>
            </Dialog>
        )
    }
}

export default EditDialog