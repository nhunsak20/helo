import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

import './App.css';

import Nav from './Components/Nav/Nav'
import routes from './routes'

class App extends Component {
  constructor() {
    super()
    this.state={}
  }

  render() {
    return (
      <div className="App">
        {this.props.location.pathname !== '/' ?
          <Nav />
          :
          null}
        
        {routes}
      </div>
    );
  }
}

export default (withRouter)(App);
