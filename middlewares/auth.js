const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // Mendapatkan token dari header Authorization
  const authHeader = req.headers["authorization"];

  // Memeriksa apakah Authorization header ada dan memiliki format yang benar
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Unauthenticated. No token provided." });
  }

  // Memisahkan "Bearer" dari token
  const token = authHeader.split(" ")[1];

  // Verifikasi token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token." });
    }

    // Menyimpan id user yang ter-decode dari token ke dalam req.userId
    req.userId = decoded.id;

    // Melanjutkan ke middleware berikutnya
    next();
  });
};

module.exports = verifyToken;
