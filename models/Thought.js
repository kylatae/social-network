const {Schema, model} = require ('mongoose');

const thoughtsSchema = new Schema(
  {
    thoughText: {
      type: String,
      required: true,
      max_length: 280
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    toJSON: {
      getters: true,
    },
    id: false
  }
)