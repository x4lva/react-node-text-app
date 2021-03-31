const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const user = express.Router();

const User = require("../schemas/Note");

user.use(cors());

user.post("/create", async (req, res) => {

});

user.get("/login", async (req, res) => {

});

user.post("/update", async (req, res) => {

})

module.exports = user;
