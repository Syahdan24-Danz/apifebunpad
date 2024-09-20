import db from "../connection.js"; // Pastikan db terhubung ke Prisma Client

// READ: Mendapatkan semua data prestasi
const getAllPrestasi = async (req, res) => {
  try {
    const prestasi = await db.prestasi.findMany();
    res
      .status(200)
      .json({ message: "Data prestasi ditemukan", data: prestasi });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "Terjadi kesalahan saat mengambil data prestasi" });
  }
};

// CREATE: Menambahkan prestasi baru
const createPrestasi = async (req, res) => {
  const { nama, npm, namaKejuaraan, prodi, peringkat, imageKejuaraan } =
    req.body;

  const tanggalKejuaraan = req.body.tanggalKejuaraan
    ? new Date(req.body.tanggalKejuaraan)
    : new Date(); // Gunakan tanggal saat ini jika tidak diberikan

  try {
    const newPrestasi = await db.prestasi.create({
      data: {
        nama,
        npm,
        namaKejuaraan,
        prodi,
        tanggalKejuaraan: new Date(tanggalKejuaraan),
        peringkat,
        imageKejuaraan,
      },
    });
    res
      .status(201)
      .json({ message: "Prestasi berhasil ditambahkan", data: newPrestasi });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Terjadi kesalahan saat menambahkan prestasi" });
  }
};

// READ: Mendapatkan satu prestasi berdasarkan ID
const getPrestasiById = async (req, res) => {
  const { id } = req.params;
  try {
    const prestasi = await db.prestasi.findUnique({
      where: { id: parseInt(id, 10) },
    });
    if (!prestasi) {
      return res.status(404).json({ error: "Prestasi tidak ditemukan" });
    }
    res.status(200).json(prestasi);
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
    const updatedPrestasi = await db.prestasi.update({
      where: { id: parseInt(id, 10) },
      data: {
        nama,
        npm,
        namaKejuaraan,
        prodi,
        tanggalKejuaraan: new Date(tanggalKejuaraan),
        peringkat,
        imageKejuaraan,
      },
    });
    res
      .status(200)
      .json({ message: "Prestasi berhasil diperbarui", data: updatedPrestasi });
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
    await db.prestasi.delete({
      where: { id: parseInt(id, 10) },
    });
    res.status(204).send(); // 204: No Content, berarti berhasil tanpa konten tambahan
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Terjadi kesalahan saat menghapus prestasi" });
  }
};

export {
  createPrestasi,
  getAllPrestasi,
  getPrestasiById,
  updatePrestasi,
  deletePrestasi,
};
