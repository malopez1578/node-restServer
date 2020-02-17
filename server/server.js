require("./config/config");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const monggose = require("mongoose");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(require("./routes/user"));

monggose.createConnection(
    "mongodb://localhost:27017/cafe",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    (err, res) => {
        if (err) throw err;

        console.log("Base de datos online");
    }
);

app.listen(process.env.PORT, () => {
    console.log("escuchado puerto", process.env.PORT);
});
