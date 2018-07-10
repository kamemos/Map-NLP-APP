import React from 'react'
import { Paper,Input,Button} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

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
        justifyContent: 'center'
    },
    msgBox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '90%',
        overflowY: 'scroll'
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
            msg : ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e){
        e.preventDefault()
        this.setState({msgs: [this.state.msg].concat(this.state.msgs), msg:''})
    }

    render(){
        return(
            <div className={this.props.classes.layout}>
                <Paper className={this.props.classes.paper}>
                    <div className={this.props.classes.msgBox}>
                        {this.state.msgs.map((msg,idx)=>{
                            return (
                                <div key={idx} className={this.props.classes.chatBubble}>
                                    {msg}
                                </div>
                            )
                        })}
                    </div>
              
                    <form onSubmit={this.handleSubmit} style={{display:'flex',justifyContent:'space-around',width:'100%'}}>
                    <Input textAlign='center' value={this.state.msg} onChange={(e)=>{this.setState({msg:e.target.value});console.log(this.state)}} className={this.props.classes.inputBox}/>
                    <Button onClick={this.handleSubmit} variant="contained" color="primary">
                        Submit
                    </Button>
                    </form>
             
                </Paper>
            </div>
        )
    }
}

export default withStyles(styles)(LiveMsgPage)