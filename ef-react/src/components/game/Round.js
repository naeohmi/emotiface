import React, { Component } from 'react';

class Round extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emotions: {
                "E0": "angry",
                "E1": "happy",
                "E2": "sad",
                "E3": "silly",
                "E4": "surprised"
            }
        }
    }
    //TODO:
    //redirect to ID plus one
    //component for redirect
    //componentDidMount
    componentWillMount() {
        console.log(this.props.match.params.id)
    }
    e0() {
        return (
            <div className="round">
                <h1 className="E0">Make a {this.state.emotions.E0} face</h1>
                    <img src="/images/E0.png" alt="emoticon" />
            </div>
        );
    }
    e1() {
        return (
            <div className="round">
                <h1 className="E1">Make a {this.state.emotions.E1} face</h1>
                    <img src="/images/E1.png" alt="emoticon" />
            </div>
        );
    }
    e2() {
        return (
            <div className="round">
                <h1 className="E2">Make a {this.state.emotions.E2} face</h1>
                    <img src="/images/E2.png" alt="emoticon" />
            </div>
        );
    }
    e3() {
        return (
            <div className="round">
                <h1 className="E3">Make a {this.state.emotions.E3} face</h1>
                    <img src="/images/E3.png" alt="emoticon" />
            </div>
        );
    }


    e4() {
        return (
            <div className="round">
                <h1 className="E4">Make a {this.state.emotions.E4} face</h1>
                <img src="/images/E4.png" alt="emoticon" />
            </div>
        );
    }
//need to map though and find current round then redirect to the next
    render() {
        return (
            <div className="round">

            </div>
        );
    }
}
export default Round;