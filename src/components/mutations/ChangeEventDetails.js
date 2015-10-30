import Relay from 'react-relay';

export default class ChangeEventDetails extends Relay.Mutation{
    static fragments = {
        event: () => Relay.QL`
          fragment on Event {
            id,
            title,
            description,
            startDateUtc,
            endDateUtc
          }`
    };

    getMutation() {
        return Relay.QL`mutation{ChangeEventDetails}`;
    }

    getFatQuery() {
        return Relay.QL`
          fragment on changeEventDetailsPayload {
            event {
              id,
              title,
              description,
              startDateUtc,
              endDateUtc
            }
          }
        `;
    }

    getConfigs() {
        return [{
            type: 'FIELDS_CHANGE',
            fieldIDs: {
                event: this.props.id
            }
        }];
    }

    getVariables() {
        return {
            id: this.props.id,
            title: this.props.title,
            description: this.props.description,
            startDateUtc: this.props.startDateUtc,
            endDateUtc: this.props.endDateUtc
        };
    }

    getOptimisticResponse() {
        return {
            event: {
                id: this.props.id,
                title: this.props.title,
                description: this.props.description,
                startDateUtc: this.props.startDateUtc,
                endDateUtc: this.props.endDateUtc
            }
        };
    }
}