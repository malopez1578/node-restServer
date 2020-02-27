require("./config/config");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// parse application/x-www-form-urlencoded + parse application/json
app.use(bodyParser.urlencoded({ extended: false })).use(bodyParser.json());
// configuracion de rutas
app.use(require("./routes/index"));
const monggose = require("mongoose");
// configuracion de coneccion
monggose.connect(
    process.env.urlDB,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    },
    (err, res) => {
        if (err) throw err;

        console.log("Base de datos online");
    }
);

app.listen(process.env.PORT, () => {
    console.log("escuchado puerto", process.env.PORT);
});
