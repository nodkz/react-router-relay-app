import {
    GraphQLBoolean,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
} from 'graphql';

import {
    globalIdField,
} from 'graphql-relay';

import {loaders} from '../database';
import SessionType from './Session';
import {nodeInterface} from './nodeDefinition';

export default new GraphQLObjectType({
    name: 'Speaker',
    description: 'A speaker at an event.',
    interfaces: [nodeInterface],
    fields: () => ({
        id: globalIdField('Speaker', (speaker) => `${speaker.eventId}:${speaker.id}`),
        uuid: {type: GraphQLID, resolve: speaker => speaker.id},
        firstName: {
            type: GraphQLString,
            description: 'The Speaker\'s first name'
        },
        lastName: {
            type: GraphQLString,
            description: 'The Speaker\'s last name'
        },
        fullName: {
            type: GraphQLString,
            resolve: (speaker) => `${speaker.firstName} ${speaker.lastName}`,
            description: 'The Speaker\'s full name'
        },
        sessionCount: {
            type: GraphQLInt,
            resolve: speaker => speaker.sessions.length,
            description: 'The count of sessions that the speaker is speaking at.'
        },
        sessions: {
            type: new GraphQLList(SessionType),
            args: {
                exclude: {
                    type: new GraphQLList(GraphQLID)
                }
            },
            resolve: (speaker, {exclude, ...args}) => loaders.eventLoader.load(speaker.eventId)
                .then(event => event.sessions)
                .then(sessions => sessions.filter(session => speaker.sessions.some(id => id === session.id)))
                .then(sessions => {
                    if(exclude && exclude.length){
                        return sessions.filter(x => !exclude.some(id => id === x.id))
                    }
                    return sessions;
                }),
            description: 'The sessions that the speaker is speaking at.'
        }
    })
});
