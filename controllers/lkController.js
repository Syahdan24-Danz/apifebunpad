import db from "../connection.js";
import response from "../response.js";

const getAllLembaga = async (req, res) => {
  try {
    const lembaga = await db.lembagaKemahasiswaan.findMany();
    console.log(lembaga);
    response(200, lembaga, "Data Succes", res);
  } catch (err) {
    throw err;
  }
};

const getLembagaById = async (req, res) => {
  const { id } = req.params;
  try {
    const lembaga = await db.lembagaKemahasiswaan.findUnique({
      where: { id: parseInt(id) },
    });
    if (!lembaga) {
      return response(404, {}, "Data not found", res);
    }
    res.status(200).json(lembaga);
  } catch (err) {
    throw err;
  }
};

const createLembaga = async (req, res) => {
  const { uniqueId, title, description, bookletLink, pageLink, adminId } =
    req.body;
  try {
    const newLembaga = await db.lembagaKemahasiswaan.create({
      data: {
        uniqueId,
        title,
        description,
        bookletLink,
        pageLink,
        adminId: adminId ? parseInt(adminId) : null, // Sertakan adminId jika ada
      },
    });
    response(201, newLembaga, "Data Succes", res);
  } catch (err) {
    throw err;
  }
};

const updateLembaga = async (req, res) => {
  const { id } = req.params;
  const { uniqueId, title, description, bookletLink, pageLink, adminId } =
    req.body;
  try {
    const updatedLembaga = await db.lembagaKemahasiswaan.update({
      where: { id: parseInt(id) },
      data: {
        uniqueId,
        title,
        description,
        bookletLink,
        pageLink,
        adminId: adminId ? parseInt(adminId) : null,
      },
    });
    response(200, updatedLembaga, "Data Succes", res);
  } catch (error) {
    throw error;
  }
};

// Delete Lembaga
const deleteLembaga = async (req, res) => {
  const { id } = req.params;
  try {
    await db.lembagaKemahasiswaan.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    throw error;
  }
};

export {
  getAllLembaga,
  getLembagaById,
  createLembaga,
  updateLembaga,
  deleteLembaga,
};
