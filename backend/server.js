const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./config/database");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());

// Test Route
app.get("/", (req, res) => {
    res.send("API is Running!");
});

// Route to handle form submission
app.post("/api/submit-form", (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: "All fields are required!" });
    }

    const sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";
    db.query(sql, [name, email, message], (err, result) => {
        if (err) {
            console.error("Error inserting data:", err);
            return res.status(500).json({ success: false, message: "Server error" });
        }
        res.status(201).json({ success: true, message: "Form submitted successfully!", data: result });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
