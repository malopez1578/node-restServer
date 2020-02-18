require("./config/config");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// parse application/x-www-form-urlencoded + parse application/json
app.use(bodyParser.urlencoded({ extended: false })).use(bodyParser.json());
app.use(require("./routes/user"));
const monggose = require("mongoose");

monggose.connect(
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
