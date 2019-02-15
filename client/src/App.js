import React, { Component } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';

import ProjectList from './components/ProjectList';
import Project from './components/Project';

import './App.css';

const url = 'http://localhost:8000/api'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      newProject: {
        name: '',
        description: ''
      }
    }
  }

  componentDidMount() {
    axios.get(`${url}/projects`)
      .then(res => {
        this.setState({
          projects: res.data
        })
      })
  }

  render() {
    return (
      <div className="App">
        <h1>React/Node/Express Projects</h1>
        <Route exact path='/' render={props => <ProjectList {...props} projects={this.state.projects} /> } />
        <Route path='/:id' render={props => <Project {...props} projects={this.state.projects} /> } />
      </div>
    );
  }
}

export default App;
