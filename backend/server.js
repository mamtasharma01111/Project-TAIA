const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./config/database");
const contactFormRoute = require('./Router/contactFormRoutes');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());

// Test Route
app.get("/", (req, res) => {
    res.send("API is Running!");
});

// Route to handle form submission
app.use("/api/submit-form", contactFormRoute);

db.sync({ force: true }) 
    .then(() => {
        console.log("Database synced successfully and tables created!");
        app.listen(PORT, () => {
            console.log(` Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error(" Error syncing database:", error);
    });


