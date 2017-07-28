import React, { Component } from 'react';
import { Button, Modal, OverlayTrigger, Popover, Grid, Row, Col, Thumbnail } from 'react-bootstrap';
class AboutPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal1: false,
            showModal2: false
        }
        this.close1 = this.close1.bind(this);
        this.open1 = this.open1.bind(this);
        this.close2 = this.close2.bind(this);
        this.open2 = this.open2.bind(this);
    }
    close1() {
        this.setState({ showModal1: false });
    }
    open1() {
        this.setState({ showModal1: true });
    }
    close2() {
        this.setState({ showModal2: false });
    }
    open2() {
        this.setState({ showModal2: true });
    }

    render() {

        const popover = (
            <Popover id="modal-popover" title="Github">
                www.github.com/naeohmi/emotiface
            </Popover>
        );
        
        return (
        <div id="about">
            <Grid>
                <Row>
                <Col xs={6} md={4}>
                    <Thumbnail className="thumb" src="https://i.imgur.com/Yv5gbrv.png" alt="logo">
                        <h3>About the Game:</h3>
                        <p>
                            <Button bsStyle="primary" onClick={this.open1}>click to learn more about emotiface</Button>&nbsp;
                        </p>
                    </Thumbnail>
                </Col>

                <Col xs={6} md={4}>
                    <Thumbnail className="thumb" src="https://avatars0.githubusercontent.com/u/23532036?v=3&s=460" alt="naeohmi-photo">
                        <h3>About the Developer:</h3>
                        <p>
                            <Button bsStyle="primary" onClick={this.open2}>click to learn more about naeohmi</Button>&nbsp;
                        </p>
                    </Thumbnail>
                </Col>

            </Row>
        </Grid>

            <Modal show={this.state.showModal1} onHide={this.close1}>
                <Modal.Header closeButton>
                    <Modal.Title>About Emotiface:</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <p className="about-page">
                        Emotiface is a game built for all people to have fun playing.<br /> <br />
                        It is especially useful for individuals who struggle reading emotions to learn more about how different emotions look.<br /> <br />
                        Emotiface was built in one week as a final project for the Web Development Immersive Course at General Assembly by Naomi Meyer.<br /> <br />
                        Built with: React, Node, PostgreSQL, Express, Kairos Facial Recognition and Emotion Analysis AI API, plus many more middleware and npm packages.<br /> <br />
                        To see the code and read more about the game visit:
                    <OverlayTrigger overlay={popover}>
                            <a href="www.github.com/naeohmi/emotiface">
                                Github
                        </a>
                        </OverlayTrigger>

                        <br /> <br />
                        Hope you have fun playing!!
                </p>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.close1}>Close</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={this.state.showModal2} onHide={this.close2}>
                <Modal.Header closeButton>
                    <Modal.Title>About naeohmi:</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <p className="about-nae">
                        Naomi Meyer AKA naeohmi is a Web Developer currently based in New York City.<br /> <br />
                        Before programming full time, she worked as a classroom teacher.<br /> <br />
                        Emotiface was built with former students in mind who had trouble reading and understanding emotions.<br /> <br />
                        Hope you enjoy! :D
                    </p>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.close2}>Close</Button>
                </Modal.Footer>
            </Modal>

      </div >
    )
    };
};

export default AboutPage;
