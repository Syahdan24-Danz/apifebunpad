const db = require("../connection");
const response = require("../response");

// Get all Admins
const getAllAdmins = (req, res) => {
  try {
    db.query("SELECT * FROM admins", (err, results) => {
      if (err) {
        console.error(err);
        return response(
          500,
          {},
          "Terjadi kesalahan saat mengambil data admin",
          res
        );
      }
      response(200, results, "Data berhasil diambil", res);
    });
  } catch (err) {
    console.error(err);
    response(500, {}, "Terjadi kesalahan pada server", res);
  }
};

// Get Admin by ID
const getAdminById = (req, res) => {
  const { id } = req.params;
  try {
    db.query("SELECT * FROM admins WHERE id = ?", [id], (err, results) => {
      if (err) {
        console.error(err);
        return response(
          500,
          {},
          "Terjadi kesalahan saat mengambil data admin",
          res
        );
      }

      if (results.length === 0) {
        return response(404, {}, "Admin tidak ditemukan", res);
      }

      response(200, results[0], "Data berhasil diambil", res);
    });
  } catch (err) {
    console.error(err);
    response(500, {}, "Terjadi kesalahan pada server", res);
  }
};

// Create a new Admin
const createAdmin = (req, res) => {
  const { name, email, password, role, managedById } = req.body;
  try {
    db.query(
      "INSERT INTO admins (name, email, password, role, managed_by_id) VALUES (?, ?, ?, ?, ?)",
      [name, email, password, role, managedById ? parseInt(managedById) : null],
      (err, result) => {
        if (err) {
          console.error(err);
          return response(500, {}, "Terjadi kesalahan saat membuat admin", res);
        }

        const newAdminId = result.insertId;
        db.query(
          "SELECT * FROM admins WHERE id = ?",
          [newAdminId],
          (err, results) => {
            if (err) {
              console.error(err);
              return response(
                500,
                {},
                "Terjadi kesalahan saat mengambil admin baru",
                res
              );
            }

            response(201, results[0], "Admin berhasil dibuat", res);
          }
        );
      }
    );
  } catch (err) {
    console.error(err);
    response(500, {}, "Terjadi kesalahan pada server", res);
  }
};

// Update existing Admin
const updateAdmin = (req, res) => {
  const { id } = req.params;
  const { name, email, password, role, managedById } = req.body;
  try {
    db.query(
      "UPDATE admins SET name = ?, email = ?, password = ?, role = ?, managed_by_id = ? WHERE id = ?",
      [
        name,
        email,
        password,
        role,
        managedById ? parseInt(managedById) : null,
        id,
      ],
      (err, result) => {
        if (err) {
          console.error(err);
          return response(
            500,
            {},
            "Terjadi kesalahan saat memperbarui admin",
            res
          );
        }

        if (result.affectedRows === 0) {
          return response(404, {}, "Admin tidak ditemukan", res);
        }

        db.query("SELECT * FROM admins WHERE id = ?", [id], (err, results) => {
          if (err) {
            console.error(err);
            return response(
              500,
              {},
              "Terjadi kesalahan saat mengambil data admin",
              res
            );
          }

          response(200, results[0], "Admin berhasil diperbarui", res);
        });
      }
    );
  } catch (err) {
    console.error(err);
    response(500, {}, "Terjadi kesalahan pada server", res);
  }
};

// Delete Admin
const deleteAdmin = (req, res) => {
  const { id } = req.params;
  try {
    db.query("DELETE FROM admins WHERE id = ?", [id], (err, result) => {
      if (err) {
        console.error(err);
        return response(500, {}, "Terjadi kesalahan saat menghapus admin", res);
      }

      if (result.affectedRows === 0) {
        return response(404, {}, "Admin tidak ditemukan", res);
      }

      // Berhasil menghapus, kirim 204 No Content
      res.status(204).send();
    });
  } catch (err) {
    console.error(err);
    response(500, {}, "Terjadi kesalahan pada server", res);
  }
};

module.exports = {
  getAllAdmins,
  getAdminById,
  createAdmin,
  updateAdmin,
  deleteAdmin,
};
