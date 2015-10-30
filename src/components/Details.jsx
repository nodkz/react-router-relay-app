import React from 'react';
import Relay from 'react-relay';
const { Component, PropTypes } = React;
const { createContainer } = Relay;

import Form from './Form.jsx';
import ChangeEventDetails from './mutations/ChangeEventDetails'

class EventDetails extends Component {
    constructor(props) {
        super(props);
    }

    onSaveDetails(details){
        Relay.Store.update(new ChangeEventDetails({
            event: this.props.event,
            id: this.props.event.id,
            ...details
        }), {
            onSuccess: (response) => console.log(JSON.stringify(response, null, 2)),
            onFailure: (transaction) => {
                console.warn(transaction.getError().source.errors.map(e=>e.message).join('\n'))
            }
        });
    }

    render() {

        return (
            <div className="EventDetails">
                <h1>Event Details</h1>
                <Form {...this.props.event} onSave={this.onSaveDetails.bind(this)} />
            </div>
        );
    }
}

export default createContainer(EventDetails, {
    fragments: {
        event: () => Relay.QL`
            fragment on Event{
                id
                title
                description,
                startDateUtc
                endDateUtc
                ${ChangeEventDetails.getFragment('event')}
            }
        `
    }
});
