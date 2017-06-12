import React, { Component } from 'react';
// import Axios from 'axios';
import Cloud from 'cloudinary';
import Webcam from 'react-webcam';

class CurrentFace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            screenshot: null,
            imgUrl: null

        }
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        let convert64ToImg = (photo64) => {
            //because this is a method within a function, I needed to save the 'this' that I wanted
            let innerThis = this;
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
                console.log('cloudinary up');

                if (result) {
                    console.log("result", result.url);
                    var imgUrl = result.url;
                    //assigns URL to state
                    innerThis.ocr(imgUrl);
                    innerThis.setState({ //yay inner this! :)
                        imgUrl
                    })
                } else {
                    console.log(`err: ${err}`);
                }
            });
        }
        // this.ocr(this.state.imgUrl);
        convert64ToImg(screenshot);
    }
    //form where user can update the barcode, needed to add this state change
    handleChange(event) {
        let info = event.target.value
        this.setState({
            upcFromPhoto: info
        })
    }
    //user edit barcode from photo state change on submit
    handleSubmit(event) {
        event.preventDefault();
        this.setState({
            upcFromPhoto: event.target.value
        })
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
                        {/*{this.afterPhoto()}*/}
                    </div>
                </div>
            </div>
        );
    }
};

export default CurrentFace;