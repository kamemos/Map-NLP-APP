import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import FormControl from '@material-ui/core/FormControl';
import Modal from '@material-ui/core/Modal';
import Icon from '@material-ui/core/Icon';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import { RadioGroup,Radio,FormControlLabel,FormLabel } from '@material-ui/core';
import axios from 'axios'

function getModalStyle() {
    const top = 10;
    return {
        position: 'relative',
        top: `${top}%`,
        margin: 'auto',
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        justifyContent: 'center'
    };
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
    errMsg : {
        color: 'red'
    }
});



class CreateProjForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            projName: '',
            desc: '',
            keyword: '',
            keywords: [],
            errMsg: '',
            excludeKeyword: '',
            excludeKeywords: [],
            useCrawler: 'true'
        }
    }

    handleChange = (name) => (event) => {
        this.setState({ [name]: event.target.value })
    }

    handleKeywords = () => {
        if (this.state.keyword === '') return
        this.setState({
            keywords: this.state.keywords.concat([this.state.keyword]),
            keyword: ''
        })
    }

    handleDelKey = () => {
        let newArr = this.state.keywords
        newArr.pop()
        this.setState({ keywords: newArr })
    }

    handleExcludeKeywords = () => {
        if (this.state.exCludeKeyword === '') return
        this.setState({
            excludeKeywords: this.state.excludeKeywords.concat([this.state.excludeKeyword]),
            excludeKeyword: ''
        })
    }

    handleDelExcludeKey = () => {
        let newArr = this.state.excludeKeywords
        newArr.pop()
        this.setState({ excludeKeywords: newArr })
    }

    handleSubmit = () =>{
        let obj = {
            projName: this.state.projName,
            desc: this.state.desc,
            keywords: this.state.keywords,
            excludeKeywords : this.state.excludeKeywords,
            useCrawler: this.state.useCrawler
        }
        axios.post('/project/create',obj).then((res)=>{
            console.log(res.data)
            if (res.data.isSuccess === false){
                this.setState({errMsg:res.data.errMsg})
            }
            else {
                window.location.reload();
            }
        }).catch((err)=>{
            console.log(err)
            this.setState({errMsg:'error while uploading'})
        })
    }

    handleClrState = () => {
        let clrState = {
            open: false,
            projName: '',
            desc: '',
            keyword: '',
            keywords: [],
            errMsg: '',
        }
        this.setState(clrState)
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button onClick={() => this.setState({ open: true })} variant="fab" color="secondary" aria-label="add" >
                    <Icon>add</Icon>
                </Button>
                <Modal
                    open={this.state.open}
                    onClose={() => { this.setState({ open: false }) }}
                    style={{ alignItems: 'center', justifyContent: 'center' }}
                >
                    <Slide direction="up" in={this.state.open} mountOnEnter unmountOnExit>
                        <div style={getModalStyle()} className={classes.paper}>
                            <div style={{ display: 'flex' }}>
                                <Typography variant="headline" component="h2">
                                    Create Project
                                </Typography>
                                <IconButton  onClick={this.handleClrState} style={{ marginLeft: 'auto' }} color="secondary"><Icon>exit_to_app</Icon></IconButton>
                            </div>
                            <Typography color='error' variant="subheading" component='p'>
                                {this.state.errMsg}
                            </Typography>
                            <div style={{height:'10px'}}/>
                            <FormControl style={{ width: '50%' }}>
                                <InputLabel>Project name <i style={{color:'red'}}>*</i></InputLabel>
                                <Input value={this.state.projName} onChange={this.handleChange('projName')} />
                            </FormControl>
                            <div style={{ marginTop: '10px' }} />
                            <FormControl>
                                <InputLabel>Description</InputLabel>
                                <Input value={this.state.desc} onChange={this.handleChange('desc')} />
                            </FormControl>
                            <div style={{ marginTop: '10px' }} />
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <FormControl style={{ flexDirection: 'row', width: '50%' }}>
                                    <InputLabel>Keyword</InputLabel>
                                    <Input value={this.state.keyword} onChange={this.handleChange('keyword')} />
                                </FormControl>
                                <Tooltip title="Add keyword">
                                    <IconButton onClick={this.handleKeywords} color="secondary" style={{ margin: '0' }}><Icon>add</Icon></IconButton>
                                </Tooltip>
                                <Tooltip title="Remove keyword">
                                    <IconButton onClick={this.handleDelKey} color="secondary" style={{ margin: '0' }}><Icon>remove</Icon></IconButton>
                                </Tooltip>
                            </div>
                            <div style={{ marginTop: '10px' }} />
                            <div>
                                {this.state.keywords.map(((key, idx) => {
                                    return (
                                        <Chip key={idx} style={{ margin: '3px 3px 3px 3px' }} label={key}/>
                                    )
                                }))}
                            </div>
                            <div style={{ marginTop: '5px' }} />
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <FormControl style={{ flexDirection: 'row', width: '50%' }}>
                                    <InputLabel>Exclude keyword</InputLabel>
                                    <Input value={this.state.excludeKeyword} onChange={this.handleChange('excludeKeyword')} />
                                </FormControl>
                                <Tooltip title="Add exclude keyword">
                                    <IconButton onClick={this.handleExcludeKeywords} color="secondary" style={{ margin: '0' }}><Icon>add</Icon></IconButton>
                                </Tooltip>
                                <Tooltip title="Remove exclude keyword">
                                    <IconButton onClick={this.handleDelExcludeKey} color="secondary" style={{ margin: '0' }}><Icon>remove</Icon></IconButton>
                                </Tooltip>
                            </div>
                            <div style={{ marginTop: '10px' }} />
                            <div>
                                {this.state.excludeKeywords.map(((key, idx) => {
                                    return (
                                        <Chip key={idx} style={{ margin: '3px 3px 3px 3px' }} label={key}/>
                                    )
                                }))}
                            </div>
                            <div style={{ marginTop: '15px' }} />
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Use Crawler</FormLabel>
                                <RadioGroup
                                    className={classes.group}
                                    value={this.state.useCrawler}
                                    onChange={(e)=>{this.setState({useCrawler:e.target.value})}}
                                    row
                                >
                                <FormControlLabel value={'true'} control={<Radio />} label="yes" />
                                <FormControlLabel value={'false'} control={<Radio />} label="no" />
                                </RadioGroup>
                            </FormControl>
                            <div style={{ marginTop: '10px' }} />
                            <div style={{display:'flex',justifyContent:'flex-end'}}>
                                <Button onClick={this.handleClrState} color="secondary">
                                    Cancle
                                </Button>
                                <div style={{width:'10px'}}/>
                                <Button onClick={this.handleSubmit} color="primary">
                                    Create
                                </Button>
                            </div>
                        </div>
                    </Slide>
                </Modal>
            </div>
        )
    }
}

export default withStyles(styles)(CreateProjForm)