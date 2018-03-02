const graphql = require('graphql')

module.exports = new graphql.GraphQLObjectType({
  name: 'ARProject',
  description: 'This is a ARProject',
  fields: {
    _id: {
      type: graphql.GraphQLString
    },
    name: {
      type: graphql.GraphQLString
    },
    location: {
      type: new graphql.GraphQLList(graphql.GraphQLInt)
    },
    tags: {
      type: new graphql.GraphQLList(graphql.GraphQLString)
    },
    isDeleted: {
      type: graphql.GraphQLBoolean
    }
  }
})
