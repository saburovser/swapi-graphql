const { GraphQLScalarType } = require('graphql');

const stringArrayScalarType = new GraphQLScalarType({
  name: 'StringArray',
  serialize(value) {
    return value.split(',').map(val => val.trim());
  },
  parseValue(value) {
    const result = value.join(', ');
    return result.slice(0, result.length - 2);
  },
  parseLiteral(value) {
    const result = value.join(', ');
    return result.slice(0, result.length - 2);
  }
});

const dateScalarType = new GraphQLScalarType({
  name: 'Date',
  serialize(value) {
    return new Date(value);
  },
  parseValue(value) {
    return value.toISOString();
  },
  parseLiteral(value) {
    return value.toISOString();
  }
});

module.exports = {
  stringArrayScalarType,
  dateScalarType,
};
