import React from 'react';
import Relay from 'react-relay';
const { Component, PropTypes } = React;
const { createContainer } = Relay;

class Edit extends Component {
    constructor(props) {
        super(props);
        console.log('Editor', props)
    }

    render() {
        console.log('EDITOR props', this.props.event);
        return (
            <div className="Edit">
                <h1>{this.props.event.session.title}</h1>
            </div>
        );
    }
}

export default createContainer(Edit, {
    fragments: {
        event: () => {
            debugger;
            console.log('editor container', arguments);
            return Relay.QL`
            fragment on Event{
                session(id: $sessionId){
                    title
                }
            }`

        }    }
});