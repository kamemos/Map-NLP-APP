import React from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import MediaCard from './MediaCard';
import { withStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import axios from 'axios'

const styles = (theme) => ({
    root : {
        width : '100%',
    },
    mediaBar : {
        display : 'flex',
        flexDirection : 'column',
        justifyContent: 'center',
        alignItems : 'center'
    }
});

class ChannelPanel extends React.Component {
    constructor(props) {
        super(props)
        this.pid = this.props.pid
        this.state = {posts : []}
    }

    componentDidMount(){
        let obj = {pid : this.pid}
        axios.post('/dashboard/get_top3post',obj).then((res)=>{
            console.log('top3psot',res.data.top3post)
            this.setState({posts : res.data.top3post})
        })
    }

    render(){
        return(
            <ExpansionPanel className={this.props.classes.root} defaultExpanded={true}>
                <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
                    <Typography variant="title" component="h3">Top 3 Engagement Post</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails style={{display:'flex',justifyContent:'center'}}>
                    <div className={this.props.classes.mediaBar}>
                    {this.state.posts.map((post,idx)=>{
                        return (
                            <MediaCard 
                                key={'top3post'+idx} 
                                text={post[0]}
                                sentiment={post[1]}
                                intention={post[2]}
                                product={post[3]}
                            />
                        )
                    })}
                    </div>
                </ExpansionPanelDetails>
                <Divider/>
            </ExpansionPanel>
        )
    }
}

export default withStyles(styles)(ChannelPanel)