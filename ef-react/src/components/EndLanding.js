import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

class EndLanding extends Component {

    render() {
        return (
            <div className="end-landing-wrapper">
                <Jumbotron>
                <h1>Finished playing?</h1>
            <iframe title="stop-page" src="https://giphy.com/embed/vDurI6FYH7qi4" width="480" height="270" frameBorder="0" className="giphy-embed" allowFullScreen></iframe>
            <br />
            <br />
                   <div className="start-btn-div">
                        <ul className="start-btn-ul">
                            <li className="start-btn-li">
                                <NavLink to="/play/action">
                                    <p>click to play again!</p>
                            </NavLink>
                            </li>
                        </ul>
                    </div>
                    </Jumbotron>
            </div>
        );
    }
}
export default EndLanding;