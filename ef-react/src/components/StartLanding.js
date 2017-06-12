import React, { Component } from 'react';

class StartLanding extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.startGame = this.startGame.bind(this);
    }
    startGame(event) {
        event.preventDefault();
        

    }

    render() {
        return (
            <div className="start-landing-wrapper">
                <h1>welcome to:</h1>
                {/*<a href="/"><img src="/images/logo-big.png" alt="logo-big"/></a>*/}
                <a href="/"><img src="/images/logo.png" alt="logo"/></a>
                <div className="start-info">
                    <input
                        type="text"
                        placeholder="enter initials"
                        ref="initials"
                        className="initials"
                        />
                    <button
                        className="start-button"
                        onClick={this.startGame}
                        >click to start!
                    </button>
                    </div>
            </div>
        );
    }
}
export default StartLanding;