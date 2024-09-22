require("dotenv").config();
const response = require("../response.js");
const apiKey = process.env.API_KEY;

const validateApiKey = (req, res, next) => {
  const requestKey = req.headers["x-api-key"];

  if (!requestKey) {
    return response(400, {}, "Missing API Key", res);
  }

  if (requestKey !== apiKey) {
    return response(401, {}, "Invalid API Key", res);
  }

  next();
};

module.exports = validateApiKey;
