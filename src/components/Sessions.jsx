import React from 'react';
import Relay from 'react-relay';
const { Component, PropTypes } = React;
const { createContainer } = Relay;
import {Link} from 'react-router';

class Sessions extends Component {
    constructor(props) {
        super(props);
    }

    renderRow(session) {
        const {uuid, title, speakerCount} = session;
        return (
            <tr key={uuid}>
                <td>{title}</td>
                <td>{speakerCount}</td>
                <td>
                    <Link to={`/events/${this.props.params.eventId}/sessions/${uuid}`}>edit</Link>
                </td>
            </tr>
        );
    }

    shouldComponentUpdate(nextProps){
        console.log(nextProps, this.props, nextProps === this.props);
        return true;
    }

    render() {
        const {event: {sessions}} = this.props;
        console.log('SessionList', this.props);

        return (
            <div className="Sessions">
                <h1>Sessions</h1>
                <table>
                    <thead>
                    <tr>
                        <td>Title</td>
                        <td>Speaker Count</td>
                        <td></td>
                    </tr>
                    </thead>
                    <tbody>
                    {sessions.map(this.renderRow.bind(this))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default createContainer(Sessions, {
    fragments: {
        event: () => Relay.QL`
            fragment on Event{
                sessions{
                    uuid,
                    title,
                    speakerCount
                }
            }`
    }
});
