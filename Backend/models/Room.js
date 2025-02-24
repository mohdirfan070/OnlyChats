const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    members: {
        type: Array,
        default: []
    },
    roomAdmin: {
        type: Array,
        default: [],
        required: true,
    },
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
    },
    roomProfile: {
        type: String,
        default: ""
    },
},{
    timestamps: true
});

module.exports = mongoose.model('Room', roomSchema);
