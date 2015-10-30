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
        const {uuid, title, speakerCount, id} = session;
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

    render() {
        const {event: {sessions}, params: {sessionId}, children} = this.props;

        const rows = sessions.filter(s=> sessionId ? s.id == sessionId : true)
            .map(this.renderRow.bind(this));

        return children ? children : (
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
                    {rows}
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
                    id
                    uuid,
                    title,
                    speakerCount
                }
            }`
    }
});
