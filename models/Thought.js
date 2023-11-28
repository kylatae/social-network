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
    },
    username: {
      type: String,
      required: true
    },
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Reaction'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
)