const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const _ = require("underscore");
const UserModel = require("../models/usuario");
const { validateToken, validateRol } = require("../middlewares/authentication");

app.get("/usuario", validateToken, function(req, res) {
    let from = req.query.from || 0;
    from = Number(from);
    let limit = req.query.limit || 5;
    limit = Number(limit);

    UserModel.find({ state: true }, "name email")
        .skip(from)
        .limit(limit)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: err
                });
            }
            UserModel.countDocuments({ state: true }, (err, count) => {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        message: err
                    });
                }
                res.json({
                    ok: true,
                    cantTotal: count,
                    usuarios
                });
            });
        });
});

app.post("/usuario", [validateToken, validateRol], function(req, res) {
    const body = req.body;

    let user = new UserModel({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
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

app.put("/usuario/:id", [validateToken, validateRol], function(req, res) {
    let paramId = req.params.id;
    let body = _.pick(req.body, ["name", "email", "image", "role", "state"]);

    UserModel.findByIdAndUpdate(
        paramId,
        body,
        { new: true, runValidators: true },
        (err, usuarioDB) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: err
                });
            }

            res.json({
                ok: true,
                usuario: usuarioDB
            });
        }
    );
});
app.delete("/usuario/:id", [validateToken, validateRol], function(req, res) {
    let id = req.params.id;
    let changeData = { new: true, state: false };
    UserModel.findByIdAndUpdate(id, changeData, (err, userDelete) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: err
            });
        }
        if (!userDelete) {
            return res.status(400).json({
                success: false,
                message: `El usuario de id ${id} no existe`
            });
        }
        res.json({
            ok: true,
            usuarioBorrado: userDelete
        });
    });
});

module.exports = app;
