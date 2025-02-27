const mongoose = require('mongoose');

const msgSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    sendTo: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    status:{
        type:String,
        required : true,
        default :"pending",
        enum:[ "pending" , "sent" , "received"  , "read" ]
    },
    seenBy:{
        type:Array,
        default: []
    },
    reply:{
        type :Object,
        default :{ sender : "" , receiver : "" , text :"" }
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Msg', msgSchema);