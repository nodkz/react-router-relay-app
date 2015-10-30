import ChangeEventDetails from './ChangeEventDetails'
import CreateEvent from './CreateEvent'
import { GraphQLObjectType } from 'graphql';

export default new GraphQLObjectType({
    name: 'Mutations',
    fields: {
        CreateEvent,
        ChangeEventDetails
    }
});