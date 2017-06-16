import React, { Component } from 'react';
import { Bootstrap, Modal } from 'react-bootstrap';

class ModalWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.getInitialState = this.getInitialState.bind(this);
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
    }

    getInitialState() {
        return {
            showModal: false
        };
    }

    close() {
        this.setState({
            showModal: false
        });
    }

    open() {
        this.setState({
            showModal: true
        });
    }

    render() {

        return (
            <div>
                <Button
                    bsStyle="primary"
                    bsSize="large"
                    onClick={this.open}
                    >
                    See Results!
                </Button>

                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Text in a modal</h4>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
};

export default ModalWindow;

