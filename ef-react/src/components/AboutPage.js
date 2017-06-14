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
                <h1 className="title">about the game</h1>
                <img src="/images/logo.png" alt="logo" />
                <p className="about-page">
                    Emotiface is a game built for all people to have fun playing.<br /> <br />
                    It is especially useful for individuals who struggle reading emotions to learn more about how different emotions look.<br /> <br />
                    Emotiface was built in one week as a final project for the Web Development Immersive Course at General Assembly by Naomi Meyer.<br /> <br />
                    Built with: React, Node, PostgreSQL, Express, Kairos Facial Recognition and Emotion Analysis AI API, plus many more middleware and npm packages.<br /> <br />
                    To see the code and read more about the game visit: <a href="www.github.com/naeohmi/emotiface" />.<br /> <br />
                    Hope you have fun playing!!
                </p>
            </div>
        );
    }
}
export default AboutPage;