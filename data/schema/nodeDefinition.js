import {
    nodeDefinitions,
    fromGlobalId
} from 'graphql-relay';

import {loaders, models} from '../database';
import moment from 'moment';

const {nodeInterface, nodeField} = nodeDefinitions(
    (globalId, info) => {

        var {type, id} = fromGlobalId(globalId);

        console.log('type', type);
        console.log('id', id);

        if (type === 'Event') {
            return loaders.eventLoader.load(id);
        } else if (type === 'Session') {
            return loaders.eventLoader.load(id.split(':')[0])
                .then(e=>e.sessions.find(s=>s.id===id.split(':')[1]));
        } else if (type === 'Speaker') {
            return loaders.eventLoader.load(id.split(':')[0])
                .then(e=>e.speakers.find(s=>s.id===id.split(':')[1]));
        } else if (type === 'Sponsor') {
            return loaders.eventLoader.load(id.split(':')[0])
                .then(e=>e.sponsors.find(s=>s.id===id.split(':')[1]));
        } else {
            return null;
        }
    },
    (obj) => {

        if (obj instanceof models.Event) {
            return require('./Event');
        } else if (obj instanceof models.Session)  {
            return require('./Session');
        } else if (obj instanceof models.Speaker)  {
            return require('./Speaker');
        } else if (obj instanceof models.Sponsor)  {
            return require('./Sponsor');
        } else {
            return null;
        }
    }
);

export {nodeInterface, nodeField};