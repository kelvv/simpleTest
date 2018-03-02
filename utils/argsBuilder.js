const graphql = require('graphql')

module.exports = (args) => {
  let defaultArgs = {
    _id: {
      type: graphql.GraphQLString
    },
    limit: {
      type: graphql.GraphQLInt
    },
    offset: {
      type: graphql.GraphQLInt
    },
    sort: {
      type: graphql.GraphQLString
    }
  }

  return Object.assign(defaultArgs, args)
}
