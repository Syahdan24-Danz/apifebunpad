// middlewares/validateApiKey.js
const dotenv = require("dotenv");
dotenv.config(); // Load environment variables

const apiKey = process.env.API_KEY; // Load API key from environment variables

const validateApiKey = (req, res, next) => {
  const requestKey = req.headers["x-api-key"]; // Get API key from request header

  if (!requestKey) {
    return res.status(401).json({ message: "API Key is missing" }); // If no API key, return error
  }

  if (requestKey !== apiKey) {
    return res.status(403).json({ message: "Invalid API Key" }); // If API key does not match, return error
  }

  next(); // If valid, proceed to next middleware or route handler
};

module.exports = validateApiKey;
