const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NoteSchema = new Schema(
    {
        name: {
            type: String,
            default: "",
        },
        data: {
            type: Array,
            required: true,
        },
        deleted: {
            type: Boolean,
            default: true,
            required: true,
        },
        published: {
            type: Boolean,
            default: false,
            required: true,
        },
        public: {
            type: Boolean,
            default: false,
            required: true,
        },
        author: {
            type: mongoose.Types.ObjectId,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = Note = mongoose.model("note", NoteSchema);
