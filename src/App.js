import React, { Component } from 'react';
import Menu from './components/navigation/Menu';
import ProteinContainer from './components/protein/ProteinContainer.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Menu />
        <ProteinContainer />
      </div>
    );
  }
}

export default App;
