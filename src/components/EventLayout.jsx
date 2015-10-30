import React from 'react';
import Relay from 'react-relay';
const { Component, PropTypes } = React;
const { createContainer } = Relay;

import CSSTransitionGroup from 'react-addons-css-transition-group'
import Menu from './Menu.jsx';
import './EventLayout.less';

class EventLayout extends Component {
    constructor(props) {
        super(props);
    }
    render() {

        const { children, eventId, location: {pathname}, event: {title} } = this.props;

        return (
            <div className="EventLayout">
                <h1>{title}</h1>
                <Menu eventId={eventId}/>
                <div className="ui bottom attached segment">
                    <CSSTransitionGroup transitionEnterTimeout={500} transitionAppearTimeout={500} transitionName="event-section" transitionAppear={true} transitionLeave={false}>
                        {React.cloneElement(children, {key: pathname})}
                    </CSSTransitionGroup>
                </div>
            </div>
        );
    }
}

export default EventLayout;

export default createContainer(EventLayout, {
    fragments: {
        event: () => Relay.QL`
            fragment on Event{
                title
            }
        `
    }
});