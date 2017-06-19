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
                <div className=" animated jello"><a className="main-logo" href="/"><img src="/images/logo.png" alt="logo" /></a></div>
                <div className="start-info">
                    {/*<div className=" animated jello emo-title"><img src="images/E0.png" alt="emoticon" /></div>*/}
                    {/*<div className=" animated flip emo-title"><img src="images/E1.png" alt="emoticon" /></div>*/}
                    {/*<div className=" animated tada emo-title"><img src="images/E2.png" alt="emoticon" /></div>*/}
                    {/*<div className=" animated pulse emo-title"><img src="images/E5.png" alt="emoticon" /></div>*/}
                    {/*<div className=" animated emo-title"><img src="images/E4.png" alt="emoticon" /></div>*/}
                    {/*<div className=" animated rotateIn emo-title"><img src="images/E3.png" alt="emoticon" /></div>*/}
                    {/*<h1 className="title">emotiface</h1>*/}
                    <br />
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