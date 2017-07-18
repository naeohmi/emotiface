import React, { Component } from 'react';
import Cloud from 'cloudinary';
import Webcam from 'react-webcam';
import { Grid, Row, Col, Thumbnail, Button, Modal, Table, OverlayTrigger, ButtonToolbar, Tooltip } from 'react-bootstrap';

class CurrentFace extends Component {
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
            videoSrc: null,
        }
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleVideo = this.handleVideo.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.checkEmotions = this.checkEmotions.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    handleVideo(stream) {
        // Update the state, triggering the component to re-render with the correct stream
        this.setState({
            videoSrc: window.URL.createObjectURL(stream)
        });
    };
    videoError() {

    };
    componentDidMount() {
        console.log('awake')
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
        if (navigator.getUserMedia) {
            navigator.getUserMedia({ video: true }, this.handleVideo, this.videoError);
        }
    };
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
                        that.setState({
                            imgUrl
                        })
                        //using this = Prom is now equal to imgUrl because its now a promise
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
            //returns the ID from kairos API then need to GET the emotion JSON
            .then(d => {
                return d.id
            })
            //after the POST finishes and the ID is returned, make a GET req to grab the JSON
            .then(id => {
                const setRequestHeader2 = {
                    //new header with the different method but same keys
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
                        if (obj.frames === undefined || obj.frames[0].people[0] === undefined || obj.frames[0].people[0].emotions === undefined) {
                            alert(`Sorry, we can't find a face in that photo, please try again`);
                            //refresh page when face not found
                            window.location.reload();
                        }
                        let emotion = obj.frames[0].people[0].emotions;
                        console.log(`Emotions found: ${emotion}`);
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
                            surprise: emotion.surprise
                        })

                        return emotion;
                    })
            })
            //to catch and log any errors
            .catch(err => {
                console.log(err);
            })
    }
    //bootstrap tool to close the modal window
    closeModal() {
        this.setState({
            showModal: false
        });
    }
    //bootstrap tool to open the modal window
    openModal() {
        this.setState({
            showModal: true
        });
    }
    render() {
        //bootstrap tool to set var for tooltip to be displayed
        const tooltip = (
            <Tooltip id="tooltip">
                <strong>Facial Recognition can be fussy sometimes!</strong>
                When taking a photo please ensure:
                <br />
                1. Your whole face is in the screen
                <br />
                2. There are no bright lights in the photo to distract the software
                <br />
                3. You are facing forward, directly toward the camera
                <br />
                4. You are not wearing a hat or large distracting glasses
                <br />
                Thanks :D
            </Tooltip>
        );
        return (
            <div className="container">
                <ButtonToolbar>
                    <OverlayTrigger placement="bottom" overlay={tooltip}>
                        <Button className="tip-button" bsStyle="default">Photo tips</Button>
                    </OverlayTrigger>
                </ButtonToolbar>

                <video src={this.state.videoSrc} autoPlay="true" />

                <Grid>
                    <Row>
                        <Col md={4}>
                            <Thumbnail >

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
                                <br />
                                <p>
                                    <Button bsStyle="primary" onClick={this.handleClick}>Save photo</Button>
                                </p>
                            </Thumbnail>
                        </Col>
                        <Col md={4}>
                            <Thumbnail>
                                <div className="sceenshot">
                                    <h3 className="small-title">Heres your photo:</h3>
                                    {this.state.screenshot ? <img src={this.state.screenshot} alt="webcam" /> : null}
                                </div>

                            </Thumbnail>
                        </Col>
                        <div className="emos">

                            <Button
                                bsStyle="primary"
                                bsSize="large"
                                onClick={this.openModal}
                            >
                                Click to See Results!
                            </Button>

                            <Modal show={this.state.showModal} onHide={this.closeModal}>

                                <Modal.Header closeButton>
                                    <Modal.Title className="small-title">Your photo scored:</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
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
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onClick={this.closeModal}>Close</Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </Row>
                </Grid>
            </div >
        );
    }
};

export default CurrentFace;