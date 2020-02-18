const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const UserModel = require("../models/usuario");

// parse application/x-www-form-urlencoded + parse application/json
app.use(bodyParser.urlencoded({ extended: false })).use(bodyParser.json());

app.get("/usuario", function(req, res) {
    res.json("Hello World");
});

app.post("/usuario", function(req, res) {
    const body = req.body;

    let user = new UserModel({
        name: body.name,
        email: body.email,
        password: body.password,
        role: body.role
    });

    user.save((err, userDB) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: err
            });
        }
        res.json({
            success: true,
            message: "User saved",
            data: userDB
        });
    });
});

app.put("/usuario/:id", function(req, res) {
    let paramId = req.params.id;
    res.json({ paramId });
});
app.delete("/usuario", function(req, res) {
    res.json("Hello World");
});

module.exports = app;
