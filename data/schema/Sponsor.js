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

import {nodeInterface} from './nodeDefinition';

export default new GraphQLObjectType({
    name: 'Sponsor',
    interfaces: [nodeInterface],
    fields: () => ({
        id: globalIdField('Sponsor', (sponsor) => `${sponsor.eventId}:${sponsor.id}`),
        uuid: {type: GraphQLID, resolve: sponsor => sponsor.id},
        name: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        }
    })
});
