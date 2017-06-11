import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import ajax from 'ajax';
import StartLanding from './components/StartLanding';
import CurrentFace from './components/CurrentFace';
import EmotionToDo from './components/EmotionToDo';
import EndLanding from './components/EndLanding';
import AboutPage from './components/AboutPage';
import FourOhFour from './components/FourOhFour';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
this.score = this.score.bind(this);
};
score() {

}
render() {
  return (
    <Router>
    <div className="app-wrapper">
      <Navigation />
      <Switch>
        <Route path="/" exact component={() => (<StartLanding />)} />
        <Route path="/about" exact component={() => (<AboutPage />)} />
        <Route path="/play/setup" exact component={() => (<EmotionToDo />)} />
        <Route path="/play/action" exact component={() => (<CurrentFace />)} />
        <Route path="/end" exact component={() => (<EndLanding />)} />
        <Route path="/*" exact component={() => (<FourOhFour />)} />
        <Footer />
        </Switch>
      </div>
      </Router>
      
      );
  }
}

export default App;