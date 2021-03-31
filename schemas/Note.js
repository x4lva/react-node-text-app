const mongoose = require("mongoose")
const Schema = mongoose.Schema

const NoteSchema = new Schema({
    data: {
        type: [{text: Array, date: Date}],
        required: true
    },
    deleted: {
        type: Boolean,
        required: true,
        default: true
    },
    published: {
        type: Boolean,
        required: true,
        default: false
    },
    public: {
        type: Boolean,
        required: true,
        default: false
    },
    author: {
        type: mongoose.Types.ObjectId,
        required: true
    },

}, {timestamps: true})



module.exports = Note = mongoose.model('note', NoteSchema)