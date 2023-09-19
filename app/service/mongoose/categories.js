const Categories = require("../../api/v2/categories/model");
const SubCategories = require("../../api/v2/sub-categories/model");
const Bibliography = require("../../api/v2/bibliografi/model");
const { BadRequestError, NotFoundError } = require("../../errors");
const { capitalizeWords } = require("../../utils/index");

const createCategories = async (req) => {
  let { name } = req.body;
  name = capitalizeWords(name);
  const check = await Categories.findOne({ name });
  if (check) throw new BadRequestError("Kategori Sudah Tersedia");
  const result = await Categories.create({ name });
  return result;
};

const getAllCategories = async () => {
  // const result = await Categories.find();
  const result = await Categories.find().populate({
    path: "subCategories",
    select: "_id name",
  });
  return result;
};

const deleteCategories = async (req) => {
  const { id } = req.params;
  const checkHasSubCategory = await SubCategories.find({ category: id });
  if (checkHasSubCategory.length > 0)
    throw new BadRequestError(
      "Tidak bisa hapus kategori, dikarenakan kategori ini masih memiliki sub kategori"
    );

  const checkHasBibliography = await Bibliography.find({ category: id });
  if (checkHasBibliography.length > 0)
    throw new BadRequestError(
      "Tidak bisa hapus kategori, dikarenakan kategori ini masih memiliki bibliografi"
    );

  const result = await Categories.deleteOne({ _id: id });
  return result;
};

const updateCategories = async (req) => {
  const { id } = req.params;
  let { name } = req.body;
  name = capitalizeWords(name);
  const check = await Categories.findOne({
    name,
    _id: { $ne: id }, // $ne itu adalah comparison query oparetaor fungsinya dalam kodingan ini adalah mencari semua id tanpa id yg di deklar
  });
  if (check) throw new BadRequestError("Nama kategori duplikat");

  const result = await Categories.findByIdAndUpdate(
    { _id: id },
    { name },
    {
      runValidators: true,
      new: true,
    }
  );
  // if (!result) throw new NotFoundError(`Tidak ada kategori dengan id = ${id}`);
  return result;
};

const getOneCategories = async (req) => {
  const { id } = req.params;
  const result = await Categories.findOne({ _id: id }).populate({
    path: "subCategories",
    select: "_id name",
  });
  if (!result) throw new NotFoundError(`Tidak ada Kategori dengan id: ${id}`);

  return result;
};
module.exports = {
  createCategories,
  getAllCategories,
  deleteCategories,
  updateCategories,
  getOneCategories,
};
