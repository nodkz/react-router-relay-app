import { GraphQLScalarType } from 'graphql';
import { GraphQLError } from 'graphql/error';
import { Kind } from 'graphql/language';
import moment from 'moment';

function coerceDate(source, value) {

    if(typeof value === 'string')
        value = moment(value);

    if (!(value instanceof Object)) {
        // Is this how you raise a "field error"?
        throw new Error("Field error: value is not an instance of moment")
    }
    if (isNaN(value.seconds())) {
        throw new Error("Field error: value is an invalid moment")
    }
    return value.format()
}

export {moment};

export default new GraphQLScalarType({
    name: 'moment',
    serialize: v => coerceDate('serialize', v),
    parseValue: v => coerceDate('parseValue', v),
    parseLiteral(ast) {
        if (ast.kind !== Kind.STRING ) {
            throw new GraphQLError("Query error: Can only parse strings to dates but got a: " + ast.kind, [ast])
        }
        let result = moment(ast.value);
        if (isNaN(result.seconds())) {
            throw new GraphQLError("Query error: Invalid date", [ast])
        }
        if (ast.value != result.format()) {
            throw new GraphQLError("Query error: Invalid date format, only accepts: YYYY-MM-DDTHH:MM:SS.SSSZ", [ast])
        }
        return result
    }
});