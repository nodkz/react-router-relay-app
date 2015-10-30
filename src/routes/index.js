//export default {
//    component: require('./App.jsx'),
//    childRoutes: [
//        require('./eventList'),
//        require('./event')
//    ]
//};

import React from 'react';
import Relay from 'react-relay';
import ReactRouterRelay from 'react-router-relay';
import {Route, IndexRoute} from 'react-router';

const eventQueries = {
    event: (Component) => Relay.QL`query { event(id: $eventId)  }`
};

var App = require('./App.jsx');

var EventList = require('./../components/EventList.jsx');

var EventLayout = require('./../components/EventLayout.jsx');

var EventDetails = require('./../components/Details.jsx');
var Sessions = require('./../components/Sessions.jsx');
var SessionEditor = require('./../components/SessionEditor.jsx');

export default (
    <Route path='/' component={App}>

        <IndexRoute component={EventList}/>

        <Route path="/events/:eventId" component={EventLayout} queries={eventQueries}>

            <IndexRoute component={EventDetails} queries={eventQueries}/>

            <Route path="details" component={EventDetails} queries={eventQueries}/>
            <Route path="sessions" component={Sessions} queries={eventQueries} >
                <Route path=":sessionId" component={SessionEditor} queries={eventQueries}/>
            </Route>

        </Route>

        <Route path="*" component={require('../components/NotFound.jsx')}/>

    </Route>
);

