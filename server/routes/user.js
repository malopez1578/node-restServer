const express = require("express");
const app = express();
const User = require("../models/usuario");

app.get("/usuario", function(req, res) {
    res.json("Hello World");
});

app.post("/usuario", function(req, res) {
    const body = req.body;
    const usuario = new User({
        nombre: body.nombre,
        email: body.email,
        password: body.password
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            console.log("error");
            return res.status(400).json({
                ok: false,
                err
            });
        } else {
            console.log("true");
            return res.json({
                ok: true,
                usuario: usuarioDB
            });
        }
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
