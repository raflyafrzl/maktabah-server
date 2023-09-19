const Bibliografi = require("../../api/v2/bibliografi/model");
const Tableofcontent = require("../../api/v2/table-of-content/model");
const Content = require("../../api/v2/content/model");
const fs = require("fs");

const { BadRequestError } = require("../../errors");
const { generateID } = require("../../utils");
const createBibliografi = async (req) => {
  const {
    category,
    sub_category,
    title,
    description,
    contributor,
    creator,
    publisher,
    resource_identifier,
    rights,
    source,
    subject,
    date_created,
  } = req.body;
  const _id = generateID();
  const check = await Bibliografi.findOne({ title });
  if (check)
    throw new BadRequestError("Buku dengan judul tersebut sudah tersedia!");

  let imageFilePath = "uploads/avatar/default.png";

  if (req.file) {
    imageFilePath = `uploads/${req.file.filename}`;
  }
  const result = await Bibliografi.create({
    _id,
    category,
    sub_category: sub_category && null,
    title,
    description,
    contributor,
    creator,
    publisher,
    resource_identifier,
    rights,
    source,
    subject,
    date_created,
    image: imageFilePath,
  });
  return result;
};

const getAllBibliografi = async () => {
  const result = await Bibliografi.find();
  return result;
};

const updateBibliografi = async (req) => {
  const { id } = req.params;
  const {
    title,
    category,
    sub_category,
    description,
    contributor,
    creator,
    publisher,
    resource_identifier,
    rights,
    source,
    subject,
    date_created,
  } = req.body;
  const check = await Bibliografi.findOne({
    title,
    _id: { $ne: id }, // $ne itu adalah comparison query oparetaor fungsinya dalam kodingan ini adalah mencari semua id tanpa id yg di deklar
  });
  if (check) throw new BadRequestError("Nama title duplikat");

  const result = await Bibliografi.findByIdAndUpdate(
    { _id: id },
    {
      title,
      category,
      sub_category,
      description,
      contributor,
      creator,
      publisher,
      resource_identifier,
      rights,
      source,
      subject,
      date_created,
    },
    {
      runValidators: true,
      new: true,
    }
  );
  // if (!result) throw new NotFoundError(`Tidak ada kategori dengan id = ${id}`);
  return result;
};

const deleteBibliografi = async (req) => {
  const { id } = req.params;
  const cari = await Bibliografi.findOne({ _id: id });
  if (cari.image !== "uploads/avatar/default.png") {
    fs.unlink(`public/${cari.image}`, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
  const result = await Bibliografi.deleteOne({ _id: id });

  await Tableofcontent.deleteMany({ book: id });
  await Content.deleteMany({ book: id });
  return result;
};

const getBibliografiByID = async (req) => {
  const { id } = req.params;
  const result = await Bibliografi.find({ sub_category: id });

  if (!result.length) {
    const resultC = await Bibliografi.find({ category: id });
    return resultC;
  }
  return result;
};
module.exports = {
  createBibliografi,
  getAllBibliografi,
  updateBibliografi,
  deleteBibliografi,
  getBibliografiByID,
};
