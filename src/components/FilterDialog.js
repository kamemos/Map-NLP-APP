import React from 'react'
import { FormLabel,FormControlLabel,Checkbox } from '@material-ui/core';
import { Dialog,DialogTitle,DialogContent,DialogActions } from '@material-ui/core';
import { Divider,Button } from '@material-ui/core';
import { GridList,GridListTile } from '@material-ui/core';
import axios from 'axios'

class FilterDialog extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            open : this.props.open,
            sentiments : [],
            intentions : [],
            products : [],
            selectSen : false,
            selectInt : false,
            selectPro : false   
        }
        this.target = this.props.target,
        this.pid = this.props.pid
        this.close = this.props.close.bind(this)
        this.handleIsLoding = this.props.handleIsLoding.bind(this)
        this.handleChangeData = this.props.handleChangeData.bind(this)
        this.handleChangeLabel = this.props.handleChangeLabel.bind(this)
        this.handleChangeDataset = this.props.handleChangeDataset.bind(this)
        this.handleChangeSamples = this.props.handleChangeSamples.bind(this)
        // this.handleFetchData = this.handleFetchData.bind(this)
        this.sentiments = ['positive',
                            'neutral',
                            'negative']
        this.intentions = ['general', 
                            'information', 
                            'participation', 
                            'enquiry', 
                            'compliment', 
                            'complaint/suggestion']
        this.products = ['others', 
                        'internet banking', 
                        'money transfer' , 
                        'atm/debit card', 
                        'corporate' , 
                        'deposit account' , 
                        'investment',
                        'branch',
                        'call center']
    }

    handleOnChange = (name) => (e) => {
        if (e.target.checked){
            let filteredItems = this.state[name].concat([e.target.value])
            this.setState({[name] : filteredItems})
        }

        else {
            let filteredItems = this.state[name].filter(item => (item !== e.target.value)) 
            this.setState({[name] : filteredItems})
        }

    };

    handleSelectAll = (name) => (e) => {
        if (e.target.checked){
            let filteredItems = this[name]
            this.setState({[name] : filteredItems})
        }
        else {
            let filteredItems = []
            this.setState({[name] : filteredItems})
        }
    }

    handleFetchData = () => {
        let obj = {}
        obj['pid'] = this.pid
        obj['target'] = this.target
        obj['sentiment'] = this.state.sentiments
        obj['intention'] = this.state.intentions
        obj['product'] = this.state.products
        // console.log(this.target,obj)
        axios.post('/dashboard/get',obj).then((res)=>{
            this.handleChangeData(res.data['values']) 
            this.handleChangeLabel(res.data['labels'])
            this.handleChangeDataset(res.data.values,res.data.labels)
            // console.log('samples',JSON.parse(res.data.filtered_text))
            this.handleChangeSamples(JSON.parse(res.data.filtered_text)['data'])
        })
    
    }

    handleSubmit = () => {
        this.handleFetchData()
        this.close()
    }

    componentDidMount(){
        this.handleFetchData()
        // console.log('fetching')
        // let obj = {}
        // obj['pid'] = this.pid
        // obj['target'] = this.target
        // obj['sentiment'] = this.state.sentiments
        // obj['intention'] = this.state.intentions
        // obj['product'] = this.state.products
        // axios.post('/dashboard/get',obj).then((res)=>{
        //     console.log(res.data)
        // })
    }

    render(){
        return (
            <Dialog 
                open={this.props.open} 
                onClose={this.props.close}
            >
                <DialogTitle>{this.props.target}'s filters</DialogTitle>
                <Divider/>
                <DialogContent>
                    <div style={{height:'10px'}}/>
                    <GridList cellHeight={'auto'} cols={4}>
                        <GridListTile cols={4}>
                            <FormLabel component="legend">
                                sentiments
                                <Checkbox onChange={this.handleSelectAll('sentiments')}/>
                            </FormLabel>
                        </GridListTile>
                        {this.sentiments.map((item,idx) => {
                            return (
                                <GridListTile key={idx} cols={1}>
                                    <FormControlLabel
                                    control={
                                        <Checkbox
                                        checked={this.state.sentiments.includes(item)}
                                        onChange={this.handleOnChange('sentiments')}
                                        value={item}
                                        color="secondary"
                                        indeterminate
                                        />
                                    }
                                    label={item}
                                    />
                                </GridListTile>
                            )
                        })}
                        <GridListTile cols={4}>
                            <FormLabel component="legend">
                                intentions
                                <Checkbox onChange={this.handleSelectAll('intentions')}/>
                            </FormLabel>
                        </GridListTile>
                        {this.intentions.map((item,idx) => {
                            return (
                                <GridListTile key={idx} cols={1}>
                                    <FormControlLabel
                                    control={
                                        <Checkbox
                                        checked={this.state.intentions.includes(item)}
                                        onChange={this.handleOnChange('intentions')}
                                        value={item}
                                        color="secondary"
                                        indeterminate
                                        />
                                    }
                                    label={item}
                                    />
                                </GridListTile>
                            )
                        })}
                        <GridListTile cols={4}>
                            <FormLabel component="legend">
                                products
                                <Checkbox onChange={this.handleSelectAll('products')}/>
                            </FormLabel>
                        </GridListTile>
                        {this.products.map((item,idx) => {
                            return (
                                <GridListTile key={idx} cols={1}>
                                    <FormControlLabel
                                    control={
                                        <Checkbox
                                        checked={this.state.products.includes(item)}
                                        onChange={this.handleOnChange('products')}
                                        value={item}
                                        color="secondary"
                                        indeterminate
                                        />
                                    }
                                    label={item}
                                    />
                                </GridListTile>
                            )
                        })}
                    </GridList>
                </DialogContent>
                <Divider/>
                <DialogActions>
                    <Button onClick={this.props.close} color="primary">
                        Close
                    </Button>
                    <Button onClick={this.handleSubmit} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default FilterDialog