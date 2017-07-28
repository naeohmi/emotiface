import './App.css';
import React, { Component } from 'react';
import StartLanding from './components/StartLanding';
import CurrentFace from './components/Play';
import EndLanding from './components/EndLanding';
import AboutPage from './components/AboutPage';
import Navigation from './components/Navigation';

class App extends Component {

  render() {
    return (
      <div className="app-wrapper">
        <Navigation />
        <StartLanding />
        <CurrentFace />
        <AboutPage />
        <EndLanding />
      </div>
    );
  }
}

export default App;