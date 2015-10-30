import {GraphQLNonNull, GraphQLID, GraphQLString} from 'graphql';
import {mutationWithClientMutationId, fromGlobalId} from 'graphql-relay';

import EventType from '../Event';
import GraphQLMoment from '../GraphQLMoment';
import {createEvent} from '../../database';

export default mutationWithClientMutationId({
    name: 'createEvent',
    description: 'Creates a new event',
    inputFields: {
        ownerId: {type: new GraphQLNonNull(GraphQLID)},
        title: {type: new GraphQLNonNull(GraphQLString)},
        description: {type: new GraphQLNonNull(GraphQLString)},
        startDateUtc: {type: GraphQLMoment},
        endDateUtc: {type: GraphQLMoment}
    },
    outputFields: {
        event: {
            type: EventType,
            resolve: (result) => loaders.eventLoader.load(result.eventId)
                .then(event => {
                    return Object.assign(event, {details: {...result}})
                })
        }
    },
    mutateAndGetPayload: ({ownerId, title, description, startDateUtc, endDateUtc}) => {
        return createEvent(ownerId, title, description, startDateUtc, endDateUtc);
    }
});