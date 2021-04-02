const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const user = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../schemas/User");

user.use(cors());

process.env.SECRET_KEY = "x4lva";

user.post("/login", (req, res) => {
    console.log(req.body);
    User.findOne({
        email: req.body.userEmail,
    })
        .then((user) => {
            if (user) {
                if (bcrypt.compareSync(req.body.userPassword, user.password)) {
                    const payload = {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                    };
                    let token = jwt.sign(payload, process.env.SECRET_KEY, {
                        expiresIn: 1440,
                    });
                    res.send(token);
                } else {
                    res.json({ error: "Password is wrong" });
                }
            } else {
                res.json({ error: "User does not exist" });
            }
        })
        .catch((err) => {
            res.send("error: " + err);
        });
});

user.post("/register", (req, res) => {
    console.log(req.body);
    const userData = {
        name: req.body.userName,
        email: req.body.userEmail,
        password: req.body.userPassword,
    };
    User.findOne({
        email: req.body.userEmail,
    })
        .then((user) => {
            if (!user) {
                bcrypt.hash(req.body.userPassword, 10, (err, hash) => {
                    userData.password = hash;
                    User.create(userData)
                        .then((user) => {
                            console.log(user);
                            res.json({ status: 200 });
                        })
                        .catch((err) => {
                            res.send("error: " + err);
                        });
                });
            } else {
                res.json({ error: "User already exists" });
            }
        })
        .catch((err) => {
            res.send("error: " + err);
        });
});

module.exports = user;
