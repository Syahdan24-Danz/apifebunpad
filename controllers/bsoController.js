const db = require("../connection"); // Koneksi database
const response = require("../response"); // Modul response untuk menangani hasil response

// Get All Lembaga Mahasiswa
const getAllBso = (req, res) => {
  const query = "SELECT * FROM badan_organisasi";
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return response(
        500,
        {},
        "Terjadi kesalahan saat mengambil data lembaga",
        res
      );
    }
    response(200, results, "Data lembaga berhasil diambil", res);
  });
};

// Get Lembaga by ID
const getBsoById = (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM lembaga_mahasiswa WHERE id = ?";

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error(err);
      return response(
        500,
        {},
        "Terjadi kesalahan saat mengambil data lembaga",
        res
      );
    }
    if (results.length === 0) {
      return response(404, {}, "Lembaga tidak ditemukan", res);
    }
    response(200, results[0], "Data lembaga berhasil diambil", res);
  });
};

// Create New Lembaga Mahasiswa
const createBso = (req, res) => {
  const { title, description, image, bookletLink, pageLink } = req.body;

  const query = `
    INSERT INTO lembaga_mahasiswa (title, description, image, bookletLink, pageLink, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, NOW(), NOW())
  `;

  db.query(
    query,
    [title, description, image, bookletLink, pageLink],
    (err, result) => {
      if (err) {
        console.error(err);
        return response(500, {}, "Terjadi kesalahan saat membuat lembaga", res);
      }
      // Setelah berhasil membuat, ambil data lembaga baru untuk ditampilkan kembali
      const newLembagaId = result.insertId;
      const selectQuery = "SELECT * FROM lembaga_mahasiswa WHERE id = ?";

      db.query(selectQuery, [newLembagaId], (err, results) => {
        if (err) {
          console.error(err);
          return response(
            500,
            {},
            "Terjadi kesalahan saat mengambil data lembaga baru",
            res
          );
        }
        response(201, results[0], "Lembaga berhasil dibuat", res);
      });
    }
  );
};

// Update Lembaga Mahasiswa
const updateBso = (req, res) => {
  const { id } = req.params;
  const { title, description, image, bookletLink, pageLink } = req.body;

  const query = `
    UPDATE lembaga_mahasiswa
    SET title = ?, description = ?, image = ?, bookletLink = ?, pageLink = ?, updatedAt = NOW()
    WHERE id = ?
  `;

  db.query(
    query,
    [title, description, image, bookletLink, pageLink, id],
    (err, result) => {
      if (err) {
        console.error(err);
        return response(
          500,
          {},
          "Terjadi kesalahan saat memperbarui lembaga",
          res
        );
      }

      if (result.affectedRows === 0) {
        return response(404, {}, "Lembaga tidak ditemukan", res);
      }

      // Setelah update, ambil kembali data lembaga yang diperbarui untuk ditampilkan
      const selectQuery = "SELECT * FROM lembaga_mahasiswa WHERE id = ?";

      db.query(selectQuery, [id], (err, results) => {
        if (err) {
          console.error(err);
          return response(
            500,
            {},
            "Terjadi kesalahan saat mengambil data lembaga yang diperbarui",
            res
          );
        }
        response(200, results[0], "Lembaga berhasil diperbarui", res);
      });
    }
  );
};

// Delete Lembaga Mahasiswa
const deleteBso = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM lembaga_mahasiswa WHERE id = ?";

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error(err);
      return response(500, {}, "Terjadi kesalahan saat menghapus lembaga", res);
    }

    if (result.affectedRows === 0) {
      return response(404, {}, "Lembaga tidak ditemukan", res);
    }

    // Jika lembaga berhasil dihapus, kirim response 204 (No Content)
    res.status(204).send();
  });
};

// Ekspor semua fungsi CRUD
module.exports = {
  getAllBso,
  getBsoById,
  createBso,
  updateBso,
  deleteBso,
};
