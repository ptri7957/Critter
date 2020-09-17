const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// User id
// Bio
// Social
const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    bio: {
        type: String
    },
    social: {
        youtube: {
            type: String,
        },
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        instagram: {
            type: String
        }
    },
    follows: [
            {
                user: {
                    type: Schema.Types.ObjectId,
                    ref: 'User'
                }
            }
        ]
    
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;