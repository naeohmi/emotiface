import React, { Component } from 'react';

class FourOhFour extends Component {

    render() {
        return (
            <div className="four-oh-four-wrapper">
                <h1>Sorry we can't find that page right now!</h1>

                <iframe title="404" src="https://giphy.com/embed/n5ZJhC4NxnDlm" width="480" height="467" frameBorder="0" className="giphy-embed" allowFullScreen></iframe>
            </div>
        );
    }
}
export default FourOhFour;