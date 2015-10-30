import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';

import {Router, Route} from 'react-router';
import ReactRouterRelay from 'react-router-relay';

import createHistory from 'history/lib/createBrowserHistory';
import routes from './routes';

var mountPoint = document.getElementById('app');

ReactDOM.render(
    <Router
        createElement={ReactRouterRelay.createElement}
        history={createHistory()}
        routes={routes}
     />,
    mountPoint
);