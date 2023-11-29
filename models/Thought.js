const {Schema, model, Types} = require ('mongoose');
const reactionsSchema = require('./Reaction')

// Thoughts are posted by users and other users may create reactions
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
    reactions: [reactionsSchema]
  },
  {
    toJSON: {
      virtuals: true
    },
    id: false
  }
)

// A count of all the reactions posted on a thought
thoughtsSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
})

// const Thoughts = model('thoughts', thoughtsSchema);

module.exports = thoughtsSchema;