const router = require('express'). Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/user-controllers');

// Set up GET all and POST -- /api/users --
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

// Set up GET 1, PUT, and DELETE -- /api/users/:id --
router
    .route(':id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// exporting... ... ...
module.exports = router;