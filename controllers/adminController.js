import db from "../connection.js";
import response from "../response.js";

// Get all Admins
const getAllAdmins = async (req, res, next) => {
  try {
    const adminList = await db.admin.findMany();
    response(200, adminList, "Data Success", res);
  } catch (error) {
    next(error); // Pass error to middleware
  }
};

// Get Admin by ID
const getAdminById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const admin = await db.admin.findUnique({
      where: { id: parseInt(id) },
    });
    if (!admin) {
      return response(404, {}, "Data not found", res);
    }
    response(200, admin, "Data Success", res);
  } catch (error) {
    next(error); // Pass error to middleware
  }
};

// Create new Admin
const createAdmin = async (req, res, next) => {
  const { name, email, password, role, managedById } = req.body;
  try {
    // TODO: Hash the password before saving
    const newAdmin = await db.admin.create({
      data: {
        name,
        email,
        password, // Ensure to hash the password
        role,
        managedById: managedById ? parseInt(managedById) : null,
      },
    });
    response(201, newAdmin, "Data Success", res);
  } catch (error) {
    next(error); // Pass error to middleware
  }
};

// Update existing Admin
const updateAdmin = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, password, role, managedById } = req.body;
  try {
    // TODO: Hash the password if being updated
    const updatedAdmin = await db.admin.update({
      where: { id: parseInt(id) },
      data: {
        name,
        email,
        password, // Ensure to hash the password if updated
        role,
        managedById: managedById ? parseInt(managedById) : null,
      },
    });
    response(200, updatedAdmin, "Data Success", res);
  } catch (error) {
    next(error); // Pass error to middleware
  }
};

// Delete Admin
const deleteAdmin = async (req, res, next) => {
  const { id } = req.params;
  try {
    await db.admin.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send(); // No content to return
  } catch (error) {
    next(error); // Pass error to middleware
  }
};

export { getAllAdmins, getAdminById, createAdmin, updateAdmin, deleteAdmin };
