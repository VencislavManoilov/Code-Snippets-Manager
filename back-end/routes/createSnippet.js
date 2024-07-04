const express = require("express");
const route = express.Router();
const { body, validationResult } = require("express-validator");
const isAuthenticated = require("../middleware/isAuthenticated");

route.post(
    "/",
    isAuthenticated,
    [
        body("title").notEmpty().withMessage("Title required"),
        body("code").notEmpty().withMessage("Code required"),
        body("type").notEmpty().withMessage("Type required")
    ],
    (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            let errorMessages = [];
            for(let i = 0; i < errors.array().length; i++) {
                errorMessages.push(errors.array()[i].msg);
            }
            return res.status(400).json({ errors: errorMessages });
        }

        const { title, code, type } = req.body;

        try {
            const query = `INSERT INTO snippets (user_id, title, code, type) VALUES (?, ?, ?, ?)`;
            const values = [req.session.userId, title, code, type];

            req.db.query(query, values, (err, result) => {
                if (err) {
                    console.error("Error saving snippet to database:", err);
                    return res.status(500).json({ error: "Internal server error" });
                }

                return res.status(201).json({ success: "Snippet created successfully" });
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
)

module.exports = route;