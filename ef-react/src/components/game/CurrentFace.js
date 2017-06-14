import React, { Component } from 'react';
import Cloud from 'cloudinary';
import Webcam from 'react-webcam';
// import Cors from 'cors';
import axios from 'axios';

class CurrentFace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            screenshot: null,
            imgUrl: null,
            emotion: undefined,
            anger: undefined,
            disgust: undefined,
            fear: undefined,
            joy: undefined,
            sadness: undefined,
            surprise: undefined
        }
        this.handleClick = this.handleClick.bind(this);
        this.checkEmotions = this.checkEmotions.bind(this);
    }
    //grabs the image from the webcam after user clicks button
    handleClick(event) {
        event.preventDefault();
        const screenshot = this.webcam.getScreenshot();
        //sets state with image
        this.setState({
            screenshot
        })
        //saves the webcam screenshot from the user into the cloudinary cloud and assigns a unique URL
        let Prom = new Promise((resolve, reject) => {

            let convert64ToImg = (photo64) => {
                //because this is a method within a function, I needed to save the 'this' that I wanted
                let that = this;
                // base64Img.img(`${screenshot}`, '', 'screenshot', function(err, filepath) {});
                //cloudinary header from naeohmi profile
                Cloud.config({
                    cloud_name: "dlhmylaz8",
                    api_key: "524257979483418",
                    api_secret: "T4Om9-7dWkG9YWplUDMtEbEHu6M",
                })

                //uploads photo user took to cloudinary
                Cloud.uploader.upload(photo64, (result, err) => {
                    //grabs the photos new unique URL from cloudinary
                    if (result) {
                        console.log("result", result.url);
                        var imgUrl = result.url;
                        //assigns URL to state
                        that.setState({ //yay inner this! :)
                            imgUrl
                        })
                        //using this = Prom is now equal to imgUrl because its now a promise (using es7 syntax)
                        resolve(imgUrl)
                        // console.log('within the if', result.url);

                    } else {
                        console.log(`err: ${err}`);
                    }
                });
            }

            convert64ToImg(screenshot);

            return Prom;

        })

        Prom.then(data => {
            // console.log('data: ', data);
            this.checkEmotions(data);
        })

    }
    //take the screenshot as jpeg in URL and send to Kairos API to check the emotion reading from AI
    checkEmotions(imgUrl) {
        //Kairos requires a POST to start which returns the ID
        const setRequestHeader1 = {
            method: "POST",
            headers: {
                "app_id": "9399f510",
                "app_key": "4d5769c498c69f04239bb8da41668afe"
            }
        }
        //tried axios, there is an issue with axios and kairos with the config headers, so needed to use fetch which works! yay :)
        fetch(`https://api.kairos.com/v2/media?source=${imgUrl}`, setRequestHeader1)
            .then(data => {
                return data.json()
            })
            //returns the ID from kairos API then GET the emotion JSON
            .then(d => {
                // console.log('data', d.id)
                return d.id
            })
            //after the POST finishes and the ID is returned, make a GET req to grab the JSON
            .then(id => {
                const setRequestHeader2 = {
                    //need to make a new header with the different method
                    method: "GET",
                    headers: {
                        "app_id": "9399f510",
                        "app_key": "4d5769c498c69f04239bb8da41668afe"
                    }
                }
                fetch(`https://api.kairos.com/v2/media/${id}`, setRequestHeader2)
                    //returns the full json object, and convert to json
                    .then(object => {
                        return object.json()
                    })
                    //takes the full object and grabs just the emotion data to check from
                    .then(obj => {
                        console.log('obj', obj)
                        if (!obj.frames[0].people[0].emotions) {
                            alert(`Sorry, we can't find a face in that photo, please try again`)
                        }
                        let emotion = obj.frames[0].people[0].emotions
                        console.log(`Emotions found: ${emotion}`)
                        return emotion
                    })
                    .then(emotion => {
                        this.setState({
                            emotion: emotion,
                            anger: emotion.anger,
                            disgust: emotion.disgust,
                            fear: emotion.fear,
                            joy: emotion.joy,
                            sadness: emotion.sadness,
                            surprise: emotion.surprise
                        })
                        console.log('state: ', this.state.emotion)
                        console.log(`emotions found: anger:${this.state.anger}, joy:${this.state.joy}`)
                        return emotion
                    })
                    // .then(emotion => {
                        // this.showEmotions()
                    // })
            })
            //to catch and log any errors
            .catch(err => {
                console.log(err)
            })
    }
    //once we have the emotions returned and have saved them into state, display them here!
    showEmotions() {
        console.log('showemotions awake')
        if (this.state.emotion !== undefined) {
            return (
                <div className="emo-found">
                    <h1 className="emo-title">
                        You scored:
                    </h1>
                    <h3 className="emo-list">
                        Anger: {this.state.anger} <br />
                        Disgust: {this.state.disgust} <br />
                        Fear: {this.state.fear} <br />
                        Joy: {this.state.joy} <br />
                        Sadness: {this.state.sadness} <br />
                        Surprise: {this.state.surprise} <br />
                    </h3>
                </div>
            )
        }
    }
        
    

    render() {
        return (
            <div className="container">
                <div className="webcam">
                    <Webcam
                        audio={false}
                        height={400}
                        ref={node => this.webcam = node}
                        screenshotFormat="image/jpeg"
                        width={400}
                    />
                    <br />
                    <button className="searchProduct" onClick={this.handleClick}>Save photo</button>

                    <div className="sceenshot">
                        {this.state.screenshot ? <img src={this.state.screenshot} alt="webcam" /> : null}

                    </div>
                </div>
                <div className="emos">
                    {this.showEmotions()}
                </div>
            </div>
        );
    }
};

export default CurrentFace;