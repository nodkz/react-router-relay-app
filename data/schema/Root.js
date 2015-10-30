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

import {loaders} from '../database';

import {nodeField} from './nodeDefinition';

import Event from './Event';

export default new GraphQLObjectType({
    name: 'EventDaySchema',
    fields: {
        node: nodeField,
        event: {
            type: Event,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve: (obj, {id}) => loaders.eventLoader.load(id)
        }
    }
});