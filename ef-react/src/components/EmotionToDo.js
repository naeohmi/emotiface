import React, { Component } from 'react';
import { jquery as $ } from 'jquery';
class EmotionToDo extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    // SDK Needs to create video and canvas nodes in the DOM in order to function
    // Here we are adding those nodes a predefined div.
    setUp() {
        var divRoot = $("#affdex_elements")[0];
        var width = 640;
        var height = 480;
        var faceMode = affdex.FaceDetectorMode.LARGE_FACES;
        //Construct a CameraDetector and specify the image width / height and face detector mode.
        var detector = new affdex.CameraDetector(divRoot, width, height, faceMode);

        //Enable detection of all Expressions, Emotions and Emojis classifiers.
        detector.detectAllEmotions();
        detector.detectAllExpressions();
        detector.detectAllEmojis();
        detector.detectAllAppearance();

        //Add a callback to notify when the detector is initialized and ready for runing.
        detector.addEventListener("onInitializeSuccess", function () {
            log('#logs', "The detector reports initialized");
            //Display canvas instead of video feed because we want to draw the feature points on it
            $("#face_video_canvas").css("display", "block");
            $("#face_video").css("display", "none");
        });
    }
    log(node_name, msg) {
        $(node_name).append("<span>" + msg + "</span><br />")
    }

    //function executes when Start button is pushed.
    onStart() {
        if (detector && !detector.isRunning) {
            $("#logs").html("");
            detector.start();
        }
        log('#logs', "Clicked the start button");
    }

    //function executes when the Stop button is pushed.
    onStop() {
        log('#logs', "Clicked the stop button");
        if (detector && detector.isRunning) {
            detector.removeEventListener();
            detector.stop();
        }
    };

    //function executes when the Reset button is pushed.
    onReset() {
        log('#logs', "Clicked the reset button");
        if (detector && detector.isRunning) {
            detector.reset();

            $('#results').html("");
        }
    };

    //Add a callback to notify when camera access is allowed

    onWebcamConnectSuccess() {
        detector.addEventListener("onWebcamConnectSuccess", function () {
            log('#logs', "Webcam access allowed");
        });
    }

    onWebcamConnectFailure() {
        //Add a callback to notify when camera access is denied
        detector.addEventListener("onWebcamConnectFailure", function () {
            log('#logs', "webcam denied");
            console.log("Webcam access denied");
        });
    }
    //Add a callback to notify when detector is stopped

    onStopSuccess() {
        detector.addEventListener("onStopSuccess", function () {
            log('#logs', "The detector reports stopped");
            $("#results").html("");
        });
    }
    //Add a callback to receive the results from processing an image.
    //The faces object contains the list of the faces detected in an image.
    //Faces object contains probabilities for all the different expressions, emotions and appearance metrics
    onImageResultsSuccess() {
        detector.addEventListener("onImageResultsSuccess", function (faces, image, timestamp) {
            $('#results').html("");
            log('#results', "Timestamp: " + timestamp.toFixed(2));
            log('#results', "Number of faces found: " + faces.length);
            if (faces.length > 0) {
                log('#results', "Appearance: " + JSON.stringify(faces[0].appearance));
                log('#results', "Emotions: " + JSON.stringify(faces[0].emotions, function (key, val) {
                    return val.toFixed ? Number(val.toFixed(0)) : val;
                }));
                log('#results', "Expressions: " + JSON.stringify(faces[0].expressions, function (key, val) {
                    return val.toFixed ? Number(val.toFixed(0)) : val;
                }));
                log('#results', "Emoji: " + faces[0].emojis.dominantEmoji);
                drawFeaturePoints(image, faces[0].featurePoints);
            }
        });
    }

    //Draw the detected facial feature points on the image
    drawFeaturePoints(img, featurePoints) {
        var contxt = $('#face_video_canvas')[0].getContext('2d');
    }





    render() {
        return (
            <div className="emotion-todo-wrapper">
                <h1>EmotionToDo</h1>


                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-8" style="width:680px;height:480px;"></div>
                        <div className="col-md-4">
                            <div style="height:25em;">
                                <strong>EMOTION TRACKING RESULTS</strong>
                                <div className="results" style="word-wrap:break-word;"></div>
                            </div>
                            <div>
                                <strong>DETECTOR LOG MSGS</strong>
                            </div>
                            <div className="logs"></div>
                        </div>
                    </div>
                    <div>
                        <button className="start" onclick={this.onStart()}>Start</button>
                        <button className="stop" onclick={this.onStop()}>Stop</button>
                        <button className="reset" onclick={this.onReset()}>Reset</button>
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