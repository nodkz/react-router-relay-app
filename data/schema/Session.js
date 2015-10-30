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

import GraphQLMoment, {moment} from './GraphQLMoment';

import {loaders} from '../database';

import SpeakerType from './Speaker';
import {nodeInterface} from './nodeDefinition';

export default new GraphQLObjectType({
    name: 'Session',
    interfaces: [nodeInterface],
    fields: () => ({
        id: globalIdField('Session', (session) => `${session.eventId}:${session.id}`),
        uuid: {type: GraphQLID, resolve: session => session.id},
        title: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        //timeZone: {
        //    type: GraphQLString
        //},
        //startDateUtc: {
        //    type: GraphQLMoment,
        //    resolve: obj => moment.utc(obj.startDateUtc || 0)
        //},
        //endDateUtc: {
        //    type: GraphQLMoment,
        //    resolve: obj => moment.utc(obj.endDateUtc || 0)
        //},
        //startDate: {
        //    type: GraphQLMoment,
        //    resolve: obj => obj.startDate ? moment(obj.startDate) : moment.utc(0)
        //},
        //endDate: {
        //    type: GraphQLMoment,
        //    resolve: obj => obj.endDate ? moment(obj.endDate || 0) : moment.utc(0)
        //},
        speakerCount: {
            type: GraphQLInt,
            resolve: session => session.speakers.length
        },
        speakers: {
            type: new GraphQLList(SpeakerType),
            args: {
                exclude: {
                    type: new GraphQLList(GraphQLID)
                }
            },
            resolve: (session, {exclude}) => loaders.eventLoader.load(session.eventId)
                .then(event => event.speakers)
                .then(speakers => speakers.filter(speaker => session.speakers.some(id => id === speaker.id)))
                .then(speakers => {
                    if (exclude && exclude.length) {
                        return speakers.filter(x=>!exclude.some(id=>id === x.id))
                    }
                    return speakers;
                })
        }
    })
});
