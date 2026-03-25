const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ===============================
// ✅ Serve Frontend (Portfolio)
// ===============================
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ===============================
// ✅ MySQL Connection
// ===============================
const db = mysql.createConnection({
  host: "localhost",        // ⚠️ change to cloud DB when online
  user: "root",
  password: "tiger",
  database: "portfolio_db"
});

db.connect((err) => {
  if (err) {
    console.log("Database error:", err);
  } else {
    console.log("Connected to MySQL ✅");
  }
});

// ===============================
// ✅ Contact API (Save messages)
// ===============================
app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  const sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";

  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.log(err);
      res.send("Error saving message ❌");
    } else {
      res.send("Message saved successfully ✅");
    }
  });
});

// ===============================
// ✅ Start Server
// ===============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
