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
            imgUrl: null
        }
        this.handleClick = this.handleClick.bind(this);
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
                        console.log('within the if', result.url);

                    } else {
                        console.log(`err: ${err}`);
                    }
                });
            }

            convert64ToImg(screenshot);

            return Prom;

        })

        Prom.then(data => {
            console.log('data: ', data);
            this.checkEmotionPostUrl(data);
        })

    }

    checkEmotionAll(data) {

        axios.all([this.checkEmotionPostUrl(data), this.checkEmotionGetId(12345)])
        .then(axios.spread((post, get) => {
            const idFromPost = post.data.id;
            const emotionJson = get.data //.people[0].emotions[0] etc....

            console.log(idFromPost)
            console.log(emotionJson)
        }))
        .catch(err => {
            console.log(err);
        })

    }

    checkEmotionPostUrl(imgUrl) {
        const setRequestHeader = {
            headers: {
                "Accept": "application/json",
                "app_id": "9399f510",
                "app_key": "4d5769c498c69f04239bb8da41668afe"
            }
        }
        axios.post(`https://api.kairos.com/v2/media?source=${imgUrl}`, [setRequestHeader]);
        
    }

    checkEmotionGetId(id) {
        const setRequestHeader = {
            headers: {
                "Accept": "application/json",
                "app_id": "9399f510",
                "app_key": "4d5769c498c69f04239bb8da41668afe"
            }
        }
        return axios.get(`https://api.kairos.com/v2/media/${id}`, setRequestHeader)
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
            </div>
        );
    }
};

export default CurrentFace;