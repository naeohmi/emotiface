import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';

class EndLanding extends Component {

    render() {
        return (
            <div id="stop" className="end-landing-wrapper">
                <Jumbotron>
                <h1>Finished playing?</h1>
            <iframe title="stop-page" src="https://giphy.com/embed/vDurI6FYH7qi4" width="480" height="270" frameBorder="0" className="giphy-embed" allowFullScreen></iframe>
            <br />
            <br />
                   <div className="start-btn-div">
                        <ul className="start-btn-ul">
                            <li className="start-btn-li">
                                <a href="#play"> 
                                    <p>click to play again!</p>
                                </a>
                            </li>
                        </ul>
                    </div>
                    </Jumbotron>
            </div>
        );
    }
}
export default EndLanding;