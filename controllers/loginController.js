const bcrypt = require("bcrypt");
const db = require("../connection.js");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const response = require("../response");

const login = (req, res, next) => {
  // Validasi input dari request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return response(422, { errors: errors.array() }, "Validation error", res);
  }

  const { email, password } = req.body;

  try {
    // Mencari admin berdasarkan email
    db.query(
      "SELECT id, name, email, password FROM admins WHERE email = ?",
      [email],
      async (err, results) => {
        if (err) {
          console.error("Database query error:", err);
          return response(
            500,
            {},
            "Terjadi kesalahan saat mengambil data",
            res
          );
        }

        const admin = results[0];

        // Jika admin tidak ditemukan
        if (!admin) {
          return response(404, {}, "Admin tidak ditemukan", res);
        }

        // Debugging: Hapus atau komentari baris berikut di produksi
        console.log("Password input:", password);
        console.log("Password hash:", admin.password);

        // Membandingkan password
        const validPassword = await bcrypt.compare(password, admin.password);

        if (!validPassword) {
          return response(401, {}, "Password salah", res);
        }

        // Generate token JWT
        const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        // Menghilangkan password dari objek admin sebelum dikirim
        const { password: _, ...adminWithoutPassword } = admin;

        // Mengirimkan response sukses dengan token JWT
        response(
          200,
          { admin: adminWithoutPassword, token },
          "Login berhasil",
          res
        );
      }
    );
  } catch (error) {
    // Log error lebih detail
    console.error("Login error:", error);
    // Pass error ke middleware error handling
    next(error);
  }
};

// Menggunakan export ES6
module.exports = { login };
