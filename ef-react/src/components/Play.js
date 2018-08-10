import React, { Component } from 'react';
import Cloud from 'cloudinary';
import Webcam from 'react-webcam';
import {Table} from 'react-bootstrap';

class Play extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            screenshot: null,
            imgUrl: null,
            emotion: undefined,
            anger: undefined,
            disgust: undefined,
            fear: undefined,
            joy: undefined,
            sadness: undefined,
            surprise: undefined,
            showResults: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.checkEmotions = this.checkEmotions.bind(this);
    }
    handleClick(event) {
        event.preventDefault();
        const screenshot = this.webcam.getScreenshot();
        this.setState({
            screenshot
        })
        let Prom = new Promise((resolve, reject) => {
            let convert64ToImg = (photo64) => {
                let that = this;

                Cloud.config({
                    cloud_name: "dlhmylaz8",
                    api_key: "524257979483418",
                    api_secret: "T4Om9-7dWkG9YWplUDMtEbEHu6M",
                })
                Cloud.uploader.upload(photo64, (result, err) => {
                    if (result) {
                        var imgUrl = result.url;
                        that.setState({
                            imgUrl
                        });
                        resolve(imgUrl);
                    } else {
                        console.log(`err: ${err}`);
                    }
                });
            }
            convert64ToImg(screenshot);
            return Prom;
        })
        Prom.then(data => { this.checkEmotions(data) })
    }
    checkEmotions(imgUrl) {
        const postHeader = {
            method: "POST",
            headers: {
                "app_id": "9399f510",
                "app_key": "4d5769c498c69f04239bb8da41668afe"
            }
        }

        fetch(`https://api.kairos.com/v2/media?source=${imgUrl}`, postHeader)
            .then(data => {
                return data.json()
            })
            .then(d => {
                return d.id
            })
            .then(id => {
                const getHeader = {
                    method: "GET",
                    headers: {
                        "app_id": "9399f510",
                        "app_key": "4d5769c498c69f04239bb8da41668afe"
                    }
                }
                fetch(`https://api.kairos.com/v2/media/${id}`, getHeader)
                    .then(object => {
                        return object.json()
                    })
                    .then(obj => {
                        if (obj.frames === undefined || obj.frames[0].people[0] === undefined || obj.frames[0].people[0].emotions === undefined) {
                            alert(`Sorry, we can't find a face in that photo, please try again`);
                            window.location.reload();
                        }
                        let emotion = obj.frames[0].people[0].emotions;
                        return emotion;
                    })
                    .then(emotion => {
                        this.setState({
                            emotion: emotion,
                            anger: emotion.anger,
                            disgust: emotion.disgust,
                            fear: emotion.fear,
                            joy: emotion.joy,
                            sadness: emotion.sadness,
                            surprise: emotion.surprise,
                            showResults: true
                        })
                        console.log('Yay Results! :)', emotion);
                        return emotion;
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }
    render() {
        const resultsToShow = (
            <div className="emos results-table">
                <h3 className="small-title">Results!</h3>
                <Table responsive striped bordered hover>
                    <thead>
                        <tr>
                            <th className="emo-name E3"> joy </th>
                            <th className="emo-name E0"> anger </th>
                            <th className="emo-name E2"> fear </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><img src="https://i.imgur.com/yTfodcl.png" alt="emoticon-joy" /></td>
                            <td><img src="https://i.imgur.com/be3sZjs.png" alt="emoticon-anger" /></td>
                            <td><img src="https://i.imgur.com/WzbVzxW.png" alt="emoticon-fear" /></td>
                        </tr>
                        <tr>
                            <td className="emo-score E3"> +{this.state.joy} </td>
                            <td className="emo-score E0"> +{this.state.anger} </td>
                            <td className="emo-score E2"> +{this.state.fear} </td>
                        </tr>
                        <tr>
                            <td className="emo-name E4"> sadness </td>
                            <td className="emo-name E1"> disgust </td>
                            <td className="emo-name E5"> surprise </td>
                        </tr>
                        <tr>
                            <td><img src="https://i.imgur.com/mvLBKxN.png" alt="emoticon-sad" /></td>
                            <td><img src="https://i.imgur.com/A3wBN7d.png" alt="emoticon-disgust" /></td>
                            <td><img src="https://i.imgur.com/qoaM7gd.png" alt="emoticon-surprise" /></td>
                        </tr>
                        <tr>
                            <td className="emo-score E4"> +{this.state.sadness} </td>
                            <td className="emo-score E1"> +{this.state.disgust} </td>
                            <td className="emo-score E5"> +{this.state.surprise} </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
        const screenshotFromWebcam = (
            <div className="sceenshot">
                <h3 className="small-title">Heres your photo:</h3>
                <img src={this.state.screenshot} alt="webcam" />
            </div>
        )

        return (
            <div id="play" className="container">
                <h3 className="small-title">Take a photo</h3>
                <div className="webcam" >
                    <Webcam
                        audio={false}
                        height={500}
                        ref={node => this.webcam = node}
                        screenshotFormat="image/jpeg"
                        width={500}
                        className="webcam-cam"
                    />
                </div>
                <button className="start-btn" onClick={this.handleClick}>Save photo</button>
                {this.state.screenshot ? screenshotFromWebcam : null}
                {this.state.showResults ? resultsToShow : null}
            </div >
        );
    }
};

export default Play;