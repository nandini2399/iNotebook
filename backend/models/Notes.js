const mongoose = require('mongoose');

const NoteSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
        unique:true
    },
    tag:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    },

})

module.exports = mongoose.model('notes',NoteSchema);