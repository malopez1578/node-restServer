const jwt = require("jsonwebtoken");

// verificar token

let validateToken = (req, res, next) => {
    let token = req.get("token");

    console.log("TCL: validateToken ->  process.env.SEED", process.env.SEED);
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                message: err
            });
        }
        req.usuario = decoded.usuario;
        next();
    });
};

// validar role user

let validateRol = (req, res, next) => {
    let userRol = req.usuario.role;
    if (userRol === "USER_ROLE") {
        return res.status(400).json({
            ok: false,
            message: "No es un usuario Administrador"
        });
    }
    next();
};

module.exports = { validateToken, validateRol };
