const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const mysql = require("mysql2");

const PORT = 8080;

// Configure MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "Asdf1234567890",
    database: 'code_snippets',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Connect to MySQL
db.connect((err, connection) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

app.get("/test", (req, res) => {
    res.status(200).send("It is working");
})

app.listen(PORT, () => {
    console.log("Listening to", PORT);
})