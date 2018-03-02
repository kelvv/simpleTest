const mongoose = require('mongoose')
const timestamps = require('mongoose-timestamp')

const baseSchema = {
  name: String,
  location: {
    type: [ Number ],
    index: {
      type: '2dsphere',
      sparse: true
    }
  },
  tags: [String],
  isDeleted: { type: Boolean, default: false },
  configFileUrl: String
}

const schema = new mongoose.Schema(baseSchema, {
  collection: 'ARProject',
  strict: false,
  read: 'secondaryPreferred'
})

schema.plugin(timestamps, {
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
})

module.exports = schema
