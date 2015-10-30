import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import './App.less';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { children } = this.props;
        return (
            <div className="ui">
                <div className="container">
                    <h1><Link to='/list'>My Events</Link></h1>
                </div>
                {children}
            </div>
        );
    }
}

App.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }),
    children: PropTypes.node
};

export default App;
