import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { PrismaClient } from "@prisma/client";

// Inisialisasi Prisma Client
const prisma = new PrismaClient();

const login = async (req, res) => {
  // Periksa hasil validasi
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: "Validation error",
      errors: errors.array(),
    });
  }

  try {
    // Mencari admin berdasarkan email
    const admin = await prisma.admin.findFirst({
      where: {
        email: req.body.email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true, // Pastikan password hash diambil
      },
    });

    // Jika admin tidak ditemukan
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    // Debugging: Print hashed password dan input password
    console.log("Password input:", req.body.password);
    console.log("Password hash:", admin.password);

    // Membandingkan password
    const validPassword = await bcrypt.compare(
      req.body.password,
      admin.password
    );

    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    // Generate token JWT
    const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Menghilangkan password dari objek admin sebelum dikirim
    const { password, ...adminWithoutPassword } = admin;

    // Mengirimkan response sukses dengan token JWT
    res.status(200).json({
      success: true,
      message: "Login successfully",
      data: {
        admin: adminWithoutPassword,
        token: token,
      },
    });
  } catch (error) {
    // Log error lebih detail
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Menggunakan export ES6
export { login };
