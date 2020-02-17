const express = require("express");
const app = express();

app.get("/usuario", function(req, res) {
    res.json("Hello World");
});
app.post("/usuario", function(req, res) {
    let body = req.body;
    res.json({ user: body });
});
app.put("/usuario/:id", function(req, res) {
    let paramId = req.params.id;
    res.json({ paramId });
});
app.delete("/usuario", function(req, res) {
    res.json("Hello World");
});

module.exports = app;
