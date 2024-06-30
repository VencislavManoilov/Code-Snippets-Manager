const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const isAuthenticated = require("./middleware/isAuthenticated");

const PORT = 8080;

app.use(bodyParser.json());
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Configure MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "your_secret_password",
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

// Session store setup
const sessionStore = new MySQLStore({
    expiration: 1000 * 60 * 60 * 24, // 1 day
    endConnectionOnClose: false // Keep the connection open for session store
}, db.promise());

// Session middleware setup
app.use(session({
    key: 'session_cookie_name',
    secret: 'your_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));

const signupRoute = require("./routes/signup");
app.use("/signup", (req, res, next) => {
    req.db = db;
    next();
}, signupRoute);

const loginRoute = require("./routes/login");
app.use("/login", (req, res, next) => {
    req.db = db;
    next();
}, loginRoute);

const createSnippetRoute = require("./routes/createSnippet");
app.use("/snippet/create", (req, res, next) => {
    req.db = db;
    next();
}, createSnippetRoute);

const getSnippetRoute = require("./routes/getSnippet");
app.use("/snippet/get", (req, res, next) => {
    req.db = db;
    next();
}, getSnippetRoute);

const getUserSnippetIds = require("./routes/getUserSnippetIds");
app.use("/snippet/ids", (req, res, next) => {
    req.db = db;
    next();
}, getUserSnippetIds);

app.get("/test", isAuthenticated, (req, res) => {
    res.status(200).send("You are authenicated");
})

app.listen(PORT, () => {
    console.log("Listening to", PORT);
})