import express from "express";
import { login } from "../controllers/loginController.js"; // Mengimpor controller login
import { validateLogin } from "../utils/validators/auth.js"; // Middleware validasi login

import {
  createPrestasi,
  getAllPrestasi,
  getPrestasiById,
  updatePrestasi,
  deletePrestasi,
} from "../controllers/prestasiController.js"; // Pastikan ekstensi .js ditambahkan

import {
  getAllLembaga,
  getLembagaById,
  createLembaga,
  updateLembaga,
  deleteLembaga,
} from "../controllers/lkController.js"; // Pastikan ekstensi .js ditambahkan

import {
  getAllAdmins,
  getAdminById,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} from "../controllers/adminController.js"; // Pastikan ekstensi .js ditambahkan

const router = express.Router();

// Route untuk login
router.post("/login", validateLogin, login);

router.get("/prestasi", getAllPrestasi);
router.post("/prestasi", createPrestasi);
router.get("/prestasi/:id", getPrestasiById); // Ambil satu prestasi berdasarkan ID
router.put("/prestasi/:id", updatePrestasi); // Update prestasi berdasarkan ID
router.delete("/prestasi/:id", deletePrestasi); // Hapus prestasi berdasarkan ID

// Route untuk Lembaga
router.get("/lembaga", getAllLembaga); // Ambil semua data lembaga
router.get("/lembaga/:id", getLembagaById); // Ambil satu lembaga berdasarkan ID
router.post("/lembaga", createLembaga); // Buat lembaga baru
router.put("/lembaga/:id", updateLembaga); // Update lembaga berdasarkan ID
router.delete("/lembaga/:id", deleteLembaga); // Hapus lembaga berdasarkan ID

// Route untuk Admins
router.get("/admins", getAllAdmins); // Ambil semua admin
router.get("/admins/:id", getAdminById); // Ambil admin berdasarkan ID
router.post("/admins", createAdmin); // Buat admin baru
router.put("/admins/:id", updateAdmin); // Update admin berdasarkan ID
router.delete("/admins/:id", deleteAdmin); // Hapus admin berdasarkan ID

export default router;
