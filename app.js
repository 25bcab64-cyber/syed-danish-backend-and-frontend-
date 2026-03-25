const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");   // ⭐ ADD THIS

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ⭐ SERVE FRONTEND
app.use(express.static(path.join(__dirname, "public")));

// MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "tiger",
    database: "portfolio_db"
});

db.connect((err) => {
    if (err) {
        console.log("Database error:", err);
    } else {
        console.log("Connected to MySQL");
    }
});

// Contact API
app.post("/contact", (req, res) => {
    const { name, email, message } = req.body;

    const sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";

    db.query(sql, [name, email, message], (err, result) => {
        if (err) {
            console.log(err);
            res.send("Error");
        } else {
            res.send("Message saved successfully");
        }
    });
});

// Start server
app.get('/', (req, res) => {
  res.send('Backend Running 🚀');
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
