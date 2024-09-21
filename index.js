const express = require("express");
const db = require("./connection.js");
const response = require("./response.js");
const cors = require("cors");
const router = require("./routes/index.js");
const dotenv = require("dotenv");
const validateApiKey = require("./middlewares/validateApiKey.js");
const path = require("path");
dotenv.config(); // Load environment variables from .env file

const apiKey = process.env.API_KEY;

const app = express();
const port = process.env.PORT || 3000;

// Middleware setup
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Root route
app.get("/", (req, res) => {
  response(200, "", "Welcome to API BEM FEB Unpad", res);
});
app.use("/api", validateApiKey);
app.use("/api", router);
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

app.use((err, req, res, next) => {
  console.error(err.stack);
  response(500, "", "Server Error", res);
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
