const { Thought, User } = require('../models');

// const thoughtController = {
//     add thought to user
//     addThought({ params, body }, res) {
//         console.log(body);
//         Thought.create(body)
//             .then(({ _id }) => {
//                 return User.findOneAndUpdate(
//                     { _id: params.userId },
//                     { $push: { thoughts: _id } },
//                     { new: true, runValidators: true }
//                 );
//             })
//             .then(dbUserData => {
//                 // if there is no user with targeted id, let'm know
//                 if(!dbUserData) {
//                     res.status(404).json({ message: 'No user found with this id!' });
//                     return;
//                 } // else - show 'em the user
//                 res.json(dbUserData);
//             })
//             // Error? let'm know!
//             .catch(err => res.json(err));
//     },
//     addReaction({ params, body }, res) {
//         Thought.findOneAndUpdate(
//                 { _id: params.thoughtId },
//                 { $push: { reactions: body } },
//                 { new: true, runValidators: true }
//             )
//             .then(dbUserData => {
//                 if (!dbUserData) {
//                     res.status(404).json({ message: 'No user found with this id!' });
//                     return;
//                 }
//                 res.json(dbUserData);
//             })
//             .catch(err => res.json(err));
//     },
//     removeThought({ params }, res) {
//         // target a though with its id and delete
//         Thought.findOneAndDelete({ _id: params.thoughtId })
//             .then(deletedThought => {
//                 // if no thought was deleted, let'm know!
//                 if (!deletedThought) {
//                     return res.status(404).json({ message: 'No thought with this id!' });
//                 }
//                 // update the user the thought was associated with to remove the thought
//                 return User.findOneAndUpdate(
//                     { _id: params.userId },
//                     { $pull: { thoughts: params.thoughtId } },
//                     { new: true }
//                 );
//             })
//             .then(dbUserData => {
//                 if (!dbUserData) {
//                     res.status(404).json({ message: 'No user found with this id!' });
//                     return;
//                 }
//                 // the updated comment (no longer with the thought that is targeted for deletion) is turned into JSON here
//                 res.json(dbUserData);
//             })
//             .catch(err => res.json(err));
//     },
//     removeReaction({ params }, res) {
//         Thought.findOneAndUpdate(
//                 { _id: params.thoughtId },
//                 { $pull: { reactions: { reactionId: params.reactionId } } },
//                 { new: true }
//             )
//             .then(dbUserrData => res.json(dbUserData))
//             .catch(err => res.json(err));
//     }
// };

const thoughtController = {
    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .sort( { _id: -1 })
            .then(dbThoughtData => res.json(dbThoughtData))
            // if error, show it
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this Id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // create a thought
    createThought({ body }, res) {
        console.log(body);
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id } },
                    { new: true, runValidators: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
    // update a thought by id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this Id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },
    // delete a thought
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this Id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },
    // add a reaction to a thought
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
                { _id: params.thoughtId },
                { $push: { reactions: body } },
                { new: true, runValidators: true }
            )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },
    // delete a reaction from a thought
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
                { _id: params.thoughtId },
                { $pull: { reactions: { reactionId: params.reactionId } } },
                { new: true }
            )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No reaction found with this id!' });
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch(err => res.json(err));
    }
};

// exporting... ... ...
module.exports = thoughtController;