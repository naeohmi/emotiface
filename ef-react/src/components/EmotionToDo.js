import React, { Component } from 'react';
import { jquery as $ } from 'jquery';
import config from './config'
import aws from 'aws-sdk';
import affdex from 'affdex-licode';

class EmotionToDo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            divRoot: undefined,
            width: undefined,
            height: undefined,
            faceMode: undefined,
            detector: undefined,
            log: undefined
        }
    }

    setUpStates() {
        let thisDiv = document.getElementsByClassName("container-fluid");
        this.setState({
            divRoot: thisDiv,
            width: 640,
            height: 480,
            faceMode: affdex.FaceDetectorMode.LARGE_FACES,
            //Construct a CameraDetector and specify the image width / height and face detector mode.
            detector: new affdex.CameraDetector(this.state.divRoot, this.state.width, this.state.height, this.state.faceMode),
            log: this.state.detector.log
        })
    }


    hello() {
        console.log(aws);
        aws.config.update({
            accessKeyId: config.awsAccessKeyID,
            secretAccessKey: config.awsSecretAccessKey,
            region: config.awsRegion
        })


    }
    //SDK Needs to create video and canvas nodes in the DOM in order to function
    //Here we are adding those nodes a predefined div.
    setUp() {
        this.setUpStates();
        //Enable detection of all Expressions, Emotions and Emojis classifiers.
        this.state.detector.detectAllEmotions();
        this.state.detector.detectAllExpressions();
        this.state.detector.detectAllEmojis();
        this.state.detector.detectAllAppearance();

        //Add a callback to notify when the detector is initialized and ready for running.
        this.state.detector.addEventListener("onInitializeSuccess", function () {
            this.state.log('#logs', "The detector reports initialized");
            //Display canvas instead of video feed because we want to draw the feature points on it
            $("#face_video_canvas").css("display", "block");
            $("#face_video").css("display", "none");
        });
    }
    //detector logs the logs (not console.logs!)
    log(node_name, msg) {
        $(node_name).append("<span>" + msg + "</span><br />")
    }

    //function executes when Start button is pushed.
    onStart() {
        if (this.state.detector && !this.state.detector.isRunning) {
            $("#logs").html("");
            this.state.detector.start();
        }
        //---log('#logs', "Clicked the start button");
    }

    //function executes when the Stop button is pushed.
    onStop() {
        //---log('#logs', "Clicked the stop button");
        if (this.state.detector && this.state.detector.isRunning) {
            this.state.detector.removeEventListener();
            this.state.detector.stop();
        }
    };

    //function executes when the Reset button is pushed.
    onReset() {
        //---log('#logs', "Clicked the reset button");
        if (this.state.detector && this.state.detector.isRunning) {
            this.state.detector.reset();

            $('#results').html("");
        }
    };

    //Add a callback to notify when camera access is allowed

    onWebcamConnectSuccess() {
        this.state.detector.addEventListener("onWebcamConnectSuccess", function () {
            //---log('#logs', "Webcam access allowed");
        });
    }

    onWebcamConnectFailure() {
        //Add a callback to notify when camera access is denied
        this.state.detector.addEventListener("onWebcamConnectFailure", function () {
            //---log('#logs', "webcam denied");
            console.log("Webcam access denied");
        });
    }
    //Add a callback to notify when detector is stopped

    onStopSuccess() {
        this.state.detector.addEventListener("onStopSuccess", function () {
            //---log('#logs', "The detector reports stopped");
            $("#results").html("");
        });
    }
    //Add a callback to receive the results from processing an image.
    //The faces object contains the list of the faces detected in an image.
    //Faces object contains probabilities for all the different expressions, emotions and appearance metrics
    onImageResultsSuccess() {
        this.state.detector.addEventListener("onImageResultsSuccess", function (faces, image, timestamp) {
            $('#results').html("");
            //---log('#results', "Timestamp: " + timestamp.toFixed(2));
            //---log('#results', "Number of faces found: " + faces.length);
            if (faces.length > 0) {
                //---log('#results', "Appearance: " + JSON.stringify(faces[0].appearance));
                //---log('#results', "Emotions: " + JSON.stringify(faces[0].emotions, function (key, val) {
                //---    return val.toFixed ? Number(val.toFixed(0)) : val;
                //---}));
                //---log('#results', "Expressions: " + JSON.stringify(faces[0].expressions, function (key, val) {
                //---    return val.toFixed ? Number(val.toFixed(0)) : val;
                //---}));
                //---log('#results', "Emoji: " + faces[0].emojis.dominantEmoji);
                this.drawFeaturePoints(image, faces[0].featurePoints);
            }
        });
    }

    //Draw the detected facial feature points on the image
    drawFeaturePoints(img, featurePoints) {
        var contxt = $('#face_video_canvas')[0].getContext('2d');
        var hRatio = contxt.canvas.width / img.width;
        var vRatio = contxt.canvas.height / img.height;
        var ratio = Math.min(hRatio, vRatio);

        contxt.strokeStyle = "#FFFFFF";
        for (var id in featurePoints) {
          contxt.beginPath();
          contxt.arc(featurePoints[id].x,
            featurePoints[id].y, 2, 0, 2 * Math.PI);
          contxt.stroke();

        }
      }

    render() {
        return (
            <div className="emotion-todo-wrapper">
                <h1>EmotionToDo</h1>

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-8"></div>
                        <div className="col-md-4">
                            <div className="col-md-7">
                                <strong>EMOTION TRACKING RESULTS</strong>
                                <div className="results-emotion"></div>
                            </div>
                            <div>
                                <strong>DETECTOR LOG MSGS</strong>
                            </div>
                            <div className="logs"></div>
                        </div>
                    </div>
                    <div>
                        <button className="start" onClick={this.onStart()}>Start</button>
                        <button className="stop" onClick={this.onStop()}>Stop</button>
                        <button className="reset" onClick={this.onReset()}>Reset</button>
                        <h3>Affectiva JS SDK CameraDetector to track different emotions.</h3>
                        <p>
                            <strong>Instructions</strong>

                                Press the start button to start the detector.
                                When a face is detected, the probabilities of the different emotions are written to the DOM.
                                Press the stop button to end the detector.
                                </p>
                    </div>
                </div>
            </div >
        );
    }
}
export default EmotionToDo;