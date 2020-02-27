const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/usuario");
const app = express();

app.post("/login", (req, res) => {
    let body = req.body;

    UserModel.findOne({ email: body.email }, (err, usuDb) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: err
            });
        }
        if (!usuDb) {
            return res.status(400).json({
                success: false,
                message: "(Usuario) o contraseña incorrectos"
            });
        }

        if (!bcrypt.compareSync(body.password, usuDb.password)) {
            return res.status(400).json({
                success: false,
                message: "Usuario o (contraseña) incorrectos"
            });
        }

        let token = jwt.sign(
            {
                usuario: usuDb
            },
            process.env.SEED,
            { expiresIn: process.env.caducidad }
        );

        res.json({
            ok: true,
            usuario: usuDb,
            token
        });
    });
});

module.exports = app;
