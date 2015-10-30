import {GraphQLNonNull, GraphQLID, GraphQLString} from 'graphql';
import {mutationWithClientMutationId, fromGlobalId} from 'graphql-relay';

import EventType from '../Event';
import GraphQLMoment from '../GraphQLMoment';
import {changeEventDetails, loaders} from '../../database';

export default mutationWithClientMutationId({
    name: 'changeEventDetails',
    description: `Updates an event's details`,
    inputFields: {
        id: {type: new GraphQLNonNull(GraphQLID)},
        title: {type: new GraphQLNonNull(GraphQLString)},
        description: {type: new GraphQLNonNull(GraphQLString)},
        startDateUtc: {type: GraphQLMoment},
        endDateUtc: {type: GraphQLMoment}
    },
    outputFields: {
        event: {
            type: EventType,
            resolve: (mutationResult) => loaders.eventLoader
                .load(mutationResult.eventId)
                .then(event => {
                    loaders.eventLoader.clear(mutationResult.eventId);
                    return Object.assign(event, {details: {...mutationResult}})
                })
        }
    },
    mutateAndGetPayload: ({id, title, description, startDateUtc, endDateUtc}) => {
        const eventId = fromGlobalId(id).id;
        return changeEventDetails(eventId, title, description, startDateUtc, endDateUtc);
    }

});