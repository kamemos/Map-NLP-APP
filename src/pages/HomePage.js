import React from 'react'
import bg from '../assets/imgs/well-being.png'
import { Link } from 'react-router-dom'
import {Button,Paper} from '@material-ui/core';

class HomePage extends React.Component{
    render(){
        return(
            <React.Fragment>
            <div style={{height:'20px'}}/>
            <div style={{zIndex:0,position:'relative',height:'70%',width:'100%'}}>
                <div 
                    style={{
                        height:'100%',
                        width:'100%',
                        backgroundImage:`url(${bg})`,
                        opacity:'0.5',
                        position:'absolute'
                    }}
                >
                </div>
                <div 
                    style={{
                        zIndex: 1,
                        height:'100%',
                        width:'100%',
                        display:'flex',
                        flexDirection:'column',
                        justifyContent:'center',
                        alignItems:'center',
                        position:'relative'
                    }}
                >
                    <h1 style={{color:'white',fontSize:'500%'}}>To feel how social feel</h1>
                    <h1 style={{color:'white'}}>AB - DUL</h1>
                    <Link to="/project" style={{ textDecoration: 'none' }}>
                        <Button color="secondary" sty variant='extendedFab' size="large">ENGAGE</Button>
                    </Link>
                </div>
            </div>
            
            <div style={{height:'20px'}}/>
            </React.Fragment>
        )
    }
}

export default HomePage