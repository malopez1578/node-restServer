const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "El nombre es necesario."]
    },
    email: {
        type: String,
        required: [true, "El correo es necesario."]
    },
    password: {
        type: String,
        required: [true, "La contraseña es necesaria."]
    },
    image: { type: String, required: false },
    role: { type: String, default: "USER_ROLE" },
    state: { type: Boolean, default: true },
    google: { type: Boolean, default: false }
});

module.exports = mongoose.model("User", userSchema);
