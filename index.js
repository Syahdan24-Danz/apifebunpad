const express = require("express");
const db = require("./connection.js");
const response = require("./response.js");
const cors = require("cors");
const router = require("./routes/index.js");
const dotenv = require("dotenv");
const validateApiKey = require("./middlewares/validateApiKey.js");
const path = require("path");
dotenv.config();

const app = express();
const port = process.env.PORT || 3005;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
