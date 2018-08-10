import React, { Component } from 'react';

class StartLanding extends Component {
    render() {
        return (
            <div id="home" className="start-landing-wrapper">
                <h1 className="title">welcome to:</h1>
                <div className="animated jello">
                    <a className="main-logo" href="/">
                        <img src="http://i.imgur.com/Yv5gbrv.png" alt="logo" />
                    </a>
                </div>
                <a href="#play" className="start-btn">
                    <p>click to start!</p>
                </a>

            </div>
        );
    }
}
export default StartLanding;