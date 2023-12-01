const router = require('express').Router();
const{
  getThoughts,
  getSingleThought,
  createThought,
  editThought,
  deleteThought,
  createReaction,
  deleteReaction
} = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtID').get(getSingleThought).put(editThought).delete(deleteThought);

router.route('/:thoughtID/reactions').post(createReaction)

router.route('/:thoughtID/reactions/:reactionID').delete(deleteReaction);

module.exports = router;