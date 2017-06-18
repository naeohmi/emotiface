import React, { Component } from 'react';
import {Bootstrap, Navbar} from 'react-bootstrap';

class Footer extends Component {

    render() {
        return (
            <div className="footer-wrapper">
                <Navbar >
                <h2 className="footer-h2">
                    made with <span>&hearts;</span> by: 
                    <a href="www.github.com/naeohmi"> naeohmi</a>
                </h2>
                </ Navbar>
            </div>
        );
    }
}
export default Footer;