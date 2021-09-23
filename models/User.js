const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: 'You need to choose a username!',
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: 'Please enter a valid email address!',
            match: /.+@.+\..+/
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],

    },
    {
        toJSON:{
            virtuals: true
        },
    }
);

// GET total cound of friends of retrieval
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// create the User model using the UserSchema
const User = model('User', UserSchema);

// exporting... ... ...
module.exports = User;