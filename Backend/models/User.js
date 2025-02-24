const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        set: function(username){
            return  username.toLowerCase().trim();
        }
        },
        email: {
            type: String,
             set: function(email){
                return  email.toLowerCase().trim();
            },
            required: true,
            unique:true
        },
          password: {
            type: String,
            required: true,
            minlength: 6,
            set: function(password){
               return  password.trim();
            },
            },
            profilePicture: {
                type: String,
                default: "https://static.vecteezy.com/system/resources/previews/010/260/479/non_2x/default-avatar-profile-icon-of-social-media-user-in-clipart-style-vector.jpg"
            },
            friends: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            socketId: {
                type: String,
                default: ""
            },
            lastOnline: {
                type: Date,
            },
            isAdmin: {
                type: Boolean,
                default: false
            },
            isOnline:{
                type:Boolean,
                default:false,
                enum:[true , false],
            }
        }
        , {
    timestamps: true
});
module.exports = mongoose.model('User', UserSchema);