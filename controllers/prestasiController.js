const db = require("../connection.js");
const upload = require("../middlewares/path.js");
const path = require("path");

// READ: Mendapatkan semua data prestasi
const getAllPrestasi = async (req, res) => {
  try {
    db.query("SELECT * FROM prestasi", (err, results) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ error: "Terjadi kesalahan saat mengambil data prestasi" });
      }
      res
        .status(200)
        .json({ message: "Data prestasi ditemukan", data: results });
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "Terjadi kesalahan saat mengambil data prestasi" });
  }
};

// CREATE: Menambahkan prestasi baru
const createPrestasi = (req, res) => {
  upload.single("imageKejuaraan")(req, res, (err) => {
    if (err) {
      console.error(err);
      return res.status(400).json({ error: err.message });
    }

    const { nama, npm, namaKejuaraan, prodi, peringkat, tanggalKejuaraan } =
      req.body;

    // Pastikan tanggalKejuaraan ada atau gunakan tanggal saat ini
    const tanggalKejuaraanFinal = tanggalKejuaraan
      ? new Date(tanggalKejuaraan)
      : new Date();

    // Pastikan file gambar ada sebelum menyimpannya di database
    const imageKejuaraan = req.file ? `${req.file.filename}` : null;

    // Validasi data
    if (!nama || !npm || !namaKejuaraan || !prodi || !peringkat) {
      return res
        .status(400)
        .json({ error: "Semua field kecuali gambar wajib diisi." });
    }

    try {
      const query = `
        INSERT INTO prestasi (nama, npm, namaKejuaraan, prodi, tanggalKejuaraan, peringkat, imageKejuaraan)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      const values = [
        nama,
        npm,
        namaKejuaraan,
        prodi,
        tanggalKejuaraanFinal,
        peringkat,
        imageKejuaraan,
      ];

      db.query(query, values, (err, results) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ error: "Terjadi kesalahan saat menambahkan prestasi." });
        }
        res.status(201).json({
          message: "Prestasi berhasil ditambahkan.",
          data: {
            id: results.insertId,
            nama,
            npm,
            namaKejuaraan,
            prodi,
            tanggalKejuaraan: tanggalKejuaraanFinal,
            peringkat,
            imageKejuaraan,
          },
        });
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Terjadi kesalahan saat menambahkan prestasi." });
    }
  });
};

// READ: Mendapatkan satu prestasi berdasarkan ID
const getPrestasiById = async (req, res) => {
  const { id } = req.params;
  try {
    db.query(
      "SELECT * FROM prestasi WHERE id = ?",
      [parseInt(id, 10)],
      (err, results) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json({ error: "Terjadi kesalahan saat mengambil data prestasi" });
        }
        if (results.length === 0) {
          return res.status(404).json({ error: "Prestasi tidak ditemukan" });
        }
        res.status(200).json(results[0]);
      }
    );
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Terjadi kesalahan saat mengambil data prestasi" });
  }
};

// UPDATE: Memperbarui prestasi berdasarkan ID
const updatePrestasi = async (req, res) => {
  const { id } = req.params;
  const {
    nama,
    npm,
    namaKejuaraan,
    prodi,
    tanggalKejuaraan,
    peringkat,
    imageKejuaraan,
  } = req.body;

  try {
    const query = `
      UPDATE prestasi
      SET nama = ?, npm = ?, namaKejuaraan = ?, prodi = ?, tanggalKejuaraan = ?, peringkat = ?, imageKejuaraan = ?
      WHERE id = ?
    `;
    const values = [
      nama,
      npm,
      namaKejuaraan,
      prodi,
      new Date(tanggalKejuaraan),
      peringkat,
      imageKejuaraan,
      parseInt(id, 10),
    ];

    db.query(query, values, (err, results) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ error: "Terjadi kesalahan saat memperbarui prestasi" });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Prestasi tidak ditemukan" });
      }
      res
        .status(200)
        .json({ message: "Prestasi berhasil diperbarui", data: req.body });
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Terjadi kesalahan saat memperbarui prestasi" });
  }
};

// DELETE: Menghapus prestasi berdasarkan ID
const deletePrestasi = async (req, res) => {
  const { id } = req.params;
  try {
    db.query(
      "DELETE FROM prestasi WHERE id = ?",
      [parseInt(id, 10)],
      (err, results) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json({ error: "Terjadi kesalahan saat menghapus prestasi" });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "Prestasi tidak ditemukan" });
        }
        res.status(204).send(); // 204: No Content, berarti berhasil tanpa konten tambahan
      }
    );
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Terjadi kesalahan saat menghapus prestasi" });
  }
};

module.exports = {
  getAllPrestasi,
  createPrestasi,
  getPrestasiById,
  updatePrestasi,
  deletePrestasi,
};
