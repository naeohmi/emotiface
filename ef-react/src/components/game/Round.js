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
                // "E5": "fear"
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
            <div className="round E0">
                <h1 className="emo-face">Make a:<span className="emo-name"> {this.state.emotions.E0} </span> face</h1>
                    <img src="/images/E0.png" alt="emoticon" />
            </div>
        );
    }
    e1() {
        return (
            <div className="round E1">
                <h1 className="emo-face">Make a:<span className="emo-name"> {this.state.emotions.E1} </span> face</h1>
                    <img src="/images/E1.png" alt="emoticon" />
            </div>
        );
    }
    e2() {
        return (
            <div className="round E2">
                <h1 className="emo-face">Make a:<span className="emo-name"> {this.state.emotions.E2} </span> face</h1>
                    <img src="/images/E2.png" alt="emoticon" />
            </div>
        );
    }
    e3() {
        return (
            <div className="round E3">
                <h1 className="emo-face">Make a:<span className="emo-name"> {this.state.emotions.E3} </span> face</h1>
                    <img src="/images/E3.png" alt="emoticon" />
            </div>
        );
    }


    e4() {
        return (
            <div className="round E4">
                <h1 className="emo-face">Make a:<span className="emo-name"> {this.state.emotions.E4} </span> face</h1>
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