import React from 'react'
import axios from 'axios'

const url = 'http://localhost:8000/api/projects'

class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            project: {}
        }
    }

    componentDidMount() {
        const projectId = this.props.match.params.id;
        axios.get(`${url}/${projectId}`)
            .then(res => {
                this.setState({
                    project: res.data.project
                })
            })
    }

    render() {
        if (this.state.project.actions) {
            return (
                <div className='project-details'>
                    <h2>{this.state.project.name}</h2>
                    <h3>{this.state.project.description}</h3>
                    <div className='actions'>
                        <h1>Actions</h1>
                        {this.state.project.actions.map(action => {
                            return (
                                <div className='action'>
                                    <h4>{action.description}</h4>
                                    <p>{action.notes}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )
        } else {
            return (
                <h3>Loading Data</h3>
            )
        } 
    }
}

export default Project;