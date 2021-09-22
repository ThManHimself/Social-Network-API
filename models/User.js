const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

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
        },
        thoughts: [],
        friends: []
    },
    {
        toJSON:{
            virtuals: true,
            getters: true
        },
        id: false
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