import React, { Component } from 'react';

class AboutPage extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="about-page-wrapper">
                <h1>About</h1>
                <img src="../public/images/logo.png" alt="logo"/>
            </div>
        );
    }
}
export default AboutPage;