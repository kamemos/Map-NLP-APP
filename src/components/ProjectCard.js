import React from 'react'
import DownloadDialog from './DownloadDialog'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import axios from 'axios';

const styles = (theme) => ({
    card: {
        width: '345px',
        height: '400px',
        margin: 20
    },
    chipKeywords: {
        display: 'flex',
        flexWrap:'wrap',
        overflowY: 'scroll',
        minHeight: '10%'
    },
    description: {
        overflowY: 'scroll',
        wordWrap: "break-word",
        minHeight: '60%'
    },
    cardBottom: {
        display: 'flex',
        marginTop: 'auto',
        justifyContent: 'flex-end'
    },
})

class ProjectCard extends React.Component {
    constructor(props){
        super(props)
        this.pid = this.props.id
        this.state = { anchorEl: null,
                       anchorKey: null,
                       openUpload: false,
                     }
        this.handleDelete = this.handleDelete.bind(this)
    }

    handleDelete = (id) => {
        let obj = {}
        obj['_id'] = id
        axios.post('/project/delete',obj).then((res)=>{
            console.log(res.data)
            if (res.status == 200){
                window.location.reload();
            }
        })
    }

    handleExport = (id) => {
        console.log('check')
        let obj = {
            pid : id,
            responseType: "blob"
        }

        axios.post('/project/get_csv',obj).then((res)=>{
            console.log(res.file)
            let blob = new Blob([res.data], { type: "text/csv" })
            let fileName = 'predict.csv';
            let objectUrl = URL.createObjectURL(blob);
            let a = document.createElement('a');
            let url = window.URL.createObjectURL(blob);
            // window.open(url, "_self");
            a.href = objectUrl;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();     
            document.body.removeChild(a);   
            URL.revokeObjectURL(objectUrl);
        })
    }

    render() {
        return (
            <React.Fragment>
            <Card className={this.props.classes.card}>
                <CardHeader
                    action={
                        <div>
                            <IconButton onClick={(e)=>{this.setState({anchorKey:e.currentTarget})}} color="secondary">
                                <Icon>vpn_key</Icon>
                            </IconButton>
                            <Popover
                                open={Boolean(this.state.anchorKey)}
                                anchorEl={this.state.anchorKey}
                                onClose={()=>{this.setState({anchorKey:null})}}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                                >
                                <Typography style={{margin:'10px 10px 10px 10px'}}>Keyword</Typography>
                                <Divider/>
                                <div style={{display:'flex',maxWidth:'300px',flexWrap:'wrap',margin:'10px 10px 10px 10px'}}>
                                {this.props.keywords.map((key,idx)=>{
                                    return (
                                        <Chip key={idx} style={{ margin: '3px 3px 3px 3px' }} label={key}/>
                                    )
                                })}
                                </div>
                                <Divider/>
                                <div style={{display:'flex',justifyContent:'center'}}>
                                    <Button onClick={()=>{this.setState({anchorKey:null})}} color="primary">Close</Button>
                                </div>
                                <div style={{height:'5px'}}/>
                            </Popover>
                            <IconButton color="secondary">
                                <Icon>edit</Icon>
                            </IconButton>
                            <IconButton onClick={(e)=>{this.setState({anchorEl:e.currentTarget})}} color="secondary">
                                <Icon>delete</Icon>
                            </IconButton>
                            <Popover
                                open={Boolean(this.state.anchorEl)}
                                anchorEl={this.state.anchorEl}
                                onClose={()=>{this.setState({anchorEl:null})}}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                                >
                                <Typography style={{margin:'10px 10px 10px 10px'}}>Are you sure you want to delete</Typography>
                                <div style={{display:'flex',justifyContent:'center'}}>
                                    <Button onClick={()=>{this.setState({anchorEl:null})}} color="primary">cancel</Button>
                                    <Button onClick={()=>{this.handleDelete(this.props.id)}} color="primary">delete</Button>
                                </div>
                                <div style={{height:'5px'}}/>
                            </Popover>
                        </div>
                    }
                    title={this.props.projName}
                    subheader="update : "
                />
                <Divider />
                <CardContent style={{height:'50%'}}>
                    <Typography className={this.props.classes.description} component="p">
                        {this.props.desc}
                    </Typography>
                </CardContent>
                <Divider />
                <div style={{height:'5px'}}/>
                <CardActions className={this.props.classes.cardBottom}>
                    <Link to={'/dashboard/'+this.props.id} style={{ textDecoration: 'none' }}>
                        <Button size="small" color="primary">Dashboard</Button>
                    </Link>
                    <Button onClick={()=>{this.handleExport(this.pid)}} size="small" variant="contained" color="primary">Export</Button>
                    {(this.props.useCrawler) ? <Button size="small" onClick={()=>{this.setState({openUpload:true})}} variant="contained" color="secondary">upload</Button> : ''}
                </CardActions>
            </Card>
            <DownloadDialog 
                open={this.state.openUpload} 
                close={()=>{this.setState({openUpload:false})}}
                pid={this.props.id}
                keywords={this.props.keywords}
                excludeKeywords={this.props.excludeKeywords}
            />
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(ProjectCard)