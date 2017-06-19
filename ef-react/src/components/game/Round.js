import React, { Component } from 'react';

class Round extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentId: undefined,
            emotions: {
                "E0": "angry",
                "E1": "disgust",
                "E2": "fear",
                "E3": "joy",
                "E4": "sadness",
                "E5": "surprise"
            }
        }
        this.e0 = this.e0.bind(this);
        this.e1 = this.e1.bind(this);
        this.e2 = this.e2.bind(this);
        this.e3 = this.e3.bind(this);
        this.e4 = this.e4.bind(this);
    }
    //TODO:
    //redirect to ID plus one
    //component for redirect
    //componentDidMount
    componentDidMount() {
        console.log('component mount1', this.state.currentId);
        let currentId = this.props.match.params.id;
        console.log('component mount 2', currentId)
        // this.emoToDo(currentId)
    // }
    // emoToDo(currentId) {
        console.log('EMOTODO', currentId);
        if (currentId == 1) {

        console.log('e0 woke')
        return (
            <div className="round E0">
                <h1 className="emo-face">Make a:<span className="emo-name"> {this.state.emotions.E0} </span> face</h1>
                    <img src="/images/E0.png" alt="emoticon" />
            </div>
        );

        //I dont know why this isnt working! 
        } else if (currentId === 0) {
            this.e1()
            console.log('e1')
        } else if (currentId === 2) {
            this.e2()
            console.log('e2')
        } else if (currentId === 3) {
            this.e3()
            console.log('e3')
        }
    }
  
    e0() {
        console.log('e0 woke')
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
                <h3 className="to-do">Face to do!</h3>
                    {this.componentDidMount}
                
            </div>
        );
    }
}
export default Round;