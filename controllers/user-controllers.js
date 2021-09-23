const { User } = require('../models');

const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
            .populate(['thoughts', 'friends'])
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            // if error, show it
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // get one user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate(['thoughts', 'friends'])
            .select('-__v')
            .then(dbUserData => {
                // if no users are found, send 404
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this Id!' });
                    return;
                }
                // if a user was found, show it
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // create a user
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },
    // update a user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .populate(['thoughts', 'friends'])
            .select('-__v')
            .then(dbUserData => {
                // if no user was found with that id
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                } // else - show it
                res.json(dbUserData);
            })
            // if error, show it
            .catch(err => res.status(400).json(err));
    },
    // delete a user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                // if no user found with that id
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                } // else - show it
                res.json(dbUserData);
            })
            // if error, show it
            .catch(err => res.status(400).json(err));
    },
    // add a friend to a user's friend list
    addFriend({ params, body }, res) {
        User.findOneAndUpdate(
                { _id: params.id },
                { $push: { friends: body } },
                { new: true, runValidators: true }
            )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserDate);
            })
            .catch(err => res.json(err));
    },
    // delete a friend from a user's friends list
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
                { _id: params.id },
                { $pull: { friends: params._id  } },
                { new: true }
            )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No friend found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
    // show all friends
    getAllFriends({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err);
                res.json(err);
            })
    }
};

// exporting... ... ...
module.exports = userController;