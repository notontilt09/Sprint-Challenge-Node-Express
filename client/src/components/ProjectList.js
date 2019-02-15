import React from 'react'

class ProjectList extends React.Component {
    routeToProject(id) {
        this.props.history.push(`/${id}`)
    }

    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                <input />
                <input />
                </form>
                <div className="projects">
                {this.props.projects.map(project => {
                    return (
                    <div key={project.id} className='project'>
                        <h2 onClick={() => this.routeToProject(project.id)}>{project.name}</h2>
                        <h3>{project.description}</h3>
                    </div>
                    )
                })}
                </div>
            </>
        )
    }
}

export default ProjectList;