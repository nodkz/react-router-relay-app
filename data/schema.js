import { GraphQLSchema } from 'graphql';
import Root from './schema/Root';
import Mutation from './schema/mutations';

export default new GraphQLSchema({
    query: Root,
    mutation: Mutation
});