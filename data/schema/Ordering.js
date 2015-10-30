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

import {enumValuesFromObject} from './utils'

const orderDirectionValues = {
    Ascending: 'asc',
    Descending: 'desc'
};

const orderDirection = new GraphQLEnumType({
    name: 'OrderDirection',
    values: enumValuesFromObject(orderDirectionValues)
});

export {orderDirection, orderDirectionValues};

const sessionOrderFieldValues = {
    StartDate: 'startDate',
    EndDate: 'endDate',
    Title: 'title'
};

const sessionOrderField = new GraphQLEnumType({
    name: 'SessionOrderField',
    description: 'Default value is title',
    values: enumValuesFromObject(sessionOrderFieldValues)
});

export {sessionOrderField, sessionOrderFieldValues};
