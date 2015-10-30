import React from 'react';
import Relay from 'react-relay';
const { Component, PropTypes } = React;
const { createContainer } = Relay;

class SessionEditor extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log('EDITOR session', this.props.event.session);
        return (
            <div className="Edit">
                <h1>Imma Edit You</h1>
                <h1>{this.props.event.session.title}</h1>
            </div>
        );
    }
}

export default createContainer(SessionEditor, {
    initialVariables: {
        sessionId: ''
    },
    prepareVariables (variables){
        console.log('variables', variables);
        return variables
    },
    fragments: {
        event: () => {

            return Relay.QL`
            fragment on Event{
                session(id: $sessionId){
                    title
                    speakers{
                        fullName
                    }
                }
            }`

        }
    }
});