import React from 'react'
import MediaCard from '../components/MediaCard'
import { Paper,Input,Button,CircularProgress,Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import EditDialog from '../components/EditDialog'
import axios from 'axios'

const styles = (theme) => ({
    layout: {
        display: 'flex',
        justifyContent:'center',
        padding: theme.spacing.unit * 2
    },
    paper: {
        width: '60vw',
        height: '70vh',
        padding: '20px',
        display:'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#fafafa'
    },
    msgBox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '90%',
        overflowY: 'scroll',
        backgroundColor: '#fafafa'
    },
    inputBox: {
        width: '80%'
    },
    chatBubble: { 
        wordBreak: 'break-all',
        maxWidth: '50%',
        padding: '1vh',
        backgroundColor: '#cfbebe',
        textAlign: 'center',
        marginBottom: '1vh',
        borderRadius: '.8em',
    }
})

class LiveMsgPage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            msgs : [],
            msg : '',
            isLoading : false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e){
        e.preventDefault()
        this.setState({isLoading:true})
        let obj = {text : this.state.msg}
        axios.post('/live_message/pred',obj).then((res)=>{
            console.log(res.data)
            let post = {
                text : this.state.msg,
                labels : res.data.labels
            }
            this.setState({msgs: [post].concat(this.state.msgs), msg:'',isLoading:false})
        }).catch(()=>{
            this.setState({isLoading:false})
        })
    }

    render(){
        return(
            <div className={this.props.classes.layout}>
                <Paper className={this.props.classes.paper}>
                    <div className={this.props.classes.msgBox}>
                        {this.state.msgs.map((msg,idx)=>{
                            console.log(msg)
                            return (
                                <MediaCard 
                                    key={'post'+idx} 
                                    text={msg.text}
                                    sentiment={msg.labels[0][0]}
                                    intention={msg.labels[2]}
                                    product={msg.labels[1]}
                                />
                            )
                        })}
                    </div>
                    <Divider style={{margin:'5px 0 5px 0'}}/>
                    <form onSubmit={this.handleSubmit} style={{display:'flex',justifyContent:'space-around',width:'100%'}}>
                    <Input 
                        value={this.state.msg} 
                        onChange={(e)=>{this.setState({msg:e.target.value})}} 
                        className={this.props.classes.inputBox}
                    />
                    <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <Button 
                            onClick={this.handleSubmit} 
                            variant="contained" 
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
                    </form>
                </Paper>
                <EditDialog/>
            </div>
        )
    }
}

export default withStyles(styles)(LiveMsgPage)