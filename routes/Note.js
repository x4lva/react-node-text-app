const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const note = express.Router();

const Note = require("../schemas/Note");

note.use(cors());

note.post("/create", async (req, res) => {});

note.get("/data/:id", async (req, res) => {});

note.post("/update", async (req, res) => {});

note.post("/update/text", async (req, res) => {});

note.post("/delete", async (req, res) => {});

module.exports = note;
