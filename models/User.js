const mongoose = require('mongoose')
const timestamps = require('mongoose-timestamp')

const baseSchema = {
  userName: String,
  password: String,
  role: String
}

const schema = new mongoose.Schema(baseSchema, {
  collection: 'User',
  strict: false,
  read: 'secondaryPreferred'
})

schema.plugin(timestamps, {
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
})

module.exports = schema
