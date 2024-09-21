const express = require("express");
const { login } = require("../controllers/loginController.js"); // Mengimpor controller login
const { validateLogin } = require("../utils/validators/auth.js"); // Middleware validasi login

const {
  createPrestasi,
  getAllPrestasi,
  getPrestasiById,
  updatePrestasi,
  deletePrestasi,
} = require("../controllers/prestasiController.js"); // Pastikan ekstensi .js ditambahkan

const {
  getAllLembaga,
  getLembagaById,
  createLembaga,
  updateLembaga,
  deleteLembaga,
} = require("../controllers/lkController.js"); // Pastikan ekstensi .js ditambahkan

const {
  getAllAdmins,
  getAdminById,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} = require("../controllers/adminController.js"); // Pastikan ekstensi .js ditambahkan

const { getAllBso } = require("../controllers/bsoController.js");

const router = express.Router();

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

router.get("/bso", getAllBso);

module.exports = router;
