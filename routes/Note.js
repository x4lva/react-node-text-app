const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const note = express.Router();

const Note = require("../schemas/Note");

note.use(cors());

note.post("/create", async (req, res) => {
    const noteData = new Note({
        name: String(""),
        data: [
            {
                text: [
                    {
                        type: "paragraph",
                        children: [{ text: "" }],
                    },
                ],
                date: new Date(),
            },
        ],
        deleted: false,
        public: false,
        published: false,
        author: mongoose.Types.ObjectId(req.body.userId),
    });

    Note.create(noteData)
        .then((response) => {
            console.log(response);
            res.status(200).json(response);
        })
        .catch((err) => {
            console.log(err);
        });
});

note.post("/data", async (req, res) => {
    const { noteId } = req.body;

    Note.findById(noteId)
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((err) => {
            console.log(err);
        });
});

note.post("/update", async (req, res) => {});

note.post("/update/text", async (req, res) => {});

note.post("/delete", async (req, res) => {});

note.post("/list", async (req, res) => {
    const { userId } = req.body;

    Note.find({ author: userId })
        .sort({ updatedAt: -1 })
        .then((response) => {
            res.json(response);
        })
        .catch((err) => {
            console.log(err);
        });
});

module.exports = note;
