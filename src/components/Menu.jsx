import React from 'react';
import Relay from 'react-relay';
const { Component, PropTypes } = React;
const { createContainer } = Relay;

import { Link } from 'react-router';

class Menu extends Component {
    constructor(props) {
        super(props);
    }

    static renderItem(item) {
        return (
            <Link to={item.link} className="item" key={item.icon}>
                <i className={`${item.icon} icon`}></i>
                {item.name}
            </Link>
        );
    }

    render() {
        const {eventId} = this.props;
        const url = `/events/${eventId}`;

        const navItems = [
            {name: 'Event', link: `${url}/details`, icon: 'home'},
            //{name: 'Box Office', link: `${url}/boxoffice`, icon: 'tags'},
            //{name: 'Tickets', link: `${url}/tickets`, icon: 'users'},
            //{name: 'Speakers', link: `${url}/speakers`, icon: 'announcement'},
            //{name: 'Sponsors', link: `${url}/sponsors`, icon: 'money'},
            {name: 'Sessions', link: `${url}/sessions`, icon: 'comments outline'},
            //{name: 'Schedule', link: `${url}/schedule`, icon: 'calendar'},
            //{name: 'Messaging', link: `${url}/messaging`, icon: 'mail outline'},
            //{name: 'Feedback', link: `${url}/feedback`, icon: 'copy'},
            //{name: 'Web Site', link: `${url}/website`, icon: 'linkify'},
            //{name: 'Settings', link: `${url}/settings`, icon: 'settings'},
            //{name: 'Printers', link: `${url}/printers`, icon: 'print'}
        ];

        const items = navItems.map(Menu.renderItem);

        return (
            <div className="ui attached stackable labeled icon menu">
                <div className="ui container">
                    {items}
                </div>
            </div>
        );
    }
}

Menu.propTypes = {
    eventId: PropTypes.string.isRequired
};

export default Menu