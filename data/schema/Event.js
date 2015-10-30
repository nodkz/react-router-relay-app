import {
    GraphQLBoolean,
    GraphQLEnumType,
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
    connectionArgs,
    connectionDefinitions,
    connectionFromPromisedArray
} from 'graphql-relay';

import GraphQLMoment, {moment} from './GraphQLMoment';
import * as Ordering from './Ordering';

import {loaders} from '../database';
import _ from 'lodash';

import {nodeInterface} from './nodeDefinition';

import SessionType from './Session';
import SpeakerType from './Speaker';
import TicketType from './Ticket';
import SponsorType from './Sponsor';

import {enumValuesFromObject} from './utils'

const speakerStatusValues = {
    One: 'one',
    AtLeastOne: 'atLeastOne',
    Many: 'many',
    None: 'none',
    Any: 'any'
};
const speakerStatus = new GraphQLEnumType({
    name: 'SpeakerStatus',
    values: enumValuesFromObject(speakerStatusValues)
});

const scheduleStatusValues = {
    Scheduled: 'scheduled',
    Unscheduled: 'unscheduled',
    Any: 'any'
};
const scheduleStatus = new GraphQLEnumType({
    name: 'ScheduleStatus',
    values: enumValuesFromObject(scheduleStatusValues)
});

const {connectionType: sessionConnection} = connectionDefinitions({
    name: 'Session', nodeType: SessionType
});

export default new GraphQLObjectType({
    name: 'Event',
    interfaces: [nodeInterface],
    fields: () => (
    {
        id: globalIdField('Event', event => event.id),
        uuid: {type: GraphQLID, resolve: event => event.id},
        title: {
            type: GraphQLString,
            resolve: event => event.details.title
        },
        description: {
            type: GraphQLString,
            resolve: event => event.details.description
        },
        startDateUtc: {
            type: GraphQLMoment,
            resolve: event => moment.utc(event.details.startDateUtc || 0)
        },
        endDateUtc: {
            type: GraphQLMoment,
            resolve: event => moment.utc(event.details.endDateUtc || 0)
        },

        sessionCount: {
            type: GraphQLInt,
            resolve: event => event.sessions.length
        },

        session: {
            type: SessionType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve: (event, {id}) => event.sessions.find(x=>x.id === id)
        },

        sessions: {
            type: new GraphQLList(SessionType),
            args: {
                orderBy: {
                    type: Ordering.sessionOrderField,
                    defaultValue: Ordering.sessionOrderField.Title
                },
                orderDirection: {
                    type: Ordering.orderDirection,
                    defaultValue: Ordering.orderDirection.Ascending
                },
                speakers: {
                    type: speakerStatus,
                    defaultValue: speakerStatusValues.Any
                },
                //status: {
                //    type: scheduleStatus,
                //    defaultValue: scheduleStatusValues.Any
                //}
            },
            resolve: (event, {orderBy, orderDirection, speakers, status, ...args}) => loaders.eventLoader.load(event.id)
                .then(event => event.sessions)
                .then(sessions => {
                    if (speakers === speakerStatusValues.None) {
                        return sessions.filter(x=>x.speakers.length === 0);
                    }
                    else if (speakers === speakerStatusValues.AtLeastOne) {
                        return sessions.filter(x=>x.speakers.length > 0);
                    }
                    else if (speakers === speakerStatusValues.One) {
                        return sessions.filter(x=>x.speakers.length === 1);
                    }
                    else if (speakers === speakerStatusValues.Many) {
                        return sessions.filter(x=>x.speakers.length > 1);
                    }
                    else {
                        return sessions;
                    }
                })
                //.then(sessions => {
                //    if (status == scheduleStatusValues.Scheduled) {
                //        return sessions.filter(x=> x.startDate);
                //    }
                //    else if (status == scheduleStatusValues.Unscheduled) {
                //        return sessions.filter(x=> !x.startDate);
                //    }
                //
                //    else
                //        return sessions;
                //})
                .then(sessions=> {
                    return _.sortByOrder(sessions, orderBy, orderDirection);
                })
        },

        speakerCount: {
            type: GraphQLInt,
            resolve: event => event.speakers.length
        },
        speakers: {
            type: new GraphQLList(SpeakerType),
            args: {
                orderBy: {
                    type: GraphQLString
                },
                hasSessions: {
                    type: GraphQLBoolean,
                    defaultValue: false
                },
                hasMultipleSessions: {
                    type: GraphQLBoolean,
                    defaultValue: false
                }
            },
            resolve: (event, {orderBy, hasSessions, hasMultipleSessions}) => {

                return loaders.eventLoader.load(event.id)
                    .then(event => event.speakers)
                    .then(speakers => hasSessions ? speakers.filter(x => x.sessions.length > 0) : speakers)
                    .then(speakers => hasMultipleSessions ? speakers.filter(x => x.sessions.length > 1) : speakers)
                    .then(speakers => {
                        if (orderBy)
                            return _.sortBy(speakers, orderBy);
                        return speakers;
                    });

            }
        },

        sponsorCount: {
            type: GraphQLInt,
            resolve: event => event.sponsors.length
        },
        sponsors: {
            type: new GraphQLList(SponsorType),
            resolve: event => loaders.eventLoader.load(event.id)
            .then(event => event.sponsors)
        },

        //ticket: {
        //    type: TicketType,
        //    args: {
        //        id: {
        //            type: GraphQLID
        //        }
        //    },
        //    resolve: (obj, {id}) => loaders.ticketLoader.load(`${obj.id}:${id}`)
        //}
    }
    )
})