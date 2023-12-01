const {Schema, model} = require ('mongoose');
const reactionSchema = require('./Reaction')

// Thoughts are posted by users and other users may create reactions
const thoughtsSchema = new Schema(
  {
    thoughtText: {
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
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    }
  }
)

// A count of all the reactions posted on a thought
thoughtsSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
})

const Thought = model('thoughts', thoughtsSchema);

module.exports = Thought;