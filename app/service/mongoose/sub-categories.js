const SubCategory = require("../../api/v2/sub-categories/model");
const Category = require("../../api/v2/categories/model");
const Bibliography = require("../../api/v2/bibliografi/model");
const { BadRequestError } = require("../../errors");

const createSubCategories = async (req) => {
  const { name, category } = req.body;
  const checkCategory = await Category.findOne({ _id: category });
  if (!checkCategory) {

    throw new BadRequestError(`Tidak ada kategori dengan id ${category}`);
  }
  const checkDuplicate = await SubCategory.findOne({ name });
  if (checkDuplicate) throw new BadRequestError("Sub Kategori sudah ada");
  const result = await SubCategory.create({ name, category });
  checkCategory.subCategories.push(result._id);
  await checkCategory.save();
  return result;
};

const getAllSubCategories = async () => {
  const result = await SubCategory.find();
  return result;
};

const updateSubCategories = async (req) => {
  const { id } = req.params;
  const { name } = req.body;

  const check = await SubCategory.findOne({
    name,
    _id: { $ne: id }, // $ne itu adalah comparison query oparetaor fungsinya dalam kodingan ini adalah mencari semua id tanpa id yg di deklar
  });
  if (check) throw new BadRequestError("Nama Sub kategori duplikat");

  const result = await SubCategory.findByIdAndUpdate(
    { _id: id },
    { name },
    {
      runValidators: true,
      new: true,
    }
  );
  return result;
};

const deleteSubCategories = async (req) => {
  const { id } = req.params;
  const { categoryId } = req.query;
  

  const checkHasBibliography = await Bibliography.find({ sub_category: id });
  if (checkHasBibliography.length > 0)
    throw new BadRequestError(
      "Tidak bisa hapus sub kategori, dikarenakan kategori ini masih memiliki bibliografi"
    );

  const result = await SubCategory.deleteOne({ _id: id });
  const category = await Category.findById(categoryId);
  category.subCategories.pull(id);
  await category.save();

  return result;
};

module.exports = {
  createSubCategories,
  getAllSubCategories,
  updateSubCategories,
  deleteSubCategories,
};
