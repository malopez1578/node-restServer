require("./config/config");
const express = require("express");
const app = express();
app.use(require("./routes/user"));
const monggose = require("mongoose");

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
