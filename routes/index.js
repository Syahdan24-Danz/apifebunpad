const express = require("express");
const { login } = require("../controllers/loginController.js");
const { validateLogin } = require("../utils/validators/auth.js");

const {
  createPrestasi,
  getAllPrestasi,
  getPrestasiById,
  updatePrestasi,
  deletePrestasi,
} = require("../controllers/prestasiController.js");

const {
  getAllLembaga,
  getLembagaById,
  createLembaga,
  updateLembaga,
  deleteLembaga,
} = require("../controllers/lkController.js");

const {
  getAllAdmins,
  getAdminById,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} = require("../controllers/adminController.js");

const { getAllBso } = require("../controllers/bsoController.js");

const router = express.Router();

router.post("/login", validateLogin, login);

router.get("/prestasi", getAllPrestasi);
router.post("/prestasi", createPrestasi);
router.get("/prestasi/:id", getPrestasiById);
router.put("/prestasi/:id", updatePrestasi);
router.delete("/prestasi/:id", deletePrestasi);

router.get("/lembaga", getAllLembaga);
router.get("/lembaga/:id", getLembagaById);
router.post("/lembaga", createLembaga);
router.put("/lembaga/:id", updateLembaga);
router.delete("/lembaga/:id", deleteLembaga);

router.get("/admins", getAllAdmins);
router.get("/admins/:id", getAdminById);
router.post("/admins", createAdmin);
router.put("/admins/:id", updateAdmin);
router.delete("/admins/:id", deleteAdmin);

router.get("/bso", getAllBso);

module.exports = router;
