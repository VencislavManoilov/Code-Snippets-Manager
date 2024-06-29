const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

const PORT = 8080;

app.get("/test", (req, res) => {
    res.status(200).send("It is working");
})

app.listen(PORT, () => {
    console.log("Listening to", PORT);
})