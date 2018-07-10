import React from 'react'
import { FormGroup,FormLabel,FormControlLabel,Checkbox } from '@material-ui/core';
import { Dialog,DialogTitle,DialogContent,DialogActions } from '@material-ui/core';
import { Divider,Button } from '@material-ui/core';
import { GridList,GridListTile } from '@material-ui/core';

class FilterDialog extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            open : this.props.open,
            target : this.props.target,
            sentiments : [],
            intentions : [],
            products : [],
            selectSen : false,
            selectInt : false,
            selectPro : false   
        }
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
                        <GridListTile key="Subheader" cols={4}>
                            <FormLabel component="legend">
                                sentiments
                                <Checkbox onChange={this.handleSelectAll('sentiments')}/>
                            </FormLabel>
                        </GridListTile>
                        {this.sentiments.map((item,idx) => {
                            return (
                                <GridListTile cols={1}>
                                    <FormControlLabel
                                    control={
                                        <Checkbox
                                        key={idx}
                                        checked={this.state.sentiments.includes(item)}
                                        onChange={this.handleOnChange('sentiments')}
                                        value={item}
                                        color="primary"
                                        indeterminate
                                        />
                                    }
                                    label={item}
                                    />
                                </GridListTile>
                            )
                        })}
                        <GridListTile key="Subheader" cols={4}>
                            <FormLabel component="legend">
                                intentions
                                <Checkbox onChange={this.handleSelectAll('intentions')}/>
                            </FormLabel>
                        </GridListTile>
                        {this.intentions.map((item,idx) => {
                            return (
                                <GridListTile cols={1}>
                                    <FormControlLabel
                                    control={
                                        <Checkbox
                                        key={idx}
                                        checked={this.state.intentions.includes(item)}
                                        onChange={this.handleOnChange('intentions')}
                                        value={item}
                                        color="primary"
                                        indeterminate
                                        />
                                    }
                                    label={item}
                                    />
                                </GridListTile>
                            )
                        })}
                        <GridListTile key="Subheader" cols={4}>
                            <FormLabel component="legend">
                                products
                                <Checkbox onChange={this.handleSelectAll('products')}/>
                            </FormLabel>
                        </GridListTile>
                        {this.products.map((item,idx) => {
                            return (
                                <GridListTile cols={1}>
                                    <FormControlLabel
                                    control={
                                        <Checkbox
                                        key={idx}
                                        checked={this.state.products.includes(item)}
                                        onChange={this.handleOnChange('products')}
                                        value={item}
                                        color="primary"
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
                    <Button onClick={this.props.clos} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default FilterDialog