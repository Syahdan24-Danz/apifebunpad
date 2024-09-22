const validateApiKey = (req, res, next) => {
  const requestKey = req.headers["x-api-key"];
  console.log("API Key from .env:", apiKey); // Logging env API Key
  console.log("Request API Key from Header:", requestKey); // Logging request API Key

  if (!requestKey) {
    return response(400, {}, "Missing API Key", res);
  }

  if (requestKey !== apiKey) {
    return response(401, {}, "Invalid API Key", res);
  }

  next();
};
