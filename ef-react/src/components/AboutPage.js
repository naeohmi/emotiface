import React, { Component } from 'react';
import { Button, Modal, OverlayTrigger, Popover, Grid, Row, Col, Thumbnail } from 'react-bootstrap';
class AboutPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        }
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
    }
    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }

    render() {

        const popover = (
            <Popover id="modal-popover" title="github">
                www.github.com/naeohmi/emotiface
      </Popover>
        );
        return (
        <div>
        <Grid>
            <Row>
                <Col xs={6} md={4}>
                    <Thumbnail className="thumb" src="https://avatars0.githubusercontent.com/u/23532036?v=3&s=460" alt="naeohmi-photo">
                        <h3>About the Developer:</h3>
                        <p>
                            <Button bsStyle="primary">go to linkedin</Button>&nbsp;
          <Button bsStyle="default">go to resume</Button>
                        </p>
                    </Thumbnail>
                </Col>
                <Col xs={6} md={4}>
                    <Thumbnail className="thumb" src="/images/logo-big.png" alt="logo">
                        <h3>About the Game:</h3>
                        <p>
                            <Button bsStyle="primary" onClick={this.open}>click to learn more</Button>&nbsp;
          <Button bsStyle="default">go to github</Button>
                        </p>
                    </Thumbnail>
                </Col>
            </Row>
        </Grid>

            <Modal show={this.state.showModal} onHide={this.close}>
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
                    <Button onClick={this.close}>Close</Button>
                </Modal.Footer>
            </Modal>
      </div >
    )
    };
};

export default AboutPage;
