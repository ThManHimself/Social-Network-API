const router = require('express').Router();
const {
    addThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controllers');

// 'add thought' routes -- /api/thoughts/:userId
router
    .route('/:userId')
    .post(addThought);

// 'add reaction' routes -- /api/thoughts/:userId/:thoughtId(this doesnt just add a reply, this deletes the thought with the reaction and re-posts it with the new reaction attatched)
router
    .route('/:userId/:thoughtId')
    .put(addReaction)
    .delete(removeThought);

// 'delete thought' routes -- /api/thoughts/:userId/:thoughtId
router
    .route('/:userId/:thoughtId')
    .delete(removeThought);

// 'delete reaction' routes -- /api/thoughts/:userId/:thoughtId/:reactionId
router
    .route('/:userId/:thoughtId/:reactionId')
    .delete(removeReaction);

// exporting... ... ...
module.exports = router;