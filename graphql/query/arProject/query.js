const graphql = require('graphql')
const argsBuilder = require('../../../utils/argsBuilder')
const ARProject = require('../../models/ARProject')
const db = require('../../../runtime/db')
const ObjectId = require('mongoose').Types.ObjectId

 /**
  * @api {get} /public/graphql 搜索ARProject(graphql)
  * @apiName searchARProject
  * @apiGroup Graphql
  * @apiParamExample {json} Request-Example:
      query{
        arProject {
          count,
          rows {
            _id,
            name,
            location,
            tags,
            isDeleted
          }
        }
    }
  * @apiSuccessExample Success-Response:
  * {
      "data": {
        "arProject": {
          "count": 2,
          "rows": [
            {
              "_id": "5a997a32f561657166f07e31",
              "name": "宠物AR2",
              "location": [
                130,
                40
              ],
              "tags": [
                "宠物33"
              ],
              "isDeleted": false
            },
            {
              "_id": "5a997be524ef5470ad18ba67",
              "name": "宠物AR33",
              "location": [
                130,
                40
              ],
              "tags": [
                "宠物"
              ],
              "isDeleted": false
            }
          ]
        }
      },
      "code": 200,
      "status": "OK"
    }
  */
module.exports = {
  arProject: {
    type: new graphql.GraphQLNonNull(new graphql.GraphQLObjectType({
      name: 'arProject',
      fields: {
        count: {
          type: graphql.GraphQLInt
        },
        rows: {
          type: new graphql.GraphQLList(ARProject)
        }
      }
    })),
    args: argsBuilder({
      _id: {
        type: graphql.GraphQLString
      }
    }),
    async resolve (root, args) {
      const condition = []
      const limit = args.limit || 10
      const skip = args.skip || 0
      const match = {}
      if (args._id) match['_id'] = ObjectId(args._id)
      condition.push({ '$match': match })
      if (skip) condition.push({ '$skip': skip })
      if (limit) condition.push({ '$limit': limit })
      const rows = await db.ARProject.aggregate(condition)
      const count = rows.length
      return {
        count,
        rows
      }
    }
  }
}
