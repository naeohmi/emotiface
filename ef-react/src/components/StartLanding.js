import React, { Component } from 'react';
import Footer from './Footer';

class StartLanding extends Component {

    render() {
        return (
            <div id="home" className="start-landing-wrapper">
                <h1 className="title">welcome to:</h1>
                <div className=" animated jello"><a className="main-logo" href="/"><img src="http://i.imgur.com/Yv5gbrv.png" alt="logo" /></a></div>
                <div className="start-info">
                    <br />
                    <div className="start-btn-div">
                        <ul className="start-btn-ul">
                            <li className="start-btn-li">
                                 <a href="#play"> 
                                    <p>click to start!</p>
                                </a>
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