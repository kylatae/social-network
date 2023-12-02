const {Thought, User} = require ('../models');

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch(err) {
      console.log(err)
      res.status(500).json(err);
    }
  },
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({_id: req.params.thoughtID});
      if(!thought) {
        return res.status(404).json({message: 'No thought with that ID'});
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async createThought(req, res) {
    try{
      const user = await User.findOne({username: req.body.username})
      if (!user) return res.status(404).json({message: "User Not Found"})

      const thought = await Thought.create(req.body);
      const userThoughts = [...user.thoughts, thought._id]
      const editUser = await User.findOneAndUpdate({username: req.body.username}, {thoughts: userThoughts},{new: true})
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async editThought(req, res){
    try{
      const thought = await Thought.findOneAndUpdate({_id: req.params.thoughtID},{thoughtText: req.body.thoughtText},{new: true})
      res.json(thought)
    }catch(err){
      res.status(500).json(err);
    }
  },
  async deleteThought(req, res){
    try{
      console.log("here")
      const thought = await Thought.findByIdAndDelete({_id: req.params.thoughtID})
      console.log (thought)
      res.json(thought)
    } catch(err){
      res.status(500).json(err);
    }
  },
  async createReaction(req, res){
    try{
      const thought = await Thought.findOneAndUpdate({_id: req.params.thoughtID},{$addToSet: {reactions: req.body}},{runValidators: true, new: true})
      console.log(thought)
      if (!thought){
        return res.status(404).json({message: "No thought found with that ID"})
      }
      res.json(thought)
    } catch(err){
      res.status(500).json(err);
    }
  },
  async deleteReaction(req, res){
    try{
      console.log (req.params.reactionID)

      const thought = await Thought.findOneAndUpdate({_id: req.params.thoughtID},{$pull: {reactions:{_id: req.params.reactionID}}},{runValidators: true, new: true})
      
      if (!thought){
        return res.status(404).json({message: "No thought found with that ID"})
      }
      res.json(thought)
    } catch(err){
      res.status(500).json(err);
    }
  }

};