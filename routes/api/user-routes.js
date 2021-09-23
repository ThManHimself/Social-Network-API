const router = require('express'). Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    // friend controllers
    addFriend,
    deleteFriend,
    getAllFriends
} = require('../../controllers/user-controllers');

// Set up GET all and POST -- /api/users --
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

// Set up GET 1, PUT, and DELETE -- /api/users/:id --
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// Set up PUT and DELETE for friends -- /api/users/:userId/friends
// userId = user you're adding a friend too
// friendId = user you're adding to friends list
router
    .route('/:id/friends')
    .get(getAllFriends)
    .put(addFriend);

router
    .route('/:id/friends/:_id')
    .delete(deleteFriend);

// exporting... ... ...
module.exports = router;