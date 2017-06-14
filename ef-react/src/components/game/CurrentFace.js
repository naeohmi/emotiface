import React, { Component } from 'react';
import Cloud from 'cloudinary';
import Webcam from 'react-webcam';
import Cors from 'cors';
// import Axios from 'axios';

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
                    resolve (imgUrl)
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
           this.checkEmotion(data);
        })
    
    }

    //send data to API to check for current emotion
    checkEmotion(imgUrl) {
        // FROM DOCS:
        let mediaPost = (imgUrl) => {
            const request = new XMLHttpRequest();
            
            request.open('POST', `https://api.kairos.com/v2/media?source=${imgUrl}`);
            
            request.setRequestHeader('app_id', '9399f510');
            request.setRequestHeader('app_key', '4d5769c498c69f04239bb8da41668afe');
            console.log('mediaPost: ', request);
            request.onreadystatechange = function () {
                console.log(this.readyState, 'within on ready state');
                if (this.readyState === 4) {
                    console.log('Status:', this.status);
                    this.getAllResponseHeaders();
                    
                    if(this.response) {

                        setInterval(5000);
  

                        console.log(this.response);
                        console.log('id: ', this.response.id);
                    }
            };
            // return ID
            //invoke the function with the ID
            // this.mediaGet(id);
        }
            request.send();
        
        }

        let mediaGet = (id) => {
            const request = new XMLHttpRequest();
            request.open('GET', `https://private-8fc0b-kairos.apiary-mock.com/v2/media/${id}`);

            request.setRequestHeader('app_id', '9399f510');
            request.setRequestHeader('app_key', '4d5769c498c69f04239bb8da41668afe');

            request.onreadystatechange = function () {
                if (this.readyState === 4) {
                    console.log('Status:', this.status);
                    console.log('Headers:', this.getAllResponseHeaders());
                    console.log('Body:', this.responseText);
                }
            };
            request.send();
        }
        mediaPost(imgUrl);

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