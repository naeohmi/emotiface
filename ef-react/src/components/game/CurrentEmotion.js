import React, { Component } from 'react';

class CurrentEmotion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emotionOne: undefined,
            emotionTwo: undefined,
            emotionThree: undefined,
            emotionFour: undefined,
            emotionFive: undefined,
        }
        this.componentDidMount = this.componentDidMount.bind(this);
        this.shuffle = this.shuffle.bind(this);
        this.randomEmotion = this.randomEmotion.bind(this);
        
    }
    componentDidMount() {
        this.randomEmotion();
    }

    

    render() {
        return (
            <div className="current-emotion-wrapper">
                {/*<h1> Current Emotion is: {this.randomEmotion}</h1>*/}
            </div>
        );
    }
}
export default CurrentEmotion;