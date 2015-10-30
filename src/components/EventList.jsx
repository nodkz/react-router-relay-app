import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class EventList extends Component {

    constructor(props) {
        super(props);
    }

    static renderItem(event) {
        return (
            <div className="item" key={event.id}>
                <i className="home icon"></i>

                <div className="content">
                    <Link to={`/events/${event.id}/details`} className="item">
                        {event.title}
                    </Link>
                </div>
            </div>
        );
    }

    static renderError(error){
        return Boolean(error) ? <div className="error">{error.toString()}</div> : null
    }

    static renderLoading(loading){
        return Boolean(loading) ? <div className="loading">loading...</div> : null;
    }

    render() {
        const {loading, error, events} = this.props;
        const items = [
            {id: '658f997d63c54d31a2a9fbf1fee88371', title: 'Xamarin Evolve 2014'}
        ].map(EventList.renderItem);

        return (
            <div className="EventList ui list">
                {EventList.renderLoading(loading)}
                {EventList.renderError(error)}
                {items}
            </div>
        );
    }
}

export default EventList;