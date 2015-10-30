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
import SponsorType from './Sponsor';

export default new GraphQLObjectType({
    name: 'Ticket',
    fields: () => ({
        id: globalIdField('Ticket', (ticket) => `${ticket.eventId}:${ticket.id}`),
        __id: {type: GraphQLID, resolve: ticket => ticket.id},
        firstName: {
            type: GraphQLString
        },
        lastName: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString,
            resolve: obj=>obj.emailAddress
        },
        favorites: {
            type: new GraphQLList(SessionType),
            resolve: (ticket) => loaders.ticketRsvpLoader.load(`${ticket.eventId}:${ticket.id}`)
        },
        sponsorsVisited: {
            type: new GraphQLList(SponsorType),
            resolve: (ticket) => loaders.sponsorsLoader.load(ticket.eventId)
                .then(sponsors=>sponsors.filter(sponsor => ticket.sponsorsVisited.some(id => id === sponsor.id)))
        }
    })
});
