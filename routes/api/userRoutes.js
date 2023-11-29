const router = require('express').Router();
const { 
  getUsers,
  getSingleUser,
  createUser,
  addFriend,
  deleteFriend
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);

router.route('/:userID').get(getSingleUser);

router.route('/:userID/friends/:friendID').post(addFriend).delete(deleteFriend);

module.exports = router;