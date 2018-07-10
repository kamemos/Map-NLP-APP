import React from 'react'
import CreateProjForm from '../components/CreateProjForm'
import { withStyles } from '@material-ui/core/styles';
import ProjectCard from '../components/ProjectCard'
import Card from '@material-ui/core/Card';
import axios from 'axios';

const styles = {
    startCard: {
        display: 'flex',
        width: '345px',
        height: '400px',
        margin: 20,
        justifyContent:'center',
        alignItems: 'center'
    },
}

class ProjectPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {docs:[]}
    }

    componentDidMount(){
        axios.get('/project/get').then((res)=>{
            console.log(res.data)
            this.setState({docs:res.data.docs})
        })
    }

    render(){
        return(
            <div style={{display:'flex',flexWrap:'wrap',alignItems:'center',justifyContent:'center',minHeight:'70%'}}>
                {this.state.docs.map((proj,idx)=>{
                    return(
                        <ProjectCard 
                            key={idx} 
                            id={proj._id.$oid} 
                            projName={proj.projName} 
                            desc={proj.desc} 
                            keywords={proj.keywords}
                            excludeKeywords={proj.excludeKeywords}
                            useCrawler={proj.useCrawler}
                        />
                    )
                })}

                <Card className={this.props.classes.startCard}>
                    <CreateProjForm/>
                </Card>
            </div>
        )
    }
}

export default withStyles(styles)(ProjectPage)