const router = require('express').Router();
const {
    getAllThoughts,
    createThought,
    getThoughtById,
    updateThought,
    deleteThought,
    // reaction controllers
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controllers');

// Set up GET all and POST -- /api/thoughts --
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

// Set up GET 1, PUT, and DELETE -- /api/thoughts/:id
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought)

// Set up POST for reactions --/api/thoughts/:thoughtId/reactions
router
    .route('/:thoughtId/reactions')
    .post(addReaction);

// Set up DELETE for reactions -- /api/thoughts/:thoughtId/reactions/:reactionId
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

// exporting... ... ...
module.exports = router;