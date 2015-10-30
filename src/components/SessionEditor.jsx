import React from 'react';
import Relay from 'react-relay';
const { Component, PropTypes } = React;
const { createContainer } = Relay;

class SessionEditor extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log('EDITOR props', this.props);
        return (
            <div className="Edit">
                <h1>Imma Edit You</h1>
                <h1>{this.props.session.title}</h1>
            </div>
        );
    }
}

export default createContainer(SessionEditor, {
    fragments: {
        session: (variables) => Relay.QL`
            fragment on Session{
                    title
            }`
    }
});