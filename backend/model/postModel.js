const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    author : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "user",
        required: true
    },
    title  : {
        type:String,
        required:true
    },
    content : {
        type:String,
        required:true
    },
    img: {
        type:String,
        required:true
    },
    genre: [{
        vibes:{
            type: String,
            required: true
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('Post',postSchema)
