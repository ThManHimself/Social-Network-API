const { Thought, User } = require('../models');

const thoughtController = {
    // add thought to user
    addThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thought: _id } },
                    { new: true, runValidators: true }
                );
            })
            .then(dbUserData => {
                // if there is no user with targeted id, let'm know
                if(!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                } // else - show 'em the user
                res.json(dbUserData);
            })
            // Error? let'm know!
            .catch(err => res.json(err));
    },
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
                { _id: params.thoughtId },
                { $push: { reactions: body } },
                { new: true, runValidators: true }
            )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
    removeThought({ params }, res) {
        // target a though with its id and delete
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(deletedThought => {
                // if no thought was deleted, let'm know!
                if (!deletedThought) {
                    return res.status(404).json({ message: 'No thought with this id!' });
                }
                // update the user the thought was associated with to remove the thought
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $pull: { thoughts: params.thoughtId } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                // the updated comment (no longer with the thought that is targeted for deletion) is turned into JSON here
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
                { _id: params.thoughtId },
                { $pull: { reactions: { reactionId: params.reactionId } } },
                { new: true }
            )
            .then(dbUserrData => res.json(dbUserData))
            .catch(err => res.json(err));
    }
};

module.exports = thoughtController;