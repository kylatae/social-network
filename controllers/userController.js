const {User} = require ('../models');


module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch(err) {
      res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({_id: req.params.userID}).populate('friends');
      if(!user) {
        return res.status(404).json({message: 'No user with that ID'});
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async createUser(req, res) {
    try{
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async addFriend(req, res) {
    try{
      const user = await User.findOne({_id: req.params.userID})
      // Checks if a friend already exists on the list
      for(i = 0; i < user.friends.length; i++){
        if(user.friends[i] === req.params.friendID) {
          //If a friend exists print console message and return user data
          console.log ("Already added")
          return res.json(user)
        }
      } 

      //If friend doesn't exists adds and displays
      const newFriend = [...user.friends, req.params.friendID]
      user2 = await User.findOneAndUpdate({_id: req.params.userID},{friends: newFriend},{new: true})
      res.json(user2)
    }catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteFriend(req, res) {
    try{
      const user = await User.findOne({_id: req.params.userID})
      //Array map filtering out matching friendID
      const deleteFriend = user.friends.filter(x => x != req.params.friendID)

      //Updates Array without listed friendID if it was a match above
      user2 = await User.findOneAndUpdate({_id: req.params.userID},{friends: deleteFriend},{new: true})
      res.json(user2)
    }catch (err) {
      res.status(500).json(err);
    }
  },
};