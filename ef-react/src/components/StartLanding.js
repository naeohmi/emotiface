import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Footer from './Footer';

class StartLanding extends Component {
    constructor(props) {
        super(props);
        this.startGame = this.startGame.bind(this);
    }
    startGame(event) {
        event.preventDefault();
    }
    render() {
        return (
            <div className="start-landing-wrapper">
                
                <h1 className="title">welcome to:</h1>
                <a className="main-logo"href="/"><img src="/images/logo.png" alt="logo" /></a>
                <div className="start-info">

                    <div className="start-btn-div">
                        <ul className="start-btn-ul">
                            <li className="start-btn-li">
                                <NavLink to="/play/action">
                                    <p>click to start!</p>
                            </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
                
                <Footer />
            </div>
        );
    }
}
export default StartLanding;