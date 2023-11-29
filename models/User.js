const {Schema, model} = require('mongoose');
const thoughtSchema = require('./Thought')

// Users are able to have friends that are other users, and can post thoughts/reactions.
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please use a valid email']
    },
    thoughts: [thoughtSchema],
    friends: [this]      
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false
  }
)

// A counter for how many friends a user has
userSchema.virtual('friendCount').get(function(){
  return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;