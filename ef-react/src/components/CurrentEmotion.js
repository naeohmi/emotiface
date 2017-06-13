import React, { Component } from 'react';


//TODO: 
// 1. shuffle emotions array
// --so each time game is play, each emotion is displayed in a random order
// --and make sure to go through the full array, so no emotion is skipped 
// 2. save the current emotion in play in the state to check if correctly detected
// 3. repeat for new current emotion and new check x5 +

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
    //Fisher-Yates (aka Knuth) Shuffle - shuffle algorithm to go through emotions and make sure to each emotion once, randomly
    //thanks stack overflow
    shuffle(array) {
        let currentIndex = array.length, temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    //loop through emotions and grab one randomly
    randomEmotion() {
        //saved emotions to check for (note: I doubled up my favorite ones - to make the game more fun)
        const emotions = [
            "happy",
            "sad",
            "angry",
            "surprised",
            "silly"
        ];
        //loop through emotions array and save the shuffled current emotion in state
            let shuffledEmos = this.shuffle(emotions);
            console.log(shuffledEmos);
            this.setState({
                emotionOne: shuffledEmos[0],
                emotionTwo: shuffledEmos[1],
                emotionThree: shuffledEmos[2],
                emotionFour: shuffledEmos[3],
                emotionFive: shuffledEmos[4]
            });
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