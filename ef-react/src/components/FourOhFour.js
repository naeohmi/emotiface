import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

class FourOhFour extends Component {

    render() {
        return (
            <div className="end-landing-wrapper">
                <Jumbotron>
                <h1>Sorry we can't find that page right now!</h1><br /><br />
       <iframe title="404" src="https://giphy.com/embed/n5ZJhC4NxnDlm" width="480" height="467" frameBorder="0" className="giphy-embed" allowFullScreen></iframe>
            <br />
            <br />
                   <div className="start-btn-div">
                        <ul className="start-btn-ul">
                            <li className="start-btn-li">
                                <NavLink to="/play">
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
export default FourOhFour;